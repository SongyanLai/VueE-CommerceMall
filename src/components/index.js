// 把components中的所有组件都进行全局化注册
// 通过插件的方式
import ImageView from './ImageView/index.vue'
import Sku from './XtxSku/index.vue'
export const componentPlugin={
    install(app){
        // app.component('组件的名字'，使用的组件)
        app.component('XtxImageView',ImageView)
        app.component('XtxSku',Sku)
    }
}