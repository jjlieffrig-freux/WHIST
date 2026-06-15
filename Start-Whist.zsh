#!/bin/zsh 
#

cmd1="nodemon web.js"
cmd2="open -a Firefox 'http://localhost/Users/chef/WHIST/WHIST-NJS/public/dev/'"

clear
cd /Users/chef/WHIST/WHIST-NJS/public/dev
echo "Démarrage service http..."
echo " "
eval $cmd1 &
echo " "



echo "Access application 'Whist' ..."
echo " "
eval $cmd2
echo " "

exit

