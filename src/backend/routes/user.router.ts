import express from "express";
import {check, validationResult} from 'express-validator';
import { UserController } from "../controllers/user.controller";
//import { isAuth, hasRole} from '../middlewares/auth.middleware';

const userRouter = express.Router();

userRouter.get("/", async function(req, res) {
    const plateController = await UserController.getInstance();
    const plate = await plateController.getAll();
    if(plate !== null) {
        res.status(200);
        res.json(plate);
    }else {
        res.status(404).end();
    }
});
userRouter.get("/availables", async function(req, res) {
    const plateController = await UserController.getInstance();
    const plate = await plateController.getAll(true);
    if(plate !== null) {
        res.status(200);
        res.json(plate);
    }else {
        res.status(404).end();
    }
});
userRouter.get("/:by", async function(req,res) {
    const userController = await UserController.getInstance();
    const user = await userController.getBy(req.params.by);
    if(user !== null) {
        res.status(200).json(user).end();
    } else {
        res.status(404).send({error: 'field not found'}).end();
    }
})

userRouter.put("/:by", async function (req, res) {
    const userController = await UserController.getInstance();
    const user = await userController.getBy(req.params.by);
    if (user !== null) {
        await user.update({
            firstname  : req.body.firstname || user.firstname,
            lastname   : req.body.lastname || user.lastname,
            password   : req.body.password || user.password,
            email      : req.body.email || user.email
        })
        res.status(201).json(user).end();
    } else {
        res.status(404).send({error: "No such user"}).end();
    }
})

userRouter.delete("/:by", async function(req,res) {
    const userController = await UserController.getInstance();
    const user = await userController.remove(req.params.by, req);
    if(user !== null) {
        res.status(200).send({success: 'Deletion completed'}).end();
    } else {
        res.status(404).send({error: 'Not such user'}).end();
    }
})

userRouter.delete("/unsuscribe/:by", async function(req,res) {
    const userController = await UserController.getInstance();
    const user = await userController.remove(req.params.by, req, true);
    if(user !== null) {
        res.status(200).send({success: 'Deletion completed'}).end();
    } else {
        res.status(404).send({error: 'Not such user'}).end();
    }
})
export {
    userRouter
};