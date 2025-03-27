
#Architectures 

For deployments, there are a lot of good practices that can be applied:

1. Choose a good database.
	1. Bear in mind that if your app and your db are under different locations, it is important to consider their location as it can cause delay on retrieving resources. For example: if your app is deployed in Brazil and your DB is in Europe, to make a query can have a huge amount of delay.
2. Store important things in environment variables
	1. Keys
	2. Urls
	3. Users/Passwords
3. 