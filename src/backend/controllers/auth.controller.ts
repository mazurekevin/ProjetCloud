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

    // public async log(email: string, password: string): Promise<any> {
    //     const passwordHashed = await hash(password, 5);
    //     const user = await this.User.findOne({
    //         where: {
    //             email
    //         }
    //     });
    //     if (user === null) {
    //         return null
    //     }
    //     const isSamePassword = await compare(password, user.password);
    //     if(!isSamePassword) {
    //         console.log(passwordHashed + ' ' + user.password)
    //         return null;
    //     }
    //     const token = await hash(Date.now() + email,5);
    //     const session = await this.Session.create({
    //         token,
    //     });
    //     await session.setUser(user);
    //     return {session, user};
    // }
}