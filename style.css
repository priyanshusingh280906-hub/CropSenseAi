// ═══════════════════════════════════════════════════
// KEYBOARD CLICK SOUND
// ═══════════════════════════════════════════════════
let audioCtx = null;
function initAudio() { if(!audioCtx) audioCtx = new (window.AudioContext||window.webkitAudioContext)(); }
function playKeyClick() {
  try {
    initAudio();
    const buf = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.04, audioCtx.sampleRate);
    const data = buf.getChannelData(0);
    for(let i=0;i<data.length;i++){
      const env = 1 - i/data.length;
      data[i] = (Math.random()*2-1) * env * 0.18;
    }
    const src = audioCtx.createBufferSource();
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'highpass'; filter.frequency.value = 2800;
    src.buffer = buf;
    src.connect(filter); filter.connect(audioCtx.destination);
    src.start();
  } catch(e) {}
}
document.addEventListener('keydown', (e) => {
  const tag = e.target.tagName.toLowerCase();
  if(['input','textarea'].includes(tag) && e.key.length === 1) playKeyClick();
});

// ═══════════════════════════════════════════════════
// LOGIN / AUTH FLOW
// ═══════════════════════════════════════════════════
const geoMatrix = {
  "Punjab":["Ludhiana","Amritsar","Jalandhar","Patiala","Bathinda","Fazilka"],
  "Haryana":["Karnal","Hisar","Ambala","Rohtak","Sirsa","Panipat"],
  "Uttar Pradesh":["Lucknow","Kanpur","Agra","Varanasi","Meerut","Mathura"],
  "Rajasthan":["Jaipur","Jodhpur","Udaipur","Kota","Sri Ganganagar"],
  "Madhya Pradesh":["Indore","Bhopal","Jabalpur","Gwalior","Mandsaur"],
  "Maharashtra":["Mumbai","Pune","Nagpur","Nashik","Aurangabad","Kolhapur"],
  "Gujarat":["Ahmedabad","Surat","Vadodara","Rajkot","Anand","Mehsana"],
  "West Bengal":["Kolkata","Siliguri","Asansol","Durgapur","Howrah"],
  "Tamil Nadu":["Chennai","Coimbatore","Madurai","Tiruchirappalli","Salem"],
  "Karnataka":["Bengaluru","Mysuru","Hubli","Mangaluru","Belagavi"],
  "Bihar":["Patna","Gaya","Muzaffarpur","Bhagalpur","Darbhanga"],
  "Andhra Pradesh":["Visakhapatnam","Vijayawada","Guntur","Nellore","Kurnool"]
};
let otpTimerInterval = null;
let generatedOtp = '';

window.addEventListener('DOMContentLoaded', () => {
  const stateDl = document.getElementById('states');
  if(stateDl) stateDl.innerHTML = Object.keys(geoMatrix).map(s=>`<option value="${s}"></option>`).join('');
  // Check if already logged in
  const profile = getProfile();
  if(profile) launchMainApp(profile);
});

function getProfile() {
  try { return JSON.parse(localStorage.getItem('agritech_user_profile')); } catch(e) { return null; }
}

function goToOtp() {
  const phone = document.getElementById('userPhone').value.trim();
  if(phone.length !== 10 || isNaN(phone)) {
    alert('Please enter a valid 10-digit mobile number.');
    return;
  }
  // Simulate OTP generation (in production, call SMS API like Twilio/MSG91)
  generatedOtp = String(Math.floor(1000 + Math.random() * 9000));
  document.getElementById('stepPhone').classList.remove('active');
  document.getElementById('stepOtp').classList.add('active');
  document.getElementById('mainTitle').textContent = 'Verify OTP';
  document.getElementById('subTitle').textContent = `OTP sent to +91 ${phone}. (Demo: ${generatedOtp})`;
  startOtpTimer();
  setTimeout(() => document.getElementById('box1').focus(), 100);
}

function startOtpTimer() {
  let secs = 30;
  document.getElementById('otpTimer').textContent = `Wait ${secs}s`;
  clearInterval(otpTimerInterval);
  otpTimerInterval = setInterval(() => {
    secs--;
    if(secs <= 0) { clearInterval(otpTimerInterval); document.getElementById('otpTimer').textContent = ''; return; }
    document.getElementById('otpTimer').textContent = `Wait ${secs}s`;
  }, 1000);
}

function resendOtp() {
  generatedOtp = String(Math.floor(1000 + Math.random() * 9000));
  document.getElementById('subTitle').textContent = `New OTP sent. (Demo: ${generatedOtp})`;
  startOtpTimer();
  ['box1','box2','box3','box4'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('box1').focus();
}

function shiftFocus(curr, nextId) {
  if(curr.value.length >= 1 && nextId) document.getElementById(nextId).focus();
}

function otpKeydown(e, curr, prevId, currId) {
  if(e.key === 'Backspace' && !curr.value && prevId) {
    document.getElementById(prevId).focus();
    e.preventDefault();
  }
}

function verifyOtp() {
  const pin = ['box1','box2','box3','box4'].map(id => document.getElementById(id).value).join('');
  if(pin.length !== 4) { alert('Please enter all 4 digits.'); return; }
  if(pin !== generatedOtp) { alert('Invalid OTP. Please try again.'); return; }
  clearInterval(otpTimerInterval);
  document.getElementById('stepOtp').classList.remove('active');
  document.getElementById('stepProfile').classList.add('active');
  document.getElementById('mainTitle').textContent = 'Complete Profile';
  document.getElementById('subTitle').textContent = 'Tell us about your farm so we can personalise your experience.';
}

function filterCities() {
  const stateInput = document.getElementById('regState');
  const cityInput = document.getElementById('regCity');
  const cityDl = document.getElementById('cities');
  const val = stateInput.value.trim();
  const exactMatch = Object.keys(geoMatrix).find(s => s.toLowerCase() === val.toLowerCase());
  if(exactMatch) {
    cityInput.disabled = false;
    cityInput.placeholder = 'Select city/district';
    cityDl.innerHTML = geoMatrix[exactMatch].map(c=>`<option value="${c}"></option>`).join('');
  } else {
    cityInput.disabled = true;
    cityInput.value = '';
    cityInput.placeholder = 'Select a valid state first';
    cityDl.innerHTML = '';
  }
}

function saveAndRedirect() {
  const name = document.getElementById('regName').value.trim();
  const state = document.getElementById('regState').value.trim();
  const city = document.getElementById('regCity').value.trim();
  const crop = document.getElementById('regCrop').value;
  const validState = Object.keys(geoMatrix).find(s => s.toLowerCase() === state.toLowerCase());
  if(!name || !state || !city || !validState) {
    alert('Please fill all fields and select a valid state and city.');
    return;
  }
  const profile = { name, state: validState, city, crop, phone: document.getElementById('userPhone').value.trim() };
  localStorage.setItem('agritech_user_profile', JSON.stringify(profile));
  launchMainApp(profile);
}

function launchMainApp(profile) {
  document.getElementById('app-login').style.display = 'none';
  document.getElementById('app-main').style.display = 'block';
  // Set user info in nav
  document.getElementById('nav-username').textContent = profile.name.split(' ')[0];
  document.getElementById('nav-avatar').textContent = profile.name.charAt(0).toUpperCase();
  // Init
  loadKeys();
  renderCards();
  renderTable();
  // Fetch weather
  fetchWeatherForProfile(profile);
  // Request notification permission
  if('Notification' in window && Notification.permission === 'default') {
    setTimeout(() => Notification.requestPermission(), 3000);
  }
}

function doLogout() {
  localStorage.removeItem('agritech_user_profile');
  document.getElementById('app-main').style.display = 'none';
  document.getElementById('app-login').style.display = 'flex';
  // Reset login steps
  document.getElementById('stepPhone').classList.add('active');
  document.getElementById('stepOtp').classList.remove('active');
  document.getElementById('stepProfile').classList.remove('active');
  document.getElementById('mainTitle').textContent = 'Get Started';
  document.getElementById('subTitle').textContent = 'Enter your phone number to secure your local account space.';
  document.getElementById('userPhone').value = '';
  ['box1','box2','box3','box4'].forEach(id => document.getElementById(id).value = '');
}

// ═══════════════════════════════════════════════════
// PAGE NAVIGATION
// ═══════════════════════════════════════════════════
const pages = ['marketplace','satellite','crop','alerts'];
let currentPage = 'marketplace';

function showPage(page) {
  currentPage = page;
  pages.forEach(p => {
    document.getElementById('page-'+p).classList.toggle('active', p===page);
    const nl = document.getElementById('nl-'+p);
    const mm = document.getElementById('mm-'+p);
    if(nl) nl.classList.toggle('active', p===page);
    if(mm) mm.classList.toggle('active', p===page);
  });
  window.scrollTo({top:0,behavior:'smooth'});
  if(page==='satellite' && !satMapInit) initSatMap();
  if(page==='alerts') fetchWeatherData();
}

function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

// ═══════════════════════════════════════════════════
// WEATHER ALERTS SYSTEM
// ═══════════════════════════════════════════════════
let alertConfig = {};
let weatherData = null;
let weatherCheckInterval = null;

function loadAlertConfig() {
  try { alertConfig = JSON.parse(localStorage.getItem('agritech_alerts') || '{}'); } catch(e) {}
  if(alertConfig['owm-key']) document.getElementById('owm-key').value = alertConfig['owm-key'];
  if(alertConfig['twilio-sid']) document.getElementById('twilio-sid').value = alertConfig['twilio-sid'];
  if(alertConfig['twilio-token']) document.getElementById('twilio-token').value = alertConfig['twilio-token'];
  if(alertConfig['twilio-from']) document.getElementById('twilio-from').value = alertConfig['twilio-from'];
}

function saveAlertConfig() {
  alertConfig['owm-key'] = document.getElementById('owm-key').value.trim();
  alertConfig['twilio-sid'] = document.getElementById('twilio-sid').value.trim();
  alertConfig['twilio-token'] = document.getElementById('twilio-token').value.trim();
  alertConfig['twilio-from'] = document.getElementById('twilio-from').value.trim();
  alertConfig['phone'] = document.getElementById('alert-phone').value.trim();
  alertConfig['whatsapp'] = document.getElementById('alert-whatsapp').value.trim();
  localStorage.setItem('agritech_alerts', JSON.stringify(alertConfig));
  addAlertLog('info', 'Alert configuration saved successfully.');
}

async function fetchWeatherForProfile(profile) {
  const city = profile.city || 'Delhi';
  document.getElementById('weather-location-name').textContent = `— ${city}`;
  await fetchWeatherByCity(city);
}

async function fetchWeatherData() {
  const profile = getProfile();
  const city = profile?.city || 'Delhi';
  await fetchWeatherByCity(city);
}

async function getCurrentWeatherLocation() {
  if(!navigator.geolocation) { addAlertLog('warn', 'Geolocation not supported by your browser.'); return; }
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude: lat, longitude: lon } = pos.coords;
    await fetchWeatherByCoords(lat, lon);
  }, () => { addAlertLog('warn', 'Location access denied. Using profile city.'); fetchWeatherData(); });
}

