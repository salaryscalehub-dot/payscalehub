/* PayScale Hub — floating WhatsApp button on every page.
   Closing the bubble hides it on all pages for the current visit (sessionStorage). */
(function () {
  var WA = 'https://wa.me/966561584191';
  var KEY = 'psh_wa_bubble_closed';
  var ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.8 14.03c-.25.69-1.44 1.32-2 1.37-.51.05-.99.24-3.34-.7-2.82-1.11-4.6-4-4.74-4.18-.14-.19-1.13-1.5-1.13-2.87 0-1.36.72-2.03.97-2.31.25-.28.55-.35.73-.35l.53.01c.17.01.4-.06.62.48.23.55.78 1.91.85 2.05.07.14.11.3.02.48-.09.19-.14.3-.28.46-.14.16-.29.36-.42.49-.14.14-.28.29-.12.57.16.28.72 1.19 1.55 1.93 1.07.95 1.97 1.25 2.25 1.39.28.14.44.12.6-.07.16-.19.69-.81.88-1.09.18-.28.37-.23.62-.14.25.09 1.6.76 1.88.9.28.14.46.21.53.32.07.12.07.66-.18 1.36z"/></svg>';
  function closed() { try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; } }
  function init() {
    if (document.querySelector('.wa-float')) return;
    var box = document.createElement('div');
    box.className = 'wa-float' + (closed() ? ' closed' : '');
    box.innerHTML =
      '<div class="wa-bubble" role="dialog" aria-label="تواصل عبر واتساب">' +
        '<button class="wa-x" type="button" aria-label="إغلاق">×</button>' +
        '<b>لديك استفسار؟</b><p>تواصل معنا مباشرة عبر واتساب</p>' +
        '<a class="wa-start" href="' + WA + '" target="_blank" rel="noopener noreferrer">' + ICON + 'ابدأ المحادثة</a>' +
      '</div>' +
      '<a class="wa-btn" href="' + WA + '" target="_blank" rel="noopener noreferrer" aria-label="تواصل عبر واتساب">' + ICON + '</a>';
    box.querySelector('.wa-x').addEventListener('click', function () {
      box.classList.add('closed');
      try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
    });
    document.body.appendChild(box);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
