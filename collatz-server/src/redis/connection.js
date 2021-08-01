// const connect = require('../../../modules/event/connect')();
const Redis = require('./redis');
let instance;
module.exports = ((connection) => {
    if (!instance)
        instance = new Redis(connection);
    return instance;
});
