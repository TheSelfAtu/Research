import math
import random

from ...make_fm_params.make_with_args import make_fm_params 
from ...make_fm_params.make_zero_params import make_zero_params

fm_params = {
    "attack" :0,
    "decay" : 0,
    "sustain" : 0,
    "decay" : 0,
    "decay" : 0,
    "decay" : 0,
}

def make_chromosome_params():
    """整数倍音のみが発生することを確認

    Returns:
        [type]: [description]
    """
    return {
        "fmParamsList": {
            "operator1": make_fm_params(fm_params),
            "operator2": make_fm_params(),
            "operator3": make_zero_params(),
            "operator4": make_zero_params(),
        },
        "algorithmNum": 0,
        "fitness": ""
    }
