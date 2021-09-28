from typing import List
from fastapi import APIRouter
from utils.geneticAlgorithm.make_chromosome_params import make_chromosome_params
from utils.geneticAlgorithm.selection.tournament_selection import exec_tournament_selection 
from utils.geneticAlgorithm.selection.elite_selection import exec_elite_selection 
from schemas.chromosome import ChromosomesParams
router = APIRouter()

@router.get("/manipulation/make-ramdom/all")
async def make_generation_chromosomes():
    return {
        "chromosome1":make_chromosome_params(),
        "chromosome2":make_chromosome_params(),
        "chromosome3":make_chromosome_params(),
        "chromosome4":make_chromosome_params(),
        "chromosome5":make_chromosome_params(),
        "chromosome6":make_chromosome_params(),
        "chromosome7":make_chromosome_params(),
        "chromosome8":make_chromosome_params(),
        "chromosome9":make_chromosome_params(),
        "chromosome10":make_chromosome_params()
        }

@router.post("/manipulation")
async def gene_manipulation(chromosomes_params:ChromosomesParams):
    next_generation_chromosomes:List[dict] = []
    elite_chromosome = exec_elite_selection(chromosomes_params)
    # next_generation_chromosomes
    # parents = exec_tournament_selection()
    