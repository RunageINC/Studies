const a = new ArrayBuffer(6); //contiguous piece of memory

console.log("Array buffer", a);

const a8 = new Uint8Array(a); //view of the array buffer

a8[0] = 45;

console.log("Array buffer modified by a8", a);

const a16 = new Uint16Array(a); //view of the array buffer

a16[2] = 0x4545;

console.log("Array buffer modified by a16", a);
