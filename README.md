# **Pokémon-Style RPG Game**

Um jogo de aventura inspirado na franquia Pokémon, criado com HTML, JavaScript e o poder do `canvas` para gráficos 2D. Explore um mundo aberto, enfrente batalhas emocionantes e interaja com o ambiente enquanto se move pela cidade e áreas selvagens.

## **Prévia do Jogo**

![Gameplay Preview](./assets/img/preview.gif)

### **Características**
- **Movimento do personagem**: Use as setas ou as teclas `WASD` para movimentar o personagem.
- **Batalhas Pokémon**: Ao entrar nas zonas de batalha, você será desafiado a enfrentar outros Pokémon!
- **Ambiente dinâmico**: Interaja com o mapa e colida com obstáculos enquanto explora o mundo.
- **Sprites animados**: O jogador e os Pokémon possuem animações de movimento.
  
---

## **Tecnologias Usadas**

- **HTML5**
- **CSS3** (para estrutura e estilo básico)
- **JavaScript** (Canvas, manipulação de imagens e lógica do jogo)
- **GSAP** (para animações suaves de transições e interações)

---

## **Instruções de Instalação**

1. Clone o repositório ou baixe o código:

    ```bash
    git clone https://github.com/seu-usuario/pokemon-style-rpg.git
    ```

2. Abra o arquivo `index.html` em seu navegador favorito.

    ```bash
    open index.html
    ```

---

## **Como Jogar**

- **Movimentação**: Use as teclas `W`, `A`, `S`, `D` ou as setas para mover o personagem pelo mapa.
- **Batalhas**: Quando você entrar em uma zona de batalha, uma tela de batalha Pokémon será ativada. Prepare-se para enfrentar desafios!
- **Interações**: O personagem pode interagir com zonas específicas do mapa e objetos no cenário.

---

## **Estrutura do Projeto**

- **`index.html`**: O arquivo principal que carrega o jogo no navegador.
- **`assets/`**: Contém todas as imagens e recursos utilizados no jogo.
    - `player/`: Imagens dos personagens e seus sprites.
    - `pokemon/`: Sprites dos Pokémon do jogo.
    - `map/`: Imagens do cenário e fundo.
    - `battleBackground/`: Imagem do fundo para batalhas.
- **`engine/`**: Contém o código principal que gerencia o funcionamento do jogo, como a movimentação do jogador, colisões e animações.
- **`maps/`**: Armazena as informações sobre o mapa, como zonas de colisão e zonas de batalha.
- **`utils.js`**: Funções auxiliares como cálculo de colisões e manipulação de objetos.

---

## **Como Contribuir**

1. Faça um fork deste repositório.
2. Crie sua branch para a feature que deseja adicionar (`git checkout -b minha-nova-feature`).
3. Commit suas alterações (`git commit -am 'Adiciona nova feature'`).
4. Envie para o repositório remoto (`git push origin minha-nova-feature`).
5. Crie uma Pull Request.

---

## **Licença**

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## **Contato**

- **Desenvolvedor**: Suguru Assassino
- **GitHub**: [https://github.com/seu-usuario](https://github.com/seu-usuario)
- **Email**: seuemail@dominio.com

---

### **Imagens e Recursos**

- [Link para o Pokémon](https://www.pokemon.com) para inspiração.
- Créditos aos desenvolvedores de bibliotecas como **GSAP** e **HTML5**.
