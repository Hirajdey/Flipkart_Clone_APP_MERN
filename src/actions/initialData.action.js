
import axios from "../helpers/axios";
import { categoryConstants, productConstants } from "./constants";

export const getInitialData = () => {
    return async dispatch => {
        const res = await axios.post('/initialdata');
        const { categories, products } = res.data;

        if(res.status === 200){
            dispatch({ 
                type: categoryConstants.GET_ALL_CATEGORYS_SUCCESS,
                payload: { categories }
            })

            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: { products } 
            })
        }
    } 
}