<template>
  <div>
    <p></p>
    <button @click="addProduct1">Thêm sản phẩm</button>
    <h1>Danh sách sản phẩm!</h1>
    <ul>
        <li v-for="pro in store.state.product.products" :key="pro.id"> {{ pro.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { addProduct } from '@/api/productApi';
import product from '@/store/module/product';
import { useStore } from 'vuex';


const store = useStore();
// muốn kích hoạt action thì phải bắt dispatch
store.dispatch("getAllProduct");
console.log("giá trị của product:", store.state.product.products);
const addProduct1 =   ()=>{
    store.dispatch("addProductAction",{
        data: addProduct({
            name:"Iphone!",
        })
    }),
    store.dispatch("getAllProduct");
}
</script>

<style>
</style>