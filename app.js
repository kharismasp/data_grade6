"use strict";

const icons = {chart: "▥", layers: "▤", spread: "↔", balance: "=", ruler: "⊢", table: "▦", search: "⌕", check: "✓"};
const heroNotes = {
  mode: {values: [2, 3, 3, 4], highlight: [1, 2], caption: "Find the most frequent value"},
  median: {values: [3, 4, 6, 7, 10], highlight: [2], caption: "Find the centre after sorting"},
  mean: {values: [16, "÷", 4, "=", 4], highlight: [4], caption: "Share 16 seeds across 4 trays"},
  range: {values: [9, "−", 4, "=", 5], highlight: [0, 2], caption: "Compare the two extremes"},
  represent: {values: ["▤", "◩", "▥"], labels: ["Table", "Pictogram", "Bar chart"], caption: "One set of counts, three views"},
  detective: {values: ["5 min", "8 min"], labels: ["Median wait", "Mean wait"], caption: "Name the question you want to answer"},
  exam: {values: ["Read", "Plan", "Check"], highlight: [2], caption: "Let the data back up your answer"}
};
const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const fullDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const butterflies = [4, 7, 4, 6, 9];
const levels = ["Core", "Challenge", "Advanced"];
const totalQuestions = lessons.length * levels.length;
const root = document.querySelector("#lesson-root");
const nav = document.querySelector("#topic-nav");
const dialog = document.querySelector("#guide-dialog");
const progressKey = "data-lab-averages-progress-v1";
const solved = new Set();
const practiceDrafts = new Map();
const labDrafts = new Map();
let topicIndex = 0;
let levelIndex = 0;
let lab;

try {
  const saved = JSON.parse(localStorage.getItem(progressKey) ?? "[]");
  if (Array.isArray(saved)) {
    for (const lesson of lessons) {
      for (let i = 0; i < levels.length; i++) {
        const key = questionKey(lesson.id, i);
        if (saved.includes(key)) solved.add(key);
      }
    }
  }
} catch {
  // Answer checking works when the browser disables storage.
}

function questionKey(id, index) {
  return `${id}/${index}`;
}

function renderNavigation() {
  nav.innerHTML = lessons.map(({id, title, icon, cue}, i) => `
    <a class="topic-link" href="#${id}" ${i === topicIndex ? 'aria-current="page"' : ""}>
      <span class="topic-symbol" aria-hidden="true">${icons[icon]}</span>
      <span class="topic-label"><b>${title}</b><small>${cue}</small></span>
      <small class="topic-count" data-topic-count="${id}"></small>
    </a>`).join("");
  updateProgress();
}

function updateProgress() {
  document.querySelector("#progress-text").textContent = `${solved.size} / ${totalQuestions}`;
  const bar = document.querySelector("#progress-bar");
  bar.max = totalQuestions;
  bar.value = solved.size;
  for (const {id} of lessons) {
    const count = levels.reduce((total, _, i) => total + Number(solved.has(questionKey(id, i))), 0);
    const element = nav.querySelector(`[data-topic-count="${id}"]`);
    element.innerHTML = levels.map((_, i) =>
      `<i class="${solved.has(questionKey(id, i)) ? "recorded" : ""}" aria-hidden="true"></i>`).join("");
    element.setAttribute("aria-label", `${count} of 3 questions completed`);
  }
}

function heroGraphic(id) {
  if (id === "explorer") {
    return `<img class="garden-art" src="garden-watch.webp" width="1056" height="704"
      alt="A little field mouse takes notes as butterflies visit the school garden" fetchpriority="high">`;
  }
  const note = heroNotes[id];
  return `<div class="hero-note">
    ${numberCards(note.values, note.highlight, note.labels)}
    <p>${note.caption}</p>
  </div>`;
}

