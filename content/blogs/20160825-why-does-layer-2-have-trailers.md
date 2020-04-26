---
date: 2016-08-25 15:57:45+00:00
title: Why does layer 2 have trailers?
url: /blogs/20160825-why-does-layer-2-have-trailers/
page_id: _20160825_why_does_layer_2_have_trailers
description: "A student asked me a question after seeing diagrams about ethernet headers and encapsulation: why does layer 2 have trailers? In this post, I will explain why."
tags:
- basics
- networking
- ethernet
- ipv4
- layer 2
- tcp
---

I teach a course about TCP/IP fundamentals for my employer. A student asked me a question after seeing diagrams about ethernet headers and encapsulation: why does layer 2 have trailers? In this post, I will explain why.
<!-- more -->
To introduce the question, let's look at the concept of encapsulation first. Below is the diagram I will use as the basis to explain this.
{{< blogimage "/img/posts/20160825-why-does-layer-2-have-trailers/encapsulation-620.png" >}}

As you can see in the diagram, each layer has its own header. It is also possible for a layer to have a trailer.

The idea is that the data field of a layer contains everything from the layer above it. For example, the layer 2 data field contains both the header and the data field from layer 3. In turn, the layer 3 data field contains everything from layer 4. This process repeats for each frame that is put on the network. The data field is known as a `PDU` ([Protocol Data Unit](https://en.wikipedia.org/wiki/Protocol_data_unit)) or as a `payload`.

The header of a layer consists of protocol-specific information. In layer 3, the network layer, you might find either the IPv4 or IPv6 protocol (or something else, like IPX) being used, for example. The protocol being used determines the content of the header. The header for Ethernet, a layer 2 protocol, looks like this:
{{< blogimage "/img/posts/20160825-why-does-layer-2-have-trailers/ethernet-header.png" >}}

I grabbed the header diagram at [Wireshark.org](https://wiki.wireshark.org/Ethernet), their wiki is a nice and simple resource for information about basic concepts like this. The ethernet header contains the following things:

* **Preamble:** a sequence of 8 bytes, used for marking the start of a new ethernet frame and for synchronizing receiver clocks
* **Source and destination MAC's:** Two fields of 6 bytes each, used for storing the source and destination MAC addresses for the frame
* **Type/Length:** a 2 byte field that contains either the total length of the frame, or the type (if you want to know more about the specifics of this field, you can check out the Wireshark wiki page that I've linked to above)
* **User Data:** the field containing the actual payload
* **FCS:** the frame check sequence

Now for the question: why does layer 2 have trailers? Because typical layer 2 protocols have their checksum as a trailer instead of part of the header. Allow me to explain this in more detail. The [Frame Check Sequence](https://en.wikipedia.org/wiki/Frame_check_sequence) contains a number that is calculated over the entire frame. That number is then stored as a trailer in the form of the FCS field. After that, the sender puts the frame on the network. The receiver will do the same calculation as the sender, and then checks if the result of the calculation is the same as the number stored in the FCS field. If the number is the same, the receiver knows that the frame has been transmitted over the network without errors. If the number is different, the receiver discards the frame.

The reason that this student asked the question, is because of the difference between ethernet and other protocols that were discussed. If you look at the headers for IPv4 or TCP for example, you find that the checksum is in the header, so it is placed before the payload. If a protocol knows the length of the frame or packet, whatever it is being sent, then there is no need for a trailer. The reason that common layer 2 protocols use a trailer is probably historical. I've had a hard time to find specific information about this. Some argue that it might be more efficient for hardware to use the header plus trailer construction, but I've seen no proof with the arguments.

My next post will be a longer article about packet flow basics including layer 2 and layer 3 fundamentals. I will build a lab to actually demonstrate the subject, and then use Wireshark to inspect the results. I will also try to include a segment that uses a different layer 2 protocol like HDLC or Frame Relay, to look at different trailers and make a bridge to the subject of this post. As always, thank you for reading my blog and feel free to leave a comment.
