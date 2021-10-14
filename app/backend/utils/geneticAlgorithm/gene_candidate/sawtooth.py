import math
import random

# MODULATION_INDEX_CANDIDATE = list(range(0, 2000, 50))
# FREQUENCY_CANDIDATE = [440, 880]
RATIO_CANDIDATE = [random.random() for i in range(5)] + [0.01, 1, 2, 3]
RATIO_CANDIDATE = [1, 2, 3]
ALGORITHM_CANDIDATE = [1]

# エンベロープの候補
ATTACK_CANDIDATE = [0, 0.1, 0.2, 0.3, 0.4]
DECAY_CANDIDATE = [0]
SUSTAIN_CANDIDATE = [1]
RELEASE_CANDIDATE = [0.1, 0.2, 0.3, 0.4, 0.5]


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
