

const createPostController = async(req,res)=>{
//   console.log(req.cookies)
const token = req.cookies.token;
if(!token){
    return res.status(401).json({
        message:"User is not authorized to create a post"
    })
}

}

module.exports = {createPostController}