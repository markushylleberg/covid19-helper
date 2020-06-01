const { Model } = require('objection');

class ThreadUserPinned extends Model {
  static get tableName() {
    return 'ThreadUserPinned';
  }
}

module.exports = ThreadUserPinned;
