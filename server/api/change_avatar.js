const express = require("express");
const multer = require("multer");
const path = require("path");

const newFileName = "";

const uploadFolder = path.join(__dirname, "../../client/public/avatars/");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        const fileName = req.body.userId + path.extname(file.originalname);
        cb(null, fileName);
    },
});

const ChangeAvatar = () => multer({ storage });

module.exports = newFileName;
module.exports = ChangeAvatar;