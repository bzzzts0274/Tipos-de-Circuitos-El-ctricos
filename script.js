const circuits = {
  serie: {
    title: "Circuito en serie",
    description:
      "En un circuito en serie, los componentes están conectados uno después de otro en un solo camino. La corriente eléctrica pasa por todos los elementos en el mismo recorrido. Si un foco se rompe, el circuito queda abierto y todos los focos se apagan.",
    components: [
      "Batería o fuente de voltaje: entrega la energía eléctrica.",
      "Interruptor: permite abrir o cerrar el paso de corriente.",
      "Cables conductores: transportan la corriente por el circuito.",
      "Foco o resistencia R1: primer receptor de energía.",
      "Foco o resistencia R2: segundo receptor de energía.",
      "Foco o resistencia R3: tercer receptor de energía.",
      "Corriente eléctrica: flujo de cargas que recorre un solo camino."
    ],
    formula: "Serie: RT = R1 + R2 + R3  |  I = V / RT",
    calc: (v, r1, r2, r3, broken) => {
      if (broken.r1 || broken.r2 || broken.r3) return { rt: Infinity, i: 0, status: "Circuito abierto", activeBulbs: [], activePaths: [] };
      const rt = r1 + r2 + r3;
      return { rt, i: v / rt, status: "Funcionando: un solo camino", activeBulbs: ["r1", "r2", "r3"], activePaths: ["main"] };
    },
    failureMessage: (broken) => {
      const damaged = brokenNames(broken);
      if (!damaged.length) return "No hay focos rotos. El circuito en serie funciona completo cuando está encendido.";
      return `Se rompió ${damaged.join(", ")}. En serie, una sola falla abre el circuito y todos los focos se apagan.`;
    },
    svg: () => `
      <svg viewBox="0 0 900 560" class="circuit-svg" aria-label="Circuito en serie">
        <defs>
          <path id="seriePath" d="M145 405 L145 165 L260 165 L360 165 L470 165 L580 165 L710 165 L710 405 L145 405" />
        </defs>

        <path class="wire" d="M145 405 L145 165 L260 165 M330 165 L395 165 M465 165 L530 165 M600 165 L710 165 L710 405 L145 405" />
        <path class="wire wire-live live-path path-main" d="M145 405 L145 165 L260 165 M330 165 L395 165 M465 165 L530 165 M600 165 L710 165 L710 405 L145 405" />

        <g class="battery">
          <line x1="115" y1="335" x2="175" y2="335" />
          <line x1="128" y1="370" x2="162" y2="370" />
          <text x="94" y="315" fill="#73ff99" font-size="18" font-weight="700">+  -</text>
        </g>

        <line class="switch-line switch" x1="236" y1="165" x2="304" y2="125" data-open-x2="304" data-open-y2="125" data-closed-x2="315" data-closed-y2="165" />
        <circle cx="235" cy="165" r="8" fill="#fff" />
        <circle cx="315" cy="165" r="8" fill="#fff" />

        ${lamp(430, 165, "R1", "r1")}
        ${lamp(565, 165, "R2", "r2")}
        ${lamp(710, 405, "R3", "r3")}

        <circle class="electron electron-main e1" r="6">
          <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
            <mpath href="#seriePath" />
          </animateMotion>
        </circle>
        <circle class="electron electron-main e2" r="6">
          <animateMotion dur="4s" begin="1s" repeatCount="indefinite" rotate="auto">
            <mpath href="#seriePath" />
          </animateMotion>
        </circle>
        <circle class="electron electron-main e3" r="6">
          <animateMotion dur="4s" begin="2s" repeatCount="indefinite" rotate="auto">
            <mpath href="#seriePath" />
          </animateMotion>
        </circle>

        ${label(45, 375, 165, "Batería", "Fuente de voltaje que impulsa la corriente eléctrica.")}
        ${label(200, 72, 180, "Interruptor", "Abre o cierra el circuito para permitir o impedir el paso de corriente.")}
        ${label(380, 245, 145, "Foco / R1", "Receptor que transforma energía eléctrica en luz y calor.")}
        ${label(515, 245, 145, "Foco / R2", "Segundo receptor conectado en el mismo camino.")}
        ${label(660, 475, 145, "Foco / R3", "Tercer receptor. Si falla, se interrumpe todo el circuito.")}
        ${label(250, 405, 235, "Cable conductor", "Material que permite el movimiento de cargas eléctricas.")}
        ${label(515, 355, 210, "Corriente eléctrica", "En serie, la corriente tiene un único recorrido.")}
      </svg>
    `
  },

  paralelo: {
    title: "Circuito en paralelo",
    description:
      "En un circuito en paralelo, los componentes están conectados en ramas independientes. Cada rama recibe el mismo voltaje de la fuente. Si un foco se rompe, los demás pueden seguir funcionando porque tienen otro camino para la corriente.",
    components: [
      "Batería o fuente de voltaje: proporciona la energía al circuito.",
      "Interruptor general: controla el encendido de todo el circuito.",
      "Cables conductores principales: llevan la corriente hasta las ramas.",
      "Rama 1 con R1: primer camino independiente.",
      "Rama 2 con R2: segundo camino independiente.",
      "Rama 3 con R3: tercer camino independiente.",
      "Nodos de unión: puntos donde la corriente se divide o se reúne."
    ],
    formula: "Paralelo: 1/RT = 1/R1 + 1/R2 + 1/R3  |  ITotal = V / RT",
    calc: (v, r1, r2, r3, broken) => {
      const available = [];
      if (!broken.r1) available.push(["r1", r1]);
      if (!broken.r2) available.push(["r2", r2]);
      if (!broken.r3) available.push(["r3", r3]);
      if (available.length === 0) return { rt: Infinity, i: 0, status: "Circuito abierto: todas las ramas fallaron", activeBulbs: [], activePaths: [] };
      const rt = 1 / available.reduce((sum, item) => sum + 1 / item[1], 0);
      return { rt, i: v / rt, status: available.length === 3 ? "Funcionando: tres ramas" : `Funcionando con ${available.length} rama(s) activa(s)`, activeBulbs: available.map(item => item[0]), activePaths: available.map(item => item[0]) };
    },
    failureMessage: (broken) => {
      const damaged = brokenNames(broken);
      if (!damaged.length) return "No hay focos rotos. Las tres ramas del circuito paralelo funcionan.";
      if (damaged.length === 3) return "Se rompieron todos los focos. Como ya no queda ninguna rama completa, la corriente total es 0 A.";
      return `Se rompió ${damaged.join(", ")}. En paralelo, solo se apaga la rama dañada; las demás ramas siguen funcionando.`;
    },
    svg: () => `
      <svg viewBox="0 0 900 560" class="circuit-svg" aria-label="Circuito en paralelo">
        <defs>
          <path id="parPath1" d="M145 420 L145 145 L300 145 L690 145 L690 420 L145 420" />
          <path id="parPath2" d="M145 420 L145 145 L300 145 L300 280 L690 280 L690 420 L145 420" />
          <path id="parPath3" d="M145 420 L145 145 L300 145 L300 400 L690 400 L690 420 L145 420" />
        </defs>

        <path class="wire" d="M145 420 L145 145 L250 145 M320 145 L690 145 L690 420 L145 420" />
        <path class="wire" d="M300 145 L300 400 M690 145 L690 400" />
        <path class="wire" d="M300 280 L420 280 M500 280 L690 280" />
        <path class="wire" d="M300 400 L420 400 M500 400 L690 400" />

        <path class="wire wire-live live-path path-r1" d="M145 420 L145 145 L250 145 M320 145 L690 145 L690 420 L145 420" />
        <path class="wire wire-live live-path path-r2" d="M145 420 L145 145 L300 145 L300 280 L420 280 M500 280 L690 280 L690 420 L145 420" />
        <path class="wire wire-live live-path path-r3" d="M145 420 L145 145 L300 145 L300 400 L420 400 M500 400 L690 400 L690 420 L145 420" />

        <g class="battery">
          <line x1="115" y1="350" x2="175" y2="350" />
          <line x1="128" y1="385" x2="162" y2="385" />
          <text x="94" y="330" fill="#73ff99" font-size="18" font-weight="700">+  -</text>
        </g>

        <line class="switch-line switch" x1="250" y1="145" x2="315" y2="105" data-open-x2="315" data-open-y2="105" data-closed-x2="325" data-closed-y2="145" />
        <circle cx="250" cy="145" r="8" fill="#fff" />
        <circle cx="325" cy="145" r="8" fill="#fff" />

        <circle cx="300" cy="145" r="9" fill="#42e8ff"/>
        <circle cx="690" cy="145" r="9" fill="#42e8ff"/>
        <circle cx="300" cy="280" r="9" fill="#42e8ff"/>
        <circle cx="690" cy="280" r="9" fill="#42e8ff"/>
        <circle cx="300" cy="400" r="9" fill="#42e8ff"/>
        <circle cx="690" cy="400" r="9" fill="#42e8ff"/>

        ${lamp(460, 145, "R1", "r1")}
        ${lamp(460, 280, "R2", "r2")}
        ${lamp(460, 400, "R3", "r3")}

        <circle class="electron electron-r1 e1" r="6">
          <animateMotion dur="3.5s" repeatCount="indefinite" rotate="auto">
            <mpath href="#parPath1" />
          </animateMotion>
        </circle>
        <circle class="electron electron-r2 e2" r="6">
          <animateMotion dur="3.8s" repeatCount="indefinite" rotate="auto">
            <mpath href="#parPath2" />
          </animateMotion>
        </circle>
        <circle class="electron electron-r3 e3" r="6">
          <animateMotion dur="4.1s" repeatCount="indefinite" rotate="auto">
            <mpath href="#parPath3" />
          </animateMotion>
        </circle>

        ${label(45, 388, 165, "Batería", "Fuente de voltaje común para todas las ramas.")}
        ${label(205, 60, 180, "Interruptor", "Controla el paso de corriente hacia todo el circuito.")}
        ${label(352, 55, 200, "Rama 1 / R1", "Camino independiente que recibe el mismo voltaje.")}
        ${label(352, 218, 200, "Rama 2 / R2", "Segunda rama. Puede funcionar aunque otra rama falle.")}
        ${label(352, 465, 200, "Rama 3 / R3", "Tercera rama independiente.")}
        ${label(700, 242, 145, "Nodo", "Punto donde la corriente se reúne.")}
        ${label(182, 242, 145, "Nodo", "Punto donde la corriente se divide.")}
      </svg>
    `
  },

  mixto: {
    title: "Circuito mixto",
    description:
      "Un circuito mixto combina conexiones en serie y en paralelo. Algunas partes tienen un solo camino, mientras que otras se dividen en ramas. Por eso, el efecto de una falla depende de dónde se rompe el foco.",
    components: [
      "Batería o fuente de voltaje: alimenta todo el circuito.",
      "Interruptor: controla el encendido general.",
      "R1 en serie: componente por el que pasa toda la corriente antes de dividirse.",
      "R2 y R3 en paralelo: forman dos ramas independientes.",
      "Nodos: puntos donde la corriente se divide y se vuelve a unir.",
      "Cables conductores: unen todos los componentes.",
      "Corriente eléctrica: primero pasa por R1 y después se divide entre R2 y R3."
    ],
    formula: "Mixto: RP = 1 / (1/R2 + 1/R3)  |  RT = R1 + RP  |  I = V / RT",
    calc: (v, r1, r2, r3, broken) => {
      if (broken.r1) return { rt: Infinity, i: 0, status: "Circuito abierto: falló R1 en serie", activeBulbs: [], activePaths: [] };
      const parallel = [];
      if (!broken.r2) parallel.push(["r2", r2]);
      if (!broken.r3) parallel.push(["r3", r3]);
      if (parallel.length === 0) return { rt: Infinity, i: 0, status: "Circuito abierto: fallaron las ramas paralelas", activeBulbs: [], activePaths: [] };
      const rp = parallel.length === 1 ? parallel[0][1] : 1 / parallel.reduce((sum, item) => sum + 1 / item[1], 0);
      const rt = r1 + rp;
      return { rt, i: v / rt, status: parallel.length === 2 ? "Funcionando: serie + paralelo" : "Funcionando con una rama paralela", activeBulbs: ["r1", ...parallel.map(item => item[0])], activePaths: parallel.map(item => item[0]) };
    },
    failureMessage: (broken) => {
      const damaged = brokenNames(broken);
      if (!damaged.length) return "No hay focos rotos. El circuito mixto funciona con R1 en serie y R2/R3 en paralelo.";
      if (broken.r1) return "Se rompió R1. Como R1 está en serie antes de la división, todo el circuito queda abierto y se apaga.";
      if (broken.r2 && broken.r3) return "Se rompieron R2 y R3. Aunque R1 esté bien, ya no queda ninguna rama paralela completa.";
      return `Se rompió ${damaged.join(", ")}. En el circuito mixto, la rama dañada se apaga, pero la otra rama paralela todavía puede funcionar.`;
    },
    svg: () => `
      <svg viewBox="0 0 900 560" class="circuit-svg" aria-label="Circuito mixto">
        <defs>
          <path id="mixPath1" d="M145 420 L145 155 L270 155 L430 155 L610 155 L700 155 L700 420 L145 420" />
          <path id="mixPath2" d="M145 420 L145 155 L270 155 L430 155 L430 305 L700 305 L700 420 L145 420" />
        </defs>

        <path class="wire" d="M145 420 L145 155 L235 155 M305 155 L395 155 M465 155 L610 155 M680 155 L700 155 L700 420 L145 420" />
        <path class="wire" d="M430 155 L430 305 M700 155 L700 305" />
        <path class="wire" d="M430 305 L555 305 M625 305 L700 305" />

        <path class="wire wire-live live-path path-r2" d="M145 420 L145 155 L235 155 M305 155 L395 155 M465 155 L610 155 M680 155 L700 155 L700 420 L145 420" />
        <path class="wire wire-live live-path path-r3" d="M145 420 L145 155 L235 155 M305 155 L395 155 M465 155 L430 155 L430 305 L555 305 M625 305 L700 305 L700 420 L145 420" />

        <g class="battery">
          <line x1="115" y1="350" x2="175" y2="350" />
          <line x1="128" y1="385" x2="162" y2="385" />
          <text x="94" y="330" fill="#73ff99" font-size="18" font-weight="700">+  -</text>
        </g>

        <line class="switch-line switch" x1="235" y1="155" x2="300" y2="115" data-open-x2="300" data-open-y2="115" data-closed-x2="310" data-closed-y2="155" />
        <circle cx="235" cy="155" r="8" fill="#fff" />
        <circle cx="310" cy="155" r="8" fill="#fff" />

        ${lamp(430, 155, "R1", "r1")}
        ${lamp(645, 155, "R2", "r2")}
        ${lamp(590, 305, "R3", "r3")}

        <circle cx="430" cy="155" r="9" fill="#42e8ff"/>
        <circle cx="700" cy="155" r="9" fill="#42e8ff"/>
        <circle cx="430" cy="305" r="9" fill="#42e8ff"/>
        <circle cx="700" cy="305" r="9" fill="#42e8ff"/>

        <circle class="electron electron-r2 e1" r="6">
          <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
            <mpath href="#mixPath1" />
          </animateMotion>
        </circle>
        <circle class="electron electron-r3 e2" r="6">
          <animateMotion dur="4.2s" begin="0.7s" repeatCount="indefinite" rotate="auto">
            <mpath href="#mixPath2" />
          </animateMotion>
        </circle>

        ${label(45, 388, 165, "Batería", "Fuente de energía eléctrica del circuito mixto.")}
        ${label(190, 62, 180, "Interruptor", "Permite encender o apagar toda la maqueta virtual.")}
        ${label(366, 220, 150, "R1 en serie", "R1 está antes de la división de corriente.")}
        ${label(575, 220, 170, "R2 paralelo", "R2 está en una rama superior.")}
        ${label(520, 372, 170, "R3 paralelo", "R3 está en una rama inferior.")}
        ${label(330, 270, 150, "Nodo", "Aquí la corriente se divide en dos ramas.")}
        ${label(708, 235, 150, "Nodo", "Aquí la corriente vuelve a unirse.")}
      </svg>
    `
  }
};

