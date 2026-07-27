@echo off
title Serveur Local ICA Intelliquest Canada Academy
echo ========================================================
echo   DEMARRAGE DU SERVEUR LOCAL ICA INTELLIQUEST ACADEMY
echo ========================================================
echo.
echo  [1/2] Lancement du serveur Web local Node.js sur le port 3000...
start "" http://localhost:3000
echo  [2/2] Ouverture de votre navigateur Chrome sur http://localhost:3000
echo.
echo  Le serveur est actif ! Vous pouvez tester toutes les pages du site.
echo  Pour arreter le serveur, fermez simplement cette fenetre.
echo.
node server.js
pause
