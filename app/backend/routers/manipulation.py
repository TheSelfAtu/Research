from typing import Dict, Optional, Union
from typing import Optional
from utils.geneticAlgorithm.config import ALGORITHM_NUM, GENERATION_CHROMOSOME_NUM
from schemas.chromosome import ChromosomeParams, ChromosomesParams
from utils.geneticAlgorithm.gene_repair.fm_params.repair import repair_fm_params
from utils.geneticAlgorithm.mutate.mutate_fm_params.mutate import mutate
from utils.geneticAlgorithm.crossover.blx_alpha import exec_blx_alpha
from utils.geneticAlgorithm.selection.elite_selection import exec_elite_selection
from utils.geneticAlgorithm.selection.tournament_selection import exec_tournament_selection
from utils.geneticAlgorithm.make_chromosome_params import make_chromosome_params
from utils.log.log import log
from fastapi import APIRouter, Cookie
import sys
import pathlib
# current_dir = pathlib.Path(__file__).resolve().parent
# モジュールのあるパスを追加
# sys.path.append(str(current_dir) + '/../')
router = APIRouter()


@router.get("/manipulation/make-ramdom/all")
async def make_generation_chromosomes():
    return {
        "chromosome1": make_chromosome_params(),
        "chromosome2": make_chromosome_params(),
        "chromosome3": make_chromosome_params(),
        "chromosome4": make_chromosome_params(),
        "chromosome5": make_chromosome_params(),
        "chromosome6": make_chromosome_params(),
        "chromosome7": make_chromosome_params(),
        "chromosome8": make_chromosome_params(),
        "chromosome9": make_chromosome_params(),
        "chromosome10": make_chromosome_params()
    }


@router.post("/manipulation")
async def gene_manipulation(chromosomes_params: ChromosomesParams, random_strings: Optional[str] = Cookie(None)) -> ChromosomesParams:
    # 被験者名
    chromosomes_params = chromosomes_params.dict()
    name = chromosomes_params.pop('name')
    # 回答を記録
    # 呼び出し元ファイルからの相対パスを渡す（今回はbackend）
    log_path = "./results/" + name + random_strings + ".txt"
    log(log_path, chromosomes_params)
    # 次世代の染色体用配列
    next_generation_chromosomes: list[dict] = []
    # オシレーターをソート
    # for chromosome in chromosomes_params:
    # oscillator_params = [chromosome.fmParamsList.operator1]
    # print(type(chromosomes_params), chromosomes_params, chromosome)
    # エリート個体を次世代に残す
    elite_chromosome = exec_elite_selection(dict(chromosomes_params))
    elite_chromosome["fitness"] = ""
    next_generation_chromosomes.append(elite_chromosome)
    # 交叉による次世代個体の追加
    for i in range(len(next_generation_chromosomes), GENERATION_CHROMOSOME_NUM):
        # parents = exec_tournament_selection(dict(chromosomes_params))
        parents = exec_tournament_selection(chromosomes_params)
        offspring = exec_blx_alpha(parents, repair_fm_params, mutate)
        offspring["fitness"] = ""
        offspring["algorithmNum"] = ALGORITHM_NUM
        next_generation_chromosomes.append(offspring)
    return {
        "chromosome1": next_generation_chromosomes[0],
        "chromosome2": next_generation_chromosomes[1],
        "chromosome3": next_generation_chromosomes[2],
        "chromosome4": next_generation_chromosomes[3],
        "chromosome5": next_generation_chromosomes[4],
        "chromosome6": next_generation_chromosomes[5],
        "chromosome7": next_generation_chromosomes[6],
        "chromosome8": next_generation_chromosomes[7],
        "chromosome9": next_generation_chromosomes[8],
        "chromosome10": next_generation_chromosomes[9]
    }
