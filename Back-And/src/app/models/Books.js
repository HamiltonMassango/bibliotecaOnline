import { Model, DataTypes } from 'sequelize';
class Book extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        editora: DataTypes.STRING,
        autors: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Book;
