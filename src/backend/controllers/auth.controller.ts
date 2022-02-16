import {ModelCtor} from "sequelize";
import {UserCreationProps, UserInstance} from "../models/user.model";
import {SequelizeManager} from "../models";
import {compare, hash} from "bcrypt";

export class AuthController {

    User   : ModelCtor<UserInstance>;

    private static instance: AuthController;

    public static async getInstance(): Promise<AuthController> {
        if(AuthController.instance === undefined) {
            const {User}   = await SequelizeManager.getInstance();
            AuthController.instance = new AuthController(User);
        }
        return AuthController.instance;
    }

    private constructor(User: ModelCtor<UserInstance>) {
        this.User    = User;
    }

    public async subscribe(props: UserCreationProps):
        Promise<UserInstance | null> {
        return await this.User.create(props);
    }
}