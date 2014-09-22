/*
 *
 * File  : drawkernel.js
 * Author: Cagatay Demiralp (cagatay)
 * Desc  : Draws a given kernel.
 *
 * Date    :Mon Mar 31 00:15:43 PDT 2014
 * Modified: $Id$
 *
 */

function drawKernel(el,kernel){

    var prefix = './',
        fn = prefix + kernel.filename,
//        base = kernel.filename.split('.')[0],
        mds  = prefix + 'mds.txt',
        mdserr = prefix + 'mds-err.txt';

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

        d3.text(mds, function(coords){
            var xy = coords.trim().split('\n')
                    .map(function (data) {
                        return data.split(',');
                    })
                    .map(function (data) {
                        return data.map(function (data) {
                            return (+data);
                        })
                    }),
                n = xy.length,
                cp = { //custom properties
                    width: kernel.width,
                    height: kernel.height,
                    scale: {x:18, y:18},
                    drawfn: kernel.drawfn,
                    margin: {top: 50, left:50, bottom:25, right:25},
                    k: {x:'0', y:'1'}
                },
                scatter = new Scatter(el, xy, cp);

                scatter.interaction('hover',
                function(d,i){ //on
                    kernelmap.highlight([{i0:i, i1:i, j0:0, j1:n}, {i0:0, i1:n, j0:i, j1:i}]);
                },
                function(){//off
                    kernelmap.removeHighlight();
                });

            d3.text(mdserr, function(errdata) {

                var d = errdata.trim().split('\n')
                        .map(function (data) {
                            return (+data);
                        }),
                    cp1 = { //custom properties
                        width: 300,
                        height: 16,
                        position: {top:kernel.height,left:kernel.width+(cp.width-300)*0.5},
                        fill: 'lightgray'
                    },
                errbarbg = new Bar(el, [1.0, 1.0], cp1),
                    cp2 = { // custom properties
                        width: 300,
                        height: 16,
                        position:cp1.position,
//                        fill:function(d,i){return i ? palettes.tableau10[2]:'green';
                        fill:function(d,i){return i ? palettes.tableau10[2]:'black';
                        }

                    },
                errbar = new Bar(el, [d[0], 0], cp2);

                scatter.interaction('hover', function(dd,i){
                     errbar.update([d[0], d[i+1]]);
                    },
                    function(dd,i){
                      errbar.update([d[0], 0]);
                      errbar.tooltipoff();
                    });
                scatter.on('hover');

                errbar.interaction('hover'); //use default interactions
                errbar.on('hover');
            } );
        });
    });
}

