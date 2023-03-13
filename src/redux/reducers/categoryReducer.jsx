import {
    CATEGORIES_SET,
    CATEGORY_DELETE,
    CATEGORY_SET,
    CATEGORY_STATE_CLEAR,
    CATEGORY_UPDATE,
} from '../actions/actionTypes';

const initialState = {
    category: {},
    categories: [],
};

const categoryReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CATEGORY_SET:
            return { ...state, category: payload };
        case CATEGORIES_SET:
            return { ...state, categories: payload };
        case CATEGORY_UPDATE:
            return { ...state, categories: payload };
        case CATEGORY_STATE_CLEAR:
            return { category: {}, categories: [] };
        case CATEGORY_DELETE:
            return { ...state, categories: state.categories.filter((item) => item.id !== payload) };
        default:
            return state;
    }
};

export default categoryReducer;
