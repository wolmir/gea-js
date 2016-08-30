# GEA-JS
State manager for JavaScript apps based on Matt Buckland's FSM architecture

Esse é um gerenciador de estados para apps em JavaScript baseado no
trabalho de Matt Buckland (Programming Game AI by Example).

## Introdução

O desenvolvimento front-end para web está vada vez mais complexo.
Essa complexidadade está concentrada no controle (ou falta de)
do estado da aplicação. O primeiro passo para efetuar esse controle
é tornar os estados explícitos.

Em seu livro, Matt Buckland expõe uma implementação do padrão de design
"State" que é simples e genérica. Esse repositório contém uma implementação
dessa arquitetura em JavaScript.

## Mas Flux e Redux não fazem a mesma coisa?

Fazem. A diferença está no controle de transição de estados.
No Flux a transição do estado da aplicação se dá
pelos **dispatchers**. No Redux, através dos **reducers**.

O problema é que, em ambos, a determinação do novo estado
é feita manualmente. Isso se traduz em um **switch**
enorme, contendo todas as possíveis variações do estado
anterior e da ação sendo despachada.

A arquitetura de Matt explicita essas transições em uma
máquina de estados finita. Nela, cada estado é responsável
por calcular o próximo estado.
