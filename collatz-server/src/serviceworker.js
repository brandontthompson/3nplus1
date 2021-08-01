const redis = require('./redis/connection')();
const hashset = "collatz";
const collatz = ((seed) => {
    let value = seed;
    let steps = 0;
    let sequence = [];
    sequence.push(value);
    while (value > 1) {

        if (value === seed && sequence.length > 1)
            return // is a loop need to store this value as a looping value


        // check if the redis database has the key so we can skip calculating the rest 
        // redis.hexists(hashset, value).then((result) => {
        //     return;
        // }).catch()

        if(value % 2 == 0)
            value = Math.floor(value / 2);

        else
            value = (value * 3) + 1;

        sequence.push(value);            
    }

    steps = sequence.length;
    // possible to split the items into smaller keys so we can skip future work
    // for(let i = 0; i < sequence.length; i++){
    //     if(!redis.hexists(hashset, sequence[0])){
    //         redis.hset(hashset, sequence[0], sequence);
    //     }
    //     sequence.pop();
    // }
    if(!redis.hexists(hashset, seed))
    redis.hset(hashset, seed, sequence);
});

module.exports = collatz;