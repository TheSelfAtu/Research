import os
import json


def log_answer(file_path, answer):
    with open(file_path, 'r') as f:
        read_data = json.load(f)
        save_data = [read_data, answer]

    with open(file_path, 'w') as f:
        json.dump(save_data, f)


def log(file_path: str, answer):
    print(file_path, answer)
    name = answer.pop('name')
    log_answer(name+file_path, answer)
    return answer
