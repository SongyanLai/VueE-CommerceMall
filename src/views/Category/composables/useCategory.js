// 封装分类数据业务相关的代码
import {ref,onMounted} from 'vue'
import {onBeforeRouteUpdate, useRoute } from "vue-router";
import { getCategoryAPI } from "@/apis/category";

export function useCategory() {
    // 获取分类数据
    const categoryData = ref({});
    // 使用useRoute获取传过来的参数
    const route = useRoute();
    const getCategory = async (id = route.params.id) => {
        const res = await getCategoryAPI(id);
        categoryData.value = res.result;
    };
    onMounted(() => getCategory());

    // 目标：路由参数变化的时候，可以把分类数据接口重新发送
    onBeforeRouteUpdate((to) => {
        console.log('路由变化了');
        // 存在的问题：使用最新的路由参数请求最新的分类数据
        console.log(to);
        getCategory(to.params.id)
    })
    
    return {categoryData}
}