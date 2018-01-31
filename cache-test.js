const cache = require('./cache.js');

const fifo = new cache.FIFO(5);

console.log('\nadd(key: 1, content: a, size: 1)');
fifo.add(1, 'a' ,1);
console.log(`max memory: ${fifo.maxMemorySize()}`);
console.log(`free memory: ${fifo.freeMemorySize()}`);
let str = ``;
for(let key of fifo) {
    str += `${key} `;
}
console.log(str);


console.log('\nadd(key: 2, content: b, size: 1)');
fifo.add(2, 'b' ,1);
console.log(`max memory: ${fifo.maxMemorySize()}`);
console.log(`free memory: ${fifo.freeMemorySize()}`);
str = ``;
for(let key of fifo) {
    str += `${key} `;
}
console.log(str);



console.log('\nadd(key: 3, content: c, size: 1)');
fifo.add(3, 'c' ,1);
console.log(`max memory: ${fifo.maxMemorySize()}`);
console.log(`free memory: ${fifo.freeMemorySize()}`);
str = ``;
for(let key of fifo) {
    str += `${key} `;
}
console.log(str);



console.log('\nadd(key: 4, content: d, size: 1)');
fifo.add(4, 'd' ,1);
console.log(`max memory: ${fifo.maxMemorySize()}`);
console.log(`free memory: ${fifo.freeMemorySize()}`);
str = ``;
for(let key of fifo) {
    str += `${key} `;
}
console.log(str);



console.log('\nadd(key: 5, content: e, size: 1)');
fifo.add(5, 'e' ,1);
console.log(`max memory: ${fifo.maxMemorySize()}`);
console.log(`free memory: ${fifo.freeMemorySize()}`);
str = ``;
for(let key of fifo) {
    str += `${key} `;
}
console.log(str);



console.log('\nadd(key: 5, content: e, size: 1)');
fifo.add(5, 'e' ,1);
console.log(`max memory: ${fifo.maxMemorySize()}`);
console.log(`free memory: ${fifo.freeMemorySize()}`);
str = ``;
for(let key of fifo) {
    str += `${key} `;
}
console.log(str);


console.log('\nadd(key: 6, content: ff, size: 2)');
fifo.add(6, 'ff' ,2);
console.log(`max memory: ${fifo.maxMemorySize()}`);
console.log(`free memory: ${fifo.freeMemorySize()}`);
str = ``;
for(let key of fifo) {
    str += `${key} `;
}
console.log(str);



console.log('\nadd(key: 5, content: ee, size: 2)');
fifo.add(5, 'ee' ,2);
console.log(`max memory: ${fifo.maxMemorySize()}`);
console.log(`free memory: ${fifo.freeMemorySize()}`);
str = ``;
for(let key of fifo) {
    str += `${key} `;
}
console.log(str);



console.log('\nadd(key: 5, content: eeee, size: 4)');
fifo.add(5, 'eeee' ,4);
console.log(`max memory: ${fifo.maxMemorySize()}`);
console.log(`free memory: ${fifo.freeMemorySize()}`);
str = ``;
for(let key of fifo) {
    str += `${key} `;
}
console.log(str);


const lru = new cache.LRU(5);

console.log('=====initialize least recently used=====')
console.log('\nadd(key: 1, content: a, size: 1)');
lru.add(1, 'a' ,1);
console.log(`max memory: ${lru.maxMemorySize()}`);
console.log(`free memory: ${lru.freeMemorySize()}`);
str = ``;
for(let key of lru) {
    str += `${key} `;
}
console.log(str);

console.log('\nadd(key: 2, content: b, size: 1)');
lru.add(2, 'b' ,1);
console.log(`max memory: ${lru.maxMemorySize()}`);
console.log(`free memory: ${lru.freeMemorySize()}`);
str = ``;
for(let key of lru) {
    str += `${key} `;
}
console.log(str);


console.log('\nadd(key: 3, content: c, size: 1)');
lru.add(3, 'c' ,1);
console.log(`max memory: ${lru.maxMemorySize()}`);
console.log(`free memory: ${lru.freeMemorySize()}`);
str = ``;
for(let key of lru) {
    str += `${key} `;
}
console.log(str);


console.log('\nadd(key: 4, content: e, size: 1)');
lru.add(4, 'e' ,1);
console.log(`max memory: ${lru.maxMemorySize()}`);
console.log(`free memory: ${lru.freeMemorySize()}`);
str = ``;
for(let key of lru) {
    str += `${key} `;
}
console.log(str);


console.log('\nadd(key: 5, content: f, size: 1)');
lru.add(5, 'f' ,1);
console.log(`max memory: ${lru.maxMemorySize()}`);
console.log(`free memory: ${lru.freeMemorySize()}`);
str = ``;
for(let key of lru) {
    str += `${key} `;
}
console.log(str);


console.log('\nget(key: 3)');
lru.get(3);
console.log(`max memory: ${lru.maxMemorySize()}`);
console.log(`free memory: ${lru.freeMemorySize()}`);
str = ``;
for(let key of lru) {
    str += `${key} `;
}
console.log(str);


console.log('\nadd(key: 4, content: ee, size 2)');
lru.add(4, 'ee', 2);
console.log(`max memory: ${lru.maxMemorySize()}`);
console.log(`free memory: ${lru.freeMemorySize()}`);
str = ``;
for(let key of lru) {
    str += `${key} `;
}
console.log(str);
