
const prayers = {
  creed: {
    title: "Creio",
    icon: "✝",
    text: "Creio em Deus Pai todo-poderoso, criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor, que foi concebido pelo poder do Espírito Santo; nasceu da Virgem Maria; padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus; está sentado à direita de Deus Pai todo-poderoso, donde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo, na santa Igreja Católica, na comunhão dos santos, na remissão dos pecados, na ressurreição da carne e na vida eterna. Amém."
  },

  ourFather: {
    title: "Pai-Nosso",
    icon: "🙏",
    text: "Pai nosso, que estais nos céus, santificado seja o vosso nome; venha a nós o vosso Reino; seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém."
  },

  hailMary: {
    title: "Ave-Maria",
    icon: "🌹",
    text: "Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora de nossa morte. Amém."
  },

  glory: {
    title: "Glória ao Pai",
    icon: "✨",
    text: "Glória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém."
  },

  fatima: {
    title: "Oração de Fátima",
    icon: "🕊️",
    text: "Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno; levai as almas todas para o céu e socorrei principalmente as que mais precisarem da vossa misericórdia. Amém."
  },

  salveRainha: {
    title: "Salve-Rainha",
    icon: "🌹",
    text: "Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos, os degredados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei. E depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre. Ó clemente, ó piedosa, ó doce sempre Virgem Maria. Rogai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém."
  },

  sign: {
    title: "Sinal da Cruz",
    icon: "✝",
    text: "Em nome do Pai, e do Filho, e do Espírito Santo. Amém."
  }
};

const mysterySets = {
  gozosos: [
    "A Anunciação do Anjo a Maria",
    "A Visitação de Maria a Isabel",
    "O Nascimento de Jesus em Belém",
    "A Apresentação do Menino Jesus no Templo",
    "A Perda e o Encontro do Menino Jesus no Templo"
  ],

  luminosos: [
    "O Batismo de Jesus no Rio Jordão",
    "A autorrevelação de Jesus nas Bodas de Caná",
    "O Anúncio do Reino de Deus",
    "A Transfiguração de Jesus",
    "A Instituição da Eucaristia"
  ],

  dolorosos: [
    "A Agonia de Jesus no Horto",
    "A Flagelação de Jesus",
    "A Coroação de espinhos",
    "Jesus carrega a cruz até o Calvário",
    "A Crucificação e Morte de Jesus"
  ],

  gloriosos: [
    "A Ressurreição de Jesus",
    "A Ascensão de Jesus ao Céu",
    "A Vinda do Espírito Santo",
    "A Assunção de Maria ao Céu",
    "A Coroação de Maria como Rainha do Céu e da Terra"
  ]
};

let selectedMystery = "gozosos";
let sequence = [];
let currentIndex = 0;
let guidedMode = false;

function findIndexById(id) {
  return sequence.findIndex(item => item.id === id);
}

function buildSequence() {
  sequence = [];

  // Orações iniciais: do crucifixo em direção ao laço.
  sequence.push({
    ...prayers.creed,
    id: "creed",
    subtitle: "No crucifixo"
  });

  sequence.push({
    ...prayers.ourFather,
    id: "opening-ourfather",
    subtitle: "Pai-Nosso inicial"
  });

  for (let i = 1; i <= 3; i++) {
    sequence.push({
      ...prayers.hailMary,
      id: `opening-hail-${i}`,
      subtitle: `Ave-Maria inicial ${i} de 3`
    });
  }

  sequence.push({
    ...prayers.ourFather,
    id: "opening-ourfather-end",
    subtitle: "Pai-Nosso após as três Ave-Marias"
  });

  // Cada mistério: anúncio, Pai-Nosso, dez Ave-Marias,
  // Glória ao Pai e, opcionalmente, Oração de Fátima.
  for (let decade = 0; decade < 5; decade++) {
    const mystery = mysterySets[selectedMystery][decade];

    sequence.push({
      id: `mystery-${decade}`,
      title: `Mistério ${decade + 1}`,
      subtitle: "Anúncio e meditação",
      icon: "🕊️",
      text: `Medite neste mistério: ${mystery}.`,
      mystery,
      type: "mystery"
    });

if (decade !== 0) {
  sequence.push({
    ...prayers.ourFather,
    id: `decade-${decade}-ourfather`,
    subtitle: `Pai-Nosso da ${decade + 1}ª dezena`,
    mystery
  });
}

    for (let bead = 1; bead <= 10; bead++) {
      sequence.push({
        ...prayers.hailMary,
        id: `decade-${decade}-hail-${bead}`,
        subtitle: `${decade + 1}ª dezena · Ave-Maria ${bead} de 10`,
        mystery
      });
    }

    sequence.push({
      ...prayers.glory,
      id: `decade-${decade}-glory`,
      subtitle: `Glória ao Pai · fim da ${decade + 1}ª dezena`,
      mystery
    });

    sequence.push({
      ...prayers.fatima,
      id: `decade-${decade}-fatima`,
      subtitle: "Oração de Fátima · opcional",
      mystery
    });
  }

  sequence.push({
    ...prayers.salveRainha,
    id: "salve-rainha",
    subtitle: "Após os cinco mistérios"
  });

  sequence.push({
    ...prayers.sign,
    id: "final-sign",
    subtitle: "Encerramento do terço"
  });
}

