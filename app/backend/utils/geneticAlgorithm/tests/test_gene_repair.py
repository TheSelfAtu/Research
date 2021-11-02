import unittest
from ..gene_repair.fm_params.repair import *


class Repair(unittest.TestCase):
    """
    """

    def test_round_off_to_one(self):
        """四捨五入を行える 
        """
        ratio = 1.0
        expected = 1.0
        actual = round_off_to_one(1.0)
        self.assertEqual(-0.5, 1)
        self.assertEqual(1, 1)
        self.assertEqual(1.4, 1)
        self.assertEqual(1.5, 2)
        self.assertEqual(1.5, 2)


if __name__ == "__main__":
    unittest.main()