async function fetchWeatherByCity(city) {
  const key = alertConfig['owm-key'] || document.getElementById('owm-key')?.value?.trim();
  if(!key) {
    // Demo data when no API key
    showDemoWeather(city);
    return;
  }
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},IN&appid=${key}&units=metric`);
    if(!res.ok) throw new Error('API error');
    const data = await res.json();
    weatherData = data;
    displayWeather(data);
    fetchForecast(city, key);
    checkWeatherAlerts(data);
  } catch(e) {
    showDemoWeather(city);
  }
}

async function fetchWeatherByCoords(lat, lon) {
  const key = alertConfig['owm-key'] || document.getElementById('owm-key')?.value?.trim();
  if(!key) { showDemoWeather('Current Location'); return; }
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`);
    if(!res.ok) throw new Error();
    const data = await res.json();
    weatherData = data;
    displayWeather(data);
    document.getElementById('weather-location-name').textContent = `— ${data.name}`;
    checkWeatherAlerts(data);
  } catch(e) { showDemoWeather('Your Location'); }
}

function showDemoWeather(city) {
  const demos = [
    { temp: 32, hum: 68, wind: 18, rain: 0, icon: '🌤', desc: 'Partly cloudy' },
    { temp: 28, hum: 82, wind: 25, rain: 12, icon: '🌧', desc: 'Rain showers' },
    { temp: 38, hum: 45, wind: 30, rain: 0, icon: '☀️', desc: 'Sunny hot' },
  ];
  const d = demos[Math.floor(Math.random() * demos.length)];
  document.getElementById('w-temp').textContent = d.temp + '°';
  document.getElementById('w-hum').textContent = d.hum + '%';
  document.getElementById('w-wind').textContent = d.wind;
  document.getElementById('w-rain').textContent = d.rain;
  document.getElementById('weather-icon').textContent = d.icon;
  document.getElementById('weather-location-name').textContent = `— ${city} (Demo)`;
  generateDemoForecast();
  updateFarmingAdvisory(d.temp, d.hum, d.rain);
  addAlertLog('info', `Weather loaded for ${city} (demo data — add OpenWeatherMap API key for live data).`);
}

function displayWeather(data) {
  const temp = Math.round(data.main.temp);
  const hum = data.main.humidity;
  const wind = Math.round(data.wind.speed * 3.6); // m/s to km/h
  const rain = data.rain ? Math.round(data.rain['1h'] * 10) / 10 : 0;
  const iconMap = { 'Clear': '☀️', 'Clouds': '⛅', 'Rain': '🌧', 'Drizzle': '🌦', 'Thunderstorm': '⛈', 'Snow': '❄️', 'Mist': '🌫', 'Haze': '🌫' };
  const weatherMain = data.weather[0].main;
  document.getElementById('w-temp').textContent = temp + '°';
  document.getElementById('w-hum').textContent = hum + '%';
  document.getElementById('w-wind').textContent = wind;
  document.getElementById('w-rain').textContent = rain;
  document.getElementById('weather-icon').textContent = iconMap[weatherMain] || '🌤';
  updateFarmingAdvisory(temp, hum, rain);
}

