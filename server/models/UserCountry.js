const { Model } = require('objection');

class UserCountry extends Model {
  static get tableName() {
    return 'UserCountry';
  }
}

module.exports = UserCountry;
