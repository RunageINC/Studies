
#Network 

A **NAT (Network Address Translation) device** is a **router or firewall** that modifies IP addresses in packets as they pass through a network. It allows multiple devices in a private network to **share a single public IP address** for internet access.

---

## Why is NAT Used?

NAT was introduced to **solve the problem of IPv4 address exhaustion** by enabling many devices to connect to the internet using a single public IP.

Without NAT, every device on a network would require a **unique public IP**, which is not feasible due to the limited number of IPv4 addresses.

---

## How NAT Works (Example Scenario)

Imagine a home network with **multiple devices**:

📱 **Phone:** `192.168.1.2`  
💻 **Laptop:** `192.168.1.3`  
🖥 **Desktop:** `192.168.1.4`

These devices are on a **private network** (192.168.x.x), which is not directly accessible from the internet. The **NAT-enabled router** has a **public IP** (e.g., `203.0.113.5`), assigned by the Internet Service Provider (ISP).

### Steps:

1️⃣ The **laptop** wants to access `example.com`.  
2️⃣ The **router (NAT device)** replaces the laptop’s private IP (`192.168.1.3`) with the public IP (`203.0.113.5`).  
3️⃣ The request is sent to `example.com`, which responds to the **public IP**.  
4️⃣ The router **forwards the response** back to the laptop using **NAT translation tables**.

This allows all home devices to **share the same public IP** while still being uniquely identified within the local network.

---

## Types of NAT

1. **Static NAT** 🔄
    
    - Maps one **private IP** to one **public IP**.
        
    - Used in **servers** that need to be accessible from the internet.
        
2. **Dynamic NAT** 🔀
    
    - Maps **multiple private IPs** to a **pool** of public IPs.
        
    - Useful for companies with a limited number of public IPs.
        
3. **PAT (Port Address Translation) / NAT Overload** 🎛
    
    - Most common type of NAT.
        
    - Maps **many private IPs to a single public IP**, using **different port numbers** to track connections.
        
    - Used in **home networks and small businesses**.
        

---

## Limitations of NAT

🚫 **Breaks End-to-End Connectivity:**

- Some applications (like peer-to-peer networks, VoIP, and multiplayer games) **struggle** with NAT.
    

🐢 **Adds Latency:**

- NAT **processes each packet**, which slightly slows down communication.
    

🔐 **Less Secure (Without Firewall):**

- NAT itself **hides internal devices**, but it is **not a security feature**. A firewall is needed for protection.
    

---

## NAT vs IPv6

🌍 **[[IPv6]] eliminates the need for NAT** because it provides enough **public IP addresses** for every device.  
However, NAT is still widely used in **[[IPv4]] networks** today.