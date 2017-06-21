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
* Servidor API de conectividad con base de datos (actividad plara el ramo)
*******************************************************************************/


/**
 * -----------------------------------------------------------------------------
 * Carga de importaciones
 * -----------------------------------------------------------------------------
 */
 // Servidor hapi
const Hapi = require('hapi');
// Validador de datos
const Joi = require('joi');
// Servidor de documentacion
const HapiSwagger = require('hapi-swagger');
//
const Inert = require('inert');

const Vision = require('vision');
// Route para test
const Test = require('./routes/endpoints/test');
// Route para carga
const Carga = require('./routes/endpoints/carga');
// Route para Items
const Items = require('./routes/endpoints/items');
// Route para Din por empresa
const Din = require('./routes/endpoints/din');
// Moodulo de carga de configuraciones
const config = require('config');
// Configuracion
const Pack = require('./package');
// Seguridad CSRF
const Crumb = require('crumb');


var connectionString =  'postgres://' + config.get('dataBase.userName') + ':' + config.get('dataBase.password') + '@' + config.get('dataBase.host') + ':' + config.get('dataBase.port')  + '/' + config.get('dataBase.schema');
process.env['DATABASE_URL'] = connectionString;



//console.log(connectionString);

// Se ignoran los certificados auto firmados
if (config.get('environment.developer')) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

// Creacion de servidor
const server = new Hapi.Server();
server.connection({
  port: config.get('environment.port')
});

server.register({ // register all your plugins
  register: require('hapi-postgres-connection') // no options required
}, function (err) {

  if (err) {
    // handle plugin startup error
  }
});

// Opciones para el servidor de documentacion
const options = {
    info: {
            'title': 'API de acceso a informacion aduanera - U CHile',
            'version': Pack.version,
        },


    };

const HapiSwaggerRegister =     {
            'register': HapiSwagger,
            'options': options
        };



// Se registran todos los plugins necesarios para correr la aplicacion
server.register([Inert, Vision, HapiSwaggerRegister, Carga, Test, Items, Din], (err) => {
    if (err) {
        console.error('Ocurrio un problema al cargar el plugin:', err);
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
