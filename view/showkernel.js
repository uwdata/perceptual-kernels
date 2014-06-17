#!/usr/bin/env node
/***
 *
 * File  : showkernel.js
 * Author: Cagatay Demiralp (cagatay)
 * Desc  : Visualizes a given perceptual kernel as a grayscale heatmap.
 *
 * Example: showkernel.js shape-l9
 *
 */

if (process.argv.length < 3 ) {
    console.log('Please provide the name of the kernel you would like to see!');
    console.log('Usage: showkernel.js <kernelname>')
    return;
}

var   tasks = ['l5', 'l9', 'sa', 'tm', 'td'],
     fndict = {shape:'{drawfn:shape10, width:425, height:425,',
        color:' {drawfn:color10, width:425, height:425,',
        size:' {drawfn:size10, width:425, height:425,',
        shapecolor:' {drawfn:shapeXcolor4, width:650, height:650,',
        shapesize:' {drawfn:shapeXsize4, width:650, height:650,',
        sizecolor:' {drawfn:sizeXcolor4, width:650, height:650,'},
    kernel = process.argv[2].split('-'),
    kerneldraw = fndict[kernel[0]],
    path = process.argv[2].trim() + '.txt';


if( kerneldraw === undefined  ||
    tasks.indexOf(kernel[1]) === -1){
    console.log('Unknown perceptual kernel!');
    return;
}else{
    kerneldraw = 'var kernel = ' +  kerneldraw +  ' filename:"' + path +'"};';
}

var express = require("express"),
    app = express(),
    open = require("open"),
    d3 = require("d3");

app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/../data/kernels/'));
app.use(express.static(__dirname + '/../data/kernels/mds/'));

var body = d3.select('body'),
    jsurls =['d3.v3.min.js', 'stim.js','drawkernel.js', 'heatmap.js', 'scatter.js', 'bar.js', 'utils.js'];

body.append('div')
    .attr('id', 'chart');

body.selectAll("script")
    .data(jsurls)
    .enter()
    .append("script")
    .attr('type', 'text/javascript')
    .attr('src',function(d){return d;});

var run = kerneldraw +'\n' +
    'drawKernel("#chart", kernel);';

body.append("script")
    .html(run);

app.use(function(req, res, next){
    res.send(body.node().innerHTML);
}).listen(8080);

open('http://localhost:8080/');

