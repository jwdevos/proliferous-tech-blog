---
date: 2017-10-13 12:39:52+00:00
title: Day of the Technology
url: /blogs/20171013-day-of-the-technology/
page_id: _20171013_day_of_the_technology
featured_image: /img/posts/20171013-day-of-the-technology/diagram.png
description: "Building a small network demonstration for schoolkids visiting our company."
tags:
- bind
- children
- cisco
- demo
- esxi
- kids
- lab
- linux
- networking
- routing
- vmware
---

Recently we were paid a visit at the company by a couple of groups of children from local elementary schools. They were taking part in a day program with the intention to visit companies that do something with technology. I opted in and tried to come up with something related to networking.  
  
I could do something like an assignment or a demo. I got about 10 minutes with each group which isn't a lot. The average age of the audience was 12 and each group would consist of 5 kids. The idea I stuck with was building a small network that allows access to a webserver from a smartphone or laptop. I wanted to use physical components to show off as much as possible. Here is the topology I ended up with (credit for the icons goes to [this guy](http://www.visguy.com/2008/08/11/crayon-network-shapes/)):
{{< blogimage "/img/posts/20171013-day-of-the-technology/diagram.png" >}}
<!-- more -->

I had just finished drafting the idea when a co-worker joined this little project to help out. His idea was to use some Catalyst 4500's to show off. We used two of those as transit routers. The third router we used was an old Cisco 800 series box. We left out the separate physical switches shown in the diagram in the end, because the 4500's were already enough presence. As an AP we used a standalone Aerohive 120 from my personal stash. At the other end of the network was a spare server running VMware with a Debian guest on top. The Linux VM provided DHCP (ISC server), DNS (Bind) and a webpage (nginx) to this network. The end result looked like this:
{{< blogimage "/img/posts/20171013-day-of-the-technology/hardware.jpg" >}}

We used two laptops to demonstrate the network, having the kids connect to the networks' SSID and direct the browser to the only DNS record available in this environment. We decided to ditch the smartphone option because modern phones sense if internet is unavailable on your wireless network, rerouting everything over 3G/4G where the DNS record for our special page is unavailable. Upon success, a page was showed containing the diagram of this network. There was no time to get into explaining a lot of concepts so we focussed on the fact that the network communication goes through all of these different devices and back, just to serve the web page. We added that this is the same kind of technology used to build the internet over the entire planet, just bigger and more. We explained that this network has three ways to send information from one device to the next; fiber, copper and wireless. All in all we got mixed reception for our efforts but we still had a lot of fun doing this. Some kids were enthusiastic about this stuff but most did not have too much attention. I told my co-worker this isn't necessarily a bad sign as the number of people caring about this technology are probably similar in our own age group.
