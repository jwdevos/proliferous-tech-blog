---
date: 2016-09-28 09:09:40+00:00
title: FortiGate Interface Ping Issue
url: /blogs/20160928-fortigate-interface-ping-issue/
page_id: _20160928_fortigate_interface_ping_issue
featured_image: /img/posts/20160928-fortigate-interface-ping-issue/fortinet.png
description: "I came across some curious behavior on a FortiGate firewall. Interfaces won't send back an echo reply in some cases."
tags:
- echo reply
- echo request
- fortigate
- fortinet
- icmp
- networking
- ping
- troubleshooting
---

I came across some curious behavior on a FortiGate firewall that seems worth sharing. The deal is that interfaces will only send back an echo reply if there is an admin user that has a trusted host network corresponding with the subnet configured on that interface. Read on for the details.
{{< blogimage "/img/posts/20160928-fortigate-interface-ping-issue/fortinet.png" >}}
<!-- more -->
The firewall in question was a FortiGate with multiple interfaces configured, like this for example:
{{< blogimage "/img/posts/20160928-fortigate-interface-ping-issue/int.png" >}}

I can't share the specific subnet, but let's say it is 192.168.2.0/24. The interface is up, and as you can see in the screenshot, ping is allowed. I verified that I had done everything else right, and still the interface would not reply to my echo requests. I also had other interfaces on the same FortiGate that did reply to ping. I used the built-in packet sniffer to see what's going on:
```sh
config vdom
edit root
diagnose sniffer packet any 'icmp' 4 0 l
```

Note that this setup has VDOMs in use, so you need to run the command from the correct VDOM for the interfaces you are troubleshooting.
I got the following output for interfaces that didn't reply, and nothing else:
```sh
2016-09-27 13:25:25.160951 <dest_int> in <src_ip> -> <dest_ip>: icmp: echo request
```

For the interfaces that did reply, I got the following output:
```sh
2016-09-27 13:27:48.219828 <dest_int> in <src_ip> -> <dest_ip>: icmp: echo request
2016-09-27 13:27:48.219850 <dest_int> out <dest_ip> -> <src_ip>: icmp: echo reply
2016-09-27 13:27:48.219851 TRUNK out <dest_ip> -> <src_ip>: icmp: echo reply
2016-09-27 13:27:48.219853 port18 out <dest_ip> -> <src_ip>: icmp: echo reply
```

I replaced the real info, dest_ip was the IP that I wanted to ping. The output for the interfaces that were not responding shows me the FortiGate does receive the echo request, but never sends a reply. The output for interfaces that do work is pretty verbose, it shows the request leaving a VLAN interface, then a trunk interface (LACP) and then a real physical interface which is pretty nice.

I now had enough ammo to take it to Google and found [this article](http://kb.fortinet.com/kb/documentLink.do?externalID=10876). It turns out that if you have configured trusted hosts for admin access, this also applies to ICMP echo requests. What the hell? Two possible "solutions" are:

* **1:** Configure your admin accounts to have all [RFC 1918 subnets](https://tools.ietf.org/html/rfc1918) configured for trusted hosts
* **2:** Configure an admin account with 0.0.0.0/0 for trusted hosts, and no permissions whatsoever

The first option is obviously not enough if you use different addresses, for example public addresses in a DMZ. I chose the second option, which is also suggested in the knowledge base article. The FortiGate interface allows you to easily set up a profile for admin users with no permissions in it. I still think this behavior is kind of unexpected and it wasted a good hour for me checking my VLAN tags etc. I hope this post helps to save others some time.
