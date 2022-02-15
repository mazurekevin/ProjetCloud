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
            dialect : process.env["DB_DRIVER"] as Dialect,
            host    : process.env["DB_HOST"],
            database: process.env["DB_NAME"],
            username: process.env["DB_USER"],
            password: process.env["DB_PASSWORD"],
            port    : Number.parseInt(process.env["DB_PORT"] as string), 
            
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
        SequelizeManager.associate(managerProps);
        await sequelize.sync();
        return new SequelizeManager(managerProps);
    }

    private static associate(props: SequelizeManagerProps): void {

    }
}