---
date: 2017-04-15 16:12:01+00:00
title: Tips and tricks for a mobile EVE-NG lab
url: /blogs/20170415-tips-and-tricks-for-a-mobile-eve-ng-lab/
page_id: _20170415_tips_and_tricks_for_a_mobile_eve_ng_lab
featured_image: /img/posts/20170415-tips-and-tricks-for-a-mobile-eve-ng-lab/logo.png
description: "Doing all my networking lab work on a mobile device has faced me with some challenges. Most of them are now resolved so I'd like to share my findings."
tags:
- eve-ng
- firewall
- hypervisor
- lab
- nat
- linux
- networking
- openbsd
- unetlab
- vmware player
---

Most of my lab work gets done on a laptop these days. I like to run an EVE-NG lab and connect it to several other VM's. There are some challenges in doing that on my mobile Windows device as compared to having a dedicated ESXi box for it. Most of those challenges are now solved so I'd like to share some of my findings.
{{< blogimage "/img/posts/20170415-tips-and-tricks-for-a-mobile-eve-ng-lab/logo.png" >}}
<!-- more -->
I'll provide the challenges and solutions in two categories; hypervisor choice and connectivity options. If you just want to get started with EVE-NG, [this Lab Time article](https://www.lab-time.it/2017/04/11/setting-up-the-successor-to-unetlab-eve-ng/) will provide all the info you need in one place. Here are the challenges that I ran into:

##### Selecting a hypervisor
The hypervisor you'll want to use depends on your requirements. Mine where:

* Free
* Compatible with the OVA provided (without too much conversion hassle)

This rules out everything except for VMware Player so that's what I went with. Here are the alternatives that I have ruled out:

* Hyper-V. It's integrated on most modern Windows installations and that's attractive. It doesn't support the VMDK disk format and it doesn't provide a hassle-free way of deploying the OVA though so I went with something else
* VirtualBox. I kind of like VirtualBox as a free solution, but it does not provide nested virtualization. That means your EVE-NG VM on top of it can't provide virtualization for your images. This hurts the qemu-related stuff

##### Connectivity
Again this depends on your requirements. On a mobile device they might be something like this:

* Connectivity works at very location your device gets used and is online, without manually changing settings
* Parts of the EVE-NG topology have to be able to talk to other things on the mobile device, again without manually changing settings when using the device at different locations

The first thing I tried to meet these requirements is configure every VM including EVE-NG with a vNIC that's bridged to the local host (and with that the local network). That worked at home and in some other places when I just left everything set to DHCP, but at other places, only my host would get a lease and none of the VM's would.
My next idea was to configure a static IP for each VM, and then use a secondary IP on the NIC of the host. That idea sucked because Windows doesn't allow you to add a secondary static IP when the NIC is set to DHCP. It has to stay in DHCP if you use the device at different locations. With all of these approaches, using your wireless NIC is also a challenge. I ended up solving it like this:
{{< blogimage "/img/posts/20170415-tips-and-tricks-for-a-mobile-eve-ng-lab/lab-diagram-1.png" >}}

I've hooked up every VM to a host-only network. To get to the internet, the host-only VM's go through a software router that has a second vNIC hooked up NAT'ed to the host device. This ensures internet is reachable from the virtual router and the internal environment any time the host device itself is online. If you use the host-only network, VMware Player has a DHCP service running in there. It got in the way for me as I needed control over the gateway address and the DNS-servers provided. I found a way of managing the local VMware networks by looking for a tool called vmnetcfg.exe, you can Google the instructions yourself but it's probably not fully compliant with the VMware Player license. [My friend Arno](https://www.linkedin.com/in/arno-tilroe-59833427/) pointed out that you can just permanently kill the Windows service for DHCP that VMware uses, it's named VMnetDHCP. Be sure to provide the NIC your host uses for the host-only network with a static IP if you go down this route and need connectivity from your host to the VM's too (for example to connect to the EVE-NG web page or to manage things via SSH). The virtual router I use is OpenBSD set up to provide routing, IPv4 NAT from the internal to the external network using the PF package, and DHCP for the internal network. You can also use something like PfSense as an easy solution.
