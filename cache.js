'use strict';



class FIFO {
    constructor() {}
}

class LIFO {
    constructor(size) {
        this._maxMemory = size;
        this._cache = new WeakMap();
    }

    get(key) {
        if(
    }
}

class LRU {
    constructor() {}
}






module.exports = {
    FIFO: FIFO,
    LIFO: LIFO,
    LRU: LRU,
    PQ: PQ
};
