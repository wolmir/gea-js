var Classe = require('pyoo.js');
var Maquina = require('./gea');

var Agente = Classe({
	__init__: function(self) {
		self.id = null;
		self.fsm = Maquina();
	},

	receberMensagem: function(self, telegrama) {

	},

	atualizar: function(self, info) {
		
	}
});

module.exports = Agente;