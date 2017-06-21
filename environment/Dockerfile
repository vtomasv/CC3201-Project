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


# ==============================================================================
# |        Documentacion de propiedad y controles de cambio                    |
# ==============================================================================
# @author Tomas Vera <tvera@kvz.cl>
# @doc
# @copyright 2017 - CC3201-1 Bases de Datos 2017, Otoño
# @title
# ==============================================================================
# | Historial de cambios
# ==============================================================================
# | {Cambio, ID-REQ, Fecha, Responsable}
# ==============================================================================

# ==============================================================================
# Definicion de la imagen
# ==============================================================================

# Version 7.5.0 de la receta Docker de node
FROM node:7.5.0

MAINTAINER vtomasv - Tomas Vera - tvera@dcc.uchile.cl

ARG GIT_COMMIT=unkown
LABEL git-commit=$GIT_COMMIT
LABEL git_repository=https://github.com/vtomasv/CC3201-Project
LABEL vendor="U Chile"
LABEL cl.uchile.version.is-production="false"

# Creamos una carpeta para poner todos los archivos de
# ejecucion que necesita un usuario
RUN mkdir -p /usr/bin

# Carpeta donde estaran los fuentes
RUN mkdir -p /usr/src/app

# Se copia el archivo de inicio
COPY start.sh /usr/bin
WORKDIR /usr/bin
RUN chmod +x start.sh

# Se expone el volumen de este conetenedor
VOLUME /usr/src/app

# Se espcifica como directrio de trabajo
WORKDIR /usr/src/app

ENTRYPOINT ["/usr/bin/start.sh"]

EXPOSE 9090
