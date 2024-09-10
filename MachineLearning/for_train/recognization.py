import torch
import torch.nn.functional as F
from torchvision import transforms
from PIL import Image
from resnet import ResNet18
import json

# 加载预训练的模型
model = ResNet18()
model.load_state_dict(torch.load('new_model.pt', map_location=torch.device('cpu')))
model.eval()

# 定义图像预处理函数
preprocess = transforms.Compose([
    transforms.Resize(299),                    # 调整图像大小
    transforms.ToTensor(),                     # 转换为张量
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),  # 归一化
])

# 读取图像并进行预测
def predict_image(image_path):
    img = Image.open(image_path).convert('RGB')  # 读取图像
    img = preprocess(img)                        # 图像预处理
    img = img.unsqueeze(0)                       # 添加批量维度

    with torch.no_grad():
        output = model(img)
        probs = F.softmax(output, dim=1)
        _, predicted = torch.max(probs, 1)

    confidence = torch.max(probs).item() * 100  # 获取最大概率值作为置信度

    return predicted.item(), confidence # 返回预测的类别索引


with open('class.json', 'r', encoding='utf-8') as f:
    label_dict = json.load(f)


# 读取并识别图像
image_path = 'test_image.jpg'  # 替换为你的图像路径
predicted_class, confidence = predict_image(image_path)

# 根据预测的类别索引查找类别名称
predicted_class_name = label_dict[str(predicted_class)]

print("Predicted class name:", predicted_class_name)
print("Confidence:", "{:.2f}%".format(confidence))
