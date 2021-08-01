const serviceworker = require('./serviceworker');
require('./serverlistener');

(() => {
    let i = 2;
    while(true){
        serviceworker(i);
        i++;
    }
})();

