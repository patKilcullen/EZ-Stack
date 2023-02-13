import React, { useState } from "react";
import Axios from "axios";
import { updateFreelancerAsync } from "../freelancers/singleFreelancerSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";







function ImageUpload(){

     const freelancerId = useSelector((state) => state.freelancerAuth.me.id)
     

     const dispatch = useDispatch()

    const [image, setImage] = useState()
    const [imageUrl, setImageUrl] = useState()

    const uploadImage = () =>{
    
        const formData = new FormData()
        formData.append("file", image)
        formData.append("upload_preset", "q1rexrny")
        

        Axios.post("https://api.cloudinary.com/v1_1/dsj9mewkg/image/upload", formData).then((res)=>setImageUrl(res.data.url))
    }
    {imageUrl ? dispatch(updateFreelancerAsync({id: freelancerId, imageUrl})) : null }
    
    
return (

    <div>
        <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}></input>
        <Button variant='contained' color='primary' onClick={uploadImage}>upload image</Button>
    </div>
)

}


export default ImageUpload