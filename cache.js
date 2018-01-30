'use strict';



/*
    Node
*/
class Node {
    constructor(key, prev, next) {
        this.key = key;
        this.prev = prev;
        this.next = next;
    }
}

/*
    doubly-linked-list Circular Deque
*/
class CircularDQ {
    constructor() {
        this.dummy = new Node();
        this._size = 0;

        //dummy pointing to itself, when dq is empty
        this.dummy.next = this.dummy.prev = this.dummy;
    }

    isEmpty() {
        return this._size <= 0;
    }

    size() {
        return this._size;
    }

    //add item at the beginning of this circular DQ
    addFirst(node) {
        node.prev = this.dummy;
        node.next = this.dummy.next;

        this.dummy.next.prev = node;
        this.dummy.next = node;
        this._size++;
    }

    //add new item at the end of this circular DQ
    addLast(node) {
        node.next = this.dummy;
        node.prev = this.dummy.prev;
        
        this.dummy.prev.next = node;
        this.dummy.prev = node;
        this._size++;
    }

    //remove item at the beginning of this circular DQ
    removeFirst() {
        if(this.isEmpty()) {
            throw new Error(`No Such Element Exception: cannot remove from empty cache`);
        }

        const removedKey = this.dummy.next.key;
        const nextNode = this.dummy.next.next;

        this.dummy.next = nextNode;
        nextNode.prev = this.dummy;
        this._size--;

        return removedKey;
    }

    //remove item at the end of this circular DQ
    removeLast() {
        if(this.isEmpty()) {
            throw new Error(`No Such Element Exception: cannot remove from empty cache`);
        }

        const removedKey = this.dummy.prev.key;
        const prevNode = this.dummy.prev.prev;

        this.dummy.prev = prevNode;
        prevNode.next = this.dummy;
        this._size--;

        return removedKey;
    }

    /*
        ****extra careful when using this method *****
        if node does not belong to this cache, it will cause serious problem
    */
    remove(node) {
        node.next.prev = node.prev;
        node.prev.next = node.next;
        this._size--;
    }
}


class Item {
    constructor(node, size, content) {
        this.node = node;
        this.size = size;
        this.content = content;
    }
}


/*
    First-In-First-Out replacement policy: when there is not enought memory space, it will remove items in FIFO order
*/
class FIFO {
    constructor(max) {
        if(!Number.isSafeInteger(max) || max <= 0) {
            throw new Error(`Illegal Argument Exception: arg(${max}) must be positive integer`);
        }
        this._MAX_MEMORY = max;    //in byte
        this._usedMemory = 0;    //in byte
        this._freeMemory = max;
        this._cache = new Map();
        this._priority = new CircularDQ;
    }

    /*
        return: boolean
    */
    has(key) {
        return !!this._cache.val;
    }

    /*
        return: if key found, return cached item. Otherwise, it returns undefined;
    */
    get(key) {
        const val = this._cache.val;

        return val ? val.content : undefined;
    }

    add(key, content, size) {
        if(key === undefined || key === null || key === NaN) {
            throw new Error(`Illegal Argument Exception: key(${key}) must not be undefined, null or NaN`);
        }
        if(!Number.isSafeInteger(size) || size <= 0) {
            throw new Error(`Illegal Argument Exception: size(${size}) must be positive integer`);
        }
        if(size > this._MAX_MEMORY) {
            throw new Error(`Illegal Argument Exception: size(${size}) is bigger than allowable memory size ${this._MAX_MEMORY}`);
        }

        //1. free memory in order to store new content
        //2. add new item to cache and queue;

        let val = this._cache(key);
        if(val) {
            this._freeMemory += val.size;
            val.content = undefined;
            val.size = 0;
        }

        //while there is not enough memory space, free memory
        while(this._freeMemory < size && !priority.isEmpty()) {
            priority
        }
    }

    remove(key) {}
}


class LRU {
    constructor(max) {
        this._MAX_MEMORY = max;    //in byte
        this._memoryUsage = 0;    //in byte
        this._cache = new WeakMap();
        this._priorities = [];
    }

    //get item from cache
    get(key) {
        const val = this._cache.get(key);
        const content = val ? val.content : undefined;

        //1. remove key from priority and put it in the back
        this.remove(key);
        set(key

    }

    //add item to cache or or update item that already exit in cache
    set() {}

    //remove item from cache
    remove(key) {
        const val = this._cache.get(key);

        //cache does not store the item
        if(!val) {
            return;
        }

        const node = val.node;

        /*
            node.next.prev = node.prev;
            node.prev.next = node.next;
            this._cache.delete(key);
        */
        node.remove();
    }
}

class LIFO {
    constructor(max) {
        if(!Number.isSafeInteger(max) || max <= 0) {
            throw new Error(`Illegal Argument Exception: arg(${max}) must be positive integer`);
        }
        this._MAX_MEMORY = max;    //in byte
        this._memoryUsage = 0;    //in byte
        this._cache = new WeakMap();
        this._priorities = [];
    }

    //if data stored in the cache, return the value. Otherwise return undefined;
    get(key) {
        return this._cache.has(key) ? _cache.get(key) : undefined;
    }

    add(key, val, size) {
        if(key === undefined || key === null || key === NaN) {
            throw new Error(`Illegal Argument Exception: key(${key}) must not be undefined, null or NaN`);
        }
        if(!Number.isSafeInteger(size) || size <= 0) {
            throw new Error(`Illegal Argument Exception: size(${size}) must be positive integer`);
        }
        if(size > this._MAX_MEMORY) {
            throw new Error(`Illegal Argument Exception: size(${size}) is bigger than allowable memory size ${this._MAX_MEMORY}`);
        }

        //1: if key is already in cache, remove its content and
        this._cache.get(key)
        //2: remove itmes, until cache have enought space
        //3: insert item into cache


        const cachedVal = this._cache.get(key);
        if(cachedVal) {
            this._memoryUsage - cachedVal.size + size >
        }

        //if there is not enough memory, remove items from cache
        if(this._memoryUsage + size > this._MAX_MEMORY) {
            
        }

    }

    //
    _remove(size) {
    
    }
}










module.exports = {
    FIFO: FIFO,
    LIFO: LIFO,
    LRU: LRU,
};
