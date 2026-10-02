(() => {
  'use strict';
  const conf = window.EBC_CONFIG || {};
  const titles = {
    inicio: ['CENTRO DE OPERAÇÕES', 'QUARTEL <span>GENERAL</span>'],
    perfil: ['ÁREA DO MILITAR', 'MEU <span>PERFIL</span>'],
    promocoes: ['CARREIRA MILITAR', 'COMO <span>SUBIR DE PATENTE</span>'],
    cdp: ['PROGRESSÃO', 'SISTEMA <span>CDP</span>'],
    hierarquia: ['CADEIA DE COMANDO', 'HIERARQUIA <span>MILITAR</span>'],
    divisoes: ['UNIDADES OPERACIONAIS', 'DIVISÕES <span>EBC</span>'],
    historico: ['REGISTROS', 'MEU <span>HISTÓRICO</span>'],
    ranking: ['DESTAQUES', 'RANKING <span>EBC</span>'],
    links: ['ACESSO RÁPIDO', 'LINKS <span>OFICIAIS</span>']
  };

  const byId = id => document.getElementById(id);
  const nicknameKey = 'ebc_portal_nickname';
  const safeUrl = candidate => {
    try {
      const u = new URL(candidate);
      return (u.protocol === 'https:' || u.protocol === 'http:') ? u.href : '';
    } catch { return ''; }
  };
  const urlFor = key => safeUrl(key === 'verification' ? conf.verificationUrl : key === 'discord' ? conf.discordUrl : conf.gameUrl);
  let toastTimer;
  function notify(message) {
    const el = byId('toast');
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 4300);
  }

  function bindExternalLinks() {
    document.querySelectorAll('[data-link]').forEach(link => {
      const key = link.dataset.link;
      const href = urlFor(key);
      if (href) {
        link.href = href;
        link.removeAttribute('aria-disabled');
        link.removeAttribute('tabindex');
      } else {
        link.removeAttribute('href');
        link.setAttribute('aria-disabled', 'true');
        link.setAttribute('tabindex', '0');
      }
      link.addEventListener('click', e => {
        if (!urlFor(key)) {
          e.preventDefault();
          notify(key === 'game' ? 'Adicione o link do jogo em config.js para liberar este botão.' : key === 'discord' ? 'Adicione o convite do Discord em config.js para liberar este botão.' : 'Link indisponível. Confira config.js.');
        }
      });
      if (!href) link.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); link.click(); }
      });
    });
  }

  function setName(name) {
    const clean = String(name || '').trim().slice(0, 24) || 'Militar';
    for (const id of ['welcomeName', 'sideUser', 'profilePreviewName']) byId(id).textContent = clean;
    for (const id of ['sideAvatar', 'profileAvatar']) byId(id).textContent = clean.charAt(0).toUpperCase();
    byId('nickname').value = clean === 'Militar' ? '' : clean;
    return clean;
  }

  function navigate(page, options = {}) {
    if (!titles[page]) page = 'inicio';
    document.querySelectorAll('[data-view]').forEach(el => el.classList.toggle('active', el.dataset.view === page));
    document.querySelectorAll('.nav-link[data-page]').forEach(el => {
      const selected = el.dataset.page === page;
      el.classList.toggle('active', selected);
      if (selected) el.setAttribute('aria-current', 'page');
      else el.removeAttribute('aria-current');
    });
    byId('topEyebrow').textContent = titles[page][0];
    byId('topTitle').innerHTML = titles[page][1];
    document.title = `${(page === 'inicio' ? 'Quartel General' : page === 'promocoes' ? 'Como subir de patente' : page[0].toUpperCase() + page.slice(1))} • EBC`;
    if (window.location.hash.slice(1) !== page) history.replaceState(null, '', `#${page}`);
    if (!options.keepScroll) window.scrollTo({top: 0, behavior: 'instant'});
    closeMenu();
  }

  const sidebar = byId('sidebar');
  function closeMenu() {
    sidebar.classList.remove('open');
    byId('menuBackdrop').hidden = true;
    byId('menuButton').setAttribute('aria-expanded', 'false');
  }
  function openMenu() {
    sidebar.classList.add('open');
    byId('menuBackdrop').hidden = false;
    byId('menuButton').setAttribute('aria-expanded', 'true');
  }

  byId('menuButton').addEventListener('click', () => sidebar.classList.contains('open') ? closeMenu() : openMenu());
  byId('menuBackdrop').addEventListener('click', closeMenu);
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('hashchange', () => navigate(window.location.hash.slice(1), { keepScroll: false }));
  document.querySelectorAll('[data-nav]').forEach(el => el.addEventListener('click', () => navigate(el.dataset.nav)));
  document.querySelectorAll('[data-page]').forEach(el => el.addEventListener('click', e => {
    e.preventDefault();
    navigate(el.dataset.page);
  }));

  byId('profileForm').addEventListener('submit', e => {
    e.preventDefault();
    const nick = byId('nickname').value.trim().replace(/[<>]/g, '');
    if (!nick) return notify('Digite um nome para salvar.');
    try { localStorage.setItem(nicknameKey, nick); } catch { /* Armazenamento desativado; fica só durante a visita. */ }
    setName(nick);
    notify('Nome salvo neste navegador!');
  });

  function populateNews() {
    const grid = byId('newsGrid');
    const items = Array.isArray(conf.news) ? conf.news.slice(0, 6) : [];
    (items.length ? items : [{tag: 'EBC', title: 'Bem-vindo!', description: 'Conheça as informações da comunidade.'}]).forEach(item => {
      const card = document.createElement('article');
      card.className = 'news-card';
      const tag = document.createElement('small'); tag.textContent = String(item.tag || 'COMUNICADO');
      const title = document.createElement('h4'); title.textContent = String(item.title || 'Comunicado');
      const description = document.createElement('p'); description.textContent = String(item.description || '');
      card.append(tag, title, description);
      grid.append(card);
    });
  }

  try { setName(localStorage.getItem(nicknameKey) || 'Militar'); }
  catch { setName('Militar'); }
  populateNews();
  bindExternalLinks();
  byId('year').textContent = String(new Date().getFullYear());
  navigate(location.hash.slice(1), { keepScroll: true });
})();