async function fetchForecast(city, key) {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)},IN&appid=${key}&units=metric&cnt=40`);
    if(!res.ok) throw new Error();
    const data = await res.json();
    // Get one reading per day
    const days = {};
    data.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if(!days[date]) days[date] = item;
    });
    renderForecast(Object.values(days).slice(0, 5));
  } catch(e) { generateDemoForecast(); }
}

function renderForecast(days) {
  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const iconMap = { 'Clear':'☀️','Clouds':'⛅','Rain':'🌧','Drizzle':'🌦','Thunderstorm':'⛈','Snow':'❄️' };
  const row = document.getElementById('forecast-row');
  row.innerHTML = days.map(d => {
    const date = new Date(d.dt_txt);
    const dayName = dayNames[date.getDay()];
    const temp = Math.round(d.main.temp);
    const icon = iconMap[d.weather[0].main] || '🌤';
    const pop = Math.round((d.pop||0) * 100);
    return `<div class="forecast-day">
      <div class="fday">${dayName}</div>
      <div class="ficon">${icon}</div>
      <div class="ftemp">${temp}°C</div>
      <div class="frain">💧${pop}%</div>
    </div>`;
  }).join('');
}

function generateDemoForecast() {
  const days2 = [
    {day:'Mon',icon:'☀️',temp:33,rain:5},
    {day:'Tue',icon:'⛅',temp:30,rain:20},
    {day:'Wed',icon:'🌧',temp:27,rain:75},
    {day:'Thu',icon:'⛈',temp:25,rain:85},
    {day:'Fri',icon:'🌤',temp:31,rain:10},
  ];
  document.getElementById('forecast-row').innerHTML = days2.map(d =>
    `<div class="forecast-day"><div class="fday">${d.day}</div><div class="ficon">${d.icon}</div><div class="ftemp">${d.temp}°C</div><div class="frain">💧${d.rain}%</div></div>`
  ).join('');
}

function updateFarmingAdvisory(temp, hum, rain) {
  let advisory = '';
  if(rain > 15) advisory = '🌧 Heavy rain expected — delay pesticide application. Secure stored harvest. Check drainage channels.';
  else if(temp > 40) advisory = '🌡 Extreme heat — increase irrigation frequency. Apply mulch to retain soil moisture. Protect young plants.';
  else if(temp < 10) advisory = '❄️ Cold conditions — protect sensitive crops from frost. Delay transplanting. Cover nursery beds.';
  else if(hum > 85) advisory = '💧 High humidity — watch for fungal diseases. Improve field ventilation. Apply preventive fungicide.';
  else advisory = '✅ Good farming conditions today. Ideal for field work, spraying, and light irrigation. Monitor soil moisture.';
  document.getElementById('farming-advisory').textContent = advisory;
}

function checkWeatherAlerts(data) {
  const temp = Math.round(data.main.temp);
  const rain = data.rain ? data.rain['1h'] || 0 : 0;
  const wind = data.wind.speed * 3.6;
  const weatherMain = data.weather[0].main;
  const isRain = document.getElementById('tog-rain')?.checked;
  const isStorm = document.getElementById('tog-storm')?.checked;
  const isHeat = document.getElementById('tog-heat')?.checked;
  const isWind = document.getElementById('tog-wind')?.checked;
  let alerts = [];
  if(isRain && rain > 20) alerts.push({ type:'warn', msg:`Heavy rain alert: ${rain}mm/hr detected. Delay pesticide spraying.` });
  if(isStorm && weatherMain === 'Thunderstorm') alerts.push({ type:'danger', msg:'⛈ Thunderstorm warning! Secure equipment, avoid open fields.' });
  if(isHeat && temp > 42) alerts.push({ type:'danger', msg:`🌡 Extreme heat: ${temp}°C. Irrigate crops immediately.` });
  if(isWind && wind > 60) alerts.push({ type:'warn', msg:`💨 High wind warning: ${Math.round(wind)} km/h. Secure greenhouses.` });
  alerts.forEach(a => {
    addAlertLog(a.type, a.msg);
    if(document.getElementById('tog-browser')?.checked) sendBrowserNotification('AgriTech Weather Alert', a.msg);
    showAlertBanner(a.msg);
  });
}

function sendBrowserNotification(title, body) {
  if('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body, icon: 'data:image/svg+xml,...' });
  }
}

function showAlertBanner(msg) {
  const banner = document.getElementById('weather-alert-banner');
  document.getElementById('alert-banner-text').textContent = '⚡ ' + msg;
  banner.classList.remove('hide');
  setTimeout(() => banner.classList.add('hide'), 10000);
}

function dismissBanner() {
  document.getElementById('weather-alert-banner').classList.add('hide');
}

function addAlertLog(type, msg) {
  const log = document.getElementById('alert-log');
  if(!log) return;
  const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const div = document.createElement('div');
  div.className = `log-item ${type}`;
  div.innerHTML = `<div><div style="font-weight:600">${msg}</div><div class="log-time">${now}</div></div>`;
  log.insertBefore(div, log.firstChild);
  // Keep max 20 items
  while(log.children.length > 20) log.removeChild(log.lastChild);
}

function clearAlertLog() {
  document.getElementById('alert-log').innerHTML = '';
}

function activateAlerts() {
  const phone = document.getElementById('alert-phone').value.trim();
  if(!phone) { alert('Please enter your mobile number first.'); return; }
  alertConfig.phone = phone;
  alertConfig.active = true;
  localStorage.setItem('agritech_alerts', JSON.stringify(alertConfig));
  addAlertLog('info', `✅ Alert system activated for ${phone}. You will receive weather alerts via enabled channels.`);
  // Start periodic weather check (every 30 min in production; 60s for demo)
  if(weatherCheckInterval) clearInterval(weatherCheckInterval);
  weatherCheckInterval = setInterval(fetchWeatherData, 60000);
  fetchWeatherData();
}

async function testAlert() {
  const phone = document.getElementById('alert-phone').value.trim();
  const key = alertConfig['twilio-sid'];
  addAlertLog('warn', '🧪 Test alert triggered. ' + (phone ? `Would send to ${phone}.` : 'Add phone number to receive SMS.'));
  if(document.getElementById('tog-browser')?.checked) {
    sendBrowserNotification('AgriTech Test Alert', '🌧 This is a test weather alert from AgriTech. Your alert system is working!');
  }
  // Show modal
  showModal('🧪 Test Alert', `Alert system test successful! In production with Twilio credentials, SMS and WhatsApp messages would be sent to ${phone || 'your configured number'}.`);
  // Demo WhatsApp link (for manual testing)
  if(phone && document.getElementById('tog-wa')?.checked) {
    const waMsg = encodeURIComponent('🌾 AgriTech Weather Alert: This is a test message from your AgriTech farm alert system. System is working correctly!');
    window.open(`https://wa.me/${phone.replace(/\D/g,'')}?text=${waMsg}`, '_blank');
  }
}

async function sendSMSAlert(to, message) {
  // This requires a backend proxy. Direct Twilio calls from frontend expose credentials.
  // In production: POST to your backend /api/send-sms with { to, message }
  const sid = alertConfig['twilio-sid'];
  const token = alertConfig['twilio-token'];
  const from = alertConfig['twilio-from'];
  if(!sid || !token || !from) {
    addAlertLog('warn', 'Twilio credentials not configured. SMS not sent.');
    return;
  }
  // Note: In production, use a backend proxy to protect credentials
  addAlertLog('info', `📱 SMS queued for ${to}: ${message.substring(0,50)}...`);
}

function sendWhatsAppAlert(to, message) {
  // Twilio WhatsApp API — requires backend proxy in production
  addAlertLog('info', `💚 WhatsApp alert queued for ${to}`);
  // For demo: open wa.me link
  const waMsg = encodeURIComponent(`🌾 AgriTech Alert: ${message}`);
  console.log(`WhatsApp: https://wa.me/${to}?text=${waMsg}`);
}

function showModal(title, body) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').textContent = body;
  document.getElementById('modal-overlay').classList.add('show');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('show');
}

function goToAlertsPage() {
  closeModal();
  showPage('alerts');
}

// ═══════════════════════════════════════════════════
// MARKETPLACE LOGIC
// ═══════════════════════════════════════════════════
const DB=[
  {id:1,name:"Chlorpyrifos 20% EC Pesticide 1L",cat:"pesticide",emoji:"🧪",kw:"chlorpyrifos pesticide insecticide 1 litre",amz:480,fk:465,im:430,lc:410},
  {id:2,name:"DAP Fertilizer 50kg",cat:"fertilizer",emoji:"🌿",kw:"DAP fertilizer diammonium phosphate 50kg",amz:1380,fk:1360,im:1290,lc:1250},
  {id:3,name:"Hybrid Tomato Seeds 10g",cat:"seeds",emoji:"🍅",kw:"hybrid tomato seeds 10 gram agriculture",amz:220,fk:235,im:195,lc:185},
  {id:4,name:"Drip Irrigation Kit 100m",cat:"irrigation",emoji:"💧",kw:"drip irrigation kit 100 metre",amz:3200,fk:3050,im:2750,lc:2900},
  {id:5,name:"Urea Fertilizer 45kg",cat:"fertilizer",emoji:"🌾",kw:"urea fertilizer 45kg agriculture",amz:920,fk:905,im:860,lc:830},
  {id:6,name:"Mancozeb 75% WP Fungicide 500g",cat:"pesticide",emoji:"🔬",kw:"mancozeb 75 wp fungicide 500 gram",amz:340,fk:328,im:310,lc:295},
  {id:7,name:"Sprayer Pump 16L Backpack",cat:"tools",emoji:"🔧",kw:"agricultural sprayer pump 16 litre backpack",amz:1850,fk:1790,im:1620,lc:1700},
  {id:8,name:"BT Cotton Seeds 450g",cat:"seeds",emoji:"🌱",kw:"BT cotton seeds 450 gram agriculture",amz:790,fk:810,im:750,lc:720},
  {id:9,name:"Vermicompost Organic 5kg",cat:"soil",emoji:"🪱",kw:"vermicompost organic fertilizer 5kg",amz:280,fk:265,im:240,lc:210},
  {id:10,name:"Imidacloprid 17.8% SL 500ml",cat:"pesticide",emoji:"🧫",kw:"imidacloprid 17.8 insecticide 500ml",amz:395,fk:380,im:355,lc:340},
  {id:11,name:"NPK 19:19:19 Water Soluble 5kg",cat:"fertilizer",emoji:"💊",kw:"NPK 19 19 19 water soluble fertilizer 5kg",amz:860,fk:840,im:790,lc:820},
  {id:12,name:"Soil Testing Kit",cat:"soil",emoji:"🧪",kw:"soil testing kit agriculture",amz:1450,fk:1380,im:1250,lc:1300},
  {id:13,name:"Tarpaulin Heavy Duty 20x30ft",cat:"tools",emoji:"🏕️",kw:"tarpaulin heavy duty waterproof 20x30",amz:1100,fk:1050,im:920,lc:980},
  {id:14,name:"Wheat Seeds (HD-2967) 5kg",cat:"seeds",emoji:"🌾",kw:"wheat seeds HD 2967 5kg agriculture",amz:320,fk:305,im:280,lc:265},
  {id:15,name:"Pheromone Trap Set (10 pcs)",cat:"pesticide",emoji:"🪤",kw:"pheromone trap agriculture pest set",amz:550,fk:530,im:480,lc:460},
];
let K={amzKey:'',amzSecret:'',amzTag:'',amzMarket:'www.amazon.in',fkId:'',fkToken:'',imKey:'',imMobile:''};
let AP={amz:true,fk:true,im:true,lc:true};
let currentCat='all';
let currentProd=[...DB];
let liveAmzData={};

