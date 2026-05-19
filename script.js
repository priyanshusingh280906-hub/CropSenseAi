name=script.js
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
      ${c.diseases.map(d=>`<div style="background:rgba(0,0,0,.03);border:1.5px solid rgba(0,0,0,.06);border-radius:12px;padding:12px 15px;cursor:pointer;transition:all .2s;font-size:.84rem;font-weight:500;">${d}</div>`).join('')}
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

/* ═════════════════════════════════════════════════════════════════ */
/* ──────────── 🤖 AI CHATBOT ASSISTANCE SYSTEM 🤖 ──────────────── */
/* ═════════════════════════════════════════════════════════════════ */

// AI Configuration
const AI_CONFIG = {
  API_ENDPOINT: 'https://api.openai.com/v1/chat/completions',
  API_KEY: 'sk-YOUR-API-KEY-HERE', // Replace with your API key
  MODEL: 'gpt-3.5-turbo',
  TIMEOUT: 3000,
  USE_LOCAL_AI: true // Set to false to disable local AI fallback
};

// Local AI Knowledge Base for Instant Responses
const LOCAL_AI_KB = {
  'early blight': {
    response: '🍅 **Early Blight (Alternaria solani)** in Tomatoes:\n\n**Symptoms:** Dark concentric ring lesions on lower leaves, starting from ground level.\n\n**Treatment:**\n• Apply Mancozeb 2.5g/litre spray every 10 days\n• Prune infected leaves & dispose safely\n• Improve air circulation\n• Avoid overhead watering\n\n**Prevention:** Crop rotation, mulching, remove debris.\n\n**Cost:** Mancozeb ₹240/kg at Krishi Kendra A (0.8km away)',
    keywords: ['early blight', 'alternaria', 'tomato disease', 'ring lesions', 'mancozeb']
  },
  'late blight': {
    response: '🥔 **Late Blight (Phytophthora infestans)** in Potatoes:\n\n**Symptoms:** Water-soaked lesions on leaves & tubers, white mold on undersides during high humidity.\n\n**Treatment:**\n• Spray Metalaxyl-M 2.5ml/litre immediately\n• Remove infected plants completely\n• Improve drainage in field\n• Apply copper fungicide as preventive\n\n**Best Time:** Early morning or evening spray\n\n**Cost:** Metalaxyl-M ₹180/L | Copper products ₹175/kg',
    keywords: ['late blight', 'phytophthora', 'potato', 'water-soaked', 'metalaxyl']
  },
  'powdery mildew': {
    response: '🌾 **Powdery Mildew (Erysiphe graminis)** in Wheat:\n\n**Symptoms:** White/grayish powder coating on leaves, stem, and grains.\n\n**Treatment:**\n• Sulfur dust 25kg/acre or wettable sulfur spray\n• Spray Hexaconazole 5ml/10L water\n• Ensure good spacing for air flow\n• Avoid excessive nitrogen fertilizer\n\n**Organic Alternative:** Neem oil 3ml/litre\n\n**Application:** 2-3 sprays at 10-day intervals\n\n**Cost:** Sulfur ₹90/kg | Hexaconazole ₹120/L',
    keywords: ['powdery mildew', 'erysiphe', 'wheat', 'white powder', 'sulfur']
  },
  'mancozeb': {
    response: '💊 **Mancozeb 75% WP** - Broad-Spectrum Fungicide:\n\n**Dose:** 2.5g per litre of water\n\n**Crops:** Tomato, Potato, Rice, Wheat, Cotton\n\n**Application:**\n• Spray every 10-15 days\n• Best in morning/evening\n• Cover all leaf surfaces\n• Avoid during flowering\n\n**Effective Against:**\n✓ Early Blight ✓ Late Blight ✓ Downy Mildew ✓ Leaf Spot\n\n**Safety:** Wear gloves & mask. Wash hands after application.\n\n**Price:** ₹240/kg at Krishi Kendra A (0.8km)\n\n**Stock Status:** ✅ In Stock',
    keywords: ['mancozeb', 'fungicide', 'spray', 'treatment', 'dosage', 'application']
  },
  'neem oil': {
    response: '🌿 **Neem Oil (Organic) - Natural Bio-Pesticide:**\n\n**Dose:** 3-5ml per litre of water\n\n**Crops:** All crops (safe for vegetables & fruits)\n\n**Benefits:**\n✓ Natural antifungal & antibacterial\n✓ Safe for pollinators\n✓ No harvest waiting period\n✓ Works on multiple pests & diseases\n\n**Effective Against:**\n✓ Powdery Mildew ✓ Whitefly ✓ Aphids ✓ Mites ✓ Mosaic Virus\n\n**Application:**\n• Spray every 7 days\n• Use in early morning\n• Apply to all leaf surfaces\n\n**Price:** ₹180/L (Azadirachtin 300ppm)\n**Location:** Krishi Kendra B (1.2km away)\n\n**Storage:** Cool, dark place for 2 years',
    keywords: ['neem oil', 'organic', 'bio-pesticide', 'natural', 'spray']
  },
  'spray schedule': {
    response: '📅 **Recommended Spray Schedule for May-June (Monsoon):**\n\n**Week 1-2:**\n• Day 8 (May 8): Mancozeb - Tomatoes (2.5g/L)\n\n**Week 2-3:**\n• Day 10 (May 10): Neem Oil - All Crops (3ml/L)\n\n**Week 3-4:**\n• Day 13 (May 13): Copper Oxychloride - Potatoes (3g/L)\n\n**Week 4-5:**\n• Day 18 (May 18): Mancozeb Follow-up (repeat cycle)\n\n**Weather Alert:** ⚠️ High humidity forecasted - Disease risk HIGH\n\n**Tips:**\n✓ Spray in early morning (6-8 AM)\n✓ Spray during dry season only\n✓ Rotate fungicides to prevent resistance\n✓ Check weather before spraying\n\n**Equipment Needed:** Hand sprayer, gloves, mask, rubber boots',
    keywords: ['spray schedule', 'timing', 'monsoon', 'calendar', 'application dates']
  },
  'soil ph': {
    response: '🌱 **Soil pH Advisory - Critical for Crop Health:**\n\n**Optimal pH Ranges:**\n• Tomato: 6.0-6.8 (neutral)\n• Potato: 6.0-7.0\n• Wheat: 6.0-7.0\n• Rice: 5.5-7.0\n• Cotton: 6.0-7.5\n\n**Current Status:** ⚠️ Kolkata soil pH is 6.2-6.8 (acceptable)\n\n**If pH is Low (Acidic):**\n• Add lime 1-2 tons/acre\n• Application in autumn preferred\n• Wait 2-3 months before planting\n\n**If pH is High (Alkaline):**\n• Add sulfur 500kg/acre\n• Incorporate in soil 4-6 weeks before planting\n\n**Testing:**\n✓ Test every 2-3 years\n✓ Cost: ₹100-200 per sample\n✓ Contact: Soil Testing Lab, Your District\n\n**Contact Krishi Kendra for soil testing assistance!**',
    keywords: ['soil ph', 'acidity', 'alkalinity', 'lime', 'sulfur', 'soil test']
  },
  'monsoon alert': {
    response: '🌧️ **MONSOON ALERT - High Disease Risk Period:**\n\n**Active Duration:** May-September (High Humidity & Rainfall)\n\n**High-Risk Diseases:**\n🔴 Early Blight (Tomato)\n🔴 Late Blight (Potato)\n🔴 Blast (Rice)\n🔴 Sheath Blight (Rice)\n🔴 Powdery Mildew (Wheat)\n🔴 Downy Mildew (All crops)\n\n**Immediate Action Required:**\n1. Apply preventive fungicide spray TODAY\n2. Improve field drainage immediately\n3. Remove infected leaves\n4. Increase spacing between plants\n5. Avoid overhead watering\n\n**Recommended Fungicides:**\n✓ Mancozeb 2.5g/L (chemical)\n✓ Neem Oil 3ml/L (organic)\n✓ Copper Oxychloride 3g/L (alternative)\n\n**Spray Frequency:** Every 7-10 days during monsoon\n\n**Critical:** Apply first spray within 24 hours!',
    keywords: ['monsoon', 'high humidity', 'disease risk', 'alert', 'weather']
  },
  'retailers near me': {
    response: '📍 **Nearest Agricultural Retailers - Krishi Kendra Network:**\n\n**Your Location:** Kolkata Region (22.5726°N, 88.3639°E)\n\n**1. Krishi Kendra A** ⭐ CLOSEST\n📍 0.8 km away | Status: ✅ OPEN\n📦 Stock: Mancozeb, Neem Oil, Sulfur, Copper products\n🕐 Hours: 7 AM - 6 PM (Mon-Sat)\n📞 Contact via app\n\n**2. AgroBazar**\n📍 1.4 km away | Status: ✅ OPEN\n📦 Stock: All items available\n🕐 Hours: 8 AM - 7 PM (Daily)\n💳 Accepts online payment\n\n**3. Kisan Store**\n📍 2.1 km away | Status: ✅ OPEN\n📦 Stock: Neem oil (organic focus)\n🕐 Hours: 9 AM - 5 PM (Mon-Fri)\n🌿 Certified organic products\n\n**4. FarmCo**\n📍 3.0 km away | Status: ⚠️ LIMITED STOCK\n📦 Stock: Copper products, basic fungicides\n🕐 Hours: 6 AM - 8 PM (Daily)\n🚗 Free delivery available\n\n**Pro Tip:** Order via app for home delivery (₹30 fee)',
    keywords: ['retailers', 'shops', 'krishi kendra', 'nearby', 'location', 'store']
  },
  'weather forecast': {
    response: '⛅ **7-Day Weather Forecast - Kolkata Region:**\n\n**Today (May 8)**\n🌤️ Partly Cloudy | 28°C | Humidity: 82%\n⚠️ Disease Risk: MODERATE\nAction: Safe to spray now\n\n**Tomorrow (May 9)**\n🌧️ Light Rain | 24°C | Humidity: 91%\n⚠️ Disease Risk: HIGH (avoid spraying)\n\n**May 10 (Saturday)**\n⛈️ Heavy Rain + Thunderstorm | 22°C | Humidity: 96%\n🚨 Disease Risk: CRITICAL\nAction: Complete field inspection\n\n**May 11 (Sunday)**\n🌧️ Moderate Rain | 25°C | Humidity: 89%\n⚠️ Disease Risk: HIGH\n\n**May 12 (Monday)**\n⛅ Partly Cloudy | 27°C | Humidity: 78%\n✅ Disease Risk: MODERATE (Safe to spray)\n\n**May 13 (Tuesday)**\n🌤️ Mostly Clear | 30°C | Humidity: 72%\n✅ Disease Risk: LOW\nBest day to spray!\n\n**May 14 (Wednesday)**\n☀️ Sunny | 32°C | Humidity: 65%\n✅ Disease Risk: LOW\n\n💡 **Tip:** Schedule spray for May 12-14 (best window)',
    keywords: ['weather', 'forecast', 'rain', 'humidity', 'temperature', 'clouds']
  },
  'fertilizer': {
    response: '🌾 **Fertilizer Guide for Common Crops:**\n\n**Tomato (per acre):**\n• NPK: 80:40:60 kg/acre\n• Application: 50% at planting, 25% at flowering, 25% at fruiting\n• Cost: ₹3,000-4,000/acre\n\n**Potato (per acre):**\n• NPK: 120:60:60 kg/acre  \n• All at planting time (basal dose)\n• Cost: ₹4,000-5,000/acre\n\n**Wheat (per acre):**\n• NPK: 80:40:0 kg/acre\n• N: 50% basal + 50% at tillering\n• Cost: ₹2,500-3,000/acre\n\n**Rice (per acre):**\n• NPK: 60:30:30 kg/acre\n• Split: 50% basal, 25% at tillering, 25% at panicle\n• Cost: ₹2,000-2,500/acre\n\n**Organic Alternatives:**\n✓ Compost: 5 tons/acre (₹1,500-2,000)\n✓ Vermicompost: 2 tons/acre (₹4,000-5,000)\n✓ Cow dung: 10 tons/acre (₹1,000)\n\n**Timing:** Apply 10-15 days before planting for basal dose',
    keywords: ['fertilizer', 'npk', 'nutrition', 'feeding', 'application']
  },
  'pest management': {
    response: '🐛 **Common Pests & Integrated Pest Management (IPM):**\n\n**Major Pests by Crop:**\n\n🍅 **Tomato:**\n• Fruit Borer - Spinosad 45% SC (2ml/L)\n• Whitefly - Neem oil (3ml/L) + sticky traps\n• Spider Mites - Sulfur dust or Neem\n\n🥔 **Potato:**\n• Leaf Hopper - Imidacloprid 17.8% (3ml/10L)\n• Colorado Beetle - Manual removal + organic spray\n• Aphids - Neem oil (3ml/L)\n\n🌾 **Wheat/Rice:**\n• Armyworm - Chlorpyrifos 20% EC (2L/acre)\n• Stem Borer - Pheromone traps + Spinosad\n• Plant Hopper - Neem oil spray\n\n**IPM Strategy:**\n1. Cultural: Remove crop residue, crop rotation\n2. Mechanical: Traps, handpicking, netting\n3. Biological: Beneficial insects, parasitoids\n4. Chemical: Only as last resort (organic first)\n\n**Chemical Cost:** ₹150-400 per spray\n**Available at:** All Krishi Kendras',
    keywords: ['pest', 'insect', 'borer', 'aphid', 'whitefly', 'management', 'ipm']
  },
  'irrigation': {
    response: '💧 **Irrigation Guide - Water Management by Crop:**\n\n**Tomato:**\n• Frequency: Every 5-7 days\n• Depth: 25-30mm per watering\n• Best Time: Early morning (6-8 AM)\n• During monsoon: Reduce to 10-15 days\n• Cost: ₹500-800/acre/season\n\n**Potato:**\n• Frequency: 7-10 days\n• Critical Period: Post-emergence + tuber formation\n• Total: 4-5 waterings per season\n• Avoid waterlogging\n• Cost: ₹1,000-1,500/acre\n\n**Wheat/Rice:**\n• Rice: Flooded (50-75mm standing water)\n• Wheat: 3-4 waterings (autumn-spring)\n• Spacing: 20-25 days between waterings\n• Cost: ₹800-1,200/acre\n\n**Monsoon Precautions:**\n⚠️ Ensure field drainage immediately\n⚠️ Avoid standing water (promotes disease)\n⚠️ Consider drip irrigation for efficiency\n\n**Water Sources:**\n✓ Canal: ₹500-700/acre/season\n✓ Borewell: ₹2,000-3,000/year (maintenance)\n✓ Drip: One-time cost ₹15,000-20,000/acre',
    keywords: ['irrigation', 'watering', 'water', 'frequency', 'drainage', 'flooding']
  },
  'harvest': {
    response: '🌾 **Harvesting Guide - Timing & Methods:**\n\n**Tomato:**\n• Time to Harvest: 60-65 days after planting\n• Signs: Turn red color, slight softness\n• Frequency: Daily picking (stagewise)\n• Yield: 40-50 tons/acre\n• Price: ₹10-20/kg (seasonal)\n• Storage: Room temperature (15 days) or cold chain\n\n**Potato:**\n• Time to Harvest: 70-90 days\n• Signs: Leaves start yellowing & dying\n• Method: Dig carefully to avoid bruising\n• Yield: 20-25 tons/acre\n• Price: ₹8-15/kg (mandi)\n• Storage: Cool dark place (3 months)\n\n**Wheat:**\n• Time: 120-130 days, grain hard & golden\n• Signs: Moisture <12%, bend test (breaks)\n• Method: Combine harvester or manual\n• Yield: 4-5 tons/acre\n• Price: ₹2,000-2,500/quintal\n\n**Rice:**\n• Time: 120-140 days, 20-25% moisture\n• Signs: Golden color, grains separate easily\n• Yield: 5-6 tons/acre (paddy)\n• Price: ₹2,500-3,000/quintal\n• Drying: Spread in sun to 12% moisture\n\n**Post-Harvest Tips:**\n✓ Don\'t delay harvesting\n✓ Harvest in cool hours\n✓ Minimize bruising/damage\n✓ Grade & sort before selling',
    keywords: ['harvest', 'ripeness', 'ready', 'picking', 'yield', 'time', 'collection']
  },
  'market price': {
    response: '💰 **Current Market Prices - Kolkata Mandi (May 2026):**\n\n**Vegetable Prices (per kg):**\n🍅 Tomato: ₹15-18 (wholesale)\n🥔 Potato: ₹10-12\n🫑 Capsicum: ₹25-30\n🧅 Onion: ₹12-15\n\n**Grain Prices (per quintal):**\n🌾 Wheat: ₹2,100-2,300\n🌾 Rice (paddy): ₹2,400-2,600\n🌽 Maize: ₹1,800-2,000\n\n**Cash Crop Prices:**\n🪴 Cotton (lint): ₹5,500-6,000/quintal\n🌱 Mustard: ₹4,200-4,500/quintal\n\n**Premium Prices (Organic):**\n+25% for certified organic produce\n\n**Factors Affecting Price:**\n📈 Supply shortage: Higher prices\n📉 Season peak: Lower prices\n⚠️ Quality: 10-20% variation\n🚚 Transport: Distance based\n\n**Tips to Get Better Price:**\n✓ Sell direct to retail/restaurants (+15%)\n✓ Grade & package neatly\n✓ Sell in off-season\n✓ Form farmer group\n✓ Use e-NAM platform\n\n**Latest Update:** Updated hourly',
    keywords: ['price', 'market', 'cost', 'mandi', 'selling', 'rate']
  },
  'government schemes': {
    response: '📋 **Government Schemes & Subsidies Available:**\n\n**PM-Kisan Samman Nidhi:**\n💵 ₹6,000/year (₹2,000 every 4 months)\n📋 Eligibility: All farmers with <2 hectare land\n⏰ Status: Active & ongoing\n📞 Register online at pmkisan.gov.in\n\n**Pradhan Mantri Krishi Sinchayee Yojana (PMKSY):**\n💵 50-75% subsidy on irrigation equipment\n📦 Drip irrigation, sprinklers, tubewells\n📞 Apply at Krishi Vibag office\n\n**Soil Health Card Scheme:**\n💵 FREE soil testing\n📋 Know your soil NPK status\n⏰ Every 2-3 years cycle\n📍 Contact: District Soil Testing Lab\n\n**Rashtriya Krishi Vikas Yojana (RKVY):**\n💵 50% subsidy on modern equipment\n📦 Drip systems, greenhouse, solar pumps\n\n**Crop Insurance - PM Fasal Bima Yojana:**\n💵 Covers 70-80% loss from natural calamity\n📋 Premium: ₹400-600/acre (kharif/rabi)\n⚠️ Must enroll 31 days before sowing\n\n**UP/WB State Schemes:**\n✓ Fertilizer subsidy: ₹2,000-3,000/acre\n✓ Seeds subsidy: 50% discount\n✓ Equipment grants: Up to ₹100,000\n\n**How to Apply:**\n1. Visit Patwari office with land documents\n2. Apply through e-Kranti portal\n3. Get approval in 30-45 days\n4. Receive direct subsidy transfer\n\n**Deadline:** Check district website for annual cutoffs',
    keywords: ['scheme', 'subsidy', 'government', 'pm-kisan', 'insurance', 'grant']
  }
};

