var Classe             = require('pyoo.js');
var Estado             = require('./estado');
var Maquina            = require('./fsm');

var gea = {};

gea.Estado             = Estado;
gea.Maquina            = Maquina;

module.exports = gea;