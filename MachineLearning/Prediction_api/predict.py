import torch
import torch.nn.functional as F
from resnet import ResNet18
from torchvision import transforms
import json
import aiofiles

async def predict_image_class(image_data):
    # 指定设备为 CPU
    device = torch.device('cpu')

    model = ResNet18()
    model.load_state_dict(torch.load('new_model.pt', map_location=device))
    model.eval()

    # 定义图像预处理函数
    preprocess = transforms.Compose([
        transforms.Resize(299),  # 调整图像大小
        transforms.ToTensor(),  # 转换为张量
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),  # 归一化
    ])

    img = preprocess(image_data)  # 图像预处理
    img = img.unsqueeze(0)  # 添加批量维度

    with torch.no_grad():
        output = model(img)
        probs = F.softmax(output, dim=1)
        _, predicted = torch.max(probs, 1)

    async with aiofiles.open('class.json', 'r', encoding='utf-8') as f:
        label_dict = json.loads(await f.read())
    predicted_class_name = label_dict[str(predicted.item())]

    return predicted_class_name
