Learning Perceptual Kernels for</br> Visualization Design
===================================================

This repo contains the results and source code from our crowdsourced experiments to estimate
perceptual kernels for color, shape, size and combinations thereof. What is a perceptual kernel? 
It is a distance matrix derived from aggregate perceptual judgments. In its basic form, a perceptual kernel 
contains pairwise perceptual dissimilarity values for a specific set of perceptual stimuli---we refer 
to this set as a palette. In our study, we estimate perceptual kernels for the following six palettes. 

<img width="600" align="middle" src=https://rawgit.com/uwdata/perceptual-kernels/master/doc/imgs/allpalettes.svg>

There can be several alternative ways for experimentally constructing perceptual kernels. 
For example, we construct perceptual kernels from subjective similarity judgments. 
Psychology literature offers several task types for these judgments. 
How to choose one then? What is the most effective judgment task in the context of perceptual 
kernels? So, understanding the trade-offs between different designs of judgment tasks is important. 
We estimate five perceptual kernels for each of the palettes above using the five different 
judgment tasks below---links show the task interfaces of the shape palette (refresh your page if you see a garbled image). 
+ [Pairwise rating on 5-Point Scale (L5)](https://rawgit.com/uwdata/perceptual-kernels/master/exp/shape/l5/shape-l5.html)
+ [Pairwise rating on 9-Point scale (L9)](https://rawgit.com/uwdata/perceptual-kernels/master/exp/shape/l9/shape-l9.html)
+ [Triplet ranking with matching (Tm)](https://rawgit.com/uwdata/perceptual-kernels/master/exp/shape/tm/shape-tm.html)
+ [Triplet ranking with discrimination (Td)](https://rawgit.com/uwdata/perceptual-kernels/master/exp/shape/td/shape-td.html)
+ [Spatial arrangement (SA)](https://rawgit.com/uwdata/perceptual-kernels/master/exp/shape/sa/shape-sa.html)


How to use the data and source code in this repo? 
------------------------------------------------
There are several ways to use the data and source code provided here. 
To start, get a local copy of the directory structure, either using git 
commands  or by downloading and uncompressing the [zipped repo](https://github.com/uwdata/perceptual-kernels/archive/master.zip).  

<h3> Accessing the data </h3> 
You can  directly access the final perceptual kernels and use them for your own purposes, 
research or otherwise. You will see thirty kernels in [data/kernels/](https://github.com/uwdata/perceptual-kernels/tree/master/data/kernels) folder. These are symmetric, normalized matrices stored as comma-seperated text files. File names denote the variable and judgment task types used. For example, [color-sa.txt](https://github.com/uwdata/perceptual-kernels/tree/master/data/kernels/color-sa.txt) is the perceptual kernel for the color palette and was obtained using the spatial arrangement (SA) 
task. The kernels under [data/kernels](data/kernels) are all filtered and  aggregated as discussed in our [draft](doc/perceptual-kernels.pdf?raw=true).  

You can also access the raw datasets in [data/raw](data/raw), which include unprocessed per-subject measurements. 
You can use the raw data, e.g., to perform your own custom data processing and agregation or, more interestingly, 
per-subject data analysis. 

<h3>Reproducing the experiments</h3> 
In addition to accessing the data, you can reproduce and extend our experiments using the source code 
provided. Each experiment is designed tobe as self-contained as possible. For example, if you would like to see the experiment setup produced [color-sa.txt](exp/color/sa/color-sa.txt), you can go to [exp/color/sa/](https://github.com/uwdata/perceptual-kernels/tree/master/exp/color/sa) directory. You can check 
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
remember to remove the http keyword from the url address---see [color-sa.question](/exp/color/sa/color-sa.question) for an example. Make sure that the .js and .css files that [color-sa.html](exp/color/sa/color-sa.html) uses are also publicly accessible, either on your web server or somewhere else on the web.
Assuming you have set up your Amazon Mechanical Turk account properly, you are now ready to upload the task  
by running the script `runSandbox.sh`. This will try to  upload the task on Amazon Mechanical Turk's sandbox 
site and, if successful, will create a file called `color-sa.success`.  Note that `runSandbox.sh` calls [`$MTURKCLT_HOME/bin/loadHITs.sh`](http://docs.aws.amazon.com/AWSMechTurk/latest/AWSMturkCLT/CLTReference_LoadHITsCommand.html) with `-sandbox` argument. If you're ready to use the production site, you should run  `runProduction.sh`, while making sure `service_url` in `$MTURKCLT_HOME/bin/mturk.properties` is set to the Amazon Mechanical Turk's production site.



What is a perceptual kernel?
----------------------------
Perceptual kernels are distance matrices derived from aggregate perceptual similarity judgments. 
Here is an example of a perceptual kernel:

![](https://rawgit.com/uwdata/perceptual-kernels/master/doc/imgs/tmshape.png?raw=true)
<p>(Left) A crowd-estimated perceptual kernel for a shape palette. Darker entries indicate 
perceptually closer (similar) shapes. (Right) A two-dimensional projection of the palette 
shapes obtained via [multidimensional scaling](http://en.wikipedia.org/wiki/Multidimensional_scaling) of the perceptual kernel. 

What is it useful for? 
----------------------
Visualization design benefits from careful consideration of perception,
as different assignments of visual encoding variables such as color, shape and size
affect how viewers interpret data. Perceptual kernels represent perceptual differences between and
within visual variables in a reusable form that is directly applicable to
visualization evaluation and automated design. In other words, perceptual kernels 
provide a useful operational model for incorporating empirical perception data directly 
into visualization design tools.  Please refer to our [draft on perceptual kernels](https://rawgit.com/uwdata/perceptual-kernels/master/doc/perceptual-kernels.pdf) 
for further details. 

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

You may also want to check out [this illustration](http://uwdata.github.io/perceptual-kernels/#reorder-demo)
---note that we cannot run js code from this page directly.  

<h3> Visual embedding </h3> 

Perceptual kernels can also guide [visual embedding](http://vis.stanford.edu/papers/visual-embedding) to choose encodings that preserve data-space distance metrics in terms of kernel-defined perceptual distances. To perform discrete embeddings, we find the optimal distance-preserving assignment of palette items to data points. 
The following scatter plot  compares color distance measures. 

<img width="400" src=https://rawgit.com/uwdata/perceptual-kernels/master/doc/imgs/modelprojs.svg?raw=true>

The plotting symbols were chosen automatically using visual embedding. We use the correlation matrix of the 
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

In a second example, we use visual embedding to encode community clusters in a character co-occurrence graph derived from [Victor Hugo](http://en.wikipedia.org/wiki/Victor_Hugo)’s novel [Les Miserables](http://en.wikipedia.org/wiki/Les_Miserables). Cluster memberships were computed using a standard modularity-based community-detection algorithm (see [15]). For the data space distances, we count all inter-cluster edges and then normalize by the theoretically maximal number of edges between groups. To provide more dynamic range, we re-scale these normalized values to the range [0.2,0.8]. Clusters that share no connecting edges are given a maximal distance of 1. We then perform separate visual embeddings using univariate color and shape kernels (both estimated using triplet matching). As shown in the following figure, the assigned colors and shapes perceptually reflect the inter-cluster relations.

<img width="400" src=https://rawgit.com/uwdata/perceptual-kernels/master/doc/imgs/lm.svg?raw=true>
