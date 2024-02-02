const con = require("../routes/db");

const GetProfile = (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.json({ "message": "Unvalid user id", "status": "error" });
    }

    const getProfileSql = "SELECT avatar, biography, name, surname, username, followers, followUps FROM users WHERE username = ?";
    con.query(getProfileSql, [username], (err, results) => {
        if (err) {
            return res.json({ "message": "Database error: " + err, "status": "error" });
        }

        if (results.length === 0) {
            return res.json({ "message": "User not found.", "status": "error" });
        }

        const followersString = results[0].followers;
        const followUpsString = results[0].followUps;

        const followers = followersString.split('@').filter(item => item !== '');
        const followUps = followUpsString.split('@').filter(item => item !== '');

        const profileInfo = {
            "avatar": results[0].avatar,
            "biography": results[0].biography,
            "name": results[0].name,
            "surname": results[0].surname,
            "username": results[0].username,
            "followers": followers.length,
            "followUps": followUps.length,
            "status": "ok"
        };
        return res.json(profileInfo);
    });

};

module.exports = GetProfile;