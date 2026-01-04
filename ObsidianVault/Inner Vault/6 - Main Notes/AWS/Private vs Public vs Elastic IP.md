
#aws 

The networking on an instance has 2 sorts of IP's: [[IPv4]] and [[IPv6]]. The most common for EC2, and the most common format used online is the IPv4. IPv6 is newer and commonly used in IoT.

### Private vs Public

Public IP's are accessed through all the internet, meanwhile private networks are only accessed through a private environment.

If you have a web server with public IP, everyone on the internet can see it. For companies, it is more common to use private networks, where computers can talk to each other by a private IP.

![[Screenshot 2025-03-31 at 21.37.57.png]]

Public IP's can be geo-located easily, by googling it for example. And because of that, there can't be 2 equal IP's, they must be unique across the whole web.

Private IP's means that the machine can only be identified on a private network only. It also must be unique across private networks, but 2 private networks can have equal IP's (as they are not exposed, therefore cannot generate conflict). As it can be seen on the drawing, machines on a private network can connect on public network ([[How Internet Works#World Wide Web (WWW)|WWW]]) by using a [[NAT]] + internet gateway ([[Proxy]]).

### Elastic IP

If fixes a public IP if needed, as if you leave it without an Elastic IP its public IP will change every time the EC2 instance restarts.

It can only be attached to one instance at a time and can be used to mask failure of an instance or software by rapidly remapping the address to another instance on the account (although it is an uncommon pattern because you can only have 5 elastic IP's in an account).

The limitation of 5 IP's can be increased if asked but it is rare to use this type of IP.

It is advisable to avoid using elastic IP as it often reflects poor architectural decisions. Instead, it is better to use a random public IP and register a DNS name to it.

By default, EC2 machines will come with:

- A private IP for internal AWS network
- A public IP for WWW

And when we are doing SSH into the EC2 machines:

- We cannot use a private IP because we are not in the same network (unless you have a VPN)
- We can only use the public IP withouth VPN.

