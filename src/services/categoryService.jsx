import axios from 'axios';
import { API_CATEGORY, API_DELETECATEGORY, API_LISTCATEGORY } from './constant';

export default class categoryService {
    inserCategory = async (category) => {
        return await axios.post(API_CATEGORY, category);
    };
    getCategories = async () => {
        return await axios.get(API_LISTCATEGORY);
    };
    deleteCategory = async (id) => {
        return await axios.delete(API_DELETECATEGORY + '/' + id);
    };
    getCategory = async (id) => {
        return await axios.get(API_CATEGORY + '/' + id + '/get');
    };
    updateCategory = async (id, category) => {
        return await axios.patch(API_CATEGORY + '/' + id, category);
    };
}
