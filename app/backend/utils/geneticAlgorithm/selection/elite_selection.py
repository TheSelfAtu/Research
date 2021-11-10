from typing import List

def exec_elite_selection(chromosomes_params: dict) -> dict:
    most_fit_chromosome = max(
        chromosomes_params.values(), key=lambda params: params["fitness"])
    print(most_fit_chromosome)
    return most_fit_chromosome
