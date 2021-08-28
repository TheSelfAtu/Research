    def exec_crossover(
            self,
            other: SendMoreMoneyProblem) -> List[SendMoreMoneyProblem]:
        """
        引数に指定された別の個体を参照し交叉を実行する。

        Parameters
        ----------
        other : SendMoreMoneyProblem
            交叉で利用する別の個体。

        Returns
        -------
        result_chromosomes : list of SendMoreMoneyProblem
            交叉実行後に生成された2つの個体を格納したリスト。
        """
        child_1: SendMoreMoneyProblem = deepcopy(self)
        child_2: SendMoreMoneyProblem = deepcopy(other)

        for char in ('S', 'E', 'N', 'D'):
            child_2.letters_dict[char] = self.\
                _get_not_assigned_num_from_parent(
                    child=child_2,
                    parent=self,
                )
        for char in ('M', 'O', 'R', 'Y'):
            child_1.letters_dict[char] = \
                self._get_not_assigned_num_from_parent(
                    child=child_1,
                    parent=other,
                )

        result_chromosomes = [child_1, child_2]
        return result_chromosomes

