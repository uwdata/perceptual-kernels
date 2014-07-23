#!/usr/bin/env sh
# Collects the available HIT results. Note that this OVERWRITES
# the existing results $STUDY_HOME/exp/shapesize/tm/shapesize-tm.results
# every time it is run.

cd $MTURKCLT_HOME/bin
./getResults.sh $1 $2 $3 $4 $5 $6 $7 $8 $9 \
-successfile $STUDY_HOME/exp/shapesize/tm/shapesize-tm.success \
-outputfile $STUDY_HOME/exp/shapesize/tm/shapesize-tm.results
cd $STUDY_HOME/exp/shapesize/tm/
