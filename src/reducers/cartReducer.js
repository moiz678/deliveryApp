import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from '../actions/action-types/cart-actions'


const initState = {
    addedItems:[],
    total: 0
}

const cartReducer= (state = initState,action)=>{
   
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
       let addedItem = action.data
       const productPrice = +addedItem.price 
       let existed_item= state.addedItems.find(item=> action.data.id === item.id)
       if(existed_item)
       {
          addedItem.quantity += 1 
           return{
              ...state,
               total: state.total + productPrice
                }
      }
       else{
          addedItem.quantity = 1;
          //calculating the total
          let newTotal = state.total + productPrice
          
          return{
              ...state,
              addedItems: [...state.addedItems, addedItem],
              total : newTotal
          }
          
      }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type === ADD_QUANTITY){
        let items = action.data
        let product = [items]
        
        let addedItem = product.find(data => data.id === action.data.id)
          const productPrice = +addedItem.price
          addedItem.quantity += 1 
          let newTotal = state.total + productPrice
            debugger
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){
        let items = action.data
        let product = [items]
        let addedItem = product.find(data=> data.id === action.data.id) 
        const productPrice = +addedItem.price
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            debugger
            let new_items = state.addedItems.find(item=>item.id !== action.data.id)
            
            let newTotal = state.total - productPrice
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            debugger
            addedItem.quantity -= 1
            let newTotal = state.total - productPrice
            debugger
            return{
                ...state,
                total: newTotal
            }
        }
        
    }
    if(action.type=== ADD_SHIPPING){
          return{
              ...state,
              total: state.total + 6
          }
    }

    if(action.type=== 'SUB_SHIPPING'){
        return{
            ...state,
            total: state.total - 6
        }
    }
    else{
       return state;
    }
}


export default cartReducer