var Classe = require('pyoo.js');

var GerenciadorEntidades = Classe({
	__init__: function(self) {
		self.entidades = {};
	},

	registrarEntidade: function(self, entidade) {
		if (!entidade.id) {
			throw new Error('GerenciadorEntidades>> O id da entidade deve ser um valor válido');
		}

		self.entidades[entidade.id] = entidade;
	},

	getEntidade: function(self, id) {
		return self.entidades[id];
	}

	removerEntidade: function(self, id) {
		if (self.entidades[id]) {
			delete self.entidades[id];
		}
	}
});

module.exports = GerenciadorEntidades;