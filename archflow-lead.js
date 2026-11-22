/*
 * Modulo "Contatti" → CRM dello studio (ArchFlow).
 * Quando la persona invia la richiesta e ha accettato l'informativa privacy, la richiesta viene salvata anche
 * nel gestionale ArchFlow, così lo studio ha tutti i contatti in un posto solo.
 * L'invio del modulo funziona esattamente come prima: questo script non lo blocca mai e ignora ogni errore.
 */
(function () {
  var ARCHFLOW = 'https://gestionale-architetti.vercel.app/api/public/leads';
  var STUDIO = 'studio-4e';
  var form = document.getElementById('contact-form');
  if (!form) return;
  var sent = false;

  function el(id) { return document.getElementById(id); }
  function val(id) {
    var f = el(id);
    if (!f) return '';
    if (f.tagName === 'SELECT') { var o = f.options[f.selectedIndex]; return o ? String(o.text || '').trim() : ''; }
    return String(f.value || '').trim();
  }
  function labelOf(f) {
    var g = f.closest('.form-group');
    var l = g ? g.querySelector('label') : null;
    return l ? l.textContent.trim() : (f.id || f.name || 'Campo');
  }
  function cut(s, n) { s = String(s || '').trim(); return s ? s.slice(0, n) : null; }

  function send() {
    if (sent) return;
    var ok = el('privacy-ok');
    if (!ok || !ok.checked) return;
    var parts = val('cf-nome').split(/\s+/).filter(Boolean);
    var contact = val('cf-email');
    if (!parts.length || !contact) return;
    var isEmail = /@/.test(contact);
    var lines = [];
    var fields = form.querySelectorAll('input, select, textarea');
    for (var i = 0; i < fields.length; i++) {
      var f = fields[i];
      if (f.type === 'checkbox' || f.type === 'submit' || f.id === 'cf-nome' || f.id === 'cf-email') continue;
      var v = f.id ? val(f.id) : String(f.value || '').trim();
      if (v) lines.push(labelOf(f) + ': ' + v);
    }
    var q = new URLSearchParams(location.search);
    var body = {
      slug: STUDIO,
      first_name: cut(parts[0], 80),
      last_name: cut(parts.slice(1).join(' '), 80) || '-',
      email: isEmail ? cut(contact, 160) : null,
      phone: isEmail ? null : cut(contact, 40),
      city: null,
      project_type: cut(val('cf-tipologia'), 80),
      description: ((form.getAttribute('data-title') || 'Richiesta dal sito Architetti Catania') + '\n\n' + lines.join('\n')).slice(0, 4000),
      privacy: true,
      source_site: location.href,
      utm_source: q.get('utm_source'),
      utm_medium: q.get('utm_medium'),
      utm_campaign: q.get('utm_campaign'),
    };
    sent = true;
    try {
      fetch(ARCHFLOW, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), keepalive: true }).catch(function () { sent = false; });
    } catch (e) { sent = false; }
  }

  // Si attiva solo sull'invio valido del modulo (dopo la validazione del browser), senza fermarlo.
  form.addEventListener('submit', function () { try { send(); } catch (e) {} });
})();
