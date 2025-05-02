
#Algorithms 

```typescript
const a = []
```

Is this an array? WRONG

This is not an array. This is a list due to how javascript handles the allocation.

On arrays, there's a fixed size, continguous memory chunks. It cannot grow dynamically and also there are no syntax sugar methods for it (you can write tho).

```java
int[] fixedArrayInt = new int[8];
```

In some older languages, you have to pass everything: pointer, where it starts and ends.