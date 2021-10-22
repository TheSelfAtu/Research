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
# @app.get("/items/")
# async def read_items(ads_id: Optional[str] = Cookie(None)):
#     return {"ads_id": ads_id}

@app.get("/")
async def main():
    random_strings = [random.choice(string.ascii_letters + string.digits)
                      for i in range(7)]
    cookie_value = ''.join(random_strings)
    response = FileResponse(template_file_path)
    response.set_cookie(key="session", value=cookie_value)
    return response

app.include_router(manipulation.router)
