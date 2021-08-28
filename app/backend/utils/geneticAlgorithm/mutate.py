    def mutate(self) -> None:
        """
        個体を（突然）変異させる（ランダムに特定の文字の値を割り振られて
        いない数値で差し替える）。
        """
        target_char: str = choices(self.LETTERS, k=1)[0]
        not_assigned_num: int = self._get_not_assigned_num()
        self.letters_dict[target_char] = not_assigned_num
