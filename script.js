/* FAS Arquitetura — interactions */

// ---------- THEME ----------
const root = document.body;
const savedTheme = localStorage.getItem('fas-theme') || 'light';
root.setAttribute('data-theme', savedTheme);
document.getElementById('themeToggle').addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('fas-theme', next);
});

// ---------- MOBILE MENU ----------
const nav = document.getElementById('nav');
const menuBtn = document.getElementById('menuBtn');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuBtn.classList.toggle('is-open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('is-open'); menuBtn.classList.remove('is-open');
}));

// ---------- YEAR ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- GALLERY ----------
const projects = [
  { img: 'assets/images/projeto-01.jpg', title: 'Sala integrada com painel ripado', cat: ['interiores','residencial','projetos'], catLabel: 'Interiores', desc: 'Iluminação embutida, painel em madeira e marcenaria planejada para integrar o estar.' },
  { img: 'assets/images/projeto-02.jpg', title: 'Banheiro com identidade artesanal', cat: ['reformas','interiores','residencial'], catLabel: 'Reforma', desc: 'Revestimento em azulejos azuis, marcenaria leve e detalhes em bambu.' },
  { img: 'assets/images/projeto-03.jpg', title: 'Mesa de tronco em destaque', cat: ['interiores','residencial'], catLabel: 'Interiores', desc: 'Peça central em madeira maciça, com presença escultural e conforto visual.' },
  { img: 'assets/images/projeto-04.jpg', title: 'Estar com luz natural e arte', cat: ['interiores','residencial','projetos'], catLabel: 'Projeto', desc: 'Composição com quadros, paleta sóbria e abertura ampla para a cidade.' },
  { img: 'assets/images/projeto-05.jpg', title: 'Suite com jardim privativo', cat: ['projetos','residencial'], catLabel: 'Projeto', desc: 'Integração entre dormitório e área externa com paisagismo, esquadrias e piso técnico.' },
  { img: 'assets/images/projeto-06.jpg', title: 'Pergolado e área gourmet', cat: ['obras','comercial','projetos'], catLabel: 'Obra', desc: 'Estrutura em madeira, vidro e ritmo solar para área de convivência ao ar livre.' },
  { img: 'assets/images/projeto-07.jpg', title: 'Pátio interno com paisagismo', cat: ['projetos','residencial'], catLabel: 'Projeto', desc: 'Esquadrias amplas, jardim interno e relação fluida entre dentro e fora.' },
];
const gallery = document.getElementById('gallery');
gallery.innerHTML = projects.map((p, i) => `
  <article class="gallery__item" data-cat="${p.cat.join(' ')}" data-idx="${i}">
    <img src="${p.img}" alt="${p.title}" loading="lazy" />
    <div class="gallery__overlay">
      <div>
        <span>${p.catLabel}</span>
        <h4>${p.title}</h4>
      </div>
      <span class="round-btn" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 17 17 7M9 7h8v8"/></svg>
      </span>
    </div>
  </article>
`).join('');

// Filters
document.getElementById('filters').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-filter]');
  if (!btn) return;
  document.querySelectorAll('#filters .pill').forEach(b => b.classList.remove('is-active'));
  btn.classList.add('is-active');
  const f = btn.dataset.filter;
  document.querySelectorAll('.gallery__item').forEach(item => {
    const ok = f === 'all' || item.dataset.cat.includes(f);
    item.classList.toggle('hide', !ok);
  });
});

// Modal
const modal = document.getElementById('modal');
gallery.addEventListener('click', (e) => {
  const item = e.target.closest('.gallery__item'); if (!item) return;
  const p = projects[+item.dataset.idx];
  document.getElementById('modalImg').src = p.img;
  document.getElementById('modalImg').alt = p.title;
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalCat').textContent = p.catLabel;
  document.getElementById('modalDesc').textContent = p.desc;
  document.getElementById('modalCta').href = `https://wa.me/5521964984398?text=${encodeURIComponent('Olá, FAS. Quero algo no estilo do projeto: ' + p.title)}`;
  modal.hidden = false;
});
modal.addEventListener('click', (e) => { if (e.target.matches('[data-close]')) modal.hidden = true; });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') modal.hidden = true; });

