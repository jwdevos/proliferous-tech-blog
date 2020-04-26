---
date: 2017-10-12 19:55:50+00:00
title: Choosing new home lab server components
url: /blogs/20171012-choosing-new-home-lab-server-components/
page_id: _20171012_choosing_new_home_lab_server_components
featured_image: /img/posts/20171012-choosing-new-home-lab-server-components/logo-1.png
description: "I've recently built a new home lab server. My decision process for choosing the components might help others so read on for more details."
tags:
- hp
- hypervisor
- lab
- Supermicro
- vmware
---

I've been looking for some more headroom in the home lab department for a while now. I was actually looking into buying a specific platform (Xeon-D) when I decided to re-evaluate my requirements and the options to fulfill them. What turned out to be the best choice for my situation actually surprised me. The process of making my decision might be interesting to others as well, so read on for the details.
{{< blogimage "/img/posts/20171012-choosing-new-home-lab-server-components/logo-1.png" >}}
<!-- more -->

##### Requirements
My requirements were simple:

* At least 8 cores of Xeon-like performance for x86 virtualization
* At least 128 GB of RAM
* Hardware that works well with VMware ESXi
* 512GB NVMe SSD for VM datastore
* Room for expansion to place extra storage controllers or NIC's

##### Choosing a platform
My current box was Xeon 1230v3 based which means that it maxes at 32 GB of RAM. The wish for more memory began soon after building that box. These days AMD EPYC is coming to the market, offering very competitive pricing and core counts. [ServeTheHome](https://www.servethehome.com/) is really going strong lately doing performance testing across lots of different CPU architectures and generations if you need some figures. If you're looking to build a powerful box right now using DDR4 RAM you should look into EPYC. I was warned against AMD for projects heavy on nested x86 virtualization though. The EPYC platform is brand new so there's not a lot of information available about how well all the different use cases will run.
For home labs, EPYC competes with regular Xeon's and Xeon-D's. I first heard about the awesome Xeon-D platform via [Joep Piscaer](https://www.virtuallifestyle.nl/2016/05/build-xeon-d-1500-open-home-lab/) and on [TinkerTry](https://tinkertry.com/). The server that Joep describes is pretty neat as you get a lot of capacity in a small box.

The first thing I noticed when looking up the required parts for a decent Xeon-D build in Q3 of 2017 is insane memory prices. 128 GB of DDR4 RAM requires a mortgage these days. Because of this, I had to decide whether I want to spend a large sum of money just to get some RAM, wait until RAM prices drop which might easily mean postponing the build until the end of next year, or build something now, cheaper, using second hand components. I picked the last option.

Some folks at RouterGods pointed me to eBay for second hand servers. They are mostly US based though where the prices for this kind of stuff are apparently a lot lower. Shipping costs to Europe for a full server ruin that advantage though and besides, it's difficult to meet all my requirements when buying a full system second hand. I also have no sane location to stash the noise that those servers make. I did notice one thing while on eBay though: DDR3 RAM prices for registered or fully buffered modules are way lower than all the other RAM that's of use right now.

The most sensible CPU's to choose if I wanted to use those registered RAM modules were the Xeon E5 v2 family. The E5 v3 generation and later all use DDR4. I was able to find a E5 2670v2 (10 cores) on eBay for around 200 USD. These chips are from 2013 so this is a very good deal for a home lab. Most CPU's of this generation can be had for a steal on eBay but you have to beware of the engineering samples that some people sell. The most practical thing to do is to search for the sSpec number of the particular CPU you're trying to find. The sSpec numbers on [this list](https://en.wikipedia.org/wiki/List_of_Intel_Xeon_microprocessors) correspond to the production samples that are safe to buy.

I've found my 128 GB of RAM in the form of 8x16 GB modules. They were packed in just an anti-static bag and an envelope and sent from the US like that which sucks, but luckily there was no damage and the modules work fine. I chose a Supermicro motherboard ([X9SRL-F](http://www.supermicro.com/products/motherboard/Xeon/C600/X9SRL-F.cfm)) to complete this setup. The RAM modules I've found are supported on this board. One thing to watch out for with this particular board is that it requires a Supermicro specific heat sink for the CPU, otherwise the RAM will be in the way. I like the motherboards that Supermicro offers. I now have experience with IPMI implementations from Intel, HP, Dell and Supermicro and my experience with Supermicro has been the smoothest. The board I got still uses Java crap to solve remote management sadly, but it works relatively good. The only downside of buying the 2013 hardware for my server is that I don't get the superb HTML5 IPMI solution.

The Xeon E5 CPU's are commonly found on systems containing two CPU's. If you don't intend to run CPU's in both sockets you should not buy a dual socket motherboard as some PCIe lanes and some other stuff will not be available for use.
The setup described above meets all of my requirements. The NVMe SSD can be installed in a PCIe slot using an adapter. I've used a Lycom DT-120 [as described here](https://tinkertry.com/how-to-install-a-2nd-samsung-950-pro-m2-nvme-on-superserver).
{{< blogimage "/img/posts/20171012-choosing-new-home-lab-server-components/ssd.jpg" >}}

##### Build and setup
The motherboard is a full ATX board. I would have liked a small all-in-one solution like the Xeon-D Superservers instead but at least I get to enjoy the flexibility that a bigger box gives.
{{< blogimage "/img/posts/20171012-choosing-new-home-lab-server-components/board.jpg" >}}

The stock fan on the Supermicro cooler got replaced quickly with something more quiet. I had some parts laying around so the new house of these components is an Antec 300 v2 case. Overall the build and setup process was straightforward. The motherboard was shipped with the most recent versions of the IMPI and BIOS software which was nice. ESXi installed without any problems.
{{< blogimage "/img/posts/20171012-choosing-new-home-lab-server-components/esxi.png" >}}

##### Results
I now have this server running some of my VM's at home and the server runs great so far. The amount of cores and RAM is nice to work with and the NVMe SSD gives a performance increase when deploying things compared to my last box. I run a virtual FreeNAS in this server. The FreeNAS VM has a separate PCIe storage controller that hooks up four HDD's via DirectPath I/O on ESXi. All of these parts together, with some VM's running, and this box consumes about 120 watts in total. It was tough to get a proper indication of the power consumption I would end up with, but around 120 watt has been my guess for this usage so it's nice it turned out to be true. Compared to buying more recent hardware with the current RAM prices I got a pretty good deal. Newer hardware (especially Xeon-D) can run consuming less power but for the money I've saved by buying older parts I can run my new server 24/7 for years.
