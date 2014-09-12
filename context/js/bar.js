/*
 *
 * File  : bar.js
 * Author: Cagatay Demiralp (cagatay)
 * Desc  :
 *
 * 	Example:
 *
 * Date    : Tue May  6 11:36:22 2014
 * Modified: $Id$
 *
 */
function Bar(div, data, cp)
{

    this.init(div, data, cp);
    this.update(data);
}

// init properties etc.
Bar.prototype.init = function(div,data, cp){

    var dp = this.defaults(); // default properties
    this.p_ =  utils.merge(dp,cp);
    this.interacts_ = {};

    var p = this.p_;

    this.updateScale(data);

    this.svg_ = d3.select(div).append("svg")
        .attr("width", p.width)
        .attr("height", p.height)
        .style('position', 'absolute')
        .style('left', p.position.left)
        .style('top', p.position.top);

    this.tooltip_ = d3.select(div)
        .append('div')
        .attr('id','bartip')
        .style("position", "absolute")
        .style("white-space", "nowrap")
        .style("z-index", "10")
        .style("background-color","white")
        .style("border","1px solid #999")
        .style('border-radius','5px')
        .style("padding","1px")
        .style("font-size", "18px")
        .style("color", "gray")
        .style('opacity',0.0025)
        .style("font-family",'"Helvetica"')
        .style("-mox-box-shadow","2px 2px 11px #666")
        .style("-webkit-box-shadow","2px 2px 11px #666");

};


Bar.prototype.update = function(data) {

    this.updateScale(data);

    var p = this.p_,
        x = p.scale.x,
        y = p.scale.y,
        this_ = this;

    var maxBarHeight= y.rangeBand(),
        barHeight= maxBarHeight*0.75,
        barPadY = 0.5 * (maxBarHeight - barHeight);

    var b = this.svg_.selectAll(".bar")
        .data(data); //join

    b.attr("y", function(d,i) { return y(i)+barPadY; }) //update
        .attr("height", barHeight)
        .attr("x", p.margin.left)
        .style('fill', p.fill)
        .transition()
        .duration(500)
        .attr("width", function(d) {return x(d);})
        .each('end', function(d,i) {
            if(i === 1 && d>0)
            this_.tooltipon(d,i, {x:p.position.left + x(d), y:p.position.top + y(i)+5});
        });

    b.enter() //create
        .append("rect")
        .attr("class", "bar")
        .attr("y", function(d,i) { return y(i)+barPadY; })
        .attr("height", barHeight)
        .attr("x", p.margin.left)
        .style('fill', p.fill)
        .transition()
        .attr("width", function(d) {return x(d);});

    b.exit() // remove
        .transition()
        .style('opacity',0.2)
        .remove();
};


Bar.prototype.on = function(e) {

    var bars = this.svg_.selectAll('.bar'),
        interacts = this.interacts_,
        n =  interacts['hover'].length;

    if (e === 'hover') {
        bars.on('mouseover', function(d,i){
            for (var j=0; j<n; j++) interacts['hover'][j].on(d,i);
        })
            .on('mouseout', function(d,i){
            for (var j=0; j<n; j++) interacts['hover'][j].off(d,i);
        });
    }
    // TODO: other interactions
};

Bar.prototype.tooltipon = function(d,i,pos) {
   var l, t;
    if(pos === undefined) {
        l = event.pageX + 5;
        t = event.pageY + 5;
    }else{
        l = pos.x;
        t = pos.y;
    }

    d3.select('#bartip').text(+d.toFixed(3))
      .style('top', t+'px')
      .style('left',l+'px')
      .transition()
      .style('opacity', 1);
};


Bar.prototype.tooltipoff = function(d,i){
    d3.select('#bartip').transition()
            .style('opacity',0.0025);
};

Bar.prototype.interaction = function(e,f,frevert){
    var interacts = this.interacts_;
    if(interacts[e] === undefined)  interacts[e]=[];
    if(arguments.length < 2)
        interacts[e].push({on:this.tooltipon, off:this.tooltipoff});
   else
        interacts[e].push({on:f, off:frevert});
};


Bar.prototype.updateScale = function(data){

    var p = this.p_,
        w = p.width - p.margin.left - p.margin.right,
        h = p.height - p.margin.top - p.margin.bottom;

    p.scale.y = d3.scale.ordinal()
        .domain([0,1])
        .rangeRoundBands([0, h], .1);

    p.scale.x = d3.scale.linear()
        .domain([0,1])
        .range([0, w]);
};

Bar.prototype.defaults = function(){

    return {
        width:128,
        height:128,
        margin: {top:0, bottom:0, left:0, right:0},
        position:{top:0, left:0},
        fill:'orangered',
        scale:{x:null, y:null}
    };
};


