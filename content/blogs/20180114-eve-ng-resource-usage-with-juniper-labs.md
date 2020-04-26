---
date: 2018-01-14 01:17:12+00:00
title: Eve-NG resource usage with Juniper labs
url: /blogs/20180114-eve-ng-resource-usage-with-juniper-labs/
page_id: _20180114_eve_ng_resource_usage_with_juniper_labs
featured_image: /img/posts/20180114-eve-ng-resource-usage-with-juniper-labs/logo.png
description: "Some lab images and topologies are very resource-intensive. You can't just run any lab you want on any host machine. For this reason, I thought it would be worthwhile to share some experience with running Juniper-based labs on Eve-NG."
tags:
- learning
- linux
- networking
- series
- virtualization
- eve-ng
- juniper
- lab
- ubuntu
- vmx
- vsrx
---

Some lab images and topologies are very resource-intensive. You can't just run any lab you want on any host machine. For this reason, I thought it would be worthwhile to share some experience with running Juniper-based labs on Eve-NG.
{{< blogimage "/img/posts/20180114-eve-ng-resource-usage-with-juniper-labs/logo.png" >}}
<!-- more -->
The findings presented here are based on a lab with 14 nodes. The lab topology is taken from the Juniper book [Day One: Routing the Internet Protocol](https://forums.juniper.net/t5/Day-One-Books/Day-One-Routing-the-Internet-Protocol/ba-p/283507). This lab consists of the following nodes:

* 10x vMX 14.1R4.8, 1 vCPU, 2 GB RAM
* 2x vSRX 12.1X47-D20.7, 2 vCPU's, 2 GB RAM
* 2x Ubuntu server 16.04.3 LTS, 1 vCPU, 1 GB RAM

The lab topology looks like this:
{{< blogimage "/img/posts/20180114-eve-ng-resource-usage-with-juniper-labs/topology.png" >}}

I run this lab on a Windows 10 laptop that has a quad core i7 and 32 GB of RAM. Using VMware Player, I provide the Eve-NG appliance with 24 GB RAM and 4 vCPU's. A cool thing about Eve-NG is that it uses UKSM by default. UKSM provides kernel memory deduplication and in a setup like this with mostly the same machines, it can be quite a benefit. There is some more information about Eve-NG and UKSM [at this blog](https://interestingtraffic.nl/2017/01/05/eve-ng-preview-released/).

I was only able to boot two VM's at a time. This might be because UKSM is heavy on the CPU until the deduplication tasks settle in. After starting the whole lab up two machines at a time, I ended up with surprisingly little resource usage for such a large lab. Here is the output of htop on the Eve-NG appliance with every node booted:
{{< blogimage "/img/posts/20180114-eve-ng-resource-usage-with-juniper-labs/htop.png" >}}

At the same time, the Eve-NG status window looks like this:
{{< blogimage "/img/posts/20180114-eve-ng-resource-usage-with-juniper-labs/status.png" >}}

I gave the Eve-NG appliance 4 vCPU's and 24 GB of RAM. Out of them both, only about a third is in use after the labs boots up and settles in. These nodes normally consume 26 GB of RAM together, now the Eve-NG appliance consumes under 8 GB of RAM in total. That includes all of the nodes and the appliance itself. It's apparently realistic to do some serious labbing on a laptop nowadays. The CPU bottleneck when booting nodes is a bit bad though. If you have a lot of nodes and you have to boot them two at a time it gets tedious, you don't want to do this often. Resource usage like this is a challenge with running Juniper devices in labs.

For more serious stuff the result is probably the best if you use a real server with more than 4 physical cores. If RAM is unconstrained you could consider turning off UKSM (it can be done from the status window in your lab) and saving the CPU hit.
