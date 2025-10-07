const starCanvas = document.getElementById("starCanvas");
const sctx = starCanvas.getContext("2d");
let W = (starCanvas.width = innerWidth);
let H = (starCanvas.height = innerHeight);

const STAR_COUNT = Math.max(160, Math.floor((W * H) / 9000));
const stars = [];
function makeStars() {
  stars.length = 0;
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.6 + 0.3,
      a: Math.random() * 0.9 + 0.1,
      tw: Math.random() * 2.4 + 0.6,
      phase: Math.random() * Math.PI * 2,
    });
  }
}
makeStars();
window.addEventListener("resize", () => {
  W = starCanvas.width = innerWidth;
  H = starCanvas.height = innerHeight;
  makeStars();
});

function drawStarfield(t) {
  sctx.clearRect(0, 0, W, H);
  const g = sctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "rgba(16,4,18,0.35)");
  g.addColorStop(1, "rgba(2,0,6,0.8)");
  sctx.fillStyle = g;
  sctx.fillRect(0, 0, W, H);

  for (const p of stars) {
    const tw = 0.6 + 0.4 * Math.sin((t / 900) * p.tw + p.phase);
    sctx.beginPath();
    sctx.globalAlpha = p.a * tw;
    sctx.fillStyle = "rgba(255,255,255,0.95)";
    sctx.arc(p.x, p.y, p.r * (1 + 0.3 * tw), 0, Math.PI * 2);
    sctx.fill();
  }
  requestAnimationFrame(drawStarfield);
}
requestAnimationFrame(drawStarfield);

const el = {
  binary: document.getElementById("binary"),
  decimal: document.getElementById("decimal"),
  hex: document.getElementById("hex"),
  octal: document.getElementById("octal"),
  explainContent: document.getElementById("explainContent"),
  loading: document.getElementById("loading"),
  noteText: document.getElementById("noteText"),
  clearBtn: document.getElementById("clearBtn"),
  langToggle: document.getElementById("langToggle"),
  downloadBtn: document.getElementById("downloadBtn"),
  langBadge: document.getElementById("langBadge"),
  topSubtitle: document.getElementById("topSubtitle"),
};

let state = {
  resolvedLang: "en",
  typingTimer: null,
  lastInputAt: 0,
  typingDelay: 2000,
  isExplaining: false,
};

