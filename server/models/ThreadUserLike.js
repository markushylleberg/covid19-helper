const { Model } = require('objection');

class ThreadUserLike extends Model {
  static get tableName() {
    return 'ThreadUserLike';
  }
}

module.exports = ThreadUserLike;
