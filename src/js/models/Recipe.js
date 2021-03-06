import axios from 'axios';
import {API_KEY} from '../config'

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe () {
        try {
            const res = await axios(`https://www.food2fork.com/api/get?key=${API_KEY}&rId=${this.id}`);
            
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.image_url = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error) {
            alert(error);
        }
    }

    calcTime() {
        // Assume 15 min / 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }
}