from typing import Union
from .ratio_frequency import repair_frequency_ratio
from ...config import *


def repair_fm_params(param_name: str, fm_param: Union[float]):
    if param_name == "attack":
        fm_param = repair_lethal_gene(
            ATTACK_RANGE[0], ATTACK_RANGE[1], fm_param)
        return fm_param
    if param_name == "decay":
        fm_param = repair_lethal_gene(DECAY_RANGE[0], DECAY_RANGE[1], fm_param)
        return fm_param
    if param_name == "sustain":
        fm_param = repair_lethal_gene(
            SUSTAIN_RANGE[0], SUSTAIN_RANGE[1], fm_param)
        return fm_param
    if param_name == "sustainTime":
        fm_param = repair_lethal_gene(
            SUSTAIN_TIME_RANGE[0], SUSTAIN_TIME_RANGE[1], fm_param)
        return fm_param
    if param_name == "release":
        fm_param = repair_lethal_gene(
            RELEASE_RANGE[0], RELEASE_RANGE[1], fm_param)
        return fm_param
    if param_name == "frequency":
        fm_param = repair_lethal_gene(
            FREQUENCY_RANGE[0], FREQUENCY_RANGE[1], fm_param)
        return fm_param
    if param_name == "ratioToFoundamentalFrequency":
        fm_param = repair_lethal_gene(
            RATIO_TO_CARRIER_FREQUENCY_RANGE[0], RATIO_TO_CARRIER_FREQUENCY_RANGE[1], fm_param)
        return repair_frequency_ratio(fm_param)
    if param_name == "modulationIndex":
        fm_param = repair_lethal_gene(
            MODULATION_INDEX_RANGE[0], MODULATION_INDEX_RANGE[1], fm_param)
        return fm_param

    return fm_param


def repair_lethal_gene(min, max, fm_param):
    if fm_param <= min:
        return min
    if fm_param >= max:
        return max
    return fm_param
