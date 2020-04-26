---
date: 2018-09-12 23:33:50+00:00
title: Cisco VSS Redundancy Considerations
url: /blogs/20180912-cisco-vss-redundancy-considerations/
page_id: _20180912_cisco_vss_redundancy_considerations
featured_image: /img/posts/20180912-cisco-vss-redundancy-considerations/logo.png
description: "I had to perform a familiar thought experiment about network redundancy using Cisco VSS for a pair of distribution switches."
tags:
- cisco
- design
- learning
- cisco vss
- mlag
- network design
- networking
---

I recently had to perform a very familiar thought experiment about network redundancy once more. We were working on designing a new distribution branch in a campus network, using Cisco VSS for redundancy in a pair of two distribution switches.
{{< blogimage "/img/posts/20180912-cisco-vss-redundancy-considerations/logo.png" >}}
<!-- more -->
I owe a lot of my understanding of these kinds of L2/L3 redundancy topics to the posts on Ivan Pepelnjak's site: [IpSpace](https://blog.ipspace.net/). A fair warning to my readers: Ivan cross-references a lot of his posts. That's why reading half of any post on his site will inevitably result in at least 50 open browser tabs and losing the rest of your day (or week).

If you don't know a lot about the design considerations for LAN networks yet, I suggest reading up on subjects like layer 2 and layer 3 domains, spanning tree, FHRP's and MLAG. [This MLAG post](https://blog.ipspace.net/2010/10/multi-chassis-link-aggregation-basics.html) at IpSpace is a good starting point.

Before getting into the VSS specifics, it is useful to provide some background information on Cisco's chassis switches. When working with regular chassis switches, you need at least one supervisor module that runs the control plane and management plane functions for the entire chassis. Besides the supervisor module you have one or more networking modules. All the modules are connected together via the backplane of the chassis. It is possible to use two supervisor modules, where one will be the master (active) module and the other one the slave (standby) module. You can enable features like Non Stop Routing (NSR), Non Stop Forwarding (NSF) and Graceful Restart (GR) to provide very fast failover times between the two supervisor modules.

In my example we need to combine two Cisco switches into a VSS cluster. VSS stands for Virtual Switching System. The VSS technology is designed to provide redundancy between two or more switches in a way that is comparable to stacking switches together and to combining different switching modules together in a chassis switch. Multiple physical switches will be combined into a cluster that acts as one logical unit for management. VSS eliminates the need for using an FHRP, you just set up a logical interface with an IP address and VSS will take care of the redundancy. You can use ethernet links for VSS. Just like with chassis switches, switches within a VSS cluster act as supervisor modules. A VSS cluster will have an active and a passive supervisor switch. 

The VSS cluster will use some links as VSL's (Virtual Switch Link) that carry data plane and control plane information. Loss of connectivity on all VSL links will cause the standby switch to become active. The other switch will also still be active, resulting in an active-active or split-brain situation that can disrupt network stability. To mitigate this, you should deploy an implementation of Dual-Active Detection. VSS allows for three tastes of that: Enhanced PAgP, BFD and fast-hello.

Enhanced PAgP allows you to use intermediate devices that are connected to both VSS switches using PAgP on the uplinks. Communication for Dual-Active Detection can use the PAgP links over the intermediate switches. BFD and fast-hello are both Dual-Active Detection implementations that utilize dedicated direct links between the VSS switches. When Dual-Active Detection is configured, losing connectivity on all VSL links _and_ all Dual-Active Detection links will cause the active switch to go into recovery mode, shutting down all ports except those used as VSL's. The standby switch will become the master switch. Upon restoring connectivity on the VSL links, the old active switch will reload and become the standby switch.

When discussing a low level design, a co-worker asked me a very interesting question. He wanted to know if we need different physical paths for the VSL and fast-hello links of a Cisco VSS cluster. I did some research and found a few good resources. Cisco's own documentation is usually good for explanations of how different technologies work and how to configure them. [This post](https://www.netcraftsmen.com/cisco-vss-dual-active-detection/) at Netcraftsmen is also very helpful for the subject at hand.

It is common to see all of the VSL and Dual-Active Detection links following the same physical path. If that physical path were to incur an incident that renders it unusable, the scenario as described above would take place. In this context, asking whether you need different physical paths really means asking what you want to protect against. Up to this point, by using Cisco's VSS, it is decided already that you are going to trust a vendor implementation of their proprietary redundancy protocol to keep your network stable. If you have a stable VSS implementation, losing the VSL and Dual-Active Detection links should not result in a loss of network stability. This statement assumes of course that each device connected to the VSS cluster is connected to both physical VSS switches with a protocol that allows for fast failover (like LACP).

An upgrade would be to have separate physical paths (paths that do not [share fate](https://en.wikipedia.org/wiki/Fate-sharing)) for different VSL links. That way, losing a path does not even require the Dual-Active Detection to kick in and will result in a more stable network. If you need to spend money to utilize an extra physical path, ask yourself if the slightly more stable environment is worth spending on (or maybe the money is better spent on implementing a more modern solution like BGP-EVPN, although I haven't heard a lot about using that in campus LAN). If you have the option to use an extra physical path with only small added expenses (maybe some patch cables) thanks to existing infrastructure, I recommend to make use of the opportunity.
