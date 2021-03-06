import { Model, Sequelize, DataTypes, IntegerDataType } from 'sequelize';

export default class Goal extends Model {
    public id?: IntegerDataType;
    public title!: string;
    public description?: string;
    public createdAt?: string;
}
// sqlize is the instance of the db connection 
export const GoalMap = (sequelize: Sequelize) => {
    Goal.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        createdAt: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
        sequelize,
        tableName: "goals",
        timestamps: false
    });
    Goal.sync();
}