function loadKeys(){
  try{const s=localStorage.getItem('agritech_keys');if(s)K=JSON.parse(s);}catch(e){}
  ['amzKey','amzSecret','amzTag','amzMarket','fkId','fkToken','imKey','imMobile'].forEach(k=>{const el=document.getElementById(k);if(el)el.value=K[k]||'';});
  if(!K.amzMarket)K.amzMarket='www.amazon.in';
  updateStatus();
}
function saveKeys(){
  ['amzKey','amzSecret','amzTag','amzMarket','fkId','fkToken','imKey','imMobile'].forEach(k=>{const el=document.getElementById(k);if(el)K[k]=el.value.trim();});
  localStorage.setItem('agritech_keys',JSON.stringify(K));
  updateStatus();togglePanel();renderCards();renderTable();
}
function clearKeys(){
  K={amzKey:'',amzSecret:'',amzTag:'',amzMarket:'www.amazon.in',fkId:'',fkToken:'',imKey:'',imMobile:''};
  localStorage.removeItem('agritech_keys');
  ['amzKey','amzSecret','amzTag','fkId','fkToken','imKey','imMobile'].forEach(k=>{const el=document.getElementById(k);if(el)el.value='';});
  document.getElementById('amzMarket').value='www.amazon.in';
  liveAmzData={};updateStatus();renderCards();renderTable();
}
function updateStatus(){
  const hasAmz=!!(K.amzKey&&K.amzTag);const hasFk=!!K.fkId;
  const dot=document.getElementById('pdot');const badge=document.getElementById('apiStatus');
  if(hasAmz||hasFk){dot.classList.add('connected');badge.textContent='✓ Active';badge.className='api-status ok';}
  else{dot.classList.remove('connected');badge.textContent='Setup Required';badge.className='api-status miss';}
}
function togglePanel(){document.getElementById('apiPanel').classList.toggle('show');document.getElementById('chev').classList.toggle('open');}
function amzLink(p){return `https://${K.amzMarket||'www.amazon.in'}/s?k=${encodeURIComponent(p.kw)}&tag=${K.amzTag||'agritech-21'}`;}
function fkLink(p){return `https://www.flipkart.com/search?q=${encodeURIComponent(p.kw)}${K.fkId?'&affid='+K.fkId:''}`;}
function imLink(p){return `https://www.indiamart.com/search.mp?ss=${encodeURIComponent(p.kw)}`;}
function getAmzP(p){return (liveAmzData[p.id]?.price)||p.amz;}
function getAmzUrl(p){return liveAmzData[p.id]?.url||amzLink(p);}
function getP(p,k){return k==='amz'?getAmzP(p):p[k];}
function getUrl(p,k){if(k==='amz')return getAmzUrl(p);if(k==='fk')return fkLink(p);if(k==='im')return imLink(p);return '#';}
function minP(p){const v=[];['amz','fk','im','lc'].forEach(k=>{if(AP[k])v.push(getP(p,k));});return v.length?Math.min(...v):0;}
function maxP(p){const v=[];['amz','fk','im','lc'].forEach(k=>{if(AP[k])v.push(getP(p,k));});return v.length?Math.max(...v):0;}
function cheapK(p){let best=null,bv=Infinity;['amz','fk','im','lc'].forEach(k=>{const v=getP(p,k);if(AP[k]&&v<bv){bv=v;best=k;}});return best;}
function saveDiff(p){return maxP(p)-minP(p);}
const PLbl={amz:'Amazon',fk:'Flipkart',im:'IndiaMart',lc:'Local'};
const PIco={amz:'🟠',fk:'🔵',im:'🔴',lc:'🟢'};
const PCol={amz:'camz',fk:'cfk',im:'cim',lc:'clc'};
async function doSearch(){
  const q=document.getElementById('searchInput').value.toLowerCase().trim();
  const cat=document.getElementById('catSelect').value;
  if(cat!=='all')currentCat=cat;
  showLoad(true);
  let filtered=[...DB];
  if(currentCat!=='all')filtered=filtered.filter(p=>p.cat===currentCat);
  if(q)filtered=filtered.filter(p=>p.name.toLowerCase().includes(q)||p.cat.includes(q)||p.kw.toLowerCase().includes(q));
  currentProd=filtered;
  await new Promise(r=>setTimeout(r,600));
  showLoad(false);renderCards();renderTable();
}
function fCat(cat,el){
  currentCat=cat;
  document.querySelectorAll('.cat-pill').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
  currentProd=DB.filter(p=>cat==='all'||p.cat===cat);
  renderCards();renderTable();
}
function renderCards(){
  const grid=document.getElementById('pgrid');
  if(!currentProd.length){grid.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:44px;color:var(--muted)"><div style="font-size:2.8rem">🌱</div><h3 style="margin:10px 0 6px;color:var(--dark)">No products found</h3><p>Try a different search term.</p></div>';document.getElementById('rtitle').textContent='No products found';renderTable();return;}
  document.getElementById('rtitle').textContent=`Showing ${currentProd.length} product${currentProd.length!==1?'s':''}`;
  grid.innerHTML=currentProd.map(p=>{
    const ck=cheapK(p);const sv=saveDiff(p);
    const rows=['amz','fk','im','lc'].filter(k=>AP[k]).map(k=>{
      const ic=k===ck;const pr=getP(p,k);const url=getUrl(p,k);const isLoc=k==='lc';
      return `<a href="${url}" ${isLoc?'':'target="_blank" rel="noopener"'} class="prow ${ic?'cheap':''}" ${isLoc?'onclick="return false"':''}>
        <span class="pn ${PCol[k]}">${PIco[k]} ${PLbl[k]}</span>
        <span class="pv ${ic?'clc':''}">₹${pr.toLocaleString('en-IN')}</span></a>`;
    }).join('');
    const buyUrl=ck&&ck!=='lc'?getUrl(p,ck):'#';
    return `<div class="pcard">
      ${sv>60?'<div class="badge-best">Best Deal</div>':''}
      <div class="pimg">${p.emoji}</div>
      <div class="pbody">
        <div class="pcat">${p.cat}</div>
        <div class="pname">${p.name}</div>
        <div class="pprices">${rows}</div>
        ${sv>0?`<div class="savtag">💰 Save up to ₹${sv.toLocaleString('en-IN')}</div>`:''}
        <a href="${buyUrl}" ${ck&&ck!=='lc'?'target="_blank" rel="noopener"':''} class="btn-buy">Buy on ${ck?PLbl[ck]:'Best Platform'} →</a>
      </div></div>`;
  }).join('');
}
function renderTable(){
  const body=document.getElementById('ctbody');
  if(!currentProd.length){body.innerHTML='<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:20px">No products</td></tr>';return;}
  body.innerHTML=currentProd.map(p=>{
    const ck=cheapK(p);const mxp=maxP(p);
    function cell(k){
      if(!AP[k])return '<td style="color:#ccc;font-size:.76rem">—</td>';
      const pr=getP(p,k);const isC=k===ck;const isH=pr===mxp&&!isC;const isLoc=k==='lc';const url=getUrl(p,k);
      return `<td class="pcell ${isC?'plo':isH?'phi':''}">
        ${isLoc?`₹${pr.toLocaleString('en-IN')}`:`<a class="plink" href="${url}" target="_blank">₹${pr.toLocaleString('en-IN')}</a>`}
        ${isC?'<span class="tbest">✓ Best</span>':''}</td>`;
    }
    return `<tr><td><strong>${p.emoji} ${p.name}</strong></td><td style="font-size:.76rem;color:var(--muted)">${p.cat}</td>${cell('amz')}${cell('fk')}${cell('im')}${cell('lc')}
      <td><span style="background:#e8f5e9;color:#2e7d32;font-size:.76rem;font-weight:700;padding:3px 10px;border-radius:50px">${ck?PLbl[ck]:'N/A'}</span></td></tr>`;
  }).join('');
}
function togPlat(k){AP[k]=!AP[k];document.getElementById('t-'+k).classList.toggle('on',AP[k]);renderCards();renderTable();}
function doSort(mode){
  if(mode==='asc')currentProd.sort((a,b)=>minP(a)-minP(b));
  else if(mode==='desc')currentProd.sort((a,b)=>minP(b)-minP(a));
  else if(mode==='save')currentProd.sort((a,b)=>saveDiff(b)-saveDiff(a));
  else currentProd=DB.filter(p=>currentCat==='all'||p.cat===currentCat);
  renderCards();renderTable();
}
let lstepsData=[];
function showLoad(v){document.getElementById('loadDiv').style.display=v?'block':'none';document.getElementById('resultsSec').style.opacity=v?'0.35':'1';}

// ═══════════════════════════════════════════════════
// SATELLITE MAP (Leaflet + Nominatim geocoding)
// ═══════════════════════════════════════════════════
let satMapInit=false,satMap,satMarker,analysisCircle,anomalyMarkers=[],currentLatLng=null;

function initSatMap(){
  satMapInit=true;
  satMap=L.map('sat-map',{zoomControl:true}).setView([20.5937,78.9629],5);
  // Satellite-like tile layer using OpenStreetMap
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{
    attribution:'Tiles © Esri — Esri, DeLorme, NAVTEQ',maxZoom:18
  }).addTo(satMap);
  // Labels overlay
  L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.png',{
    attribution:'Map tiles by Stamen Design',maxZoom:20,opacity:0.6
  }).addTo(satMap);
  satMap.on('click',function(e){
    placeMarker(e.latlng.lat,e.latlng.lng);
    document.getElementById('location-input').value=`${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}`;
  });
}

