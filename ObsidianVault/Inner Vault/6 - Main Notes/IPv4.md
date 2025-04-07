
#Network

IPv4 (Internet Protocol version 4) is the fourth version of the Internet Protocol (IP) and is the fundamental technology that enables devices to communicate over the internet and private networks. It is the most widely used version of IP, though it is gradually being replaced by IPv6 due to address exhaustion.

### Key Features of IPv4

1. **Addressing:**
    
    - IPv4 uses a **32-bit address**, which allows for approximately **4.3 billion unique addresses** (2³² addresses).
        
    - Example: `192.168.1.1`
        
    - The address is typically written in **dotted decimal notation**, where four octets (8-bit segments) are separated by dots.
        
2. **Address Classes:**
    
    - IPv4 addresses are categorized into different classes:
        
        - **Class A** (1.0.0.0 – 126.255.255.255) → Large networks
            
        - **Class B** (128.0.0.0 – 191.255.255.255) → Medium-sized networks
            
        - **Class C** (192.0.0.0 – 223.255.255.255) → Small networks
            
        - **Class D** (224.0.0.0 – 239.255.255.255) → Multicast
            
        - **Class E** (240.0.0.0 – 255.255.255.255) → Experimental
            
3. **Subnetting:**
    
    - To efficiently use IP addresses, **subnetting** allows a large network to be divided into smaller networks.
        
    - Uses a **subnet mask** to define the network and host portions of the address.
        
4. **Routing & Communication:**
    
    - IPv4 enables communication between devices using **packet switching**.
        
    - Data is divided into **packets**, each containing source and destination addresses.
        
5. **Public vs. Private IPs:**
    
    - **Public IPs** are unique and used for internet communication.
        
    - **Private IPs** (e.g., `192.168.0.0/16`, `10.0.0.0/8`, `172.16.0.0/12`) are reserved for internal networks and require **Network Address Translation (NAT)** to access the internet.
        
6. **Limitations of IPv4:**
    
    - **Address exhaustion:** The limited number of IPv4 addresses led to the adoption of **IPv6**.
        
    - **Security vulnerabilities:** IPv4 was not designed with strong built-in security, requiring additional security protocols like **IPsec**.
        
    - **No built-in Quality of Service (QoS):** Unlike newer protocols, IPv4 does not prioritize certain types of traffic efficiently.
        

### Transition to IPv6

Since IPv4 addresses are running out, IPv6 (which uses **128-bit addresses**) was introduced to provide a much larger address space and improved security.

Would you like a deeper explanation of a specific IPv4 concept?