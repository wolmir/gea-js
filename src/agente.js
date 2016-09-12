var Classe = require('pyoo.js');
var Maquina = require('./fsm');

var Agente = Classe({
	__init__: function(self, id, fonte) {
		self.id = id;
		self.fsm = Maquina();
		self.fonte = fonte;
		if (self.fonte) {
			self.fonte.registrarAgente(self);
		}
	},

	receberMensagem: function(self, telegrama) {

	},

	atualizar: function(self, info) {
		
	}
});

module.exports = Agente;