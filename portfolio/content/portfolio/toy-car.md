+++
categories = ["arduino","toy"]
coders = []
date = 2022-03-18T23:00:00Z
description = "A toy car with accelerometer, LEDs and siren"
github = ["https://github.com/hktari/toy-car"]                      
image = "/images/toy-car/bomb12.jpeg"
title = "Toy car"
type = "post"

+++

So I needed a present for my 2 year old nephew. And as his interest was basically all about cars at that moment, it of course had to be a toy car. After having looked around the Baby Center store for a bit I decided on a medium sized police jeep. Having inspected it through the packaging, I knew that it could be taken apart and that maybe I could pimp it a little - in hopes of making it just a bit more interesting for the little guy, which had at this point already amassed a huge collection of toys. 

The idea was to attach blue and red leds to the roof, and white leds on the front and back. Add a police siren using a buzzer and use the accelerometer to speed up or slow down the audio and visuals based on how fast he would move the car. A button on the side of the car would "turn on the engine" and after a few seconds of inactivity the car would turn off.

### Materials
- [Pemenol MPU-6050 gyroscope / accelerometer](https://www.amazon.de/-/en/Pemenol-MPU-6050-Module-Gyroscope-Accelerometer-Raspberry/dp/B07F3PFK98)
- arduino nano
- standard LEDs
- buzzer
- button
- [TP4056 battery charger](https://www.amazon.de/-/en/AZDelivery-Controller-Lithium-Battery-Charging/dp/B07D2G345P/) 
- a small 3.7V 660mAH Lithium polymer battery.


### Making it work

I had fairly quickly assembled a basic prototype on a breadboard. The car had three states: OFF, STARTING UP (cool police siren audio), RUNNING (idle), MOVING (accelerometer x-axis is above certain threshold). The only thing I had to fiddle around a little with was finding the right library for the mpu 6050, as well as fiddling around with the RST pin - which I ended up not using because otherwise the thing would stop working after a while.

![](/images/toy-car/03.jpeg "car")

The biggest issue was fitting all 20 something wires inside the already tight casing of the car. That required some trial and error. Drilling and sanding the interior parts to fiddle the wires from the front of the car, where the accelerometer, front LEDs, and start button were - to the back where the arduino, the battery, the charging component, a buzzer and 4 LEDs were. It was a very tight fit :D


![](/images/toy-car/01.jpeg "car")

I would cut a small piece out of a solderable metal pcb to use to as ground rail, hot glue as many things as I could in place, and use neo stick or instant glue elsewhere.

![](/images/toy-car/02.jpeg "car")


Had to convince the little guy to bring the car back for "maintenance work", as the charging module was yet hot glued in place and he demanded to play with it none the less :D <3
 
![](/images/toy-car/06.jpg "car")



{{< video "/videos/toy-car.mp4" "toy car start" >}}
