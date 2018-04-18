# 2D Vector Field Visualization

## Why This Was Created

There are tons of great tools online to supplement mathematics instruction, and great tools are necessary for visualizing abstract concepts. While teaching Multivariable Calculus to high school students, I wanted an easy way for my students to visualize a two-dimensional vector field.

To this point in the course, [Desmos](http:///www.desmos.com/calculator) and  [CalcPlot3D](http://web.monroecc.edu/manila/webfiles/pseeburger/CalcPlot3D/) have sufficed. When we began to study curl, I wanted to build my students' intuition via the fluid flow interpretation of a vector field. My search for existing tools turned up nothing dynamic, and the closest thing I could find was an animation in a [Khan Academy video about curl](https://www.khanacademy.org/math/multivariable-calculus/multivariable-derivatives/curl-grant-videos/v/2d-curl-intuition). (I should mention that this video's presenter is the same fellow doing the [3Blue1Brown](https://www.youtube.com/chaannel/UCYO_jab_esuFRV4b17AJtAw) videos that provide amazing visual explanations and intuition for quite abstract mathematical concepts.)
I required more options and control, so this project was born.

## Demo

[https://mbwatson.github.io/vectorField](https://mbwatson.github.io/vectorField)

## Features

The view is of the square [-5,5]x[-5,5] in the xy-plane.

### Buttons

There are several buttons, whose functions are rather inutiive, but they allow you to...
* Starts and stops animation
* Empty the particle system of its particles
* Reset to particle system with particles at regularly spaced intervals on the plane
* Show/hide particle system (they are still moving if unpaused, just invisible)
* Show/hide vectors
* Show/hide coordinate Axes
* Show/hide the grid lines

## Mouse Control

With the mouse, you can add new particles to the particle system by clicking and dragging on the plane.

In addition, you can change the animation speed by scrolling over the plane.

## Preset Vector Functions

Particles on the two-dimensional surface animate according to the forces imposed on them from the current vector field. This vector field can be changed, but only to a handful of preset ones as of this writing.

## Todo List

* Use MathQuill to sllow users to enter their own vector functions.
* Change viewport of the plane to investigate other portions of the vector field.
