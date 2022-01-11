
import json
import glob

def create_analyze_file():
    gions:list = ["pi","bu-","fa-n","ti-n"]
    result_pi_paths:list = glob.glob(f"./fixed_evaluation_results/pi/*.json")
    result:dict = {}
    for gion in result_pi_paths:
        result_paths:list = glob.glob(f"./fixed_evaluation_results/{gion}/*.json")
        sorted_paths = sorted(result_paths)
        print(sorted_paths)
        # best_fit_chromosomes:dict = {}
        # for path in result_paths:
        #     with open(path, 'r') as f:
        #         read_data = json.load(f)
        #         best_fit_chromosome = max(
        #         read_data[12].values(), key=lambda params: params["fitness"])

        #         best_fit_chromosomes[path] = best_fit_chromosome 

        # with open(save_path, 'w') as f:
        #     json.dump(best_fit_chromosomes, f)


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