function renderLesson(focusHeading = false) {
  const lesson = lessons[topicIndex];
  const previous = lessons[topicIndex - 1];
  const next = lessons[topicIndex + 1];
  lab = labDrafts.get(lesson.id) ?? {day: 0, group: 0, step: 0, piles: [1, 3, 5, 7], fromTray: null, outlier: false, view: "picture", wait: 20, plan: 0};
  labDrafts.set(lesson.id, lab);
  renderNavigation();
  root.innerHTML = `
    <section class="hero" data-topic="${lesson.id}" aria-labelledby="lesson-heading">
      <div class="hero-copy"><span class="location-label">${lesson.location}</span>
      <h1 id="lesson-heading" tabindex="-1">${lesson.heading}</h1>
      <p>${lesson.intro}</p></div>
      <div class="hero-art">${heroGraphic(lesson.id)}</div>
    </section>
    <p class="hook"><span class="spark" aria-hidden="true">✦</span><span>${lesson.hook}</span></p>
    <div class="lesson-grid">
      <section class="panel example" aria-labelledby="example-heading">
        <div class="panel-kicker"><span aria-hidden="true">≡</span><span class="micro">WORKED EXAMPLE</span></div>
        <h2 id="example-heading">${lesson.idea}</h2>
        <p>${lesson.example}</p>
        <dl class="steps">${lesson.steps.map(([term, value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`).join("")}</dl>
        <p class="takeaway">${lesson.takeaway}</p>
        <details class="talk"><summary>Discuss together</summary>${lesson.discuss}</details>
      </section>
      <section class="panel lab" aria-labelledby="lab-heading">
        <div class="panel-kicker"><span aria-hidden="true">⊹</span><span class="micro">INTERACTIVE LAB</span></div>
        <h2 id="lab-heading">${lesson.labTitle}</h2>
        <p>${lesson.labSub}</p>
        <div class="lab-surface" id="lab-content"></div>
      </section>
    </div>
    <section class="panel practice" aria-labelledby="practice-heading">
      <div class="practice-head">
        <h2 id="practice-heading">Story problems</h2>
        <div class="levels" role="group" aria-label="Practice difficulty">
          ${levels.map((level, i) => `<button type="button" class="level" data-level="${i}" aria-controls="question"></button>`).join("")}
        </div>
      </div>
      <div class="question" id="question"></div>
    </section>
    <nav class="topic-footer" aria-label="Previous and next topic">
      ${previous ? `<a class="secondary-button" href="#${previous.id}">Back · ${previous.title}</a>` : ""}
      <a class="main-button forward" href="#${next?.id ?? lessons[0].id}">${next ? `Next · ${next.title}` : "Revisit the start"}</a>
    </nav>`;
  document.title = `${lesson.title} · The Data Lab`;
  renderLab();
  renderPractice();
  const current = nav.querySelector('[aria-current="page"]');
  if (nav.scrollWidth > nav.clientWidth) {
    nav.scrollLeft = current.offsetLeft - nav.offsetLeft;
  }
  if (focusHeading) {
    window.scrollTo(0, 0);
    document.querySelector("#lesson-heading").focus({preventScroll: true});
  }
}

function segment(label, key, options, active) {
  return `<div class="segmented" role="group" aria-label="${label}">${options.map(([value, text]) =>
    `<button type="button" data-lab="${key}" data-value="${value}" aria-pressed="${active === value}">${text}</button>`).join("")}</div>`;
}

function readout(text) {
  return `<output class="lab-readout">${text}</output>`;
}

function bars(labels, values, {active = null, scale = Math.max(...values, 1), key, high = []} = {}) {
  return `<div class="bar-chart">${labels.map((label, i) => {
    const name = key === "day" ? fullDays[i] : label;
    const contents = `<span class="chart-track"><span class="chart-bar ${high.includes(i) ? "high" : ""}" style="--bar-height:${values[i] / scale * 71}%"><span class="chart-number">${values[i]}</span></span></span><span>${label}</span>`;
    return key
      ? `<button class="chart-item" type="button" data-lab="${key}" data-value="${i}" aria-label="${name}, ${values[i]} butterflies" aria-pressed="${active === i}">${contents}</button>`
      : `<div class="chart-item" aria-label="${name}, ${values[i]}">${contents}</div>`;
  }).join("")}</div>`;
}

function table(data, highlight = [], caption = "") {
  return `<div class="table-wrap"><table class="data-table">${caption ? `<caption>${caption}</caption>` : ""}
    <thead><tr>${data.headers.map(header => `<th scope="col">${header}</th>`).join("")}</tr></thead>
    <tbody>${data.rows.map(([label, ...cells], i) => `<tr class="${highlight.includes(i) ? "focus-row" : ""}"><th scope="row">${label}</th>${cells.map(value => `<td>${value}</td>`).join("")}</tr>`).join("")}</tbody>
  </table></div>`;
}

function pictogram(data) {
  const unit = data.headers[1].toLowerCase();
  return table({
    headers: data.headers,
    rows: data.rows.map(([label, value]) => {
      const full = "<span class='leaf'></span>".repeat(Math.floor(value / 2));
      const half = value % 2 ? "<span class='leaf half'></span>" : "";
      return [label, `<span class="pictograms" role="img" aria-label="${Math.floor(value / 2)} full leaf symbols${half ? " and one half leaf symbol" : ""}">${full}${half}</span>`];
    })
  }, [], `Key · 1 full leaf = 2 ${unit} · ½ leaf = 1 ${unit.slice(0, -1)}`);
}

function renderData(key, view) {
  const data = dataSets[key];
  if (view === "picture") return pictogram(data);
  if (view === "bars") return bars(data.rows.map(row => row[0]), data.rows.map(row => row[1]));
  return table(data);
}

function numberCards(values, highlights = [], titles = []) {
  return `<div class="number-cards">${values.map((value, i) =>
    `<span class="number-card ${highlights.includes(i) ? "highlight" : ""}">${titles[i] ? `<small>${titles[i]}</small>` : ""}${value}</span>`).join("")}</div>`;
}

function modeLab() {
  const groups = [[2, 3, 3, 4, 6], [2, 2, 3, 4, 4, 6], [2, 3, 4, 5, 6]];
  const values = groups[lab.group];
  const labels = [...new Set(values)];
  const frequencies = labels.map(value => values.filter(item => item === value).length);
  const maximum = Math.max(...frequencies);
  const high = labels.map((_, i) => i).filter(i => frequencies[i] === maximum && maximum > 1);
  const summary = ["Mode = 3, with frequency 2.", "Modes = 2 and 4. Each occurs twice.", "No mode here. All values have the same frequency."];
  return segment("Data set", "group", [[0,"One mode"], [1,"Two modes"], [2,"No mode"]], lab.group)
    + numberCards(values)
    + bars(labels, frequencies, {scale: 2, high})
    + readout(summary[lab.group]);
}

function medianLab() {
  const values = lab.group === 0 ? [10, 4, 7, 3, 6] : [12, 4, 8, 6];
  const ordered = [...values].sort((a, b) => a - b);
  const middle = Math.floor(values.length / 2);
  const highlights = values.length % 2 ? [middle] : [middle - 1, middle];
  const summary = lab.step === 0 ? "Sort the values from smallest to largest."
    : lab.step === 1 ? "Now locate the middle position or pair."
    : lab.group === 0 ? "The middle value is 6 minutes." : "The middle pair is 6 and 8. Their mean is 7.";
  const action = ["Sort values", "Show middle", "Start over"][lab.step];
  return segment("Number of observations", "group", [[0,"5 values"], [1,"4 values"]], lab.group)
    + numberCards(lab.step === 0 ? values : ordered, lab.step === 2 ? highlights : [])
    + `<button class="secondary-button" type="button" data-lab="step">${action}</button>`
    + readout(summary);
}

function meanLab() {
  const even = lab.piles.every(value => value === 4);
  const trays = lab.piles.map((count, i) => {
    const letter = "ABCD"[i];
    return `<button type="button" class="seed-tray" data-lab="tray" data-value="${i}"
      aria-pressed="${lab.fromTray === i}" aria-label="Tray ${letter}, ${count} ${count === 1 ? "seed" : "seeds"}">
      <span class="tray-title"><span>${letter}</span><strong>${count}</strong></span>
      <span class="tray-seeds" aria-hidden="true">${'<i class="seed"></i>'.repeat(count)}</span>
    </button>`;
  }).join("");
  let message = "Total · 16 seeds across 4 trays.";
  if (even) message = "Each tray has 4 seeds. The total is still 16.";
  if (lab.fromTray !== null) message = `Tray ${"ABCD"[lab.fromTray]} selected. Tap another tray to move one seed.`;
  return `<div class="seed-trays" role="group" aria-label="Seed-sharing trays">${trays}</div>
    <div class="lab-controls">
      <button class="secondary-button" type="button" data-lab="move" aria-disabled="${even}">Auto-share one seed</button>
      <button class="secondary-button" type="button" data-lab="reset">Reset</button>
    </div>` + readout(message);
}

function rangeLab() {
  const values = lab.outlier ? [...butterflies, 15] : butterflies;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const position = value => 100 * value / 16;
  return segment("Change the range", "outlier", [[0,"Original counts"], [1,"Add a count of 15"]], Number(lab.outlier))
    + numberCards(values)
    + `<div class="range-line" aria-hidden="true">
      <div class="range-axis"></div>
      <div class="range-span" style="left:${position(min)}%;width:${position(max) - position(min)}%"></div>
      ${[min, max].map(value => `<span class="range-point" style="left:${position(value)}%"><b>${value}</b></span>`).join("")}
    </div>` + readout(`Range = ${max} − ${min} = ${max - min} butterflies.`);
}

function detectiveLab() {
  return `<label class="slider-row" for="wait-slider">Fifth wait · <span id="wait-value"></span>
    <input id="wait-slider" type="range" min="6" max="30" step="1" value="${lab.wait}">
  </label>
  <div class="stat-row" aria-label="Three data summaries">
    <div><small>Mean</small><strong id="wait-mean"></strong></div>
    <div><small>Median</small><strong id="wait-median"></strong></div>
    <div><small>Range</small><strong id="wait-range"></strong></div>
  </div>`
  + readout("The first four waits are 4, 5, 5 and 6 minutes.");
}

function updateWait() {
  document.querySelector("#wait-value").textContent = `${lab.wait} min`;
  document.querySelector("#wait-mean").textContent = (20 + lab.wait) / 5;
  document.querySelector("#wait-median").textContent = 5;
  document.querySelector("#wait-range").textContent = lab.wait - 4;
}

function examLab() {
  const plans = [
    {highlight: [0], words: "Together: add across the tea row. 3 + 5 = 8 cups."},
    {highlight: [0, 2], words: "How many more: subtract in Stall A’s column. 6 − 3 = 3 cups."},
    {highlight: [0, 1, 2], words: "Each stall’s total: add down each column. A = 13 cups, B = 12 cups."}
  ];
  return segment("Questions to plan", "plan", [[0,"Tea together"], [1,"Compare at A"], [2,"Total by stall"]], lab.plan)
    + table(dataSets.demoStalls, plans[lab.plan].highlight)
    + readout(plans[lab.plan].words);
}

const labRenderers = {
  explorer: () => bars(days, butterflies, {active: lab.day, key: "day"}) + readout(`${fullDays[lab.day]} · ${butterflies[lab.day]} butterflies.`),
  mode: modeLab, median: medianLab, mean: meanLab, range: rangeLab,
  represent: () => segment("Data display", "view", [["picture","Pictogram"], ["table","Table"], ["bars","Bar chart"]], lab.view)
    + `<div class="plot-break">${renderData("plants", lab.view)}</div>`,
  detective: detectiveLab, exam: examLab
};

function renderLab() {
  const id = lessons[topicIndex].id;
  const panel = document.querySelector("#lab-content");
  panel.innerHTML = labRenderers[id]();
  if (id === "detective") updateWait();
}

function updateLab(button) {
  const action = button.dataset.lab;
  const value = button.dataset.value;
  if (button.getAttribute("aria-disabled") === "true") return;
  switch (action) {
    case "group":
      lab.group = Number(value);
      lab.step = 0;
      break;
    case "day":
    case "plan":
      lab[action] = Number(value);
      break;
    case "step":
      lab.step = (lab.step + 1) % 3;
      break;
    case "outlier":
      lab.outlier = value === "1";
      break;
    case "view":
      lab.view = value;
      break;
    case "tray": {
      const target = Number(value);
      if (lab.fromTray === target) {
        lab.fromTray = null;
      } else if (lab.fromTray !== null) {
        lab.piles[lab.fromTray]--;
        lab.piles[target]++;
        lab.fromTray = null;
      } else if (lab.piles[target] > 0) {
        lab.fromTray = target;
      }
      break;
    }
    case "move": {
      const receiver = lab.piles.indexOf(Math.min(...lab.piles));
      const giver = lab.piles.indexOf(Math.max(...lab.piles));
      lab.piles[receiver]++;
      lab.piles[giver]--;
      lab.fromTray = null;
      break;
    }
    case "reset":
      lab.piles = [1, 3, 5, 7];
      lab.fromTray = null;
      break;
  }
  renderLab();
  const selector = `[data-lab="${action}"]` + (value === undefined ? "" : `[data-value="${value}"]`);
  root.querySelector(selector)?.focus({preventScroll: true});
}

function activeQuestion() {
  return lessons[topicIndex].questions[levelIndex];
}

function activeKey() {
  return questionKey(lessons[topicIndex].id, levelIndex);
}

function choices(question) {
  if (question.type === "judge") {
    return `<div class="question-list">${question.options.map((option, i) => `
      <fieldset class="judge-row">
        <legend>${option}</legend>
        <div class="judge-options">${["True", "False"].map(value =>
          `<label class="option"><input name="judge-${i}" type="radio" value="${value}">${value}</label>`).join("")}</div>
      </fieldset>`).join("")}</div>`;
  }
  const multiple = question.type === "multi";
  return `<fieldset class="question-list">
    <legend>${multiple ? "Choose all that apply." : "Choose one answer."}</legend>
    ${question.options.map((option, i) => `
      <label class="option"><input name="choice" type="${multiple ? "checkbox" : "radio"}" value="${i}">${option}</label>`).join("")}
  </fieldset>`;
}

function storyEvidence(evidence) {
  const {label, values} = evidence;
  const rows = Array.isArray(values[0]);
  return `<div class="evidence">
    <strong>${label}</strong>
    ${rows
      ? `<dl class="evidence-rows">${values.map(([name, value]) => `<div><dt>${name}</dt><dd>${value}</dd></div>`).join("")}</dl>`
      : numberCards(values)}
  </div>`;
}

function renderPractice() {
  const lesson = lessons[topicIndex];
  const question = activeQuestion();
  root.querySelectorAll("[data-level]").forEach((button, i) => {
    const done = solved.has(questionKey(lesson.id, i));
    button.textContent = levels[i] + (done ? " ✓" : "");
    button.setAttribute("aria-label", levels[i] + (done ? ", completed" : ""));
    button.setAttribute("aria-pressed", String(i === levelIndex));
  });
  const prior = practiceDrafts.get(activeKey());
  root.querySelector("#question").innerHTML = `
    <div class="story-card" data-tier="${levelIndex}">
      <h3>${question.title}</h3>
      <p class="story-scene">${question.scene}</p>
      ${question.evidence ? storyEvidence(question.evidence) : ""}
      ${question.data ? `<div class="evidence evidence-table">${renderData(question.data, question.view)}</div>` : ""}
      <p class="question-prompt" id="question-prompt">${question.prompt}</p>
    </div>
    <form id="answer-form" aria-labelledby="question-prompt" novalidate>
      ${question.type ? choices(question) : `<div class="answer-fields">${(question.fields ?? ["Your answer"]).map((label, i) =>
        `<label class="num-field">${label}<input type="text" name="value-${i}" inputmode="decimal" autocomplete="off" spellcheck="false"></label>`).join("")}</div>`}
      <div class="question-actions">
        <button class="main-button" type="submit">Check answer</button>
        <button class="secondary-button" type="button" id="hint" aria-controls="hint-text" aria-expanded="false">Hint</button>
        <button class="secondary-button" type="button" id="solution" aria-controls="solution-text" aria-expanded="false">Worked solution</button>
      </div>
      <p id="feedback" class="feedback" role="status"></p>
      ${levelIndex + 1 < levels.length ? `<button type="button" class="secondary-button next-level" data-next-level="${levelIndex + 1}" hidden>Try ${levels[levelIndex + 1]}</button>` : ""}
      <p id="hint-text" class="explanation" hidden>${question.hint}</p>
      <p id="solution-text" class="explanation" hidden>${question.solution}</p>
    </form>`;
  if (prior) {
    const values = new Map(prior.values);
    root.querySelectorAll("#answer-form input").forEach(field => {
      if (field.type === "checkbox" || field.type === "radio") {
        field.checked = prior.values.some(([name, value]) => name === field.name && value === field.value);
      } else {
        field.value = values.get(field.name) ?? "";
      }
    });
  }
}

function numericAnswer(value) {
  const normalized = value.trim().replace(",", ".");
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(normalized)) return NaN;
  return Number(normalized);
}

function checkAnswer(question, form) {
  const data = new FormData(form);
  if (question.type === "multi" || question.type === "choice") {
    const submitted = data.getAll("choice").map(Number);
    if (!submitted.length) return {prompt: "Choose an answer first."};
    const expected = Array.isArray(question.answer) ? question.answer : [question.answer];
    return {correct: expected.length === submitted.length && expected.every(value => submitted.includes(value))};
  }
  if (question.type === "judge") {
    const submitted = question.options.map((_, i) => data.get(`judge-${i}`));
    if (submitted.includes(null)) return {prompt: "Choose true or false for every statement."};
    return {correct: question.answer.every((value, i) => value === submitted[i])};
  }
  const expected = Array.isArray(question.answer) ? question.answer : [question.answer];
  const submitted = expected.map((_, i) => numericAnswer(String(data.get(`value-${i}`) ?? "")));
  if (submitted.some(value => !Number.isFinite(value))) return {prompt: "Enter a number in each answer box."};
  return {correct: expected.every((value, i) => Math.abs(value - submitted[i]) < 1e-9)};
}

function saveDraft(form) {
  practiceDrafts.set(activeKey(), {values: [...new FormData(form)]});
}

root.addEventListener("click", event => {
  const level = event.target.closest("[data-level], [data-next-level]");
  const labButton = event.target.closest("[data-lab]");
  const explanation = event.target.closest("[aria-controls='hint-text'], [aria-controls='solution-text']");
  if (level) {
    levelIndex = Number(level.dataset.level ?? level.dataset.nextLevel);
    renderPractice();
    if (level.dataset.nextLevel) {
      root.querySelector(`[data-level="${levelIndex}"]`).focus();
    }
  } else if (labButton) {
    updateLab(labButton);
  } else if (explanation) {
    const content = document.getElementById(explanation.getAttribute("aria-controls"));
    content.hidden = !content.hidden;
    explanation.setAttribute("aria-expanded", String(!content.hidden));
  }
});

root.addEventListener("input", event => {
  if (event.target.id === "wait-slider") {
    lab.wait = Number(event.target.value);
    updateWait();
  }
  const form = event.target.closest("#answer-form");
  if (form) saveDraft(form);
});

root.addEventListener("submit", event => {
  if (event.target.id !== "answer-form") return;
  event.preventDefault();
  const result = checkAnswer(activeQuestion(), event.target);
  const status = document.querySelector("#feedback");
  status.classList.toggle("good", result.correct === true);
  status.textContent = result.prompt ?? (result.correct ? "Correct! Which clue helped you decide?" : "Try once more. Open a hint if you want a starting point.");
  const nextLevel = root.querySelector("[data-next-level]");
  if (nextLevel) nextLevel.hidden = result.correct !== true;
  if (result.correct) {
    solved.add(activeKey());
    try { localStorage.setItem(progressKey, JSON.stringify([...solved])); } catch { /* Keep session progress. */ }
    const doneButton = root.querySelector(`[data-level="${levelIndex}"]`);
    doneButton.textContent = `${levels[levelIndex]} ✓`;
    doneButton.setAttribute("aria-label", `${levels[levelIndex]}, completed`);
    updateProgress();
  }
});

const dialogs = {
  terms: {
    title: "Key terms · English & Bahasa Indonesia",
    content: `<dl class="steps">
      <div><dt>Data set</dt><dd>Kumpulan data</dd></div>
      <div><dt>Frequency</dt><dd>Frekuensi</dd></div>
      <div><dt>Mode</dt><dd>Modus</dd></div>
      <div><dt>Median</dt><dd>Median / nilai tengah setelah diurutkan</dd></div>
      <div><dt>Mean</dt><dd>Rata-rata hitung</dd></div>
      <div><dt>Range</dt><dd>Jangkauan</dd></div>
      <div><dt>Outlier</dt><dd>Pencilan / nilai yang jauh dari data lain</dd></div>
      <div><dt>Pictogram</dt><dd>Piktogram / diagram gambar</dd></div>
    </dl>`
  },
  teacher: {
    title: "Teacher notes",
    content: `<ul>
      <li><strong>Model one example.</strong> Ask the learner to make a prediction before changing something in the lab.</li>
      <li><strong>Start with Core.</strong> Use Challenge when the idea is clear. Advanced works well as a shared discussion or extension.</li>
      <li><strong>Ask for evidence.</strong> After checking an answer, ask which numbers, labels or comparisons support it.</li>
    </ul>
    <p>Cambridge Stage 6 objectives 6Ss.02–6Ss.04 inform this lesson’s selection of data displays, summaries and comparisons. The exam tasks are original and practise reading and using data in formats used in TKA SD.</p>
    <ul>
      <li><a href="https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/curriculum/mathematics/" target="_blank" rel="noopener noreferrer">Cambridge Primary Mathematics (0096)</a></li>
      <li><a href="https://pusmendik.kemendikdasmen.go.id/tka/kerangka/sd/?jenis=mata-pelajaran-wajib&amp;mapel=matematika" target="_blank" rel="noopener noreferrer">Pusmendik · TKA SD Mathematics framework</a></li>
    </ul>`
  }
};

for (const [id, info] of Object.entries(dialogs)) {
  document.querySelector(`#${id}-button`).addEventListener("click", () => {
    document.querySelector("#dialog-title").textContent = info.title;
    document.querySelector("#dialog-body").innerHTML = info.content;
    dialog.showModal();
  });
}

function route(focusHeading) {
  const id = location.hash.slice(1);
  if (id === "content") return;
  topicIndex = Math.max(0, lessons.findIndex(lesson => lesson.id === id));
  levelIndex = 0;
  renderLesson(focusHeading);
}

window.addEventListener("hashchange", () => route(true));
if (location.hash === "#content") history.replaceState(null, "", location.pathname + location.search);
route(false);
