import Search from './models/Search';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import Recipe from './models/Recipe';

const state = {};

/** 
 * 
 * Search Controller 
 * 
 * */
const controlSearch = async () => {
    // TODO : get string from UI
    const query = searchView.getInput();

    if (query) {
        state.search = new Search(query);

        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        // Call the function
        try {
            await state.search.getResults();

            // Show loader

            clearLoader();
            // Render results
            searchView.renderResults(state.search.result);
        } catch (error) {
            alert(error);
            clearLoader(); 
        }

    }
}

elements.searchForm.addEventListener('submit', event => {
    event.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', (event) => {
    const button = event.target.closest('.btn-inline');
    if (button) {
        const goToPage = parseInt(button.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);

    }
});

/**
 * 
 * Recipe Controller
 * 
 */

const controlRecipe = async () => {
    console.log('here');
    const id = window.location.hash.replace('#', '');
    if (id) {
        state.recipe = new Recipe(id);

        try {
            await state.recipe.getRecipe();

            state.recipe.calcTime();
            state.recipe.calcServings();

            console.log(state.recipe);
        } catch (error) {
            alert('Error Processing Recipe');
        }
    }
};


['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


