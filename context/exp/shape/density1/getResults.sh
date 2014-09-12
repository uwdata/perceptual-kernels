#!/usr/bin/env sh
#Collects the available HIT results. Note that this OVERWRITES
#the existing results $STUDY_HOME/exp/shape/tm/shape-tm.results every time it is run.

cd $MTURKCLT_HOME/bin
./getResults.sh $1 $2 $3 $4 $5 $6 $7 $8 $9 \
	-successfile $STUDY_HOME/exp/shape/density1/shape-tm.success \
	-outputfile $STUDY_HOME/exp/shape/density1/shape-tm.results
cd $STUDY_HOME/exp/shape/d1
