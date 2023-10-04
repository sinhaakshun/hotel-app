function  roleCheck(requiredRole){
    return (req, res, next) => {
        console.log(req.user.userData.role);
        const userRole = req.user.userData.role;
        if(userRole === requiredRole){
            next();
        }
        else{
            res.json({ msg : 'access denied'})
        }
    }
}

module.exports = roleCheck;