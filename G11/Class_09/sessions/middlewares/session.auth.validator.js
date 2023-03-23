export const isLoggedInValidator = (req, res, next) => {
    const session = req.session
   
    if(session.user !== undefined && session.user.isLoggedIn){
        next()
    }else {
        res.status(401).send({message: "You have to login amigo"})
    }
};