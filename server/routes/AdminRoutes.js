const express = require ('express');
const router = express.Router();

router.all('/', (req, res) => {
    res.json({ authors: "its working" , user: req.user })
})

module.exports = router;

