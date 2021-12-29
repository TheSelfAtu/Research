import os
import json
from typing import Optional
from schemas.chromosome import  ChromosomesParams
from utils.log.log import log
from utils.create_fit_chromosome_json import create_fit_chromosome_json
from utils.validation.validation import validation

from fastapi import APIRouter, Cookie

router = APIRouter()

@router.get("/evaluation/{gion}/create")
async def create_json_for_evaluate(gion:str):
    create_fit_chromosome_json(gion,f"./best_fit_chromosomes/{gion}/best_fit.json")
    return {"result":"jsonファイルが作成されました"}

@router.post("/evaluation/log")
async def gene_manipulation(chromosomes_params: ChromosomesParams, giongo: Optional[str] = Cookie(None), random_strings: Optional[str] = Cookie(None)) -> ChromosomesParams:
    chromosomes_params: dict = chromosomes_params.dict()
    # 被験者名
    name = chromosomes_params.pop('name')
    age = chromosomes_params.pop('age')
    gender = chromosomes_params.pop('gender')

    # # 入力のバリデーション
    validation(name,age,gender,chromosomes_params)
    # 回答を記録
    # 呼び出し元ファイルからの相対パスを渡す（今回はbackend）
    log_path = "./results/" + f"{giongo}/" + name + random_strings + ".txt"
    log(log_path, chromosomes_params)
    return {"greeting":"実験へのご協力ありがとうございます。"}

@router.get("/evaluation/{gion}/initialize")
async def initialize_chromosomes(gion:str) -> json:
    evaluation_chromosomes_file_path :str= f"./best_fit_chromosomes/{gion}/best_fit.json"
    with open(evaluation_chromosomes_file_path, 'r') as f:
        read_data = json.load(f)
        return read_data

