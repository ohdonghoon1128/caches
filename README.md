# Cache

## Implementation
- I used doubly linked list, so the pointer can move backward and forward efficiently (O(1) complexity). Also,
node in the list can be removed efficiently (O(1) complexity)

## Cache Replacement Policies
- FIFO (First In First Out)
  - When a new Item come and there is not enough memory space for the new Item, oldest Item in the container
  will be removed until there is enough memory space for the new Item
- LIFO (Last In First Out)
  - When a new Item come and there is not enough memory space for the new Item,  newest Item in the container
  will be removed until there is enough memory space for the new Item
- LRU (Least Recently Used)
  - When a new Item come and there is not enough memory space for the new Item, least recently used Item in the
  container will be removed until there is enough memory space for the new Item