function createSvgElement(name, attributes = {}) {
  const element = document.createElementNS(
    "http://www.w3.org/2000/svg",
    name
  );

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  return element;
}

function calculatePositions() {
  const points = [];

  // Contorno alongado e irregular, inspirado na referência.
  const pathData = [
    "M 230 402",
    "C 190 377, 126 344, 112 286",
    "C 97 226, 96 155, 143 105",
    "C 178 65, 231 59, 270 83",
    "C 305 104, 314 147, 320 194",
    "C 347 207, 377 237, 365 276",
    "C 352 327, 283 377, 230 402",
    "Z"
  ].join(" ");

  const hiddenPath = createSvgElement("path", {
    d: pathData,
    fill: "none",
    stroke: "none"
  });

  const svg = document.getElementById("rosary");
  svg.appendChild(hiddenPath);

  const totalLength = hiddenPath.getTotalLength();

  // Cinquenta Ave-Marias e cinco contas principais.
  for (let i = 0; i < 55; i++) {
    const decade = Math.floor(i / 11);
    const position = i % 11;
    const distance = (i / 55) * totalLength;
    const point = hiddenPath.getPointAtLength(distance);

const id = position === 0
  ? `decade-${decade}-ourfather`
  : `decade-${decade}-hail-${position}`;

// Esconde somente a conta Pai-Nosso da primeira dezena.
if (decade === 0 && position === 0) {
  continue;
}

points.push({
  x: point.x,
  y: point.y,
  id,
  seqIndex: findIndexById(id),
  kind: position === 0 ? "separator" : "small",
  label: position === 0 ? "P" : ""
});
  }

  hiddenPath.remove();

  // Haste inicial. Do crucifixo para cima:
  // Pai-Nosso, três Ave-Marias e outro Pai-Nosso.
  const stem = [
    {
      id: "opening-ourfather-end",
      x: 230, y: 461,
      kind: "separator", label: "P"
    },
    {
      id: "opening-hail-3",
      x: 230, y: 479,
      kind: "small", label: ""
    },
    {
      id: "opening-hail-2",
      x: 230, y: 497,
      kind: "small", label: ""
    },
    {
      id: "opening-hail-1",
      x: 230, y: 515,
      kind: "small", label: ""
    },
    {
      id: "opening-ourfather",
      x: 230, y: 535,
      kind: "large", label: "P"
    }
  ];

  stem.forEach(point => {
    points.push({
      ...point,
      seqIndex: findIndexById(point.id)
    });
  });

  return { points, pathData };
}

function renderRosary() {
  const lines = document.getElementById("rosaryLines");
  const beads = document.getElementById("rosaryBeads");

  lines.replaceChildren();
  beads.replaceChildren();

  const { points, pathData } = calculatePositions();

  // Caminho contínuo do rosário.
  lines.appendChild(createSvgElement("path", {
    d: pathData
  }));

// Linha que liga o terço à haste e à conta do Pai-Nosso.
lines.appendChild(createSvgElement("path", {
  d: "M 230 402 L 230 535 L 230 550"
}));

  points.forEach(point => {
    const item = sequence[point.seqIndex];
    if (!item) return;

    const isSelected = point.seqIndex === currentIndex;
    const isSmall = point.kind === "small";

    const group = createSvgElement("g", {
      class: [
        "bead",
        point.kind,
        isSelected ? "selected" : ""
      ].filter(Boolean).join(" "),
      tabindex: "0",
      role: "button",
      "aria-label": `${item.title}: ${item.subtitle}`
    });

    group.appendChild(createSvgElement("circle", {
      cx: point.x,
      cy: point.y,
      r: isSmall ? 4.5 : 9
    }));

    if (point.label) {
      const label = createSvgElement("text", {
        x: point.x,
        y: point.y + 0.5
      });

      label.textContent = point.label;
      group.appendChild(label);
    }

    group.addEventListener("click", () => {
      selectPrayer(point.seqIndex);
    });

    group.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectPrayer(point.seqIndex);
      }
    });

    beads.appendChild(group);
  });
}

