import math
import random

from .config import ALGORITHM_NUM
from .gene_candidate.candidates01 import make_fm_params
# from .gene_candidate.sawtooth import make_fm_params, ALGORITHM_NUM
# from .gene_candidate.test_even_overtones import make_fm_params, ALGORITHM_NUM


def make_chromosome_params():
    """ランダムな値を持つ初期個体を生成する

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
