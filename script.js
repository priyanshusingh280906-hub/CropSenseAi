/* ── Navigation ── */
function go(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  document.getElementById('p-' + id).classList.add('active');
  const nl = document.getElementById('nl-' + id);
  if (nl) nl.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (id === 'crop-library') renderLib();
}

/* ── Toast ── */
let toastTimer;
function toast(msg) {
  const t = document.getElementById('toast');
  const icon = msg.match(/^([\u{1F300}-\u{1FFFF}✅📍🔍🔔📅📋📄⚠️🚨ℹ️✓🛒🌿💊✂️🧪📸🔬📤🗺])/u);
  document.getElementById('toast-icon').textContent = icon ? icon[0] : '•';
  document.getElementById('toast-msg').textContent = msg.replace(/^[\u{1F300}-\u{1FFFF}✅📍🔍🔔📅📋📄⚠️🚨ℹ️✓🛒🌿💊✂️🧪📸🔬📤🗺]\s*/u, '');
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

/* ── Modals ── */
function om(id) { document.getElementById(id).classList.add('open'); }
function cm(id) { document.getElementById(id).classList.remove('open'); }
document.querySelectorAll('.modal-bg').forEach(bg => {
  bg.addEventListener('click', e => { if (e.target === bg) bg.classList.remove('open'); });
});

/* ── Diagnose ── */
function pickCrop(c) {
  document.querySelectorAll('.crop-chip').forEach(el => el.classList.remove('sel'));
  const el = document.getElementById('cc-' + c);
  if (el) el.classList.add('sel');
}
function handleFile(input) {
  if (input.files && input.files[0]) {
    document.getElementById('uz-icon').textContent = '✅';
    document.getElementById('uz-h').textContent = input.files[0].name;
    document.getElementById('uz-p').textContent = 'Image ready · Click Run Diagnosis';
    toast('📸 Image loaded: ' + input.files[0].name);
  }
}
function runDiag() {
  const btn = document.getElementById('rb-text');
  btn.textContent = '⏳ Analyzing...';
  setTimeout(() => { btn.textContent = '✅ Complete!'; om('m-scan'); setTimeout(() => btn.textContent = '🔬 Run AI Diagnosis', 3e3); }, 2e3);
}

/* ── Crop Library ── */
const CROPS = [
  { icon:'🍅', name:'Tomato', sci:'Solanum lycopersicum', cat:'vegetable', diseases:['Early Blight','Late Blight','Mosaic Virus'], risk:'high', bg:'rgba(254,202,202,0.5)' },
  { icon:'🥔', name:'Potato', sci:'Solanum tuberosum', cat:'vegetable', diseases:['Late Blight','Black Scurf','Ring Rot'], risk:'high', bg:'rgba(254,240,138,0.5)' },
  { icon:'🌾', name:'Wheat', sci:'Triticum aestivum', cat:'grain', diseases:['Rust','Powdery Mildew','Smut'], risk:'medium', bg:'rgba(254,240,138,0.4)' },
  { icon:'🌾', name:'Rice', sci:'Oryza sativa', cat:'grain', diseases:['Blast','Sheath Blight','BPH'], risk:'medium', bg:'rgba(187,247,208,0.5)' },
  { icon:'🌽', name:'Maize', sci:'Zea mays', cat:'grain', diseases:['Leaf Blight','Rust','Downy Mildew'], risk:'low', bg:'rgba(254,240,138,0.5)' },
  { icon:'🪴', name:'Cotton', sci:'Gossypium hirsutum', cat:'cash', diseases:['Bollworm','Wilt','Leaf Spot'], risk:'high', bg:'rgba(191,219,254,0.5)' },
  { icon:'🍆', name:'Brinjal', sci:'Solanum melongena', cat:'vegetable', diseases:['Fruit Borer','Cercospora','Wilt'], risk:'medium', bg:'rgba(233,213,255,0.5)' },
  { icon:'🌿', name:'Jute', sci:'Corchorus olitorius', cat:'cash', diseases:['Stem Rot','Anthracnose','Semilooper'], risk:'low', bg:'rgba(187,247,208,0.5)' },
  { icon:'🫑', name:'Capsicum', sci:'Capsicum annuum', cat:'vegetable', diseases:['Phytophthora Blight','Thrips','Mosaic'], risk:'medium', bg:'rgba(254,202,202,0.4)' },
  { icon:'🧅', name:'Onion', sci:'Allium cepa', cat:'vegetable', diseases:['Purple Blotch','Basal Rot','Stemphylium'], risk:'medium', bg:'rgba(254,240,138,0.4)' },
  { icon:'🌱', name:'Mustard', sci:'Brassica juncea', cat:'cash', diseases:['White Rust','Alternaria','Aphids'], risk:'low', bg:'rgba(253,224,71,0.35)' },
  { icon:'🫘', name:'Soybean', sci:'Glycine max', cat:'grain', diseases:['Soybean Rust','Leaf Scorch','Bacterial Pustule'], risk:'low', bg:'rgba(187,247,208,0.5)' },
];
let libCat = 'all';
function renderLib(q = '') {
  const grid = document.getElementById('lib-grid');
  if (!grid) return;
  const f = CROPS.filter(c => (libCat === 'all' || c.cat === libCat) && (!q || c.name.toLowerCase().includes(q.toLowerCase()) || c.diseases.some(d => d.toLowerCase().includes(q.toLowerCase()))));
  grid.innerHTML = f.map(c => `
    <div class="crop-card" onclick="showCrop(${JSON.stringify(c).replace(/"/g,'&quot;')})" style="animation-delay:${Math.random()*.3}s">
      <div class="crop-card-img" style="background:${c.bg}">${c.icon}</div>
      <div class="crop-card-body">
        <div class="crop-card-name">${c.name}</div>
        <div class="crop-card-sci">${c.sci}</div>
        <div class="crop-card-tags">${c.diseases.slice(0,2).map(d=>`<span class="crop-tag${c.risk==='high'?' d':''}">${d}</span>`).join('')}${c.diseases.length>2?`<span class="crop-tag">+${c.diseases.length-2}</span>`:''}</div>
        <div class="risk-line"><div class="rdot" style="background:${c.risk==='high'?'#ef4444':c.risk==='medium'?'#f59e0b':'#22c55e'}"></div>${c.risk.charAt(0).toUpperCase()+c.risk.slice(1)} Risk</div>
      </div>
    </div>`).join('');
}
function filterLib(v) { renderLib(v); }
function libFilter(el, cat) {
  document.querySelectorAll('.lib-filter').forEach(x => x.classList.remove('on'));
  el.classList.add('on');
  libCat = cat;
  renderLib();
}
function showCrop(c) {
  document.getElementById('crop-modal-body').innerHTML = `
    <div style="font-size:2.8rem;margin-bottom:10px">${c.icon}</div>
    <div class="modal-title">${c.name}</div>
    <div class="modal-sub">${c.sci} · ${c.cat.charAt(0).toUpperCase()+c.cat.slice(1)} Crop</div>
    <div class="modal-section-title">Common Diseases (${c.diseases.length})</div>
    <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:18px;">
      ${c.diseases.map(d=>`<div style="background:rgba(0,0,0,.03);border:1.5px solid rgba(0,0,0,.06);border-radius:12px;padding:12px 15px;cursor:pointer;transition:all .2s;font-size:.84rem;font-weight:500;color:var(--text-body)" onmouseenter="this.style.background='rgba(74,222,128,.08)';this.style.borderColor='rgba(74,222,128,.35)'" onmouseleave="this.style.background='rgba(0,0,0,.03)';this.style.borderColor='rgba(0,0,0,.06)'" onclick="cm('m-crop');go('diagnose');toast('🔬 Loading ${d} diagnosis guide...')">🦠 ${d}</div>`).join('')}
    </div>
    <button class="modal-action-btn" onclick="cm('m-crop');go('diagnose');toast('📷 Crop set to ${c.name} — ready to scan!')">🔬 Diagnose ${c.name}</button>`;
  om('m-crop');
}

/* ── Schedule ── */
function toggleSch(row) {
  const chk = row.querySelector('.sch-check');
  const bdg = row.querySelector('.sch-badge');
  chk.classList.toggle('done');
  if (chk.classList.contains('done')) { chk.textContent='✓'; bdg.classList.remove('upcoming'); bdg.classList.add('today'); toast('✅ Marked complete — great work!'); }
  else { chk.textContent=''; bdg.classList.add('upcoming'); bdg.classList.remove('today'); }
}

/* ── Settings tab ── */
function stab(el) {
  document.querySelectorAll('.settings-nav-item').forEach(x => x.classList.remove('on'));
  el.classList.add('on');
  toast('⚙️ ' + el.textContent.trim());
}

/* ── Stat bar animation ── */
const sbObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.style.animationPlayState = 'running'; });
});
document.querySelectorAll('.stat-fill').forEach(f => { f.style.animationPlayState='paused'; sbObs.observe(f); });

/* ── Tile 3D tilt ── */
document.querySelectorAll('.tile, .adv-card, .crop-card, .tile-scan-new, .tile-alert').forEach(tile => {
  tile.addEventListener('mousemove', e => {
    const r = tile.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    tile.style.transform = `translateY(-3px) perspective(700px) rotateX(${-y*3.5}deg) rotateY(${x*3.5}deg)`;
  });
  tile.addEventListener('mouseleave', () => { tile.style.transform = ''; });
});
