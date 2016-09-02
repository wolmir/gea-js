var Classe           = require('pyoo.js');
var MaquinaDeEstados = require('./fsm');

var MaquinaDeEstadosHierarquica = Classe(MaquinaDeEstados, {
	__init__: function(self) {
		MaquinaDeEstados.__init__(self);
		self.estado_salvo = null;
	},

	salvarEstado: function(self) {
		if (self.estado_atual) {
			if (self.estado_atual.hfsm) {
				self.estado_atual.hfsm.salvarEstado();
			}
		}
		self.estado_salvo = self.estado_atual;
		self.estado_atual.sair();
	},

	recuperarEstado: function(self) {
		if (self.estado_salvo) {
			self.estado_atual = self.estado_salvo;
			self.estado_atual.entrar();
			if (self.estado_atual.hfsm) {
				self.estado_atual.hfsm.recuperarEstado();
			}
			self.estado_salvo = null;
		}
	},

	_saida: function(self) {
		if (self.estado_atual) {
			if (self.estado_atual.hfsm) {
				self.estado_atual.hfsm.salvarEstado();
			}
		}
		self.estado_atual.sair();
	},

	_entrada: function(self) {
		self.estado_atual.entrar();
		if (self.estado_atual.hfsm) {
			self.estado_atual.hfsm.recuperarEstado();
		}
	},

	mudarEstado: function(self, estado) {
		self.assert(estado);

		self.salvarEstado();
		self.estado_atual = estado;
		self.recuperarEstado();
	}
});

module.exports = MaquinaDeEstadosHierarquica;