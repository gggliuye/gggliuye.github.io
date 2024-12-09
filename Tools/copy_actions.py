import re
import os
import sys


def get_photo_action(pitch, yaw, action_id):
    return f"""
          <wpml:action>
            <wpml:actionId>{action_id}</wpml:actionId>
            <wpml:actionActuatorFunc>orientedShoot</wpml:actionActuatorFunc>
            <wpml:actionActuatorFuncParam>
              <wpml:gimbalPitchRotateAngle>{pitch}</wpml:gimbalPitchRotateAngle>
              <wpml:gimbalRollRotateAngle>0</wpml:gimbalRollRotateAngle>
              <wpml:gimbalYawRotateAngle>{yaw}</wpml:gimbalYawRotateAngle>
              <wpml:focusX>0</wpml:focusX>
              <wpml:focusY>0</wpml:focusY>
              <wpml:focusRegionWidth>0</wpml:focusRegionWidth>
              <wpml:focusRegionHeight>0</wpml:focusRegionHeight>
              <wpml:focalLength>48</wpml:focalLength>
              <wpml:aircraftHeading>{yaw}</wpml:aircraftHeading>
              <wpml:accurateFrameValid>0</wpml:accurateFrameValid>
              <wpml:payloadPositionIndex>0</wpml:payloadPositionIndex>
              <wpml:useGlobalPayloadLensIndex>0</wpml:useGlobalPayloadLensIndex>
              <wpml:payloadLensIndex>wide</wpml:payloadLensIndex>
            </wpml:actionActuatorFuncParam>
          </wpml:action>
    """


def get_photo_action_group(action_group_id, pitches = [-20, -55], yaws = [0, 60, 120, 180, -120, -60]):
    content_internal = ""

    action_id = 0
    for pitch in pitches:
        for yaw in yaws:
            content_internal += get_photo_action(pitch, yaw, action_id)
            action_id += 1
    content_internal += get_photo_action(-90, 0, action_id)

    return f"""
        <wpml:actionGroup>
        <wpml:actionGroupId>{action_group_id}</wpml:actionGroupId>
        <wpml:actionGroupStartIndex>{action_group_id}</wpml:actionGroupStartIndex>
        <wpml:actionGroupEndIndex>{action_group_id}</wpml:actionGroupEndIndex>
        <wpml:actionGroupMode>sequence</wpml:actionGroupMode>
        <wpml:actionTrigger>
          <wpml:actionTriggerType>reachPoint</wpml:actionTriggerType>
        </wpml:actionTrigger>
        {content_internal}
        </wpml:actionGroup>
    """


def remove_wpml_action_group(file_path, output_path):
    try:
        # Read the original content of the file
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()

        # Use regular expressions to remove content between the specified tags
        modified_content = re.sub(r"<wpml:actionGroup>.*?</wpml:actionGroup>", "", content, flags=re.DOTALL)

        # Write the modified content to a new file
        with open(output_path, 'w', encoding='utf-8') as file:
            file.write(modified_content)

        print(f"===> Modified content has been written to '{output_path}'.")
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
    except Exception as e:
        print(f"An error occurred: {e}")


def add_content_after_line(file_path, output_path):
    try:
        # Read the content of file1
        with open(file_path, 'r', encoding='utf-8') as file:
            lines = file.readlines()

        # Open the output file for writing the modified content
        cnt = 0
        with open(output_path, 'w', encoding='utf-8') as output_file:
            for line in lines:
                output_file.write(line)
                if "<wpml:useStraightLine>" not in line.strip():
                    continue
                action_group_content = get_photo_action_group(cnt)
                output_file.write(action_group_content + '\n')  # Append the content of file2
                cnt += 1

        print(f"Modified {cnt} content has been written to '{output_path}'.")

    except FileNotFoundError:
        print(f"Error: One or more files were not found.")
    except Exception as e:
        print(f"An error occurred: {e}")



def get_place_marker(point_content, index, height):
    return f"""
      <Placemark>
        {point_content}
        <wpml:index>{index}</wpml:index>
        <wpml:ellipsoidHeight>{height}</wpml:ellipsoidHeight>
        <wpml:height>{height}</wpml:height>
        <wpml:useGlobalHeight>0</wpml:useGlobalHeight>
        <wpml:useGlobalSpeed>1</wpml:useGlobalSpeed>
        <wpml:useGlobalHeadingParam>1</wpml:useGlobalHeadingParam>
        <wpml:useGlobalTurnParam>1</wpml:useGlobalTurnParam>
        <wpml:useStraightLine>0</wpml:useStraightLine>
        <wpml:isRisky>0</wpml:isRisky>
      </Placemark>
    """


# [4, 8, 20, 40, 60, 80]
def duplicate_points(file_path, output_path, heights = [20, 40, 60, 80]):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    point_contents = re.findall(r'<Point>.*?</Point>', content, re.DOTALL)
    print(f"  Found {len(point_contents)} points")

    # remove all the exist place markers
    modified_content = re.sub(r"<Placemark>.*?</Placemark>", "", content, flags=re.DOTALL)
    with open(output_path, 'w', encoding='utf-8') as file:
        file.write(modified_content)

    place_marker_contents = ""
    point_index = 0
    for height in heights:
        for point_content in point_contents:
            place_marker_contents += get_place_marker(point_content, point_index, height)
            point_index += 1

    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    with open(output_path, 'w', encoding='utf-8') as output_file:
        for line in lines:
            output_file.write(line)
            if "<wpml:globalUseStraightLine>" not in line.strip():
                continue
            output_file.write(place_marker_contents + '\n')  # Append the content of file2



def process_file(origin_kmz_file):
    print("===> unzip the origin file")
    os.system("rm -rf tmp")
    os.system(f"unzip {origin_kmz_file}.kmz -d tmp")
    os.system("mkdir -p wpmz")

    new_kmz_file = "liuye_" + origin_kmz_file
    print("===> update files")
    remove_wpml_action_group("tmp/wpmz/template.kml", "tmp/tmp.txt")
    duplicate_points("tmp/tmp.txt", "tmp/tmp.txt")
    add_content_after_line("tmp/tmp.txt", "wpmz/template.kml")
    # remove_wpml_action_group("tmp/wpmz/waylines.wpml", "tmp/tmp.txt")
    # add_content_after_line("tmp/tmp.txt", "wpmz/waylines.wpml")
    os.system(f"zip -r {new_kmz_file}.zip wpmz")
    os.system(f"mv {new_kmz_file}.zip {new_kmz_file}.kmz")
    os.system("rm -rf tmp")
    os.system("rm -rf wpmz")


if __name__ == "__main__":
	file_name = sys.argv[1]
	process_file(file_name)
