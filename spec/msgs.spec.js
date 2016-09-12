var gea    = require('../src');
var Classe = require('pyoo.js');

describe('A classe Correio', function() {
	it('pode enviar mensagens a agentes diferentes', function() {
		var the_source = gea.Fonte();
		var correio = gea.Correio(the_source);

		var StandBy = Classe(gea.Estado, {
			__init__: function(self, agente) {
				gea.Estado.__init__(self, agente);
			},

			entrar: function(self) {
				self.agente.status = 'standby';
			},

			atualizar: function(self, info, mudarEstado) {
				if (info === 'exilado') {
					mudarEstado(Perseguindo(self.agente));
				}
			}
		});

		var Perseguindo = Classe(gea.Estado, {
			__init__: function(self, agente) {
				gea.Estado.__init__(self, agente);
			},

			entrar: function(self) {
				self.agente.status = 'perseguindo';
			},

			atualizar: function(self, info, mudarEstado) {

			}
		});

		var Smith = Classe(gea.Agente, {
			__init__: function(self, id, fonte, correio) {
				gea.Agente.__init__(self, id, fonte);
				self.status = '';
				self.correio = correio;
				self.fsm.mudarEstado(StandBy(self));
			},

			atualizar: function(self, info) {
				self.fsm.atualizar(info);
				if (info === 'exilado') {
					self.correio.despachar(gea.Telegrama({
						msg: 'AVISTEI_EXILADO',
						remetente: self.id,
						destinatario: 'AGENTE_BROWN'
					}));
				}
			}
		});

		var Brown = Classe(gea.Agente, {
			__init__: function(self, id, fonte, correio) {
				gea.Agente.__init__(self, id, fonte);
				self.status = '';
				self.correio = correio;
				self.fsm.mudarEstado(StandBy(self));
			},

			atualizar: function(self, info) {
				
			},

			receberMensagem: function(self, msg) {
				if (msg.msg === 'AVISTEI_EXILADO') {
					self.fsm.mudarEstado(Perseguindo(self));
				}
			}
		});

		function teste1() {
			var smith = Smith('AGENTE_SMITH', the_source, correio);
			var brown = Brown('AGENTE_BROWN', the_source, correio);

			expect(smith.status).toBe('standby');
			expect(brown.status).toBe('standby');

			smith.atualizar('exilado');

			expect(smith.status).toBe('perseguindo');
			expect(brown.status).toBe('perseguindo');
		}

		teste1();
	});
});