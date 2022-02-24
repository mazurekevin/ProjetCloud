import express from "express";
import { check, validationResult } from 'express-validator';
import { AuthController } from "../controllers/auth.controller";
import { hash } from "bcrypt";

const authRouter = express.Router();

authRouter.post("/subscribe",
    check('firstname').isLength({ min: 1 }).isAlpha(),
    check('lastname').isLength({ min: 1 }).isAlpha(),
    check('password').isLength({ min: 8 }),
    check('email').isEmail(),
    async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const firstname   = req.body.firstname;
        const lastname    = req.body.lastname;
        const password    = req.body.password;
        const email       = req.body.email;

        const authController = await AuthController.getInstance();
        const passwordHashed = await hash(password, 5);
        const user = await authController.subscribe({
            firstname,
            lastname,
            password: passwordHashed,
            email,
        });
        if (user !== null) {
            res.json(user);
            res.status(201).end();
        } else {
            res.status(409).send({error: 'Email already used'}).end();
        }
        return
    });

authRouter.post("/login", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;


    if (email === undefined || password === undefined) {
        res.status(400).end();
        return;
    }
    const authController = await AuthController.getInstance();
    const data = await authController.log(email, password);

    if (data === null) {
        res.status(404).send({error: 'Invalid user login'}).end();
        return;
    } else {
        res.json({
            token: data.session.token,
            user: data.user
        });
    }
});

export {
    authRouter
};