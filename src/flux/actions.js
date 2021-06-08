import {actionTypes} from "./actionTypes";

/**
 * 
 */
export const getData = ()=>({
    type: actionTypes.getValues
})

/**
 * 
 * @param {*} values 
 * @returns 
 */
export const returnData = (values)=>({
    type: actionTypes.returnValues,
    payload: values
})