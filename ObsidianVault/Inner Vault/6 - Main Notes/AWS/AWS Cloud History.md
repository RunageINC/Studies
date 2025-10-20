
#aws

It all started with an internal launch at 2002. Then, in 2003, they realized that it could be published to market as the infrastructure was one of their core strengths.

With this in mind, in 2004 they publicly launched SQS.

In 2006, they did a re-launch with SQS, EC2 and S3.

With this, they consolidated their position on the market, becoming the leaders and being used by many companies such as Dropbox, Nasa, Netflix, etc.

AWS accounts for 31% of the market as in Q1 2024, and Microsoft being the 2nd holds 25%.

## Infrastructure

AWS is global solutions suite and for it to continuously work, they have:

- Regions
- Availability Zones
- Data Centers
- Edge Locations / Points of Presence

It all can be seen on the map: https://aws.amazon.com/about-aws/global-infrastructure/regions_az/

Also all the services by region can be found here: https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/

If a service is not available on your region, change the region to another one to check if the service is available
### [[Regions]]

### [[Availability Zones]]

### [[Edge Locations - Points of Presence]]


## Services

- [[IAM]]
- [[EC2]]

### Asynchronous Communication

Better usage for decoupling applications, and can scale independently from them:

- [[SQS]]
- [[SNS]]
- [[Kinesis]]