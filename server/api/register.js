const con = require("../routes/db");
const crypto = require("crypto");

const register = (req, res) => {
    let { username, password, name, surname, email } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.json({ "message": "Invalid email format", "status": "error" });
    }

    if (password.length < 8) {
        return res.json({ "message": "Password must be at least 8 characters long", "status": "error" });
    }

    if (!username || !password || !name || !email) {
        return res.json({ "message": "All fields are required", "status": "error" });
    }

    try {
        const usernameCheckSql = "SELECT * FROM users WHERE username = ?";
        con.query(usernameCheckSql, [username], (usernameCheckErr, usernameCheckResult) => {
            if (usernameCheckErr) {
                console.error("Register error: " + usernameCheckErr);
                return res.json({ "message": "Register error: " + usernameCheckErr, "status": "error" });
            }

            if (usernameCheckResult[0]) {
                return res.json({ "message": "Username already registered", "status": "error" });
            } else {
                const emailCheckSql = "SELECT * FROM users WHERE email = ?";
                con.query(emailCheckSql, [email], (emailCheckErr, emailCheckResult) => {
                    if (emailCheckErr) {
                        console.error("Register error: " + emailCheckErr);
                        return res.json({ "message": "Register error: " + emailCheckErr, "status": "error" });
                    }

                    if (emailCheckResult[0]) {
                        return res.json({ "message": "Email already registered", "status": "error" });
                    } else {
                        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

                        const insertSql = `INSERT INTO users (username, name, surname, email, password, gender) VALUES (?, ?, ?, ?, ?, ?)`;
                        con.query(insertSql, [username, name, surname, email, hashedPassword, 'Undefined'], (insertErr) => {
                            if (insertErr) {
                                console.error("Register error: " + insertErr);
                                return res.json({ "message": "Register error: " + insertErr, "status": "error" });
                            }

                            return res.json({ "message": "User registration successful!", "status": "ok" });
                        });
                    }
                });
            }
        });
    } catch (error) {
        console.error("Register error: " + error);
        return res.json({ "message": "Register error: " + error, "status": "error" });
    }
};

module.exports = register;
