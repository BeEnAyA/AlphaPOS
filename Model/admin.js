module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("admin", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      file: {
        type: DataTypes.STRING,
        allowNull: true,
      },

    });
    return Admin;
  };