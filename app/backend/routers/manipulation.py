from fastapi import APIRouter
from utils.geneticAlgorithm.make_chromosome_params import make_chromosome_params
from utils.geneticAlgorithm.selection.tournament_selection import exec_tournament_selection
from utils.geneticAlgorithm.selection.elite_selection import exec_elite_selection
from utils.geneticAlgorithm.crossover.blx_alpha import exec_blx_alpha
from schemas.chromosome import ChromosomesParams

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
async def gene_manipulation(chromosomes_params: ChromosomesParams)->ChromosomesParams:
    next_generation_chromosomes: list[dict] = []
    generation_chromosome_num : int = 10
    # エリート個体を次世代に残す
    elite_chromosome = exec_elite_selection(dict(chromosomes_params))
    next_generation_chromosomes.append(elite_chromosome)
    # 交叉による次世代個体の追加
    for i in range(len(next_generation_chromosomes),generation_chromosome_num):
        parents = exec_tournament_selection(dict(chromosomes_params))
        offspring = exec_blx_alpha(parents)
        offspring["fitness"]=""
        offspring["algorithmNum"]= "1"
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
