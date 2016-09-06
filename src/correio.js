require('./telegrama');
require('./gerenciador-entidades');

var Classe = require('pyoo.js');
var _ = require('lodash');

var DestinatarioNaoEncontradoException = Classe({
	__init__: function(self, destinatario) {
		self.nome = 'DestinatarioNaoEncontradoException';
		self.destinatario = destinatario;
	}
});

var Correio = Classe({

	BROADCAST: 'BROADCAST',

	__init__: function(self, gerenciador_entidades) {
		self.gerenciador_entidades = gerenciador_entidades;
	},

	__despachar: function(self, telegrama) {
		var destino = self.gerenciador_entidades.getEntidade(telegrama.destinatario);

		if (!destino) {
			throw DestinatarioNaoEncontradoException();
		}

		destino.receberMensagem(telegrama);
	},

	despachar: function(self, telegrama) {
		if (telegrama.tempo_despacho > 0) {
			setTimeout(function() {self.__despachar(telegrama)}, telegrama.tempo_despacho);
		} else if (telegrama.destinatario === Correio.BROADCAST) {
			var entidades = self.gerenciador_entidades.getTodasEntidades();
			_(entidades).each(function(entidade, id) {
				self.__despachar(_.assign({}, telegrama, {destinatario: id}));
			});
		} else {
			self.__despachar(telegrama);
		}
	}
});

module.exports = Correio;