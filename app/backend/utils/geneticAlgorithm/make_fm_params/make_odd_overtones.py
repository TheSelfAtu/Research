import math
import random

ALGORITHM_NUM = 0


def make_fm_params():
    """2オペレータで奇数倍音のみが発生することを確認するメソッド

    Returns:
        [type]: [description]
    """
    return {
        "attack": 0,
        "decay": 0,
        "sustain": 1,
        "sustainTime": 1,
        "release": 0,
        "frequency": 500,
        "ratioToFoundamentalFrequency": 2,
        "modulationIndex": random.uniform(500, 500)
    }
