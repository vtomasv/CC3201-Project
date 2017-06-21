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
          path: '/din',
          config: {
            description: 'Servicio obtiene todos las importaciones gestionadas por una empresa en particular',
            notes: 'Gracias a este servicio usted puede consultar por una empresa importadora en paticular y obtener todas las importaciones que esta esta gestionando',
            tags: ['api', 'data base', 'test'],
            validate: {
                              payload: {
                                  company: Joi.string().required()
                              }}
          },
          handler: function (request, reply) {
               let company = request.payload.company.toUpperCase();
               let select =   `select distinct imp.NUMENCRIPTADO, imp.GNOM_CIA_T
                 from importaciones as imp
                 inner join IMP_CONSOLIDADO as conso
                 on  imp.NUMENCRIPTADO = conso.NUMENCRIPTADO
                 where imp.GNOM_CIA_T like '%${company}%';`
               request.pg.client.query(select, function(err, result) {
                   if (err) { reply (Boom.badRequest(err)); }
                   else {
                      return reply(result);
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
  name: 'din'
};
