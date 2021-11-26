from typing import NamedTuple, TypedDict

ALGORITHM_NUM = 0

class FMParams(TypedDict):
    attack:float
    decay:float
    sustain: float
    sustain_time: float
    release: float
    frequency: float
    ratio_to_foundamental_frequecy:int
    modulation_index: float

def make_fm_params(fm_params:FMParams):
    """2オペレータでノコギリ波発生することを確認するメソッド

    Returns:
        [type]: [description]
    """
    return {
        "attack": fm_params.attack,
        "decay": fm_params.decay,
        "sustain": fm_params.sustain,
        "sustainTime": fm_params.sustain_time,
        "release": fm_params.release,
        "frequency": fm_params.frequency,
        "ratioToFoundamentalFrequency": fm_params.ratio_to_foundamental_frequecy,
        "modulationIndex": fm_params.modulation_index
    }
# def make_fm_params(fmParams:FMParams):
#     """2オペレータでノコギリ波発生することを確認するメソッド

#     Returns:
#         [type]: [description]
#     """
#     return {
#         "attack": 0,
#         "decay": 0,
#         "sustain": 1,
#         "sustainTime": 1,
#         "release": 0,
#         "frequency": 440,
#         "ratioToFoundamentalFrequency": 1,
#         "modulationIndex": random.uniform(2000, 2000)
#     }
