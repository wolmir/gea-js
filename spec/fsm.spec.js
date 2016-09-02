var gea    = require('../src');
var Classe = require('pyoo.js');

describe('Uma máquina de estados', function() {
	it('deve instanciar sem problemas', function() {
		expect(gea.MaquinaDeEstados()).toBeDefined();
	});

	it('deve trocar estados corretamente', function() {
		var Acesa = Classe(gea.Estado, {
			__init__: function(self, entidade) {
				gea.Estado.__init__(self, entidade);
			},

			entrar: function(self) {
				self.entidade.acesa = true;
			},

			sair: function(self) {

			}
		});

		var Apagada = Classe(gea.Estado, {
			__init__: function(self, entidade) {
				gea.Estado.__init__(self, entidade);
			},

			entrar: function(self) {
				self.entidade.acesa = false;
			},

			sair: function(self) {

			}
		});

		var Lampada = Classe({
			__init__: function(self) {
				self.acesa = false;
				self.fsm = gea.MaquinaDeEstados();
				self.fsm.mudarEstado(Apagada(self));
			}
		});

		var lampada1 = function() {
			return Lampada();
		};

		var lampada2 = function() {
			var lamp = Lampada();
			lamp.fsm.mudarEstado(Acesa(lamp));
			return lamp;
		}

		expect(lampada1().acesa).toBe(false);
		expect(lampada2().acesa).toBe(true);
	});
});