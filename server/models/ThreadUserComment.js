const { Model } = require('objection');

class ThreadUserComment extends Model {
  static get tableName() {
    return 'ThreadUserComment';
  }
}

module.exports = ThreadUserComment;
