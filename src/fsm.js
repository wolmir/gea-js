/**
 * @desc Esse módulo contém a definição da MaquinaDeEstados
 */
var Classe = require("pyoo.js");

var MaquinaDeEstados = Classe({
	__init__: function(self) {
		self.estado_atual    = null;
		self.estado_global   = null;
	},

	setEstadoGlobal: function(self, estado) {
		if (!estado) {
			throw new Error('MaquinaDeEstados::setEstadoGlobal >> "estado" não pode ser null ou undefined.');
		}

		if (!self.__ehEstado(estado)) {
			throw new Error('MaquinaDeEstados::setEstadoGlobal >> "estado" deve ser um objeto do tipo Estado.');
		}

		self.estado_global = estado;
	},

	receberMensagem: function(self, msg) {
		if (self.estado_atual) {
			self.estado_atual.receberMensagem(msg);
		}
	},

	assertEstado: function(self, estado) {
		if (!estado) {
			throw new Error('MaquinaDeEstados::setEstadoGlobal >> "estado" não pode ser null ou undefined.');
		}

		if (!self.__ehEstado(estado)) {
			throw new Error('MaquinaDeEstados::setEstadoGlobal >> "estado" deve ser um objeto do tipo Estado.');
		}
	},

	mudarEstado: function(self, estado) {
		self.assert(estado);

		if (self.estado_atual) {
			self.estado_atual.sair();
		}

		self.estado_atual = estado;
		self.estado_atual.entrar();
	},

	__ehEstado: function(self, estado) {
		return (estado.sair) && (estado.entrar) && (estado.atualizar) && (estado.receberMensagem);
	}
});

module.exports = MaquinaDeEstados;