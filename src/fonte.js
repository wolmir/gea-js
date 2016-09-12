var Classe = require('pyoo.js');

var Fonte = Classe({
	__init__: function(self) {
		self.agentes = {};
	},

	registrarAgente: function(self, agente) {
		if (!agente.id) {
			throw new Error('Fonte>> O id do agente deve ser um valor válido');
		}

		self.agentes[agente.id] = agente;
	},

	getAgente: function(self, id) {
		return self.agentes[id];
	},

	getTodosAgentes: function(self) {
		return self.agentes;
	},

	removerAgente: function(self, id) {
		if (self.agentes[id]) {
			delete self.agentes[id];
		}
	}
});

module.exports = Fonte;