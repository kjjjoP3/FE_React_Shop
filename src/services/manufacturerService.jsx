import axios from 'axios';
import { API_MANUFACTURER } from './constant';

export default class categoryService {
    insertManufacturer = async (manufacturer) => {
        let formData = new FormData();

        formData.append('name', manufacturer.name);

        if (manufacturer.logoFile[0].originFileObj) {
            formData.append('logoFile', manufacturer.logoFile[0].originFileObj);
        }

        return await axios.post(API_MANUFACTURER, formData);
    };
    getManafacturers = async () => {
        return await axios.get(API_MANUFACTURER);
    };
    deleteManufacturer = async (id) => {
        return await axios.delete(API_MANUFACTURER + '/' + id);
    };
    getManufacturer = async (id) => {
        return await axios.get(API_MANUFACTURER + '/' + id + '/get');
    };
    updateManufacturer = async (id, manufacturer) => {
        let formData = new FormData();

        formData.append('name', manufacturer.name);

        if (manufacturer.logoFile[0].originFileObj) {
            formData.append('logoFile', manufacturer.logoFile[0].originFileObj);
        }

        return await axios.patch(API_MANUFACTURER + '/' + id, formData);
    };

    static getManafacturerLogoUrl = (filename) => {
        return API_MANUFACTURER + '/logo/' + filename;
    };
}
