// allows us to verify if the user has the required roles to access the route. We can pss in multiple roles as arguments to the function. If the user has any of the roles, the function will call next() and allow the user to access the route. If the user does not have any of the roles, the function will return a 401 status code.
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        const result = req.roles
            .map((role) => rolesArray.includes(role))
            .find((val) => val === true);
        if (!result) return res.sendStatus(401);
        next();
    };
};

module.exports = verifyRoles;
