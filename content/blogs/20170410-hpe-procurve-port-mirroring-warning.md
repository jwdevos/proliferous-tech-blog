---
date: 2017-04-10 15:46:46+00:00
title: HPE ProCurve port mirroring warning
url: /blogs/20170410-hpe-procurve-port-mirroring-warning/
page_id: _20170410_hpe_procurve_port_mirroring_warning
featured_image: /img/posts/20170410-hpe-procurve-port-mirroring-warning/logo.jpg
description: "Words of warning about configuring port mirroring on switches that run the ProVision NOS."
tags:
- aruba
- networking
- bridging loop
- cisco
- hp
- hpe
- port mirroring
- procurve
- provision
- span
- switch
---

There's a bit of unexpected behaviour on ProCurve switches when configuring port mirroring if you come from a Cisco background. Ports that are configured as a destination for port mirroring are still actively participating in their configured broadcast domain(s). I have witnessed the most severe possible consequence in the form of a bridging loop on two core switches. For that reason, I see a warning as due diligence.
{{< blogimage "/img/posts/20170410-hpe-procurve-port-mirroring-warning/logo.jpg" >}}
<!-- more -->
HPE (previously HP) has been selling ProCurve switches with the ProVision NOS on them for a long time. They are widespread in a lot of enterprise networks. They still sell the ProVision NOS in their new switches that are branded as Aruba. The behaviour in the new Aruba switches is likely to be the same but I don't have the opportunity to test it at this moment.

##### The problem
Here is the thing: if you configure a ProCurve switch for port mirroring, you choose a source port and a destination port. If you come from a Cisco background, then you would expect the destination port to become ONLY a destination port for the port mirror as the result of your configuration, and nothing else. If you configure port mirroring on the ProCurve switch, the destination port will still be actively participating in any broadcast domains that it is configured to use. By itself, this is not immediately a threat to the stability of your network, although it might pose a security risk. Now imagine a scenario where you are hooking up a device to multiple switches for monitoring. If that device were to have a configuration error, a bug, or any other problem that causes it to forward frames across the connected interfaces, you have now formed a bridging loop!
{{< blogimage "/img/posts/20170410-hpe-procurve-port-mirroring-warning/topology.jpg" >}}

Depending on a couple of factors like your spanning tree configuration, the specific port's configuration as it relates to spanning tree (like PortFast) and the behaviour of the monitoring box, you either get lucky, get screwed for the native VLAN, or get screwed for every VLAN that's tagged on both port mirror destination ports.

##### The remediation
Armed with the info given above, there is an easy solution to prevent this when using port mirroring on ProVision switches:

* **1:** Add a new, unused VLAN on each switch
* **2:** Make sure the new VLAN is not present on any VLAN trunk on the switch
* **3:** Configure the port mirroring destination port to only use the newly created VLAN as the native VLAN, and make sure no other VLANs are tagged to this port

This approach will prevent any unintended traffic from crossing your mirror destination.
