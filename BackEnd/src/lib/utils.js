import jwt from 'jsonwebtoken'

export const generateToken=(userId, res)=>{
    const token= jwt.sign({userId},process.env.JWT_SECRET, {expiresIn: '7d'})

    res.cookie("jwt",token,{
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV !== "development"})

    return token;

};