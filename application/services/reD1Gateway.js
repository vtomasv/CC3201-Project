'use strict';
/* *****************************************************************************
*    _                                      | Proyecto: ReD1-Gateway-Kuvasz
*   | | __ _   _ __   __  __ _  ___  ____   |
*   | |/ /| | | |\ \ / / / _` |/ __||_  /   | Autor: Tomas Vera
*   |   < | |_| | \ V / | (_| |\__ \ / /    | email: tvera@kvz.cl
*   |_|\_\ \__,_|  \_/   \__,_||___//___|   | Area: Productos
*   --------------------------- Solutions   |
* Copyright © Todos los Derechos Reservados |                  fecha: 22/02/2017
********************************************************************************
* Descripcion:
* Funcion de envio de request a ReD1 - ReD1Gateway
*******************************************************************************/

// Modulo de invocacion de servicios http
const request = require('request');
// Moodulo de carga de configuraciones
const config = require('config');


const serviceEndPoint =   config.get('ReD1.service.protocol') +
                          config.get('ReD1.security.user') + ":" +
                          config.get('ReD1.security.password')  + "@" +
                          config.get('ReD1.service.endpoint')+ ":" +
                          config.get('ReD1.service.port');

const headers =           config.get('ReD1.service.headers');

/**
* -----------------------------------------------------------------------------
* Facade del servicio de ReD1
* -----------------------------------------------------------------------------
*/
exports.register = function (server, options, next)
{
  const callPostRed1 =  function (_body, next) {


    request.post(
      {
        // Se obtiene los ddatos de la url de conexion
        url : serviceEndPoint,
        // Se hace traspaso de las cabeceras base (HTTP)
        headers : headers,
        // En el body viaja el requerimiento
        body : _body
      },
      function (error, response, body)
      {
        if (error)
        {
          // Existio un error en la invocacion del servicio.
          next(error);
        }
        // Se hace el traspaso de control a quien
        // alla realizado la invocacion
        next(body);
        
      }
    );
  };

  // Se realiza el registro de esta funcion
  // para que quede disponible para todos los
  // modulos.
  server.method('callPostRed1', callPostRed1, {});

  // Continua el flijo de control
  next();
};

exports.register.attributes =
{
  // Importacion de las librerias que sean necesarias
  pkg: require('../package.json'),
  // Se expone el nombre del modulo
  name: 'ReD1Gateway'
};
