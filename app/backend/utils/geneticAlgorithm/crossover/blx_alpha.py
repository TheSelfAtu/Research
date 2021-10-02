def exec_blx_alpha(parents_chromosomes: list) -> dict:
    parents1 = parents_chromosomes[0]
    parents2 = parents_chromosomes[1]
    most_fit_chromosome = max(
        chromosomes_params.values(), key=lambda params: params["fitness"])
    return most_fit_chromosome
