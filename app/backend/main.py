from fastapi import FastAPI
from typing import List  # ネストされたBodyを定義するために必要
from starlette.middleware.cors import CORSMiddleware  # CORSを回避するために必要
from db import session  # DBと接続するためのセッション
from model import UserTable, User, Research1Table, Research1  # 今回使うモデルをインポート
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from routers import manipulation

from utils.geneticAlgorithm.make_chromosome_params import make_chromosome_params


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

@app.get("/")
async def main():
    return FileResponse(template_file_path)

app.include_router(manipulation.router)