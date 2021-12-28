import os
import json
import glob


def create_fit_chromosome_json(gion:str):
    result_paths:list = glob.glob(f"./results/{gion}/*.json")
    best_fit_chromosomes:dict = {}
    for path in result_paths:
        with open(path, 'r') as f:            
            read_result = json.load(f)
            final_generation_chromosome = read_result[12]
            print(final_generation_chromosome)
# キャリア周波数に対する比率で昇順にソート,同じ場合は変調指数でソート（モジュレータの周波数がキャリアの周波数に依存しない実装の場合に有効）
    # return sorted(modulators_params, key=lambda params: (float(params['ratioToFundamentalFrequency']),float(params['frequency']), float(params['modulationIndex'])))
# 変調指数でソート
    # return sorted(modulators_params, key=lambda params: (float(params['modulationIndex'])))
