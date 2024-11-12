import { server_url } from "./server_url";
import { commonAPI } from "./commonApi";


//registerUser
export const registerAPI=async(user)=>{

    return await commonAPI('POST',`${server_url}/register`,user,"")
}

//loginUser

export const loginAPI=async(user)=>{

    return await commonAPI('POST',`${server_url}/login`,user,"")
}





