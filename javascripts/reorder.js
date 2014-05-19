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

    var s = palette.scale,
        svg_,
        run_;
    this.data_  = [];
    function initdata(){

        var n = palette.size,
            data = this.data_,
            x0 = 2*s.x,
            y0 = s.y * 0.75;
        for (var i = 0; i < n; i++) {
            if (typeof(data[i]) === 'undefined'){
                data[i] = {x: x0 + (2 * i * s.x), y: y0};
            }else {
                data[i].x = x0 + (2 * i * s.x);
                data[i].y = y0;
                data[i].c = 'black';
            }

        }
        data.lastx = 0;
        return data;
    }

    function init(){

        var data = initdata();

        //draw the shape palette first
        run_ = d3.select(el).append('button')
            .attr('type', 'button')
            .attr('class', 'btn btn-primary btn-sm')
            .text('run')
            .on('click',function(){
                var b = d3.select(this);
                if (b.text() === 'reset') {
                    update(initdata()); // reset
                    b.text('run');
                }else {
                    b[0][0].disabled = true;
                    animate(data, 0);
                } });
        svg_ = d3.select(el).append('svg');
        static(data);
        update(data);
    }

    function static(data){
        var stim =  svg_.selectAll('.stim-static')
            .data(data)
            .enter()
            .append('g')
            .attr('transform', xform)
            .attr('class', 'stim-static')
            .each(appendStim)
            .style('stroke', 'lightgray');
    }

    function update(data) {
        //bind
        var stim =  svg_.selectAll('.stim')
            .data(data);

        //update
        stim.transition()
            .delay(function(d,i){
                if (typeof(d.s) !== 'undefined' &&
                    typeof(d.s.c !== 'undefined'))
                    d.s.transition().style('stroke', d.c);
            })
            .duration(1000)
            .attr('transform', xform)
            .transition()
            .each(function(d,i){
                if (typeof(d.s) !== 'undefined')
                    d.s.transition().style('stroke','black');
            });

        //create
        stim.enter()
            .append('g')
            .attr('transform', xform)
            .attr('class', 'stim')
            .each(appendStim)
            .style('stroke','black');
    }

    function xform(d,i){
        return ['translate(', d.x, ',', d.y, ') ', 'scale(', s.x, ')'].join('');
    }

    function appendStim(d,i){
        var g = d3.select(this),
            s = palette.draw(g,i);
        s.attr("vector-effect","non-scaling-stroke")
            .style("fill", "none")
            .style("stroke-width", 2.5)
            .style("stroke-linecap", "round")
            .style("stroke-linejoin", "round");
        d.s = s;
        return s;
    }

    function animate(data, i){

        var indx = neworder[i];

        if (typeof(indx.length) !== 'undefined') {

            for (var j = 0; j < indx.length; j++) {
                data[indx[j]].y = 3 * s.y;
                data[indx[j]].x = data.lastx + 2*s.x;
                data.lastx = data[indx[j]].x;
                data[indx[j]].c = 'orangered';

            }
        }else{
            data[indx].y =  3 * s.y;
            data[indx].x = data.lastx + 2*s.x;
            data.lastx = data[indx].x;
            data[indx].c = 'orangered';
        }

        setTimeout(function(){
            update(data);
            if (++i< neworder.length)
                animate(data,i);
            else
                run_.transition()
                    .duration(500)
                    .each('end',
                    function(){
                        this.disabled = false;
                        d3.select(this).text('reset');
                    });
        },  1000);

    }

    init();
}

