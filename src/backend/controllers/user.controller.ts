import {ModelCtor}        from "sequelize";
import {UserInstance}     from "../models/user.model";
import {SequelizeManager} from "../models";
import { Request } from "express";
//import { getLoggedUser } from '../middlewares/auth.middleware';

export class UserController {

    User   : ModelCtor<UserInstance>;

    private static instance: UserController;

    public static async getInstance(): Promise<UserController> {
        if(UserController.instance === undefined) {
            const {User}   = await SequelizeManager.getInstance();
            UserController.instance = new UserController(User);
        }
        return UserController.instance;
    }

    private constructor(User: ModelCtor<UserInstance>) {
        this.User    = User;
    }

    public async getAll(isAvailable: boolean=false): Promise<UserInstance[] | null> {
        let users: any;
        // if (isAvailable) {
            users = await this.User.findAll({
                attributes: ['id', 'firstname', 'lastname', 'email', 'password']
            });
        // }else{
        //     users = await this.User.findAll({
        //         attributes: ['id', 'firstname', 'lastname', 'username', 'email', 'password', 'photo',
        //                     'number', 'address', 'zipcode', 'city', 'cantEat', 'bio', 'isAvailable']
        //     });
        // }
        return users;
    }

    public async getBy(email: any): Promise<UserInstance | null> {
        const id = parseInt(email);
        let user;
        if(isNaN(id)){
            user = await this.User.findOne({ where: { email} })
        }else{
            user = await this.User.findOne({ where: { id} })
        }
        if (user !== null) {
            return user;
        }
        return null;
    }

    public async remove(by: any, req: Request, isNotAdmin: boolean=false): Promise<UserInstance | null> {
        let user: any;
      
        user = await this.getBy(by);
        
        if (user !== null) {
            user.destroy();
            return user;
        }
        return null;
    }
}