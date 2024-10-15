import axios from "axios";

// viết api lấy toàn bộ thông tin của sản phẩm

export const getAllProduct = async () => {
  const products = await axios.get("http://localhost:3000/products")
  console.log("data ",products);
  return products.data
  
  
  // VITE
  // NPX CREATEreactapp
};

export const getOneProduct = (id) => {
  // axios.get("http://localhost:3000/products")
  // const product = // axios.get(`https://localhost:8080/product/${id}`)
  //    return getAllProduct.data
};

// hàm thêm mới 1 sản phẩm: 
export const addProduct = async (product)=>{
    try {
        const response = await axios.post("http://localhost:3000/products",product)
    return response.data
    } catch (error) {
        console.log("error", error);
        
    }
}