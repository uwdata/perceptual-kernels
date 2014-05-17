/*
 *
 * File  : reorder.js
 * Author: Cagatay Demiralp (cagatay)
 * Desc  : 
 *
 *
 * Date    : Sat May 17 16:04:21 2014
 * Modified: $Id$
 *
 */

function reorder(el, palette, neworder){

   //draw the shape palette first
   var n = palette.size,
      svg = d3.select(el).append('svg');

   svg.selectAll('.stim')
       .data(d3.range(n))
       .enter()
       .append('g',function(d,i){
           var g = d3.select(this);
           pallete.draw(g,d);});

}


