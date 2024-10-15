import { createStore } from "vuex";
import user from "./module/user";




const store = createStore({
    module:{
        user
    }
    
})

export default store;

