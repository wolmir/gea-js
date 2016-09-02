var Estado = require('./estado.js');
var Classe = require('pyoo.js');

var EstadoHierarquico = Classe(Estado, {
	__init__: function(self, entidade) {
		Estado.__init__(self, entidade);
		self.hfsm = null;
	},

	/**
	 * Esse método deve ser invocado pelas subclasses,
	 * preferencialmente, como a úlima coisa a ser feita.
	*/
	entrar: function(self) {
		if (self.hfsm) {
			if (self.hfsm.estado_salvo) {
				self.hfsm.recuperarEstado();
			}
		}
	},

	sair: function(self) {
		if (self.hfsm) {
			self.hfsm.estado_atual.
		}
	}
});

module.exports = EstadoHierarquico