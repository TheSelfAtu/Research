import math
import random

ALGORITHM_NUM = 0

def make_fm_params():
    return {
        "attack": 0,
        "decay": 0,
        "sustain": 1,
        "sustainTime": 1,
        "release": 0,
        "frequency": 440,
        "ratioToFoundamentalFrequency": 1,
        "modulationIndex": random.uniform(2000, 2000)
    }
