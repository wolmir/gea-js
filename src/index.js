var Classe = require('pyoo.js');
var Estado = require('./estado');
var MaquinaDeEstados = require('./fsm');

var gea = {};

gea.Estado = Estado;
gea.MaquinaDeEstados = MaquinaDeEstados;

module.exports = gea;