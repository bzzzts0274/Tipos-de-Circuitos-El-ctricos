const circuits = {
  serie: {
    title: "Circuito en serie",
    description:
      "En un circuito en serie, los componentes están conectados uno después de otro en un solo camino. La corriente eléctrica pasa por todos los elementos en el mismo recorrido. Si un foco se desconecta o se quema, el circuito se abre y todos dejan de funcionar.",
    components: [
      "Batería o fuente de voltaje: entrega la energía eléctrica.",
      "Interruptor: permite abrir o cerrar el paso de corriente.",
      "Cables conductores: transportan la corriente por el circuito.",
      "Resistencia o foco R1: primer receptor de energía.",
      "Resistencia o foco R2: segundo receptor de energía.",
      "Resistencia o foco R3: tercer receptor de energía.",
      "Corriente eléctrica: flujo de cargas que recorre un solo camino."
    ],
    behavior: "Un solo camino",
    formula: "Serie: RT = R1 + R2 + R3  |  I = V / RT",
    calc: (v, r1, r2, r3) => {
      const rt = r1 + r2 + r3;
      return { rt, i: v / rt };
    },
    svg: () => `
      <svg viewBox="0 0 900 560" class="circuit-svg" aria-label="Circuito en serie">
        <defs>
          <path id="seriePath" d="M145 405 L145 165 L260 165 L360 165 L470 165 L580 165 L710 165 L710 405 L145 405" />
        </defs>

        <path class="wire" d="M145 405 L145 165 L260 165 M330 165 L395 165 M465 165 L530 165 M600 165 L710 165 L710 405 L145 405" />
        <path class="wire wire-live live-path" d="M145 405 L145 165 L260 165 M330 165 L395 165 M465 165 L530 165 M600 165 L710 165 L710 405 L145 405" />

        <g class="battery">
          <line x1="115" y1="335" x2="175" y2="335" />
          <line x1="128" y1="370" x2="162" y2="370" />
          <text x="94" y="315" fill="#73ff99" font-size="18" font-weight="700">+  -</text>
        </g>

        <line class="switch-line switch" x1="236" y1="165" x2="304" y2="125" />
        <circle cx="235" cy="165" r="8" fill="#fff" />
        <circle cx="315" cy="165" r="8" fill="#fff" />

        <g class="lamp lamp1">
          <circle class="lamp-glass lamp-bulb" cx="430" cy="165" r="34" />
          <path d="M412 165 Q430 140 448 165 Q430 190 412 165" fill="none" stroke="#fff" stroke-width="3"/>
          <text x="417" y="222" fill="#fff" font-size="18" font-weight="700">R1</text>
        </g>

        <g class="lamp lamp2">
          <circle class="lamp-glass lamp-bulb" cx="565" cy="165" r="34" />
          <path d="M547 165 Q565 140 583 165 Q565 190 547 165" fill="none" stroke="#fff" stroke-width="3"/>
          <text x="552" y="222" fill="#fff" font-size="18" font-weight="700">R2</text>
        </g>

        <g class="lamp lamp3">
          <circle class="lamp-glass lamp-bulb" cx="710" cy="405" r="34" />
          <path d="M692 405 Q710 380 728 405 Q710 430 692 405" fill="none" stroke="#fff" stroke-width="3"/>
          <text x="697" y="462" fill="#fff" font-size="18" font-weight="700">R3</text>
        </g>

        <circle class="electron e1" r="6">
          <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
            <mpath href="#seriePath" />
          </animateMotion>
        </circle>
        <circle class="electron e2" r="6">
          <animateMotion dur="4s" begin="1s" repeatCount="indefinite" rotate="auto">
            <mpath href="#seriePath" />
          </animateMotion>
        </circle>
        <circle class="electron e3" r="6">
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
      "En un circuito en paralelo, los componentes están conectados en ramas independientes. Cada rama recibe el mismo voltaje de la fuente. Si un foco se desconecta, los demás pueden seguir funcionando porque todavía tienen su propio camino para la corriente.",
    components: [
      "Batería o fuente de voltaje: proporciona la energía al circuito.",
      "Interruptor general: controla el encendido de todo el circuito.",
      "Cables conductores principales: llevan la corriente hasta las ramas.",
      "Rama 1 con R1: primer camino independiente.",
      "Rama 2 con R2: segundo camino independiente.",
      "Rama 3 con R3: tercer camino independiente.",
      "Nodos de unión: puntos donde la corriente se divide o se reúne."
    ],
    behavior: "Varias ramas",
    formula: "Paralelo: 1/RT = 1/R1 + 1/R2 + 1/R3  |  ITotal = V / RT",
    calc: (v, r1, r2, r3) => {
      const rt = 1 / (1 / r1 + 1 / r2 + 1 / r3);
      return { rt, i: v / rt };
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

        <path class="wire wire-live live-path" d="M145 420 L145 145 L250 145 M320 145 L690 145 L690 420 L145 420" />
        <path class="wire wire-live live-path" d="M300 145 L300 400 M690 145 L690 400" />
        <path class="wire wire-live live-path" d="M300 280 L420 280 M500 280 L690 280" />
        <path class="wire wire-live live-path" d="M300 400 L420 400 M500 400 L690 400" />

        <g class="battery">
          <line x1="115" y1="350" x2="175" y2="350" />
          <line x1="128" y1="385" x2="162" y2="385" />
          <text x="94" y="330" fill="#73ff99" font-size="18" font-weight="700">+  -</text>
        </g>

        <line class="switch-line switch" x1="250" y1="145" x2="315" y2="105" />
        <circle cx="250" cy="145" r="8" fill="#fff" />
        <circle cx="325" cy="145" r="8" fill="#fff" />

        <circle cx="300" cy="145" r="9" fill="#42e8ff"/>
        <circle cx="690" cy="145" r="9" fill="#42e8ff"/>
        <circle cx="300" cy="280" r="9" fill="#42e8ff"/>
        <circle cx="690" cy="280" r="9" fill="#42e8ff"/>
        <circle cx="300" cy="400" r="9" fill="#42e8ff"/>
        <circle cx="690" cy="400" r="9" fill="#42e8ff"/>

        <g class="lamp lamp1">
          <circle class="lamp-glass lamp-bulb" cx="460" cy="145" r="34" />
          <path d="M442 145 Q460 120 478 145 Q460 170 442 145" fill="none" stroke="#fff" stroke-width="3"/>
          <text x="447" y="202" fill="#fff" font-size="18" font-weight="700">R1</text>
        </g>

        <g class="lamp lamp2">
          <circle class="lamp-glass lamp-bulb" cx="460" cy="280" r="34" />
          <path d="M442 280 Q460 255 478 280 Q460 305 442 280" fill="none" stroke="#fff" stroke-width="3"/>
          <text x="447" y="337" fill="#fff" font-size="18" font-weight="700">R2</text>
        </g>

        <g class="lamp lamp3">
          <circle class="lamp-glass lamp-bulb" cx="460" cy="400" r="34" />
          <path d="M442 400 Q460 375 478 400 Q460 425 442 400" fill="none" stroke="#fff" stroke-width="3"/>
          <text x="447" y="457" fill="#fff" font-size="18" font-weight="700">R3</text>
        </g>

        <circle class="electron e1" r="6">
          <animateMotion dur="3.5s" repeatCount="indefinite" rotate="auto">
            <mpath href="#parPath1" />
          </animateMotion>
        </circle>
        <circle class="electron e2" r="6">
          <animateMotion dur="3.8s" repeatCount="indefinite" rotate="auto">
            <mpath href="#parPath2" />
          </animateMotion>
        </circle>
        <circle class="electron e3" r="6">
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
      "Un circuito mixto combina conexiones en serie y conexiones en paralelo. Algunas partes comparten un solo camino, mientras que otras se dividen en ramas. Este tipo de conexión se usa en sistemas más completos porque permite controlar y distribuir la energía de diferentes formas.",
    components: [
      "Batería o fuente de voltaje: alimenta todo el circuito.",
      "Interruptor: controla el encendido general.",
      "R1 en serie: componente por el que pasa toda la corriente antes de dividirse.",
      "R2 y R3 en paralelo: forman dos ramas independientes.",
      "Nodos: puntos donde la corriente se divide y se vuelve a unir.",
      "Cables conductores: unen todos los componentes.",
      "Corriente eléctrica: primero pasa por R1 y después se divide entre R2 y R3."
    ],
    behavior: "Serie + paralelo",
    formula: "Mixto: RParalelo = 1 / (1/R2 + 1/R3)  |  RT = R1 + RParalelo  |  I = V / RT",
    calc: (v, r1, r2, r3) => {
      const rp = 1 / (1 / r2 + 1 / r3);
      const rt = r1 + rp;
      return { rt, i: v / rt };
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

        <path class="wire wire-live live-path" d="M145 420 L145 155 L235 155 M305 155 L395 155 M465 155 L610 155 M680 155 L700 155 L700 420 L145 420" />
        <path class="wire wire-live live-path" d="M430 155 L430 305 M700 155 L700 305" />
        <path class="wire wire-live live-path" d="M430 305 L555 305 M625 305 L700 305" />

        <g class="battery">
          <line x1="115" y1="350" x2="175" y2="350" />
          <line x1="128" y1="385" x2="162" y2="385" />
          <text x="94" y="330" fill="#73ff99" font-size="18" font-weight="700">+  -</text>
        </g>

        <line class="switch-line switch" x1="235" y1="155" x2="300" y2="115" />
        <circle cx="235" cy="155" r="8" fill="#fff" />
        <circle cx="310" cy="155" r="8" fill="#fff" />

        <g class="lamp lamp1">
          <circle class="lamp-glass lamp-bulb" cx="430" cy="155" r="34" />
          <path d="M412 155 Q430 130 448 155 Q430 180 412 155" fill="none" stroke="#fff" stroke-width="3"/>
          <text x="417" y="212" fill="#fff" font-size="18" font-weight="700">R1</text>
        </g>

        <circle cx="430" cy="155" r="9" fill="#42e8ff"/>
        <circle cx="700" cy="155" r="9" fill="#42e8ff"/>
        <circle cx="430" cy="305" r="9" fill="#42e8ff"/>
        <circle cx="700" cy="305" r="9" fill="#42e8ff"/>

        <g class="lamp lamp2">
          <circle class="lamp-glass lamp-bulb" cx="645" cy="155" r="34" />
          <path d="M627 155 Q645 130 663 155 Q645 180 627 155" fill="none" stroke="#fff" stroke-width="3"/>
          <text x="632" y="212" fill="#fff" font-size="18" font-weight="700">R2</text>
        </g>

        <g class="lamp lamp3">
          <circle class="lamp-glass lamp-bulb" cx="590" cy="305" r="34" />
          <path d="M572 305 Q590 280 608 305 Q590 330 572 305" fill="none" stroke="#fff" stroke-width="3"/>
          <text x="577" y="362" fill="#fff" font-size="18" font-weight="700">R3</text>
        </g>

        <circle class="electron e1" r="6">
          <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
            <mpath href="#mixPath1" />
          </animateMotion>
        </circle>
        <circle class="electron e2" r="6">
          <animateMotion dur="4.2s" begin="0.7s" repeatCount="indefinite" rotate="auto">
            <mpath href="#mixPath2" />
          </animateMotion>
        </circle>
        <circle class="electron e3" r="6">
          <animateMotion dur="4s" begin="1.4s" repeatCount="indefinite" rotate="auto">
            <mpath href="#mixPath1" />
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
  power: false
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
const powerBtn = document.getElementById("powerBtn");

const voltage = document.getElementById("voltage");
const r1 = document.getElementById("r1");
const r2 = document.getElementById("r2");
const r3 = document.getElementById("r3");

const voltageValue = document.getElementById("voltageValue");
const r1Value = document.getElementById("r1Value");
const r2Value = document.getElementById("r2Value");
const r3Value = document.getElementById("r3Value");

function label(x, y, w, text, tip) {
  return `
    <g class="label" data-tip="${tip}">
      <rect x="${x}" y="${y}" width="${w}" height="34" rx="10"></rect>
      <text x="${x + 12}" y="${y + 23}">${text}</text>
    </g>
  `;
}

function renderCircuit() {
  const data = circuits[state.selected];

  circuitTitle.textContent = data.title;
  infoTitle.textContent = data.title;
  infoDescription.textContent = data.description;
  behavior.textContent = data.behavior;
  formulaText.textContent = data.formula;

  componentList.innerHTML = data.components.map(item => `<li>${item}</li>`).join("");
  svgMount.innerHTML = data.svg();

  updatePowerVisual();
  updateMath();
  attachTooltips();
}

function updateMath() {
  const v = Number(voltage.value);
  const rv1 = Number(r1.value);
  const rv2 = Number(r2.value);
  const rv3 = Number(r3.value);

  voltageValue.textContent = v;
  r1Value.textContent = rv1;
  r2Value.textContent = rv2;
  r3Value.textContent = rv3;

  const result = circuits[state.selected].calc(v, rv1, rv2, rv3);
  totalResistance.textContent = `${result.rt.toFixed(2)} Ω`;
  totalCurrent.textContent = state.power ? `${result.i.toFixed(3)} A` : "0 A";

  const bulbs = document.querySelectorAll(".lamp-bulb");
  const intensity = Math.min(1, result.i / 0.55);

  bulbs.forEach(bulb => {
    if (state.power) {
      bulb.classList.add("lamp-on");
      bulb.style.opacity = 0.45 + intensity * 0.55;
    } else {
      bulb.classList.remove("lamp-on");
      bulb.style.opacity = 1;
    }
  });

  const electrons = document.querySelectorAll(".electron");
  electrons.forEach(e => {
    e.style.animationDuration = `${Math.max(0.35, 1.1 - intensity * 0.55)}s`;
  });
}

function updatePowerVisual() {
  const svg = document.querySelector(".circuit-svg");
  const livePaths = document.querySelectorAll(".live-path");
  const switches = document.querySelectorAll(".switch");

  powerBtn.classList.toggle("on", state.power);
  powerBtn.setAttribute("aria-pressed", String(state.power));
  powerBtn.innerHTML = state.power
    ? `<span class="power-dot"></span> Apagar`
    : `<span class="power-dot"></span> Encender`;

  if (svg) svg.classList.toggle("running", state.power);

  livePaths.forEach(path => {
    path.style.opacity = state.power ? "1" : "0";
  });

  switches.forEach(sw => {
    sw.classList.toggle("closed", state.power);
    if (state.power) {
      sw.setAttribute("x2", Number(sw.getAttribute("x1")) + 75);
      sw.setAttribute("y2", sw.getAttribute("y1"));
    }
  });
}

powerBtn.addEventListener("click", () => {
  state.power = !state.power;
  updatePowerVisual();
  updateMath();
});

document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    state.selected = btn.dataset.circuit;
    renderCircuit();
  });
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
