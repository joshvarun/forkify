import axios from 'axios';

const API_KEY = '631e06cfde7b21bac0f37f4d521d33e4';
export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {

        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${API_KEY}&q=${this.query}`);
            this.result = res.data.recipes;
            console.log(res);
        } catch (error) {
            alert(error);
        }
    };
}