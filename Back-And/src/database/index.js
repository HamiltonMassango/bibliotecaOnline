import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';
import Books from '../app/models/Books';

import databaseConfig from '../config/databases';

const models = [User, File, Books];

class Database {
  constructor() {
    this.init();
  }
  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
