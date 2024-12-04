import re
import os
import sys


content_action_group = """
        <wpml:actionGroup>
          <wpml:actionGroupId>0</wpml:actionGroupId>
          <wpml:actionGroupStartIndex>0</wpml:actionGroupStartIndex>
          <wpml:actionGroupEndIndex>0</wpml:actionGroupEndIndex>
          <wpml:actionGroupMode>sequence</wpml:actionGroupMode>
          <wpml:actionTrigger>
            <wpml:actionTriggerType>reachPoint</wpml:actionTriggerType>
          </wpml:actionTrigger>
          <wpml:action>
            <wpml:actionId>0</wpml:actionId>
            <wpml:actionActuatorFunc>orientedShoot</wpml:actionActuatorFunc>
            <wpml:actionActuatorFuncParam>
              <wpml:gimbalPitchRotateAngle>-20</wpml:gimbalPitchRotateAngle>
              <wpml:gimbalRollRotateAngle>0</wpml:gimbalRollRotateAngle>
              <wpml:gimbalYawRotateAngle>0</wpml:gimbalYawRotateAngle>
              <wpml:focusX>0</wpml:focusX>
              <wpml:focusY>0</wpml:focusY>
              <wpml:focusRegionWidth>0</wpml:focusRegionWidth>
              <wpml:focusRegionHeight>0</wpml:focusRegionHeight>
              <wpml:focalLength>48</wpml:focalLength>
              <wpml:aircraftHeading>0</wpml:aircraftHeading>
              <wpml:accurateFrameValid>0</wpml:accurateFrameValid>
              <wpml:payloadPositionIndex>0</wpml:payloadPositionIndex>
              <wpml:useGlobalPayloadLensIndex>0</wpml:useGlobalPayloadLensIndex>
              <wpml:payloadLensIndex>wide</wpml:payloadLensIndex>
            </wpml:actionActuatorFuncParam>
          </wpml:action>
          <wpml:action>
            <wpml:actionId>1</wpml:actionId>
            <wpml:actionActuatorFunc>orientedShoot</wpml:actionActuatorFunc>
            <wpml:actionActuatorFuncParam>
              <wpml:gimbalPitchRotateAngle>-20</wpml:gimbalPitchRotateAngle>
              <wpml:gimbalRollRotateAngle>0</wpml:gimbalRollRotateAngle>
              <wpml:gimbalYawRotateAngle>90</wpml:gimbalYawRotateAngle>
              <wpml:focusX>0</wpml:focusX>
              <wpml:focusY>0</wpml:focusY>
              <wpml:focusRegionWidth>0</wpml:focusRegionWidth>
              <wpml:focusRegionHeight>0</wpml:focusRegionHeight>
              <wpml:focalLength>48</wpml:focalLength>
              <wpml:aircraftHeading>90</wpml:aircraftHeading>
              <wpml:accurateFrameValid>0</wpml:accurateFrameValid>
              <wpml:payloadPositionIndex>0</wpml:payloadPositionIndex>
              <wpml:useGlobalPayloadLensIndex>0</wpml:useGlobalPayloadLensIndex>
              <wpml:payloadLensIndex>wide</wpml:payloadLensIndex>
            </wpml:actionActuatorFuncParam>
          </wpml:action>
          <wpml:action>
            <wpml:actionId>2</wpml:actionId>
            <wpml:actionActuatorFunc>orientedShoot</wpml:actionActuatorFunc>
            <wpml:actionActuatorFuncParam>
              <wpml:gimbalPitchRotateAngle>-20</wpml:gimbalPitchRotateAngle>
              <wpml:gimbalRollRotateAngle>0</wpml:gimbalRollRotateAngle>
              <wpml:gimbalYawRotateAngle>180</wpml:gimbalYawRotateAngle>
              <wpml:focusX>0</wpml:focusX>
              <wpml:focusY>0</wpml:focusY>
              <wpml:focusRegionWidth>0</wpml:focusRegionWidth>
              <wpml:focusRegionHeight>0</wpml:focusRegionHeight>
              <wpml:focalLength>48</wpml:focalLength>
              <wpml:aircraftHeading>180</wpml:aircraftHeading>
              <wpml:accurateFrameValid>0</wpml:accurateFrameValid>
              <wpml:payloadPositionIndex>0</wpml:payloadPositionIndex>
              <wpml:useGlobalPayloadLensIndex>0</wpml:useGlobalPayloadLensIndex>
              <wpml:payloadLensIndex>wide</wpml:payloadLensIndex>
            </wpml:actionActuatorFuncParam>
          </wpml:action>
          <wpml:action>
            <wpml:actionId>3</wpml:actionId>
            <wpml:actionActuatorFunc>orientedShoot</wpml:actionActuatorFunc>
            <wpml:actionActuatorFuncParam>
              <wpml:gimbalPitchRotateAngle>-20</wpml:gimbalPitchRotateAngle>
              <wpml:gimbalRollRotateAngle>0</wpml:gimbalRollRotateAngle>
              <wpml:gimbalYawRotateAngle>-90</wpml:gimbalYawRotateAngle>
              <wpml:focusX>0</wpml:focusX>
              <wpml:focusY>0</wpml:focusY>
              <wpml:focusRegionWidth>0</wpml:focusRegionWidth>
              <wpml:focusRegionHeight>0</wpml:focusRegionHeight>
              <wpml:focalLength>48</wpml:focalLength>
              <wpml:aircraftHeading>-90</wpml:aircraftHeading>
              <wpml:accurateFrameValid>0</wpml:accurateFrameValid>
              <wpml:payloadPositionIndex>0</wpml:payloadPositionIndex>
              <wpml:useGlobalPayloadLensIndex>0</wpml:useGlobalPayloadLensIndex>
              <wpml:payloadLensIndex>wide</wpml:payloadLensIndex>
            </wpml:actionActuatorFuncParam>
          </wpml:action>
          <wpml:action>
            <wpml:actionId>4</wpml:actionId>
            <wpml:actionActuatorFunc>orientedShoot</wpml:actionActuatorFunc>
            <wpml:actionActuatorFuncParam>
              <wpml:gimbalPitchRotateAngle>-55</wpml:gimbalPitchRotateAngle>
              <wpml:gimbalRollRotateAngle>0</wpml:gimbalRollRotateAngle>
              <wpml:gimbalYawRotateAngle>0</wpml:gimbalYawRotateAngle>
              <wpml:focusX>0</wpml:focusX>
              <wpml:focusY>0</wpml:focusY>
              <wpml:focusRegionWidth>0</wpml:focusRegionWidth>
              <wpml:focusRegionHeight>0</wpml:focusRegionHeight>
              <wpml:focalLength>48</wpml:focalLength>
              <wpml:aircraftHeading>0</wpml:aircraftHeading>
              <wpml:accurateFrameValid>0</wpml:accurateFrameValid>
              <wpml:payloadPositionIndex>0</wpml:payloadPositionIndex>
              <wpml:useGlobalPayloadLensIndex>0</wpml:useGlobalPayloadLensIndex>
              <wpml:payloadLensIndex>wide</wpml:payloadLensIndex>
            </wpml:actionActuatorFuncParam>
          </wpml:action>
          <wpml:action>
            <wpml:actionId>5</wpml:actionId>
            <wpml:actionActuatorFunc>orientedShoot</wpml:actionActuatorFunc>
            <wpml:actionActuatorFuncParam>
              <wpml:gimbalPitchRotateAngle>-55</wpml:gimbalPitchRotateAngle>
              <wpml:gimbalRollRotateAngle>0</wpml:gimbalRollRotateAngle>
              <wpml:gimbalYawRotateAngle>90</wpml:gimbalYawRotateAngle>
              <wpml:focusX>0</wpml:focusX>
              <wpml:focusY>0</wpml:focusY>
              <wpml:focusRegionWidth>0</wpml:focusRegionWidth>
              <wpml:focusRegionHeight>0</wpml:focusRegionHeight>
              <wpml:focalLength>48</wpml:focalLength>
              <wpml:aircraftHeading>90</wpml:aircraftHeading>
              <wpml:accurateFrameValid>0</wpml:accurateFrameValid>
              <wpml:payloadPositionIndex>0</wpml:payloadPositionIndex>
              <wpml:useGlobalPayloadLensIndex>0</wpml:useGlobalPayloadLensIndex>
              <wpml:payloadLensIndex>wide</wpml:payloadLensIndex>
            </wpml:actionActuatorFuncParam>
          </wpml:action>
          <wpml:action>
            <wpml:actionId>6</wpml:actionId>
            <wpml:actionActuatorFunc>orientedShoot</wpml:actionActuatorFunc>
            <wpml:actionActuatorFuncParam>
              <wpml:gimbalPitchRotateAngle>-55</wpml:gimbalPitchRotateAngle>
              <wpml:gimbalRollRotateAngle>0</wpml:gimbalRollRotateAngle>
              <wpml:gimbalYawRotateAngle>180</wpml:gimbalYawRotateAngle>
              <wpml:focusX>0</wpml:focusX>
              <wpml:focusY>0</wpml:focusY>
              <wpml:focusRegionWidth>0</wpml:focusRegionWidth>
              <wpml:focusRegionHeight>0</wpml:focusRegionHeight>
              <wpml:focalLength>48</wpml:focalLength>
              <wpml:aircraftHeading>180</wpml:aircraftHeading>
              <wpml:accurateFrameValid>0</wpml:accurateFrameValid>
              <wpml:payloadPositionIndex>0</wpml:payloadPositionIndex>
              <wpml:useGlobalPayloadLensIndex>0</wpml:useGlobalPayloadLensIndex>
              <wpml:payloadLensIndex>wide</wpml:payloadLensIndex>
            </wpml:actionActuatorFuncParam>
          </wpml:action>
          <wpml:action>
            <wpml:actionId>7</wpml:actionId>
            <wpml:actionActuatorFunc>orientedShoot</wpml:actionActuatorFunc>
            <wpml:actionActuatorFuncParam>
              <wpml:gimbalPitchRotateAngle>-55</wpml:gimbalPitchRotateAngle>
              <wpml:gimbalRollRotateAngle>0</wpml:gimbalRollRotateAngle>
              <wpml:gimbalYawRotateAngle>-90</wpml:gimbalYawRotateAngle>
              <wpml:focusX>0</wpml:focusX>
              <wpml:focusY>0</wpml:focusY>
              <wpml:focusRegionWidth>0</wpml:focusRegionWidth>
              <wpml:focusRegionHeight>0</wpml:focusRegionHeight>
              <wpml:focalLength>48</wpml:focalLength>
              <wpml:aircraftHeading>-90</wpml:aircraftHeading>
              <wpml:accurateFrameValid>0</wpml:accurateFrameValid>
              <wpml:payloadPositionIndex>0</wpml:payloadPositionIndex>
              <wpml:useGlobalPayloadLensIndex>0</wpml:useGlobalPayloadLensIndex>
              <wpml:payloadLensIndex>wide</wpml:payloadLensIndex>
            </wpml:actionActuatorFuncParam>
          </wpml:action>
          <wpml:action>
            <wpml:actionId>8</wpml:actionId>
            <wpml:actionActuatorFunc>orientedShoot</wpml:actionActuatorFunc>
            <wpml:actionActuatorFuncParam>
              <wpml:gimbalPitchRotateAngle>-90</wpml:gimbalPitchRotateAngle>
              <wpml:gimbalRollRotateAngle>0</wpml:gimbalRollRotateAngle>
              <wpml:gimbalYawRotateAngle>0</wpml:gimbalYawRotateAngle>
              <wpml:focusX>0</wpml:focusX>
              <wpml:focusY>0</wpml:focusY>
              <wpml:focusRegionWidth>0</wpml:focusRegionWidth>
              <wpml:focusRegionHeight>0</wpml:focusRegionHeight>
              <wpml:focalLength>48</wpml:focalLength>
              <wpml:aircraftHeading>0</wpml:aircraftHeading>
              <wpml:accurateFrameValid>0</wpml:accurateFrameValid>
              <wpml:payloadPositionIndex>0</wpml:payloadPositionIndex>
              <wpml:useGlobalPayloadLensIndex>0</wpml:useGlobalPayloadLensIndex>
              <wpml:payloadLensIndex>wide</wpml:payloadLensIndex>
            </wpml:actionActuatorFuncParam>
          </wpml:action>
        </wpml:actionGroup>
"""


