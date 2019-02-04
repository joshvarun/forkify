import Search from './models/Search';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';

const state = {};

const controlSearch = async () => {
    // TODO : get string from UI
    const query = searchView.getInput();

    if (query) {
        state.search = new Search(query);

        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        // Call the function
        await state.search.getResults();

        // Show loader
        
        clearLoader();
        // Render results
        searchView.renderResults(state.search.result);
        
    }
}

elements.searchForm.addEventListener('submit', event => {
    event.preventDefault();
    controlSearch();
});
