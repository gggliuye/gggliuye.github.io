// trip-map.js

let map, markers = [], labels = [], polylines = [];
let dataPoints = [];

document.addEventListener("DOMContentLoaded", function () {
  // Initialize the map
  map = L.map('map').setView([0, 0], 2);

  // Use OpenStreetMap tiles (change if you want satellite)
  const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  });
  osmLayer.addTo(map);

  // Satellite layer (from Esri)
  const satelliteLayer = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
      maxZoom: 18,
      attribution: '© Esri & the GIS User Community',
    }
  );
  satelliteLayer.addTo(map);

  // Layer control to toggle between OSM and Satellite
  const baseMaps = {
    'Satellite': satelliteLayer,
    'OpenStreetMap': osmLayer,
  };
  L.control.layers(baseMaps).addTo(map);


  // Dropdown selector element
  const selector = document.getElementById("trip-selector");
  selector.addEventListener("change", () => {
    loadTrip(`/assets/trip/${selector.value}`);
  });

  // Load initial trip
  loadTrip(`/assets/trip/${selector.value}`);
});

function clearMap() {
  markers.forEach(m => map.removeLayer(m));
  markers = [];
  labels.forEach(m => map.removeLayer(m));
  labels = [];
  dataPoints = [];
  polylines.forEach(m => map.removeLayer(m));

  // Clear the HTML descriptions below the map
  const list = document.getElementById('trip-descriptions');
  if (list) {
    list.innerHTML = '';
  }
}

function getColor(day) {
  const label = document.querySelector('.trip-label.day-' + day);
  if (label) {
    const style = window.getComputedStyle(label);
    return style.borderColor;
  }
  return 'red';
}

function secondsToHHMM(totalSec) {
  const hours   = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  return `${hours}h${String(minutes).padStart(2, '0')}m`;
}

function loadTrip(jsonPath) {
  fetch(jsonPath)
    .then(response => response.json())
    .then(points => {
      clearMap();

      let all_latlngs = [];
      let current_day = 0;
      let last_title = "";

      points = points.filter(p => p.lat && p.lng);

      points.forEach((p, index) => {
        const lat = parseFloat(p.lat);
        const lng = parseFloat(p.lng);
        const title = p.title || '';
        const desc = p.description || '';
        const img = p.image || '';
        const time = p.time || '';
        const route = p.route || '';
        const distance = p.distance || 0;
        const duration = p.duration || '';
        const day = parseInt(p.day || '1'); // day as integer

        const pointData = { lat, lng, title, time, description: desc, image: img, day, index };
        dataPoints.push(pointData);

        // Add permanent label with day-based color class
        const label = L.tooltip({
          permanent: true,
          direction: 'right',
          offset: [10, -20],
          className: `trip-label leaflet-interactive day-${day}`
        })
          .setContent(title)
          .setLatLng([lat, lng])
          .addTo(map);

        // Clicking label opens popup
        label.getElement().addEventListener('click', () => {
          // this callback cannot open popup
        });

        const marker = L.marker([lat, lng]).addTo(map).bindPopup(createPopup(index, points.length));
        markers.push(marker);
        labels.push(label);

        // Build HTML for the journal entry
        const entry = document.createElement('div');
        entry.className = `trip-entry day-${day}`;
        entry.innerHTML = `
          ${day > current_day ? `<p></p><h3>Day ${day}</h3>` : ''}
          <p></p>
          <strong>${title}</strong> : ${desc}
          ${duration ? `<li><u>${last_title}-${title}</u> : 行驶里程 ${Math.round(distance/1000)}km 大概耗时 ${secondsToHHMM(duration)}</li>` : ''}
          ${time ? `<li>预估游览时间： ${time}</li>` : ''}
        `;
        document.getElementById('trip-descriptions').appendChild(entry);
        last_title = title;

        if (route) {
          const color = getColor(day);
          // add route
          const pairs = route.split(';');
          // 2. 转成 Leaflet 需要的 [lat,lng] 数组
          const latlngs = pairs.map(p => {
            const [lng, lat] = p.split(',').map(Number);
            return [lat, lng];          // Leaflet 用 [lat,lng]
          });
          const polyline = L.polyline(latlngs, { color }).addTo(map);
          polylines.push(polyline);
        }


        all_latlngs.push([lat, lng]);
        current_day = day;
      });

      map.fitBounds(all_latlngs, { padding: [30, 30] });

      map.closePopup();
    });
}

function createPopup(index, points_length) {
  const point = dataPoints[index];
  const popupContent = `
    <div style="max-width: 280px;">
      <h4>${point.title} <small style="font-weight:normal;">(Day ${point.day})</small></h4>
      ${point.image ? `<img src="${point.image}" style="width: 100%; border-radius: 6px; margin-bottom: 8px;" />` : ''}
      <p>${point.time}</p>
      <p>${point.description}</p>
      <div style="text-align: center; margin-top: 8px;">
        <button onclick="jumpTo(${point.index - 1})" ${point.index === 0 ? 'disabled' : ''}>⬅ 上一站</button>
        <button onclick="jumpTo(${point.index + 1})" ${point.index === points_length - 1 ? 'disabled' : ''}>下一站 ➡</button>
      </div>
    </div>
  `;

  const popup = L.popup({ offset: [0, 0] })
    .setLatLng([point.lat, point.lng])
    .setContent(popupContent)
    .openOn(map);

  return popup;
}

function jumpTo(index) {
  if (index >= 0 && index < dataPoints.length) {
    const point = dataPoints[index];
    map.setView([point.lat, point.lng], map.getZoom());
    markers[index].openPopup();
  }
}
