const redis = require('./redis/connection')();

const collatz = (async(seed) => {
    let value = seed;
    let steps = 0;
    let largest = 0;
    let sequence = [];

    sequence.push(value);

    while (value > 0) {
        if(value > largest) largest = value;
        // is a loop need to store this value as a looping value
        if (value === seed && sequence.length > 1){
            console.log(value, seed, sequence.length);
            redis.exists("LOOP:"+largest).then((result) => {
                if(!result) redis.set("LOOP:"+largest, seed);
            });
            break;
        }

        // check if the redis database has the key so we can skip calculating the rest 
        if(await redis.exists("LIST:"+value).then((result) => {return result;}))
            break;

        if(value % 2 == 0)
            value = Math.floor(value / 2);

        else
            value = (value * 3) + 1;

        sequence.push(value);            
    }

    steps = sequence.length;

    redis.exists("LIST:"+seed).then((result) => {
        if(result) return;
        redis.rpush("LIST:"+seed, ...sequence).then(()=>{});
        redis.hset("COLLATZ:"+seed, "LIST", "LIST:"+seed, "STEPS", steps);
    });
    
});

module.exports = collatz;