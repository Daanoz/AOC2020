import { Puzzle, Runner, BasePuzzle, Result } from '../shared/'

export class PuzzleSolution extends BasePuzzle implements Puzzle {
    public run(): Result {
        const result: Result = {}

        const foods = this.getInputAsRows('\n')
        const allergenIngredients = new Map<string, string[]>()
        const list = foods.map(food => {
            const [ingredientList, allergenList] = food.split(' (contains ')
            const ingredients = ingredientList.split(' ')
            const allergens = allergenList.substr(0, allergenList.length - 1).split(', ')
            allergens.forEach(a => {
                if (!allergenIngredients.has(a)) {
                    allergenIngredients.set(a, [...ingredients])
                } else {
                    allergenIngredients.set(
                        a, 
                        allergenIngredients.get(a)!.filter((a) => ingredients.indexOf(a) >= 0)
                    )
                }
            })
            return { ingredients, allergens }
        })
        let availableAllergens = Array.from(allergenIngredients.keys())
        const ingredientsWithAllergens = availableAllergens
            .reduce((list, allergenName) => {
                allergenIngredients.get(allergenName)!.forEach(ingredient => {
                    if (list.indexOf(ingredient) < 0) {
                        list.push(ingredient)
                    }
                })
                return list
            }, [] as string[])
        result.a = list.reduce((sum, food) =>
            sum + food.ingredients.filter(ing => ingredientsWithAllergens.indexOf(ing) < 0).length
        , 0)

        const ingredientMap: Map<string, string> = new Map()
        while (availableAllergens.length > 0) {
            const allergenMatch = availableAllergens.find(a => allergenIngredients.get(a)!.length === 1)
            if (!allergenMatch) {
                throw new Error('No single allergen match')
            }
            const ingredient = allergenIngredients.get(allergenMatch)![0]
            ingredientMap.set(allergenMatch, ingredient)
            availableAllergens = availableAllergens.filter(a => a !== allergenMatch)
            availableAllergens.forEach(a => allergenIngredients.set(a, allergenIngredients.get(a)!.filter(ing => ing !== ingredient)))
        }
        result.b = Array.from(ingredientMap.keys()).sort().map(a => ingredientMap.get(a)!).join(',')

        return result
    }

}

Runner(PuzzleSolution)