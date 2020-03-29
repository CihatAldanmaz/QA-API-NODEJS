const sendJwtToClient = (user,response) => {
    //Generate JWT
    const token = user.generateJwtFromUser();
    return response.status(200)
    .cookie("access_token",token) 
    .json({
        success: true,
        access_token: token,
        data: {
            name: user.name,
            email:user.email
        }
    })
    //Response
}

const isTokenIncluded = (req) => {
    
    return (
        req.headers.authorization && req.headers.authorization.startsWith("Bearer:")
    )
}

const getAccessTokenFromHeader = (req) => {
    const authorization = req.headers.authorization;
    const access_token = authorization.split(" ")[1];
    return access_token
}

module.exports = {
    sendJwtToClient,
    isTokenIncluded,
    getAccessTokenFromHeader
};