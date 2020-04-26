---
date: 2018-09-23 15:44:05+00:00
title: Default Gateway Behavior On Cisco Switches
url: /blogs/20180923-default-gateway-behavior-on-cisco-switches/
page_id: _20180923_default_gateway_behavior_on_cisco_switches
featured_image: /img/posts/20180923-default-gateway-behavior-on-cisco-switches/logo-1.png
description: "Cisco switches that do not perform routing can be confusing when setting up a default route or gateway. I had to figure it out and wrote this blog about it."
tags:
- cisco
- eve-ng
- lab
- learning
- networking
- catalyst
- routing
---

On Cisco switches that do not perform routing, setting up a default route or a default gateway can be a little bit confusing. I've seen some configuration drift in our network recently were incorrect settings caused some switches to become unreachable for management. Read on to find out the details.
{{< blogimage "/img/posts/20180923-default-gateway-behavior-on-cisco-switches/logo-1.png" >}}
<!-- more -->
After some switches went offline for management, I discovered they had both the `ip default-gateway` and the `ip routing` setting enabled. On some switches, `ip routing` is enabled by default but does not show up in the running config. Only "`no ip routing`" will show up. I'll explain why this combination of settings causes switches to unreachable below. 

The `ip routing` setting will put the switch in L3 mode, making the switch use the routing table for lookups. This fact also makes the switch ignore the `ip default-gateway`. If the routing table does not have a default route or a specific route to the destination you need to reach, reachability will be broken, even with a default gateway specified. Configuring `no ip routing` removes the routing table. You can view the difference:
{{< blogimage "/img/posts/20180923-default-gateway-behavior-on-cisco-switches/ip-routing.png" >}}
Even having the `ip default-gateway` setting present won't show any routes because the routing table will not be used. You'll need to decide for your use case which configuration option makes sense. It seems logical to just use the default gateway option for pure L2 switches, as long as you make sure you don't enable routing at the same time and keep the config on all switches consistent. More detailed information about this subject can be found in [Cisco's documentation](https://www.cisco.com/c/en/us/support/docs/ip/routing-information-protocol-rip/16448-default.html).
