import math
import random
from .gene_candidate.candidates01 import make_fm_params

def make_chromosome_params():
    """
    ランダムな初期値を与えた 遺伝子のパラメーターを生成する。

    Returns
    -------
    problem : SendMoreMoneyProblem
        生成されたインスタンス。各文字には0～9までの範囲で
        数値が重複しない形で値が設定される。
    """

    return {
        "fmParamsList": {
            "operator1": make_fm_params(),
            "operator2": make_fm_params(),
            "operator3": make_fm_params(),
            "operator4": make_fm_params(),
        },
        "algorithmNum": 4,
        "fitness": ""
    }


