Learning Perceptual Kernels for Visualization Design
====================================================

This repo contains the results and source code from our crowdsourced experiments to estimate
kernels for color, shape, size and combinations thereof.
Here are the visual variables used in our study. 
![](https://github.com/uwdata/perceptual-kernels/blob/master/doc/imgs/png?raw=true)
We estimated the kernels for each of these palettes  
using five different judgment types to better understand the different trade-offs 
in estimating perceptual kernels.  
+ Pairwise rating on 5-Point Scale (L5)
+ Pairwise rating on 9-Point scale (L9)
+ Triplet ranking with matching (Tm) 
+ Triplet ranking with discrimination (Td) 
+ Spatial arrangement (SA)


How to use the data and source code in this repo? 
------------------------------------------------




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

