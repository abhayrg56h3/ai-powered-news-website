import { Router } from "express";
import bcrypt from 'bcryptjs';
import dotenv from "dotenv";
import passport from "passport";
import crypto from 'crypto';
import { Strategy as LocalStrategy } from 'passport-local';
import User from "../models/User.js";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import nodemailer from "nodemailer";

const router=Router();
dotenv.config();








//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


// GOOGLE STRATEGY

// 1

router.get('/google', passport.authenticate("google", { scope: ["profile", "email"] }));



// 2

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
        console.log("👉 Google callback triggered!");
      // Look for the user in the database using Google profile id
      const existingUser = await User.findOne({ googleId: profile.id });
      
      if (existingUser) {
        return done(null, existingUser); // User found, return the existing user
      } else {
        // If user doesn't exist, create a new one
        const newUser = new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          profilePicture: profile.photos ? profile.photos[0].value : ''
        });


        console.log(newUser);
  
        await newUser.save(); // Wait for the user to be saved in the database
        return done(null, newUser); // Return the newly created user
      }
    } catch (err) {
      return done(err); // If there was an error, pass it to the next middleware
    }
  }));


  // 3


  router.get('/google/callback',passport.authenticate("google",{ failureRedirect: '/login' }),(req,res)=>{
      console.log("qwefr");
  res.redirect('http://localhost:5173/');
});



//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//




// SIGNUP

router.post('/signup',async (req,res)=>{
       try{
           
            const email=req.body.email;
            const name=req.body.name;
         

         const user=await User.findOne({email:email});

        if(user){
                   return res.status(400).json({ success: false, message: "User already exists" });
       
                 }
       
                 const hashedPassword=await bcrypt.hash(req.body.password,10);
                 console.log(hashedPassword);
              const newUser= new User({
                   email:req.body.email,
                   password:hashedPassword,
                   name:req.body.name,
                 });


                 console.log(newUser);
       
                 newUser.save();
                 res.status(201).json({ success: true, message: "User created successfully" });
               }
               catch(err){
                 res.status(500).json({ success: false, message: "Signup failed", error: err.message });
               }
});




// LOCAL STRATEGY


passport.use(new LocalStrategy({usernameField:'email'},async function (email,password,done){
            try{
               let user=await User.findOne({email:email});
              //  console.log("user",user);
               if(!user){
                   return done(null,false,{message:"user not found"});
               }
                const isMatch =await  bcrypt.compare(password, user.password);
        //  console.log("isMatch",isMatch);
        if (isMatch) {
            //  console.log(user);
          return done(null, user);
        } else {
          return done(null, false, { message: "Wrong password" });
        }
            }
            catch(err){
             return done(err);
            }
}));






// LOGOUT 


router.get("/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Logout failed" });
      }
  
      // Destroy session and clear cookie
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ success: false, message: "Session destruction failed" });
        }
  
        res.clearCookie("connect.sid", {
          path: "/",
          httpOnly: true,
          sameSite: "lax",
        });
  
        res.status(200).json({ success: true, message: "Logged out successfully" });
      });
    });
  });





// LOCAL LOGIN


// Step 1: Handle POST request to '/login' path
router.post('/login', function handleLoginRequest(req, res, next) {
  
  // Step 2: Call passport.authenticate() to get back a middleware function.
  // We're passing two arguments:
  //    - 'local' => name of the strategy (defined with passport.use(...))
  //    - callback function => to handle success/failure manually

  const authenticateFunction = passport.authenticate('local', function verifyUserCallback(err, user, info) {

    // Step 3A: If any internal error occurred (e.g., database error)
    if (err) {
      return next(err);  // Express error handler middleware will catch it
    }



      const rememberMe = req.body.rememberMe;

  // Set session cookie to expire in 7 days if rememberMe is true
  if (rememberMe) {
    req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days 🗓️
  } else {
    req.session.cookie.expires = false; // Session cookie only
  }

    // Step 3B: If user was not found or password was wrong
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"  // Friendly error message
      });
    }

    // Step 4: Log the user in manually
    // req.logIn is added to the request object by Passport
    // It serializes the user and stores it in the session
    req.logIn(user, function loginSessionCallback(err) {
      if (err) {
        return next(err);  // Something failed while logging in
      }

      // Step 5: Login was successful, send a success response
      console.log("✅ Login Successful!");
      console.log("🔥 User passed to serializeUser:", user);

      return res.status(200).json({
        success: true,
        message: "Login successful"
      });
    });
  });

  // Step 6: Execute the middleware function returned by passport.authenticate
  // by passing req, res, next manually.
  authenticateFunction(req, res, next);
});





//------------------------------------------------------------------------------------------------//



// SERIALISE USER


passport.serializeUser((user,done)=>{
   
  console.log("Serialise User is called");
    done(null,user._id);
});



// DESERIALISE USER

passport.deserializeUser(async(id,done)=>{
  console.log(id);
   const user=  await User.findById(id);

   done(null,user);
  
});



// FORGOT PASSWORD

router.post('/forgot', async (req, res) => {
  const { email } = req.body;
  console.log(email);

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found 😢" });

    // Generate token 🔐
    const token = crypto.randomBytes(20).toString("hex");

    // Set token & expiry in DB 🕒
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Configure mailer 📬
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.GMAIL_ID,
      subject: "Password Reset 🔒",
      text: `
You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
Click the link below to reset your password:\n\n
${process.env.FRONTEND_URL}/reset/${token} \n\n
This link will expire in 1 hour. If you did not request this, please ignore this email.
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ msg: "Reset link sent successfully! 💌✅" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error ⚠️" });
  }
});





router.post("/reset/:token", async (req, res) => {
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token 😓" });
    }

    // 🔐 Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 💾 Update user's password
    user.password = hashedPassword;

    // ❌ Clear reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ msg: "Password has been reset successfully! 🔒✅" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error ⚠️" });
  }
});


//------------------------------------------------------------------------------------------------//

export {router as authRouter  };