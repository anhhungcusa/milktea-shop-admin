import {combineReducers} from 'redux'
import { authReducer } from './auth'
import { productCategoryReducer } from './product-category'
import { productReducer } from './product'
import { vipReducer } from './vip'
import { discountReducer } from './discount'
import { constantTypeReducer } from './constant-type'



export const rootReducer = combineReducers({
    user: authReducer,
    productCategory: productCategoryReducer,
    product: productReducer,
    vip: vipReducer,
    discount: discountReducer,
    constantType: constantTypeReducer
})

export type RootState = ReturnType<typeof rootReducer>