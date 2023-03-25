# Web Maker Slider
Slider/Carrossel simples de usar, extensível e com várias opções de customização, construído com vanilla javascript.

### Sumário

- [Como Usar](#como-usar)
- [Atributos HTML de configuração](#atributos-html-de-configuração-do-wm-sliderwm-slider)
- [Atributos HTML de uso](#atributos-html-de-uso-do-wm-sliderwm-slider)
- [Propriedades CSS](#propriedades-css-do-wm-sliderwm-slider)

## Como Usar
1. Adicione as seguintes linhas de código à tag ``<head>`` do seu HTML:

```
<!-- Web Maker Slider -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JoaoGSoek/WMSlider/slider.css">
<script src="https://cdn.jsdelivr.net/gh/JoaoGSoek/WMSlider/slider.js"></script>
```

2. Envolva todo o conteúdo HTML que fará parte do slider com as tags:
``<wm-slider id="meu-slider"></wm-slider>``
3. Não esqueça de substituir o id por um valor único para cada slider ;)
4. Use o elemento ``<button is="wm-slider-trigger" slider="meu-slider"></button>`` para criar botões de navegação para o seu slider
    1. No atributo ``slider`` digite o id do slider que seu botão deve controlar
5. Para que seus botões consigam deslizar seu slider, atribua um dos seguintes valores ao atributo ``slide-to``:
    1. **left**: (``slide-to="left"``) para deslizar o carrossel para a esquerda.
    2. **right**: (``slide-to="right"``) para deslizar o carrossel para a direita.
    3. **Qualquer valor númerico**: (``slide-to="0"``) para deslizar o carrossel para o elemento na posição 0.
6. **Divirta-se!**

## Atributos HTML de configuração do ``<wm-slider></wm-slider>``
- **draggable**: Disponibiliza a navegação através dos eventos de "clique-e-arraste" do mouse (``<wm-slider draggable></wm-slider>``)
- **infinite**: Ativa o efeito de navegação infinita (``<wm-slider infinite></wm-slider>``)
- **auto-slide**: Ativa o deslize automático do carrossel dentro do intervalo determinado - definido em ms (``<wm-slider auto-slide="1000"></wm-slider>``)

## Atributos HTML de uso do ``<wm-slider></wm-slider>``
- **active**: Determina qual, elemento dentro do carrossel, e qual botão, está ativo
    - Pode ser definido direto no HTML para determinar qual elemento deve iniciar ativado:
    ```
    <wm-slider id="meu-slider">
      <div></div>
      <div active></div> <!-- Elemento Ativo -->
      <div></div>
    </wm-slider>
    <button is="wm-slider-trigger" slider="meu-slider" slide-to="0"></button>
    <button is="wm-slider-trigger" slider="meu-slider" slide-to="1" active></button> <!-- Botão Ativo -->
    <button is="wm-slider-trigger" slider="meu-slider" slide-to="2"></button>
    ```
- **dragging**: Inserido ao carrossel quando o usuário navegar através de "clique-e-arraste"

## Propriedades CSS do ``<wm-slider></wm-slider>``
- **--active-element-align**: Alinha o elemento ativo à posição indicada:
    - **--active-element-align: left;**: Alinha o elemento ativo à esquerda (Valor padrão)
    - **--active-element-align: center;**: Alinha o elemento ativo ao centro
    - **--active-element-align: right;**: Alinha o elemento ativo à direita
- **--indexed-element-amount**: Quantidade de elementos que o carrossel deve exibir por vez (valor padrão: 1)
- **--element-sliding-amount**: Quantidade de elementos que o carrossel deve deslizar por vez (valor padrão: 1)
- **--slide-duration**: Tempo em ms que o deslize do carrossel deve durar (valor padrão: 500)

