/**
 * EN / 中文 language toggle.
 *
 * Every translatable string is rendered twice in the HTML — once inside
 * `.i18n-en`, once inside `.i18n-zh` — and _sass/_i18n.scss hides whichever
 * does not match `data-lang` on <html>.
 *
 * This file is loaded synchronously at the top of <body> (see
 * _includes/header.liquid), so `data-lang` is set before the page content is
 * parsed and a visitor whose saved language is Chinese never sees English
 * flash first. English is the default for a first-time visitor.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "site-lang";
  var DEFAULT_LANG = "en";
  // BCP 47 tags for the <html lang> attribute, which screen readers and
  // browser translation prompts read.
  var HTML_LANG = { en: "en", zh: "zh-CN" };

  function normalize(value) {
    return value === "en" || value === "zh" ? value : null;
  }

  // localStorage throws, rather than returning null, in some privacy modes.
  function readStored() {
    try {
      return normalize(window.localStorage.getItem(STORAGE_KEY));
    } catch (e) {
      return null;
    }
  }

  function store(lang) {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* preference simply does not persist */
    }
  }

  // `?lang=zh` makes a link open in a given language, and wins over the
  // stored preference so a shared link behaves the way the sender expects.
  function readQuery() {
    var match = /[?&]lang=([^&#]*)/.exec(window.location.search);
    return match ? normalize(decodeURIComponent(match[1])) : null;
  }

  // Text the theme renders as an attribute rather than as page content, so it
  // cannot be duplicated into .i18n-en / .i18n-zh spans and has to be swapped
  // element by element: [element id, English, Chinese, attribute].
  var ATTRIBUTE_STRINGS = [
    ["lang-toggle", "切换到中文", "Switch to English", "title"],
    ["lang-toggle", "Switch to Chinese", "Switch to English", "aria-label"],
    ["bibsearch", "Type to filter", "输入关键词筛选", "placeholder"],
  ];

  function applyToDom(lang) {
    for (var i = 0; i < ATTRIBUTE_STRINGS.length; i++) {
      var entry = ATTRIBUTE_STRINGS[i];
      var element = document.getElementById(entry[0]);
      if (element) element.setAttribute(entry[3], lang === "zh" ? entry[2] : entry[1]);
    }
  }

  function apply(lang) {
    var root = document.documentElement;
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", HTML_LANG[lang]);
    applyToDom(lang);
  }

  var fromQuery = readQuery();
  var current = fromQuery || readStored() || DEFAULT_LANG;
  if (fromQuery) store(fromQuery);
  apply(current);

  document.addEventListener("DOMContentLoaded", function () {
    // None of these elements existed when apply() first ran.
    applyToDom(current);
    var button = document.getElementById("lang-toggle");
    if (!button) return;
    button.addEventListener("click", function () {
      current = current === "zh" ? "en" : "zh";
      store(current);
      apply(current);
    });
  });
})();
