import json
import glob
import csv

def create_analyze_file():
    gions:list = ["pi","bu-","fa-n","ti-n"]
    one_gion_results_paths:list = glob.glob(f"./fixed_evaluation_results/pi/*.json")
    one_gion_result_file_names = [file_name.split("/")[-1] for file_name in one_gion_results_paths]
    all_result:list = []
    for personal_file_name in one_gion_result_file_names:
        personal_result = [personal_file_name]
        for gion in gions:
            personal_result_path = f"./fixed_evaluation_results/{gion}/{personal_file_name}"
            with open(personal_result_path, 'r') as f:
                read_data:dict = json.load(f)
                for each_sound_result in read_data.values():
                    personal_result.extend(each_sound_result["fitness"])
        all_result.append(personal_result)
    with open("./analyzation/fitness.csv", 'w') as f:
        writer = csv.writer(f)
        writer.writerows(all_result)

def log(file_path: str, answer):
    if os.path.exists(file_path) == False:
        with open(file_path, 'w') as f:
            json.dump([answer], f)
        return
    
    with open(file_path, 'r') as f:
        read_data = json.load(f)
        save_data = read_data + [answer]

    with open(file_path, 'w') as f:
        json.dump(save_data, f)

    return


