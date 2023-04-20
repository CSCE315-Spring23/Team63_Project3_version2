from dataclasses import dataclass

@dataclass
class MenuItem():
    def __init__(self, itemNumber: int, food: str, price: float, ingredients: str):
        self.itemNumber = itemNumber
        self.food = food
        self.price = price
        self.ingredients = ingredients.split(",")

