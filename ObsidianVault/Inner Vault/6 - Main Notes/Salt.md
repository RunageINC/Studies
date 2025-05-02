
#CyberSecurity

Salt is is a random value added to data (typically passwords) together with hashing. The primary purpose of a salt is to make it harder for attackers to use **precomputed attacks**, such as [[Rainbow Table Attack]], to crack hashed passwords. The salt can be prepended or appended to a hash.

It can be generated through a series of ways and can be stored together with the password.

### JavaScript/TypeScript

There are numerous ways to generate a salt on Javascript/Typescript.
#### Using core libs

```typescript
import { randomBytes } from 'crypto';

const salt = randomBytes(8).toString('hex');
```

`randomBytes` generates a [[Buffer]] and that's why it is necessary to convert it into a String. As for the recommended salt is at least 16 bytes, the 8 generates 8 pairs of bytes.
