# モデルの定義
from pydantic import BaseModel


class ChromosomesParams(BaseModel):
    dict
# class ChromosomesParams(BaseModel):
#     chromosome1:dict
#     chromosome2:dict
#     chromosome3:dict
#     chromosome4:dict
#     chromosome5:dict
#     chromosome6:dict
#     chromosome7:dict
#     chromosome8:dict
#     chromosome9:dict
#     chromosome10:dict


class ChromosomeParams(BaseModel):
    operator1: dict
    operator2: dict
    operator3: dict
    operator4: dict
