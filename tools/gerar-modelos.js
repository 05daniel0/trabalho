/* Gerador das páginas de modelo + página de listagem. Node puro, sem deps. */
const fs = require("fs");
const path = require("path");
const OUT = "/Users/daniel/Documents/dedv/trabalho";

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Manrope:wght@400;500;600&family=Space+Grotesk:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">`;

const arrow = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function header(active) {
  const item = (href, label, key) =>
    `<li><a href="${href}"${active === key ? ' aria-current="page"' : ""}>${label}</a></li>`;
  return `<header class="site-header">
  <div class="wrap">
    <nav class="nav" aria-label="Navegação principal">
      <a class="brand" href="index.html"><span class="brand__mark" aria-hidden="true">K</span> KRAFTWEG</a>
      <ul class="nav__links" id="nav-links">
        ${item("modelos.html", "Modelos", "modelos")}
        ${item("tecnologia.html", "Tecnologia", "tecnologia")}
        ${item("sobre.html", "Sobre", "sobre")}
        ${item("contato.html", "Contato", "contato")}
      </ul>
      <div class="nav__actions">
        <a class="btn btn--primary btn--sm btn--desktop" href="contato.html#test-drive">Agendar test drive</a>
        <button class="nav__toggle" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="nav-links"><span></span></button>
      </div>
    </nav>
  </div>
</header>`;
}

const FOOTER = `<footer class="site-footer">
  <div class="wrap">
    <div class="footer-top">
      <div>
        <a class="brand" href="index.html"><span class="brand__mark" aria-hidden="true">K</span> KRAFTWEG</a>
        <p class="muted" style="margin-top:1rem;max-width:34ch;font-size:0.9rem">Mobilidade elétrica de alto desempenho, projetada e montada no Brasil.</p>
      </div>
      <div>
        <h4>Modelos</h4>
        <a href="modelo-k3.html">Kraftweg K3</a>
        <a href="modelo-k5.html">Kraftweg K5</a>
        <a href="modelo-kx.html">Kraftweg KX</a>
        <a href="modelo-k7.html">Kraftweg K7</a>
        <a href="modelo-km1.html">Kraftweg KM1</a>
      </div>
      <div>
        <h4>Empresa</h4>
        <a href="sobre.html">Sobre a Kraftweg</a>
        <a href="tecnologia.html">Tecnologia KW-e</a>
        <a href="contato.html">Contato</a>
      </div>
      <div>
        <h4>Atendimento</h4>
        <a href="contato.html#test-drive">Agendar test drive</a>
        <a href="tel:+551140041000">+55 11 4004-1000</a>
        <a href="mailto:ola@kraftweg.com.br">ola@kraftweg.com.br</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; <span data-year>2026</span> KRAFTWEG Motors. Projeto acadêmico fictício, sem fins comerciais.</span>
      <span>Av. das Nações, 2000 - São Paulo, SP</span>
    </div>
  </div>
</footer>

<script src="assets/js/main.js"></script>`;

