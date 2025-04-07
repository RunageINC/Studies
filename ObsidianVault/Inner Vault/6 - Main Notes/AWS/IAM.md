
#aws

IAM stands for Identity and Access Management. It is a global service and it is used from the moment you create a root account on AWS.

When you create an account on AWS, the root account is created by default and should never be used again. Only to create another users in IAM.

When creating accounts the root user should never be used again.

Then we have those created accounts, or **Users**. Those are people within the organization and can be grouped.

Those groups can only group users, never other groups. Ex:

- **Group: Developers**

  - Dev1
  - Dev2
  - Dev3

- **Group: Ops**
  - SysOps1
  - SysOps2

Some users does not belong to any group. Although this is possible systematically, it is not a good practice. Users can also belong to multiple groups, very similar to Linux group:user management.

Those users or groups can be assigned JSON docs with policies. Basically policies are just permissions for specific purposes:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "ec2:Describe",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "elasticloadbalancing:Describe",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudwatch:ListMetrics",
        "cloudwatch:GetMetricsStatistics",
        "cloudwatch:Describe"
      ],
      "Resource": "*"
    }
  ]
}
```


This document defines those permissions, prohibiting new users to do anything they want.

As in any system, in AWS it is expected to apply the **least privilege principle**. Don't give more permissions than a user needs.