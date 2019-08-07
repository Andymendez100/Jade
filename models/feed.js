module.exports = function (sequelize, DataTypes) {
    let Feed = sequelize.define("Feed", {
      // The email cannot be null, and must be a proper email before creation
      userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // The password cannot be null
      postContent: {
        type: DataTypes.STRING,
        allowNull: false
      },
      postPrice: {
          type: DataTypes.DOUBLE,
          allowNull: false
      },
      postImage: {
          type: DataTypes.STRING,
          allowNull: false
      }
    });
    return Feed;
}