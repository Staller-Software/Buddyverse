const express = require("express");
const router = express.Router();
const path = require("path");
const app = express();

router.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

module.exports = router;