import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    BelongsToSetAssociationMixin,
    BelongsToGetAssociationMixin
} from "sequelize";

import User, {UserInstance} from "./user.model";//

export interface SessionProps {
    id?    : number;
    token  : string;
    UserId?: number;
}

export interface SessionCreationProps extends SessionProps {}

export interface SessionInstance extends Model<SessionProps, SessionCreationProps>, SessionProps {
    setUser: BelongsToSetAssociationMixin<UserInstance, "id">;
    getUser: BelongsToGetAssociationMixin<UserInstance>;
}

export default function(sequelize: Sequelize): ModelCtor<SessionInstance> {
    return sequelize.define<SessionInstance>("Session", {
        id: {
            type         : DataTypes.BIGINT,
            primaryKey   : true,
            autoIncrement: true
        },
        token: {
            type  : DataTypes.STRING,
            unique: true
        }
    });
}