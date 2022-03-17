+++
categories = ["arduino","game"]
coders = []
date = 2021-12-10T23:00:00Z
description = "A toy bomb with timer, explosion and a defuse sequence"
github = ["https://github.com/hktari/bomb"]
image = "/images/bomb/bomb12.jpeg"
title = "Toy bomb"
type = "post"

+++

The idea started as we required a prop for a LARP game. I knew I wanted something "ticking", one of those led displays you see in movies, wires and an explosion. Also after the players had found the bomb, I've wanted them to work together in defusing the bomb. That's why I've added three wires on the top, which have to be cut in the right order to succsesfully stop the bomb.

### The materials

I've found a cool looking casing of an old light and a metal bucket which fits the lights' diameter. You could push the metal structure into the bucket and it would already feel like a bomb.

Regarding the electronics

First I've thought about having 6 seven segment displays for displaying hours, minutes and seconds. For that reason I've also ordered a pack of [SN74HC595N](https://www.amazon.de/dp/B08DLJB3M6/ref=pe_27091401_487027711_TE_SCE_dp_1) bit shift registers and thought about daisy chaining them. However I found out that those displays wouldn't work too well for displaying time due to them not having leds to display a colon (":").

So I've ended up using the [TM1637 display](https://www.amazon.de/-/en/gp/product/B06X952QXS/ref=ppx_yo_dt_b_asin_title_o03_s00?ie=UTF8&psc=1) to display minutes and seconds. And a single 7 seg LED placed right next to it to be able to display minutes as a three digit number.

![](/images/bomb/bomb3.jpeg "led display")
![](/images/bomb/bomb2.jpeg "SN74HC595N")

### The explosion

I've played a lot around with playing wav files from arduino. Using the [TMRpcm](https://github.com/TMRh20/TMRpcm) library, all sorts of online tutorials on building a simple amplifier circuit, learning about common emmiter amplifier circuits, I thought I'd be able to hack up something small and functional. But to my dismay I failed to get any sound out of the arduino uno. 

I ultimately scratched the idea of a speaker and replaced it with a simple balloon and a needle. Attached to a 5v motor, the needle is rotated towards the balloon. Simple and loud. Also the shape of the casing came in handy again, fully enclosing the balloon, holding it in place.

![](/images/bomb/bomb6.jpeg "Homepage Screenshot")

### Disarming the bomb

There are three screw terminals on the top of the casing. This was perfect. The player would see the wires straight away, and almost certainly know what to do with them.

I've implemented two happy paths in defusing the bomb. If the first wire the player cuts is a wrong one, he or she can still defuse the bomb if the next one he cuts is the right one. All three wires have to be cut in order for the bomb to stop ticking and the green LED to light up.

![](/images/bomb/bomb7.jpeg "screw terminals")



 ![](/images/bomb/bomb4.jpeg "All the electronics are soldered.")



 ![](/images/bomb/bomb12.jpeg "The bomb is ready.")


{{< video "/videos/bomb active.mp4" "my-5" >}}
