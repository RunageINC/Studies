
#aws 

AWS has Regions all around the world. They're named based on their location being it usually their continent-geographic direction-number (e.g.: US-east-1, EU-west-3).

Region is a cluster of data centers located mostly near Ohio, Singapore, Sydney, Tokyo, etc. Most services are going to be linked in scope to a specific region. When moving from one region to another for using services, it will be like a new time of use.

To choose the most adequate region for your application, there are some things to consider:

- **Compliance**: Sometimes governments want data to be local to the country. For example in France, data must stay in France, so the app should be launched in France 🇫🇷 
- **Latency**: Proximity with the cluster causes less latency as the data travels less distances.
- **Pricing**: Varies from region to region and should be consulted before contracting.