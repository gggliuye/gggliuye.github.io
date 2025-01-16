

// Convert resolution in meters to degrees
function metersToDegrees(meters) {
    return meters / 111320; // Approximation for 1 degree = ~111.32 km
}

// Generate trajectory with 90-degree turns (scanning the area)
function createTrajectoryFromPolygon(polygonCoords, resolutionMeters) {
    const resolutionDegrees = metersToDegrees(resolutionMeters);

    let points_original = [];
    for (let i = 0; i < polygonCoords.length; i++) {
      points_original.push([polygonCoords[i].lat, polygonCoords[i].lng])
    }
    const points_convex_hull = convexhull.makeHull(points_original);

    const bounds = L.polygon(polygonCoords).getBounds();
    const latStart = bounds.getNorthWest().lat;
    const latEnd = bounds.getSouthEast().lat - resolutionDegrees;
    const lngStart = bounds.getNorthWest().lng;
    const lngEnd = bounds.getSouthEast().lng + resolutionDegrees;

    const trajectory = [];
    let isLeftToRight = true; // Track the direction for horizontal movement

    // Create trajectory by scanning the area row by row
    for (let currentLat = latStart; currentLat > latEnd; currentLat -= resolutionDegrees) {
        if (isLeftToRight) {
          for (let currentLng = lngStart; currentLng < lngEnd; currentLng += resolutionDegrees) {
            let point = [currentLat, currentLng];
            if (isPointInsidePolygen(point, points_convex_hull)) {
              trajectory.push(point);
            }
          }
        } else {
          for (let currentLng = lngEnd; currentLng > lngStart; currentLng -= resolutionDegrees) {
            let point = [currentLat, currentLng];
            if (isPointInsidePolygen(point, points_convex_hull)) {
              trajectory.push(point);
            }
          }
        }
        isLeftToRight = !isLeftToRight; // Switch direction for the next row
    }
    return trajectory;
}

function createTrajectoryFromPolyline(polylineCoords, resolutionMeters) {
    const resolutionDegrees = metersToDegrees(resolutionMeters); // Convert resolution to degrees
    let trajectory = [];

    for (let i = 0; i < polylineCoords.length - 1; i++) {
        const start = polylineCoords[i];
        const end = polylineCoords[i + 1];

        // Add the starting point
        if (trajectory.length === 0) {
            trajectory.push([start.lat, start.lng]);
        }

        const distanceLat = end.lat - start.lat;
        const distanceLng = end.lng - start.lng;

        const distance = Math.sqrt(distanceLat ** 2 + distanceLng ** 2); // Euclidean distance in degrees
        const numPoints = Math.ceil(distance / resolutionDegrees); // Number of interpolated points

        for (let j = 1; j <= numPoints; j++) {
            const fraction = j / numPoints;
            const interpolatedLat = start.lat + fraction * distanceLat;
            const interpolatedLng = start.lng + fraction * distanceLng;
            trajectory.push([interpolatedLat, interpolatedLng]);
        }
    }

    return trajectory;
}
