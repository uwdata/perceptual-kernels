/**
 * User: cagatay
 * Date: 7/24/13
 * Time: 4:48 PM
 */

var palettes = {};

palettes.apple_spectrum = [
  "#2d588a", "#58954c", "#e9a044", "#c12f32", "#723e77", "#7d807f"
];
palettes.apple_blue = [
  "#4972a8", "#92b9d8", "#002d64", "#599bcf", "#00070f", "#134d8d"
];
palettes.apple_brown = [
  "#8b6c4f", "#c8b68e", "#3b291d", "#ae8e5d", "#1b0d00", "#713f24"
];
palettes.apple_grey = [
  "#717372", "#c0c2c1", "#2d2f2e", "#8c8e8d", "#000000", "#484a49"
];
palettes.apple_green = [
  "#2d632f", "#90b879", "#0d2d16", "#599a48", "#000b05", "#00431a"
];

palettes.economist = [
  "#621e15", "#e59076", "#128dcd", "#083c52",
  "#64c5f2", "#61afaf", "#0f7369", "#9c9da1"
];

palettes.tableau10 = [
   "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
   "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
];
palettes.tableau20 = [
   "#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c",
   "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5",
   "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f",
   "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"
];
palettes.manyeyes = [
  "#9c9ede", "#7375b5", "#4a5584",
  "#cedb9c", "#b5cf6b", "#8ca252", "#637939",
  "#e7cb94", "#e7ba52", "#bd9e39", "#8c6d31",
  "#e7969c", "#d6616b", "#ad494a", "#843c39",
  "#de9ed6", "#ce6dbd", "#a55194", "#7b4173"
];

palettes.brewer_q09 = [
  "#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00",
  "#ffff33", "#a65628", "#f781bf", "#999999"
];
palettes.brewer_q10 = [
  "#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99",
  "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a"
];
palettes.brewer_q12 = [
  "#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3",
  "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd",
  "#ccebc5", "#ffed6f"
];

palettes.brewer_grey7=["#f7f7f7","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525"];
palettes.brewer_da = [
  "#8c510a", "#d8b365", "#f6e8c3", "#f5f5f5", "#c7eae5", "#5ab4ac", "#01665e"
];
palettes.brewer_db = [
  "#b2182b", "#ef8a62", "#fddbc7", "#f7f7f7", "#d1e5f0", "#67a9cf", "#2166ac"
];
palettes.brewer_dc = [
  "#d73027", "#fc8d59", "#fee090", "#ffffbf", "#e0f3f8", "#91bfdb", "#4575b4"
];
palettes.brewer_dd = [
  "#762a83", "#af8dc3", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#7fbf7b", "#1b7837"
];

palettes.marketmap = [
  "#fa0007", "#ac0000", "#4e0300", "#000000",
  "#005101", "#06a200", "#07ff00"
];

palettes.excel10 = [
  "#365e96", "#983334", "#77973d", "#5d437c", "#36869f",
  "#d1702f", "#8197c5", "#c47f80", "#acc484", "#9887b0"
];
//regular polygon centered at the origin
function regularPolygon(n,r) {

    r = r == undefined ? 1 : r;

    var d = [r,0], delta = 2*Math.PI/n, theta;

    for(var i=1; i<n; i++){
        theta=i*delta;
        d.push(r*Math.cos(theta));
        d.push(r*Math.sin(theta));
    }

    if(n == 3) for(i=0; i < 3; d[2*i]-=0.25*r, i++);

    return d;
}

function hypercycloid(k,r){

    var a = 1, b = 1/k, m=k*2, p = ["M", r, 0],
        x0, y0, dx0, dy0, x1, y1, dx1,dy1, t;

    var dt = Math.PI*2/m, n = 2.5;//

    for(var i = 0; i<m; i++){

        t = i * dt;
        x0 = r*((a-b)*Math.cos(t) + b*Math.cos((b-a)*t/b));
        y0 = r*((a-b)*Math.sin(t) + b*Math.sin((b-a)*t/b));
        dx0 = r*(b-a)*(Math.sin(t) + Math.sin((a-b)*t/b));
        dy0 = r*(a-b)*(Math.cos(t) - Math.cos((a-b)*t/b));

        t = (i+1)*dt;
        x1 = r*((a-b)*Math.cos(t) + b*Math.cos((b-a)*t/b));
        y1 = r*((a-b)*Math.sin(t) + b*Math.sin((b-a)*t/b));
        dx1 = r*(b-a)*(Math.sin(t) + Math.sin((a-b)*t/b));
        dy1 = r*(a-b)*(Math.cos(t) - Math.cos((a-b)*t/b));

        p = p.concat(["C", x0+dt*dx0/n, y0+dt*dy0/n, x1-dt*dx1/n,y1-dt*dy1/n, x1,y1]);

    }

    return p.join(" ");

}

// TODO: implement other stars?
function starPolygon(n,r){
    return n == 5 ? [0,-1, //vertices for a pentagram at the origin
        0.2318, -0.3125,
        0.9512, -0.3125,
        0.3757, 0.1191,
        0.5835, 0.8066,
        0, 0.3989,
        -0.5835, 0.8066,
        -0.3757, 0.1191,
        -0.9512, -0.3125,
        -0.2318,-0.3125].map(function(d){return d*r;}).join(" ")
        :(console.error("not implemented!"));

}