function page({ title, desc, active, body }) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
${FONTS}
</head>
<body>
${header(active)}
<main>
${body}
</main>
${FOOTER}
</body>
</html>
`;
}

/* ---------------- dados dos modelos ---------------- */
const models = [
  {
    id: "k3", name: "Kraftweg K3", cat: "Sedã compacto", group: "sedan",
    price: "R$ 329.900",
    tagline: "O elétrico de todo dia: leve, rápido de carregar e afiado na cidade.",
    hero: "Um sedã de porte médio com 286 cv e a agilidade de um hatch. Feito para quem troca o primeiro carro a combustão por um elétrico sem abrir mão de dirigir.",
    stats: [["480", "km de autonomia (CLTC)"], ["5,9 s", "0-100 km/h"], ["286 cv", "210 kW"], ["22 min", "recarga 10-80%"]],
    features: [
      ["Pré-condicionamento por app", "Programe o horário de saída e o K3 climatiza a cabine e aquece a bateria antes de você entrar, usando a energia da tomada."],
      ["Condução em uma pedal", "Três níveis de frenagem regenerativa. No mais forte, o carro para sozinho sem tocar no freio e devolve energia à bateria."],
      ["Painel Android Automotive", "Tela de 12,3\" com Google Maps, Spotify e planejador de rota que já considera as paradas de recarga."],
    ],
    colors: [["Branco Ártico", "#e9e9ea"], ["Cinza Basalto", "#5b5d61"], ["Preto Ônix", "#17181a"], ["Azul Voltagem", "#3b5bdb"]],
    specs: {
      "Desempenho": [["Potência", "286 cv (210 kW)"], ["Torque", "430 Nm"], ["0-100 km/h", "5,9 s"], ["Velocidade máxima", "170 km/h"], ["Tração", "Traseira"]],
      "Bateria e recarga": [["Capacidade útil", "60 kWh"], ["Autonomia (CLTC)", "480 km"], ["Recarga DC máx.", "150 kW"], ["10-80% em DC", "22 min"], ["Recarga AC", "11 kW"]],
      "Dimensões": [["Comprimento", "4,62 m"], ["Entre-eixos", "2.810 mm"], ["Porta-malas", "470 L"], ["Peso", "1.720 kg"]],
      "Garantia": [["Veículo", "5 anos"], ["Bateria", "8 anos / 160.000 km"]],
    },
  },
  {
    id: "k5", name: "Kraftweg K5", cat: "Sedã executivo", group: "sedan",
    price: "R$ 449.900",
    tagline: "Silêncio de biblioteca a 120 km/h, com 340 cv sempre à disposição.",
    hero: "O sedã de quem roda muito. Suspensão pneumática, isolamento acústico duplo e um assistente de rodovia que segura o carro na faixa em viagens longas.",
    stats: [["590", "km de autonomia (CLTC)"], ["5,2 s", "0-100 km/h"], ["340 cv", "250 kW"], ["20 min", "recarga 10-80%"]],
    features: [
      ["Suspensão pneumática adaptativa", "Lê o piso 100 vezes por segundo e ajusta cada roda. Abaixa 15 mm na estrada para render mais autonomia."],
      ["Assistente de rodovia nível 2", "Mantém velocidade, distância e centro de faixa. Você continua com as mãos no volante; o carro tira o cansaço da viagem."],
      ["Cabine de vidro duplo", "Todos os vidros são laminados acústicos. O ruído dentro da cabine a 100 km/h fica abaixo de 58 dB."],
    ],
    colors: [["Branco Ártico", "#e9e9ea"], ["Cinza Basalto", "#5b5d61"], ["Preto Ônix", "#17181a"], ["Verde Serra", "#33463a"], ["Azul Voltagem", "#3b5bdb"]],
    specs: {
      "Desempenho": [["Potência", "340 cv (250 kW)"], ["Torque", "560 Nm"], ["0-100 km/h", "5,2 s"], ["Velocidade máxima", "193 km/h"], ["Tração", "Traseira"]],
      "Bateria e recarga": [["Capacidade útil", "84 kWh"], ["Autonomia (CLTC)", "590 km"], ["Recarga DC máx.", "200 kW"], ["10-80% em DC", "20 min"], ["Recarga AC", "11 kW"]],
      "Dimensões": [["Comprimento", "4,96 m"], ["Entre-eixos", "3.000 mm"], ["Porta-malas", "520 L"], ["Peso", "2.090 kg"]],
      "Garantia": [["Veículo", "5 anos"], ["Bateria", "8 anos / 160.000 km"]],
    },
  },
  {
    id: "kx", name: "Kraftweg KX", cat: "SUV", group: "suv",
    price: "R$ 529.900",
    tagline: "Sete lugares, tração integral e 517 cv que não pesam no consumo.",
    hero: "O SUV da família Kraftweg. Dois motores, terceira fileira de bancos e altura de suspensão ajustável para quando o asfalto acaba.",
    stats: [["610", "km de autonomia (CLTC)"], ["4,6 s", "0-100 km/h"], ["517 cv", "380 kW"], ["19 min", "recarga 10-80%"]],
    features: [
      ["Tração integral com desconexão", "Em rodovia, o motor dianteiro se desacopla para economizar energia. Ao detectar escorregamento, religa em 200 ms."],
      ["Teto eletrocrômico", "O vidro panorâmico escurece com um toque, sem cortina. Bloqueia 99% do calor radiante nos dias de sol forte."],
      ["Altura ajustável em 4 níveis", "De 155 mm para autonomia a 210 mm para estradas de terra. Ajuste manual ou automático por velocidade."],
    ],
    colors: [["Branco Ártico", "#e9e9ea"], ["Cinza Basalto", "#5b5d61"], ["Preto Ônix", "#17181a"], ["Verde Serra", "#33463a"], ["Areia Cerrado", "#b9a888"]],
    specs: {
      "Desempenho": [["Potência", "517 cv (380 kW)"], ["Torque", "760 Nm"], ["0-100 km/h", "4,6 s"], ["Velocidade máxima", "200 km/h"], ["Tração", "Integral (2 motores)"]],
      "Bateria e recarga": [["Capacidade útil", "105 kWh"], ["Autonomia (CLTC)", "610 km"], ["Recarga DC máx.", "250 kW"], ["10-80% em DC", "19 min"], ["Recarga AC", "22 kW"]],
      "Dimensões": [["Comprimento", "5,00 m"], ["Entre-eixos", "3.020 mm"], ["Porta-malas", "615 L (2.000 L rebatido)"], ["Peso", "2.510 kg"], ["Lugares", "7"]],
      "Garantia": [["Veículo", "5 anos"], ["Bateria", "8 anos / 160.000 km"]],
    },
  },
  {
    id: "k7", name: "Kraftweg K7", cat: "Sedã de luxo", group: "sedan",
    price: "R$ 789.900",
    tagline: "A poltrona traseira reclina 42°. O motorista chega aos 100 em 4,1 s.",
    hero: "O carro-chefe da Kraftweg. Feito para ser dirigido e para ser levado: bancos traseiros executivos, direção às quatro rodas e 700 km de autonomia.",
    stats: [["700", "km de autonomia (CLTC)"], ["4,1 s", "0-100 km/h"], ["544 cv", "400 kW"], ["18 min", "recarga 10-80%"]],
    features: [
      ["Suíte traseira executiva", "Banco direito reclina até 42° com apoio de pernas, massagem e tela individual. Cortinas elétricas em todos os vidros."],
      ["Direção às quatro rodas", "As rodas traseiras esterçam até 3,5°. Um sedã de 5,39 m que faz retorno em rua estreita como um compacto."],
      ["Tela traseira de 31\"", "Monitor 8K retrátil no teto, com streaming, controle de clima e do carro inteiro pelo tablet dos passageiros."],
    ],
    colors: [["Branco Ártico", "#e9e9ea"], ["Cinza Basalto", "#5b5d61"], ["Preto Ônix", "#17181a"], ["Prata Titânio", "#c7c9cc"], ["Verde Serra", "#33463a"]],
    specs: {
      "Desempenho": [["Potência", "544 cv (400 kW)"], ["Torque", "745 Nm"], ["0-100 km/h", "4,1 s"], ["Velocidade máxima", "210 km/h"], ["Tração", "Integral (2 motores)"]],
      "Bateria e recarga": [["Capacidade útil", "118 kWh"], ["Autonomia (CLTC)", "700 km"], ["Recarga DC máx.", "270 kW"], ["10-80% em DC", "18 min"], ["Recarga AC", "22 kW"]],
      "Dimensões": [["Comprimento", "5,39 m"], ["Entre-eixos", "3.220 mm"], ["Porta-malas", "500 L"], ["Peso", "2.720 kg"]],
      "Garantia": [["Veículo", "5 anos"], ["Bateria", "8 anos / 200.000 km"]],
    },
  },
  {
    id: "km1", name: "Kraftweg KM1", cat: "Cupê de desempenho", group: "performance",
    price: "R$ 1.190.000",
    tagline: "775 cv, torque vetorizado e modo pista. O ápice da engenharia M.",
    hero: "Edição limitada. Três motores, freios carbono-cerâmica e um aerofólio que se levanta sozinho aos 140 km/h. O Kraftweg mais rápido já feito.",
    stats: [["3,0 s", "0-100 km/h"], ["775 cv", "570 kW"], ["275 km/h", "velocidade máxima"], ["520", "km de autonomia (CLTC)"]],
    features: [
      ["Torque vetorizado nas 4 rodas", "Um motor no eixo dianteiro e dois independentes atrás. Cada roda traseira recebe potência própria em curva."],
      ["Modo Pista com telemetria", "Registra tempo de volta, força G e temperatura dos freios. Exporta os dados para análise depois da sessão."],
      ["Aerofólio ativo e freios cerâmicos", "Asa traseira em três posições e discos carbono-cerâmica de 400 mm que não perdem eficiência em uso severo."],
    ],
    colors: [["Branco Ártico", "#e9e9ea"], ["Cinza Basalto", "#5b5d61"], ["Preto Ônix", "#17181a"], ["Amarelo Circuito", "#f2c200"], ["Azul Voltagem", "#3b5bdb"]],
    specs: {
      "Desempenho": [["Potência", "775 cv (570 kW)"], ["Torque", "1.100 Nm"], ["0-100 km/h", "3,0 s"], ["0-200 km/h", "9,4 s"], ["Velocidade máxima", "275 km/h"], ["Tração", "Integral (3 motores)"]],
      "Bateria e recarga": [["Capacidade útil", "90 kWh"], ["Autonomia (CLTC)", "520 km"], ["Recarga DC máx.", "320 kW"], ["10-80% em DC", "17 min"], ["Recarga AC", "22 kW"]],
      "Dimensões": [["Comprimento", "4,78 m"], ["Entre-eixos", "2.900 mm"], ["Porta-malas", "310 L"], ["Peso", "2.180 kg"]],
      "Garantia": [["Veículo", "5 anos"], ["Bateria", "8 anos / 160.000 km"]],
    },
  },
];

const catLabel = { sedan: "Sedã", suv: "SUV", performance: "Desempenho" };

function relatedCards(currentId) {
  return models.filter(m => m.id !== currentId).slice(0, 3).map(m => `
      <article class="model-card">
        <div class="model-card__media">
          <img src="https://picsum.photos/seed/kraftweg-${m.id}-hero/1200/800?grayscale" alt="${m.name}" loading="lazy">
        </div>
        <div class="model-card__body">
          <span class="model-card__cat">${m.cat}</span>
          <h3>${m.name}</h3>
          <p class="model-card__price">a partir de ${m.price}</p>
          <a class="model-card__link" href="modelo-${m.id}.html" aria-label="Ver ${m.name}"></a>
        </div>
      </article>`).join("");
}

function modelPage(m) {
  const stats = m.stats.map(s => `<div class="stat"><b>${s[0]}</b><span>${s[1]}</span></div>`).join("");
  const features = m.features.map(f => `
        <div class="pillar reveal">
          <h3>${f[0]}</h3>
          <p class="muted">${f[1]}</p>
        </div>`).join("");

  const swatches = m.colors.map(c => `<span class="swatch"><i style="background:${c[1]}"></i>${c[0]}</span>`).join("");

  const specGroups = Object.entries(m.specs).map(([g, rows]) => `
        <div class="spec-group">
          <h4>${g}</h4>
          <dl>
            ${rows.map(r => `<div class="row"><dt>${r[0]}</dt><dd>${r[1]}</dd></div>`).join("\n            ")}
          </dl>
        </div>`).join("");

  const body = `
