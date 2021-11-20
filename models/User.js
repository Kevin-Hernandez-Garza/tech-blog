const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//User model
class User extends Model{}

// table column & configuration
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            primaryKey: true, 
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false, 
            validate: {
                len: [4]
            }
        }
    },
    {
        // passing our sequelize connection
        sequelize,
        // dont auto create timestamp fields (createdAt/updatedAt)
        timestamps: false,
        // dont pluralize db table 
        freezeTableName: true, 
        // use underscores instead of camelCase
        underscored: true, 
        // model name stays lowercase
        modelName: 'user'
    }
);

module.exports = User;

