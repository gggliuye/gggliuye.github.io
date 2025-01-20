

// Convert resolution in meters to degrees
function metersToDegrees(meters) {
    return meters / 111320; // Approximation for 1 degree = ~111.32 km
}

function degreesToMeters(degree) {
    return degree * 111320; // Approximation for 1 degree = ~111.32 km
}


function computeMajorDirection(points) {
  if (points.length < 2) {
    throw new Error('At least two points are required to compute the major direction.');
  }

  // Step 1: Compute the mean of the points
  let meanX = 0, meanY = 0;
  points.forEach(p => {
    meanX += p[0];
    meanY += p[1];
  });
  meanX /= points.length;
  meanY /= points.length;

  // Step 2: Compute the covariance matrix
  let covarianceXX = 0, covarianceXY = 0, covarianceYY = 0;
  points.forEach(p => {
    const dx = p[0] - meanX;
    const dy = p[1] - meanY;
    covarianceXX += dx * dx;
    covarianceXY += dx * dy;
    covarianceYY += dy * dy;
  });

  covarianceXX /= points.length;
  covarianceXY /= points.length;
  covarianceYY /= points.length;

  // Step 3: Compute eigenvalues and eigenvectors of the covariance matrix
  const trace = covarianceXX + covarianceYY;
  const determinant = covarianceXX * covarianceYY - covarianceXY * covarianceXY;
  const eigenvalue1 = (trace + Math.sqrt(trace ** 2 - 4 * determinant)) / 2;
  const eigenvalue2 = (trace - Math.sqrt(trace ** 2 - 4 * determinant)) / 2;

  // The eigenvector for the largest eigenvalue
  const smallestEigenvector = eigenvalue2 >= eigenvalue1
    ? { x: covarianceXX - eigenvalue2, y: covarianceXY }
    : { x: covarianceXX - eigenvalue1, y: covarianceXY };

  // Normalize the vector to create a unit vector
  const magnitude = Math.sqrt(smallestEigenvector.x ** 2 + smallestEigenvector.y ** 2);
  const unitVector = { x: smallestEigenvector.x / magnitude, y: smallestEigenvector.y / magnitude };

  return unitVector;
}

function computeCenter(points) {
  let meanX = 0, meanY = 0;
  points.forEach(p => {
    meanX += p[0];
    meanY += p[1];
  });
  meanX /= points.length;
  meanY /= points.length;
  return [meanX, meanY];
}

function shiftAndRotatePoints(points, offset_1, offset_2, angle) {
  const rotatedPoints = points.map(p => {
    // Translate point to center
    const x = p[0] - offset_1[0];
    const y = p[1] - offset_1[1];

    // Apply rotation
    const rotatedX = x * Math.cos(-angle) - y * Math.sin(-angle);
    const rotatedY = x * Math.sin(-angle) + y * Math.cos(-angle);

    // Translate back
    return [rotatedX + offset_2[0], rotatedY + offset_2[1]];
  });
  return rotatedPoints;
}

function computeMinMax(points) {
  if (points.length === 0) {
    throw new Error('The points array is empty.');
  }

  // Initialize min and max values with the first point
  let minX = points[0][0], maxX = points[0][0];
  let minY = points[0][1], maxY = points[0][1];

  // Iterate through points to find min and max
  points.forEach(p => {
    const x = p[0];
    const y = p[1];

    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  });

  return {
    min: [minX, minY],
    max: [maxX, maxY]
  };
}

function enlargePoints(points, center, distance) {
  const resultPoints = points.map(p => {
    // Translate point to center
    const dx = p[0] - center[0];
    const dy = p[1] - center[1];
    const factor = distance / Math.sqrt(dx ** 2 + dy ** 2);
    // Translate back
    return [p[0] + factor * dx, p[1] + factor * dy];
  });
  return resultPoints;

}

