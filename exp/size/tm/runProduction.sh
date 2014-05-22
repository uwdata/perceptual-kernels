#!/usr/bin/env sh
#
#
# Loads the HIT $STUDY_HOME/exp/size/tm/size-tm to run in the Amazon Mechanical Turk site
# (sandbox or production, depending on the setting of service_url in $MTURKCLT_HOME/bin/mturk.properties)
#
#
$MTURKCLT_HOME/bin/loadHITs.sh $1 $2 $3 $4 $5 $6 $7 $8 $9 \
-label $STUDY_HOME/exp/size/tm/size-tm \
-input $STUDY_HOME/exp/size/tm/size-tm.input \
-question $STUDY_HOME/exp/size/tm/size-tm.question \
-properties $STUDY_HOME/exp/size/tm/size-tm.properties

