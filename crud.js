export const BASEURL = "http://localhost:3000";

//recoge los datos
export const recogerDatos = async (url, tabla) => {
    try {
        //`${url}/${tabla}?${campo}=${valor}`
        const response = await axios.get(`${url}/${tabla}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
//meter datos
export const meterDatos = async (url, tabla, datos) => {
    try {
        await axios.post(`${url}/${tabla}`, datos);
    } catch (e) {
        console.log(e);
    }
};