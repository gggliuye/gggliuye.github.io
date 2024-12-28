/*
 * Convex hull algorithm - Library (compiled from TypeScript)
 *
 * Copyright (c) 2021 Project Nayuki
 * https://www.nayuki.io/page/convex-hull-algorithm
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program (see COPYING.txt and COPYING.LESSER.txt).
 * If not, see <http://www.gnu.org/licenses/>.
 */
// "use strict";
var convexhull;
(function (convexhull) {
    // Returns a new array of points representing the convex hull of
    // the given set of points. The convex hull excludes collinear points.
    // This algorithm runs in O(n log n) time.
    function makeHull(points) {
        let newPoints = points.slice();
        newPoints.sort(convexhull.POINT_COMPARATOR);
        return convexhull.makeHullPresorted(newPoints);
    }
    convexhull.makeHull = makeHull;
    // Returns the convex hull, assuming that each points[i] <= points[i + 1]. Runs in O(n) time.
    function makeHullPresorted(points) {
        if (points.length <= 1)
            return points.slice();
        // Andrew's monotone chain algorithm. Positive y coordinates correspond to "up"
        // as per the mathematical convention, instead of "down" as per the computer
        // graphics convention. This doesn't affect the correctness of the result.
        let upperHull = [];
        for (let i = 0; i < points.length; i++) {
            const p = points[i];
            while (upperHull.length >= 2) {
                const q = upperHull[upperHull.length - 1];
                const r = upperHull[upperHull.length - 2];
                if ((q[0] - r[0]) * (p[1] - r[1]) >= (q[1] - r[1]) * (p[0] - r[0]))
                    upperHull.pop();
                else
                    break;
            }
            upperHull.push(p);
        }
        upperHull.pop();
        let lowerHull = [];
        for (let i = points.length - 1; i >= 0; i--) {
            const p = points[i];
            while (lowerHull.length >= 2) {
                const q = lowerHull[lowerHull.length - 1];
                const r = lowerHull[lowerHull.length - 2];
                if ((q[0] - r[0]) * (p[1] - r[1]) >= (q[1] - r[1]) * (p[0] - r[0]))
                    lowerHull.pop();
                else
                    break;
            }
            lowerHull.push(p);
        }
        lowerHull.pop();
        if (upperHull.length == 1 && lowerHull.length == 1 && upperHull[0][0] == lowerHull[0][0] && upperHull[0][1] == lowerHull[0][1])
            return upperHull;
        else
            return upperHull.concat(lowerHull);
    }
    convexhull.makeHullPresorted = makeHullPresorted;
    function POINT_COMPARATOR(a, b) {
        if (a[0] < b[0])
            return -1;
        else if (a[0] > b[0])
            return +1;
        else if (a[1] < b[1])
            return -1;
        else if (a[1] > b[1])
            return +1;
        else
            return 0;
    }
    convexhull.POINT_COMPARATOR = POINT_COMPARATOR;
})(convexhull || (convexhull = {}));

function isPointInsidePolygen(point, hull) {
    let count = 0;
    const [px, py] = point;
    for (let i = 0, j = hull.length - 1; i < hull.length; j = i++) {
        const [x1, y1] = hull[j];
        const [x2, y2] = hull[i];

        if ((y1 <= py && y2 > py || y2 <= py && y1 > py) &&
            (x1 < (px - x2) * (y1 - y2) / (py - y2) + x2)) {
            count++;
        }
    }
    return count % 2 !== 0; // If count is odd, the point is inside the hull
}
