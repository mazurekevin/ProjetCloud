import {Dialect, ModelCtor, Sequelize}                    from "sequelize";
import userCreator, {UserInstance}               from "./user.model";

export interface SequelizeManagerProps {
    sequelize      : Sequelize;
    User           : ModelCtor<UserInstance>;
}

export class SequelizeManager implements SequelizeManagerProps {

    private static instance?: SequelizeManager;

    sequelize      : Sequelize;
    User           : ModelCtor<UserInstance>;

    private constructor(props: SequelizeManagerProps) {
        this.sequelize       = props.sequelize;
        this.User            = props.User;
    }

    public static async getInstance(): Promise<SequelizeManager> {
        if(SequelizeManager.instance === undefined) {
            SequelizeManager.instance = await SequelizeManager.initialize();
        }
        return SequelizeManager.instance;
    }

    private static async initialize(): Promise<SequelizeManager> {
        const sequelize = new Sequelize({
            dialect : "mysql" as Dialect,
            host    : "localhost",
            database: "projet_cloud",
            username: "root",
            password: "root",
            port    : 3306,
            
            define: {
                freezeTableName: true,
                paranoid       : true,
                timestamps     : true
            }
        });
        await sequelize.authenticate();
        const managerProps: SequelizeManagerProps = {
            sequelize,
            User           : userCreator(sequelize),
        }
        await sequelize.sync();
        return new SequelizeManager(managerProps);
    }

}