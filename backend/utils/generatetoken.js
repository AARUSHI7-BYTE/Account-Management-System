import jwt from "jsonwebtoken";

const Generatetoken = (user)=>{
    return jwt.sign(
        {id:user.id,email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}

    )
}

export default Generatetoken;