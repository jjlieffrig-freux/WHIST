cls

cd /Users/chef/WHIST/WHIST-NJS/public/dev
echo "Démarrage service http..."
echo " "
cd /d D:\0000\WHIST\WHIST-NJS\public\dev
start /min nodemon run web.js
echo " "



echo "Access application 'Whist' ..."
echo " "
start chrome "http://localhost/0000/WHIST/WHIST-NJS/public/dev/" 
echo " "

rem pause




