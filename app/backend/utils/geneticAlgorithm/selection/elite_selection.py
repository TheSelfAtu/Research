from typing import List

Chromosomes = dict

def exec_elite_selection(chromosomes_params) -> dict:
    print("elite",dir(chromosomes_params))
    most_fit_chromosome = max(chromosomes_params,key=chromosomes_params.fitness)

