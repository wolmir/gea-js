var Classe = require('pyoo.js');

var Telegrama = Classe({
	__init__: function(self, config) {
		self.msg            = null;
		self.conteudo       = null;
		self.remetente      = null;
		self.destinatario   = null;
		self.tempo_despacho = 0;

		if (config) {
			self.msg            = config.msg;
			self.conteudo       = config.conteudo;
			self.remetente      = config.remetente;
			self.destinatario   = config.destinatario;
			self.tempo_despacho = config.tempo_despacho;
		}
	}
});

module.exports = Telegrama;