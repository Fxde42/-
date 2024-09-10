import os
from resnet import ResNet18
import torch
import torch.nn as nn
import time
import torch.optim as optim
import torchvision.transforms as transforms
from torchvision.datasets import ImageFolder
from torch.utils.data import DataLoader

# 加载预训练的ResNet模型
resnet = ResNet18()
num_ftrs = resnet.fc.in_features

# 加载预训练模型的参数
resnet.load_state_dict(torch.load('new_model.pt'))

data_dir = 'F:/CSDC/dataset/'
train_dir = data_dir + '/train'
test_dir = data_dir + '/test'
Start = time.time()
# 定义数据转换操作

def test(net, test_iter, criterion, device):
    total, correct = 0, 0
    net.eval()

    with torch.no_grad():
        print("*************** test ***************")
        for X, y in test_iter:
            X, y = X.to(device), y.to(device)

            output = net(X)
            loss = criterion(output, y)

            total += y.size(0)
            correct += (output.argmax(dim=1) == y).sum().item()

    test_acc = 100.0 * correct / total

    print("test_loss: {:.3f} | test_acc: {:6.3f}%"
          .format(loss.item(), test_acc))
    print("************************************\n")
    net.train()

    return test_acc


def get_cur_lr(optimizer):
    for param_group in optimizer.param_groups:
        return param_group['lr']


# 定义超参数
BATCH_SIZE = 16
NUM_EPOCHS = 14
LEARNING_RATE = 0.03
MOMENTUM = 0.9
WEIGHT_DECAY = 0.0005
NUM_PRINT = 100
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
print("using {} device.".format(DEVICE))

data_transforms = {
    'train': transforms.Compose([
        transforms.Resize((299, 299)),
        transforms.ToTensor(),  # 将图像转换为张量
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # 归一化
    ]),
    'test': transforms.Compose([
        transforms.Resize((299, 299)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
}

# 创建 ImageFolder 数据集对象
image_datasets = {x: ImageFolder(os.path.join(data_dir, x), data_transforms[x]) for x in ['train', 'test']}


def main():
    net = resnet
    net = net.to(DEVICE)

    test_iter = DataLoader(image_datasets['test'], batch_size=BATCH_SIZE, shuffle=False)

    criterion = nn.CrossEntropyLoss()
    optimizer = optim.SGD(
        net.parameters(),
        lr=LEARNING_RATE,
        momentum=MOMENTUM,
        weight_decay=WEIGHT_DECAY,
        nesterov=True
    )
    lr_scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=7, gamma=0.1)
    record_test = list()
    record_test.append(test(net, test_iter, criterion, DEVICE))

    end = time.time()
    elapsed_time = end - Start
    print('测试总用时间: {:.2f} 秒'.format(elapsed_time))


if __name__ == '__main__':
    main()