function renderPrayer() {
  const item = sequence[currentIndex];

  document.getElementById("prayerTitle").textContent = item.title;
  document.getElementById("prayerSubtitle").textContent = item.subtitle;
  document.getElementById("prayerIcon").textContent = item.icon;
  document.getElementById("stepNumber").textContent =
    `${currentIndex + 1} de ${sequence.length}`;
  document.getElementById("prayerText").textContent = item.text;

  const mysteryInfo = document.getElementById("mysteryInfo");

  if (item.mystery) {
    mysteryInfo.hidden = false;
    mysteryInfo.textContent = `Mistério para meditar: ${item.mystery}`;
  } else {
    mysteryInfo.hidden = true;
    mysteryInfo.textContent = "";
  }

  document.getElementById("previousButton").disabled = currentIndex === 0;

  document.getElementById("nextButton").textContent =
    currentIndex === sequence.length - 1
      ? "Recomeçar ↻"
      : "Próxima →";

  document.getElementById("progress").textContent =
    `Etapa ${currentIndex + 1} de ${sequence.length}`;

  document.getElementById("modeMessage").textContent = guidedMode
    ? "Modo guiado: avance seguindo a sequência das orações."
    : "Modo livre: toque em qualquer conta para abrir sua oração.";

  renderRosary();
}

function selectPrayer(index) {
  if (index < 0 || index >= sequence.length) return;

  currentIndex = index;
  renderPrayer();
}

function nextPrayer() {
  if (currentIndex === sequence.length - 1) {
    selectPrayer(findIndexById("creed"));
    return;
  }

  selectPrayer(currentIndex + 1);
}

function previousPrayer() {
  if (currentIndex > 0) {
    selectPrayer(currentIndex - 1);
  }
}

function renderMysteries() {
  const list = document.getElementById("mysteryList");
  list.replaceChildren();

  mysterySets[selectedMystery].forEach((mystery, index) => {
    const item = document.createElement("li");
    item.dataset.number = index + 1;
    item.textContent = mystery;
    list.appendChild(item);
  });
}

// Botões para iniciar a oração.
document.getElementById("startButton").addEventListener("click", () => {
  guidedMode = false;
  selectPrayer(findIndexById("creed"));
});

document.getElementById("guidedButton").addEventListener("click", () => {
  guidedMode = true;
  selectPrayer(findIndexById("creed"));
});

document.getElementById("nextButton").addEventListener("click", nextPrayer);
document.getElementById("previousButton").addEventListener("click", previousPrayer);

// Troca dos mistérios.
document.getElementById("mysterySelect").addEventListener("change", event => {
  const currentId = sequence[currentIndex]?.id;

  selectedMystery = event.target.value;
  buildSequence();
  renderMysteries();

  const newIndex = findIndexById(currentId);
  selectPrayer(newIndex >= 0 ? newIndex : findIndexById("creed"));
});

// Crucifixo abre o Creio.
const cross = document.getElementById("cross");

function openCreed() {
  selectPrayer(findIndexById("creed"));
}

cross.addEventListener("click", openCreed);

cross.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openCreed();
  }
});

// Marcador da Salve-Rainha.
const salveMarker = document.getElementById("salveMarker");

function openSalveRainha() {
  selectPrayer(findIndexById("salve-rainha"));
}

salveMarker.addEventListener("click", openSalveRainha);

salveMarker.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openSalveRainha();
  }
});

// Janela de ajuda.
const helpDialog = document.getElementById("helpDialog");

document.getElementById("helpButton").addEventListener("click", () => {
  helpDialog.showModal();
});

document.getElementById("closeHelp").addEventListener("click", () => {
  helpDialog.close();
});

helpDialog.addEventListener("click", event => {
  if (event.target === helpDialog) {
    helpDialog.close();
  }
});

// Inicialização.
buildSequence();
renderMysteries();
selectPrayer(findIndexById("creed"));
