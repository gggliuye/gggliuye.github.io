// trip-map.js

let map, markers = [], labels = [], polylines = [];
let dataPoints = [];

document.addEventListener("DOMContentLoaded", function () {
  // Initialize the map
  map = L.map('map').setView([0, 0], 2);

  // Use OpenStreetMap tiles (change if you want satellite)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);

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

function loadTrip(csvPath) {
  fetch(csvPath)
    .then(response => response.text())
    .then(csvText => {
      const result = Papa.parse(csvText, { header: true });
      const points = result.data.filter(p => p.lat && p.lng);

      clearMap();

      let latlngs = [];
      let all_latlngs = [];
      let current_day = 0;

      points.forEach((p, index) => {
        const lat = parseFloat(p.lat);
        const lng = parseFloat(p.lng);
        const title = p.title || '';
        const desc = p.description || '';
        const img = p.image || '';
        const time = p.time || '';
        const day = p.day || '1'; // default day 1

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
          ${day > current_day ? `<h3>Day ${day}</h3>` : ''}
          <p>${title} ${time ? `(${time})` : ''} : ${desc}</p>
        `;
        document.getElementById('trip-descriptions').appendChild(entry);

        if (day > current_day) {
          const color = getColor(day);
          if (latlngs.length > 1) {
            let polyline = L.polyline(latlngs, { color: color }).addTo(map);
            polylines.push(polyline);

            last = latlngs[latlngs.length - 1];
            latlngs = []
            latlngs.push(last);
          }
        }
        latlngs.push([lat, lng]);
        all_latlngs.push([lat, lng]);
        current_day = day;
      });

      if (latlngs.length > 0) {
        polyline = L.polyline(latlngs, { color: getColor(current_day) }).addTo(map);
        polylines.push(polyline);
        map.fitBounds(all_latlngs, { padding: [30, 30] });
      }

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
