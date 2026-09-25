'use strict';
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
toggle?.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); toggle.textContent = open ? '✕' : '☰'; nav.classList.toggle('open', open); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav?.classList.contains('open')) { toggle.click(); toggle.focus(); } });
document.querySelectorAll('.enrollment-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const phone = String(data.get('telefone')).replace(/\D/g, '');
    const status = form.querySelector('.form-status');
    if (phone.length < 10 || phone.length > 13) { status.textContent = 'Informe um telefone com DDD válido.'; form.elements.telefone.focus(); return; }
    const name = String(data.get('responsavel')).trim();
    if (!name) { status.textContent = 'Por favor, informe seu nome.'; form.elements.responsavel.focus(); return; }
    const child = String(data.get('crianca')).trim();
    const lines = ['Olá! Vim pelo site do Colégio Future e gostaria de informações sobre matrículas 2027.', '', 'Responsável: ' + name, ...(child ? ['Criança: ' + child] : []), 'Segmento de interesse: ' + data.get('serie'), 'Telefone: ' + data.get('telefone')];
    const url = 'https://wa.me/5588993421875?text=' + encodeURIComponent(lines.join('\n'));
    const link = document.createElement('a'); link.href = url; link.target = '_blank'; link.rel = 'noopener'; link.textContent = 'Abrir a conversa no WhatsApp ↗';
    status.replaceChildren(document.createTextNode('Mensagem pronta. Se a conversa não abrir, '), link);
    window.open(url, '_blank', 'noopener,noreferrer');
  });
});
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  let visible = 0;
  document.querySelectorAll('[data-category]').forEach(card => { card.hidden = button.dataset.filter !== 'Todos' && card.dataset.category !== button.dataset.filter; if (!card.hidden) visible++; });
  const status = document.querySelector('.filter-status'); if (status) status.textContent = visible + ' projetos encontrados.';
}));
const carousel = document.querySelector('.carousel');
document.querySelector('.carousel-prev')?.addEventListener('click', () => carousel.scrollBy({left: -carousel.clientWidth * .8, behavior: 'smooth'}));
document.querySelector('.carousel-next')?.addEventListener('click', () => carousel.scrollBy({left: carousel.clientWidth * .8, behavior: 'smooth'}));
const descriptions = [
 'A Olimpíada Brasileira de Astronomia e Astronáutica aproxima os estudantes da ciência e das descobertas sobre o céu.',
 'A Mostra Brasileira de Foguetes conecta investigação, experimentação e trabalho em equipe.',
 'Desafios matemáticos que estimulam o raciocínio, a resolução de problemas e a troca de conhecimentos.',
 'Um espaço de expressão para compartilhar habilidades, criatividade e novas descobertas.',
 'O esporte como oportunidade para vivenciar cooperação, respeito e convivência.',
 'Uma experiência de participação e conexão com a cidade e sua história.',
 'A literatura e a imaginação se encontram em momentos de escuta, linguagem e descoberta.',
 'Brincadeiras e experiências de integração para celebrar a infância.',
 'A primeira edição da corrida reuniu pais, estudantes e famílias pelas ruas de Camocim, com o apoio da Famol Móveis e Eletros. Um encontro de saúde, integração e momentos juntos.'
];
const dialog = document.querySelector('#project-dialog');
document.querySelectorAll('.project-open').forEach(button => button.addEventListener('click', () => {
  const card = button.closest('.project-card');
  document.querySelector('#project-title').textContent = card.querySelector('h3').textContent;
  document.querySelector('#project-category').textContent = card.dataset.category;
  document.querySelector('#project-description').textContent = descriptions[Number(button.dataset.project)];
  dialog.showModal();
}));
document.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
