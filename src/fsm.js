var Classe = require("pyoo.js");

var Maquina = Classe({
	__init__: function(self) {
		self.estado_atual    = null;
		self.estado_global   = null;
		self.estado_anterior = null;
	},

	atualizar: function(self, info, mudarEstado) {
		if (self.estado_atual) {
			self.estado_atual.atualizar(info, (mudarEstado) ? mudarEstado : self.mudarEstado);
		}
	},

	setEstadoGlobal: function(self, estado) {
		if (!estado) {
			throw new Error('Maquina::setEstadoGlobal >> "estado" não pode ser null ou undefined.');
		}

		if (!self.__ehEstado(estado)) {
			throw new Error('Maquina::setEstadoGlobal >> "estado" deve ser um objeto do tipo Estado.');
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
			throw new Error('Maquina::setEstadoGlobal >> "estado" não pode ser null ou undefined.');
		}

		if (!self.__ehEstado(estado)) {
			throw new Error('Maquina::setEstadoGlobal >> "estado" deve ser um objeto do tipo Estado.');
		}
	},

	mudarEstado: function(self, estado) {
		self.assert(estado);

		if (self.estado_atual) {
			self.estado_atual.sair();
		}

		self.estado_anterior = self.estado_atual;
		self.estado_atual = estado;
		self.estado_atual.entrar();
	},

	reverter: function(self) {
		if (self.estado_anterior) {
			self.tmp = self.estado_anterior;
			self.estado_atual.sair();
			self.estado_anterior = self.estado_atual;
			self.estado_atual = self.tmp;
			self.estado_atual.entrar();
		}
	},

	assert: function(self, estado) {
		return (estado.sair) && (estado.entrar) && (estado.atualizar) && (estado.receberMensagem);
	}
});

module.exports = Maquina;