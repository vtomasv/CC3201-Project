#!/usr/bin/env bash

#===============================================================================
#  ____                            _        _____        _
#  |  _ \                          | |      |  __ \      | |
#  | |_) | __ _ ___  ___  ___    __| | ___  | |  | | __ _| |_ ___  ___
#  |  _ < / _` / __|/ _ \/ __|  / _` |/ _ \ | |  | |/ _` | __/ _ \/ __|
#  | |_) | (_| \__ \  __/\__ \ | (_| |  __/ | |__| | (_| | || (_) \__ \
#  |____/ \__,_|___/\___||___/  \__,_|\___| |_____/ \__,_|\__\___/|___/
#                                              Cod: CC3201
#                                              Profesor: Aidan Hogan
#===============================================================================
Nombre_Proyecto="ReD1 Gateway Kuvasz"
GIT_ENV="https://github.com/vtomasv/CC3201-Project"
DIR_DEV="/usr/src/app/CC3201-Project"
NET_INTERFACE="en0"
NAME_CONTAINER="..."
DISK=$(df -h | awk '$NF=="/"{printf "%s\t\t", $5}')


echo -e "-----------------------------------------------------------------------"
echo -e "\
\033[31m● \033[33m● \033[1;33m● \033[1;36m● ● \033[1;34m●[0m   | Proyecto: \033[1;31m$Nombre_Proyecto  \033[0m"
echo -e "\
\033[31m● \033[33m● \033[1;33m● \033[1;36m● ● \033[1;34m●[0m   | Version Node: \033[33m`eval node -v` \033[0m"
echo -e "\
\033[31m● ● \033[1;31m● \033[1;36m● ● \033[36m●[0m   | Uptime: \033[33m`eval uptime` \033[0m"
echo -e "\
\033[31m● ● \033[1;31m● \033[1;36m● ● \033[36m●[0m   | Espacio: \033[33m$DISK  \033[0m"
echo -e "\
\033[31m● ● \033[1;31m● \033[32m● ● \033[36m●[0m   | GIT: \033[33m$GIT_ENV  \033[0m"
echo -e "\
\033[31m● ● \033[1;31m● \033[32m● ● \033[36m●[0m   | Directorio de trabajo: \033[33m `eval pwd`  \033[0m"
echo -e "\
\033[30;47m T A L < A [0m   | \033[2;33m© 2017 KvZ Todos los Derechos Reservados. \033[0m"
echo -e "-----------------------------------------------------------------------"

if [ ! -d "$DIR_DEV" ];
  then
      echo -e "\033[2;33m INICIALIZACION   \033[0m";
      git clone --branch developer https://github.com/vtomasv/CC3201-Project;
      cd /usr/src/app/CC3201-Project/application;
      npm install --save;
      npm install nodemon -g;
      nodemon -L --watch  server.js
  else
      echo -e "\033[2;33m Instancia existente   \033[0m";
      cd /usr/src/app/CC3201-Project/application;
      npm install --save;
      npm install nodemon -g;
      nodemon -L --watch server.js
fi
