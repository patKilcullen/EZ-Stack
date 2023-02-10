import React, { useState } from "react";
import Axios from "axios";
import { updateFreelancerAsync } from "../freelancers/singleFreelancerSlice";
import { useDispatch, useSelector } from "react-redux";







function ImageUpload(){

     const freelancerId = useSelector((state) => state.freelancerAuth.me.id)
     const clientId = useSelector((state) => state.clientAuth.clientMe.id)

     const dispatch = useDispatch()

    const [image, setImage] = useState()
    const [imageUrl, setImageUrl] = useState()

    const uploadImage = () =>{
    
        const formData = new FormData()
        formData.append("file", image)
        formData.append("upload_preset", "q1rexrny")
        

        Axios.post("https://api.cloudinary.com/v1_1/dsj9mewkg/image/upload", formData).then((res)=>setImageUrl(res.data.url)).then(()=>{
            dispatch(updateFreelancerAsync({id: freelancerId, imageUrl}))
        })
       
        
         
    }
    
return (

    <div>
        <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}></input>
        <button onClick={uploadImage}>upload image</button>
    </div>
)

}


export default ImageUpload