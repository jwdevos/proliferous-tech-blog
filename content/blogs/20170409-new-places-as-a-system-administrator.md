---
date: 2017-04-09 21:37:31+00:00
title: New places as a system administrator
url: /blogs/20170409-new-places-as-a-system-administrator/
page_id: _20170409_new_places_as_a_system_administrator
featured_image: /img/posts/20170409-new-places-as-a-system-administrator/laptop.jpg
description: "I've provided a checklist that is relevant to any existing IT infra that exists, with the hope of helping system administrators get a grip on new environments."
tags:
- basics
- networking
- best practice
- career
- checklist
- networking
- system administration
---

I thought I'd do a more generic topic for this post, although some of it is certainly applicable to network engineers as well. When I still did general system administration work I had this list that I used to get a grip on every new infrastructure that I came across. The list consists of a number of topics, most of which are relevant for any given IT infrastructure in existence. I am now sharing this list in the hope that it will be useful for folks starting at a new place or even for junior system administrators who are just getting started.
{{< blogimage "/img/posts/20170409-new-places-as-a-system-administrator/laptop.jpg" >}}
<!-- more -->
So let's get on with the list. It contains mostly technical topics but also a couple of organizational things. I work through all the topics in a new environment in no particular order. The order that you prefer will probably depend largely on your own background and particular areas of expertise.

* **Monitoring**  
Every infrastructure should have one or more monitoring system, depending on your needs. Less is more, if you can manage with only one and still meet all your requirements then that's preferred so you don't have to divide your attention. The monitoring system should provide alerts via a dashboard and/or e-mail about important events that the infrastructure might generate. You should also expect some kind of performance metrics to be implemented. There are way too many different solutions available but some popular ones you might encounter are variants of the open source solution Nagios, or Microsoft's SCOM (System Center Operations Manager), a part of the System Center software suite as the product name implies.
* **Logging**  
Storing logs at a central location or at least outside of the system that you want to view the logs for is a recommended practice for both security and troubleshooting options. With the troubleshooting topic in mind you might want to make sure that the logs are searchable in a practical way, as opposed to only being stored in a large file somewhere just to be compliant. [The syslog protocol](https://tools.ietf.org/html/rfc5424) is typically used and the logging solution might be integrated into the monitoring solution, or there might be a separate product.
* **The Network**  
Every infrastructure has a network in some form and quality or another. If it's well documented you should expect at least a CMDB, a layer 2 diagram and a layer 3 diagram. Those are good starting points to glean what you are dealing with.
* **Active Directory**  
Almost any infrastructure, at least in enterprise IT land, will have Microsoft's Active Directory as the central authentication system. You should be familiar with the structure and conventions used within the Active Directory.
* **E-mail**  
Every organization uses e-mail and in enterprises the solution that's used is bound to be Microsoft Exhange, although some other products are also possible. Make sure you understand which servers are used for the e-mail infrastructure, how the mail flow works, if there are additional products used outside of the mailservers (like spam filters), how it all ties together and how the storage is placed and configured.
* **Virtualization**  
Except in a very small business that only uses a single server, in 2017 you're sure to encounter virtualization. Popular tastes are Microsoft's Hyper-V, VMware's vSphere built on top of ESXi servers, or maybe a solution like the open source [KVM](https://www.linux-kvm.org/page/Main_Page). Virtualization servers (called hosts) integrate tightly with other infrastructure components like storage, networking and of course monitoring.
* **Physical Servers**  
Every environment has physical servers and you should be familiar with them to keep an eye on resources that are available or in use. You should also be able to troubleshoot or even reinstall the servers if needed. Not every administrator is keen on things like clean cable management, especially power cables and how they're connected, but if you want to provide a reliable environment it's worth paying attention to those kinds of details.
* **Storage**  
Storage is another component you'll find everywhere. It's getting more and more common to have a centralized solution in the form of a NAS or even a SAN. The network that's used to connect the storage solution to the rest of the environment might be ethernet or fibre channel, but ethernet is definitely the dominant solution these days. At some places, the storage might be divided over the physical servers. That can be the case in a traditional environment, or when a product like VMware's VSAN is used to create a virtual SAN from the local storage of multiple servers.
* **Databases**  
There are always applications being used that store their data in a database. Common vendor solutions are sold by Oracle and Microsoft. Common open source databases are MySQL or their fork MariaDB. An alternative is PostgreSQL. All of the solutions mentioned this far are traditional relational databases. NoSQL-type databases like MongoDB are also gaining traction. The databases that are used should be well-documented and you should be able to perform at least basic management tasks on them.
* **VDI**  
VDI stands for Virtual Desktop Infrastructure. The most well-known example of a VDI solution today is Citrix XenApp or whatever the most recent naming invention of their creative marketing department seems to be. VDI is used to have multiple users work on a server. Basically, compute resources are centralized in the server farm instead of being distributed over user workstations. With VDI, the endpoint systems are often thin clients with very little local resources. In most environments you typically see a choice being made between mostly VDI or mostly separated workstations.
* **Endpoint Protection**  
Endpoint protection encompasses solutions like anti-virus and anti-malware. These days, there is probably integration of these solutions with the endpoint management system or even with firewalls or security monitoring systems.
* **Endpoint Management**  
Endpoint management can be a broad topic. In a Microsoft environment the Active Directory Domain Controllers with their group policies are certainly a part of it. There can also be additional solutions for provisioning or imaging the endpoints. If thin clients are used combined with a VDI solution, the thin client vendor probably offers some kind of management solution as well.
* **Backups**  
You always need backups and there are a ton of different solutions. You need to make sure you are familiar with the solution that your environment uses to facilitate in restore requests and to be sure the solution and its configuration meet the requirements so your customer or employer can't easily lose their data.
* **Physical Locations**  
There can be a lot of different physical locations that are relevant to you as a system administrator, depending on the environment that you work in. Think about things like different physical locations, either company sites or data center locations. Within those sites, different kinds of locations can be important like patch closets, server rooms, storage rooms and test benches, and safes for backup tapes and other materials that need to be locked away. Things like physical access control are a thing to keep in mind here, so you're sure you can find and have access to that hidden patch closet when you want to do after hours maintenance work.
* **Documentation**  
This should be a no-brainer, but you want to have decent documentation. It should be complete, up to date, and organized in a way that allows you to find what you are looking for. When you start in a new environment, the documentation is probably the first thing that will be brought to your attention. Proper documentation should always be a priority for the team but sadly it's often an outdated mess. Documentation is like the weather, everybody talks about it but nobody does anything about it.
* **Ticketing System**  
Most organizations implement some form of the ITIL processes like incident and change management to keep their IT operations under control. There is bound to be a ticketing system implemented to facilitate those processes. In my country, TOPdesk seems to be a popular one. I am not too familiar with the alternatives but the general idea is mostly the same.

There's a good chance that some or all of these areas lacking. The whole team bears responsibility but as the newcomer you are in the best position to keep an eye out for chances for improvement. Ask a lot of questions and document all your findings. Thank you for reading yet another post on Lab Time! if you've made it this far and please feel free to add a comment as I want to know what you think. This post can improve and expand over time as I receive more feedback.