// Initialize AI Chat System
class CropAI {
  constructor() {
    this.chatHistory = [];
    this.lastApiCall = 0;
    this.isProcessing = false;
  }

  // Escape HTML for security
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Find matching local AI response
  findLocalResponse(userQuery) {
    const query = userQuery.toLowerCase().trim();
    for (const [key, data] of Object.entries(LOCAL_AI_KB)) {
      if (data.keywords.some(kw => query.includes(kw))) {
        return data.response;
      }
    }
    return null;
  }

  // Call External API (GPT-based)
  async callApiAI(userQuery) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), AI_CONFIG.TIMEOUT);

      const response = await fetch(AI_CONFIG.API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AI_CONFIG.API_KEY}`
        },
        body: JSON.stringify({
          model: AI_CONFIG.MODEL,
          messages: [
            { role: 'system', content: 'You are an expert agricultural AI assistant for Indian farmers. Provide practical farming advice with costs in INR, timings, and local resources. Keep responses concise and actionable. Focus on disease management, spraying schedules, fertilizer use, and market info.' },
            { role: 'user', content: userQuery }
          ],
          temperature: 0.7,
          max_tokens: 500
        }),
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!response.ok) {
        return null; // API failed, use fallback
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || null;
    } catch (error) {
      console.log('API timeout or error - using local AI');
      return null;
    }
  }

  // Get AI Response (API first, then Local)
  async getResponse(userQuery) {
    this.isProcessing = true;

    // Try External API if enabled and key is set
    if (AI_CONFIG.API_KEY !== 'sk-YOUR-API-KEY-HERE') {
      const apiResponse = await this.callApiAI(userQuery);
      if (apiResponse) {
        this.isProcessing = false;
        return apiResponse;
      }
    }

    // Fallback to Local AI (instant response)
    if (AI_CONFIG.USE_LOCAL_AI) {
      const localResponse = this.findLocalResponse(userQuery);
      if (localResponse) {
        this.isProcessing = false;
        return localResponse;
      }
    }

    // No response found
    this.isProcessing = false;
    return '🤔 I don\'t have specific information about that topic. Try asking about:\n\n• Early Blight, Late Blight, Powdery Mildew\n• Mancozeb, Neem Oil spray treatments\n• Spray schedules for monsoon\n• Nearby retailers & suppliers\n• Weather forecasts & disease alerts\n• Fertilizer & irrigation management\n• Pest control methods\n• Market prices & government schemes\n\nOr contact your local Krishi Kendra for specialized advice!';
  }

  // Format response with markdown support
  formatResponse(text) {
    // Convert **bold** to <strong>
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Convert line breaks
    text = text.replace(/\n/g, '<br>');
    return text;
  }

  // Add message to chat
  async addMessage(userQuery) {
    if (!userQuery.trim() || this.isProcessing) return;

    const chatContainer = document.getElementById('ai-chat-container');
    if (!chatContainer) return;

    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'ai-msg user-msg';
    userMsg.innerHTML = `<div class="ai-msg-content">${this.escapeHtml(userQuery)}</div>`;
    chatContainer.appendChild(userMsg);

    // Show loading
    const loadingMsg = document.createElement('div');
    loadingMsg.className = 'ai-msg bot-msg';
    loadingMsg.innerHTML = '<div class="ai-msg-content">🤔 <em>Analyzing...</em></div>';
    chatContainer.appendChild(loadingMsg);

    // Get AI response
    const response = await this.getResponse(userQuery);

    // Replace loading with actual response
    loadingMsg.innerHTML = `<div class="ai-msg-content">${this.formatResponse(response)}</div>`;

    // Auto scroll
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Store in history
    this.chatHistory.push({ user: userQuery, bot: response, timestamp: new Date() });
  }

  // Initialize chat UI
  init() {
    const chatContainer = document.getElementById('ai-chat-container');
    if (!chatContainer) return;

    // Add custom styling
    const style = document.createElement('style');
    style.textContent = `
      #ai-chat-container {
        max-height: 500px;
        overflow-y: auto;
        padding: 15px;
        background: linear-gradient(135deg, #f0f9ff 0%, #f0fdf4 100%);
        border-radius: 12px;
        border: 1.5px solid rgba(26,90,50,0.2);
        margin-bottom: 15px;
      }
      .ai-msg {
        display: flex;
        margin-bottom: 12px;
        animation: slideIn 0.3s ease;
      }
      .ai-msg-content {
        max-width: 80%;
        padding: 10px 14px;
        border-radius: 10px;
        font-size: 0.875rem;
        line-height: 1.5;
        word-wrap: break-word;
      }
      .user-msg {
        justify-content: flex-end;
      }
      .user-msg .ai-msg-content {
        background: linear-gradient(135deg, #1a7a3c, #2d9a5c);
        color: white;
        border-bottom-right-radius: 3px;
      }
      .bot-msg {
        justify-content: flex-start;
      }
      .bot-msg .ai-msg-content {
        background: white;
        color: #1a4a28;
        border: 1px solid rgba(26,90,50,0.15);
        border-bottom-left-radius: 3px;
      }
      .ai-input-group {
        display: flex;
        gap: 8px;
        margin-top: 12px;
      }
      #ai-input {
        flex: 1;
        padding: 10px 12px;
        border: 1.5px solid rgba(26,90,50,0.2);
        border-radius: 8px;
        font-size: 0.875rem;
        font-family: inherit;
        outline: none;
        transition: all 0.2s;
      }
      #ai-input:focus {
        border-color: #1a7a3c;
        box-shadow: 0 0 0 3px rgba(26,122,60,0.1);
      }
      #ai-send-btn {
        padding: 10px 16px;
        background: linear-gradient(135deg, #1a7a3c, #2d9a5c);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        font-size: 0.875rem;
        transition: all 0.2s;
      }
      #ai-send-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(26,122,60,0.3);
      }
      #ai-send-btn:active {
        transform: translateY(0);
      }
      .ai-suggested {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        margin-top: 10px;
        font-size: 0.75rem;
      }
      .ai-suggestion-chip {
        padding: 6px 12px;
        background: rgba(26,122,60,0.1);
        border: 1px solid rgba(26,122,60,0.2);
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.2s;
        color: #1a7a3c;
        font-weight: 500;
      }
      .ai-suggestion-chip:hover {
        background: rgba(26,122,60,0.2);
        border-color: rgba(26,122,60,0.4);
      }
      @keyframes slideIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      strong { color: #1a7a3c; font-weight: 600; }
    `;
    document.head.appendChild(style);

    // Add initial greeting
    const greeting = document.createElement('div');
    greeting.className = 'ai-msg bot-msg';
    greeting.innerHTML = `<div class="ai-msg-content">👋 <strong>Welcome to CropSense AI!</strong><br><br>Ask me anything about:\n🌾 Diseases & treatments\n💊 Spray schedules\n🌧️ Weather alerts\n💰 Market prices\n🏪 Nearby retailers<br><br>Start typing your question below...</div>`;
    chatContainer.appendChild(greeting);

    // Add input group
    const inputGroup = document.createElement('div');
    inputGroup.className = 'ai-input-group';
    inputGroup.innerHTML = `
      <input type="text" id="ai-input" placeholder="Ask about farming... (e.g., 'How to treat early blight?')" />
      <button id="ai-send-btn">Send 🚀</button>
    `;
    chatContainer.appendChild(inputGroup);

    // Add suggested questions
    const suggestedDiv = document.createElement('div');
    suggestedDiv.className = 'ai-suggested';
    suggestedDiv.innerHTML = `
      <span class="ai-suggestion-chip" onclick="cropAI.addMessage('How to treat early blight in tomatoes?')">🍅 Early Blight</span>
      <span class="ai-suggestion-chip" onclick="cropAI.addMessage('What is the spray schedule for monsoon?')">📅 Spray Schedule</span>
      <span class="ai-suggestion-chip" onclick="cropAI.addMessage('Where are nearby retailers?')">📍 Find Retailers</span>
      <span class="ai-suggestion-chip" onclick="cropAI.addMessage('What is the weather forecast?')">⛅ Weather</span>
    `;
    chatContainer.appendChild(suggestedDiv);

    // Attach event listeners
    const input = document.getElementById('ai-input');
    const sendBtn = document.getElementById('ai-send-btn');

    sendBtn.addEventListener('click', () => {
      const query = input.value;
      if (query.trim()) {
        this.addMessage(query);
        input.value = '';
        input.focus();
      }
    });

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const query = input.value;
        if (query.trim()) {
          this.addMessage(query);
          input.value = '';
        }
      }
    });

    input.focus();
  }
}

// Initialize AI on page load
let cropAI;
document.addEventListener('DOMContentLoaded', () => {
  cropAI = new CropAI();
  cropAI.init();
  toast('🤖 AI Assistant ready! Ask any farming question.');
});
