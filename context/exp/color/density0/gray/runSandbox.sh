#!/usr/bin/env sh
#
#
# Loads the HIT $STUDY_HOME/exp/color/density0/gray/color-tm to run in the Amazon Mechanical Turk sandbox site.
#
#
cd $MTURKCLT_HOME/bin
./loadHITs.sh $1 $2 $3 $4 $5 $6 $7 $8 $9 \
-sandbox \
-label $STUDY_HOME/exp/color/density0/gray/color-tm \
-input $STUDY_HOME/exp/color/density0/gray/color-tm.input \
-question $STUDY_HOME/exp/color/density0/gray/color-tm.question \
-properties $STUDY_HOME/exp/color/density0/gray/color-tm.properties
cd $STUDY_HOME/exp/color/density0/gray/
