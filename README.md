# 2D Vector Field Visualization

## Why This Was Created

There are tons of great tools online to supplement mathematics instruction, and great tools are necessary for visualizing abstract concepts. While teaching Multivariable Calculus to high school students, I wanted an easy way for my students to visualize a two-dimensional vector field.

To this point in the course, [Desmos](http:///www.desmos.com/calculator) and  [CalcPlot3D](http://web.monroecc.edu/manila/webfiles/pseeburger/CalcPlot3D/) have sufficed. When we began to study curl, I wanted to build my students' intuition via the fluid flow interpretation of a vector field. My search for existing tools turned up nothing dynamic, and the closest thing I could find was an animation in a [Khan Academy video about curl](https://www.khanacademy.org/math/multivariable-calculus/multivariable-derivatives/curl-grant-videos/v/2d-curl-intuition). (I should mention that this video's presenter is the same fellow doing the [3Blue1Brown](https://www.youtube.com/chaannel/UCYO_jab_esuFRV4b17AJtAw) videos that provide amazing visual explanations and intuition for quite abstract mathematical concepts.)
I required more options and control, so this project was born.

## Demo

[https://mbwatson.github.io/vectorField](https://mbwatson.github.io/vectorField)

## Description

You will see the vectors representing a vector field over the square [-5,5]x[-5,5] in the xy-plane. You will also see a particle system arranged evenly about the square. The particles flow according to the forces imposed on them by the vector field.

## Controls

### Buttons

There are several buttons allowing you to...

* Start and stop the animation
* Empty the particle system of its particles
* Reset to particle system with particles at regularly spaced intervals on the plane
* Show and hide particle system (they are still moving if unpaused, just invisible)
* Show and hide vectors
* Show and hide coordinate Axes
* Show and hide the grid lines

### Mouse

With the mouse, you can add new particles to the particle system by clicking and dragging on the plane.

In addition, you can change the animation speed by scrolling over the plane.

### Preset Vector Functions

Particles on the two-dimensional surface animate according to the forces imposed on them from the current vector field. This vector field can be changed, but only to a handful of preset ones as of this writing.

## Todo List

There are many additions that would make this more useful as an instructional tool, which will be added as the time becomes available. A few of the most pressing issues are below.

* Change viewport
  * Grab and translate the plane to investigate other portions of the vector field.
  * Zoom in and out

* Use MathQuill to allow users to enter their own vector functions.
* Adjust vector and particle spacing and size on the fly.
