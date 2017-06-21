'use strict';
/* *****************************************************************************
* 8 888888888o.      8 888888888o       | Proyecto: CC3201-Project
* 8 8888    `^888.   8 8888    `88.     |
* 8 8888        `88. 8 8888     `88     | Autor: Tomas Vera
* 8 8888         `88 8 8888     ,88     | email: tvera@dcc.uchile.cl
* 8 8888          88 8 8888.   ,88'     | Ramo: CC3201
* 8 8888          88 8 8888888888       | anho: 2017
* 8 8888         ,88 8 8888    `88.     | Semestre: Otonho
* 8 8888        ,88' 8 8888      88     | Profesor: Aidan Hogan
* 8 8888    ,o88P'   8 8888    ,88'     |
* 8 888888888P'      8 888888888P       |
*                                       |                  fecha: 20/06/2017
********************************************************************************
* Descripcion:
* Servicio de test
*******************************************************************************/

// Validacion de json
const Joi = require('joi');
// Mensajes HTML entendibles por humanos
const Boom = require('boom');

//Definicion de funcines internas
const internals = {};

internals.applyRoutes = function (server, next) {

  server.route({
          method: 'POST',
          path: '/items',
          config: {
            description: 'Servicio obtiene todos los items de una importacion',
            notes: 'Con el identificador de la importacion usted puede revisar todos los items que esta en ella ej. 13273573',
            tags: ['api', 'data base', 'items'],
            validate: {
                              payload: {
                                  numero: Joi.string().required()
                              }}
          },
          handler: function (request, reply) {

               let id = request.payload.numero;
               let select = `SELECT * from IMP_CONSOLIDADO where numencriptado = ${id};`;
               request.pg.client.query(select, function(err, result) {
                   if (err) { reply (Boom.badRequest(err)); }
                   else {
                      return reply(result.rows);
                   }

               })

          }
      });

      next();
};


// Registro de test
exports.register = function (server, options, next) {

  internals.applyRoutes(server,next);

};

exports.register.attributes = {
  // Importacion de las librerias que sean necesarias
  pkg: require('../../package.json'),
  // Se expone el nombre del modulo
  name: 'items'
};