// Generate trajectory with 90-degree turns (scanning the area)
function createTrajectoryFromPolygon(polygonCoords, resolutionMeters) {
    const resolutionDegrees = metersToDegrees(resolutionMeters);

    let points_original = [];
    for (let i = 0; i < polygonCoords.length; i++) {
      points_original.push([polygonCoords[i].lat, polygonCoords[i].lng]);
    }
    // Step 1: Compute the center of the points
    let center = computeCenter(points_original);
    let majorDirection = computeMajorDirection(points_original);
    const angle = Math.atan2(majorDirection.y, majorDirection.x); // Angle to rotate
    let points_enlarged = enlargePoints(points_original, center, 0.7 * resolutionDegrees);

    let points_rotated = shiftAndRotatePoints(points_enlarged, center, [0, 0], angle);
    let min_max = computeMinMax(points_rotated);
    const points_convex_hull = convexhull.makeHull(points_rotated);

    const latStart = min_max.max[0];
    const latEnd = min_max.min[0];
    const lngStart = min_max.min[1];
    const lngEnd = min_max.max[1];

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

    // rotate back the trajectory
    let trajectory_back = shiftAndRotatePoints(trajectory, [0, 0], center, -angle);
    if (trajectory_back.length < 2) return trajectory_back;

    // densify the trajectory
    let dense_trajectory = [];
    dense_trajectory.push(trajectory_back[0]);
    for (let i = 1; i < trajectory_back.length; i++) {
      // push a new point
      let pt0 = trajectory_back[i - 1];
      let pt1 = trajectory_back[i];

      let pt_new = [0.5 * (pt0[0] + pt1[0]), 0.5 * (pt0[1] + pt1[1])];
      dense_trajectory.push(pt_new);
      dense_trajectory.push(pt1);
    }

    return dense_trajectory;
}

function createSpiralTrajectory(center, radius, resolution) {
  const R = 6371000; // Earth's radius in meters
  // const [centerLat, centerLon] = center;
  const centerLat = center.lat;
  const centerLon = center.lng;

  let trajectory = [];
  let currentRadius = resolution; // Start radius
  let angle = 0; // Start angle

  // Continue until the radius exceeds the maximum radius
  while (currentRadius <= radius) {
    // Convert polar coordinates (currentRadius, angle) to WGS84 (lat, lon)
    const lat = centerLat + (currentRadius / R) * (180 / Math.PI) * Math.cos(angle);
    const lon = centerLon + (currentRadius / R) * (180 / Math.PI) * Math.sin(angle) / Math.cos(centerLat * Math.PI / 180);

    // Calculate heading toward the center
    const dLat = centerLat - lat;
    const dLon = centerLon - lon;
    const heading = (Math.atan2(dLon, dLat) * 180) / Math.PI; // Convert radians to degrees
    const normalizedHeading = (heading + 360) % 360; // Normalize to [0, 360]

    // Add the current point to the trajectory
    trajectory.push([lat, lon, normalizedHeading]);

    // Increment the angle and radius
    let delta_angle = (resolution / currentRadius); // Adjust angle step based on resolution and radius
    angle += delta_angle;
    if (angle >= 2 * Math.PI) {
      // Complete a full circle; increase radius for the next circle
      angle %= 2 * Math.PI;
    }

    // increae the radius smoothly
    let delta_radius = resolution * delta_angle / (2 * Math.PI);
    currentRadius += delta_radius;
  }

  return trajectory;
}

function haversineDistance(point1, point2) {
  const R = 6371000; // Earth's radius in meters
  const toRadians = (deg) => (deg * Math.PI) / 180;

  const [lat1, lon1] = [point1.lat, point1.lng];
  const [lat2, lon2] = [point2.lat, point2.lng];

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

function createSpiralTrajectoryFromPolyline(polylineCoords, resolutionMeters) {
  // the first point wll be the center.
  // the last point will be in the outer most circle
  const center = polylineCoords[0];
  const end = polylineCoords[polylineCoords.length - 1];
  const distance = haversineDistance(center, end);


  let trajectoryWithHeading = createSpiralTrajectory(center, distance, resolutionMeters);
  let trajectory = [];

  // console.log(trajectoryWithHeading);

  for (let i = 0; i < trajectoryWithHeading.length; i++) {
    trajectory.push([trajectoryWithHeading[i][0], trajectoryWithHeading[i][1]]);
  }



  return trajectory;
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
