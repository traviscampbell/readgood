// ==UserScript==
// @name         readGood.user.js
// @author       spermic ball vat
// @description  learn to read good and do other stuff good too
// @version      1.1
// @match        *://*/*
// @downloadURL  https://github.com/traviscampbell/readgood/raw/main/readgood.user.js
// @updateURL    https://github.com/traviscampbell/readgood/raw/main/readgood.user.js
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  "use strict";

  // blesses element and its kiddos with ability to read good and do other stuff good too
  const readGooder = (el) => {
    if (el.childNodes.length > 0) {
      // preach the read-gooder gospel to the kiddo's so that the may preach it to their kids
      el.childNodes.forEach((kiddo) => readGooder(kiddo));
    } else if (
      el.nodeType === Node.TEXT_NODE &&
      el.nodeValue.trim() !== "" &&
      getComputedStyle(el.parentElement).display !== "none"
    ) {
      // the aformentioned other stuffs comming in full circle ↻
      if (el.parentElement.classList.contains("read-good")) {
        return;
      }

      // there are some things you just shouldn't fuck with
      if (["PRE","CODE","SAMP","H1","H2","H3","H4","H5","H6"].includes(el.parentElement.tagName)) {
        return;
      }

      // a tu madre también...
      const wordUp = el.nodeValue.split(" ");

      // make words read gooder and other stuff too probably
      const gooder = wordUp
        .map((word) => {
          // With respect to the first char of a given word i have decided to
          // limit it to printable extended ascii because it was breaking some sites
          // or parts of sites where shit like emoji or unicode was just trying to
          // do it's thing.
          //
          // As a specific example, Github Issues emoji reactions were shitting the bed w/o this.
          // Also, excluding '<' because it fucks up some sites which are just trying to
          // display snippets or w/e like W3schools' site.
          const w = word.charCodeAt(0);
          if (
            !(
              (w >= 33 && w <= 59) ||
              (w >= 61 && w <= 126) ||
              (w >= 128 && w <= 254)
            )
          ) {
            return word;
          }

          // when in doubt; whip it out! errr... round up if there's a remainder
          const betterhalf = Math.ceil(word.length / 2);
          return `<b>${word.substr(0, betterhalf)}</b>${word.substr(betterhalf)}`;
        })
        .join(" ");

      // u didn't think i could be a gooder rapper did u??
      const rapper = document.createElement("span");
      rapper.classList.add("read-good");
      rapper.innerHTML = gooder;

      // make it official wit a datPiff drop
      el.replaceWith(rapper);
    }
  };

  readGooder(document.body);
})();
