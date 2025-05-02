
#CyberSecurity 


Known as Rainbow Attack as well, it is a method of password cracking that uses a special table (called "rainbow table") to crack the password hashes in a database.

This rainbow table has a list of millions of different passwords so the hash is calculated to every single password and stored into this table (so it does not need to calculate again). The attacker then compares with the database of a real application to figure out what was the password's original value.

### How to deal

Sign up/Sign in process can be more complicated to prevent this type of attack. For example, on the signup the password can have a [[Salt]] added:

- password: mypassword
- salt: a1d01
- final password: mypassworda1d01
- hash: 009a7s096bascba09s6d012973

Then, the hash is going to be over the final password. Then to store it, we also add the salt to the end of the password string, generating a *Hashed and salted password*:

- hashed and salted password: 009a7s096bascba09s6d012973.a1d01

After this, for the sign in process, the salt is not going to be generated randomly again. It will already be stored on the password. Then on split after the dot, we have the salt and the hash accordingly.