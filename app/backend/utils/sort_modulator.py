def sort_modulators(modulators_params:list):
    return sorted(modulators_params, key=lambda params: (float(params['ratioToFoundamentalFrequency']), float(params['modulationIndex'])))