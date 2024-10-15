
const count={
    state:{
        count:0
         
    },
    mutations:{
        // nơi khai báo các method để biến đổi state
        // khai báo hàm tăng giá trị biến count!
        increase:(state,payload)=>{
            console.log("giá trị payload",payload);
            
            state.count+= payload.payload

        },
        // tạo những hàm tương tác với state là user
        // muốn thêm user
        addUser:(state,payload)=>{
            // state.user.push(payload)
        },
        // muốn thêm sản phẩm:
        addProduct:(state,payload)=>{

        }
    },
    actions:{

    },
    getters:{

    }
}

export default count;