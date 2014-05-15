perceptual-kernels
==================

Data and source code for the first phase of the perceptual kernels study.

Visualization design benefits from careful consideration of perception,
as different assignments of visual encoding variables such as color, shape and size
affect how viewers interpret data. One important question is  how to engineer
 perceptual considerations into visualization design in a systematic way. In this
 work, we introduce perceptual kernels: distance matrices derived from aggregate
 perceptual judgments. Perceptual kernels represent perceptual differences between and
within visual variables in a reusable form that is directly applicable to
visualization evaluation and automated design.

<p>Here is an example of a perceptual kernel:</p>
![](https://github.com/uwdata/perceptual-kernels/blob/master/doc/imgs/tmshape.png?raw=true)
<p>(Left) A crowd-estimated perceptual kernel for a shape palette. (Right) A two-dimensional projection of the palette shapes obtained via multidimensional scaling of the perceptual kernel.

This repo contains the results from our crowdsourced experiments to estimate
kernels for color, shape, size and combinations thereof. We estimated these kernels
using five different judgment types — including Likert ratings among pairs, ordinal
triplet comparisons, and manual spatial arrangement.

