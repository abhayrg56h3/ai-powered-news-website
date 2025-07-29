import { Router } from "express";
import { updateImage } from "../controllers/userController.js";
import { updateName } from "../controllers/userController.js";
import { deleteUser } from "../controllers/userController.js";
import { updatePassword } from "../controllers/userController.js";
import { updatePreferences } from "../controllers/userController.js";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import multer from "multer";

dotenv.config();



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'user_profiles', // Folder in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});



const upload = multer({ storage });
const router = Router();




router.post('/upload',upload.single('image'),updateImage);
router.post('/name',updateName);
router.post('/password',updatePassword);
router.delete('/delete',deleteUser);


//  GET CURRENT USER


router.get('/curruser',(req,res)=>{

   console.log("currUser in user.js", req.user);
         if(!req.user){
        res.status(200).json("");
       }
       else{
        res.status(200).json(req.user);
       }
});


router.post('/updatepreferences',updatePreferences);




export {router as userRouter  };