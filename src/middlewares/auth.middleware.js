import jwt from 'jsonwebtoken'

export const auth =  (req,res,next) =>{
    const token = req.cookies.token

    if(!token){
        return res.status(400).json({message:"Unauthorized."})
    }

    try {
        const decoded = jwt.verify(token,process.env.SECRET_TOKEN)

        if(!decoded){
            return res.status(400).json({message:"Unauthorized."})
        }

        req.userId = decoded.userId

        return next()
    } catch (error) {
        console.log(error)
        return res.statu(400).json({message:"Unauthorized."})
    }
}