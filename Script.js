// ===== Tasbeeh Counter =====
let tasbeehCount = 0;

function showTasbeeh() {
  document.getElementById("content").innerHTML = `
    <h3>📿 Tasbeeh Counter</h3>
    <div style="text-align:center">
      <div id="count" style="font-size:40px;margin:15px 0;">0</div>
      <button onclick="increaseTasbeeh()">+</button>
      <button onclick="resetTasbeeh()" style="margin-left:10px;">Reset</button>
    </div>
  `;
}

function increaseTasbeeh() {
  tasbeehCount++;
  document.getElementById("count").innerText = tasbeehCount;
}

function resetTasbeeh() {
  tasbeehCount = 0;
  document.getElementById("count").innerText = tasbeehCount;
}

// ===== Quran Section =====
async function showQuran() {
  const res = await fetch('quran.json');
  const data = await res.json();
  
  let html = '<h3>📖 Quran Surahs</h3>';
  data.surahs.forEach(surah => {
    html += `<h4>${surah.name}</h4>`;
    html += '<ul>';
    surah.ayahs.forEach(ayah => {
      html += `<li>${ayah}</li>`;
    });
    html += '</ul>';
  });

  document.getElementById("content").innerHTML = html;
}

// ===== Daily Dua =====
function showDua() {
  document.getElementById("content").innerHTML = `
    <h3>🤲 Daily Dua</h3>
    <ul>
      <li>Rabbir zidni ilma 🤍</li>
      <li>Subhanallahi wa bihamdihi</li>
      <li>Allahumma salli ala Muhammad</li>
    </ul>
  `;
}

// ===== Random Quotes =====
const quotes = [
  "Indeed, Allah is with the patient.",
  "Verily, in the remembrance of Allah do hearts find rest.",
  "Allah does not burden a soul beyond that it can bear.",
  "So remember Me; I will remember you."
];

function showQuote() {
  const random = Math.floor(Math.random() * quotes.length);
  document.getElementById("content").innerHTML = `
    <h3>🌙 Islamic Quote</h3>
    <p>${quotes[random]}</p>
  `;
}

// ===== Prayer Times (Dynamic) =====
async function showPrayerTimes() {
  const content = document.getElementById("content");
  content.innerHTML = "<p>Loading prayer times...</p>";

  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=2`);
    const data = await res.json();
    const timings = data.data.timings;

    let html = '<h3>🕰️ Prayer Times</h3><ul>';
    for (let prayer in timings) {
      html += `<li>${prayer}: ${timings[prayer]}</li>`;
    }
    html += '</ul>';
    content.innerHTML = html;

  } catch (err) {
    content.innerHTML = "<p>Prayer times cannot be loaded. Please allow location access.</p>";
  }
      }
