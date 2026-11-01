// Markdown + KaTeX rendering and small DOM helpers.

const MATH = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;

export function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

// Math is pulled out before Markdown so `_` and `*` inside LaTeX survive.
export function md(src, inline = false) {
  if (!src) return '';
  const math = [];
  const text = String(src).replace(MATH, (m) => `@@M${math.push(m) - 1}@@`);
  let html = inline ? window.marked.parseInline(text) : window.marked.parse(text);
  html = html.replace(/@@M(\d+)@@/g, (_, i) => esc(math[Number(i)]));
  return html;
}

export function typeset(el) {
  if (!window.renderMathInElement) return;
  window.renderMathInElement(el, {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false },
    ],
    throwOnError: false,
  });
}

export function h(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

export function fmtDate(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function pct(a, b) {
  return b ? Math.round((100 * a) / b) + '%' : '—';
}
