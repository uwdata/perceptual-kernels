/*
 *
 * File  : utils.js
 * Author: Cagatay Demiralp (cagatay)
 * Desc  :
 *
 * Date    : Fri May  9 16:59:24 2014
 * Modified: $Id$
 *
 */
!function () {

    utils = {};

// This is just a two-level shallow merge; consider
// jQuery.extend() if a more general solution is needed
    utils.merge = function merge(OBJ, obj) {

        //1st level
        for (var key1 in obj) {
            if (obj.hasOwnProperty(key1) &&
                OBJ.hasOwnProperty(key1)) {

                if (typeof(obj[key1]) === 'object') {

                    //2nd level
                    for (var key2 in obj[key1])
                        if (obj[key1].hasOwnProperty(key2)
                            && OBJ[key1].hasOwnProperty(key2))
                            OBJ[key1][key2] = obj[key1][key2];
                } else {
                    OBJ[key1] = obj[key1];
                }
            }
        }

        return OBJ;
    };

    // computes the range values in a given data array
    utils.minmax = function (data, k) {

        var n = data.length;

        if (n == 0)
            return;
        else if (n == 1)
            return [data[0][k], data[0][k]];

        var minval = data[0][k],
            maxval = minval,
            i = 1, v;
        for (; i < n; i++) {
            v = data[i][k];
            minval = minval > v ? v : minval;
            maxval = maxval < v ? v : maxval;
        }

        return [minval, maxval];
    };

    //extracts url-encoded param--adapted from mturk external hit sample
    utils.getParam = function (param) {

        var regexS = "[\\?&]" + param + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var tmpURL = window.location.href;
        var results = regex.exec(tmpURL);
        //return "ASSIGNMENT_ID_NOT_AVAILABLE"; //test;
        return  (results == null) ? "" : results[1];
    };

    //permutes a given array--thanks Donald
    utils.permute = function (a) {

        var n = a.length, v, j;
        for (var i = --n; i >= 1; i--) {
            j = ~~(Math.random() * (i + 1)); // note: Math.random() \in [0, 1).
            v = a[i], a[i] = a[j], a[j] = v; //swap
        }

        return a;
    };

    //returns k-element combinations of a given set
    utils.comb = function (a, k) {
        var c = [], C = [];
        subcomb(0, k, a, c, C);
        return C;
    };

    function subcomb(i, k, a, c, C) { //recursive

        var n = a.length;

        if (k == 0) {
            C.push(c.slice()); // .slice() copies the array
            return;
        }

        for (var j = i; j <= (n - k); j++) {
            c.push(a[j]);
            subcomb(j + 1, k - 1, a, c, C);
            c.pop();
        }
    }

//generates triplets where the two
//of the stimuli are identical
    utils.tripletTurkerDebug = function (n) {

        var d = [], a = [], j, k;

        for (var i = 0; i < n; i++) {
            j = Math.random() > 0.5 ? 1 : 2;
            k = 3 - j;
            a[0] = i;
            a[j] = i;
            a[k] = ~~(n * Math.random());
            while (a[k] == i)a[k] = ~~(n * Math.random());
            console.log(a);
        }
    };

   //l2^2
     utils.squaredDistance = function(p1, p2){
        return (p1.x  -  p2.x)*(p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y);
    };

    //l2
     utils.distance = function(p1, p2){

        return Math.sqrt(utils.squaredDistance(p1,p2));

     };
}();
