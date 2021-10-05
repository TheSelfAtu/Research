def repair_frequency_ratio(ratio:float):
    ratio = str(ratio)
    if len(ratio) >=2:
        ratio = ratio[0:2]
    return float(ratio)