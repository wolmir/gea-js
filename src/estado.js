var Classe = require('pyoo.js');

var Estado = Classe({
	__init__: function(self, entidade) {
		if (typeof entidade !== 'object') {
			throw new Error('Estado::__init__ >> "entidade" deve ser um objeto definido.');
		}

		self.entidade = entidade;
	},

	entrar: function(self) {
		throw new Error('Estado::entrar >> Método não implementado.');
	},

	sair: function(self) {
		throw new Error('Estado::sair >> Método não implementado.');
	},

	atualizar: function(self, info, mudarEstado) {
		
	},

	receberMensagem: function(self, msg) {
		
	}
});

module.exports = Estado;