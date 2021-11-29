ALGORITHM_NUM = 0

def make_fm_params(
        attack:float,
        decay:float,
        sustain:float,
        sustain_time:float,
        release:float,
        frequency:float,
        ratio_to_foundamental_frequency:int,
        modulation_index:float
        ):

    """FMのパラメータを返す

    Returns:
        dict: [description]
    """
    return {
        "attack": attack,
        "decay": decay,
        "sustain": sustain,
        "sustainTime": sustain_time,
        "release": release,
        "frequency": frequency,
        "ratioToFoundamentalFrequency": ratio_to_foundamental_frequency,
        "modulationIndex": modulation_index
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
