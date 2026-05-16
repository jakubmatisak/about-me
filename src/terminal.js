// Role-driven typewriter. Renders a script of { type, text, hold?, cls? } lines
// into a mount node. On role/lang change, reset() wipes and replays the new script.

import { termScripts, getLang, tr } from "./i18n.js";

const CARET_MS = 520;
const CHAR_MIN = 26;
const CHAR_JITTER = 24;
const OUT_DELAY = 90;
const CMD_HOLD = 200;

export function createTerminal(mountEl, getRole) {
  const head = document.createElement("div");
  head.className = "term-head";
  head.innerHTML = `
    <span class="tdot tdot--r"></span>
    <span class="tdot tdot--y"></span>
    <span class="tdot tdot--g"></span>
    <span class="term-title"></span>
  `;
  const body = document.createElement("div");
  body.className = "term-body";

  mountEl.classList.add("terminal");
  mountEl.replaceChildren(head, body);

  const titleEl = head.querySelector(".term-title");

  let timers = [];
  let caretEl = null;
  let caretOn = true;
  let caretTimer = null;

  function clearTimers() {
    timers.forEach((t) => clearTimeout(t));
    timers = [];
  }

  function setTitle() {
    titleEl.textContent = tr().hero.termTitle + getRole();
  }

  function emitLine(node) {
    const line = document.createElement("div");
    line.className = `tl tl--${node.type} ${node.cls || ""}`.trim();
    if (node.type === "cmd") {
      line.innerHTML = `<span class="prompt">➜</span> <span class="path">~</span> `;
      const txt = document.createElement("span");
      txt.textContent = node.text;
      line.appendChild(txt);
    } else {
      const span = document.createElement("span");
      span.textContent = node.text;
      line.appendChild(span);
    }
    body.appendChild(line);
  }

  function startCaret() {
    stopCaret();
    caretTimer = setInterval(() => {
      caretOn = !caretOn;
      if (caretEl) caretEl.style.opacity = caretOn ? "1" : "0";
    }, CARET_MS);
  }
  function stopCaret() {
    if (caretTimer) clearInterval(caretTimer);
    caretTimer = null;
  }

  function play(script, idx) {
    if (idx >= script.length) return;
    const node = script[idx];

    if (node.hold) {
      // Final blinking line (e.g. "_").
      const line = document.createElement("div");
      line.className = "tl tl--cmd";
      line.innerHTML = `<span class="prompt">➜</span> <span class="path">~</span> `;
      const txt = document.createElement("span");
      txt.textContent = node.text === "_" ? "" : node.text;
      line.appendChild(txt);
      caretEl = document.createElement("span");
      caretEl.className = "caret";
      caretEl.textContent = "█";
      line.appendChild(caretEl);
      body.appendChild(line);
      startCaret();
      return;
    }

    if (node.type === "cmd") {
      const line = document.createElement("div");
      line.className = "tl tl--cmd";
      line.innerHTML = `<span class="prompt">➜</span> <span class="path">~</span> `;
      const typed = document.createElement("span");
      line.appendChild(typed);
      const caret = document.createElement("span");
      caret.className = "caret";
      caret.textContent = "█";
      line.appendChild(caret);
      body.appendChild(line);

      caretEl = caret;
      startCaret();

      let i = 0;
      const step = () => {
        i++;
        typed.textContent = node.text.slice(0, i);
        if (i >= node.text.length) {
          stopCaret();
          caret.remove();
          caretEl = null;
          timers.push(setTimeout(() => play(script, idx + 1), CMD_HOLD));
        } else {
          timers.push(setTimeout(step, CHAR_MIN + Math.random() * CHAR_JITTER));
        }
      };
      timers.push(setTimeout(step, CHAR_MIN));
      return;
    }

    // out line
    emitLine(node);
    timers.push(setTimeout(() => play(script, idx + 1), OUT_DELAY));
  }

  function reset() {
    clearTimers();
    stopCaret();
    caretEl = null;
    body.replaceChildren();
    setTitle();
    const script = termScripts(getLang())[getRole()] || termScripts(getLang()).dev;
    play(script, 0);
  }

  return { reset };
}
