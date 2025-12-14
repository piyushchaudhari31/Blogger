const { createCanvas } = require("canvas");

function generateInitialsAvatar(firstName, lastName) {
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();

  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext("2d");

  
  ctx.fillStyle = "#000"; 
  ctx.fillRect(0, 0, 200, 200);

  
  ctx.font = "bold 100px Arial";
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(initials, 100, 110);

  return canvas.toDataURL(); // returns Base64 image
}

module.exports = generateInitialsAvatar;
