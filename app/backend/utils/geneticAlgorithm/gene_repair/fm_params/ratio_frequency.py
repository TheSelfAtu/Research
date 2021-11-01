from decimal import Decimal, ROUND_HALF_UP

def round_off_to_one(number:float):
    ratio = Decimal(str(number)).quantize(Decimal('0'), rounding=ROUND_HALF_UP)
    return float(ratio)
