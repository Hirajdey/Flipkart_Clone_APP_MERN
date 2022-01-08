import axios from "../helpers/axios";
import { productConstants } from "./constants";

export const addProduct = (form) => {
    return async dispatch => {
        dispatch({type:productConstants.ADD_NEW_PRODUCT_REQUEST});
        const res = await axios.post(`product/create`, form);
        console.log(res);

        if(res.status === 200){
            dispatch({
                type: productConstants.ADD_NEW_PRODUCT_SUCCESS,
                payload: {product: res.data.product} 
            })
        }else{
            dispatch({
                type: productConstants.ADD_NEW_PRODUCT_FAILURE,
                payload: res.data.error
            })
        }

    }
}