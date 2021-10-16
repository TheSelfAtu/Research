from decimal import Decimal, ROUND_HALF_UP
def repair_frequency_ratio(ratio:float):
    if ratio < 1.0:
        ratio = 1.0
    ratio = str(ratio)
    ratio = Decimal(str(ratio)).quantize(Decimal('0'), rounding=ROUND_HALF_UP)

    return float(ratio)