<section class="hero hero--compact">
  <div class="hero__media">
    <img src="https://picsum.photos/seed/kraftweg-${m.id}-hero/1920/1080?grayscale" alt="${m.name} em ambiente de estúdio">
  </div>
  <div class="wrap">
    <div class="hero__inner">
      <p class="crumbs"><a href="modelos.html">Modelos</a> / ${m.name}</p>
      <p class="eyebrow" style="margin-top:1rem">${m.cat}</p>
      <h1 class="h-display">${m.name}</h1>
      <p class="lead">${m.tagline}</p>
      <p class="model-card__price" style="font-size:1rem;margin-top:0.5rem">a partir de ${m.price}</p>
      <div class="hero__cta">
        <a class="btn btn--primary" href="contato.html#test-drive">Agendar test drive</a>
        <a class="btn btn--ghost" href="#ficha">Ver ficha técnica</a>
      </div>
    </div>
  </div>
</section>

<section class="section--tight">
  <div class="wrap">
    <p class="prose reveal">${m.hero}</p>
    <div class="stat-row reveal" style="margin-top:2.5rem">${stats}</div>
  </div>
</section>

<section class="section divider">
  <div class="wrap">
    <div class="split" style="align-items:start">
      <div class="reveal" style="position:sticky;top:120px">
        <h2 class="h-section" style="max-width:16ch">Feito para dirigir, não só para ligar.</h2>
      </div>
      <div>${features}
      </div>
    </div>
  </div>
