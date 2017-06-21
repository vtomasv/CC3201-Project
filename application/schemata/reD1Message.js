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
* Modelado del mensaje que se envia a ReD1Gateway
*******************************************************************************/
// Modulo de validacion de esquemas json
const Joi = require('joi');
// Libreria para pasar de xml a js
const xml2js = require('xml2js');
// Carga de configuraciones
const config = require('config');

// Clase ReD1Message que represnta
// a un mensaje de ReD1
class ReD1Message
{

}

// Se inicializa el validador de esquema
ReD1Message.schema = Joi.object()
    .keys({
        request : Joi.object().keys({
          '$' :  Joi.object().keys({
            'xmlns:xsi' : Joi.string().default('http://www.w3.org/2001/XMLSchema-instance'),
            'xsi:noNamespaceSchemaLocation' : Joi.string().default('_file:LiveProcessor.xsd') }).default({ 'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance', 'xsi:noNamespaceSchemaLocation': '_file:LiveProcessor.xsd' }),
            item: Joi.array().items(
              Joi.object()
                .keys({
                  key: Joi.string().required(),
                  val: Joi.string().required()
                }))
                })
              });

// Permite obtener el valor de una llave desde un mensaje ReD1Message
ReD1Message.getValue = function(message, key) {


  Joi.validate( message , ReD1Message.schema);

  console.log("%j",message);

  for (var i = 0, j = message.request.item.length; i < j; i++) {
        if (message.request.item[i].key ===  key)
        {
          return message.request.item[i].val;
        }
    }

    return null;
}

// Le da un valor a la clave indicada
ReD1Message.setValue = function(message, key, value) {

  for (var i = 0, j = message.request.item.length; i < j; i++) {
        if (message.request.item[i].key ===  key)
        {
          message.request.item[i].val = value;
          return message;
        }
    }

    var item = {
      key : key,
      val : value
    };

    message.request.item.push(item);

    return message;
}


// Verifica si existe una etiqueta dentro del arreglo
// de claves
ReD1Message.existKey = function(message, key) {

  for (var i = 0, j = message.request.item.length; i < j; i++) {
        if (message.request.item[i].key ===  key)
        {
          return true;
        }
    }
    return false;
}

//Crea un mensaje de envio a ReD1 Valido
ReD1Message.addSecretFields = function (message)
{
  message = ReD1Message.setValue(message, "S_KEY_ID", config.get('ReD1.prod.message.S_KEY_ID') );
  message = ReD1Message.setValue(message, "DIV_NUM", config.get('ReD1.prod.message.DIV_NUM') );
  message = ReD1Message.setValue(message, "EBT_Name", config.get('ReD1.prod.message.EBT_Name') );
  message = ReD1Message.setValue(message, "EBT_Service", config.get('ReD1.prod.message.EBT_Service') );
  message = ReD1Message.setValue(message, "REQ_TYPE_CD", config.get('ReD1.prod.message.REQ_TYPE_CD') );

  return message;
}


// Se exporta la clase
module.exports = ReD1Message;
