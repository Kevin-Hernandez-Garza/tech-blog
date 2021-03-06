const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//User model
class User extends Model{
    // method that runs instance data(per user) to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

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
        // passing in a hook for password hashing
        hooks: {
            // beforeCreate lifecycle "hook" functionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // beforeUpdate hook
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
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

