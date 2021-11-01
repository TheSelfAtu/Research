# モデルの定義
from typing import Dict
from pydantic import BaseModel


# class ChromosomesParams(BaseModel):
# dict


class ChromosomeParams(BaseModel):
    algorithmNum: int
    fitness: int
    operator1: dict
    operator2: dict
    operator3: dict
    operator4: dict


class ChromosomesParams(BaseModel):
    chromosome1: Dict[]
    chromosome2: ChromosomeParams
    chromosome3: ChromosomeParams
    chromosome4: ChromosomeParams
    chromosome5: ChromosomeParams
    chromosome6: ChromosomeParams
    chromosome7: ChromosomeParams
    chromosome8: ChromosomeParams
    chromosome9: ChromosomeParams
    chromosome10: ChromosomeParams
    # name: str
