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
    }

    __conn() {
        return require('redis').createClient(require('./retry'));
        //todo remove the return then call liek
        // redis.instance.FUNC()
        //stuff like buffer will be redis.buffer()
    }

    instance() {
        return this.connection;
    }

    buffer(data) {
        return Buffer.from(data);
    }

    disolveObject(object) {
        let disolved = [];

        if (!object)
            return;

        for (const [key, value] of Object.entries(object)) {
            disolved.push(key)
            disolved.push(value)
            console.log(key, typeof key, value, typeof value);
        };

        if (disolved.length % 2 !== 0)
            throw new Error("Invalid key value set");
        return [...disolved];
    }

    flattenObject(object) {
        let flattened = [];

        // if
    }

    hsetobject(key, object) {
        for (const [objKey, value] of Object.entries(object)) {
            this.hset(key, [objKey, value])
                .catch((error) => { throw error; })
        }
    }

}

module.exports = Redis;