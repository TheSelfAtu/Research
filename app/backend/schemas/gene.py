# モデルの定義
from pydantic import BaseModel

class Gene(BaseModel):
    id: int
    # algorithmNum:int
    dict