---
date: 2017-06-19 11:06:13+00:00
title: Ansible inventory considerations
url: /blogs/20170619-ansible-inventory-considerations/
page_id: _20170619_ansible_inventory_considerations
featured_image: /img/posts/20170619-ansible-inventory-considerations/ansible_logo.png
description: "Recently I've been making my first steps with Ansible. This article is about a couple of different choices you can make regarding the inventory files."
tags:
- system administration
- ansible
- automation
- debian
- devops
- lab
- linux
- networking
- yaml
---

Recently I've been making my first steps with Ansible. I've barely scratched the surface and the tool is already awesome. Some things are pretty complicated to grasp however, that's why I want to share some basic information. This article is about the different choices you can make regarding inventory files.
{{< blogimage "/img/posts/20170619-ansible-inventory-considerations/ansible_logo.png" >}}
<!-- more -->

With Ansible, you use inventory files to declare the devices you want to manage with it. The official documentation for working with the inventory is [located here](http://docs.ansible.com/ansible/intro_inventory.html). While trying to set it up, I ran into a couple of things that I've found confusing. The most important part is your basic hosts file, containing the devices and possibly some variables assigned to the devices. This is my file: `./example_project/hosts`:
```toml
[all]
192.0.2.1

[ios]
198.51.100.1
R1.example.lab

[junos]
203.0.113.1
R2.example.lab
```

As you can see, you can declare the devices by IP address or FQDN. Make sure the box that you run Ansible on can resolve the FQDN's if you choose that option. You can also set some variables for each device, like this:
```toml
[all]
S1 ip=192.0.2.1 model=2960x
R2 ip=192.0.2.2 model=vmx
```

The format used in the examples above is called the INI format. The hosts file also supports the YAML format. This is my YAML file: `./example_project/hosts.yml`:
```yaml
---
all:
  hosts:
    S1:
      ip: "192.0.2.1"
      model: "2960x"
    R1:
      ip: "192.0.2.2"
      model: "vmx"
```

The options above are nice but not really scalable or readable. Ansible offers a solution for that. What I like to do is to keep variables out of the hosts file. Ansible allows you to create a directory structure to place your variables in separate files. Ansible just gets what you are doing out of the box if you use this feature. The directory structure looks like this:
```bash
./example_project/hosts
./example_project/group_vars/ios/vars.yml
./example_project/group_vars/junos/vars.yml
./example_project/host_vars/S1/vars.yml
./example_project/host_vars/R1/vars.yml
```

The files used in this way are always supposed to be written as YAML, never as INI. As long as you keep everything consistent, Ansible works out the proper mappings between the groups and hosts that you declared and their vars. Here is an example of a vars.yml file that you might place under a group in group_vars:
```yaml
---
syslog_server: "192.0.2.250"
```

And an example of a file that you might place under a host in host_vars:
```yaml
---
hostname: "R1"
```

It seems that hosts files written as YAML aren't as popular as hosts files written as INI. If you try to keep the hosts file minimalistic and place everything under host_vars and group_vars the difference doesn't matter much anyway. To kickstart your automation efforts and get rid of some manual labor, the construction as described above should be enough. If you want to take it a step further, there's the possibility to have Ansible read information out of other systems. A system used for that will then become your so-called source of truth. Something like NetBox might be an option but I've yet to go down that path and try things out. Thanks for reading another Lab Time article and please feel free to leave any comments or questions.
