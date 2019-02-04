import Search from './models/Search';
import { elements as elements } from './views/base';
import * as searchView from './views/searchView';

const state = {};

const controlSearch = async () => {
    // TODO : get string from UI
    const query = searchView.getInput();

    if (query) {
        state.search = new Search(query);
        // Call the function
        await state.search.getResults();

        // Show loader

        // Render results
        console.log(state.search.result);
        searchView.renderResults(state.search.result);
        searchView.clearInput();
    }
}

elements.searchForm.addEventListener('submit', event => {
    event.preventDefault();
    controlSearch();
});
