import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    BelongsToManyAddAssociationMixin
} from "sequelize";

export interface UserProps {
    id?      : number;
    firstname: string;
    lastname : string;
    password : string;
    email    : string;
}

export interface UserCreationProps extends UserProps {}

export interface UserInstance extends Model<UserProps, UserCreationProps>, UserProps {
}

export default function(sequelize: Sequelize): ModelCtor<UserInstance> {
    return sequelize.define<UserInstance>("User", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey   : true,
            autoIncrement: true
        },
        firstname: {
            type  : DataTypes.STRING
        },
        lastname: {
            type  : DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
    });
}