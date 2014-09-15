/*
 *
 * File  : nodevis.js
 * Author: Cagatay Demiralp (cagatay)
 * Desc  : Scatter plot.
 *
 * Date    : Sat May  3 23:13:43 2014
 * Modified: $Id$
 *
 */

function Scatter(div, data, cp) {
    //init props
    this.init(div,cp);
    this.update(data, cp.k);
}

Scatter.prototype.init = function(div, cp){

    var dp = this.defaults(); // default properties
    this.p_ =  utils.merge(dp,cp); // left merged w/ user-defined props
    this.p_.color = d3.scale.category10();
    this.interacts_ = {};

    //create the root svg node
    this.svg_= d3.select(div)
        .append('svg')
        .attr('width',cp.width)
        .attr('height',cp.height);

};

Scatter.prototype.updateScale = function(data, key) {
    var k = key || this.p_.k,
        p = this.p_,
        rx= utils.minmax(data, k.x),
        ry= utils.minmax(data, k.y),
        ar = (rx[1]-rx[0])/(ry[1]-ry[0]),

        w = p.width -  (p.margin.right + p.margin.left),
        h = p.height - (p.margin.bottom + p.margin.top);

    w = ~~(ar<1?w*ar:w);
    h = ~~(ar>1?h/ar:h);

    p.axis.x = d3.scale.linear().domain(rx).range([p.margin.left, p.margin.left + w]);
    p.axis.y = d3.scale.linear().domain(ry).range([h + p.margin.top, p.margin.top]);

};

Scatter.prototype.update = function(data, key){

    var k = key || this.p_.k;

    this.updateScale(data,k);

    var p = this.p_,
        x = p.axis.x,
        y = p.axis.y,
        sx = p.scale.x,
        sy = p.scale.y,
        drawfn = p.drawfn,
        c = this.svg_.selectAll('.shape')
            .data(data); //join

    //update
    c.transition().duration(1000)
        .attr('transform', function(d){
            return 'translate('+x(d[k.x]) + ',' + y(d[k.y]) + ') ' +
                'scale(' + sx + ',' + sy + ')';
        })
        .style('opacity',1);

    c.enter()//create
        .append('g')
        .attr('class', 'shape')
        .attr('transform', function(d){
            return 'translate('+x(d[k.x]) + ',' + y(d[k.y]) + ') ' +
                'scale(' + sx + ',' + sy + ')';
        })
        .each(appendShape)
        .transition()
        .duration(1000)
        .style('opacity',1);

    c.exit() //delete
        .transition()
        .style('opacity',0.2)
        .remove();

    function appendShape(d,i){
        return drawfn(d3.select(this),i);
    }
};


Scatter.prototype.defaults = function(){
    return {
        width:128,
        height:128,
        margin: {top:8, bottom:8, left:8, right:8},
        axis:{x:null, y:null},
        scale:{x:18, y:18},
        drawfn:function(s){return s.append('circle').attr('r',7);},
        k:{x:'X', y:'Y'}
    };
};

Scatter.prototype.interaction = function(e, f, frevert){

    var interacts = this.interacts_;
    if(interacts[e] === undefined)  interacts[e]=[];
    interacts[e].push({on:f, off:frevert});

};


Scatter.prototype.on = function(e) {

    var shapes = this.svg_.selectAll('.shape'),
        interacts = this.interacts_,
        n = interacts['hover'].length;

    if (e === 'hover'){
        shapes.on('mouseover', function(d,i){
            for (var j=0; j<n; j++) interacts['hover'][j].on(d,i);
        })
            .on('mouseout', function(d,i){
                for (var j=0; j<n; j++) interacts['hover'][j].off(d,i);
            });
    }
};

