/**
 * Name:
 * User: cagatay
 * Date: 8/12/13
 * Time: 3:02 PM
 * Desc: Utilities for vps studies
 */


//extracts url-encoded param--adapted from mturk external hit sample
function getParam(param){

    var regexS = "[\\?&]"+param+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var tmpURL = window.location.href;
    var results = regex.exec( tmpURL );
//    return "ASSIGNMENT_ID_NOT_AVAILABLE"; //test;
    return  (results == null) ? "" : results[1];
}

//permutes a given array--thanks Donald
function permute(a){

    var n = a.length, v, j;
    for(var i=--n; i >= 1; i--){
        j = ~~(Math.random()*(i+1)); // note: Math.random() \in [0, 1).
        v = a[i], a[i]=a[j], a[j]=v; //swap
    }

    return a;
}

//returns k-element combinations of a given set
function comb(a,k){
    var  c=[], C=[];
    subcomb(0,k,a,c,C);
    return C;
}

function subcomb(i,k,a,c,C){ //recursive

    var n = a.length;

    if(k == 0) {
        C.push(c.slice()); // .slice() copies the array
        return;
    }

    for(var j=i; j<= (n-k); j++){
        c.push(a[j]);
        subcomb(j+1, k-1,a, c, C);
        c.pop();
    }
}

//generates triplets where the two
//of the stimuli are identical
function tripletTurkerDebug(n){

    var d = [], a = [], j, k;

    for(var i=0; i< n; i++){
        j=Math.random()>0.5?1:2;
        k = 3-j;
        a[0]=i;
        a[j]=i;
        a[k]=~~(n*Math.random());
        while(a[k]==i)a[k]=~~(n*Math.random());
        console.log(a);
    }
}


//---- brut force ---
/*
 function bitprint(u) {
 var s="";
 for (var n=0; u; ++n, u>>=1)
 if (u&1) s+=n+" ";
 return s;
 }

 function bitcount(u) {
 for (var n=0; u; ++n, u=u&(u-1));
 return n;
 //    u = u - ((u>>1) & 0x55555555);
 //    u = (u & 0x33333333) + ((u>>2) & 0x33333333);
 //    return (((u + (u>>4)) & 0x0f0f0f0f) * 0x01010101)>>24;
 }
 function combbrut(c,n) {
 var s=[];
 for (var u=0; u<1<<n; u++)
 if (bitcount(u)==c)
 s.push(bitprint(u))
 return s.sort();
 }
 */

