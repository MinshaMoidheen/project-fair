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

//addProjectApi

export const addProjectAPI=async(reqBody,reqHeader)=>{

    return await commonAPI('POST',`${server_url}/addproject`,reqBody,reqHeader)
}


export const getHomeProjectAPI=async()=>{
    return await commonAPI('GET',`${server_url}/homeprojects`,'','')
}

export const getAllProjectAPI=async(searchKey,reqHeader)=>{
    return await commonAPI('GET',`${server_url}/allprojects?search=${searchKey}`,'',reqHeader)
}

export const getUserProjectAPI=async(reqHeader)=>{
    return await commonAPI('GET',`${server_url}/userprojects`,'',reqHeader)
}


//updateProjectAPI
export const updateProjectAPI=async(id,reqBody,reqHeader)=>{

    return await commonAPI('PUT',`${server_url}/projects/edit/${id}`,reqBody,reqHeader)
}

//deleteprojectAPI
export const deleteProjectAPI =async(id,reqHeader)=>{
    return await commonAPI('DELETE',`${server_url}/projects/remove/${id}`,{},reqHeader)
}

