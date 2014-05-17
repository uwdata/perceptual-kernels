Learning Perceptual Kernels for</br> Visualization Design
===================================================

This repo contains the results and source code from our crowdsourced experiments to estimate
perceptual kernels for color, shape, size and combinations thereof. What is a perceptual kernel? 
It is a distance matrix derived from aggregate perceptual judgments. In its basic form, a perceptual kernel 
contains pairwise perceptual dissimilarity values for a specific set of perceptual stimuli---we refer 
to this set as a palette. In our study, we estimate perceptual kernels for the following six palettes. 

<img width="512" align="middle" src=https://github.com/uwdata/perceptual-kernels/blob/master/doc/imgs/allpalettes.svg?raw=true>

There can be several alternative ways for experimentally constructing perceptual kernels. 
For example, we construct perceptual kernels from subjective similarity judgments. 
Psychology literature offers several task types for similarity judgments. 
How to choose one? What is the most effective judgment task in the context of perceptual 
kernels? So, understanding the trade-offs between different designs of judgment tasks is important. 
We estimate five perceptual kernels for each of the palettes above using the five different 
judgment tasks below---links show the task interfaces of the shape palette. 
+ [Pairwise rating on 5-Point Scale (L5)](https://rawgit.com/uwdata/perceptual-kernels/master/exp/shape/l5/shape-l5.html)
+ [Pairwise rating on 9-Point scale (L9)](https://rawgit.com/uwdata/perceptual-kernels/master/exp/shape/l9/shape-l9.html)
+ [Triplet ranking with matching (Tm)](https://rawgit.com/uwdata/perceptual-kernels/master/exp/shape/tm/shape-tm.html)
+ [Triplet ranking with discrimination (Td)](https://rawgit.com/uwdata/perceptual-kernels/master/exp/shape/td/shape-td.html)
+ [Spatial arrangement (SA)](https://rawgit.com/uwdata/perceptual-kernels/master/exp/shape/sa/shape-sa.html)


How to use the data and source code in this repo? 
------------------------------------------------
There are several ways to do that. 

First, you can  directly access the final perceptual kernels and use them for your own purposes, 
research or otherwise. You will see thirty kernels in [data/kernels/](https://github.com/uwdata/perceptual-kernels/tree/master/data/kernels) folder. These are symmetric, normalized matrices, stored as comma-seperated text files. File names reveal the variable and judgment task types used. For example, [color-sa.txt](https://github.com/uwdata/perceptual-kernels/tree/master/data/kernels/color-sa.txt) is the perceptual kernel for the color palette and was obtained using  spatial arragement. 

Second, you can reproduce and extend our experiments using the source code provided. 
Or you can just copy them to bootstrap your own new experiments. Each experiment is designed to 
be as self-contained as possible. For example, if you would like to see the experiment 
setup produced color-sa.txt, you can go to [exp/color/sa/](https://github.com/uwdata/perceptual-kernels/tree/master/exp/color/sa) directory. You can check 
out the task interface  by opening  [color-sa.html](https://github.com/uwdata/perceptual-kernels/tree/master/exp/color/sa/color-sa.html) in your browser. We recommend 
you go through and perform the task to understand what it does. 
If you want to reproduce this experiment (or other experiments in exp/, for that matter), you need to 
first install  [Amazon Mechanical Turk Command Line Tools](https://aws.amazon.com/developertools/Amazon-Mechanical-Turk/694) and then set two environment variables: MTURKCLT_HOME, which should point the installation directory for Amazon's command line tools,  and STUDY_HOME , which should be set to the current perceptual-kernels directory. 


What is a perceptual kernel?
----------------------------
Perceptual kernels are distance matrices derived from aggregate perceptual similarity judgments. 
Here is an example of a perceptual kernel:

![](https://github.com/uwdata/perceptual-kernels/blob/master/doc/imgs/tmshape.png?raw=true)
<p>(Left) A crowd-estimated perceptual kernel for a shape palette. Darker entries indicate 
perceptually closer (similar) shapes. (Right) A two-dimensional projection of the palette 
shapes obtained via multidimensional scaling of the perceptual kernel.

What is it useful for? 
----------------------
Visualization design benefits from careful consideration of perception,
as different assignments of visual encoding variables such as color, shape and size
affect how viewers interpret data. Perceptual kernels represent perceptual differences between and
within visual variables in a reusable form that is directly applicable to
visualization evaluation and automated design. In other words, perceptual kernels 
provide a useful operational model for incorporating empirical perception data directly 
into visualization design tools.  Please refer to our [draft on perceptual kernels](https://gitraw.com/uwdata/perceptual-kernels/master/doc/perceptual-kernels.pdf) for 
further details. 

