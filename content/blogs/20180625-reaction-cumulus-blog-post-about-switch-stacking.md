---
date: 2018-06-25 11:54:20+00:00
title: 'Reaction: Cumulus blog post about switch stacking'
url: /blogs/20180625-reaction-cumulus-blog-post-about-switch-stacking/
page_id: _20180625_reaction_cumulus_blog_post_about_switch_stacking
featured_image: /img/posts/20180625-reaction-cumulus-blog-post-about-switch-stacking/logo.png
description: "Recently, Cumulus blogged that there is no need for switch stacking in campus networks. They raise some good points, but some important points are missing."
tags:
- networking
- cumulus
- reaction
- stack
- stacking
- switch
- switching
---

Recently, Cumulus Networks placed a [blog post](https://cumulusnetworks.com/blog/switch-stacking/) on their website claiming that there is no need for switch stacking in campus networks anymore. Even though they raised some good and valid points, there are other important considerations missing. I tried to leave a comment under the post on the Cumulus website. Comments need to be approved and it seems they don't really look at this, so I have to take the discussion to my own site.
{{< blogimage "/img/posts/20180625-reaction-cumulus-blog-post-about-switch-stacking/logo.png" >}}
<!-- more -->

Switch stacking is a technology used to hook up multiple switches together to get them to share their management and control plane. Some popular benefits include the following:
  * Less logical devices to manage, as the switches stacked together will behave as a single device as far as device management is concerned
  * Better network topology. The shared control plane allows you to set up LACP links between stacks, where a single LACP channel can consist of physical links between separate stack members. For a given path in the network, this enables redundancy of cabling, interface hardware (like SFP's) and the network device itself. This also provides a tool to remove as much spanning tree from the network as possible

In the post on the Cumulus blog, the authors argue that the device management benefit is no longer valid, because this has been solved by automation. I get why they are saying that and I actually agree, assuming the equipment you have to work with provides decent enough automation capabilities. Of course, you still need to be in an organization where automation is an option by policy and by knowledge of your team. Besides, there is still some management overhead for things like monitoring and (literally) administering the devices even if you automate things.

The second argument that gets raised is that device redundancy can be solved without stacking. Let's say you want to connect 2 pairs of switches to each other in a redundant way, by using LACP, like you would do when you have two stacks of switches. Connecting network devices like this is called [Multi-Chassis Link Aggregation](http://ethancbanks.com/2014/03/27/the-ethernet-switching-landscape-part-04-multichassis-link-aggregation-mlag/), often referred to as [MLAG or MC-LAG](https://en.wikipedia.org/wiki/MC-LAG). The Cumulus NOS provides a way to have MLAG without stacking the switches. I'm a fan of this capability and I think it's a very decent solution to fulfill the requirement of having device/link redundancy.

What I am missing in the Cumulus post is the following consideration. Let's say you have a campus location with multiple buildings. You might be running a [collapsed core or a traditional three-tier topology](https://interestingtraffic.nl/2018/06/08/collapsed_core_design/). A random SER (satellite equipment room as opposed to a MER or main equipment room) might have to house enough access switches to connect 400 user ports. Typically, you might find 2 switch stacks consisting of 5 stack members each, for a total of 10 switches or 10*48 = 480 user ports. In this scenario, each stack can have redundant uplinks by just using 2 fiber pairs per stack for a total of 4 fiber pairs for this particular SER.

If you aren't stacking, like in the solution that Cumulus proposes in their blog, you would need to run a redundant uplink to each individual switch. That would bring you to 10*2 = 20 fiber pairs for the SER in my example. If you are placing new gear and new fibers, this can be a problem because of the cost associated with installing new fiber in buildings and even between buildings. Especially if you can't make a direct path from the MER where the core or distribution switch is housed and you need to patch through other rooms or buildings, you would want to keep the total amount of required fibers down. If you are working in an existing network where you need to make do with the existing fibers that are available, needing more pairs can be even more problematic.

One other way to bring down the total amount of fibers needed is to work with chassis switches. Usually, you can buy stack members and the required stacking hardware cheaper than chassis switches though.

Like usual, there are no magic bullets. When it comes to network design, there are always choices you need to make, you can't have it all. It's [like Russ White says:](https://rule11.tech/havent-found-tradeoff/) if you haven't found the tradeoffs, you haven't looked hard enough.
