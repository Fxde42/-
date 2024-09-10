from fastapi import FastAPI, HTTPException, Request, UploadFile, File
from fastapi.responses import JSONResponse
from datetime import datetime
import aiohttp
from PIL import Image
import io
from predict import predict_image_class
import uvicorn
import logging

# 创建 FastAPI 应用
app = FastAPI()


# 定义路由，接收POST请求
@app.post("/predict")
async def predict_image_class_from_url(request: Request, file: UploadFile = File(...)):
    image_bytes = await file.read()
    try:
        # 获取客户端IP地址
        client_ip = request.client.host

        # 记录访问时间
        access_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # 将图像数据加载到内存中的PIL Image对象
        image = Image.open(io.BytesIO(image_bytes))

        # 调用预测函数
        prediction = await predict_image_class(image)

        # 记录访问日志
        with open("access_log.txt", "a") as f:
            f.write(f"Access Time: {access_time}, IP Address: {client_ip}\n")

        # 返回预测结果
        return JSONResponse(content={"prediction": prediction})

    except aiohttp.ClientError as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch image: {str(e)}")

    except Image.DecompressionBombError as e:
        raise HTTPException(status_code=500, detail=f"Image decompression bomb detected: {str(e)}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    logging.info("Starting server process..")
    uvicorn.run(app, host="0.0.0.0", port=8000)
