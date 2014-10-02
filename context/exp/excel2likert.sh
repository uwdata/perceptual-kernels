#!/bin/bash
vars='shape size'
#vars='color excel'
densities='density0 density1'
colors='white black gray'

for v in $vars 
do
	for d in $densities 
	do
		sed -i -r 's/href="\.\./href="..\/../' likert/$v/$d/results/view.html
		sed -i -r 's/src="\.\./src="..\/../' likert/$v/$d/results/view.html
		#cp $v/$d/results/view.html likert/$v/$d/results/
		for c in $colors
		do
			echo "nothing" 
#			sed -i -r 's/href="\.\./href="..\/../' likert/$v/$d/$c/results/view.html
#			sed -i -r 's/src="\.\./src="..\/../' likert/$v/$d/$c/results/view.html
		done
	done
done

