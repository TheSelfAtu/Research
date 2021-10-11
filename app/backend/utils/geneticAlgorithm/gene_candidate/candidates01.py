import math
import random

# MODULATION_INDEX_CANDIDATE = list(range(0, 2000, 50))
# FREQUENCY_CANDIDATE = [440, 880]
RATIO_CANDIDATE = [0.1, 1, 2, 3]
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
        "attack": random.uniform(0,0.5),
        "decay": DECAY_CANDIDATE[math.floor(random.random() * len(DECAY_CANDIDATE))],
        "sustain": SUSTAIN_CANDIDATE[math.floor(random.random() * len(SUSTAIN_CANDIDATE))],
        "release": random.uniform(0,0.5),
        "frequency": random.uniform(300,880),
        "ratioToFoundamentalFrequency": RATIO_CANDIDATE[math.floor(random.random() * len(RATIO_CANDIDATE))],
        "modulationIndex": random.uniform(0,200)
    }
