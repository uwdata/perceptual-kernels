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



function ReorderAnim(el, palette, order)
{
    this.s_ = palette.scale;
    this.p_ = palette;
    this.o_ = order;
    this.svg = null;
    this.run = null;
    this.data_ = [];
    this.init(el);

}

ReorderAnim.prototype.init = function(el)
{
    var data = this.initdata(), this_ = this;

    //draw the shape palette first
    this.run_ = d3.select(el).append('button')
        .attr('type', 'button')
        .attr('class', 'btn btn-primary btn-sm')
        .text('run')
        .on('click',function(){
            var b = d3.select(this);
            if (b.text() === 'reset') {
                this_.update(this_.initdata()); // reset
                b.text('run');
            }else {
                b[0][0].disabled = true;
                this_.animate(this_.data_, 0);
            }});

    this.svg_ = d3.select(el).append('svg');
    this.static(data);
    this.update(data);
};


ReorderAnim.prototype.initdata = function(){


    var n = this.p_.size,
        data = this.data_,
        s = this.s_,
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
};

function xform(t,s) {
    return ['translate(', t.x, ',', t.y, ') ', 'scale(', s.x, ')'].join('');
}

function appendStim(d,i) {
    var g = d3.select(this),
        draw = g.attr('drawfn'),
        s = window[draw](g,i);
    d.s = s;
    return s;
}

ReorderAnim.prototype.static = function(){

    var s = this.s_,
        draw = this.p_.draw,
        svg =  this.svg_,
        data = this.data_,
        stim = svg.selectAll('.stim-static')
            .data(data)
            .enter()
            .append('g')
            .attr('transform', function(d){return xform(d,s);})
            .attr('class', 'stim-static')
            .attr('drawfn', draw)
            .each(appendStim);

            if(draw !== 'color10')
                stim.style('stroke', 'lightgray');
            else
                stim.select('rect').attr('rx',0.25).attr('ry',0.25);

};

ReorderAnim.prototype.update = function(data) {

    //bind
    var s = this.s_,
        draw = this.p_.draw,
        svg = this.svg_,
        stim = svg.selectAll('.stim')
            .data(data);

    //update
    stim.transition()
        .delay(function (d, i) {
            if (typeof(d.s) !== 'undefined' &&
                typeof(d.c) !== 'undefined' &&
                draw !== 'color10')
                d.s.transition().style('stroke', d.c);
        })
        .duration(1000)
        .attr('transform', function(d){ return xform(d,s); })
        .transition()
        .each(function (d, i) {
            if (typeof(d.s) !== 'undefined' &&
                draw !== 'color10')
                d.s.transition().style('stroke', 'black');
        });

    //create
    stim.enter()
        .append('g')
        .attr('transform',  function(d){ return xform(d,s);})
        .attr('class', 'stim')
        .attr('drawfn', draw)
        .each(appendStim);
            if(draw !== 'color10')
                stim.style('stroke', 'black');
};


ReorderAnim.prototype.animate  = function(data, i){

    var s = this.s_,
        o = this.o_,
        indx = o[i],
        this_ = this;

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

        this_.update(data);

        if (++i< o.length)
            this_.animate(data,i);
        else
            this_.run_.transition()
                .duration(500)
                .each('end',
                function(){
                    this.disabled = false;
                    d3.select(this).text('reset');
                });
    },  1000);


};

