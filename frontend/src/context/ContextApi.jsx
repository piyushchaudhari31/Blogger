import { createContext, useEffect, useState } from "react";

 export const blogContext = createContext(null)


const ContextApi = (props) => {
    const url = "http://localhost:3000"
    const [user,setUser] = useState('')
    const [isEmailVarify , setIsEmailVaify] = useState(false)

    useEffect(()=>{
      const getData = localStorage.getItem("user")
      if(getData){
        const parseduser = JSON.parse(getData)
        setUser(parseduser)
        setIsEmailVaify(parseduser.isEmailVarify) 
      }
    },[])
    
   
    const exportModule = {
        url,
        user,
        setUser,
        isEmailVarify,
        setIsEmailVaify
    }
  return (
    <div>
      <blogContext.Provider value={exportModule}>{props.children}</blogContext.Provider>
    </div>
  )
}

export default ContextApi
