const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("users");
});

router.post("/", (req, res) => {

});

router.put("/:id", (req, res) => {

});

module.exports = router;