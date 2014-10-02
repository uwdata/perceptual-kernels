#!/bin/bash
#vars='shape size'
vars='color excel'
densities='density0 density1'
colors='white black gray'

for v in $vars 
do
	for d in $densities 
	do
		#sed -i -r 's/href="\.\./href="..\/../' likert/$v/$d/results/view.html
		#sed -i -r 's/src="\.\./src="..\/../' likert/$v/$d/results/view.html
		for c in $colors
		do
			echo "nothing" 

		cp ~/mturkCLT/context/exp/likert/$v/$d/$c/results/mds*.txt likert/$v/$d/$c/results/
#			sed -i -r 's/href="\.\./href="..\/../' likert/$v/$d/$c/results/view.html
#			sed -i -r 's/src="\.\./src="..\/../' likert/$v/$d/$c/results/view.html
		done
	done
done

