import User from "../models/User.js";
import bcrypt from "bcryptjs";


// UPDATE USER IMAGE

export async function updateImage (req, res)  {


    
  try {
    const imageUrl = req.file.path; // Cloudinary URL

    await User.findByIdAndUpdate(req.user.id, {
      profilePicture: imageUrl,
    });

  

    res.json({ imageUrl });
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ error: 'Upload failed' });
  }
};


// UPDATE USER NAME

export async function updateName(req,res){
       try{
           await User.findByIdAndUpdate(req.user.id, {
      name:req.body.name
    });
    res.status(200).json("Uploaded successfully");
       }
       catch(err){
        console.error("❌ Upload error:", err);
    res.status(500).json({ error: 'Upload failed' });
       }
}


// PASSWORD UPDATE
export async function updatePassword(req,res){
        try{
          const {oldPassword,newPassword,confirmPassword}=req.body;
          const isMatch =await  bcrypt.compare(oldPassword, req.user.password);
          if(!isMatch){
            return res.status(400).json({ error: 'Old password is incorrect' });
          }
          
          
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          await User.findByIdAndUpdate(req.user.id, { password: hashedPassword });
          res.status(200).json({ message: 'Password updated successfully' });
        }
        catch(err){
          console.error("❌ Password update error:", err);
          res.status(500).json({ error: 'Password update failed' });
        }
}



// DELETE USER ACCOUNT
export async function deleteUser(req, res) {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({ message: 'User account deleted successfully' });
  } catch (err) {
    console.error("❌ Account deletion error:", err);
    res.status(500).json({ error: 'Account deletion failed' });
  }
}



// UPDATE USER PREFERENCES  

export async function updatePreferences(req,res){
          console.log(req.body);

        try{
            // Get the regions, topics and sources from the request body
            const regions=req.body.regions;
            const topics=req.body.topics;
            const sources=req.body.sources;

            // Get the current user from the request
            const user=req.user;

            // Update the preferences of the user
            user.preferences.regions=regions;
            user.preferences.topics=topics; 
            user.preferences.sources=sources;

            // Save the updated user
            await user.save();

            // Send a success response
            res.status(200).json("Updated successfully");


        }
        catch(err){
           // Send an error response if something goes wrong
           res.status(500).json(err);
        }
}


  
 
