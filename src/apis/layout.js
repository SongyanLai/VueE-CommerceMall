import httpInstance from '@/utils/http'
export function getCategoryAPI(){
    // 因为是get 请求，所以可以省略不写method:get
    return httpInstance({url:'/home/category/head'})
}