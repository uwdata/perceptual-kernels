/*
 *
 * File  : drawkernel.js
 * Author: Cagatay Demiralp (cagatay)
 * Desc  : Draws a given kernel.  
 *
 * 	Example: Mon Mar 31 00:15:43 PDT 2014
 *
 * Date    :
 * Modified: $Id$
 *
 */

function drawKernel(el,kernel){

    var fn = kernel.filename;

    d3.text(fn, function(text) {
        var d = text.trim().split('\n')
            .map(function (data) {
                return data.split(',');
            })
            .map(function (data) {
                return data.map(function (data) {
                    return (+data);
                })
            });
        var kernelmap = heatmap(el)
            .width(kernel.width)
            .height(kernel.height)
            .drawfn(kernel.drawfn);

        kernelmap(d);
    });
}

