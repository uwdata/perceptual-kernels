#!/bin/bash

densities='density0 density1'
colors='white black gray'

for d in $densities 
do
	for c in $colors
	do
		cp excel/$d/$c/results/view.html-r excel/$d/$c/results/view.html
		#e='s/<form>/<form><label><input\?type="radio"\?name=\"density\"\?onclick="setDensity(-1)"\/>nodensity<\/label><br>/'
		#sed -i -r $e  excel/$d/$c/results/view.html 
	  sed -i -r 's/?/ /' excel/$d/$c/results/view.html 
	done
done

