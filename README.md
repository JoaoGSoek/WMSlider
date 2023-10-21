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
    1. **left||top**: (``slide-to="left||top"``) para deslizar o carrossel para a esquerda - se left - ou para o topo - se top.
    2. **right||bottom**: (``slide-to="right||bottom"``) para deslizar o carrossel para a direita - se right - ou para o fundo - se bottom.
    3. **Qualquer valor númerico**: (``slide-to="0"``) para deslizar o carrossel para o elemento na posição 0.
6. **Divirta-se!**

## Atributos HTML de configuração do ``<wm-slider></wm-slider>``
- **draggable**: Disponibiliza a navegação através dos eventos de "clique-e-arraste" do mouse (``<wm-slider draggable></wm-slider>``)
- **infinite**: Ativa o efeito de navegação infinita (``<wm-slider infinite></wm-slider>``)
- **auto-slide**: Ativa o deslize automático do carrossel dentro do intervalo determinado - definido em ms (``<wm-slider auto-slide="1000"></wm-slider>``)
- **vertical**: Determina que o deslize será vertical - por padrão, o deslize é horizontal (``<wm-slider vertical></wm-slider>``)

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
    - **--active-element-align: left||top;**: Alinha o elemento ativo à esquerda - se left - ou ao topo, para sliders verticais - se top (Valor padrão)
    - **--active-element-align: center;**: Alinha o elemento ativo ao centro
    - **--active-element-align: right||bottom;**: Alinha o elemento ativo à direita - se right - ou ao fundo, para sliders verticais - se bottom
- **--indexed-element-amount**: Quantidade de elementos que o carrossel deve exibir por vez (valor padrão: 1)
- **--element-sliding-amount**: Quantidade de elementos que o carrossel deve deslizar por vez (valor padrão: 1)
- **--slide-duration**: Tempo em ms de duração do deslize do carrossel (valor padrão: 500)
- **--clip-unreachable-element**: Define se os elementos inalcansáveis devem ser ativados. Essa propriedade possui valor lógico inverso - isto é - true define que estes elementos não devem ser ativados. Essa propriedade não produz efeito em sliders com **--active-element-align: center;**. (valor padrão: false)
