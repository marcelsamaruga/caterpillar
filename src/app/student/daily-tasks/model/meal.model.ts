import { FoodQuantity } from './food-quantity.enum';
import { MealType } from './meal-type.enum';
export class Meal {
    constructor(
        public id: string,
        public mealType: MealType,
        public foodQuantity: FoodQuantity,
        public description?: string
    ) {

    }
}