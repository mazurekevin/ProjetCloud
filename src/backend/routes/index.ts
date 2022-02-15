import {Express}           from "express";
import {authRouter}        from "./auth.router";
import {userRouter}        from "./user.router";
/*
import {recipeRouter} from "./recipe.router";
import { evaluationRouter } from "./evaluation.router";
*/

export function buildRoutes(app: Express) {
    app.use("/auth", authRouter);
    app.use("/users", userRouter);
    /*app.use("/evaluations", evaluationRouter);
    */
}