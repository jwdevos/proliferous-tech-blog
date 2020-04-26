---
date: 2017-06-21 08:22:01+00:00
title: Ansible and Cisco IOS intro
url: /blogs/20170621-ansible-and-cisco-ios-intro/
page_id: _20170621_ansible_and_cisco_ios_intro
featured_image: /img/posts/20170621-ansible-and-cisco-ios-intro/ansible_logo.png
description: "Demonstrating the basics of using Ansible to manage IOS devices."
tags:
- ansible
- automation
- cisco
- debian
- devops
- eve-ng
- ios
- lab
- linux
- system administration
- networking
---

You can use Ansible to do a whole lot of tasks for you. I've been doing some basic tasks on Cisco IOS devices. In this article, I'll show you how to get started with Ansible for Cisco IOS by providing some background information, some pointers and an example. For the lab setup, Eve-NG with Cisco IOL devices is being used.
{{< blogimage "/img/posts/20170621-ansible-and-cisco-ios-intro/ansible_logo.png" >}}
<!-- more -->

Ansible works by executing Python code on remote devices. The main idea is to copy instructions that will then be executed as Python code on the remote device. Because most networking devices don't support running the Python code, we have to run the Python code locally on the Ansible box. From there, instructions can be sent via SSH. Ansible provides some network modules out of the box. They can be found [here](http://docs.ansible.com/ansible/list_of_network_modules.html).

Different modules work in different ways. The example in this article is using IOS and is compatible with older types of IOS devices. Because of that, the modules we'll use are based on the Python Paramiko SSH library. Please note that the host that will run the Ansible playbooks will have to know the SSH keys of the hosts that will be managed via Ansible. The most elegant way I've found to solve this [is provided by Ivan Pepelnjak](https://github.com/ipspace/NetOpsWorkshop/tree/master/tools/ssh-keys). I've done a small change to his version if you want to run this against multiple different inventories or in a multitenancy environment for example. You can find my version [here](https://github.com/jwdevos/ansible-network-things/tree/master/register-ssh-keys).

Because the Python code that Ansible runs actually runs on the local network box, we need to specify a variable in our inventory files called "ansible_connection" and set it as "local". You can also set this in a playbook. When adding it to a hosts file in INI-format it looks like this:
```toml
[all]
192.168.1.101 ansible_connection=local
```
When specifying it via a group_vars YAML file it looks like this:
```yaml
---
ansible_connection: "local"
```
For more basic information regarding your inventory files, see [my previous article](https://www.lab-time.it/2017/06/19/ansible-inventory-considerations/).

And now for some actual labbing. I've got a VM running an EVE-NG lab topology on my laptop, looking like this (only the R1 and R2 IOS routers are relevant for this demo):
{{< blogimage "/img/posts/20170621-ansible-and-cisco-ios-intro/lab_topology.png" >}}
Another VM running Debian contains my Python and Ansible software and some Ansible stuff I've written. The Debian VM can reach the Eve-NG topology as described in [an earlier Lab Time article](https://www.lab-time.it/2017/04/15/tips-and-tricks-for-a-mobile-eve-ng-lab/). The inventory file for the lab topology looks like this:
```toml
[all]
192.168.80.104 ansible_connection=local
192.168.80.109 ansible_connection=local
```
Now we can run the following command from the directory containing the hosts file:
```bash
ansible all --inventory=./hosts -m ios_facts -a 'host=192.168.80.104 username=admin password=admin'
```
There are some things you'll want to do different later on, like solving the password thing in a better way, but for your first experiment using a local lab this is acceptable. The breakdown of the command is as follows:

* `ansible all`: runs an Ansible command against the hosts group all, in this case both routers specified in the hosts file
* `- -inventory=./hosts`: specifies the hosts file to use
* `-m ios_facts`: runs the module ios_facts to retrieve some information from IOS devices
* `-a 'host=192.168.80.104 username=admin password=admin'`: specifies the exact host to run the command against (yes, it's needed at this place too, even though you have your hosts file thing going on). Also specifies the user name and password to use

Note that you can append `-v` to any Ansible command you run for a more verbose output. You can even add `-vv`, `-vvv` or `-vvvv` for even more verbose output. If everything went according to plan, the output for the device that you specify in the command will include something like this:
{{< blogimage "/img/posts/20170621-ansible-and-cisco-ios-intro/command_output.png" >}}
The command will fail for the other device(s) specified in the hosts file because you didn't explicitly include them in the command. If you want to run Ansible commands on multiple devices you are better off building playbooks or even roles. That gets you into the next level of the Ansible territory. You can do all kinds of fun and powerful things including saving the output from the commands and making changes on the IOS devices.

That concludes this short Ansible for IOS demonstration. Thanks for reading and as always, comments or questions are highly appreciated.

