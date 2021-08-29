import math
import random

MODULATION_INDEX_CANDIDATE = [0]
# MODULATION_INDEX_CANDIDATE = [0, 1, 10, 100, 200, 500,1000,2000]
# FREQUENCY_CANDIDATE = [440, 880]
FREQUENCY_CANDIDATE = [440]
RATIO_CANDIDATE = [0.05,1, 1.5, 2,3]
RATIO_CANDIDATE = [1]
ALGORITHM_CANDIDATE = [0]
# ALGORITHM_CANDIDATE = [1,2,3,4]
def make_gene_params() :
    """
    ランダムな初期値を与えた 遺伝子のパラメーターを生成する。

    Returns
    -------
    problem : SendMoreMoneyProblem
        生成されたインスタンス。各文字には0～9までの範囲で
        数値が重複しない形で値が設定される。
    """
   
    return {
    "fmParamsList":{
      "operator1": make_fm_params(),
      "operator2": make_fm_params(),
      "operator3": make_fm_params(),
      "operator4": make_fm_params(),
    },
    "algorithmNum":ALGORITHM_CANDIDATE[math.floor(random.random() * len(ALGORITHM_CANDIDATE))],
    "fitness":""
    }

def make_fm_params():
  return {
    "attack":
    "decay":
    "sustain":get_random_f(0,1),
    "release":get_random_f(0,0.5),
    "frequency":FREQUENCY_CANDIDATE[math.floor(random.random() * len(FREQUENCY_CANDIDATE))],
    "ratioToFoundamentalFrequency":RATIO_CANDIDATE[math.floor(random.random() * len(RATIO_CANDIDATE))],
    "modulationIndex":MODULATION_INDEX_CANDIDATE[math.floor(random.random() * len(MODULATION_INDEX_CANDIDATE))]    
  }
# def make_fm_params():
#   return {
#     "attack":math.floor((1 / math.tan(get_random_f(math.atan(2), math.pi / 2))) * 100) /100,
#     "decay":get_random_f(0,1),
#     "sustain":get_random_f(0,1),
#     "release":get_random_f(0,0.5),
#     "frequency":FREQUENCY_CANDIDATE[math.floor(random.random() * len(FREQUENCY_CANDIDATE))],
#     "ratioToFoundamentalFrequency":RATIO_CANDIDATE[math.floor(random.random() * len(RATIO_CANDIDATE))],
#     "modulationIndex":MODULATION_INDEX_CANDIDATE[math.floor(random.random() * len(MODULATION_INDEX_CANDIDATE))]    
#   }

def get_random_param(min:int, max: int) :
  param = math.floor(random.random() * (max + 1 - min)) + min
  param = math.floor(param * 100) / 100
  return param

def get_random_f(min: float, max: float): 
  param = random.random() * (max - min) + min
  param = math.floor(param * 100) / 100
  return param