// symbol table for the original polygonal set Vp
// contains an upward triangle, a square, a pentagon, a hexagon,
// a heptagon, an octagon, and a circle.
function shape7(g, i){

    var s,  r0 = 1/Math.sqrt(2);

    switch (i) {
        case 0: //triangle
               s=g.append("polygon")
                .attr("transform","rotate(-90)")
                .attr("points",regularPolygon(3,r0));
            break;
        case 1: //square
            s=g.append("polygon")
                .attr("transform","rotate(45)")
                .attr("points",regularPolygon(4,r0));
            break;
        case 2: //pentagon
            s = g.append("polygon")
                .attr("transform","rotate(-18)")
                .attr("points",regularPolygon(5,r0));
            break;
         case 3: //hexagon
            s = g.append("polygon")
                .attr("points",regularPolygon(6,r0));
            break;
         case 4: //heptagon
           s = g.append("polygon")
               .attr("transform","rotate(12.85)")
               .attr("points",regularPolygon(7,r0));
            break;
         case 5: //octagon
            s = g.append("polygon")
               .attr("transform","rotate(22.5)")
                .attr("points",regularPolygon(8,r0));
            break;
        default://circle
            s=g.append("circle").attr("transform","scale(0.9)").attr("r",r0);
            break;
    }

    return  s.attr("vector-effect", "non-scaling-stroke");
}



//symbol table used for training
//contains a pentagon, an octagon, a star, and a hypercycloid.
function shape4(g, i){

    var s, r0 = 1/Math.sqrt(2);

    switch (i) {
        case 0: //pentagon
            s= g.append("polygon").attr("points",regularPolygon(5,r0));
            break;
        case 1: //hexagon
            s= g.append("polygon").attr("points",regularPolygon(6,r0));
            break;
        case 2: //pentagram
            s = g.append("polygon").attr("points",starPolygon(5,r0));
            break;
        default://hypercycloid
            s=g.append("path").attr("d", hypercycloid(5,r0));
            break;
//        default:
//            s = g.append("ellipse").attr("rx",0.5*r0).attr("ry",r0);
//            break;
    }

    return  s.attr("vector-effect", "non-scaling-stroke");
}



//tableau symbol table
function _shape10(g,i){
    var s,
        r0 = 1,
        r1 = Math.sqrt(2),
        r2 = 1;
        r6 = 1;
        theta = Math.PI/4,
        beta = Math.PI/ 6,
        x  = 1; //r0*Math.cos(theta),
        xs = r0*Math.cos(beta),
        ys = r0*Math.sin(beta);

    switch (i) {
        case 0: //circle
            s=g.append("circle").attr("r",r0);
            break;

        case 1: //square
            s=g.append("polygon")
                .attr("transform","rotate(45)")
                .attr("points",regularPolygon(4,r1));
            break;

        case 2: //plus

            s=g.append("path").attr("d",
                ["M",r0, 0, "H", -r0, "M", 0, r0, "V", -r0].join(" ")
            );
            break;

        case 3: //cross

            s=g.append("path").attr("d",
                ["M", x, x, "L" , -x, -x, "M", -x, x, "L", x, -x].join(" ")
            );
            break;

        case 4: //path star
            s=g.append("path").attr("d",
                ["M",0,r0,"V",-r0,"M",xs,ys,"L",-xs,-ys,"M",-xs,ys,"L",xs,-ys].join(" ")
            );
            break;

        case 5: //diamond
            s=g.append("polygon").attr("points",regularPolygon(4,r2));
            break;

        case 6: //6-9 triangles
            s=g.append("polygon")
                .attr("transform","rotate(-90)")
                .attr("points",regularPolygon(3,r6));
            break;

        case 7:
            s=g.append("polygon")
                .attr("transform","rotate(90)")
                .attr("points",regularPolygon(3,r6));
            break;

        case 8:
            s=g.append("polygon")
                .attr("transform","rotate(180)")
                .attr("points",regularPolygon(3,r6));
            break;

        default:
            s=g.append("polygon")
                .attr("points",regularPolygon(3,r6));
            break;
    }



    return s;
}

