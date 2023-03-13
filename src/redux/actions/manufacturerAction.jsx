import manufacturerService from '~/services/manufacturerService';
import {
    COMMON_ERROR_SET,
    COMMON_LOADING_SET,
    COMMON_MESSAGE_SET,
    MANUFACTURERS_SET,
    MANUFACTURER_APPEND,
    MANUFACTURER_DELETE,
    MANUFACTURER_SET,
    MANUFACTURER_UPDATE,
} from './actionTypes';

export const insertManufacturer = (manufacturer) => async (dispatch) => {
    const service = new manufacturerService();

    try {
        console.log('insert manufacturer');

        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.insertManufacturer(manufacturer);
        if (response.status === 201) {
            dispatch({
                type: MANUFACTURER_SET,
                payload: response.data,
            });
            dispatch({
                type: MANUFACTURER_APPEND,
                payload: response.data,
            });

            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: 'manufacturer is saved',
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
};

export const updateManufacturer = (manufacturer) => async (dispatch) => {
    const service = new manufacturerService();

    try {
        console.log('update manufacturer');

        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });
        const { id } = manufacturer;
        const response = await service.updateManufacturer(id, manufacturer);
        if (response.status === 201) {
            dispatch({
                type: MANUFACTURER_SET,
                payload: response.data,
            });
            dispatch({
                type: MANUFACTURER_UPDATE,
                payload: response.data,
            });
            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: 'manufacturer is updated',
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
};

// do toan bo danh sach
export const getManufacturers = () => async (dispatch) => {
    const service = new manufacturerService();

    try {
        console.log('get manufacturers');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.getManafacturers();

        console.log(response);

        if (response.status === 200) {
            dispatch({
                type: MANUFACTURERS_SET,
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

//tim kiem id
export const getManufacturer = (id) => async (dispatch) => {
    const service = new manufacturerService();

    try {
        console.log('get manufacturer');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.getManufacturer(id);

        console.log(response);

        if (response.status === 200) {
            dispatch({
                type: MANUFACTURER_SET,
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

export const deleteManufacturer = (id) => async (dispatch) => {
    const service = new manufacturerService();

    try {
        console.log('delete manufacturer');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.deleteManufacturer(id);

        console.log(response);

        if (response.status === 200) {
            dispatch({
                type: MANUFACTURER_DELETE,
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
