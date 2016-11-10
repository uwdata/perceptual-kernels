Learning Perceptual Kernels for</br> Visualization Design
===================================================

This repo contains the results and source code from our crowdsourced experiments (see our [InfoVis'14 paper](http://cs.stanford.edu/~cagatay/projects/pk/PerceptualKernels-InfoVis14.pdf) for details) to estimate
perceptual kernels for color, shape, size and combinations thereof. What is a perceptual kernel? 
It is a distance matrix derived from aggregate perceptual judgments. In its basic form, a perceptual kernel 
contains pairwise perceptual dissimilarity values for a specific set of perceptual stimuli---we refer 
to this set as a palette. In our study, we estimate perceptual kernels for the following six palettes. 

<img width="600" align="middle" src=https://rawgit.com/uwdata/perceptual-kernels/master/doc/imgs/allpalettes.svg>

There can be several alternative ways for experimentally constructing perceptual kernels. 
For example, we construct perceptual kernels from subjective similarity judgments. 
Psychology literature offers several task types for these judgments. 
How to choose one? What is the most effective judgment task in the context of perceptual 
kernels? So, understanding the trade-offs between different designs of judgment tasks is important. 
We estimate five perceptual kernels for each of the palettes above using the five different 
judgment tasks: pairwise rating on a 5-point Likert scale (L5) and on a 9-point Likert scale (L9),  
triplet ranking with matching (Tm) and with discrimination (Td), and manual spatial arrangement (SA). 
You can run any of these experiments by following the links below. 
<h4>Experiments</h4> 
+ shape-[l5](http://uwdata.github.io/perceptual-kernels/exp/shape/l5/shape-l5.html),
[l9](http://uwdata.github.io/perceptual-kernels/exp/shape/l9/shape-l9.html),
[sa](http://uwdata.github.io/perceptual-kernels/exp/shape/sa/shape-sa.html),
[tm](http://uwdata.github.io/perceptual-kernels/exp/shape/tm/shape-tm.html),
[td](http://uwdata.github.io/perceptual-kernels/exp/shape/td/shape-td.html)
+ color-[l5](http://uwdata.github.io/perceptual-kernels/exp/color/l5/color-l5.html),
[l9](http://uwdata.github.io/perceptual-kernels/exp/color/l9/color-l9.html),
[sa](http://uwdata.github.io/perceptual-kernels/exp/color/sa/color-sa.html),
[tm](http://uwdata.github.io/perceptual-kernels/exp/color/tm/color-tm.html),
[td](http://uwdata.github.io/perceptual-kernels/exp/color/td/color-td.html)
+ size-[l5](http://uwdata.github.io/perceptual-kernels/exp/size/l5/size-l5.html),
[l9](http://uwdata.github.io/perceptual-kernels/exp/size/l9/size-l9.html),
[sa](http://uwdata.github.io/perceptual-kernels/exp/size/sa/size-sa.html),
[tm](http://uwdata.github.io/perceptual-kernels/exp/size/tm/size-tm.html),
[td](http://uwdata.github.io/perceptual-kernels/exp/size/td/size-td.html)
+ shapecolor-[l5](http://uwdata.github.io/perceptual-kernels/exp/shapecolor/l5/shapecolor-l5.html),
[l9](http://uwdata.github.io/perceptual-kernels/exp/shapecolor/l9/shapecolor-l9.html),
[sa](http://uwdata.github.io/perceptual-kernels/exp/shapecolor/sa/shapecolor-sa.html),
[tm](http://uwdata.github.io/perceptual-kernels/exp/shapecolor/tm/shapecolor-tm.html),
[td](http://uwdata.github.io/perceptual-kernels/exp/shapecolor/td/shapecolor-td.html)
+ shapesize-[l5](http://uwdata.github.io/perceptual-kernels/exp/shapesize/l5/shapesize-l5.html),
[l9](http://uwdata.github.io/perceptual-kernels/exp/shapesize/l9/shapesize-l9.html),
[sa](http://uwdata.github.io/perceptual-kernels/exp/shapesize/sa/shapesize-sa.html),
[tm](http://uwdata.github.io/perceptual-kernels/exp/shapesize/tm/shapesize-tm.html),
[td](http://uwdata.github.io/perceptual-kernels/exp/sahpesize/td/shapesize-td.html)
+ sizecolor-[l5](http://uwdata.github.io/perceptual-kernels/exp/sizecolor/l5/sizecolor-l5.html),
[l9](http://uwdata.github.io/perceptual-kernels/exp/sizecolor/l9/sizecolor-l9.html),
[sa](http://uwdata.github.io/perceptual-kernels/exp/sizecolor/sa/sizecolor-sa.html),
[tm](http://uwdata.github.io/perceptual-kernels/exp/sizecolor/tm/sizecolor-tm.html),
[td](http://uwdata.github.io/perceptual-kernels/exp/sizecolor/td/sizecolor-td.html)


How to use the data and source code in this repo? 
------------------------------------------------
There are several ways to use the data and source code provided here. 
To start, get a local copy of the directory structure, either using git 
commands  or by downloading and uncompressing the [zipped repo](https://github.com/uwdata/perceptual-kernels/archive/master.zip).  

<h3> Accessing the data </h3> 
You can  directly access the final perceptual kernels and use them for your own purposes, 
research or otherwise. You will see thirty kernels in [data/kernels/](https://github.com/uwdata/perceptual-kernels/tree/master/data/kernels) folder. These are symmetric, normalized matrices stored as comma-seperated text files. File names denote the variable and judgment task types used. For example, [color-sa.txt](https://github.com/uwdata/perceptual-kernels/tree/master/data/kernels/color-sa.txt) is a perceptual kernel for the color palette that was elicited using spatial arrangement (SA). The kernels under [data/kernels](data/kernels) are all filtered and  aggregated as discussed in our [paper](http://cs.stanford.edu/~cagatay/projects/pk/PerceptualKernels-InfoVis14.pdf).  

You can also access the raw datasets in [data/raw](data/raw), which include unprocessed per-subject measurements. 
You can use the raw data, e.g., to perform your own custom data processing and agregation or, more interestingly, 
per-subject data analysis. 

<h3>Viewing the kernels</h3>
<h4>On the web</h4> 
By clicking the corresponding links below, you can visualize any kernel in our dataset. Resulting [views](#ss1) will be identical to  the [views](#ss1) generated by running  `view/showkernel.js` locally. 
+ shape-[l5](http://uwdata.github.io/perceptual-kernels/view/shape-l5.html),
[l9](http://uwdata.github.io/perceptual-kernels/view/shape-l9.html),
[sa](http://uwdata.github.io/perceptual-kernels/view/shape-sa.html),
[tm](http://uwdata.github.io/perceptual-kernels/view/shape-tm.html),
[td](http://uwdata.github.io/perceptual-kernels/view/shape-td.html)
+ color-[l5](http://uwdata.github.io/perceptual-kernels/view/color-l5.html),
[l9](http://uwdata.github.io/perceptual-kernels/view/color-l9.html),
[sa](http://uwdata.github.io/perceptual-kernels/view/color-sa.html),
[tm](http://uwdata.github.io/perceptual-kernels/view/color-tm.html),
[td](http://uwdata.github.io/perceptual-kernels/view/color-td.html)
+ size-[l5](http://uwdata.github.io/perceptual-kernels/view/size-l5.html),
[l9](http://uwdata.github.io/perceptual-kernels/view/size-l9.html),
[sa](http://uwdata.github.io/perceptual-kernels/view/size-sa.html),
[tm](http://uwdata.github.io/perceptual-kernels/view/size-tm.html),
[td](http://uwdata.github.io/perceptual-kernels/view/size-td.html)
+ shapecolor-[l5](http://uwdata.github.io/perceptual-kernels/view/shapecolor-l5.html),
[l9](http://uwdata.github.io/perceptual-kernels/view/shapecolor-l9.html),
[sa](http://uwdata.github.io/perceptual-kernels/view/shapecolor-sa.html),
[tm](http://uwdata.github.io/perceptual-kernels/view/shapecolor-tm.html),
[td](http://uwdata.github.io/perceptual-kernels/view/shapecolor-td.html)
+ shapesize-[l5](http://uwdata.github.io/perceptual-kernels/view/shapesize-l5.html),
[l9](http://uwdata.github.io/perceptual-kernels/view/shapesize-l9.html),
[sa](http://uwdata.github.io/perceptual-kernels/view/shapesize-sa.html),
[tm](http://uwdata.github.io/perceptual-kernels/view/shapesize-tm.html),
[td](http://uwdata.github.io/perceptual-kernels/view/shapesize-td.html)
+ sizecolor-[l5](http://uwdata.github.io/perceptual-kernels/view/sizecolor-l5.html),
[l9](http://uwdata.github.io/perceptual-kernels/view/sizecolor-l9.html),
[sa](http://uwdata.github.io/perceptual-kernels/view/sizecolor-sa.html),
[tm](http://uwdata.github.io/perceptual-kernels/view/sizecolor-tm.html),
[td](http://uwdata.github.io/perceptual-kernels/view/sizecolor-td.html)

<h4>Locally </h4>
First, you will need to install  [node.js](http://nodejs.org) and the node modules for express.js and d3.js (pretty easy with [npm](https://www.npmjs.org/), a package manager for node.js; for example, `npm install d3` will install 
the d3 module for you). The kernels in [data/kernels](data/kernels) can be then viewed as interactive grayscale heatmaps and two-dimensional scatter plots by running [view/showkernel.js](view/showkernel.js) from the command line. For example, 
```shell
./showkernel.js  color-tm
```
will draw the corresponding color kernel as a grayscale heatmap in your default browser along with a two-dimensional projection of the kernel, where in-plane distances between the colors approximate the perceptual distances of the kernel.  We obtain the projection points with [multidimensional scaling](http://en.wikipedia.org/wiki/Multidimensional_scaling) on the perceptual kernel. 

<a name="ss1"></a><img width="512" src=https://rawgit.com/uwdata/perceptual-kernels/master/doc/imgs/viewexample.png?raw=true>

<img width="512" style="float:left" src=https://rawgit.com/uwdata/perceptual-kernels/master/doc/imgs/viewexample2.png?raw=true>

Hovering over a cell of the heatmap will show the corresponding perceptual kernel distance in a tooltip. Similarly, hovering over a projection point will isolate the corresponding row and column in the heatmap. The two bars under the projection scatter plot  show the overall and per-row (or column) rank correlations between the perceptual kernel and the distance matrix directly derived from the planar projection. They are there to give you an idea about the accuracy of the projection with respect to the kernel distances as two-dimensional projections are lossy representations in general. 


<h3>Reproducing the experiments</h3> 
In addition to accessing the data, you can reproduce and extend our experiments using the source code 
provided. Each experiment is designed to be as self-contained as possible. For example, if you would like to see the experiment setup produced [color-sa.txt](exp/color/sa/color-sa.txt), you can go to [exp/color/sa/](https://github.com/uwdata/perceptual-kernels/tree/master/exp/color/sa) directory. You can check 
out the task interface  by opening  [color-sa.html](https://github.com/uwdata/perceptual-kernels/tree/master/exp/color/sa/color-sa.html) in your browser. We recommend you go through and complete the task to understand what it entails. If you want to reproduce this experiment (or other experiments in [exp/](exp/), for that matter), you need to 
first install  [Amazon Mechanical Turk Command Line Tools](https://aws.amazon.com/developertools/Amazon-Mechanical-Turk/694) and then set two environment variables: MTURKCLT_HOME, which should point the installation directory for Amazon's command line tools,  and STUDY_HOME , which should point your local perceptual-kernels directory. Now, take a look at [color-sa.properties](exp/color/sa/color-sa.properties), which contains the properties of the experiment, from its summary description to the number and qualifications of subjects (Turkers)  requested. Since the goal is to repeat the experiment, you don't need to edit this file but make sure you understand its contents. You will need, 
however, to edit the files  [color-sa.html](exp/color/sa/color-sa.html) and [color-sa.question](exp/color/sa/color-sa.question). 

In order to run the experiment in a test mode on Amazon's Mechanical Turk sandbox, uncomment the following line in [color-sa.html](exp/color/sa/color-sa.html)
```html
<form id="form" autocomplete="off" method="POST" action="https://workersandbox.mturk.com/mturk/externalSubmit">
```
and make sure the next line 
```html
<form id="form" autocomplete="off" method="POST" action="https://www.mturk.com/mturk/externalSubmit">
```
is commented out. Of course, you shouldn't do this if you want to use the production site. 

[color-sa.html](exp/color/sa/color-sa.html) implements the task as a dynamic single page web application. 
Next step is to make it publicly available so that Turkers can access it embedded in an iframe 
on Amazon's site. Copy [color-sa.html](exp/color/sa/color-sa.html) (with its dependencies) 
somewhere on your web server and provide its url address within `<ExternalURL></ExternalURL>` tags in [color-sa.question](exp/color/sa/color-sa.question). If you are  using an http server (as opposed to https), 
remember to remove the http keyword from the url address---see [color-sa.question](/exp/color/sa/color-sa.question) for an example. Make sure that the .js and .css files that [color-sa.html](exp/color/sa/color-sa.html) uses are also publicly accessible, either on your web server or somewhere else on the web. Assuming you have set up your Amazon Mechanical Turk account properly, you are now ready to upload the task by running the script [`runSandbox.sh`](exp/color/sa/runSandbox.sh). This will try to  upload the task on Amazon Mechanical Turk's sandbox  site and, if successful, will create a file called `color-sa.success`.  Note that [`runSandbox.sh`](exp/color/sa/runSandbox.sh) calls [`$MTURKCLT_HOME/bin/loadHITs.sh`](http://docs.aws.amazon.com/AWSMechTurk/latest/AWSMturkCLT/CLTReference_LoadHITsCommand.html) with `-sandbox` argument. If you're ready to use the production site, you should run  [`runProduction.sh`](exp/color/sa/runProduction.sh), while making sure `service_url` in `$MTURKCLT_HOME/bin/mturk.properties` is set to the Amazon Mechanical Turk's production site.

How to get a perceptual kernel from raw triplet judgments? 
----------------------------------------------------------
Subject judgments from triplet experiments are stored in `data/raw/*-{tm,td}.txt` files. For example, [`data/raw/color-tm.txt`](data/raw/color-tm.txt) contains the rank-ordered triplets for the color palette.  Each raw triplet file has **20** lines (rows) of **M** comma-separated indices. Each line corresponds to a single subject's sequentially-listed **M/3** triplet judgments. **M** equals **414** for univariate palettes and **1782** for bivariate. A triplet in our case is a set of ordered indices i, j, k of the respective palette elements x<sub>i</sub>, x<sub>j</sub>, and x<sub>k</sub>, where the subject indicated that  x<sub>i</sub> is more similar to x<sub>j</sub> than it is to x<sub>k</sub>.  In other words,  _perceptual_distance(x<sub>i</sub>, x<sub>j</sub>) < perceptual_distance(x<sub>i</sub>, x<sub>k</sub>)_ for the subject.

We derive a perceptual kernel from these triplet orderings through generalized non-metric multidimensional scaling. 
You can simply use the Matlab functions in [`shared/matlab/`](shared/matlab/) to turn triplet judgments of multiple subjects into an aggregated, normalized distance matrix of perceptual dissimilarities (i.e., perceptual kernel). 

For example,  running  `K = rawTripletToKernel('../data/raw/color-tm.txt')` from  Matlab command line in [`shared/matlab/`](shared/matlab) would compute a perceptual kernel for the color palette using the triplet matching judgments of **20** subjects stored in `data/raw/color-tm.txt`. 


What is a perceptual kernel?
----------------------------
Perceptual kernels are distance matrices derived from aggregate perceptual similarity judgments. 
Here is an example of a perceptual kernel:

![https://rawgit.com/uwdata/perceptual-kernels/master/doc/imgs/tmshape.png?raw=true](http://uwdata.github.io/perceptual-kernels/view/shape-tm.html)
<p>(Left) A crowd-estimated perceptual kernel for a shape palette. Darker entries indicate 
perceptually closer (similar) shapes. (Right) A two-dimensional projection of the palette 
shapes obtained via [multidimensional scaling](http://en.wikipedia.org/wiki/Multidimensional_scaling) 
of the perceptual kernel. 

What is it useful for? 
----------------------
Visualization design benefits from careful consideration of perception,
as different assignments of visual encoding variables such as color, shape and size
affect how viewers interpret data. Perceptual kernels represent perceptual differences between and
within visual variables in a reusable form that is directly applicable to
visualization evaluation and automated design. In other words, perceptual kernels 
provide a useful operational model for incorporating empirical perception data directly 
into visualization design tools.  

Here are few examples of how the kernels can be used. 

<h3> Automatically designing new palettes</h3> 

Given an estimated perceptual kernel, we can use it to revisit existing palettes. 
For example, we can choose a set of stimuli that maximizes perceptual distance or 
conversely minimizes perceptual similarity according to the kernel.
The following shows the n most discriminable subsets of the shape, size, and color variables. 
(We include size for completeness,  though in practice this palette is better suited to quantitative, 
rather than categorical, data.)  To compute a subset with n elements, we first initialize the set with 
the variable pair that  has the highest perceptual distance. We then add new elements to this set, by finding the variable 
whose minimum distance to the existing subset is the maximum (i.e., the  [Hausdorff distance](http://en.wikipedia.org/wiki/Hausdorff_distance) between two point sets).

<img width="600"src=https://rawgit.com/uwdata/perceptual-kernels/master/doc/imgs/tmnewpalette.svg?raw=true>
 

<h3><a href="http://github.com/uwdata/visual-embedding">Visual embedding</a></h3>

Perceptual kernels can also guide [visual embedding](http://github.com/uwdata/visual-embedding) to choose encodings that preserve data-space distance metrics in terms of kernel-defined perceptual distances. To perform discrete embeddings, we find the optimal distance-preserving assignment of palette items to data points. 
The following scatter plot compares color distance measures. 

<img width="400" src=https://rawgit.com/uwdata/perceptual-kernels/master/doc/imgs/modelprojs.svg?raw=true>

The plotting symbols were chosen automatically using [visual embedding](http://github.com/uwdata/visual-embedding). We use the correlation matrix of the 
color models below  as the distances in the data domain, and the triplet matching (Tm) kernel for the shape palette as the distances in the perceptual range. 


|             | Kernel (Tm) | CIELAB | CIEDE2000 | Color Name |
|-------------|:-------------:|:--------:|:-----------:|:------------:|
| **Kernel (Tm)** | 1.00        | 0.67   | 0.59      | 0.75       |
| **CIELAB**      | 0.67        | 1.00   | 0.87      | 0.81       |
| **CIEDE2000**   | 0.59        | 0.87   | 1.00      | 0.77       |
| **Color Name**  | 0.75        | 0.81   | 0.77      | 1.00       |
<h4>Rank correlations between a crowd-estimated perceptual-kernel of the <br>
color palette and the kernels derived from the existing color distance models for <br>
the same palette. Higher values indicate more similar kernels.</h4>

This automatic assignment reflects the correlations between the variables. The correlation between [CIELAB](http://en.wikipedia.org/wiki/Lab_color_space) and [CIEDE2000](http://en.wikipedia.org/wiki/Color_difference#CIEDE2000) is higher than the correlation between the triplet matching kernel and color names, and the assigned shapes reflect this relationship perceptually. For example, the perceptual distance between upward- and downward-pointing triangles is smaller than the perceptual distance between circle and square.

In a second example, we use [visual embedding](http://github.com/uwdata/visual-embedding) to encode community clusters in a character co-occurrence graph derived from [Victor Hugo](http://en.wikipedia.org/wiki/Victor_Hugo)’s novel [Les Miserables](http://en.wikipedia.org/wiki/Les_Miserables). Cluster memberships were computed using a standard modularity-based community-detection algorithm. For the data space distances, we count all inter-cluster edges and then normalize by the theoretically maximal number of edges between groups. To provide more dynamic range, we re-scale these normalized values to the range [0.2,0.8]. Clusters that share no connecting edges are given a maximal distance of 1. We then perform separate [visual embeddings](http://github.com/uwdata/visual-embedding) using univariate color and shape kernels (both estimated using triplet matching). As shown in the following figure, the assigned colors and shapes perceptually reflect the inter-cluster relations.

<img width="400" src=https://rawgit.com/uwdata/perceptual-kernels/master/doc/imgs/lm.svg?raw=true>