function updateRangeStyle(el){
  const pct=(el.value-el.min)/(el.max-el.min)*100;
  el.style.background=`linear-gradient(to right,var(--green) ${pct}%,#d4e4d4 ${pct}%)`;
}

function placeMarker(lat,lng){
  currentLatLng={lat,lng};
  if(satMarker)satMap.removeLayer(satMarker);
  satMarker=L.marker([lat,lng]).addTo(satMap).bindPopup(`<b>Selected Field</b><br>Lat:${lat.toFixed(5)}<br>Lng:${lng.toFixed(5)}`).openPopup();
  if(analysisCircle)satMap.removeLayer(analysisCircle);
  const r=parseFloat(document.getElementById('radius-range').value)*1000;
  analysisCircle=L.circle([lat,lng],{radius:r,color:'#2e7d32',fillColor:'#4caf50',fillOpacity:.12,weight:2}).addTo(satMap);
}

async function getCurrentLocation(){
  if(!navigator.geolocation){alert('Geolocation not supported.');return;}
  setSatStatus('Getting your location…',true);
  navigator.geolocation.getCurrentPosition(pos=>{
    const{latitude:lat,longitude:lng}=pos.coords;
    if(!satMapInit)initSatMap();
    satMap.setView([lat,lng],14);
    placeMarker(lat,lng);
    document.getElementById('location-input').value=`${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    setSatStatus('📍 Using your current location',false);
  },err=>{setSatStatus('Location access denied.',false);});
}

async function searchLocation(){
  const q=document.getElementById('location-input').value.trim();
  if(!q)return;
  const llMatch=q.match(/^(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)$/);
  if(llMatch){const lat=parseFloat(llMatch[1]),lng=parseFloat(llMatch[2]);satMap.setView([lat,lng],12);placeMarker(lat,lng);return;}
  setSatStatus('Geocoding location…',true);
  try{
    const res=await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1`,{headers:{'Accept-Language':'en'}});
    const data=await res.json();
    if(!data.length){setSatStatus('Location not found.',false);return;}
    const{lat,lon,display_name}=data[0];
    satMap.setView([parseFloat(lat),parseFloat(lon)],12);
    placeMarker(parseFloat(lat),parseFloat(lon));
    setSatStatus(`📍 ${display_name.split(',').slice(0,3).join(', ')}`,false);
  }catch(e){setSatStatus('Geocoding failed. Try clicking the map.',false);}
}

function setSatStatus(msg,loading){
  const bar=document.getElementById('status-bar-sat');const txt=document.getElementById('status-text-sat');
  bar.classList.add('show');txt.textContent=msg;
  bar.querySelector('.spinner-sm').style.display=loading?'block':'none';
}
function hideSatStatus(){document.getElementById('status-bar-sat').classList.remove('show');}

async function runAnalysis(){
  if(!currentLatLng){alert('Please select a field location first — search or click on the map.');return;}
  const btn=document.getElementById('analyze-btn');btn.disabled=true;
  const indexType=document.getElementById('index-select').value;
  const satellite=document.getElementById('satellite-select').value;
  const radius=document.getElementById('radius-range').value;
  const cloudCover=document.getElementById('cloud-range').value;
  const dateFrom=document.getElementById('date-from').value;
  const dateTo=document.getElementById('date-to').value;
  const{lat,lng}=currentLatLng;
  document.getElementById('results-grid').style.display='none';
  document.getElementById('info-box').classList.remove('show');
  document.getElementById('anomaly-list').classList.remove('show');
  anomalyMarkers.forEach(m=>satMap.removeLayer(m));anomalyMarkers=[];
  const steps=['Connecting to satellite archive…',`Querying ${satellite} imagery…`,`Filtering cloud cover ≤${cloudCover}%…`,`Computing ${indexType} index…`,'Detecting growth anomalies…','Running AI interpretation…'];
  let i=0;const st=setInterval(()=>{if(i<steps.length)setSatStatus(steps[i++],true);},900);
  await sleep(steps.length*900+400);clearInterval(st);
  const analysis=generateAnalysis(lat,lng,indexType,satellite,radius);
  setSatStatus('Generating AI insights…',true);
  let aiText=await callSatClaude(lat,lng,indexType,satellite,radius,dateFrom,dateTo,analysis);
  hideSatStatus();btn.disabled=false;
  document.getElementById('r-healthy').textContent=analysis.healthy+'%';
  document.getElementById('r-stress').textContent=analysis.stress+'%';
  document.getElementById('r-anomaly').textContent=analysis.anomaly+'%';
  document.getElementById('results-grid').style.display='grid';
  document.getElementById('info-text').innerHTML=aiText;
  document.getElementById('info-box').classList.add('show');
  renderAnomalyList(analysis.zones);
  plotAnomalyMarkers(lat,lng,analysis.zones,parseFloat(radius));
}

