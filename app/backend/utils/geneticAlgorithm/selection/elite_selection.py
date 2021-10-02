from typing import List

Chromosomes = dict


def tmp(params):
    print(params)
    print("fitness", params["fitness"])
    return "a"


def exec_elite_selection(chromosomes_params: dict) -> dict:
    # print("elite", type(chromosomes_params), dir(
    #     chromosomes_params), chromosomes_params.values())
    most_fit_chromosome = max(
        chromosomes_params.values(), key=lambda params: tmp(params))
    return most_fit_chromosome
