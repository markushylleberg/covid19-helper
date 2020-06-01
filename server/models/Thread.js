const { Model } = require('objection');

class Thread extends Model {
  static get tableName() {
    return 'Thread';
  }
}

module.exports = Thread;
