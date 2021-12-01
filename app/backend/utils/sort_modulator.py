def sort_modulators(modulators_params:list):
    return sorted(modulators_params, key=lambda params: (float(params['ratioToFundamentalFrequency']), float(params['modulationIndex'])))