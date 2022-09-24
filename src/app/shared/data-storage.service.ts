import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { map } from 'rxjs/operators'

import { RecipeService } from "../recipes/recipes.service";


@Injectable({providedIn: 'root'})
export class DataStorageService   {
  [x: string]: any;

 constructor( private http: HttpClient, private recipeService: RecipeService){
 }

  storeRecipes() {
   const recipes = this.recipeService.getRecipes();
   this.http.put(
    'https://ng-course-recipe-book-9a390-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
    recipes
    )
    .subscribe( response => {
       console.log(response);
   });
  }

   fetchRecipes() {
    this.http
    .get<Recipe[]>(
      'https://ng-course-recipe-book-9a390-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            }
          })
        })
      )
      .subscribe(recipes => {
        this.recipeService.setRecipes(recipes);
      });
   }

}