def replace_action_group_values(old_content, n):
    """
    Replaces the value '0' in the following lines with the specified number 'n':
        <wpml:actionGroupId>0</wpml:actionGroupId>
        <wpml:actionGroupStartIndex>0</wpml:actionGroupStartIndex>
        <wpml:actionGroupEndIndex>0</wpml:actionGroupEndIndex>
    and writes the modified content to a new file.

    :param file_path: Path to the input file.
    :param n: The number to replace 0 with.
    :param output_path: Path to the new output file.
    """
    try:
        # Read the content of the file
        # Replace the 0 values with the input number n in the specific tags
        new_content = old_content.replace('<wpml:actionGroupId>0</wpml:actionGroupId>',
                                      f'<wpml:actionGroupId>{n}</wpml:actionGroupId>') \
                             .replace('<wpml:actionGroupStartIndex>0</wpml:actionGroupStartIndex>',
                                      f'<wpml:actionGroupStartIndex>{n}</wpml:actionGroupStartIndex>') \
                             .replace('<wpml:actionGroupEndIndex>0</wpml:actionGroupEndIndex>',
                                      f'<wpml:actionGroupEndIndex>{n}</wpml:actionGroupEndIndex>')

        # Write the modified content to a new file
        return new_content
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
    except Exception as e:
        print(f"An error occurred: {e}")
    return new_content