</section>

<section class="section divider">
  <div class="wrap">
    <div class="stack reveal" style="max-width:48ch">
      <h2 class="h-section">Cores</h2>
      <p class="muted">Pintura sólida sem custo. Metálicas e o teto preto contrastante são opcionais de fábrica.</p>
    </div>
    <div class="colorways reveal" style="margin-top:2rem">${swatches}</div>
  </div>
</section>

<section class="section divider" id="ficha">
  <div class="wrap">
    <div class="stack reveal" style="max-width:48ch">
      <h2 class="h-section">Ficha técnica</h2>
      <p class="muted">Valores de referência do projeto acadêmico fictício KRAFTWEG.</p>
    </div>
    <div class="spec-groups reveal" style="margin-top:2.5rem">${specGroups}
    </div>
  </div>
</section>

<section class="section divider">
  <div class="wrap">
    <h2 class="h-section reveal" style="margin-bottom:2rem">Outros modelos</h2>
    <div class="grid grid--3">${relatedCards(m.id)}
    </div>
  </div>
</section>

<section class="section--tight">
  <div class="wrap">
    <div class="cta-band reveal">
      <div class="stack-sm">
        <h2 class="h-sub">Quer sentir o ${m.name} na rua?</h2>
        <p class="muted">Agende um test drive gratuito na concessionária mais perto de você.</p>
      </div>
      <a class="btn btn--primary" href="contato.html#test-drive">Agendar test drive</a>
    </div>
  </div>
