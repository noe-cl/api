const router = require("express").Router();
const argon = require("argon2");
const salt = new Buffer("salt_bae");
const User = require("../models/DTO/User");
const UserDao = require("../models/DAO/UserDAO");

router.get("/", (req, res) => {
    res.send("users");
});

router.post("/", (req, res) => {
    let user = new User();
    argon.hash(req.body.user.password, salt).then((hash) => {
        user.setLogin(req.body.user.login);
        user.setPassword(hash);
        user.setLodestoneId(req.body.user.lodestoneId);
        user.setRole("guest");
        UserDao.save(user).then((insertedUser) => {
            res.send(insertedUser);
        });
    }).catch((error) => {
        console.log(error);
    });
});

router.put("/:id", (req, res) => {

});

module.exports = router;