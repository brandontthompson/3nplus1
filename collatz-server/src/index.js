const serviceworker = require('./serviceworker');
const redis = require('./redis/connection')();
require('./serverlistener');

(() => {
    for(let i = 0; i < 50000; i++){
        serviceworker(i);
    }
})();

