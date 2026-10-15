/* =====================================================================
   app.js — Fix My Itch, USA edition
   Client-side filtering, sorting, search, rendering + share form.
   Vanilla JS, no dependencies. Reads window.FMI_DATA from data.js.
   ===================================================================== */
(function () {
  "use strict";

  var DATA = window.FMI_DATA || { CATEGORIES: [], PROBLEMS: [], computeItch: null };
  var CATEGORIES = DATA.CATEGORIES;
  // Working copy so newly-submitted itches can be prepended without touching source.
  var PROBLEMS = DATA.PROBLEMS.slice();

  // ------------------------- State -------------------------
  var state = {
    category: "All",
    sort: "itch",
    query: ""
  };

  // --------------------- Element handles -------------------
  var els = {
    chips: document.getElementById("chips"),
    grid: document.getElementById("grid"),
    search: document.getElementById("search"),
    sort: document.getElementById("sort"),
    count: document.getElementById("count"),
    countWord: document.getElementById("count-word"),
    activeFilter: document.getElementById("active-filter"),
    empty: document.getElementById("empty"),
    heroCount: document.getElementById("hero-count"),
    year: document.getElementById("year"),
    formCat: document.getElementById("f-category"),
    form: document.getElementById("share-form"),
    formConfirm: document.getElementById("form-confirm")
  };

  // ---------------------- Helpers --------------------------

  // Map an Itch Score to a tier class + label for the badge color.
  function tierFor(score) {
    if (score >= 90) return { cls: "hot", label: "Scorching" };
    if (score >= 80) return { cls: "warm", label: "Hot" };
    if (score >= 70) return { cls: "good", label: "Worth it" };
    return { cls: "mild", label: "Simmering" };
  }

  // Escape user/content text before injecting into innerHTML.
  function esc(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Build one sub-dimension mini-bar. `max` is the top of that dimension's scale.
  function dimBar(label, key, value, max) {
    var pct = Math.round((value / max) * 100);
    return (
      '<div class="dim">' +
      '<div class="dim-head"><span>' + label + '</span><span class="dim-val">' + value + "/" + max + "</span></div>" +
      '<div class="bar ' + key + '"><span style="width:' + pct + '%"></span></div>' +
      "</div>"
    );
  }

  // Render a single problem card as an HTML string.
  function cardHTML(p) {
    var t = tierFor(p.itch);
    return (
      '<article class="card' + (p._new ? " card-new" : "") + '">' +
        '<div class="card-top">' +
          '<span class="card-cat">' + esc(p.category) + "</span>" +
          '<div class="score ' + t.cls + '" role="img" aria-label="Itch Score ' + p.itch + ' out of 100, ' + t.label + '">' +
            '<span class="score-num">' + p.itch + "</span>" +
            '<span class="score-lbl">Itch</span>' +
          "</div>" +
        "</div>" +
        '<h3 class="card-title">' + esc(p.title) + "</h3>" +
        '<p class="card-desc">' + esc(p.description) + "</p>" +
        '<div class="dims">' +
          dimBar("Severity", "sev", p.severity, 10) +
          dimBar("Frequency", "freq", p.frequency, 10) +
          dimBar("Whitespace", "white", p.whitespace, 9) +
          dimBar("TAM", "tam", p.tam, 10) +
        "</div>" +
      "</article>"
    );
  }

  // ---------------- Filter / sort pipeline -----------------
  function currentList() {
    var q = state.query.trim().toLowerCase();
    var list = PROBLEMS.filter(function (p) {
      var matchesCat = state.category === "All" || p.category === state.category;
      var matchesQ =
        !q ||
        p.title.toLowerCase().indexOf(q) !== -1 ||
        p.description.toLowerCase().indexOf(q) !== -1 ||
        p.category.toLowerCase().indexOf(q) !== -1;
      return matchesCat && matchesQ;
    });

    var key = state.sort; // itch | severity | tam | frequency
    list.sort(function (a, b) {
      if (b[key] !== a[key]) return b[key] - a[key]; // high -> low
      return b.itch - a.itch; // tie-break on composite
    });
    return list;
  }

  // ------------------------- Render ------------------------
  function render() {
    var list = currentList();

    els.grid.innerHTML = list.map(cardHTML).join("");

    var n = list.length;
    els.count.textContent = String(n);
    els.countWord.textContent = n === 1 ? "itch" : "itches";
    els.activeFilter.textContent =
      state.category === "All" ? "" : " in " + state.category;
    els.empty.hidden = n !== 0;

    // Reflect active chip state.
    var chipEls = els.chips.querySelectorAll(".chip");
    chipEls.forEach(function (c) {
      c.setAttribute("aria-pressed", c.dataset.cat === state.category ? "true" : "false");
    });
  }

  // ---------------------- Build chips ----------------------
  function buildChips() {
    var cats = ["All"].concat(CATEGORIES);
    els.chips.innerHTML = cats
      .map(function (c) {
        var pressed = c === state.category ? "true" : "false";
        return (
          '<button type="button" class="chip" data-cat="' + esc(c) + '" aria-pressed="' + pressed + '">' +
          esc(c) +
          "</button>"
        );
      })
      .join("");

    els.chips.addEventListener("click", function (e) {
      var btn = e.target.closest(".chip");
      if (!btn) return;
      state.category = btn.dataset.cat;
      render();
    });
  }

  // ------------------ Populate form select -----------------
  function buildFormCategories() {
    els.formCat.innerHTML =
      '<option value="" disabled selected>Choose an industry…</option>' +
      CATEGORIES.map(function (c) {
        return '<option value="' + esc(c) + '">' + esc(c) + "</option>";
      }).join("");
  }

  // ----------------------- Listeners -----------------------
  function wireControls() {
    els.search.addEventListener("input", function () {
      state.query = els.search.value;
      render();
    });
    els.sort.addEventListener("change", function () {
      state.sort = els.sort.value;
      render();
    });
  }

  // Handle the "Share your itch" form: no backend — confirm + prepend live.
  function wireForm() {
    els.form.addEventListener("submit", function (e) {
      e.preventDefault();
      var itch = document.getElementById("f-itch").value.trim();
      var category = els.formCat.value;
      var name = document.getElementById("f-name").value.trim();

      if (!itch || !category) {
        els.formConfirm.hidden = false;
        els.formConfirm.style.background = "#fef2f2";
        els.formConfirm.style.borderColor = "#fecaca";
        els.formConfirm.style.color = "#991b1b";
        els.formConfirm.textContent = "Please add your itch and pick an industry.";
        return;
      }

      // Give the submitted itch mid-range scores so it renders sensibly.
      var record = {
        id: "user-" + Date.now(),
        title: itch,
        description:
          (name ? "Submitted by " + name + ". " : "") +
          "A community-submitted itch awaiting Itch Index scoring by our team.",
        category: category,
        severity: 7,
        frequency: 6,
        whitespace: 7,
        tam: 7,
        _new: true
      };
      record.itch = DATA.computeItch ? DATA.computeItch(record) : 78;

      // Prepend to working data and jump the view to it.
      PROBLEMS.unshift(record);
      state.category = "All";
      state.query = "";
      state.sort = "itch";
      els.search.value = "";
      els.sort.value = "itch";
      render();

      els.formConfirm.hidden = false;
      els.formConfirm.style.background = "";
      els.formConfirm.style.borderColor = "";
      els.formConfirm.style.color = "";
      els.formConfirm.textContent =
        "Got it" + (name ? ", " + name : "") +
        "! Your itch is now live at the top of the database. Thanks for sharing.";
      els.form.reset();

      // Scroll to the database so the user sees their new card.
      document.getElementById("database").scrollIntoView({ behavior: "smooth" });
    });
  }

  // ------------------------- Init --------------------------
  function init() {
    if (els.year) els.year.textContent = String(new Date().getFullYear());
    if (els.heroCount) els.heroCount.textContent = String(PROBLEMS.length);
    buildChips();
    buildFormCategories();
    wireControls();
    wireForm();
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
