const express = require("express");
const router = express.Router();
const register = require("./register");
const login = require("./login");
const GetInfo = require("./get_info");
const GetProfile = require("./get_profile");
const SaveEdits = require("./save_edits");
const con = require("../routes/db");

const path = require('path');
const multer = require('multer');
const fs = require('fs');
router.use((req, res, next) => {
    const referer = req.get('referer') || req.get('referer');
    if (!referer) {
        return res.status(403).json({ "message": "Forbidden: Referer header missing", "status": "error" });
    }
    if (!referer.startsWith("https://stallersoftware.com") && !referer.startsWith("http://localhost:3000")) {
        return res.json({ "message": "Forbidden: POST and GET requests are not allowed from this address.", "status": "error" });
    }

    next();
});

const upload = multer({ dest: '../../client/public/avatars/' });

router.get('/', (req, res) => {
    res.json({ message: "Welcome my blog site!" })
});
router.post('/get_profile', GetProfile);
router.post('/get_info', GetInfo);
router.post('/save_edits', SaveEdits);

const allowedFileExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
router.post('/change_avatar', upload.single('avatar'), (req, res) => {
    const userId = req.body.userId;

    const fileExtension = path.extname(req.file.originalname).toLowerCase();

    if (!allowedFileExtensions.includes(fileExtension)) {
        return res.json({
            "message": "Forbidden: Only jpg, jpeg, png, and gif file formats are allowed.",
            "status": "error"
        });
    }

    const newFileName = `${userId}${path.extname(req.file.originalname)}`;
    const newFilePath1 = path.join(__dirname, '../../client/build/avatars', newFileName);
    const newFilePath2 = path.join(__dirname, '../../client/public/avatars', newFileName);

    fs.copyFile(req.file.path, newFilePath1, (err1) => {
        if (err1) {
            return res.json({ "message": "Error copying file to build folder: " + err1 + "\n" + newFilePath2, "status": "error" });
        }

        fs.copyFile(req.file.path, newFilePath2, (err2) => {
            if (err2) {
                return res.json({ "message": "Error copying file to public folder: " + err2 + "\n" + newFilePath2, "status": "error" });
            }

            fs.unlink(req.file.path, (unlinkErr) => {
                if (unlinkErr) {
                    return res.json({ "message": "Error deleting original file: " + unlinkErr, "status": "error" });
                }

                const updateSql = "UPDATE users SET avatar = ? WHERE userid = ?";
                con.query(updateSql, [newFileName, userId], (dbErr) => {
                    if (dbErr) {
                        return res.json({ "message": "Database error: " + dbErr, "status": "error" });
                    }
                    res.json({ "message": "Your avatar has been successfully changed. It may take some time to update everywhere.", "status": "ok" });
                });
            });
        });
    });
});
router.post('/remove_avatar', (req, res) => {
    const { userId } = req.body;

    const getAvatarSql = "SELECT avatar FROM users WHERE userid = ?"
    con.query(getAvatarSql, [userId], (err, results) => {
        if (err) {
            return res.json({ "message": "Database error: " + err, "status": "error" });
        }

        if (results.length === 0) {
            return res.json({ "message": "User not found", "status": "error" });
        }

        const avatarPath = path.join(__dirname, '../../client/public/avatars/');
        const fileName = results[0].avatar;

        const avatarFile = path.join(avatarPath, fileName);

        const deleteAvatarSql = "UPDATE users SET avatar = NULL WHERE userid = ?";
        con.query(deleteAvatarSql, [userId], (err, results) => {
            if (err) {
                return res.json({ "message": "Database error: " + err, "status": "error" });
            }

            if (results.affectedRows > 0) {
                fs.unlink(avatarFile, (err) => {
                    if (err) {
                        return res.json({ "message": "File deletion error: " + err, "status": "error" });
                    }
                    return res.json({ "message": 'Avatar removed successfully.', "status": "ok" });
                });
            }
            else {
                return res.json({ "message": "Avatar not found or already deleted", "status": "error" });
            }
        });

    })
});
router.post('/register', register);
router.post('/login', login);

module.exports = router;