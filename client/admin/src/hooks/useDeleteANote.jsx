import { useState } from "react";
// import  useAuthContext  from "../context/AuthContext";
import { axiosConfig, axiosProperties } from "../api/axiosConfig";
export const useDeleteANote = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [statusCode, setStatusCode] = useState(null)
    const [data, setData] = useState([])
    const deleteANote = async (id) => {
        setIsLoading(true) //starting the request
        try{
            setError(null)
const response = await axiosConfig.delete(`/note/delete-note/${id}`,
    {
        signal : AbortSignal.timeout(axiosProperties["timeout"]) //times out after 10 seconds
    }
)
if(response && response.data){
    setData(response.data)
    setStatusCode(response.status)
    setError(null)
        setIsLoading(false)
    
}
        }
        catch(error){
            console.log(error.response.data)
            console.log(error)
setIsLoading(false)
            if(error.message == "canceled"){
setError({message : "Your Request Has Timed Out", code : error.code})
            }
            else if(error.message == "Network Error"){
                setError({message : "Our Service Is Currently Offline", code : error.code})
            }
            else if(error.message == "Request failed with status code 404" && !error.response.data.message){
                setError({message : "Not Found", code : error.code})
            }
            else{
            setData([])
            setIsLoading(false)
            setError({message : error.response.data.message, code : error.code})
            setStatusCode(error.response.status)
        }
    }
    }
    return {deleteANote, isLoading, error, data, statusCode} 
}