const state = {
  selected: "serie",
  power: false,
  broken: { r1: false, r2: false, r3: false }
};

const svgMount = document.getElementById("svgMount");
const circuitTitle = document.getElementById("circuitTitle");
const infoTitle = document.getElementById("infoTitle");
const infoDescription = document.getElementById("infoDescription");
const componentList = document.getElementById("componentList");
const totalResistance = document.getElementById("totalResistance");
const totalCurrent = document.getElementById("totalCurrent");
const behavior = document.getElementById("behavior");
const formulaText = document.getElementById("formulaText");
const resultBanner = document.getElementById("resultBanner");
const powerBtn = document.getElementById("powerBtn");

const voltage = document.getElementById("voltage");
const r1 = document.getElementById("r1");
const r2 = document.getElementById("r2");
const r3 = document.getElementById("r3");

const voltageValue = document.getElementById("voltageValue");
const r1Value = document.getElementById("r1Value");
const r2Value = document.getElementById("r2Value");
const r3Value = document.getElementById("r3Value");

function lamp(cx, cy, name, key) {
  return `
    <g class="lamp lamp-${key}" data-bulb="${key}">
      <circle class="lamp-glass lamp-bulb" cx="${cx}" cy="${cy}" r="34" />
      <path d="M${cx - 18} ${cy} Q${cx} ${cy - 25} ${cx + 18} ${cy} Q${cx} ${cy + 25} ${cx - 18} ${cy}" fill="none" stroke="#fff" stroke-width="3"/>
      <path class="crack" d="M${cx - 14} ${cy - 18} L${cx - 2} ${cy - 4} L${cx - 10} ${cy + 8} L${cx + 7} ${cy + 21}" />
      <text class="broken-mark" x="${cx - 12}" y="${cy + 12}">✕</text>
      <text x="${cx - 13}" y="${cy + 57}" fill="#fff" font-size="18" font-weight="700">${name}</text>
    </g>
  `;
}