// ---------- ERROS ----------
const erros = [
  ['Comprar móveis que não cabem', 'Medidas, circulação e proporção precisam estar no projeto antes da compra.'],
  ['Escolher iluminação errada', 'Cada ambiente pede temperatura, foco e camadas de luz diferentes.'],
  ['Gastar mais na obra por falta de planejamento', 'Decisões tomadas no canteiro custam mais que decisões tomadas em projeto.'],
  ['Ter um ambiente bonito, mas pouco funcional', 'Estética sem rotina não sustenta o dia a dia.'],
  ['Reforma sem compatibilizar medidas e materiais', 'Detalhes técnicos evitam retrabalho e desperdício.'],
  ['Materiais que não conversam entre si', 'Paleta e textura precisam de coerência para o espaço respirar.'],
  ['Perder espaço por falta de layout', 'Um bom projeto começa pela leitura do que cabe e do que falta.'],
  ['Começar uma obra sem clareza do resultado', 'Imagens e plantas alinham expectativa e execução.'],
  ['Problemas por falta de legalização', 'Documentação correta protege o investimento e a obra.'],
];
const erroIcons = ['📐','💡','🧱','🛋️','📏','🎨','🗺️','🖼️','📑'];
document.getElementById('errosGrid').innerHTML = erros.map((e,i)=>`
  <div class="erro reveal">
    <div class="erro__icon" aria-hidden="true">${erroIcons[i]||'•'}</div>
    <div><h4>${e[0]}</h4><p>${e[1]}</p></div>
  </div>`).join('');

// ---------- QUIZ ----------
const quizData = [
  { q: 'O que você quer transformar?', opts: ['Casa','Apartamento','Sala comercial','Loja','Escritório','Ambiente específico','Ainda não sei'] },
  { q: 'Qual é o objetivo principal?', opts: ['Construir','Reformar','Legalizar','Melhorar funcionalidade','Valorizar o imóvel','Criar um ambiente mais bonito','Organizar uma obra'] },
  { q: 'Qual estilo mais combina com você?', opts: ['Moderno','Aconchegante','Minimalista','Sofisticado','Natural','Funcional','Contemporâneo'] },
  { q: 'Quais materiais/elementos você prefere?', opts: ['Madeira','Tons claros','Iluminação quente','Cimento','Mármore','Cores neutras','Plantas','Vidro e linhas retas'] },
  { q: 'Qual seu maior problema hoje?', opts: ['Falta de espaço','Ambiente sem personalidade','Pouca funcionalidade','Reforma parada','Dúvida de orçamento','Falta de planejamento','Legalização pendente','Não sei por onde começar'] },
];
const results = [
  { t: 'Sofisticação Natural com Toque Aconchegante', d: 'Seu projeto combina com materiais naturais, tons equilibrados, iluminação acolhedora e soluções que valorizam o conforto.' },
  { t: 'Minimalismo Funcional', d: 'Seu espaço pede clareza, organização visual e soluções inteligentes para aproveitar melhor cada metro.' },
  { t: 'Elegância Contemporânea', d: 'Seu estilo combina com linhas modernas, materiais sofisticados e uma atmosfera marcante sem excesso.' },
  { t: 'Funcionalidade Inteligente', d: 'Seu principal desafio parece ser transformar o espaço em algo mais prático, bem planejado e adaptado à rotina.' },
  { t: 'Projeto Técnico com Clareza', d: 'Seu momento pede orientação, planejamento e decisões técnicas para avançar com mais segurança.' },
];