def remove_wpml_action_group(file_path, output_path):
    """
    Reads a file, removes all content between <wpml:actionGroup> and </wpml:actionGroup> tags,
    and writes the modified content to a new file.

    :param file_path: Path to the input file to be read.
    :param output_path: Path to the output file to be written.
    """
    try:
        # Read the original content of the file
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()

        # Use regular expressions to remove content between the specified tags
        modified_content = re.sub(r"<wpml:actionGroup>.*?</wpml:actionGroup>", "", content, flags=re.DOTALL)

        # Write the modified content to a new file
        with open(output_path, 'w', encoding='utf-8') as file:
            file.write(modified_content)

        print(f"Modified content has been written to '{output_path}'.")
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
    except Exception as e:
        print(f"An error occurred: {e}")


def add_content_after_line(file1_path, output_path):
    """
    Finds all occurrences of the line <wpml:useStraightLine>0</wpml:useStraightLine> in file1,
    and appends the content of file2 after each occurrence. The result is written to a new output file.

    :param file1_path: Path to the input file where the search and modification will happen.
    :param file2_path: Path to the file whose content will be added after the matched lines.
    :param output_path: Path to the new file to save the modified content.
    """
    try:
        # Read the content of file1
        with open(file1_path, 'r', encoding='utf-8') as file1:
            lines = file1.readlines()

        # Read the content of file2
        # with open(file2_path, 'r', encoding='utf-8') as file2:
        #     file2_content = file2.read()
        file2_content = content_action_group

        # Open the output file for writing the modified content
        cnt = 0
        with open(output_path, 'w', encoding='utf-8') as output_file:
            for line in lines:
                output_file.write(line)
                if "<wpml:useStraightLine>" not in line.strip():
                    continue
                new_content = replace_action_group_values(file2_content, cnt)
                # print(new_content)
                output_file.write(new_content + '\n')  # Append the content of file2
                cnt += 1

        print(f"Modified {cnt} content has been written to '{output_path}'.")

    except FileNotFoundError:
        print(f"Error: One or more files were not found.")
    except Exception as e:
        print(f"An error occurred: {e}")


def process_file(origin_kmz_file):
    print("unzip the origin file")
    os.system("rm -rf tmp")
    os.system(f"unzip {origin_kmz_file} -d tmp")
    os.system("mkdir -p wpmz")

    print("update files")
    remove_wpml_action_group("tmp/wpmz/template.kml", "tmp/tmp.txt")
    add_content_after_line("tmp/tmp.txt", "wpmz/template.kml")
    remove_wpml_action_group("tmp/wpmz/waylines.wpml", "tmp/tmp.txt")
    add_content_after_line("tmp/tmp.txt", "wpmz/waylines.wpml")
    os.system("zip -r new_route.zip wpmz")
    os.system("mv new_route.zip new_route.kmz")
    os.system("rm -rf tmp")
    os.system("rm -rf wpmz")


if __name__ == "__main__":
	file_name = sys.argv[1]
	process_file(file_name)