function label(x, y, w, text, tip) {
  return `
    <g class="label" data-tip="${tip}">
      <rect x="${x}" y="${y}" width="${w}" height="34" rx="10"></rect>
      <text x="${x + 12}" y="${y + 23}">${text}</text>
    </g>
  `;
}

function brokenNames(broken) {
  return Object.keys(broken)
    .filter(key => broken[key])
    .map(key => key.toUpperCase());
}

function renderCircuit() {
  state.broken = { r1: false, r2: false, r3: false };

  const data = circuits[state.selected];

  circuitTitle.textContent = data.title;
  infoTitle.textContent = data.title;
  infoDescription.textContent = data.description;
  formulaText.textContent = data.formula;
  componentList.innerHTML = data.components.map(item => `<li>${item}</li>`).join("");
  svgMount.innerHTML = data.svg();

  updateBreakButtons();
  updateMath();
  attachTooltips();
}

function getValues() {
  return {
    v: Number(voltage.value),
    r1: Number(r1.value),
    r2: Number(r2.value),
    r3: Number(r3.value)
  };
}

function updateMath() {
  const values = getValues();

  voltageValue.textContent = values.v;
  r1Value.textContent = values.r1;
  r2Value.textContent = values.r2;
  r3Value.textContent = values.r3;

  const data = circuits[state.selected];
  const result = data.calc(values.v, values.r1, values.r2, values.r3, state.broken);

  totalResistance.textContent = result.rt === Infinity ? "∞ Ω" : `${result.rt.toFixed(2)} Ω`;
  totalCurrent.textContent = state.power ? `${result.i.toFixed(3)} A` : "0 A";
  behavior.textContent = state.power ? result.status : "Apagado";

  resultBanner.textContent = data.failureMessage(state.broken);
  resultBanner.classList.remove("warning", "good");
  resultBanner.classList.add(brokenNames(state.broken).length ? "warning" : "good");

  updateBulbVisuals(result);
  updatePowerVisual(result);
}