let step = 0; const answers = [];
const quizBody = document.getElementById('quizBody');
const quizBar = document.getElementById('quizBar');
function renderQuiz() {
  if (step >= quizData.length) return renderResult();
  const q = quizData[step];
  quizBar.style.width = `${(step/quizData.length)*100}%`;
  quizBody.innerHTML = `
    <small class="muted">Pergunta ${step+1} de ${quizData.length}</small>
    <h3>${q.q}</h3>
    <div class="quiz__options">
      ${q.opts.map((o,i)=>`<button class="quiz__opt" data-i="${i}">${o}</button>`).join('')}
    </div>
    <div class="quiz__nav">
      <button class="btn btn--ghost" id="qBack" ${step===0?'disabled style="opacity:.4;pointer-events:none"':''}>Voltar</button>
      <span class="muted small">Selecione uma opção</span>
    </div>`;
  quizBody.querySelectorAll('.quiz__opt').forEach(b => b.addEventListener('click', () => {
    answers[step] = +b.dataset.i;
    step++; renderQuiz();
  }));
  const back = document.getElementById('qBack');
  if (back) back.addEventListener('click', () => { if (step>0) { step--; renderQuiz(); } });
}
function renderResult() {
  quizBar.style.width = '100%';
  // simple mapping: pick a result based on dominant answers
  const map = [results[0], results[1], results[2], results[3], results[4]];
  const idx = (answers[2] ?? 0) % 5; // by style
  let r = map[idx] || results[0];
  if ((answers[4] ?? -1) === 6) r = results[4]; // legalização pendente
  if ((answers[1] ?? -1) === 3) r = results[3]; // melhorar funcionalidade
  const msg = encodeURIComponent(`Olá, FAS Arquitetura. Fiz o quiz no site e meu resultado foi: ${r.t}. Quero conversar sobre um projeto nesse estilo.`);
  quizBody.innerHTML = `
    <div class="quiz__result">
      <span class="badge">Seu estilo</span>
      <h3>${r.t}</h3>
      <p class="muted">${r.d}</p>
      <div class="quiz__nav" style="justify-content:center;margin-top:18px;gap:10px;flex-wrap:wrap">
        <a class="btn btn--primary" href="https://wa.me/5521964984398?text=${msg}" target="_blank" rel="noopener">Quero conversar sobre meu projeto nesse estilo</a>
        <button class="btn btn--ghost" id="qReset">Refazer quiz</button>
      </div>
    </div>`;
  document.getElementById('qReset').addEventListener('click', () => { step = 0; answers.length = 0; renderQuiz(); });
}
renderQuiz();

// ---------- REVEAL ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------- CHAT IA ----------
const chat = document.getElementById('chat');
const chatLog = document.getElementById('chatLog');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
document.getElementById('chatBubble').addEventListener('click', () => {
  chat.hidden = !chat.hidden;
  if (!chat.hidden && !chatLog.children.length) addMsg('bot', 'Oi, seja bem-vindo(a). Você está pensando em reformar, construir, legalizar ou entender possibilidades para o seu espaço?');
});
document.getElementById('chatClose').addEventListener('click', () => chat.hidden = true);

function getChatId() {
  let id = localStorage.getItem('fas-chat-id');
  if (!id) { id = 'fas_' + Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem('fas-chat-id', id); }
  return id;
}
function addMsg(role, text) {
  const el = document.createElement('div');
  el.className = `chat__msg ${role}`;
  el.textContent = text;
  chatLog.appendChild(el);
  chatLog.scrollTop = chatLog.scrollHeight;
  return el;
}
chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = chatInput.value.trim(); if (!text) return;
  addMsg('user', text); chatInput.value = '';
  const typing = addMsg('bot', ''); typing.classList.add('typing');
  try {
    const res = await fetch('https://memoken.com/webhook/artificial-inteligence/completion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: getChatId(), human_message: text })
    });
    const data = await res.json().catch(()=>({}));
    const reply = data.response || data.message || data.output || data.text || 'Recebi sua mensagem. Em breve retorno com mais detalhes.';
    typing.classList.remove('typing');
    typing.textContent = reply;
  } catch (err) {
    typing.classList.remove('typing');
    typing.textContent = 'Não consegui responder agora, mas você pode falar diretamente com a FAS pelo WhatsApp.';
  }
});
