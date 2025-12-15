const authModel = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../service/nodemailer.service");
const generateInitialsAvatar = require("../service/canvas.service");

async function authRegister(req, res) {
  const { firstName, lastName, email, password ,gender} = req.body;

  

  const emailExist = await authModel.findOne({ email });

  if (emailExist) {
    return res.status(400).json({
      message: "Email is Already Exist",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be 6 character",
    });
  }

  // const profilePic = `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}&background=000000&color=FFFFFF`;

  const profilePic = generateInitialsAvatar(firstName,lastName)

  

const user = await authModel.create({
  fullName: `${firstName} ${lastName}`,  
  email,
  password: await bcrypt.hash(password, 10),
  gender,
  profilePic: profilePic
});
  const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
  res.cookie("token", token);
 

  res.status(200).json({
    message: "Register Successfully",
  });
}

async function authLogin(req, res) {
  const { email, password } = req.body;

  const emailExist = await authModel.findOne({ email });

  if (!emailExist) {
    return res.status(401).json({
      message: "Invalid Email",
    });
  }

  const existPassword = await bcrypt.compare(password, emailExist.password);

  if (!existPassword) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign({ id: emailExist._id }, process.env.JWT_TOKEN);
  res.cookie("token", token);

  res.status(200).json({
    message: "Login successfully",
    token:token,
    user:{
      id:emailExist._id,
      firstName:emailExist.fullName,
      email:emailExist.email,
      profilePic:emailExist.profilePic,
      isEmailVarify:emailExist.isEmailVarify
    }
  });
}

async function sendEmailOnOtp(req, res) {
  const { email } = req.body;

  const emailExist = await authModel.findOne({ email });
  if (!emailExist) {
    return res.status(401).json({
      message: "Invalid Email",
    });
  }

  const otp = String(Math.floor(Math.random() * 100000 + 900000));
  const expireOtp = Date.now() + 2 * 60 * 1000;

  transporter.sendMail({
    from:"Blog App <mrpiyushchaudhari2006@gmail.com>",
    to: email,
    subject: "Your OTP Code 🔐 | Blog Application",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 420px; margin:auto; padding:20px; background:#f4f4f4; border-radius:10px;">

      <!-- Header -->
      <div style="background:#4A90E2; padding:15px; border-radius:10px; text-align:center; color:white;">
          <h2 style="margin:0; font-size:22px;">OTP Verification 🔐</h2>
      </div>

      <!-- Card -->
      <div style="padding:20px; background:white; margin-top:10px; border-radius:10px;">

          <p style="font-size:14px; color:#555;">Hi <strong>${email}</strong>,</p>

          <p style="font-size:14px; color:#555;">Use the OTP below to verify your email address:</p>

          <!-- OTP BOX -->
          <div style="
              background:#f0f0f0;
              padding:12px 0;
              margin:20px 0;
              border-radius:8px;
              text-align:center;
              font-size:28px;
              font-weight:bold;
              letter-spacing:5px;
              color:#333;
          ">
              ${otp}
          </div>

          <p style="font-size:13px; color:#777;">
              This OTP is valid for <strong>2 minutes</strong>.
          </p>

          <p style="font-size:13px; color:#777;">
              If you did not request this, please ignore this email.
          </p>

          <p style="margin-top:20px; font-size:13px; color:#555;">— Team Piyush-Developer</p>
      </div>

    </div>
  `,
  });

  emailExist.otp = otp
  emailExist.otpExpire = expireOtp

  await emailExist.save()

  res.status(201).json({
    message:"Otp Sent on Email"
  })


}

async function varifyEmailOtp(req,res){
  const {otp} = req.body
  const userId = req.userId

  const user = await authModel.findById(userId)
  
  if(!user){
    return res.status(401).json({
      message:"Login Fist"
    })
  }

  if(otp !== user.otp){
    return res.status(400).json({
      message:"Invalid OTP"
    })
  }
  if(user.otpExpire < Date.now()){
    res.status(400).json({
      message:"Otp Expired"
    })
  }

  await transporter.sendMail({
  from:"Blog App <mrpiyushchaudhari2006@gmail.com>",
  to: user.email,
  subject: "Email Verified ✔",
  html: `
  <div style="font-family: Arial, sans-serif; max-width: 380px; margin:auto; padding:20px; background:#f5f5f5; border-radius:10px;">

    <div style="background:white; padding:18px; border-radius:10px; box-shadow:0 2px 6px rgba(0,0,0,0.08); text-align:center;">

        <div style="font-size:40px; color:#4CAF50; margin-bottom:10px;">✔</div>

        <h2 style="margin:0; font-size:20px; color:#333;">Email Verified Successfully</h2>

        <p style="font-size:14px; color:#666; margin:10px 0 0;">
          Hi <strong>${user.fullName}</strong>, your email  
          <strong>${user.email}</strong> has been successfully verified.
        </p>

        <p style="font-size:13px; color:#888; margin-top:14px;">
          Thank you for keeping your account secure.
        </p>

    </div>

  </div>
  `
});


  user.otpVarify = true
  user.isEmailVarify = true
  await user.save()

  res.status(200).json({
    message:"Otp Vaify Successfully",
    user
  })
  
}

async function logout(req,res){
  res.clearCookie("token")
  res.status(200).json({
    message:"Log Out Successfully"
  })
}

async function resendOtp(req,res){

  try {
    const userId = req.userId
    const user = await authModel.findById(userId)
    
    

    const otp = String(Math.floor(Math.random() * 100000 + 900000))
    const expireOtp = Date.now() + 2 * 60 * 1000;

    transporter.sendMail({
    from:"Blog App <mrpiyushchaudhari2006@gmail.com>",
    to: user.email,
    subject: "Your OTP Code 🔐 | Blog Application",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 420px; margin:auto; padding:20px; background:#f4f4f4; border-radius:10px;">

      <!-- Header -->
      <div style="background:#4A90E2; padding:15px; border-radius:10px; text-align:center; color:white;">
          <h2 style="margin:0; font-size:22px;">OTP Verification 🔐</h2>
      </div>

      <!-- Card -->
      <div style="padding:20px; background:white; margin-top:10px; border-radius:10px;">

          <p style="font-size:14px; color:#555;">Hi <strong>${user.email}</strong>,</p>

          <p style="font-size:14px; color:#555;">Use the OTP below to verify your email address:</p>

          <!-- OTP BOX -->
          <div style="
              background:#f0f0f0;
              padding:12px 0;
              margin:20px 0;
              border-radius:8px;
              text-align:center;
              font-size:28px;
              font-weight:bold;
              letter-spacing:5px;
              color:#333;
          ">
              ${otp}
          </div>

          <p style="font-size:13px; color:#777;">
              This OTP is valid for <strong>2 minutes</strong>.
          </p>

          <p style="font-size:13px; color:#777;">
              If you did not request this, please ignore this email.
          </p>

          <p style="margin-top:20px; font-size:13px; color:#555;">— Team Piyush-Developer</p>
      </div>

    </div>
  `,
  });

  user.otp = otp
  user.otpExpire = expireOtp

  await user.save()
    
    res.status(200).json({
      message:"Otp Send on email",
      
    })
  } catch (error) {
    console.log(error.message);
    
  }
 
}



module.exports = { authRegister, authLogin ,sendEmailOnOtp , varifyEmailOtp , logout ,resendOtp};
