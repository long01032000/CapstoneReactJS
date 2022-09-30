//rxslice
import {
    ACCESS_TOKEN,
    getStore,
    getStoreJson,
    http,
    setCookie,
    setStore,
    setStoreJson,
    USER_LOGIN,
  } from "../../util/tool";
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { getProfileApi } from "./userReducer";

const initialState = {
    arrProduct: [],
    productDetail: {},
    arrCart:[]
}
const productReducer = createSlice({
  name: 'productReducer',
  initialState,
  reducers: {
    getProductAction: (state, action) => {
        //Lấy dữ liệu từ payload
        const arrProduct = action.payload;
        //cập nhật lại state 
        state.arrProduct = arrProduct;
    },
    getProductDetailAction: (state,action) => {
        //Bước 4: Sau khi nhận được dữ liệu từ dispatch
        const productDetail = action.payload;
       
        state.productDetail = productDetail;
    },
    increaseNumberAction: (state,action) => {
        const productDetail = action.payload;
        state.productDetail.quantity = productDetail.quantity+1;
       
    },
    decreaseNumberAction: (state,action) =>{
        const productDetail = action.payload;
        if (productDetail.quantity>1){
            state.productDetail.quantity = productDetail.quantity-1;
        } else {
            alert("Không thể giảm xuống 0")
        }      
    },
    increaseNumberCartAction: (state,action) => {
        const item = action.payload;
        const index = state.arrCart.findIndex(prod => prod.id === item.id)
        
         state.arrCart[index].quantity +=1;
        
       
        
 
    },
    decreaseNumberCartAction: (state,action) =>{
        const item = action.payload;
        const index = state.arrCart.findIndex(prod => prod.id === item.id)
         if (item.quantity>1) {
         state.arrCart[index].quantity -=1;
         } else {
            alert("Không thể giảm xuống 0")
         }  
    },
    submitToCartAction: (state,action) => {
        const productDetail = action.payload;
        const index = state.arrCart.findIndex(item => item.id === productDetail.id)
        if (index!== -1){
            state.arrCart[index].quantity+=1;
        } else {
            state.arrCart.push(productDetail);
        }
    },
    deleteItemCartAction: (state,action) => {
        const item = action.payload;
        const deleteItem = state.arrCart.filter(sp => sp.id !== item.id)
        state.arrCart = deleteItem;
       
    },
   
  }
});

export const {getProductAction,getProductDetailAction,increaseNumberAction,decreaseNumberAction,increaseNumberCartAction,decreaseNumberCartAction,submitToCartAction,deleteItemCartAction} = productReducer.actions

export default productReducer.reducer

// ---------------- action api -----------------
export const getProductApi = () => {
    return async  (dispatch,getState) => {
        try {
            const result = await axios({
                url: 'https://shop.cyberlearn.vn/api/product',
                method: 'get'
            });
            const action = getProductAction(result.data.content)
            dispatch(action)
           console.log(result.data.content);
        } catch (err) {
            console.log({ err });
        }
    }
}

export const getProductDetailApi = (id) => {

    return async (dispatch) =>{
        //Bước 2: Thực thi thunk
        try {
            let result = await axios({
                url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
                method: 'GET'
            });
            //Sau khi lấy dữ liệu api thành công => đưa lên reducer = hàm dispatch2 từ thunk 
            // const action = {type,payload} 
            //Bước 3: Sau khi có dữ liệu => dispatch lần 2
            const action = getProductDetailAction(result.data.content);
            dispatch(action);
        } catch (err) {
            console.log(err);
        }
    }
}

export const getProductCartApi = (orderCart) => {
    return async (dispatch) => {
        try{
            let result = await axios({
                url:"https://shop.cyberlearn.vn/api/Users/order",
                method: 'post',
                data: orderCart
            });
           alert(result.data.content);
           dispatch(getProfileApi())
            //Sau khi lấy dữ liệu api thành công => đưa lên reducer = hàm dispatch2 từ thunk 
            // const action = {type,payload} 
            //Bước 3: Sau khi có dữ liệu => dispatch lần 2
           
           
           
        }
        catch (err){
            console.log(err)
        }
    }
}
