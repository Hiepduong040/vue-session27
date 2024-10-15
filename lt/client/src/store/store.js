import {createStore} from "vuex"
import count from "./module/count";
import user from "./module/user";
import product from "./module/product";
const store = createStore({
     
    modules:{
        count,
        user,
        product,
    }
})

export default store;
