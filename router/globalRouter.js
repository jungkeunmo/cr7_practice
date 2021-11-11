const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", (req, res, next) => {
    const selectQuery = `
        SELECT  name,
                size,
                createdAt
          FROM  img     
    `;

    try {
        db.query(selectQuery, (err, imgs) => {
            res.render("screens/home", {imgs});
        });
    } catch (error) {
        console.error(error);
        return res.redirect("/");
    };
});

router.get("/img", (req, res, next) => {
    res.render("screens/img");
});

router.post("/img", (req, res, next) => {
    const insertQuery = `
        INSERT  INTO    img (
            name,
            size,
            createdAt
        ) VALUES (
            "${req.body.name}",
            "${req.body.size}",
            now()
        )
    `;

    try {
        db.query(insertQuery, (error, imgs) => {
            if(error) {
                console.log(error);
            };
            res.redirect("/");
        });
    } catch (error) {
        console.log(error);
        res.redirect("/");
    };
});

module.exports = router;