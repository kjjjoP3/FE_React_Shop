import {
    MANUFACTURERS_SET,
    MANUFACTURER_APPEND,
    MANUFACTURER_DELETE,
    MANUFACTURER_SET,
    MANUFACTURER_UPDATE,
} from '../actions/actionTypes';

const initialState = {
    manufacturer: {},
    manufacturers: [],
};

const manufactuerReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case MANUFACTURER_SET:
            return { ...state, manufacturer: payload };
        case MANUFACTURERS_SET:
            return { ...state, manufacturers: payload };
        case MANUFACTURER_APPEND:
            return { ...state, manufacturers: [payload, ...state.manufacturers] };
        case MANUFACTURER_DELETE:
            return { ...state, manufacturers: state.manufacturers.filter((item) => item.id !== payload) };
        case MANUFACTURER_UPDATE:
            const newManufacturer = state.manufacturers.filter((item) => item.id !== payload.id);
            return { ...state, manufacturers: [payload, ...newManufacturer] };

        default:
            return state;
    }
};

export default manufactuerReducer;
