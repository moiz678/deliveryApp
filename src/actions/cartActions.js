import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from '../actions/action-types/cart-actions'
export const addToCart= (data)=>{
    debugger
    return{
        type: ADD_TO_CART,
        data
    }
}
export const removeItem=(id)=>{
    return{
        type: REMOVE_ITEM,
        id
    }
}
export const subtractQuantity=(data)=>{
    debugger
    return{
        type: SUB_QUANTITY,
        data
    }
}
export const addQuantity=(data)=>{
    debugger
    return{
        type: ADD_QUANTITY,
        data
    }
}