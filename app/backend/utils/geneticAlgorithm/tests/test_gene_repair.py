import unittest
from gene_repair.fm_params.ratio_frequency import *


class Repair(unittest.TestCase):
    """
    """

    def test_repair_frequency_ratio(self):
        """test method 
        """
        ratio = 1.0
        expected = 1.0
        actual = repair_frequency_ratio(1.0)
        self.assertEqual(expected, actual)


if __name__ == "__main__":
    unittest.main()