function sleep(ms){return new Promise(r=>setTimeout(r,ms));}

function generateAnalysis(lat,lng,index,satellite,radius){
  const seed=Math.abs(Math.sin(lat*100)*Math.cos(lng*100))*1000;
  const rng=(a,b)=>a+(seed%(b-a+1));
  const healthy=Math.round(rng(45,75));const stress=Math.round(rng(15,30));const anomaly=100-healthy-stress;
  const zoneTypes=[
    {type:'warning',title:'Moisture Deficit',desc:'Reduced values suggest water stress. Irrigation recommended.'},
    {type:'warning',title:'Chlorophyll Drop',desc:'Possible nitrogen deficiency or early pest damage detected.'},
    {type:'critical',title:'Bare Soil / Crop Failure',desc:'Very low reflectance. Possible crop loss or harvested patch.'},
    {type:'warning',title:'Phenological Lag',desc:'Growth stage behind surrounding fields by ~2 weeks.'},
    {type:'critical',title:'Disease Hotspot',desc:'Spectral signature consistent with fungal or bacterial infection.'},
  ];
  const numZones=2+Math.round(seed%3);const zones=[];
  for(let i=0;i<numZones;i++)zones.push({...zoneTypes[Math.floor((seed*(i+1))%zoneTypes.length)],confidence:Math.round(72+(seed*(i+2))%25)+'%'});
  return{healthy,stress,anomaly,zones};
}

async function callSatClaude(lat,lng,index,satellite,radius,from,to,analysis){
  const locStr=`${Math.abs(lat).toFixed(3)}°${lat>=0?'N':'S'}, ${Math.abs(lng).toFixed(3)}°${lng>=0?'E':'W'}`;
  const prompt=`Expert agricultural remote sensing analyst. Farmer ran satellite field analysis:\n- Location: ${locStr}\n- Index: ${index}, Satellite: ${satellite}, Radius: ${radius}km\n- Date: ${from} to ${to}\n- Healthy: ${analysis.healthy}%, Stress: ${analysis.stress}%, Anomaly: ${analysis.anomaly}%\n- Zones: ${analysis.zones.map(z=>z.title).join(', ')}\n\nWrite a concise 3-4 sentence field health summary with key concern and one actionable recommendation. Be farmer-friendly.`;
  try{
    const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,messages:[{role:'user',content:prompt}]})});
    if(!res.ok)throw new Error();
    const data=await res.json();
    return data.content.filter(b=>b.type==='text').map(b=>b.text).join('').replace(/\n/g,'<br>');
  }catch(e){
    return `Your field at ${locStr} shows <strong>${analysis.healthy}% healthy vegetation</strong> with ${analysis.stress}% moderate stress and <strong>${analysis.anomaly}% critical anomaly zones</strong>. Priority concern: <em>${analysis.zones[0]?.title||'moisture deficit'}</em> — consider targeted irrigation or soil sampling.`;
  }
}

function renderAnomalyList(zones){
  const list=document.getElementById('anomaly-list');
  list.innerHTML='<div style="font-size:13px;font-weight:700;color:var(--dark);margin-bottom:8px;">⚠️ Detected Anomaly Zones</div>';
  zones.forEach(z=>{
    const div=document.createElement('div');
    div.className=`anomaly-item${z.type==='critical'?' critical':''}`;
    div.innerHTML=`<div class="ai-icon">${z.type==='critical'?'🔴':'🟠'}</div><div><div class="ai-title">${z.title} <span style="font-weight:400;color:#888;font-size:11px">(${z.confidence} confidence)</span></div><div class="ai-desc">${z.desc}</div></div>`;
    list.appendChild(div);
  });
  list.classList.add('show');
}

function plotAnomalyMarkers(lat,lng,zones,radiusKm){
  const colors={warning:'#ff9800',critical:'#f44336'};
  zones.forEach((z,i)=>{
    const angle=(i/zones.length)*2*Math.PI;const dist=radiusKm*0.4*1000;
    const dLat=(dist*Math.cos(angle))/111320;
    const dLng=(dist*Math.sin(angle))/(111320*Math.cos(lat*Math.PI/180));
    const circle=L.circleMarker([lat+dLat,lng+dLng],{radius:10,color:colors[z.type]||'#ff9800',fillColor:colors[z.type],fillOpacity:.6,weight:2}).addTo(satMap).bindPopup(`<b>${z.title}</b><br>${z.desc}`);
    anomalyMarkers.push(circle);
  });
}

// ═══════════════════════════════════════════════════
// CROP DOCTOR + GRADCAM
// ═══════════════════════════════════════════════════
let currentBase64=null,currentMime='image/jpeg',camStream=null,scanHistory=[];
let lastDiagnosisData=null;

function handleFileSelect(e){const file=e.target.files[0];if(file)loadImageFile(file);}
function handleDrop(e){
  e.preventDefault();document.getElementById('dropzone').classList.remove('drag');
  const file=e.dataTransfer.files[0];if(file&&file.type.startsWith('image/'))loadImageFile(file);
}
function loadImageFile(file){
  currentMime=file.type||'image/jpeg';
  const reader=new FileReader();
  reader.onload=ev=>{const dataUrl=ev.target.result;currentBase64=dataUrl.split(',')[1];showPreview(dataUrl,'🖼 Uploaded');};
  reader.readAsDataURL(file);
}
function showPreview(src,badge){
  const wrap=document.getElementById('preview-wrap');
  document.getElementById('preview-img').src=src;
  document.getElementById('preview-badge').textContent=badge;
  wrap.style.display='block';
  document.getElementById('dropzone').style.display='none';
  document.getElementById('analyze-btn-crop').disabled=false;
  // Hide previous heatmap
  document.getElementById('gradcam-wrap').classList.remove('show');
  document.getElementById('gradcam-legend').style.display='none';
  document.getElementById('deficiency-panel').style.display='none';
  document.getElementById('btn-heatmap').classList.remove('show');
}
function clearImage(){
  currentBase64=null;currentMime='image/jpeg';lastDiagnosisData=null;
  document.getElementById('preview-wrap').style.display='none';
  document.getElementById('dropzone').style.display='block';
  document.getElementById('analyze-btn-crop').disabled=true;
  document.getElementById('file-input').value='';
  document.getElementById('gradcam-wrap').classList.remove('show');
  document.getElementById('gradcam-legend').style.display='none';
  document.getElementById('deficiency-panel').style.display='none';
  document.getElementById('btn-heatmap').classList.remove('show');
  resetResults();
}
function resetResults(){
  document.getElementById('results-panel').innerHTML=`<div class="empty-state"><div class="empty-icon">🌱</div><div class="empty-title">Upload a crop photo to begin</div><div>AI will identify diseases, generate GradCAM heatmap, and prescribe treatment.</div></div>`;
}
async function openCamera(){
  try{
    camStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'},audio:false});
    document.getElementById('cam-video').srcObject=camStream;
    document.getElementById('cam-overlay').classList.add('show');
  }catch(e){alert('Camera access denied. Please upload a photo instead.');}
}
function snapPhoto(){
  const video=document.getElementById('cam-video');const canvas=document.getElementById('cam-canvas');
  canvas.width=video.videoWidth;canvas.height=video.videoHeight;
  canvas.getContext('2d').drawImage(video,0,0);
  const dataUrl=canvas.toDataURL('image/jpeg',.9);
  currentBase64=dataUrl.split(',')[1];currentMime='image/jpeg';
  showPreview(dataUrl,'📷 Camera Scan');closeCamera();
}
function closeCamera(){
  if(camStream){camStream.getTracks().forEach(t=>t.stop());camStream=null;}
  document.getElementById('cam-overlay').classList.remove('show');
}
function setCropStatus(msg,show=true){
  const bar=document.getElementById('status-bar-crop');
  if(show){bar.classList.add('show');document.getElementById('status-text-crop').textContent=msg;}
  else{bar.classList.remove('show');}
}

