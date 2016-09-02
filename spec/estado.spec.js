var gea    = require('../src');
var Classe = require('pyoo.js');

describe('Estado', function() {
	it('deve instanciar com uma entidade definida.', function() {
		var tentativa = function() {
			var EntidadeTeste = Classe({
				__init__: function(self) {
					self.propriedade = null;
				}
			});

			return gea.Estado(EntidadeTeste());
		};

		expect(tentativa()).toBeDefined();
	});


	it('deve deflagrar um erro ao ser instanciado com uma entidade vazia', function() {
		var tentativa = function() {
			gea.Estado();
		};

		expect(tentativa).toThrowError('Estado::__init__ >> "entidade" deve ser um objeto definido.');
	});
});