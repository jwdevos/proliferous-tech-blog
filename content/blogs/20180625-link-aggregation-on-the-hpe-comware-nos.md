---
date: 2018-06-25 14:54:59+00:00
title: Link aggregation on the HPE Comware NOS
url: /blogs/20180625-link-aggregation-on-the-hpe-comware-nos/
page_id: _20180625_link_aggregation_on_the_hpe_comware_nos
featured_image: /img/posts/20180625-link-aggregation-on-the-hpe-comware-nos/comware.png
description: "The behaviour of link aggregation on Comware switches is unusual. I figure the knowledge I gained is worth sharing."
tags:
- comware
- hp
- hpe
- lacp
- lab
- networking
- link aggregation
- port-channel
- proxmox
- switch
- switches
- switching
---

The behaviour of link aggregation on switches running the HPE Comware NOS struck me as odd, like everything about Comware does. I wanted to set up two gigabit interfaces as an LACP link to a Proxmox hypervisor and figured the knowledge I gained is worth sharing.
{{< blogimage "/img/posts/20180625-link-aggregation-on-the-hpe-comware-nos/comware.png" >}}
<!-- more -->
In my lab I use a HPE 1920-48G switch. This is a 48 port gigabit smart switch that can be bought very cheap. The reason I chose this thing is because you can unlock the full Comware CLI like this (I cut off the warning text because nobody cares):
{{< blogimage "/img/posts/20180625-link-aggregation-on-the-hpe-comware-nos/comware_unlocked.png" >}}

The password to enter is `Jinhua1920unauthorized`. Now we have the full Comware CLI available, the behavior is representative of the enterprise-grade Comware switches (as sold by HPE under the H3C brand). Of course there can be differences between switch models and software versions.

The main thing I ran into is the fact that you need to make sure configuration applied to the aggregate interface is the same as configuration applied to the underlying physical interfaces. I'm used to Cisco, where configuration applied to the aggregate interface gets applied to the underlying interfaces automatically.

In the following example I will explain how to set up an aggregate interface called Bridge-Aggregation4 (this is the Comware version of a port-channel). The member interfaces will be GE1/0/41 and GE1/0/42.

I like to define the Bridge-Aggregation interface first, then apply some config to it:
{{< blogimage "/img/posts/20180625-link-aggregation-on-the-hpe-comware-nos/comware_bagg.png" >}}

This interface now looks like I want it to in the running config:
{{< blogimage "/img/posts/20180625-link-aggregation-on-the-hpe-comware-nos/comware_bagg_config.png" >}}

At this moment, the two physical interfaces still have their default config. Time to change that:
{{< blogimage "/img/posts/20180625-link-aggregation-on-the-hpe-comware-nos/comware_bagg_physical_interface_config-1.png" >}}

GE1/0/42 would get the same configuration. Note that executing the config commands in this order works the easiest. If the physical interface is already a member of the aggregate interface, changing these settings results in a warning, even if the physical interface is configured wrong/different than the aggregate interface config.
{{< blogimage "/img/posts/20180625-link-aggregation-on-the-hpe-comware-nos/comware_bagg_physical_interface_wrong_order.png" >}}

I configured just the aggregate interface and the membership when first trying this, being used to the Cisco behavior. When frames were not being bridged even though all other config was correct on both sides and everything seemed to be up, I had to investigate. Entering the VLAN config etc on the physical interfaces too solved my problem.
