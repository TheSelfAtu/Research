from .ratio_frequency import repair_frequency_ratio

def repair_fm_parms(param_name:str, fm_param:str):
    if param_name == "ratioToFoundamentalFrequency":
        return repair_frequency_ratio(fm_param)
    return fm_param