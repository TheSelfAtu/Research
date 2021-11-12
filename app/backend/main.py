from fastapi import FastAPI, Response, Cookie
from starlette.middleware.cors import CORSMiddleware  # CORSを回避するために必要
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from routers import manipulation
import random
import string
# from utils.log import log

app = FastAPI()
template_file_path = "./static/templates/index.html"
app.mount("/static", StaticFiles(directory="static"), name="static")

# CORSを回避するために設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------APIの実装------------
@app.get("/{giongo}")
async def main(giongo:str):
    # 結果記録用ファイル名が被らないための文字列
    random_strings_list:list = [random.choice(string.ascii_letters + string.digits)
                      for i in range(7)]
    random_strings = ''.join(random_strings_list)
    # HTMLファイルを返す
    response = FileResponse(template_file_path)
    response.set_cookie(key="random_strings", value=random_strings)
    # 目的の擬音語の値
    response.set_cookie(key="giongo", value=giongo)
    return response

app.include_router(manipulation.router)
