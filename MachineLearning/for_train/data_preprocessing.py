import os
from PIL import Image


def is_valid_image(filename):
    valid = True
    try:
        Image.open(filename).load()
    except OSError:
        valid = False
    return valid


dataset_folder = 'F:/LR_recruit/Mydataset/train'
for root, dirs, files in os.walk(dataset_folder):
    for file in files:
        file_path = os.path.join(root, file)
        if not is_valid_image(file_path):
            os.remove(file_path)
