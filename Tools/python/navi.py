import requests
import json
import math
import time


USE_GCJ02 = True

# ---------------- 常量 ----------------
_EE = 0.00669342162296594323
_A  = 6378245.0

# ---------------- 内部工具 ----------------
def _transform_lat(x: float, y: float) -> float:
    ret = (-100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y +
           0.1 * x * y + 0.2 * math.sqrt(abs(x)))
    ret += (20.0 * math.sin(6.0 * x * math.pi) +
            20.0 * math.sin(2.0 * x * math.pi)) * 2.0 / 3.0
    ret += (20.0 * math.sin(y * math.pi) +
            40.0 * math.sin(y / 3.0 * math.pi)) * 2.0 / 3.0
    ret += (160.0 * math.sin(y / 12.0 * math.pi) +
            320.0 * math.sin(y * math.pi / 30.0)) * 2.0 / 3.0
    return ret

def _transform_lon(x: float, y: float) -> float:
    ret = (300.0 + x + 2.0 * y + 0.1 * x * x +
           0.1 * x * y + 0.1 * math.sqrt(abs(x)))
    ret += (20.0 * math.sin(6.0 * x * math.pi) +
            20.0 * math.sin(2.0 * x * math.pi)) * 2.0 / 3.0
    ret += (20.0 * math.sin(x * math.pi) +
            40.0 * math.sin(x / 3.0 * math.pi)) * 2.0 / 3.0
    ret += (150.0 * math.sin(x / 12.0 * math.pi) +
            300.0 * math.sin(x / 30.0 * math.pi)) * 2.0 / 3.0
    return ret

def _compute_delta(g_lon: float, g_lat: float):
    """返回 (dLon, dLat) 的纠偏量（单位：度）"""
    d_lat = _transform_lat(g_lon - 105.0, g_lat - 35.0)
    d_lon = _transform_lon(g_lon - 105.0, g_lat - 35.0)
    rad_lat = math.radians(g_lat)
    magic = math.sin(rad_lat)
    magic = 1 - _EE * magic * magic
    sqrt_magic = math.sqrt(magic)
    d_lat = (d_lat * 180.0) / ((_A * (1 - _EE)) /
                               (magic * sqrt_magic) * math.pi)
    d_lon = (d_lon * 180.0) / (_A / sqrt_magic *
                               math.cos(rad_lat) * math.pi)
    return d_lon, d_lat

# ---------------- 对外接口 ----------------
def gcj02_to_wgs84(g_lon: float, g_lat: float):
    """GCJ02 → WGS84"""
    d_lon, d_lat = _compute_delta(g_lon, g_lat)
    return g_lon - d_lon, g_lat - d_lat

def wgs84_to_gcj02(g_lon: float, g_lat: float):
    """WGS84 → GCJ02"""
    d_lon, d_lat = _compute_delta(g_lon, g_lat)
    return g_lon + d_lon, g_lat + d_lat


def haversine(lat1, lon1, lat2, lon2):
    # Radius of the Earth in kilometers
    r = 6371.0

    # Convert latitude and longitude from degrees to radians
    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)

    # Calculate the differences
    delta_lat = lat2_rad - lat1_rad
    delta_lon = lon2_rad - lon1_rad

    # Apply the Haversine formula
    a = math.sin(delta_lat / 2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(delta_lon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    # Calculate the distance
    distance = r * c

    return distance * 1000

f_key = open("data/api_key.txt")
API_KEY = f_key.read().strip()
f_key.close()


def get_route(origin, destination, strategy=2):
    """
    获取高德地图驾车路径规划信息
    :param origin: 起点经纬度，格式为"经度,纬度"
    :param destination: 终点经纬度，格式为"经度,纬度"
    :param api_key: 高德地图API Key
    :param strategy: 路径规划策略，10为躲避拥堵
    :return: 路径规划结果
    """
    url = "https://restapi.amap.com/v3/direction/driving?";
    url += ("origin=" + origin);
    url += ("&destination=" + destination);
    url += "&show_fields=polyline";
    url += ("&key=" + API_KEY);

    response = requests.get(url)
    data = response.json()
    if data["status"] == "1":
        route = data["route"]["paths"][0]
        return route
    else:
        print(data)
        return None


# origin = "103.834303,36.061089"  # 起点经纬度
# destination = "102.5063363404728,35.19351703831921"  # 终点经纬度
# run_routing(origin, destination)
def run_routing(origin, destination, polyline_min_length = 2000):
    route = get_route(origin, destination)
    if route is None:
        return 0, 0, ""

    total_duration = int(route["duration"])
    total_distance = int(route["distance"])

    poly_line_total = []
    for step in route["steps"]:
        # step_distance
        polyline = step["polyline"].split(';')
        poly_line_total.append(polyline[0])
        p1 = polyline[0].split(',')

        for i in range(len(polyline) - 1):
            p2 = polyline[i + 1].split(',')
            distance = haversine(float(p1[1]), float(p1[0]), float(p2[1]), float(p2[0]))
            if distance > polyline_min_length:
                poly_line_total.append(polyline[i + 1])
                p1 = p2
    print(f"from {origin} to {destination} total distance {total_distance} total duration {total_duration}, polysize : {len(poly_line_total)}")

    # transfrom the coordinates of the polyline
    poly_line_total_string = ""
    for lon_lat in poly_line_total:
        pt = lon_lat.split(',')
        if USE_GCJ02:
            lon = float(pt[0])
            lat = float(pt[1])
        else:
            lon, lat = gcj02_to_wgs84(float(pt[0]), float(pt[1]))
        poly_line_total_string = poly_line_total_string + str(lon) + "," + str(lat) + ";"

    return total_distance, total_duration, poly_line_total_string[:-1]

# process routing
def read_json_waypoints(json_file_path):
    with open(json_file_path, "r", encoding="utf-8") as f:
        points = json.load(f)

    last_point = None
    for p in points:
        lon, lat = gcj02_to_wgs84(p["lng_wgs84"], p["lat_wgs84"])
        current_point = str(lon) + "," + str(lat)
        if last_point is None:
            last_point = current_point
            continue
        total_distance, total_duration, poly_line_total = run_routing(last_point, current_point)
        last_point = current_point

        p["distance"] = total_distance
        p["duration"] = total_duration
        p["route_gcj"] = poly_line_total
        p["lng_gcj"] = lon
        p["lat_gcj"] = lat

        # We might have error "CUQPS_HAS_EXCEEDED_THE_LIMIT", so we sleep a bit
        time.sleep(1.0)


    with open(json_file_path, "w", encoding="utf-8") as f:
        json.dump(points, f, ensure_ascii=False, indent=2)



read_json_waypoints("assets/trip/trip_gannan_xc.json");
