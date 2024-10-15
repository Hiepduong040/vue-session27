import { addProduct, getAllProduct } from "@/api/productApi";

const product = {
    state:{
        products:[]
    },
    mutations:{
        getAllProduct: async (state)=>{
             state.products = await getAllProduct();
            console.log(state.products);
            
        },
        addProductMutation:async (state,payload)=>{
            console.log("giá trj sản phẩm vừa thêm vào là:", payload);
            // await addProduct(payload.data)
            // state.products.push(payload.data)
        }
    },
    actions:{
        // xử lý các tác vụ bất đồng bộ
        getAllProduct:({commit})=>{
            commit("getAllProduct")
        },
        addProductAction:({commit},payload)=>{
            commit("addProductMutation",payload);
        }
    }
}

export default product;