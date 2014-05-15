Learning Perceptual Kernels for Visualization Design
====================================================

This repo contains the results and source code from our crowdsourced experiments to estimate
kernels for color, shape, size and combinations thereof. We estimated these kernels
using five different judgment types — including Likert ratings among pairs, ordinal
triplet comparisons, and manual spatial arrangement.

how to use
==========

what is a perceptual kernel? 
===========================
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

what is it useful for? 
=====================

