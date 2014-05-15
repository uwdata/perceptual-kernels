Learning Perceptual Kernels for 
===============================
Visualization Design
====================

This repo contains the results and source code from our crowdsourced experiments to estimate
kernels for color, shape, size and combinations thereof.
Here are the visual variables used in our study. 

<img width="512" align="middle" src=https://github.com/uwdata/perceptual-kernels/blob/master/doc/imgs/allpalettes.svg?raw=true>

We estimated the kernels for each of these palettes using five different judgment types to better understand the different trade-offs in estimating perceptual kernels. These judgment tasks are: 
+ Pairwise rating on 5-Point Scale (L5)
+ Pairwise rating on 9-Point scale (L9)
+ Triplet ranking with matching (Tm) 
+ Triplet ranking with discrimination (Td) 
+ Spatial arrangement (SA)


How to use the data and source code in this repo? 
------------------------------------------------
There are several ways to do that. 

First, you can take a look and use 
the final perceptual kernels obtained for your own purposes, 
research or otherwise. You will see thirty kernels in  data/ folder. 
These are symmetric, normalized matrices, stored as comma-seperated text files. 
File names indicate the variable and judgment task types used. For example, color-sa.txt 
is the perceptual kernel for the color palette and was obtained using  spatial arragement. 

Second, you can reproduce and extend our experiments using the source code provided. 
Or you can just copy them to bootstrap your own new experiments. Each experiment is designed to 
be as self-contained as possible. For example, if you would like to see the experiment 
setup produced color-sa.txt, you can go to exp/color/sa/ directory. 


What is a perceptual kernel?
----------------------------
Visualization design benefits from careful consideration of perception,
as different assignments of visual encoding variables such as color, shape and size
affect how viewers interpret data. One important question is  how to engineer
 these perceptual considerations into visualization design in a systematic way. In this
 work, we introduce perceptual kernels: distance matrices derived from aggregate
 perceptual judgments. Perceptual kernels represent perceptual differences between and
within visual variables in a reusable form that is directly applicable to
visualization evaluation and automated design.

<p>Here is an example of a perceptual kernel:</p>
![](https://github.com/uwdata/perceptual-kernels/blob/master/doc/imgs/tmshape.png?raw=true)
<p>(Left) A crowd-estimated perceptual kernel for a shape palette. (Right) A two-dimensional projection of the palette shapes obtained via multidimensional scaling of the perceptual kernel.

What is it useful for? 
----------------------

