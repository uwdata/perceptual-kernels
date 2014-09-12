/*
 *
 * File  : heatmap.js
 * Author: Cagatay Demiralp (cagatay)
 * Desc  :
 *
 * 	Example:
 *
 * Date    : Thu May 29 22:56:56 2014
 * Modified: $Id$
 *
 */
function heatmap(el,p) {

    var p = p || {width:100, height:100, drawfn:null, margin:{top:50, left:50, bottom:0, right:0}},
        width = p.width,
        height = p.height,
        drawfn = p.drawfn,
        margin= p.margin,
        hlrange = null,
        tt= true, //tooltip
        ttwidth=150,
        ttheight = 50,
        tooltip = d3.select(el)
            .append('div')
            .attr('id','tooltip') //move style to CSS
            .style("position", "absolute")
            .style("white-space", "nowrap")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .style("background-color","white")
            .style("border","1px solid #999")
            .style('border-radius','5px')
            .style("padding","1px")
            .style("font-size", "13px")
            .style("font-family",'"Helvetica"')
            .style("-mox-box-shadow","2px 2px 11px #666")
            .style("-webkit-box-shadow","2px 2px 11px #666"),
      tooltipshape= d3.select('#tooltip')
          .append('svg')
          .attr('width',ttwidth)
          .attr('height',ttheight)
          .append('g'),
     tooltiptxt = tooltipshape.append('text'),
    svg = d3.select(el)
        .append('svg')
        .attr('width', width)
        .attr('height', height);


   function hm(data) {
      var numrows = data.length,
          numcols = data[0].length,
          l = margin.left,
          t = margin.top,
          x = d3.scale.ordinal().domain(d3.range(numrows)).rangeRoundBands([l, width]),
          y = d3.scale.ordinal().domain(d3.range(numcols)).rangeRoundBands([t, height]),
          w = x.rangeBand(),
          h = y.rangeBand(),
          c = d3.scale.linear().domain([0,1]).range(['#000', '#eee']);

       var rowlabels = svg.selectAll('.rowlabel')
           .data(d3.range(numrows))
           .enter()
           .append('g')
           .attr('class','rowlabel')
           .attr("transform", function (d, i) {
               return ['translate(', (l - 0.5*w),',', y(i)+0.5*h, ') scale(20)'].join('');
           })
           .each(appendStim);

       var collabels= svg.selectAll('.collabel')
           .data(d3.range(numrows))
           .enter()
           .append('g')
           .attr('class','collabel')
           .attr("transform", function (d, i) {
               return ['translate(', x(i)+0.5*w,',', t-0.5*h, ') scale(20)'].join('');
           })
           .each(appendStim);

       var rows = svg.selectAll('.row')
           .data(data) //join
           .enter() // update & create
           .append('g')
           .attr('class', 'row')
           .attr("transform", function (d, i) {
               return "translate(0," + y(i) + ")";
           })
           .each(row);

      function row(d,i){
          var cells = d3.select(this).selectAll(".cell")
              .data(d)
              .enter()
              .append("rect")
              .attr("class", "cell")
              .attr("x", function(d,i){return x(i);})
              .attr("width", w)
              .attr("height", h)
              .style("fill", function(d){return c(d);})
              .style("stroke", 'none')
              .style("stroke-width", 1)
              .style("shape-rendering", "crisp-edges");

          if(tt){
            cells.on("mouseover",function(d,j){
                d3.select(this).style("stroke","orangered");
                tooltip.style("visibility", "visible");
                tooltiptxt.text("( , ):"+d.toFixed(2))
                    .attr('x',1).attr('y',33)
                    .style('font-size',28)
                    .style('word-spacing',18)
                    .style('fill','gray');

                tooltipshape.selectAll('.stim-i')
                    .data([i],function(d){return d;})
                    .enter()
                    .append('g')
                    .attr('transform',function(d,i){
                        return ['translate(',23, ',25) scale(18)'].join('');})
                    .attr('class', 'stim-i')
                    .each(appendStim);

                 tooltipshape.selectAll('.stim-j')
                    .data([j],function(d){return d;})
                    .enter()
                    .append('g')
                    .attr('transform',['translate(',56, ',25) scale(18)'].join(''))
                    .attr('class', 'stim-j')
                    .each(appendStim);

                tooltipshape.selectAll('.stim-i')
                    .data([i], function(d){return d;}).exit().remove();
                tooltipshape.selectAll('.stim-j')
                    .data([j], function(d){return d;}).exit().remove();

            })
                .on("mousemove", function(){
                    tooltip.style("top", (event.pageY+5)+"px").style("left",(event.pageX+8)+"px");

                })
                .on("mouseout",function(){
                    tooltip.style("visibility", "hidden");
                    d3.select(this).style("stroke","none");
                });
          }
      }
      }

    function appendStim(d,i) {
        var g = d3.select(this),
            s = drawfn(g,d);
        return s;
    }

    function inrange(v, R){

        var i = 0, n = R.length, f=false, r;

        for(i; i < n; i++){
           r = R[i];
           f = v.i >= r.i0 &&
               v.i <= r.i1 &&
               v.j >= r.j0 &&
               v.j <= r.j1;
            if(f) break;
        }
        return f;
    }

    hm.height= function(value) {
        if (!arguments.length) return height;
        height= value;
        svg.attr('height',height);
        return hm;
    };

    hm.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        svg.attr('width',width);
        return hm;
    };

    hm.drawfn= function(value) {
        if (!arguments.length) return drawfn;
        drawfn= value;
        return hm;
    };

    hm.tooltip = function(value){
       if (!arguments.length)  return tt;
       tt =  value;
       return hm;
    };

    //highlights
    hm.highlight = function(r){

        if(!arguments.length) return hlrange;

        hlrange = r;

       // highlight cells if they are in
       // the selection range
       svg.selectAll('.row')
           .each(function(dd,i){
            d3.select(this).selectAll('.cell')
                .transition()
                .duration(500)
                .style('opacity', function(d,j){
                    return (inrange({i:i, j:j}, hlrange))?1:0.0125;
                });
           });

      return hm;

    };

    hm.removeHighlight = function(){

        svg.selectAll('.row')
           .each(function(dd,i){
            d3.select(this).selectAll('.cell')
                .transition()
                .duration(500)
                .style('opacity', 1.0);
           });
      return hm;
    };

    return hm;

   }

