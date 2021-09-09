import math
import random

# MODULATION_INDEX_CANDIDATE = [0]
MODULATION_INDEX_CANDIDATE = [0, 1, 10, 100, 200, 500, 1000]
MODULATION_INDEX_CANDIDATE = [500]
MODULATION_INDEX_CANDIDATE = list(range(0, 2000, 50))
FREQUENCY_CANDIDATE = [440, 880]
# FREQUENCY_CANDIDATE = [440]
# RATIO_CANDIDATE = [0.05]
# RATIO_CANDIDATE = [0.01, 1, 2, 3]
RATIO_CANDIDATE = [0.1, 1, 2, 3]
RATIO_CANDIDATE = [random.random() for i in range(5)] + [0.01, 1, 2, 3]
ALGORITHM_CANDIDATE = [0]
# ALGORITHM_CANDIDATE = [3]

# エンベロープの候補
ATTACK_CANDIDATE = [0, 0.1, 0.2, 0.3, 0.4]
ATTACK_CANDIDATE = [0]
DECAY_CANDIDATE = [0]
# DECAY_CANDIDATE = [0, 0.1]
SUSTAIN_CANDIDATE = [1]
RELEASE_CANDIDATE = [1]
RELEASE_CANDIDATE = [0.1, 0.2, 0.3, 0.4, 0.5]


def make_gene_params():
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
        "algorithmNum": ALGORITHM_CANDIDATE[math.floor(random.random() * len(ALGORITHM_CANDIDATE))],
        "fitness": ""
    }


def make_fm_params():
    return {
        "attack": ATTACK_CANDIDATE[math.floor(random.random() * len(ATTACK_CANDIDATE))],
        "decay": DECAY_CANDIDATE[math.floor(random.random() * len(DECAY_CANDIDATE))],
        "sustain": SUSTAIN_CANDIDATE[math.floor(random.random() * len(SUSTAIN_CANDIDATE))],
        "release": RELEASE_CANDIDATE[math.floor(random.random() * len(RELEASE_CANDIDATE))],
        "frequency": FREQUENCY_CANDIDATE[math.floor(random.random() * len(FREQUENCY_CANDIDATE))],
        "ratioToFoundamentalFrequency": RATIO_CANDIDATE[math.floor(random.random() * len(RATIO_CANDIDATE))],
        "modulationIndex": MODULATION_INDEX_CANDIDATE[math.floor(random.random() * len(MODULATION_INDEX_CANDIDATE))]
    }


# def make_fm_params():
#     return {
#         "attack": 0,
#         "decay": 0,
#         "sustain": 1,
#         "release": 0.2,
#         "frequency": 440,
#         "ratioToFoundamentalFrequency": 1,
#         "modulationIndex": MODULATION_INDEX_CANDIDATE[math.floor(random.random() * len(MODULATION_INDEX_CANDIDATE))]
#     }

# def make_fm_params():
#     return {
#         # "attack": math.floor((1 / math.tan(get_random_f(math.atan(2), math.pi / 2))) * 100) / 100,
#         "attack": get_random_f(0, 0),
#         "decay": get_random_f(0, 0),
#         "sustain": get_random_f(1, 1),
#         "release": get_random_f(0, 0.3),
#         "frequency": FREQUENCY_CANDIDATE[math.floor(random.random() * len(FREQUENCY_CANDIDATE))],
#         "ratioToFoundamentalFrequency": RATIO_CANDIDATE[math.floor(random.random() * len(RATIO_CANDIDATE))],
#         "modulationIndex": MODULATION_INDEX_CANDIDATE[math.floor(random.random() * len(MODULATION_INDEX_CANDIDATE))]
#     }


def get_random_param(min: int, max: int):
    param = math.floor(random.random() * (max + 1 - min)) + min
    param = math.floor(param * 100) / 100
    return param


def get_random_f(min: float, max: float):
    param = random.random() * (max - min) + min
    param = math.floor(param * 100) / 100
    return param
