---
date: 2018-01-10 16:45:50+00:00
title: 'Juniper Studies: Day One IPv6 book'
url: /blogs/20180110-juniper-studies-day-one-ipv6-book/
page_id: _20180110_juniper_studies_day_one_ipv6_book
featured_image: /img/posts/20180110-juniper-studies-day-one-ipv6-book/logo.png
description: "Day One: Exploring IPv6 is a short primer on IPv6 concepts and related configuration on Junos."
tags:
- books
- learning
- networking
- series
- certification
- jncip
- jncis
- juniper
- reading
---

Day One: Exploring IPv6 is a short primer on IPv6 concepts and related configuration on Junos. The Day One library consist of short books that aim to get you up to speed on a diversity of topics. The book on IPv6 contains a lot of lab examples and hands-on work, definitely a good thing. Read on to find out more.
{{< blogimage "/img/posts/20180110-juniper-studies-day-one-ipv6-book/logo.png" >}}
<!-- more -->
The book Day One: Exploring IPv6 [can be found here](https://forums.juniper.net/t5/Day-One-Books/Day-One-Book-Exploring-IPv6/ba-p/52402) for free, although you do need a Juniper JNet account. This short book contains only three chapters. The first chapter, aptly called "Introducing IPv6", contains the mandatory explanations about address structure, special addresses, common subnet practices, differences from IPv4 including NDP and automatic address assignment to hosts (for example what's needed to provide DNS configuration). Most people reading this would probably know these topics by heart, but when preparing for exams it's always good to refresh some knowledge.

The second chapter, "Getting started with IPv6" provides the lab topology that will be used for the rest of the book. It looks like this:
{{< blogimage "/img/posts/20180110-juniper-studies-day-one-ipv6-book/lab.png" >}}

Chapter two is about about setting up the fundamentals of the lab. There is interface configuration, verifying all the links, viewing NDP information, and static routes to make everything reachable. [My own lab](https://www.lab-time.it/2018/01/09/comparing-juniper-wistar-to-eve-ng/) was built [using Wistar](https://interestingtraffic.nl/2017/11/16/playing-around-with-wistar/) and vMX nodes.
Still being inexperienced on the Juniper platform I did have a little trouble reading into one piece of the topology correctly. I mixed up the configuration for the links that hold subinterfaces. At first, I configured the addresses on local IRB instances with a corresponding bridge domain. I then placed the interfaces that were supposed to be subinterfaces in the bridge domains I created. Later, while configuring routing protocols, I realized the error I made and migrated everything to proper subinterfaces, which are way easier to configure on a vMX than the bridge domains by the way.

The configs for my labs are located [here for OSPF3](https://github.com/jaap-de-vos/juniper-day-one-exploring-ipv6/tree/master/OSPF3) and [here for RIPng](https://github.com/jaap-de-vos/juniper-day-one-exploring-ipv6/tree/master/RIPng). Note that interfaces numbers in my configs are different than those in diagram in this post. All the basic interface configuration is left the same after chapter two, but the static routes have been removed. I left out my tryout configs for IS-IS. I almost got that part working properly but I still need a bit more general IS-IS knowledge so I decided to park this bit for later.
My config files have the proper interface setup for the subinterfaces, in case anybody needs some help with that part.

Chapter 3, "Dynamic Routing with IPv6", has you configuring some routing protocols, as you might have guessed by now. There is some talk about the differences between the v4 and v6 versions of those protocols. For IS-IS, you really don't need to worry about any differences. RIPng is pretty easy too. If you are going to build an IPv6 network with OSPF however, keep some of the different inner workings like new LSA types in mind. The book gives a quick summary but if you really want to get into thismore , I suggest looking up some other, more expansive resources.

In my experience, both RIPng and OSPF3 where easy to get working. IS-IS was a different beast however. It probably didn't help that this was my first time ever configuring IS-IS. I got pretty far but I was struggling with LSP's in databases where I wouldn't expect them. Also, my level 1 only router wasn't getting any required routes advertised into it, not even a default route. Obviously I was still doing something wrong but I decided to get into the IS-IS specifics at a later time. I'm considering following [this video course](https://www.safaribooksonline.com/library/view/intermediate-system-to/9780134465296/ ) by Russ White on Safari.

All in all, this Day One book was pretty cool. I didn't learn a lot of new theoretical information because I'm already CCNP R&S; certified, but it was a cool inspiration to build some simple labs and try some Junos stuff out. Going through this definitely improved my confidence on the Junos CLI. I noticed that another Day One book, [Day One: Exploring the Junos CLI, 2nd edition](https://forums.juniper.net/t5/Day-One-Books/Day-One-Book-Exploring-the-Junos-CLI-SECOND-EDITION/ba-p/49002), was a good resource for looking up some commands.
