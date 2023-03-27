import * as types from "./actionType";
import axios from "axios";

const getProducts=(products)=>({
    type:types.GET_PRODUCTS,
    payload:products,
})
const productDeleted=()=>({
    type:types.DELETE_PRODUCTS
})
const productAdded=()=>({
    type:types.ADD_PRODUCT
})

const productUpdated=()=>({
    type:types.UPDATE_PRODUCT
})

const getProduct=(product)=>({
    type:types.GET_SINGLE_PRODUCT,
    payload:product,

})

export const loadProducts=()=>{
    const url="http://localhost:5000/product"
return function (dispatch){
    axios.get(`${url}`).then((resp)=>{
        console.log("resp",resp)
        dispatch(getProducts(resp.data));
    }).catch(error=>console.log(error));
}
}

export const deleteProduct=(id)=>{
    const url="http://localhost:5000/product"
return function (dispatch){
    axios.delete(`${url}/${id}`).then((resp)=>{
        console.log("resp",resp)
        dispatch(productDeleted());
        dispatch(loadProducts());
    }).catch(error=>console.log(error));
}
}

export const addProduct=(product)=>{
    const url="http://localhost:5000/product"
return function (dispatch){
    axios.post(`${url}`,product).then((resp)=>{
        console.log("resp",resp)
        dispatch(productAdded());
        dispatch(...product,getProducts());
    }).catch(error=>console.log(error));
}
}

export const getSingleProduct=(id)=>{
    const url="http://localhost:5000/product"
return function (dispatch){
    axios.get(`${url}/${id}`).then((resp)=>{
        console.log("resp",resp)
        dispatch(getProduct(resp.data));
    }).catch(error=>console.log(error));
}
}

export const updateProduct=(user,id)=>{
    const url="http://localhost:5000/product"
return function (dispatch){
    axios.put(`${url}/${id}`,user).then((resp)=>{ //put because we are updating the existing data
        console.log("resp",resp)
        dispatch(productUpdated());
    }).catch(error=>console.log(error));
}
}