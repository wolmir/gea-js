var Classe = require('pyoo.js');

var Fonte = Classe({
	__init__: function(self) {
		self.agentes = {};
	},

	registrarAgente: function(self, agente, id) {
		if ((!agente.id) && (!id)) {
			throw new Error('Fonte>> O id do agente deve ser um valor válido');
		}
		var rid;

		if (!id){
			rid = agente.id;
		} else {
			rid = id;
		}

		if (self.agentes[rid]) {
			console.warn("Agente " + rid + ' já existe. Substituindo...');
		}
		self.agentes[rid] = agente;
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