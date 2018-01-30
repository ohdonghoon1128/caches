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

    //get the first node of this circular DQ
    peekFirst() { 
        if(this.isEmpty()) {
            throw new Error(`No Such Element Exception: cannot peek from empty deque`);
        }

        return this.dummy.next;
    }

    //get the last node of this circular DQ
    peekLast() {
        if(this.isEmpty()) {
            throw new Error(`No Such Element Exception: cannot peek from empty deque`);
        }
        
        return this.dummy.prev;
    }

    //add new key at the beginning of this circular DQ
    addFirst(key) {
        const node = new Node(key, this.dummy, this.dummy.next);

        this.dummy.next.prev = node;
        this.dummy.next = node;
        this._size++;
    }

    //add new key at the end of this circular DQ
    addLast(key) {
        const node = new Node(key, this.dummy.prev, this.dummy);
        
        this.dummy.prev.next = node;
        this.dummy.prev = node;
        this._size++;
    }

    //remove item at the beginning of this circular DQ
    removeFirst() {
        if(this.isEmpty()) {
            throw new Error(`No Such Element Exception: cannot remove from empty deque`);
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
            throw new Error(`No Such Element Exception: cannot remove from empty deque`);
        }

        const removedKey = this.dummy.prev.key;
        const prevNode = this.dummy.prev.prev;

        this.dummy.prev = prevNode;
        prevNode.next = this.dummy;
        this._size--;

        return removedKey;
    }

    /*
        ***** extra careful when using this method *****
        if the node does not belong to this DQ, it will cause serious problem
    */
    remove(node) {
        if(!(node instanceof Node)) {
            throw new Error(`Illegal Argument Exception: arg(${typeof node}) must be a type of Node`);
        }
        if(this.isEmpty()) {
            throw new Error(`No Such Element Exception: cannot remove from empty deque`);
        }

        node.next.prev = node.prev;
        node.prev.next = node.next;
        this._size--;
    }
}


/*
    this item will be stored in cache
*/
class Item {
    constructor(node, size, content) {
        this.node = node;
        this.size = size;
        this.content = content;
    }
}

/*
    First-In-First-Out replacement policy(Queue): when there is not enought memory space, it will remove items in FIFO order
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
        return this._cache.has(key);
    }

    /*
        return: if key found, return cached item. Otherwise, it returns undefined;
    */
    get(key) {
        const val = this._cache.get(key);

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

        /*
            if cache already contains the key, remove content from cache, but we keep the key in priority
        */
        let val = this._cache.get(key);
        if(val) {
            this._freeMemory += val.size;
            val.content = undefined;
            val.size = 0;
        }

        //while there is not enough memory space, free memory
        while(this._freeMemory < size) {
            //const node = this._priority.peekFirst();
            //this.remove(node.key);
            this.remove(this._priority.peekFirst().key);
        }

        val = this._cache.get(key);
        if(val) {
            val.size = size;
            val.content = content;
        } else {
            this._priority.addLast(key);
            this._cache.set(key, new Item(this._priority.peekLast(), size, content));
        }
        this._freeMemory -= size;
    }

    //remove item from the cache
    remove(key) {
        if(key === undefined || key === null || key === NaN) {
            throw new Error(`Illegal Argument Exception: key(${key}) must not be undefined, null or NaN`);
        }

        const val = this._cache.get(key);
        if(!val) {
            return;
        }

        //free memory
        this._freeMemory += val.size;

        //remove the key from the queue
        this._priority.remove(val.node);
        //remove the item from the cache
        this._cache.delete(key);
    }
}

/*
    Last-In-First-Out replacement policy(stack): when there is not enought memory space, it will remove items in LIFO order
*/
class LIFO {
    constructor(max) {
        if(!Number.isSafeInteger(max) || max <= 0) {
            throw new Error(`Illegal Argument Exception: arg(${max}) must be positive integer`);
        }
        this._MAX_MEMORY = max;    //in byte
        this._usedMemory = 0;    //in byte
        this._freeMemory = max;    //in byte
        this._cache = new Map();
        this._priority = new CircularDQ;
    }

    /*
        return: boolean
    */
    has(key) {
        return this._cache.has(key);
    }

    /*
        return: if key found, return cached item. Otherwise, it returns undefined;
    */
    get(key) {
        const val = this._cache.get(key);

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

        /*
            if cache already contains the key, remove content from cache, but we keep the key in priority
        */
        let val = this._cache.get(key);
        if(val) {
            this._freeMemory += val.size;
            val.content = undefined;
            val.size = 0;
        }

        //while there is not enough memory space, free memory
        while(this._freeMemory < size) {
            //const node = this._priority.peekFirst();
            //this.remove(node.key);
            this.remove(this._priority.peekFirst().key);
        }

        val = this._cache.get(key);
        if(val) {
            val.size = size;
            val.content = content;
        } else {
            this._priority.addFirst(key);
            this._cache.set(key, new Item(this._priority.peekFirst(), size, content));
        }
        this._freeMemory -= size;
    }

    //remove item from the cache
    remove(key) {
        if(key === undefined || key === null || key === NaN) {
            throw new Error(`Illegal Argument Exception: key(${key}) must not be undefined, null or NaN`);
        }

        const val = this._cache.get(key);
        if(!val) {
            return;
        }

        //free memory
        this._freeMemory += val.size;

        //remove the key from the queue
        this._priority.remove(val.node);
        //remove the item from the cache
        this._cache.delete(key);
    }
}

/*
    Least-Recently-Used replacement policy: when there is not enought memory space, it will remove items in timely order
*/
class LRU {
    constructor(max) {
        if(!Number.isSafeInteger(max) || max <= 0) {
            throw new Error(`Illegal Argument Exception: arg(${max}) must be positive integer`);
        }
        this._MAX_MEMORY = max;    //in byte
        this._usedMemory = 0;    //in byte
        this._freeMemory = max;    //in byte
        this._cache = new Map();
        this._priority = new CircularDQ;
    }

    /*
        return: boolean
    */
    has(key) {
        return this._cache.has(key);
    }

    /*
        return: if key found, return cached item. Otherwise, it returns undefined;
    */
    get(key) {
        const val = this._cache.get(key);

        if(!val) {
            return undefined;
        }

        //delete node from priority queue and insert to the end
        const node = val.node;
        this._priority.remove(node);
        
        //insert this statement into method of CircularDQ **********************************
        node.prev = this._priority._dummy.prev;
        node.next = this._priority._dummy;
        this._priority._dummy.prev.next = node;
        this._priority._dummy.prev = node;
        this._priority._size++;

        return val.content;
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

        this.remove(key);

        //while there is not enough memory space, free memory
        while(this._freeMemory < size) {
            //const node = this._priority.peekFirst();
            //this.remove(node.key);
            this.remove(this._priority.peekFirst().key);
        }

        this._priority.addLast(key);
        this._cache.set(key, new Item(this._priority.peekLast(), size, content));
        this._freeMemory -= size;
    }

    //remove item from the cache
    remove(key) {
        if(key === undefined || key === null || key === NaN) {
            throw new Error(`Illegal Argument Exception: key(${key}) must not be undefined, null or NaN`);
        }

        const val = this._cache.get(key);
        if(!val) {
            return;
        }

        //free memory
        this._freeMemory += val.size;

        //remove the key from the queue
        this._priority.remove(val.node);
        //remove the item from the cache
        this._cache.delete(key);
    }
}


module.exports = {
    FIFO: FIFO,
    LIFO: LIFO,
    LRU: LRU,
};