function updateBulbVisuals(result) {
  ["r1", "r2", "r3"].forEach(key => {
    const lampEl = document.querySelector(`.lamp-${key}`);
    const bulb = lampEl?.querySelector(".lamp-bulb");
    if (!lampEl || !bulb) return;

    lampEl.classList.toggle("broken", state.broken[key]);
    bulb.classList.remove("lamp-on");

    if (state.power && result.activeBulbs.includes(key) && !state.broken[key]) {
      bulb.classList.add("lamp-on");
      const intensity = Math.min(1, result.i / 0.55);
      bulb.style.opacity = 0.45 + intensity * 0.55;
    } else {
      bulb.style.opacity = 1;
    }
  });
}

function updatePowerVisual(result) {
  const svg = document.querySelector(".circuit-svg");
  const currentResult = result || circuits[state.selected].calc(...Object.values(getValues()), state.broken);

  powerBtn.classList.toggle("on", state.power);
  powerBtn.innerHTML = state.power ? `<span class="power-dot"></span>Apagar` : `<span class="power-dot"></span>Encender`;

  if (svg) svg.classList.toggle("running", state.power && currentResult.i > 0);

  document.querySelectorAll(".live-path").forEach(path => {
    const pathKey = [...path.classList].find(cls => cls.startsWith("path-"))?.replace("path-", "");
    path.style.opacity = state.power && currentResult.activePaths.includes(pathKey) ? "1" : "0";
  });

  document.querySelectorAll(".electron").forEach(electron => {
    const electronKey = [...electron.classList].find(cls => cls.startsWith("electron-"))?.replace("electron-", "");
    const active = state.power && currentResult.activePaths.includes(electronKey);
    electron.classList.toggle("active", active);
    electron.classList.toggle("inactive", !active);
  });

  document.querySelectorAll(".switch").forEach(sw => {
    sw.classList.toggle("closed", state.power);
    if (state.power) {
      sw.setAttribute("x2", sw.dataset.closedX2);
      sw.setAttribute("y2", sw.dataset.closedY2);
    } else {
      sw.setAttribute("x2", sw.dataset.openX2);
      sw.setAttribute("y2", sw.dataset.openY2);
    }
  });
}

