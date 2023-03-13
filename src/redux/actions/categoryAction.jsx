import categoryService from '~/services/categoryService';
import {
    CATEGORIES_SET,
    CATEGORY_DELETE,
    CATEGORY_SET,
    CATEGORY_STATE_CLEAR,
    CATEGORY_UPDATE,
    COMMON_ERROR_SET,
    COMMON_LOADING_SET,
    COMMON_MESSAGE_SET,
} from './actionTypes';

export const inserCategory = (category, navigate) => async (dispatch) => {
    const service = new categoryService();

    try {
        console.log('insert category');

        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.inserCategory(category);
        if (response.status === 201) {
            dispatch({
                type: CATEGORY_SET,
                payload: response.data,
            });
            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: 'Category is saved',
            });
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            });
        }
        console.log(response);
    } catch (error) {
        console.log('Error' + error);
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        });
    }
    dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
    });

    navigate('/categories/list');
};

export const updateCategory = (id, category, navigate) => async (dispatch) => {
    const service = new categoryService();

    try {
        console.log('update category');

        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.updateCategory(id, category);
        if (response.status === 201) {
            dispatch({
                type: CATEGORY_UPDATE,
                payload: response.data,
            });
            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: 'Category is updated',
            });
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            });
        }
        console.log(response);
    } catch (error) {
        console.log('Error' + error);
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        });
    }
    dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
    });

    navigate('/categories/list');
};

export const getCategories = () => async (dispatch) => {
    const service = new categoryService();

    try {
        console.log('get categories');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.getCategories();

        console.log(response);

        if (response.status === 200) {
            dispatch({
                type: CATEGORIES_SET,
                payload: response.data,
            });
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            });
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        });
    }
    dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
    });
};

export const deleteCategory = (id) => async (dispatch) => {
    const service = new categoryService();

    try {
        console.log('delete categories');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.deleteCategory(id);

        console.log(response);

        if (response.status === 200) {
            dispatch({
                type: CATEGORY_DELETE,
                payload: id,
            });
            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: response.data,
            });
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            });
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        });
    }
    dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
    });
};

export const getCategory = (id) => async (dispatch) => {
    const service = new categoryService();

    try {
        console.log('get categories');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.getCategory(id);

        if (response.status === 200) {
            dispatch({
                type: CATEGORY_SET,
                payload: response.data,
            });
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            });
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        });
    }
    dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
    });
};

export const clearCategoryState = () => (dispatch) => {
    dispatch({ type: CATEGORY_STATE_CLEAR });
};

export const clearCategory = () => (dispatch) => {
    dispatch({ type: CATEGORY_SET, payload: { id: '', name: '', status: 'Visible' } });
};
