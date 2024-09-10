from torchvision.datasets import ImageFolder

data_dir = 'F:/CSDC/dataset/'
train_dir = data_dir + '/train'

# 创建 ImageFolder 数据集对象
image_datasets = ImageFolder(train_dir)

# 获取类别标签和对应的数字标签
classes = image_datasets.classes
print("类别标签和数字标签对应关系：")
for i, class_name in enumerate(classes):
    print(f"类别名称: {class_name}, 数字标签: {i}")
