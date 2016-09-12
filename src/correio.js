require('./telegrama');
require('./fonte');

var Classe = require('pyoo.js');
var _ = require('lodash');

var DestinatarioNaoEncontradoException = Classe({
	__init__: function(self, destinatario) {
		self.nome = 'DestinatarioNaoEncontradoException';
		self.destinatario = destinatario;
	},

	erro: function(self) {
		return new Error(self.nome + ' >> agente id: ' + self.destinatario + ' não foi encontrado!');
	}
});

var Correio = Classe({

	BROADCAST: 'BROADCAST',

	__init__: function(self, fonte) {
		self.fonte = fonte;
	},

	__despachar: function(self, telegrama) {
		var destino = self.fonte.getAgente(telegrama.destinatario);

		if (!destino) {
			throw DestinatarioNaoEncontradoException(telegrama.destinatario).erro();
		}

		destino.receberMensagem(telegrama);
	},

	despachar: function(self, telegrama) {
		if (telegrama.tempo_despacho > 0) {
			setTimeout(function() {
				telegrama.tempo_despacho = 0;
				self.despachar(telegrama)
			}, telegrama.tempo_despacho);
		} else if (telegrama.destinatario === Correio.BROADCAST) {
			var entidades = self.fonte.getTodosAgentes();
			_(entidades).each(function(entidade, id) {
				self.__despachar(_.assign({}, telegrama, {destinatario: id}));
			});
		} else {
			self.__despachar(telegrama);
		}
	}
});

module.exports = Correio;