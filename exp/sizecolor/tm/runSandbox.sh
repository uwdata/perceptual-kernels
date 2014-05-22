#!/usr/bin/env sh
#
#
# Loads the HIT $STUDY_HOME/exp/sizecolor/tm/sizecolor-tm to run in the Amazon Mechanical Turk sandbox site.
#
#
$MTURKCLT_HOME/bin/loadHITs.sh $1 $2 $3 $4 $5 $6 $7 $8 $9 \
-sandbox \
-label $STUDY_HOME/exp/sizecolor/tm/sizecolor-tm \
-input $STUDY_HOME/exp/sizecolor/tm/sizecolor-tm.input \
-question $STUDY_HOME/exp/sizecolor/tm/sizecolor-tm.question \
-properties $STUDY_HOME/exp/sizecolor/tm/sizecolor-tm.properties