function updateBreakButtons() {
  document.querySelectorAll(".break-btn").forEach(btn => {
    const key = btn.dataset.bulb;
    btn.classList.toggle("broken", state.broken[key]);
    btn.textContent = state.broken[key] ? `Restaurar ${key.toUpperCase()}` : `Romper ${key.toUpperCase()}`;
  });
}

powerBtn.addEventListener("click", () => {
  state.power = !state.power;
  updateMath();
});

document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    state.selected = btn.dataset.circuit;
    state.power = false;
    renderCircuit();
  });
});

document.querySelectorAll(".break-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.bulb;
    state.broken[key] = !state.broken[key];
    updateBreakButtons();
    updateMath();
  });
});

document.getElementById("resetFailures").addEventListener("click", () => {
  state.broken = { r1: false, r2: false, r3: false };
  updateBreakButtons();
  updateMath();
});

[voltage, r1, r2, r3].forEach(input => {
  input.addEventListener("input", updateMath);
});

function attachTooltips() {
  let tooltip = document.querySelector(".tooltip");
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    document.body.appendChild(tooltip);
  }

  document.querySelectorAll(".label").forEach(labelEl => {
    labelEl.addEventListener("mousemove", event => {
      tooltip.textContent = labelEl.dataset.tip;
      tooltip.style.display = "block";
      tooltip.style.left = event.clientX + 14 + "px";
      tooltip.style.top = event.clientY + 14 + "px";
    });

    labelEl.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });
  });
}

renderCircuit();
