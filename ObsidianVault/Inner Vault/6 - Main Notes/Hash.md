
#CyberSecurity 

Hash is a mathematical function that converts data into a fixed-size value. Hashing functions receives an input and returns a completely different output, a sort of digital fingerprint.

Very used in lots of areas such as encryption (for passwords, for example, or any personal information data).

Same inputs gets always the same information when hashing. But the slight change we made to that input (capitalizing, adding a single character, anything) can dramatically change the result.

Another important consideration about hashing is that it cannot be undone. Once the hash function is applied, it cannot be converted back. It is not possible to throw a hash into a hashing function to discover what it was before. It cannot go backwards:

password1 -> Hashing Function() -> Hash Value

Hash Value -> Hashing Function() -> Another Hash Value

## Libs for hashing

### JavaScript/TypeScript

On javascript, we have the `node:crypto` library that helps with hashing and generating salt for encrypting data. It provides 2 functions: randomBytes and scrypt.

The main responsible for the heavy hashing functions is scrypt. scrypt function is asynchronous in nature but instead of giving back a promise, we have to use callbacks to work with this version. 

There's an alternative, which is using `promisify` that converts the scrypt return value into a promise.

```javascript
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);
```

Then we can create a new hash with this function after generating the salt:

```typescript
const hash = (await scrypt(password, salt, 32)) as Buffer;

// 32 means 32 characters long
```

Buffer is needed because typescript does not know how to handle the return of scrypt.

