/* =====================================================================
   app.js — Fix My Itch, USA edition
   Client-side filtering, sorting, search, rendering, the itch detail
   view (deep-linkable at #itch/<id>), and the share form.
   Vanilla JS, no dependencies. Reads window.FMI_DATA (data.js) and
   window.FMI_RESEARCH (research.js).
   ===================================================================== */
(function () {
  "use strict";

  var DATA = window.FMI_DATA || { CATEGORIES: [], PROBLEMS: [], computeItch: null };
  var RESEARCH = window.FMI_RESEARCH || {};
  var CATEGORIES = DATA.CATEGORIES;
  // Working copy so newly-submitted itches can be prepended without touching source.
  var PROBLEMS = DATA.PROBLEMS.slice();

  // ------------------------- State -------------------------
  var state = {
    category: "All",
    sort: "itch",
    query: "",
    shortlistOnly: false
  };

  // Detail-view state.
  var detail = {
    current: null,      // the problem record being shown
    tab: "overview",    // overview | market | build
    openedInApp: false, // true when we pushed the #itch hash ourselves
    returnFocus: null   // element to refocus on close
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
    heroCats: document.getElementById("hero-cats"),
    year: document.getElementById("year"),
    formCat: document.getElementById("f-category"),
    form: document.getElementById("share-form"),
    formConfirm: document.getElementById("form-confirm"),
    shortlistToggle: document.getElementById("shortlist-toggle"),
    shortlistCount: document.getElementById("shortlist-count"),
    dialog: document.getElementById("detail"),
    dBody: document.getElementById("d-body"),
    dPrev: document.getElementById("d-prev"),
    dNext: document.getElementById("d-next"),
    dPos: document.getElementById("d-pos"),
    dSave: document.getElementById("d-save"),
    dShare: document.getElementById("d-share"),
    dClose: document.getElementById("d-close"),
    toast: document.getElementById("toast"),
    themeToggle: document.getElementById("theme-toggle")
  };

  // ---------------- Personal storage (this browser only) ----------------
  // Saved itches, validation checklist ticks, and private notes.
  var STORE_KEY = "fmi-us-v1";
  var store = loadStore();

  function loadStore() {
    var empty = { saved: {}, checks: {}, notes: {} };
    try {
      var raw = window.localStorage.getItem(STORE_KEY);
      if (!raw) return empty;
      var parsed = JSON.parse(raw);
      return {
        saved: parsed.saved || {},
        checks: parsed.checks || {},
        notes: parsed.notes || {}
      };
    } catch (e) {
      return empty;
    }
  }

  function saveStore() {
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(store));
    } catch (e) {
      /* Storage unavailable (private mode, blocked) — features still work for this visit. */
    }
  }

  function isSaved(id) { return !!store.saved[id]; }
  function savedCount() { return Object.keys(store.saved).length; }
  function checksFor(id) { return store.checks[id] || []; }
  function checksDone(id) { return checksFor(id).filter(Boolean).length; }

  // ------------------------- Theme -------------------------
  // Dark is the default; the choice is remembered per browser. The page
  // applies a stored theme before first paint via a script in index.html.
  var THEME_KEY = "fmi-us-theme";

  function currentTheme() {
    return document.documentElement.dataset.theme === "light" ? "light" : "dark";
  }

  function applyTheme(theme) {
    if (theme === "light") document.documentElement.dataset.theme = "light";
    else delete document.documentElement.dataset.theme; // dark is the :root default
    var next = theme === "light" ? "dark" : "light";
    if (els.themeToggle) {
      els.themeToggle.setAttribute("aria-label", "Switch to " + next + " theme");
      els.themeToggle.title = "Switch to " + next + " theme";
      var icon = els.themeToggle.querySelector(".theme-icon");
      if (icon) icon.textContent = theme === "light" ? "\u263D" : "\u2600"; // moon : sun
    }
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      /* Storage blocked: the toggle still works for this visit. */
    }
  }

  function wireTheme() {
    if (!els.themeToggle) return;
    applyTheme(currentTheme()); // sync icon and label with whatever loaded
    els.themeToggle.addEventListener("click", function () {
      applyTheme(currentTheme() === "light" ? "dark" : "light");
    });
  }

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

  function findById(id) {
    for (var i = 0; i < PROBLEMS.length; i++) {
      if (String(PROBLEMS[i].id) === String(id)) return PROBLEMS[i];
    }
    return null;
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

  function dimsHTML(p) {
    return (
      dimBar("Severity", "sev", p.severity, 10) +
      dimBar("Frequency", "freq", p.frequency, 10) +
      dimBar("Whitespace", "white", p.whitespace, 9) +
      dimBar("TAM", "tam", p.tam, 10)
    );
  }

  function scoreBadge(p, extraCls) {
    var t = tierFor(p.itch);
    return (
      '<div class="score ' + t.cls + (extraCls ? " " + extraCls : "") + '" role="img" aria-label="Itch Score ' + p.itch + ' out of 100, ' + t.label + '">' +
        '<span class="score-num">' + p.itch + "</span>" +
        '<span class="score-lbl">Itch</span>' +
      "</div>"
    );
  }

  // Render a single problem card as an HTML string. The title link is
  // stretched over the whole card so the entire card opens the detail view.
  function cardHTML(p) {
    var r = RESEARCH[p.id];
    var done = checksDone(p.id);
    var meta = [];
    if (isSaved(p.id)) meta.push('<span class="card-flag saved">★ Saved</span>');
    if (r && done > 0) meta.push('<span class="card-flag progress">' + done + "/" + r.validate.length + " tests done</span>");

    return (
      '<article class="card' + (p._new ? " card-new" : "") + '">' +
        '<div class="card-top">' +
          '<span class="card-cat">' + esc(p.category) + "</span>" +
          scoreBadge(p) +
        "</div>" +
        '<h3 class="card-title"><a class="card-link" href="#itch/' + encodeURIComponent(p.id) + '">' +
          esc(p.title) +
        "</a></h3>" +
        '<p class="card-desc">' + esc(p.description) + "</p>" +
        '<div class="dims">' + dimsHTML(p) + "</div>" +
        '<div class="card-foot">' +
          '<span class="card-meta">' + meta.join("") + "</span>" +
          '<span class="card-cta" aria-hidden="true">' + (r ? "Explore research →" : "Open itch →") + "</span>" +
        "</div>" +
      "</article>"
    );
  }

  // ---------------- Filter / sort pipeline -----------------
  function currentList() {
    var q = state.query.trim().toLowerCase();
    var list = PROBLEMS.filter(function (p) {
      var matchesCat = state.category === "All" || p.category === state.category;
      var matchesSaved = !state.shortlistOnly || isSaved(p.id);
      var matchesQ =
        !q ||
        p.title.toLowerCase().indexOf(q) !== -1 ||
        p.description.toLowerCase().indexOf(q) !== -1 ||
        p.category.toLowerCase().indexOf(q) !== -1;
      return matchesCat && matchesSaved && matchesQ;
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
    var bits = [];
    if (state.category !== "All") bits.push("in " + state.category);
    if (state.shortlistOnly) bits.push("on your shortlist");
    els.activeFilter.textContent = bits.length ? " " + bits.join(", ") : "";
    els.empty.hidden = n !== 0;

    // Reflect active chip state.
    els.chips.querySelectorAll(".chip").forEach(function (c) {
      c.setAttribute("aria-pressed", c.dataset.cat === state.category ? "true" : "false");
    });

    els.shortlistCount.textContent = String(savedCount());
    els.shortlistToggle.setAttribute("aria-pressed", state.shortlistOnly ? "true" : "false");
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
    els.shortlistToggle.addEventListener("click", function () {
      state.shortlistOnly = !state.shortlistOnly;
      render();
    });
    // Opening an itch from a card: remember it was in-app so closing can go "back".
    els.grid.addEventListener("click", function (e) {
      var link = e.target.closest(".card-link");
      if (!link) return;
      detail.openedInApp = true;
      detail.returnFocus = link;
    });
  }

  // =====================================================================
  //   DETAIL VIEW
  // =====================================================================

  // Neighbours for prev/next: the current filtered list if the itch is in it,
  // otherwise every itch by score (e.g. when arriving from a shared link).
  function navList(p) {
    var list = currentList();
    if (list.indexOf(p) === -1) {
      list = PROBLEMS.slice().sort(function (a, b) { return b.itch - a.itch; });
    }
    return list;
  }

  // Up to 3 related itches: same industry first, then the closest Itch Scores.
  function relatedTo(p) {
    var same = PROBLEMS.filter(function (o) { return o !== p && o.category === p.category; })
      .sort(function (a, b) { return b.itch - a.itch; });
    var others = PROBLEMS.filter(function (o) { return o !== p && o.category !== p.category; })
      .sort(function (a, b) { return Math.abs(a.itch - p.itch) - Math.abs(b.itch - p.itch); });
    return same.concat(others).slice(0, 3);
  }

  function listHTML(items, cls) {
    return '<ul class="' + cls + '">' +
      items.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") +
      "</ul>";
  }

  function scoreMathHTML(p) {
    var parts = [
      ["Severity", p.severity, "30%", "sev"],
      ["Frequency", p.frequency, "25%", "freq"],
      ["Whitespace", p.whitespace, "20%", "white"],
      ["TAM", p.tam, "25%", "tam"]
    ];
    return (
      '<p class="score-math">' +
      '<span class="sm-label">How this score is built</span>' +
      parts.map(function (x) {
        return '<span class="sm-part sm-' + x[3] + '"><b>' + x[1] + "</b> " + x[0] + " × " + x[2] + "</span>";
      }).join('<span class="sm-op" aria-hidden="true">+</span>') +
      '<span class="sm-op" aria-hidden="true">→</span><span class="sm-result">' + p.itch + "</span>" +
      "</p>"
    );
  }

  var TABS = [
    ["overview", "Overview"],
    ["market", "Market & gap"],
    ["build", "Build plan"]
  ];

  function tabsHTML() {
    return (
      '<div class="tabs" role="tablist" aria-label="Itch research sections">' +
      TABS.map(function (t) {
        var on = detail.tab === t[0];
        return (
          '<button type="button" role="tab" class="tab" id="tab-' + t[0] + '" data-tab="' + t[0] + '"' +
          ' aria-selected="' + on + '" aria-controls="panel-' + t[0] + '" tabindex="' + (on ? "0" : "-1") + '">' +
          t[1] + "</button>"
        );
      }).join("") +
      "</div>"
    );
  }

  function panel(name, inner) {
    return (
      '<section class="tab-panel" role="tabpanel" id="panel-' + name + '" aria-labelledby="tab-' + name + '"' +
      (detail.tab === name ? "" : " hidden") + ">" + inner + "</section>"
    );
  }

  function notesHTML(p) {
    return (
      '<div class="d-section"><h3><label for="d-notes">My notes</label></h3>' +
      '<textarea id="d-notes" rows="4" placeholder="Ideas, people to call, links… saved in this browser only.">' +
      esc(store.notes[p.id] || "") + "</textarea>" +
      '<p class="d-hint">Your shortlist, checklist and notes stay on this device. Nothing is uploaded.</p></div>'
    );
  }

  function researchPanels(p, r) {
    var overview =
      '<div class="d-section"><h3>Why it itches</h3><p class="d-lead">' + esc(r.why) + "</p></div>" +
      '<div class="d-section"><h3>Who feels it</h3><ul class="persona-row">' +
        r.who.map(function (w) { return '<li class="persona">' + esc(w) + "</li>"; }).join("") +
      "</ul></div>" +
      '<div class="d-section"><h3>Signals the pain is real</h3>' + listHTML(r.evidence, "d-list evidence") + "</div>";

    var market =
      '<div class="d-section"><h3>Who\'s working on it</h3><ul class="players">' +
        r.players.map(function (pl) {
          return '<li class="player"><span class="player-name">' + esc(pl.name) + '</span><span class="player-note">' + esc(pl.note) + "</span></li>";
        }).join("") +
      "</ul></div>" +
      '<div class="d-section gap-callout"><h3>The gap</h3><p>' + esc(r.gap) + "</p></div>" +
      '<div class="d-section"><h3>What could kill it</h3>' + listHTML(r.risks, "d-list risks") + "</div>";

    var checks = checksFor(p.id);
    var build =
      '<div class="d-section"><h3>Startup wedges</h3><ol class="wedges">' +
        r.wedges.map(function (w) { return "<li>" + esc(w) + "</li>"; }).join("") +
      "</ol></div>" +
      '<div class="d-section"><h3>How it makes money</h3><p>' + esc(r.model) + "</p></div>" +
      '<div class="d-section"><h3>Test it this week <span class="progress-pill" id="d-progress">' +
        checksDone(p.id) + "/" + r.validate.length + " done</span></h3>" +
        '<ul class="checklist">' +
        r.validate.map(function (v, i) {
          var id = "chk-" + i;
          return (
            '<li><input type="checkbox" id="' + id + '" data-idx="' + i + '"' + (checks[i] ? " checked" : "") + ">" +
            '<label for="' + id + '">' + esc(v) + "</label></li>"
          );
        }).join("") +
        "</ul>" +
      "</div>" +
      notesHTML(p);

    return panel("overview", overview) + panel("market", market) + panel("build", build);
  }

  // Community-submitted itches have no research yet: show a do-it-yourself plan.
  function pendingPanels(p) {
    var diy = [
      "Write down the last three times you or someone you know hit this problem",
      "Search Reddit and X for people complaining about it and save 10 quotes",
      "List every company that already tries to solve it, and what they charge",
      "Talk to five people who have the problem this week",
      "Estimate how many Americans hit it at least once a month"
    ];
    return (
      '<section class="tab-panel">' +
      '<div class="d-section gap-callout"><h3>Research pending</h3><p>This itch came from the community and hasn\'t been researched yet. Here\'s how to dig in yourself.</p></div>' +
      '<div class="d-section"><h3>Do-it-yourself research plan</h3>' + listHTML(diy, "d-list") + "</div>" +
      notesHTML(p) +
      "</section>"
    );
  }

  function detailHTML(p) {
    var r = RESEARCH[p.id];
    var t = tierFor(p.itch);

    return (
      '<header class="d-head">' +
        '<div class="d-head-text">' +
          '<span class="card-cat">' + esc(p.category) + "</span>" +
          '<h2 id="d-title" class="d-title">' + esc(p.title) + "</h2>" +
          '<p class="d-desc">' + esc(p.description) + "</p>" +
        "</div>" +
        '<div class="d-score">' + scoreBadge(p, "score-lg") + '<span class="d-tier tier-text-' + t.cls + '">' + t.label + "</span></div>" +
      "</header>" +
      '<div class="d-dims">' + dimsHTML(p) + "</div>" +
      scoreMathHTML(p) +
      (r ? tabsHTML() + researchPanels(p, r) : pendingPanels(p)) +
      '<div class="d-section related"><h3>Related itches</h3><div class="related-grid">' +
        relatedTo(p).map(function (o) {
          return (
            '<a class="related-card" href="#itch/' + encodeURIComponent(o.id) + '" data-id="' + esc(o.id) + '">' +
              '<span class="related-score ' + tierFor(o.itch).cls + '">' + o.itch + "</span>" +
              '<span class="related-text"><span class="related-cat">' + esc(o.category) + "</span>" + esc(o.title) + "</span>" +
            "</a>"
          );
        }).join("") +
      "</div></div>" +
      '<p class="d-disclaimer">Illustrative desk research to start your own. Figures are approximate. Verify them before you build on them.</p>'
    );
  }

  function updateSaveButton() {
    var saved = detail.current && isSaved(detail.current.id);
    els.dSave.setAttribute("aria-pressed", saved ? "true" : "false");
    els.dSave.textContent = saved ? "★ Saved" : "☆ Save";
  }

  function showDetail(p) {
    var firstOpen = !els.dialog.open;
    if (firstOpen) detail.tab = "overview"; // keep the chosen tab when stepping between itches
    detail.current = p;
    els.dBody.innerHTML = detailHTML(p);
    els.dBody.scrollTop = 0;

    var list = navList(p);
    var idx = list.indexOf(p);
    els.dPos.textContent = (idx + 1) + " of " + list.length;
    els.dPrev.disabled = idx <= 0;
    els.dNext.disabled = idx >= list.length - 1;
    updateSaveButton();
    document.title = p.title + " · Fix My Itch — USA edition";

    if (firstOpen) {
      if (!detail.returnFocus) detail.returnFocus = document.activeElement;
      if (typeof els.dialog.showModal === "function") {
        els.dialog.showModal();
      } else {
        els.dialog.setAttribute("open", "");
      }
      els.dClose.focus();
    }
  }

  function hideDetailUI() {
    if (!els.dialog.open) return;
    if (typeof els.dialog.close === "function") {
      els.dialog.close();
    } else {
      els.dialog.removeAttribute("open");
    }
    detail.current = null;
    document.title = "Fix My Itch — USA edition";
    render(); // refresh card flags (saved / progress)
    var target = detail.returnFocus;
    detail.returnFocus = null;
    // The grid was re-rendered, so refocus the matching new card link.
    if (target && target.getAttribute) {
      var fresh = els.grid.querySelector('.card-link[href="' + target.getAttribute("href") + '"]');
      if (fresh) fresh.focus();
    }
  }

  // Close via the URL so the back button and links stay in sync.
  function requestClose() {
    if (detail.openedInApp) {
      detail.openedInApp = false;
      history.back(); // pops #itch/<id>; hashchange hides the dialog
    } else {
      history.replaceState(null, "", location.pathname + location.search);
      hideDetailUI();
    }
  }

  // Step to another itch without stacking history entries.
  function goTo(p) {
    if (!p) return;
    location.replace("#itch/" + encodeURIComponent(p.id));
  }

  function step(delta) {
    if (!detail.current) return;
    var list = navList(detail.current);
    goTo(list[list.indexOf(detail.current) + delta]);
  }

  function selectTab(name, focus) {
    detail.tab = name;
    els.dBody.querySelectorAll(".tab").forEach(function (t) {
      var on = t.dataset.tab === name;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    });
    els.dBody.querySelectorAll('.tab-panel[role="tabpanel"]').forEach(function (panelEl) {
      panelEl.hidden = panelEl.id !== "panel-" + name;
    });
  }

  function showToast(msg) {
    els.toast.textContent = msg;
    els.toast.hidden = false;
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(function () { els.toast.hidden = true; }, 2400);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      els.dialog.appendChild(ta); // inside the modal so it can take focus
      ta.select();
      try {
        if (document.execCommand("copy")) resolve();
        else reject(new Error("copy failed"));
      } catch (e) {
        reject(e);
      } finally {
        els.dialog.removeChild(ta);
      }
    });
  }

  function wireDetail() {
    els.dClose.addEventListener("click", requestClose);
    els.dPrev.addEventListener("click", function () { step(-1); });
    els.dNext.addEventListener("click", function () { step(1); });

    // Esc: route the close through the URL instead of the dialog's default.
    els.dialog.addEventListener("cancel", function (e) {
      e.preventDefault();
      requestClose();
    });

    // Click on the dimmed backdrop closes.
    els.dialog.addEventListener("click", function (e) {
      if (e.target === els.dialog) requestClose();
    });

    els.dSave.addEventListener("click", function () {
      var p = detail.current;
      if (!p) return;
      if (isSaved(p.id)) {
        delete store.saved[p.id];
        showToast("Removed from your shortlist");
      } else {
        store.saved[p.id] = true;
        showToast("Saved to your shortlist");
      }
      saveStore();
      updateSaveButton();
      els.shortlistCount.textContent = String(savedCount());
    });

    els.dShare.addEventListener("click", function () {
      var p = detail.current;
      if (!p) return;
      var url = location.href;
      if (navigator.share) {
        navigator.share({ title: p.title, text: "An itch worth solving:", url: url }).catch(function () {});
        return;
      }
      copyText(url).then(
        function () { showToast("Link copied. Send it to a friend."); },
        function () { showToast("Copy this link: " + url); }
      );
    });

    // Delegated events inside the re-rendered body.
    els.dBody.addEventListener("click", function (e) {
      var tab = e.target.closest(".tab");
      if (tab) {
        selectTab(tab.dataset.tab, false);
        return;
      }
      var rel = e.target.closest(".related-card");
      if (rel) {
        e.preventDefault();
        goTo(findById(rel.dataset.id));
      }
    });

    // Arrow keys move between tabs (ARIA tabs pattern).
    els.dBody.addEventListener("keydown", function (e) {
      var tab = e.target.closest && e.target.closest(".tab");
      if (!tab || (e.key !== "ArrowRight" && e.key !== "ArrowLeft")) return;
      e.preventDefault();
      e.stopPropagation();
      var tabs = Array.prototype.slice.call(els.dBody.querySelectorAll(".tab"));
      var i = tabs.indexOf(tab) + (e.key === "ArrowRight" ? 1 : -1);
      i = (i + tabs.length) % tabs.length;
      selectTab(tabs[i].dataset.tab, true);
    });

    els.dBody.addEventListener("change", function (e) {
      var box = e.target;
      if (!detail.current || box.type !== "checkbox") return;
      var id = detail.current.id;
      var arr = checksFor(id).slice();
      arr[Number(box.dataset.idx)] = box.checked;
      store.checks[id] = arr;
      saveStore();
      var r = RESEARCH[id];
      var prog = document.getElementById("d-progress");
      if (prog && r) prog.textContent = checksDone(id) + "/" + r.validate.length + " done";
    });

    els.dBody.addEventListener("input", function (e) {
      if (!detail.current || e.target.id !== "d-notes") return;
      var val = e.target.value;
      if (val.trim()) store.notes[detail.current.id] = val;
      else delete store.notes[detail.current.id];
      saveStore();
    });

    // ←/→ step between itches when focus isn't in a form field or the tab list.
    els.dialog.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      var tag = (e.target.tagName || "").toLowerCase();
      if (tag === "textarea" || tag === "input" || tag === "select") return;
      if (e.target.closest && e.target.closest(".tab")) return;
      e.preventDefault();
      step(e.key === "ArrowRight" ? 1 : -1);
    });
  }

  // ------------------------- Routing ------------------------
  // #itch/<id> opens that itch; anything else closes the detail view.
  function route() {
    var m = location.hash.match(/^#itch\/(.+)$/);
    if (m) {
      var p = findById(decodeURIComponent(m[1]));
      if (p) {
        showDetail(p);
        return;
      }
    }
    detail.openedInApp = false;
    hideDetailUI();
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
        els.formConfirm.classList.add("is-error");
        els.formConfirm.textContent = "Add your itch and pick an industry, then submit again.";
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
      state.shortlistOnly = false;
      els.search.value = "";
      els.sort.value = "itch";
      render();

      els.formConfirm.hidden = false;
      els.formConfirm.classList.remove("is-error");
      els.formConfirm.textContent =
        "Got it" + (name ? ", " + name : "") +
        "! Your itch is now in the database. Open it to start your own research plan.";
      els.form.reset();

      // Scroll to the database so the user sees their new card.
      document.getElementById("database").scrollIntoView({ behavior: "smooth" });
    });
  }

  // ------------------------- Init --------------------------
  function init() {
    if (els.year) els.year.textContent = String(new Date().getFullYear());
    if (els.heroCount) els.heroCount.textContent = String(PROBLEMS.length);
    if (els.heroCats) els.heroCats.textContent = String(CATEGORIES.length);
    wireTheme();
    buildChips();
    buildFormCategories();
    wireControls();
    wireDetail();
    wireForm();
    render();
    window.addEventListener("hashchange", route);
    route(); // open a shared #itch/<id> link on first load
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