const I18N = {
  en: {
    "converter.title": "Converter",
    "label.binary": "Binary",
    "label.decimal": "Decimal",
    "label.hex": "Hex",
    "label.oct": "Octal",
    "note.idle":
      "Type a number in any field. Explanation appears 2s after you stop typing.",
    "btn.clear": "Clear",
    "explain.title": "Explanation",
    "explain.placeholder":
      "Enter a number to see conversion steps. Explanation will start 2s after you stop typing.",
    "top.subtitle": "Binary ↔ Decimal ↔ Hex ↔ Octal",
    "btn.download": "Download .txt",
    "placeholder.input": "Enter number...",

    "explain.binaryToDecimal": "Binary → Decimal Conversion",
    "explain.binaryToHex": "Binary → Hex Conversion",
    "explain.binaryToOctal": "Binary → Octal Conversion",
    "explain.decimalToBinary": "Decimal → Binary Conversion",
    "explain.decimalToHex": "Decimal → Hex Conversion",
    "explain.decimalToOctal": "Decimal → Octal Conversion",
    "explain.hexToDecimal": "Hex → Decimal Conversion",
    "explain.hexToBinary": "Hex → Binary Conversion",
    "explain.hexToOctal": "Hex → Octal Conversion (via Binary)",
    "explain.octToDecimal": "Octal → Decimal Conversion",
    "explain.octToBinary": "Octal → Binary Conversion",
    "explain.octToHex": "Octal → Hex Conversion (via Binary)",
    "explain.group4bits": "Group binary into 4-bit sets from the right:",
    "explain.group3bits": "Group binary into 3-bit sets from the right:",
    "explain.convertEachGroup": "Convert each group:",
    "explain.combineResult": "Combine the results:",
    "explain.step1": "Step 1: Convert to Binary",
    "explain.step2": "Step 2: Re-group and Convert",
    "explain.divisionMethod": "Division Method",
    "explain.readUpwards": "Read remainders from bottom to top:",
  },
  id: {
    "converter.title": "Konverter",
    "label.binary": "Biner",
    "label.decimal": "Desimal",
    "label.hex": "Heksa",
    "label.oct": "Oktal",
    "note.idle":
      "Ketik angka di salah satu kolom. Penjelasan muncul 2 detik setelah Anda berhenti mengetik.",
    "btn.clear": "Bersihkan",
    "explain.title": "Penjelasan",
    "explain.placeholder":
      "Masukkan angka untuk melihat langkah konversi. Penjelasan akan dimulai 2 detik setelah berhenti mengetik.",
    "top.subtitle": "Biner ↔ Desimal ↔ Heksa ↔ Oktal",
    "btn.download": "Unduh .txt",
    "placeholder.input": "Masukkan angka...",
    "explain.binaryToDecimal": "Konversi Biner → Desimal",
    "explain.binaryToHex": "Konversi Biner → Heksa",
    "explain.binaryToOctal": "Konversi Biner → Oktal",
    "explain.decimalToBinary": "Konversi Desimal → Biner",
    "explain.decimalToHex": "Konversi Desimal → Heksa",
    "explain.decimalToOctal": "Konversi Desimal → Oktal",
    "explain.hexToDecimal": "Konversi Heksa → Desimal",
    "explain.hexToBinary": "Konversi Heksa → Biner",
    "explain.hexToOctal": "Konversi Heksa → Oktal (via Biner)",
    "explain.octToDecimal": "Konversi Oktal → Desimal",
    "explain.octToBinary": "Konversi Oktal → Biner",
    "explain.octToHex": "Konversi Oktal → Heksa (via Biner)",
    "explain.group4bits": "Kelompokkan biner menjadi 4 bit dari kanan:",
    "explain.group3bits": "Kelompokkan biner menjadi 3 bit dari kanan:",
    "explain.convertEachGroup": "Konversi setiap kelompok:",
    "explain.combineResult": "Gabungkan hasilnya:",
    "explain.step1": "Langkah 1: Ubah ke Biner",
    "explain.step2": "Langkah 2: Kelompokkan ulang dan Konversi",
    "explain.divisionMethod": "Metode Pembagian",
    "explain.readUpwards": "Baca sisa dari bawah ke atas:",
  },
};