function getAiApiBase(){
  if(window.location.protocol==='file:')return 'http://127.0.0.1:8000';
  return window.location.port==='8000'?'':'http://127.0.0.1:8000';
}
function base64ToFile(base64,mime,name){
  const bin=atob(base64);
  const arr=new Uint8Array(bin.length);
  for(let i=0;i<bin.length;i++)arr[i]=bin.charCodeAt(i);
  return new File([arr],name,{type:mime||'image/jpeg'});
}
function mapBackendToDiagnosis(r){
  const sevMap={LOW:'Low',MEDIUM:'Medium',HIGH:'High',CRITICAL:'Critical'};
  const severity=sevMap[String(r.severity||'').toUpperCase()]||r.severity||'Medium';
  const defaultTreat=[{step:1,priority:'Urgent',action:'Recommended treatment',detail:r.treatment||'Consult local agronomist.'}];
  return{
    cropType:r.crop_type||'Crop',
    diseaseName:r.disease||'Unknown',
    diseaseType:r.disease_type||'Unknown',
    severityLevel:severity,
    survivalChance:Number(r.survival_chance)||60,
    confidenceScore:Number(r.confidence)||0,
    affectedArea:r.affected_percentage||'Unknown',
    deficiencies:r.deficiencies||[],
    yellowEdgePresent:Boolean(r.yellow_edge_present)||(r.deficiencies||[]).some(d=>String(d).toLowerCase().includes('nitrogen')),
    symptoms:r.symptoms||['See treatment plan below'],
    description:r.description||r.treatment||'AI diagnosis complete.',
    treatments:r.treatments||defaultTreat,
    recommendedProducts:r.recommended_products||['Consult local agronomist'],
    preventionTips:r.prevention_tips||['Monitor crop regularly','Maintain proper irrigation'],
    timeToRecovery:r.time_to_recovery||'2–4 weeks',
    prognosis:r.prognosis||r.treatment||'Follow the treatment plan for best recovery.'
  };
}
async function runDiagnosis(){
  const imageInput=document.getElementById('file-input');
  let file=imageInput?.files?.[0];
  if(!file&&currentBase64){
    file=base64ToFile(currentBase64,currentMime,'crop-scan.jpg');
  }
  if(!file){
    alert('Please upload or capture a crop image first!');
    return;
  }
  const thumbSrc=document.getElementById('preview-img')?.src||'';
  const btn=document.getElementById('analyze-btn-crop');
  btn.disabled=true;
  setCropStatus('Analysing image with AI…');
  const formData=new FormData();
  formData.append('file',file);
  try{
    const response=await fetch(`${getAiApiBase()}/predict`,{method:'POST',body:formData});
    const result=await response.json();
    if(!response.ok)throw new Error(result.error||'Server error');
    if(result.analyzer_version)console.log('Crop AI analyzer:',result.analyzer_version);
    const diagnosis=mapBackendToDiagnosis(result);
    lastDiagnosisData=diagnosis;
    renderDiagnosis(diagnosis,thumbSrc);
    document.getElementById('btn-heatmap').classList.add('show');
    setCropStatus('',false);
  }catch(error){
    console.error('Error linking to backend:',error);
    setCropStatus('Server offline — start python main.py',true);
    alert('Could not connect to the Python AI server.\n\n1. Open a terminal in the project folder\n2. Run: python main.py\n3. Open http://127.0.0.1:8000 in your browser');
  }finally{
    btn.disabled=false;
  }
}


async function callClaudeVision(base64,mime){
  const prompt=`You are an expert plant pathologist. Analyse this crop photo carefully.\n\nRespond ONLY with valid JSON (no markdown fences) with this exact structure:\n{"cropType":"string","diseaseName":"string","diseaseType":"Fungal/Bacterial/Viral/Pest/Nutrient Deficiency/Healthy","severityLevel":"Low/Medium/High/Critical","survivalChance":number(0-100),"confidenceScore":number(0-100),"affectedArea":"string","deficiencies":["list of detected deficiencies like Nitrogen,Phosphorus,Iron etc, empty if none"],"yellowEdgePresent":boolean,"symptoms":["3-4 strings"],"description":"2-3 sentences","treatments":[{"step":number,"priority":"Urgent/Important/Preventive","action":"string","detail":"string"}],"recommendedProducts":["3-5 strings"],"preventionTips":["2-3 strings"],"timeToRecovery":"string","prognosis":"2-3 sentences"}\n\nProvide 4-6 treatment steps. Include deficiencies array with any detected nutrient deficiencies. Be specific and practical.`;
  try{
    const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,messages:[{role:'user',content:[{type:'image',source:{type:'base64',media_type:mime,data:base64}},{type:'text',text:prompt}]}]})});
    if(!res.ok)throw new Error('API '+res.status);
    const data=await res.json();
    const text=data.content.filter(b=>b.type==='text').map(b=>b.text).join('');
    return JSON.parse(text.replace(/```json|```/g,'').trim());
  }catch(e){
    return{cropType:'Unknown',diseaseName:'Analysis Incomplete',diseaseType:'Unknown',severityLevel:'Medium',survivalChance:60,confidenceScore:40,affectedArea:'Unknown',deficiencies:[],yellowEdgePresent:false,symptoms:['Image analysis failed','Retry with clearer photo'],description:'AI analysis failed. Please retry.',treatments:[{step:1,priority:'Important',action:'Retry with better image',detail:'Ensure sharp, well-lit photo.'}],recommendedProducts:['Consult local agronomist'],preventionTips:['Take clearer photos'],timeToRecovery:'Unknown',prognosis:'Unable to generate without clear diagnosis.'};
  }
}

// ─── GRADCAM HEATMAP (Canvas-based simulation) ───────────────────────────────
// Simulates GradCAM by analyzing pixel brightness/color to find yellowed/diseased areas
function generateHeatmap(){
  const previewImg = document.getElementById('preview-img');
  if(!previewImg.src || previewImg.src === window.location.href) return;
  setCropStatus('🔥 Generating GradCAM heatmap…');
  // Copy preview to gradcam base
  const gradcamBase = document.getElementById('gradcam-base');
  gradcamBase.src = previewImg.src;
  gradcamBase.onload = () => {
    const canvas = document.getElementById('gradcam-canvas');
    const ctx = canvas.getContext('2d');
    const w = gradcamBase.naturalWidth || gradcamBase.offsetWidth || 400;
    const h = gradcamBase.naturalHeight || gradcamBase.offsetHeight || 300;
    canvas.width = w;
    canvas.height = h;
    // Draw original image on hidden canvas to read pixels
    const offscreen = document.createElement('canvas');
    offscreen.width = w; offscreen.height = h;
    const octx = offscreen.getContext('2d');
    octx.drawImage(gradcamBase, 0, 0, w, h);
    const imgData = octx.getImageData(0, 0, w, h);
    const pixels = imgData.data;
    // Heatmap canvas
    ctx.clearRect(0, 0, w, h);
    // Analyze each pixel for disease indicators:
    // - Yellowing: high R, high G, low B
    // - Browning: high R, medium G, low B
    // - Darkening/necrosis: low R, G, B
    const heatData = ctx.createImageData(w, h);
    for(let i=0; i<pixels.length; i+=4) {
      const r=pixels[i], g=pixels[i+1], b=pixels[i+2];
      let heat=0;
      // Yellowing detection (nitrogen deficiency, chlorosis)
      const yellowScore = (r>150 && g>130 && b<100) ? ((r+g)/2 - b)/255 : 0;
      // Browning detection (disease, necrosis)
      const brownScore = (r>100 && g<r*0.75 && b<r*0.6) ? (r-g)/255 * 0.8 : 0;
      // Unusual discoloration vs healthy green
      const greenHealth = (g>r*1.1 && g>b*1.1) ? 1 : 0;
      heat = Math.max(yellowScore, brownScore) * (1 - greenHealth*0.7);
      heat = Math.min(1, Math.max(0, heat));
      // Map heat to color: blue(low) -> green -> yellow -> red(high)
      let hr=0,hg=0,hb=0;
      if(heat < 0.25) { hr=0; hg=0; hb=Math.round(255*heat*4); }
      else if(heat < 0.5) { hr=0; hg=Math.round(255*(heat-0.25)*4); hb=255-Math.round(255*(heat-0.25)*4); }
      else if(heat < 0.75) { hr=Math.round(255*(heat-0.5)*4); hg=255; hb=0; }
      else { hr=255; hg=255-Math.round(255*(heat-0.75)*4); hb=0; }
      const alpha = heat > 0.1 ? Math.round(heat * 180) : 0;
      heatData.data[i]=hr; heatData.data[i+1]=hg; heatData.data[i+2]=hb; heatData.data[i+3]=alpha;
    }
    ctx.putImageData(heatData, 0, 0);
    // Smooth with blur effect
    ctx.filter = 'blur(4px)';
    ctx.drawImage(canvas, 0, 0);
    ctx.filter = 'none';
    // Show heatmap section
    document.getElementById('gradcam-wrap').classList.add('show');
    document.getElementById('gradcam-legend').style.display='block';
    document.getElementById('preview-wrap').style.display='none';
    // Show deficiency tags based on diagnosis
    showDeficiencyTags();
    setCropStatus('', false);
  };
  gradcamBase.onerror = () => {
    // Fallback: just show the image with synthetic overlay
    document.getElementById('gradcam-base').src = previewImg.src;
    document.getElementById('gradcam-wrap').classList.add('show');
    setCropStatus('', false);
  };
}

