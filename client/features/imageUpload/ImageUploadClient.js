import React, { useState } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateClientAsync } from "../client/clientSlice";
import Button from "@mui/material/Button";







function ImageUploadClient(){

     
     const clientId = useSelector((state) => state.clientAuth.clientMe.id)

     

     const dispatch = useDispatch()

    const [image, setImage] = useState()
    const [imageUrl, setImageUrl] = useState("")

    const uploadImage = () =>{
    
        const formData = new FormData()
        formData.append("file", image)
        formData.append("upload_preset", "q1rexrny")

        Axios.post("https://api.cloudinary.com/v1_1/dsj9mewkg/image/upload", formData).then((res)=>setImageUrl(res.data.url))
          
    }
    {imageUrl ? dispatch(updateClientAsync({id: clientId, imageUrl})) : null }
    
   
    
return (

    <div>
        <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}></input>
        <Button variant='contained' color='primary' onClick={uploadImage}>upload image</Button>
    </div>
)

}


export default ImageUploadClient