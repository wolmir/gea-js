var Classe = require('pyoo.js');

var Telegrama = Classe({
	__init__: function(self) {
		self.msg            = null;
		self.conteudo       = null;
		self.remetente      = null;
		self.destinatario   = null;
		self.tempo_despacho = 0;
	}
});

module.exports = Telegrama;