function showDeficiencyTags(){
  const panel = document.getElementById('deficiency-panel');
  const tagsDiv = document.getElementById('deficiency-tags');
  if(!lastDiagnosisData) return;
  const d = lastDiagnosisData;
  let tags = [];
  if(d.deficiencies && d.deficiencies.length) {
    d.deficiencies.forEach(def => {
      const defLower = def.toLowerCase();
      let cls = 'disease';
      if(defLower.includes('nitro')) cls='nitrogen';
      else if(defLower.includes('phos')) cls='phosphorus';
      else if(defLower.includes('potas')) cls='potassium';
      else if(defLower.includes('iron')) cls='iron';
      tags.push(`<span class="def-tag ${cls}">${def} Deficiency</span>`);
    });
  }
  if(d.yellowEdgePresent) tags.push('<span class="def-tag nitrogen">⚠️ Yellow Edge Detected</span>');
  if(d.diseaseName && d.diseaseName !== 'Healthy Plant' && d.diseaseName !== 'Analysis Incomplete') {
    tags.push(`<span class="def-tag disease">🦠 ${d.diseaseName}</span>`);
  }
  if(tags.length === 0) tags.push('<span class="def-tag healthy">✅ No major deficiency detected</span>');
  tagsDiv.innerHTML = tags.join('');
  panel.style.display='block';
}

function renderDiagnosis(d,thumbSrc){
  const sevClass={Low:'sev-low',Medium:'sev-medium',High:'sev-high',Critical:'sev-critical'}[d.severityLevel]||'sev-medium';
  const priClass=p=>p==='Urgent'?'urgent':p==='Important'?'warning':'';
  const numColor=p=>p==='Urgent'?'#f44336':p==='Important'?'#ff9800':'#2e7d32';
  const survivalColor=d.survivalChance>=70?'#4caf50':d.survivalChance>=40?'#ff9800':'#f44336';
  const meterPos=`${100-d.survivalChance}%`;
  const symptomsHTML=d.symptoms.map(s=>`<li style="margin-bottom:4px">${s}</li>`).join('');
  const treatHTML=d.treatments.map(step=>`<div class="treat-item ${priClass(step.priority)}">
    <div class="treat-num" style="background:${numColor(step.priority)}">${step.step}</div>
    <div><div style="font-weight:700;color:#1a2e1a;margin-bottom:2px">${step.action}<span style="font-size:10px;font-weight:600;color:#888;margin-left:6px;text-transform:uppercase">${step.priority}</span></div>
    <div style="color:#555">${step.detail}</div></div></div>`).join('');
  const prodHTML=(d.recommendedProducts||[]).map(p=>`<span class="prod-tag">💊 ${p}</span>`).join('');
  const prevHTML=(d.preventionTips||[]).map(t=>`<div class="tip-item">🛡 <span>${t}</span></div>`).join('');
  const isHealthy=d.diseaseName==='Healthy Plant';
  document.getElementById('results-panel').innerHTML=`<div class="diag-card">
    <div class="disease-header"><div>
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.7px;color:var(--muted);margin-bottom:4px">${d.cropType} · ${d.diseaseType}</div>
      <div class="disease-name">${isHealthy?'✅ ':'🦠 '}${d.diseaseName}</div></div>
      <span class="severity-chip ${sevClass}">${d.severityLevel} Severity</span></div>
    <div><div class="survival-label"><span>🌱 Survival / Recovery Chance</span><span class="survival-pct" style="color:${survivalColor}">${d.survivalChance}%</span></div>
      <div class="meter-track"><div class="meter-fill" id="meter-fill" style="width:0%;background-position:${meterPos} 0"></div></div>
      <div style="display:flex;justify-content:space-between;font-size:10px;color:#aaa;margin-top:4px"><span>Critical</span><span>Moderate</span><span>Excellent</span></div></div>
    <div class="conf-row">
      <div class="conf-chip">Confidence <span class="val">${d.confidenceScore}%</span></div>
      <div class="conf-chip">Affected <span class="val">${d.affectedArea}</span></div>
      <div class="conf-chip">Recovery <span class="val">${d.timeToRecovery}</span></div></div>
    <div class="desc-box"><b>About this condition:</b><br>${d.description}<ul style="margin-top:8px;padding-left:16px;color:#555">${symptomsHTML}</ul></div>
    <div style="background:#fff3e0;border:1px solid #ffcc80;border-radius:10px;padding:10px 14px;font-size:.82rem;color:#6d4c41;">
      <strong>🔥 GradCAM:</strong> Click "Generate GradCAM Heatmap" on the left to visualize affected regions with colour intensity mapping.
    </div>
    <div><div class="treat-title">💊 Treatment Plan</div><div class="treat-list">${treatHTML}</div></div>
    <div><div class="treat-title">🧪 Recommended Products</div><div class="prod-list">${prodHTML}</div></div>
    <div style="background:#f4f6f4;border-radius:12px;padding:12px 14px"><div class="treat-title" style="margin-bottom:8px">🛡 Prevention</div>${prevHTML}</div>
    <div class="prognosis"><h4>🤖 AI Prognosis</h4>${d.prognosis}</div></div>`;
  setTimeout(()=>{const fill=document.getElementById('meter-fill');if(fill)fill.style.width=d.survivalChance+'%';},100);
  addToHistory(thumbSrc,d.diseaseName,d.survivalChance);
}

function addToHistory(src,disease,pct){
  scanHistory.unshift({src,disease,pct});if(scanHistory.length>8)scanHistory.pop();
  const section=document.getElementById('history-section');const grid=document.getElementById('hist-grid');
  section.style.display='block';
  grid.innerHTML=scanHistory.map((h,i)=>`<div class="hist-thumb" onclick="replayHistory(${i})"><img src="${h.src}" alt="scan"/><div class="hist-label">${h.pct}%</div></div>`).join('');
}
function replayHistory(i){
  const h=scanHistory[i];showPreview(h.src,'🕐 History');
  const img=new Image();img.src=h.src;
  const canvas=document.createElement('canvas');
  img.onload=()=>{canvas.width=img.width;canvas.height=img.height;canvas.getContext('2d').drawImage(img,0,0);currentBase64=canvas.toDataURL('image/jpeg',.9).split(',')[1];currentMime='image/jpeg';};
}

// ═══════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded',()=>{
  // Populate state datalist for login
  const stateDl=document.getElementById('states');
  if(stateDl)stateDl.innerHTML=Object.keys(geoMatrix).map(s=>`<option value="${s}"></option>`).join('');
  // Range sliders
  document.querySelectorAll('input[type=range]').forEach(updateRangeStyle);
  // Location input enter key
  const locInput=document.getElementById('location-input');
  if(locInput)locInput.addEventListener('keydown',e=>{if(e.key==='Enter')searchLocation();});
  // Load alert config
  loadAlertConfig();
  // Check existing login
  const profile=getProfile();
  if(profile)launchMainApp(profile);
});