function applyLanguage(lang) {
  state.resolvedLang = lang;
  const map = I18N[state.resolvedLang];

  document.querySelectorAll("[data-i18n]").forEach((elm) => {
    const key = elm.getAttribute("data-i18n");
    if (map[key]) elm.textContent = map[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((elm) => {
    const key = elm.getAttribute("data-i18n-placeholder");
    if (map[key]) elm.placeholder = map[key];
  });

  const placeholderEl = el.explainContent.querySelector(".placeholder");
  if (placeholderEl) {
    placeholderEl.textContent = map["explain.placeholder"];
  }

  el.langBadge.textContent = state.resolvedLang.toUpperCase();
  document.documentElement.lang = state.resolvedLang;
  el.topSubtitle.textContent = map["top.subtitle"];
}

el.langToggle.addEventListener("change", () => {
  applyLanguage(el.langToggle.checked ? "id" : "en");
});

function renderFromDecimal(dec) {
  if (!Number.isFinite(dec) || !Number.isInteger(dec) || dec < 0) {
    el.binary.value = "";
    el.hex.value = "";
    el.octal.value = "";
    return;
  }
  try {
    el.binary.value = dec.toString(2);
    el.hex.value = dec.toString(16).toUpperCase();
    el.octal.value = dec.toString(8);
  } catch (e) {
    el.binary.value = "";
    el.hex.value = "";
    el.octal.value = "";
  }
}

function handleInput(source) {
  state.lastInputAt = Date.now();
  state.isExplaining = false;
  if (state.typingTimer) clearTimeout(state.typingTimer);

  const inputs = {
    binary: el.binary.value.trim(),
    decimal: el.decimal.value.trim(),
    hex: el.hex.value.trim(),
    octal: el.octal.value.trim(),
  };

  let decValue = null;

  if (source === "binary" && /^[01]+$/.test(inputs.binary)) {
    decValue = parseInt(inputs.binary, 2);
    if (!isNaN(decValue)) el.decimal.value = decValue;
  } else if (source === "decimal" && /^\d+$/.test(inputs.decimal)) {
    decValue = parseInt(inputs.decimal, 10);
  } else if (source === "hex" && /^[0-9a-fA-F]+$/.test(inputs.hex)) {
    decValue = parseInt(inputs.hex, 16);
    if (!isNaN(decValue)) el.decimal.value = decValue;
  } else if (source === "octal" && /^[0-7]+$/.test(inputs.octal)) {
    decValue = parseInt(inputs.octal, 8);
    if (!isNaN(decValue)) el.decimal.value = decValue;
  }

  if (decValue !== null && !isNaN(decValue)) {
    renderFromDecimal(decValue);
  } else {
    if (source !== "binary") el.binary.value = "";
    if (source !== "decimal") el.decimal.value = "";
    if (source !== "hex") el.hex.value = "";
    if (source !== "octal") el.octal.value = "";
  }

  state.typingTimer = setTimeout(() => {
    if (Date.now() - state.lastInputAt >= state.typingDelay - 50) {
      startExplanation();
    }
  }, state.typingDelay);
}

function showLoading(on = true) {
  el.loading.classList.toggle("hidden", !on);
}

async function typeLines(lines, speed = 18) {
  el.explainContent.innerHTML = "";
  for (const line of lines) {
    const wrap = document.createElement("div");
    wrap.className = "line";
    el.explainContent.appendChild(wrap);
    await typeToElement(wrap, line, speed);
    await sleep(200);
    el.explainContent.scrollTop = el.explainContent.scrollHeight;
  }
}

function typeToElement(target, text, speed = 18) {
  return new Promise((resolve) => {
    let i = 0;
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    target.appendChild(cursor);
    function step() {
      if (i < text.length) {
        const ch = document.createElement("span");
        ch.className = "char";
        ch.textContent = text[i];
        target.insertBefore(ch, cursor);
        i++;
        setTimeout(step, speed + Math.random() * speed * 0.4);
      } else {
        cursor.remove();
        resolve();
      }
    }
    step();
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function startExplanation() {
  state.isExplaining = true;
  showLoading(true);
  el.explainContent.innerHTML = "";
  await sleep(300);

  const vals = {
    binary: el.binary.value.trim(),
    decimal: el.decimal.value.trim(),
    hex: el.hex.value.trim(),
    octal: el.octal.value.trim(),
  };

  let source = null;
  if (document.activeElement && document.activeElement.tagName === "INPUT") {
    const aeId = document.activeElement.id;
    if (vals[aeId]) source = aeId;
  }
  if (!source) {
    if (vals.binary) source = "binary";
    else if (vals.decimal) source = "decimal";
    else if (vals.hex) source = "hex";
    else if (vals.octal) source = "octal";
  }

  const lang = state.resolvedLang;
  const map = I18N[lang];
  const lines = [];
  const SEPARATOR = "-----------------------------------";

  if (!source) {
    lines.push(map["explain.placeholder"]);
  } else if (source === "binary") {
    const b = vals.binary;
    const dec = parseInt(b, 2);
    if (!/^[01]+$/.test(b) || isNaN(dec)) {
      lines.push(
        lang === "id" ? "Input biner tidak valid." : "Invalid binary input."
      );
    } else {
      lines.push(`➡️ ${map["explain.binaryToDecimal"]}`);
      const bits = b.split("").reverse();
      lines.push(bits.map((bit, i) => `${bit} × 2^${i}`).join(" + "));
      lines.push(
        "= " +
          bits
            .map((bit, i) => (bit === "0" ? "0" : `${Math.pow(2, i)}`))
            .join(" + ")
      );
      lines.push(`= ${dec} (Decimal)`);
      lines.push(SEPARATOR);

      lines.push(`➡️ ${map["explain.binaryToHex"]}`);
      lines.push(map["explain.group4bits"]);
      let paddedB = b;
      while (paddedB.length % 4 !== 0) paddedB = "0" + paddedB;
      const groups4 = paddedB.match(/.{1,4}/g) || [];
      lines.push(groups4.join(" | "));
      lines.push(map["explain.convertEachGroup"]);
      const hexParts = groups4.map(
        (g) => `${g} = ${parseInt(g, 2).toString(16).toUpperCase()}`
      );
      lines.push(hexParts.join(", "));
      lines.push(
        `${map["explain.combineResult"]} ${dec
          .toString(16)
          .toUpperCase()} (Hex)`
      );
      lines.push(SEPARATOR);

      lines.push(`➡️ ${map["explain.binaryToOctal"]}`);
      lines.push(map["explain.group3bits"]);
      let paddedB3 = b;
      while (paddedB3.length % 3 !== 0) paddedB3 = "0" + paddedB3;
      const groups3 = paddedB3.match(/.{1,3}/g) || [];
      lines.push(groups3.join(" | "));
      lines.push(map["explain.convertEachGroup"]);
      const octParts = groups3.map(
        (g) => `${g} = ${parseInt(g, 2).toString(8)}`
      );
      lines.push(octParts.join(", "));
      lines.push(`${map["explain.combineResult"]} ${dec.toString(8)} (Octal)`);
    }
  } else if (source === "decimal") {
    const dec = parseInt(vals.decimal, 10);
    if (isNaN(dec) || dec < 0) {
      lines.push(
        lang === "id" ? "Input desimal tidak valid." : "Invalid decimal input."
      );
    } else {
      lines.push(
        `➡️ ${map["explain.decimalToBinary"]} (${map["explain.divisionMethod"]})`
      );
      let temp = dec;
      if (temp === 0) lines.push("0 ÷ 2 = 0, remainder 0");
      while (temp > 0) {
        lines.push(
          `${temp} ÷ 2 = ${Math.floor(temp / 2)}, remainder ${temp % 2}`
        );
        temp = Math.floor(temp / 2);
      }
      lines.push(`${map["explain.readUpwards"]} ${dec.toString(2)} (Binary)`);
      lines.push(SEPARATOR);

      lines.push(
        `➡️ ${map["explain.decimalToHex"]} (${map["explain.divisionMethod"]})`
      );
      temp = dec;
      const hexMap = "0123456789ABCDEF";
      if (temp === 0) lines.push("0 ÷ 16 = 0, remainder 0");
      while (temp > 0) {
        lines.push(
          `${temp} ÷ 16 = ${Math.floor(temp / 16)}, remainder ${temp % 16} (${
            hexMap[temp % 16]
          })`
        );
        temp = Math.floor(temp / 16);
      }
      lines.push(
        `${map["explain.readUpwards"]} ${dec.toString(16).toUpperCase()} (Hex)`
      );
      lines.push(SEPARATOR);

      lines.push(
        `➡️ ${map["explain.decimalToOctal"]} (${map["explain.divisionMethod"]})`
      );
      temp = dec;
      if (temp === 0) lines.push("0 ÷ 8 = 0, remainder 0");
      while (temp > 0) {
        lines.push(
          `${temp} ÷ 8 = ${Math.floor(temp / 8)}, remainder ${temp % 8}`
        );
        temp = Math.floor(temp / 8);
      }
      lines.push(`${map["explain.readUpwards"]} ${dec.toString(8)} (Octal)`);
    }
  } else if (source === "hex") {
    const hx = vals.hex.toUpperCase();
    const dec = parseInt(hx, 16);
    if (!/^[0-9A-F]+$/.test(hx) || isNaN(dec)) {
      lines.push(
        lang === "id" ? "Input heksa tidak valid." : "Invalid hex input."
      );
    } else {
      lines.push(`➡️ ${map["explain.hexToDecimal"]}`);
      const chars = hx.split("").reverse();
      lines.push(chars.map((ch, i) => `${ch} × 16^${i}`).join(" + "));
      lines.push(
        "= " +
          chars
            .map((ch, i) => `(${parseInt(ch, 16)} × ${Math.pow(16, i)})`)
            .join(" + ")
      );
      lines.push(`= ${dec} (Decimal)`);
      lines.push(SEPARATOR);

      lines.push(`➡️ ${map["explain.hexToBinary"]}`);
      lines.push(map["explain.convertEachGroup"]);
      const binParts = hx.split("").map((ch) => {
        let bin = parseInt(ch, 16).toString(2);
        while (bin.length < 4) bin = "0" + bin;
        return `${ch} = ${bin}`;
      });
      lines.push(binParts.join(", "));
      lines.push(`${map["explain.combineResult"]} ${dec.toString(2)} (Binary)`);
      lines.push(SEPARATOR);

      lines.push(`➡️ ${map["explain.hexToOctal"]}`);
      lines.push(`${map["explain.step1"]}`);
      lines.push(`${hx} = ${dec.toString(2)} (Binary)`);
      lines.push(map["explain.step2"]);
      let paddedB3 = dec.toString(2);
      while (paddedB3.length % 3 !== 0) paddedB3 = "0" + paddedB3;
      const groups3 = paddedB3.match(/.{1,3}/g) || [];
      lines.push(`${dec.toString(2)} -> ${groups3.join(" | ")}`);
      lines.push(`${map["explain.combineResult"]} ${dec.toString(8)} (Octal)`);
    }
  } else if (source === "octal") {
    const oc = vals.octal;
    const dec = parseInt(oc, 8);
    if (!/^[0-7]+$/.test(oc) || isNaN(dec)) {
      lines.push(
        lang === "id" ? "Input oktal tidak valid." : "Invalid octal input."
      );
    } else {
      lines.push(`➡️ ${map["explain.octToDecimal"]}`);
      const digits = oc.split("").reverse();
      lines.push(digits.map((d, i) => `${d} × 8^${i}`).join(" + "));
      lines.push(
        "= " + digits.map((d, i) => `(${d} × ${Math.pow(8, i)})`).join(" + ")
      );
      lines.push(`= ${dec} (Decimal)`);
      lines.push(SEPARATOR);

      lines.push(`➡️ ${map["explain.octToBinary"]}`);
      lines.push(map["explain.convertEachGroup"]);
      const binParts = oc.split("").map((d) => {
        let bin = parseInt(d, 8).toString(2);
        while (bin.length < 3) bin = "0" + bin;
        return `${d} = ${bin}`;
      });
      lines.push(binParts.join(", "));
      lines.push(`${map["explain.combineResult"]} ${dec.toString(2)} (Binary)`);
      lines.push(SEPARATOR);

      lines.push(`➡️ ${map["explain.octToHex"]}`);
      lines.push(`${map["explain.step1"]}`);
      lines.push(`${oc} = ${dec.toString(2)} (Binary)`);
      lines.push(map["explain.step2"]);
      let paddedB4 = dec.toString(2);
      while (paddedB4.length % 4 !== 0) paddedB4 = "0" + paddedB4;
      const groups4 = paddedB4.match(/.{1,4}/g) || [];
      lines.push(`${dec.toString(2)} -> ${groups4.join(" | ")}`);
      lines.push(
        `${map["explain.combineResult"]} ${dec
          .toString(16)
          .toUpperCase()} (Hex)`
      );
    }
  }

  showLoading(false);
  await typeLines(lines, 16);
  state.isExplaining = false;
}

el.binary.addEventListener("input", () => handleInput("binary"));
el.decimal.addEventListener("input", () => handleInput("decimal"));
el.hex.addEventListener("input", () => handleInput("hex"));
el.octal.addEventListener("input", () => handleInput("octal"));

el.clearBtn.addEventListener("click", () => {
  el.binary.value = "";
  el.decimal.value = "";
  el.hex.value = "";
  el.octal.value = "";
  el.explainContent.innerHTML = `<div class="placeholder">${
    I18N[state.resolvedLang]["explain.placeholder"]
  }</div>`;
});

el.downloadBtn.addEventListener("click", () => {
  const textToSave = el.explainContent.innerText;
  if (
    !textToSave ||
    textToSave.startsWith(
      I18N[state.resolvedLang]["explain.placeholder"].substring(0, 10)
    )
  ) {
    return;
  }
  const blob = new Blob([textToSave], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "cosmic_converter_explanation.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

applyLanguage("en");
el.explainContent.innerHTML = `<div class="placeholder">${
  I18N[state.resolvedLang]["explain.placeholder"]
}</div>`;

const btnEN = document.getElementById("lang-en");
const btnID = document.getElementById("lang-id");
const options = [btnEN, btnID];

function selectLanguage(event) {
  options.forEach((btn) => btn.classList.remove("active"));

  event.currentTarget.classList.add("active");
}

options.forEach((btn) => btn.addEventListener("click", selectLanguage));
