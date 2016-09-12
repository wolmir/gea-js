var gea    = require('../src');
var Classe = require('pyoo.js');

describe('Uma máquina de estados', function() {
	it('deve instanciar sem problemas', function() {
		expect(gea.Maquina()).toBeDefined();
	});

	it('deve trocar estados corretamente', function() {
		var Acesa = Classe(gea.Estado, {
			__init__: function(self, agente) {
				gea.Estado.__init__(self, agente);
			},

			entrar: function(self) {
				self.agente.acesa = true;
			},

			sair: function(self) {

			}
		});

		var Apagada = Classe(gea.Estado, {
			__init__: function(self, agente) {
				gea.Estado.__init__(self, agente);
			},

			entrar: function(self) {
				self.agente.acesa = false;
			},

			sair: function(self) {

			}
		});

		var Lampada = Classe({
			__init__: function(self) {
				self.acesa = false;
				self.fsm = gea.Maquina();
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


	it('deve permitir comportamentos de alarme', function() {
		var Alarme = Classe(gea.Estado, {
			__init__: function(self, agente) {
				gea.Estado.__init__(self, agente);
			},

			atualizar: function(self, info, mudarEstado) {
				if (info === 'desligar alarme') {
					self.agente.fsm.reverter();
				}
			},

			entrar: function(self) {
				self.agente.status = 'Em alarme!';
			},

			sair: function(self) {}
		});

		var StandBy = Classe(gea.Estado, {
			__init__: function(self, agente) {
				gea.Estado.__init__(self, agente);
			},

			atualizar: function(self, info, mudarEstado) {
				if (info === 'limpar') {
					mudarEstado(Limpando(self.agente));
				}
			},

			entrar: function(self) {
				self.agente.status = 'Descansando!';
			},

			sair: function(self) {}
		});

		var Limpando = Classe(gea.Estado, {
			__init__: function(self, agente) {
				gea.Estado.__init__(self, agente);
			},

			atualizar: function(self, info, mudarEstado) {
				if (info === 'descansar') {
					mudarEstado(StandBy(self.agente));
				}
			},

			entrar: function(self) {
				self.agente.status = 'Limpando!';
			},

			sair: function(self) {}
		});


		var Tranquilo = Classe(gea.Estado, {
			__init__: function(self, agente) {
				gea.Estado.__init__(self, agente);
				self.fsm = gea.Maquina();
				self.fsm.mudarEstado(StandBy(self.agente));
			},

			atualizar: function(self, info, mudarEstado) {
				self.fsm.atualizar(info);
				if (info === 'alarme') {
					mudarEstado(Alarme(self.agente));
				}
			},

			entrar: function(self) {
				self.fsm.estado_atual.entrar();
			},

			sair: function(self) {
				self.fsm.estado_atual.sair();
			}
		});


		var RoboDomestico = Classe({
			__init__: function(self) {
				self.status = null;
				self.fsm = gea.Maquina();
				self.fsm.mudarEstado(Tranquilo(self));
			},

			atualizar: function(self, info) {
				self.fsm.atualizar(info);
			}
		});

		function teste1() {
			return RoboDomestico();
		}

		expect(teste1()).toBeDefined();
		expect(teste1().status).toBe('Descansando!');

		function teste2() {
			var robo = RoboDomestico();
			robo.atualizar('limpar');
			return robo;
		}

		expect(teste2().status).toBe('Limpando!');

		function teste3() {
			var robo = RoboDomestico();
			robo.atualizar('limpar');
			robo.atualizar('alarme');
			return robo;
		}

		expect(teste3().status).toBe('Em alarme!');

		function teste4() {
			var robo = RoboDomestico();
			robo.atualizar('limpar');
			robo.atualizar('alarme');
			robo.atualizar('desligar alarme');
			return robo;
		}

		expect(teste4().status).toBe('Limpando!');

		function teste5() {
			var robo = RoboDomestico();
			robo.atualizar('limpar');
			robo.atualizar('descansar');
			robo.atualizar('alarme');
			robo.atualizar('desligar alarme');
			return robo; 
		}

		expect(teste5().status).toBe('Descansando!');
	});
});