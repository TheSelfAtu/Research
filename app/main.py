from fastapi import FastAPI
from typing import List  # ネストされたBodyを定義するために必要
from starlette.middleware.cors import CORSMiddleware  # CORSを回避するために必要
from db import session  # DBと接続するためのセッション
from model import UserTable, User, Research1Table, Research1  # 今回使うモデルをインポート
from model import Research0Table, Research0  # 今回使うモデルをインポート
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

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


@app.get("/research0")
def readResearch0Results():
    results = session.query(Research0Table).all()
    return results


@app.get("/research1")
def readResearch1Results():
    results = session.query(Research1Table).all()
    return results


@app.post("/research0")
def postResearch0Results(questionResults: Research0):
    research0 = Research0Table()
    research0.name = questionResults.name
    research0.Q1 = questionResults.Q1
    research0.Q2 = questionResults.Q2
    research0.Q3 = questionResults.Q3
    research0.Q4 = questionResults.Q4
    research0.Q5 = questionResults.Q5
    research0.Q6 = questionResults.Q6
    research0.Q7 = questionResults.Q7
    research0.Q8 = questionResults.Q8
    research0.Q9 = questionResults.Q9
    research0.Q10 = questionResults.Q10
    research0.Q11 = questionResults.Q11
    research0.Q12 = questionResults.Q12
    research0.Q13 = questionResults.Q13
    research0.Q14 = questionResults.Q14
    research0.Q15 = questionResults.Q15
    research0.Q16 = questionResults.Q16
    research0.Q17 = questionResults.Q17
    research0.Q18 = questionResults.Q18
    research0.Q19 = questionResults.Q19
    research0.Q20 = questionResults.Q20
    research0.Q21 = questionResults.Q21
    research0.Q22 = questionResults.Q22
    research0.Q23 = questionResults.Q23
    research0.Q24 = questionResults.Q24
    research0.Q25 = questionResults.Q25
    research0.Q26 = questionResults.Q26
    research0.Q27 = questionResults.Q27
    research0.Q28 = questionResults.Q28
    session.add(research0)
    session.commit()
    return questionResults


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
