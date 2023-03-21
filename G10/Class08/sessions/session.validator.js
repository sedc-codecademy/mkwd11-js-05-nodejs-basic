const sessionValidator = (req, res, next) => {
    if (req?.session?.loggedIn) {
        // User is logged in
        next()
    } else {
        // User is not logged in
        res.status(403).send(`You are not authenticated.`)
    }
}

export default sessionValidator;