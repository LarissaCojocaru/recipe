import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

// private recipes: Recipe[] = [

  //  new Recipe(
  //    'Tasty Snitzel',
  //    'This is simply a test',
  //    'https://www.pomodoropizza.ro/wp-content/uploads/2021/02/snitel-vienez.jpg',
  //    [
  //      new Ingredient('Meat', 1),
  //      new Ingredient('Frech Fries', 20),
  //   ]),

  //  new Recipe(
  //    'A Big Burger',
  //    'This is simply a test',
  //    'https://www.bigbelly-cluj.ro/filehandler/Productfile/0x0/classic-burger-big-belly-cluj-1062.jpg',
  //  [
  //    new Ingredient('Bread', 2),
  //    new Ingredient('Meat', 1),
  //  ]),

 // ];

 private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService){};

  setRecipes(recipes: Recipe[]){
   this.recipes = recipes;
   this.recipesChanged.next(this.recipes.slice());
   console.log('setting recipes; ', this.recipes.slice());
  }

getRecipes(){
  console.log('getting recipes: ', this.recipes.slice());
  return this.recipes.slice();
}

getRecipe(index: number){
  return this.recipes[index]
}

addIngredientsToShoppingList(ingredients: Ingredient[]){
  this.slService.addIngredients(ingredients)
}
addRecipe(recipe: Recipe){
  this.recipes.push(recipe);
  this.recipesChanged.next(this.recipes.slice())
}

updateRecipe(index: number, recipe: Recipe){
  this.recipes[index] = new Recipe(recipe.name,
    recipe.description,
    recipe.imagePath,
    recipe.ingredients);
  this.recipesChanged.next(this.recipes.slice())

}

deleteRecipe(index:number){
  this.recipes.splice(index, 1);
  this.recipesChanged.next(this.recipes.slice());
}

}
