const Sql = require("sequelize");
class Post extends Sql.Model {
  static init(sequelize) {
    return super.init(
      {
        msg: {
          type: Sql.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Post",
        tableName: "posts",
        paranoid: false,
        charset: "utf8",
        collate: "uft8_general_ci",
      }
    );
  }
}
