"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalMap = void 0;
const sequelize_1 = require("sequelize");
class Goal extends sequelize_1.Model {
}
exports.default = Goal;
// sqlize is the instance of the db connection 
const GoalMap = (sequelize) => {
    Goal.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: sequelize_1.DataTypes.STRING(255)
            // allowNull: False
        },
        description: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: true
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: "goals",
        timestamps: false
    });
    Goal.sync();
};
exports.GoalMap = GoalMap;
//# sourceMappingURL=goal.js.map