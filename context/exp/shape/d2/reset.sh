#!/usr/bin/env sh
#Resets your account. While this can be the only solution sometimes,
#use it judiciously; it WIPES OUT all the HITs running on your account!

#comment out the following line to reset your sandbox account
cd $MTURKCLT_HOME/bin
./resetAccount.sh -force -sandbox

#comment out the following line to reset your production account
#$MTURKCLT_HOME/bin/resetAccount.sh -force

