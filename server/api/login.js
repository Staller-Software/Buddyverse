const con = require("../routes/db");
const crypto = require("crypto");
const login = (req, res) => {
    let { email, password } = req.body;

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    if (!email || !password) {
        return res.json({ "message": "All fields are required", "status": "error" });
    }
    const emailCheckSql = "SELECT * FROM users WHERE email = ?";
    con.query(emailCheckSql, [email], (err, result) => {
        if (err) {
            console.error("Login error: " + err);
            return res.json({ "message": "Login error: " + err, "status": "error" });
        }
        else {
            if (result.length > 0) {
                let user = result[0];

                if (user.password === hashedPassword) {
                    /*res.cookie('email', email, {
                        maxAge: 364 * 24 * 60 * 60 * 1000,
                        httpOnly: true
                    });
                    res.cookie('userid', user.userid, {
                        maxAge: 364 * 24 * 60 * 60 * 1000,
                        httpOnly: true
                    });*/
                    return res.json({ "message": "Login successful!", "email": user.email, "username": user.username, "avatar": user.avatar, "userid": user.userid, "password": password, "status": "ok" });
                }
                else {
                    return res.json({ "message": "Incorrect password", "status": "error" });
                }
            }
            else {
                return res.json({ "message": "User not found", "status": "error" });
            }
        }
    });
}

module.exports = login;