---
date: 2017-10-13 16:44:40+00:00
title: OpenBSD firewall with pf using Ansible
url: /blogs/20171013-openbsd-firewall-with-pf-using-ansible/
page_id: _20171013_openbsd_firewall_with_pf_using_ansible
featured_image: /img/posts/20171013-openbsd-firewall-with-pf-using-ansible/logo-2.png
description: "I've created an Ansible project that can be used to configure and manage an OpenBSD firewall running pf and dhcpd."
tags:
- networking
- ansible
- automation
- dhcp
- firewall
- jinja2
- openbsd
- pf
- yaml
---

I've created an Ansible project that can be used to configure and manage an OpenBSD firewall running pf and dhcpd. The project can be found [here on Github](https://github.com/jwdevos/openbsd_firewall_ansible). The playbooks can be used to bootstrap a fresh install, do all of the setup and configuration tasks and make changes later to a running system. All of the state is put in the variables under host_vars.
{{< blogimage "/img/posts/20171013-openbsd-firewall-with-pf-using-ansible/logo-2.png" >}}
<!-- more -->
The playbooks produce a minimum viable product in the form of a working firewall. This first version is IPv4 only as I wanted to reach something that I can demo as quick as possible. The fundamental idea was to be able to deploy and manage a firewall box while describing all the state in variables.

The playbooks assume a fresh install of OpenBSD with two network interfaces and SSH reachable on one of them. You run the playbooks from another machine. The result will be a working firewall running pf with NAT to the outside interface and a DHCP server on the internal interface. This will be a very minimal configuration though, as the aim of this project was to  be a proof of concept. I consider the PoC a success and will be building it out further for personal use. Feel free to take the ideas and code from this project to do your own thing with if you're interested.

The basic structure of the project is as follows:

* Root directory containing the playbooks to run
* host_vars directory containing a directory for only one host. Within that directory there are multiple files holding all the required variables to run the playbooks
* roles directory containing the setup role. Within the setup role there are tasks and templates. The main task calls all the other tasks. Most of the other tasks rely on templates to generate configuration files that get placed on the host

The first thing to do when using the playbooks is to set the variables to the values that you need to make sure that Ansible can reach your OpenBSD server. Then you run the bootstrap playbook (see the project readme) which sets up package management, installs Python and sets the proper symlinks.
After this step, Python is available for use, unlocking the true capacity of Ansible on the system. At this moment, the playbook play_setup can be used. This playbook actually calls a role called setup that takes care of all the rest of the deployment.

To illustrate the idea of the playbooks further, let's take an excerpt of my interface variables:
```yaml
vmx1:
  name: lan
  fw: internal
  dhcp_client: no
  dhcp_server: yes
  ip: 192.168.1.1
  netmask: 255.255.255.0
  subnet: 192.168.1.0
  dhcp_range_begin: 192.168.1.100
  dhcp_range_end: 192.168.1.199
```

These variables get used by the setup role to do multiple things:

* Configure host interface settings. For this interface, the file `/etc/hostname.vmx1` gets placed with content to set it to a static IP
* Configure the relevant part of `/etc/dhcpd.conf` to enable a DHCP server on this interface
* Provide input to the configuration file for the pf firewall

In the example above I've taken a single interface but the playbooks are written to extend this idea. Adding a new interface is as simple as adding some more variables to describe the state you wish to have on this new interface, run the playbook again and your system will be set up for it. Under the hood, Jinja2 gets used to parse the variables and to apply some logic to make sure everything ends up in the right place.

Overall I expected more pain when trying to manage OpenBSD with Ansible, but the basic modules really work quite well. This project relies on the template module a lot and I really like that Ansible determines whether a file has changed for me. Generate a config file that turns out to be the same as the file already on the host and nothing happens. On top of that, Ansible keeps track of changed stuff. This allows you to do things like restart networking only if interface configuration has been changed.

I will continue to develop this project. The main progress will be in a private code base but I expect to port the general cool stuff and improvements back to the code on Github. The next hard thing to do is think of some way to describe firewall rule contents in variables, then take those variables and parse them to become actual rules.
