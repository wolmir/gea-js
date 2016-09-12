var Classe = require('pyoo.js');

var Estado = Classe({
	__init__: function(self, agente) {
		if (typeof agente !== 'object') {
			throw new Error('Estado::__init__ >> "agente" deve ser um objeto definido.');
		}

		self.agente = agente;
	},

	entrar: function(self) {
		
	},

	sair: function(self) {
		
	},

	atualizar: function(self, info, mudarEstado) {
		
	},

	receberMensagem: function(self, msg) {
		
	}
});

module.exports = Estado;