//tableau symbol table
function shape10(g,i){


    var s,
        r0 = 1/Math.sqrt(Math.PI),
        r1 = 1/Math.sqrt(2),
        r6 = 0.8*Math.sqrt(4/(3*Math.sqrt(3))),
        theta = Math.PI/4,
        beta = Math.PI/ 6,
        x = r0*Math.cos(theta),
        xs = r0*Math.cos(beta),
        ys = r0*Math.sin(beta);

    switch (i) {
        case 0: //circle
            s=g.append("circle").attr("r",r0);
            break;

        case 1: //square
            s=g.append("polygon")
                .attr("transform","rotate(45)")
                .attr("points",regularPolygon(4,r1));
            break;

        case 2: //plus

            s=g.append("path").attr("d",
                ["M",r0, 0, "H", -r0, "M", 0, r0, "V", -r0].join(" ")
            );
            break;

        case 3: //cross

            s=g.append("path").attr("d",
                ["M", x, x, "L" , -x, -x, "M", -x, x, "L", x, -x].join(" ")
            );
            break;

        case 4: //path star
            s=g.append("path").attr("d",
                ["M",0,r0,"V",-r0,"M",xs,ys,"L",-xs,-ys,"M",-xs,ys,"L",xs,-ys].join(" ")
            );
            break;

        case 5: //diamond
            s=g.append("polygon").attr("points",regularPolygon(4,r1));
            break;

        case 6: //6-9 triangles
            s=g.append("polygon")
                .attr("transform","rotate(-90)")
                .attr("points",regularPolygon(3,r6));
            break;

        case 7:
            s=g.append("polygon")
                .attr("transform","rotate(90)")
                .attr("points",regularPolygon(3,r6));
            break;

        case 8:
            s=g.append("polygon")
                .attr("transform","rotate(180)")
                .attr("points",regularPolygon(3,r6));
            break;

        default:
            s=g.append("polygon")
                .attr("points",regularPolygon(3,r6));
            break;
    }

   return    s.attr("vector-effect","non-scaling-stroke")
            .style("fill", "white")
       .style('fill-opacity', 0.0725) // for easy hover interaction
            .style("stroke-width", 2.5)
            .style("stroke-linecap", "round")
            .style("stroke-linejoin", "round")
       .style('stroke','black');
}

function  color10(g,i){
    return g.append("rect")
        .attr("vector-effect","non-scaling-stroke")
        .attr("class","chip")
        .attr("width", 1.25)
        .attr("height",1.25)
        .attr("x", -0.5*1.25) // make sure it is centered at the 'origin'
        .attr("y", -0.5*1.25)
        .style('stroke', 'none')
        .style("fill", palettes.tableau10[i]);
}


function  color4(g,i){
    return g.append("rect")
        .attr("class","chip")
        .attr("width", 1)
        .attr("height",1)
        .style("fill", palettes.brewer_q10[i])
        .style("stroke", "none");
}



var size={r:[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25,  2.5].map(function(d){return Math.sqrt(d/5);}),
     r2:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function(d){return Math.sqrt(d);}),
          s:[1, 2, 3, 4].map(function(d){return Math.sqrt(d/2);}),
          t:[11, 10.75, 10.5, 10.25, 10, 9.75, 9.5, 9.25, 9, 8.75]};

function size4(g,i){
    var s = size.s[i]; // square centered at the origin
    return (g.append("rect")
        .attr("width",s)
        .attr("height",s)
        .attr("x",-0.5*s)
        .attr("y",-0.5*s)
       .style("stroke-width",1));
    // .style("stroke-width",1/size.t[2*(i+1)]));
}

function size10(g,i){
    var r = size.r[i];
    return g.append("circle")
        .attr("r",r)
        .attr("vector-effect","non-scaling-stroke")
        .style("fill", "white")
        .style('fill-opacity',0.0725) //for easy hover interaction
        .style("stroke-width", 2.5)
        .style("stroke-linecap", "round")
        .style("stroke-linejoin", "round")
        .style('stroke', 'black');
}


function sizeXcolor3(g,d){
    var s=[0,1,3], c = [2,6], n = 3, j=~~(d/n), i = d-n*j;
     return size4(g,s[i]).style("stroke",palettes.tableau10[c[j]]);

}
function sizeXcolor4(g, d){
    var s=[0,1,8,9], c = [0,1,3,9], n = 4, j = ~~(d/n), i = d-j*n;
     return size10(g,s[i]).style("stroke",palettes.tableau10[c[j]]);
}

function shapeXcolor3(g,d){
    var s=[0,1,3], c = [2,6], n = 3, j=~~(d/n), i = d-n*j;
     return shape4(g,s[i]).style("stroke",palettes.tableau10[c[j]]);
//         .style("fill", "none");
}

function shapeXcolor4(g,d){
    var s=[1,2,3,5], c = [0,1,3,9], n = 4, j = ~~(d/n), i = d-j*n;
     return shape10(g,s[i]).style("stroke",palettes.tableau10[c[j]]);
//         .style("fill","none");
}

function shapeXsize3(g,d){
    var s=[0,1,3], z = [3,7], n = 3, j=~~(d/n), i = d-n*j;
     return shape4(g,s[i]).attr("transform","scale("+1.8*size.r[z[j]]+")");
//         .style("fill", "none");
}

function shapeXsize4(g,d){
    var s=[1,2,3,5], z = [0,1,8,9], n = 4, j = ~~(d/n), i = d-j*n;
    //recover the rotation for the square (i=0)
  var gg =  i ?
      shape10(g, s[i]).attr("transform", "scale("+ 1.8*size.r[z[j]]+")"):
      shape10(g, s[i]).attr("transform", "scale("+ 1.8*size.r[z[j]]+") rotate(45)");
return gg.attr("vector-effect", "non-scaling-stroke")
//    .style("fill","none")
    .style("stroke-width", 2.5);
}


