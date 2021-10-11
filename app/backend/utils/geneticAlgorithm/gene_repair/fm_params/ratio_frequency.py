def repair_frequency_ratio(ratio:float):
    if ratio < 1.0:
        ratio = 1.0
    ratio = str(ratio)
    if len(ratio) >=2:
        ratio = ratio[0:3]
    return float(ratio)