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
!function() {

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
    utils.minmax = function(data, k){

        var n = data.length;

        if(n == 0)
            return;
        else if(n == 1)
            return [data[0][k], data[0][k]];

        var minval = data[0][k],
            maxval = minval,
            i = 1, v;
        for(; i< n; i++){
            v = data[i][k];
            minval = minval>v?v:minval;
            maxval = maxval<v?v:maxval;
        }

        return [minval, maxval];
    };

}();
