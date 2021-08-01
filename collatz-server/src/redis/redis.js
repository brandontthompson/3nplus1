const { promisify } = require('util');
class Redis {
    constructor(connection) {
        if (!connection) {
            try {
                connection = this.__conn();
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
        this.connection = connection;
        this.getAsync = promisify(connection.get).bind(connection);
        this.saddAsync = promisify(connection.sadd).bind(connection);
        this.scardAsync = promisify(connection.scard).bind(connection);
        this.hset = promisify(connection.hset).bind(connection);
        this.hget = promisify(connection.hget).bind(connection);
        this.hgetall = promisify(connection.hgetall).bind(connection);
        this.exists = promisify(connection.exists).bind(connection);
        this.hexists = promisify(connection.hexists).bind(connection);
        this.rpush = promisify(connection.rpush).bind(connection);
        this.lpush = promisify(connection.lpush).bind(connection);
        this.lrange = promisify(connection.lrange).bind(connection);
        this.set = promisify(connection.set).bind(connection);
        this.get = promisify(connection.get).bind(connection);
    }

    __conn() {
        return require('redis').createClient(require('./config')); 
    }

    instance() {
        return this.connection;
    }

    buffer(data) {
        return Buffer.from(data);
    }
}

module.exports = Redis;