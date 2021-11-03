import math
import random

from .config import ALGORITHM_NUM
# from .make_fm_params.make_with_config import make_fm_params
# from .make_fm_params.make_sawtooth import make_fm_params, ALGORITHM_NUM
from .make_fm_params.make_even_overtones import make_fm_params, ALGORITHM_NUM


def make_chromosome_params():
    """ランダムな値を持つ個体を生成する

    Returns:
        [type]: [description]
    """
    return {
        "fmParamsList": {
            "operator1": make_fm_params(),
            "operator2": make_fm_params(),
            "operator3": make_fm_params(),
            "operator4": make_fm_params(),
        },
        "algorithmNum": ALGORITHM_NUM,
        "fitness": ""
    }
