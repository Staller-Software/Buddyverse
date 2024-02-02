const con = require("../routes/db");

const GetInfo = (req, res) => {
    const { userId } = req.body;

    if (!userId)
    {
        return res.json({ "message": "Unvalid user id.", "status": "error" });
    }

    const sqlQuery = "SELECT * FROM users WHERE userid = ?";

    con.query(sqlQuery, [userId], (err, results) => {
        if (err)
        {
            return res.json({ "message": "Database error: " + err, "status": "error" });
        }

        if (results.length === 0)
        {
            return res.json({ "message": "User not found", "status": "error" });
        }

        const userInfo = { ...results[0], "status": "ok" };
        return res.json(userInfo);
    });
}

module.exports = GetInfo;