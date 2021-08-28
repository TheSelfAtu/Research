from fastapi import FastAPI
from typing import List  # ネストされたBodyを定義するために必要
from starlette.middleware.cors import CORSMiddleware  # CORSを回避するために必要
from db import session  # DBと接続するためのセッション
from model import UserTable, User, Research1Table, Research1  # 今回使うモデルをインポート
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from utils.geneticAlgorithm.make_gene_params import make_gene_params

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
# router = APIRouter()

@app.get("/genetic-algorithm/make-ramdom/all")
async def rep_first_genes():
    return {
        "gene1":make_gene_params(),
        "gene2":make_gene_params(),
        "gene3":make_gene_params(),
        "gene4":make_gene_params(),
        "gene5":make_gene_params(),
        "gene6":make_gene_params(),
        "gene7":make_gene_params(),
        "gene8":make_gene_params(),
        "gene9":make_gene_params(),
        "gene10":make_gene_params()
        }

# テーブルにいる全ユーザ情報を取得 GET


@app.get("/users")
def read_users():
    users = session.query(UserTable).all()
    return users

# idにマッチするユーザ情報を取得 GET


@app.get("/users/{user_id}")
def read_user(user_id: int):
    user = session.query(UserTable).\
        filter(UserTable.id == user_id).first()
    return user


@app.get("/research1")
def readResearch1Results():
    results = session.query(Research1Table).all()
    return results


@app.post("/research1")
def create_test(questionResults: Research1):
    research1 = Research1Table()
    research1.name = questionResults.name
    research1.Q1 = questionResults.Q1
    research1.Q2 = questionResults.Q2
    research1.Q3 = questionResults.Q3
    research1.Q4 = questionResults.Q4
    research1.Q5 = questionResults.Q5
    research1.Q6 = questionResults.Q6
    research1.Q7 = questionResults.Q7
    research1.Q8 = questionResults.Q8
    research1.Q9 = questionResults.Q9
    research1.Q10 = questionResults.Q10
    research1.Q11 = questionResults.Q11
    research1.Q12 = questionResults.Q12
    research1.Q13 = questionResults.Q13
    research1.Q14 = questionResults.Q14
    research1.Q15 = questionResults.Q15
    research1.Q16 = questionResults.Q16
    research1.Q17 = questionResults.Q17
    research1.Q18 = questionResults.Q18
    research1.Q19 = questionResults.Q19
    research1.Q20 = questionResults.Q20
    session.add(research1)
    session.commit()
    return questionResults


# ユーザ情報を登録 POST
@app.post("/user")
# クエリでnameとstrを受け取る
# /user?name="三郎"&age=10
async def create_user(name: str, age: int):
    user = UserTable()
    user.name = name
    user.age = age
    session.add(user)
    session.commit()

# 複数のユーザ情報を更新 PUT


@app.put("/users")
# modelで定義したUserモデルのリクエストbodyをリストに入れた形で受け取る
# users=[{"id": 1, "name": "一郎", "age": 16},{"id": 2, "name": "二郎", "age": 20}]
async def update_users(users: List[User]):
    for new_user in users:
        user = session.query(UserTable).filter(
            UserTable.id == new_user.id).first()
        user.name = new_user.name
        user.age = new_user.age
        session.commit()