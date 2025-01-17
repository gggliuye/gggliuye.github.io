

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
  const latEnd = bounds.getSouthEast().lat;
  const lngStart = bounds.getNorthWest().lng;
  const lngEnd = bounds.getSouthEast().lng;

  const trajectory = [];
  let isLeftToRight = true; // Track the direction for horizontal movement

  // Create trajectory by scanning the area row by row
  for (let currentLat = latStart; currentLat > latEnd; currentLat -= resolutionDegrees) {
    if (isLeftToRight) {
      trajectory.push([currentLat, lngStart]);
      trajectory.push([currentLat, lngEnd]);
    } else {
      trajectory.push([currentLat, lngEnd]);
      trajectory.push([currentLat, lngStart]);
    }
    isLeftToRight = !isLeftToRight; // Switch direction for the next row
  }

  {
    let distanceLat = latStart- latEnd;
    let cnt = Math.floor(distanceLat / resolutionDegrees);
    let distance_left = distanceLat - cnt * resolutionDegrees;
    if (distance_left / resolutionDegrees > 0.7) {
      // add one more line
      let currentLat = latEnd;
      if (isLeftToRight) {
        trajectory.push([currentLat, lngStart]);
        trajectory.push([currentLat, lngEnd]);
      } else {
        trajectory.push([currentLat, lngEnd]);
        trajectory.push([currentLat, lngStart]);
      }
    }
  }

  if (trajectory.length < 2) return trajectory;

  // densify the trajectory
  const resolutionDegreesInternal = 0.5 * metersToDegrees(resolutionMeters);

  let dense_trajectory = [];
  for (let i = 0; i < trajectory.length - 1; i++) {
    const start = trajectory[i];
    const end = trajectory[i + 1];

    // Add the starting point
    if (dense_trajectory.length === 0) {
      dense_trajectory.push(start);
    }

    const distanceLat = end[0] - start[0];
    const distanceLng = end[1] - start[1];

    const distance = Math.sqrt(distanceLat ** 2 + distanceLng ** 2); // Euclidean distance in degrees
    const numPoints = Math.ceil(distance / resolutionDegreesInternal); // Number of interpolated points

    for (let j = 1; j <= numPoints; j++) {
        const fraction = j / numPoints;
        const interpolatedLat = start[0] + fraction * distanceLat;
        const interpolatedLng = start[1] + fraction * distanceLng;
        dense_trajectory.push([interpolatedLat, interpolatedLng]);
    }
  }

  return dense_trajectory;
}

function createTrajectoryFromPolyline(polylineCoords, resolutionMeters) {
  const resolutionDegrees = metersToDegrees(resolutionMeters); // Convert resolution to degrees
  let trajectory = [];
  if (resolutionDegrees < 0) {
    for (let i = 0; i < polylineCoords.length; i++) {
      let point = polylineCoords[i];
      trajectory.push([point.lat, point.lng]);
    }
    return trajectory;
  }

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

// Compute the total length of a trajectory in meters
function computeTrajectoryLength(trajectory) {
    // Helper function to calculate the distance between two lat/lng points in meters
    function haversineDistance(lat1, lng1, lat2, lng2) {
        const R = 6371000.0; // Earth radius in meters
        const toRad = (deg) => (deg * Math.PI) / 180; // Convert degrees to radians
        const dLat = toRad(lat2 - lat1);
        const dLng = toRad(lng2 - lng1);

        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in meters
    }

    let totalLength = 0.0;

    for (let i = 0; i < trajectory.length - 1; i++) {
        const [lat1, lng1] = trajectory[i];
        const [lat2, lng2] = trajectory[i + 1];
        totalLength += haversineDistance(lat1, lng1, lat2, lng2);
    }

    return totalLength;
}

function formatDuration(durationSeconds) {
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);
    const seconds = Math.floor(durationSeconds % 60);

    return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
