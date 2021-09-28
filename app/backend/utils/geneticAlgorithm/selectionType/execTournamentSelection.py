from typing import List
from heapq import nlargest
from random import choices
Chromosomes = List[str,dict]

def exec_tournament_selection(self) ->  List[Chromosomes]:
        """
        トーナメント選択を行い、交叉などで利用するための2つの個体
        （染色体）を取得する。

        Returns
        -------
        selected_chromosomes : list of Chromosome
            選択された2つの個体（染色体）を格納したリスト。トーナメント
            用に引数で指定された件数分抽出された中から上位の2つの個体が
            設定される。
        """
        participants_num: int = len(self._population) // 2
        participants: List[Chromosomes] = choices(self._population, k=participants_num)
        selected_chromosomes: List[Chromosomes] = nlargest(n=2, iterable=participants)
        return selected_chromosomes
