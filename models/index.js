// collecting data(importing models)
const User = require('./User');
const Post = require('./Post');

// associations 
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// exporting data 
module.exports = { User, Post };