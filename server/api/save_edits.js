const con = require("../routes/db");

const SaveEdits = (req, res) => {
    const { username, name, surname, biography, gender, userId } = req.body;

    const checkUsernameSql = "SELECT * FROM users WHERE username = ? AND userid != ?";
    con.query(checkUsernameSql, [username, userId], (checkErr, checkResults) => {
        if (checkErr) {
            return res.json({ "message": "Database error: " + checkErr, "status": "error" });
        }

        if (checkResults.length > 0) {
            return res.json({ "message": "Username is already in use.", "status": "error" });
        }

        const updateSql = "UPDATE users SET username = ?, name = ?, surname = ?, biography = ?, gender = ? WHERE userid = ?";
        con.query(updateSql, [username, name, surname, biography, gender, userId], (updateErr, updateResults) => {
            if (updateErr) {
                return res.json({ "message": "Database error: " + updateErr, "status": "error" });
            }

            if (updateResults.affectedRows === 0) {
                return res.json({ "message": "User not found.", "status": "error" });
            }

            const userInfo = { ...updateResults[0], "message": "Your changes have been saved.", "status": "ok" };
            return res.json(userInfo);
        });
    });


}

module.exports = SaveEdits;