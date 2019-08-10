module.exports = function (sequelize, DataTypes) {
  let Feed = sequelize.define("Feed", {
    // The email cannot be null, and must be a proper email before creation
    user: {
      type: DataTypes.STRING,
    },
    // The password cannot be null
    postContent: {
      type: DataTypes.STRING,
    },
    postPrice: {
      type: DataTypes.DOUBLE,

    },
    postImage: {
      type: DataTypes.STRING,

    }
  });
  Feed.associate = function (models) {
    Feed.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    })
  }
  return Feed;
}