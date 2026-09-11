# KRAFTWEG — site institucional (projeto acadêmico)

Site fictício de uma montadora de carros elétricos. Nomes da linha inspirados na
nomenclatura da BMW (K3 ≈ Série 3 / i4, K5 ≈ i5, KX ≈ iX, K7 ≈ i7, KM1 ≈ linha M).

**Empresa e todos os dados são fictícios, sem fins comerciais.**

## Stack

HTML + CSS + JavaScript puro. Sem build, sem dependências. Basta abrir os arquivos
ou servir a pasta como estática.

```
index.html            Página inicial
modelos.html          Lista dos 5 modelos (com filtro por categoria)
modelo-k3.html        Detalhe — Kraftweg K3 (sedã compacto)
modelo-k5.html        Detalhe — Kraftweg K5 (sedã executivo)
modelo-kx.html        Detalhe — Kraftweg KX (SUV)
modelo-k7.html        Detalhe — Kraftweg K7 (sedã de luxo)
modelo-km1.html       Detalhe — Kraftweg KM1 (cupê de desempenho)
tecnologia.html       A plataforma KW-e
sobre.html            História e equipe
contato.html          Formulário de test drive (valida no navegador, não envia nada)
assets/css/style.css  Sistema de design (tema escuro, acento azul-gelo)
assets/js/main.js     Menu mobile, animações de scroll, filtro, validação
tools/gerar-modelos.js  Gera as páginas de modelo e modelos.html a partir de um objeto de dados
```

## Rodar localmente

```bash
cd trabalho
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Regenerar as páginas de modelo

Para mudar specs, preços ou textos dos carros, edite o objeto `models` em
`tools/gerar-modelos.js` e rode:

```bash
node tools/gerar-modelos.js
```

## Imagens

Todas as imagens são placeholders de `picsum.photos` (em preto e branco).
Para a versão final, troque pelas fotos reais. Os pontos estão marcados no HTML
com comentários `<!-- TODO imagem: ... -->`.

O site usa **4 proporções**. Gere/exporte nesses tamanhos (o CSS recorta pelo
centro com `object-fit: cover`, então pequenas diferenças de enquadramento não
quebram nada — só mantenha o carro centralizado):

Cada carro usa **1 única foto (16:9)**, reaproveitada em todo lugar que mostra
o modelo — hero da própria página, cartão na home, na lista de modelos e em
"outros modelos" — cada lugar recortando um pedaço diferente da mesma imagem
via `object-fit: cover`. **5 fotos no total** para os 5 carros, mais 3
opcionais (hero da home, da Tecnologia e do Sobre). Ver `PROMPTS-IMAGENS.md`
para os prompts exatos.

As imagens têm um filtro `grayscale`/`contrast` no CSS (visual escuro do site).
Ao colocar fotos coloridas de verdade, ajuste ou remova esses filtros em
`assets/css/style.css` (procure por `filter: grayscale`).

## Publicar no GitHub Pages

1. Criar um repositório e enviar esta pasta para a branch `main`.
2. Em **Settings → Pages**, escolher **Deploy from a branch**, branch `main`, pasta `/ (root)`.
3. O arquivo `.nojekyll` já está incluído para o Pages servir tudo sem processar.
4. O site fica em `https://<usuario>.github.io/<repositorio>/`.

Todos os links internos são relativos, então funciona em subpasta sem ajustes.