</section>`;

  return page({
    title: `${m.name} | ${m.cat} elétrico KRAFTWEG`,
    desc: `${m.name}: ${m.tagline} Ficha técnica, cores e test drive.`,
    active: "modelos",
    body,
  });
}

/* ---------------- página de listagem ---------------- */
function modelosPage() {
  const cards = models.map(m => `
      <article class="model-card" data-model="${m.group}">
        <div class="model-card__media">
          <img src="https://picsum.photos/seed/kraftweg-${m.id}-hero/1200/800?grayscale" alt="${m.name}" loading="lazy">
        </div>
        <div class="model-card__body">
          <span class="model-card__cat">${m.cat}</span>
          <h3>${m.name}</h3>
          <p class="muted" style="font-size:0.92rem">${m.tagline}</p>
          <div class="model-card__specs">
            <div><b>${m.stats[0][0]}</b><span>${m.stats[0][1]}</span></div>
            <div><b>${m.stats[1][0]}</b><span>${m.stats[1][1]}</span></div>
          </div>
          <p class="model-card__price">a partir de ${m.price}</p>
          <a class="model-card__link" href="modelo-${m.id}.html" aria-label="Ver ${m.name}"></a>
        </div>
      </article>`).join("");

  const body = `
<section class="hero hero--compact hero--tight">
  <div class="wrap">
    <div class="hero__inner">
      <p class="eyebrow">Linha 2026</p>
      <h1 class="h-display">A linha completa.</h1>
      <p class="lead">Cinco modelos sobre a mesma plataforma KW-e. Do sedã de entrada ao cupê de edição limitada.</p>
    </div>
  </div>
</section>

<section class="section--tight">
  <div class="wrap">
    <div class="filters" data-filters aria-label="Filtrar modelos por categoria">
      <button type="button" data-filter="all" aria-pressed="true">Todos</button>
      <button type="button" data-filter="sedan" aria-pressed="false">Sedãs</button>
      <button type="button" data-filter="suv" aria-pressed="false">SUV</button>
      <button type="button" data-filter="performance" aria-pressed="false">Desempenho</button>
    </div>
    <div class="grid grid--3" style="margin-top:2.5rem">${cards}
    </div>
  </div>
</section>

<section class="section--tight divider">
  <div class="wrap">
    <div class="cta-band reveal">
      <div class="stack-sm">
        <h2 class="h-sub">Ainda em dúvida entre dois modelos?</h2>
        <p class="muted">Nossa equipe monta uma comparação com base no seu trajeto e na sua garagem.</p>
      </div>
      <a class="btn btn--primary" href="contato.html">Falar com a Kraftweg</a>
    </div>
  </div>
</section>`;

  return page({
    title: "Modelos KRAFTWEG - 5 carros elétricos",
    desc: "Conheça a linha KRAFTWEG 2026: K3, K5, KX, K7 e KM1. Autonomia, desempenho e preços.",
    active: "modelos",
    body,
  });
}

/* ---------------- escrever ---------------- */
for (const m of models) {
  fs.writeFileSync(path.join(OUT, `modelo-${m.id}.html`), modelPage(m));
  console.log("modelo-" + m.id + ".html");
}
fs.writeFileSync(path.join(OUT, "modelos.html"), modelosPage());
console.log("modelos.html");
