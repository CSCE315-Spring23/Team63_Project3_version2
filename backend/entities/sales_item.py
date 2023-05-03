from dataclasses import dataclass

@dataclass
class SalesItem():
    def __init__(self, pair: str, frequency: int):
        self.pair = pair
        self.frequency = frequency
        
