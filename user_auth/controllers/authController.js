const usersDB = {
    users: require("../model/users.json"),
    setUsers: function (data) {
        this.users = data;
    },
};
const bcrypt = require("bcrypt");

// determine if the user is in the database and if the password is correct
const handleLogin = async (req, res) => {
    const {user, pwd} = req.body;
    if (!user || !pwd)
        return res
            .status(400)
            .json({message: "Username and password are required."});
    const foundUser = usersDB.users.find((person) => person.username === user);
    if (!foundUser) return res.sendStatus(401); //Unauthorized
    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        // create JWTs
        res.json({success: `User ${user} is logged in!`});
    } else {
        res.sendStatus(401);
    }
};

module.exports = {handleLogin};

/*
{
  "user" : "walt3",
  "pwd" : "qwerty"
}
*/
