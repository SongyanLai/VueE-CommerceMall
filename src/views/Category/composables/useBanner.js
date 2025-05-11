// 封装banner轮播图的代码
import {ref ,onMounted} from 'vue'
import { getBannerAPI } from "@/apis/home";

export function useBanner() {
    const bannerList = ref([]);
    const getBanner = async () => {
        const res = await getBannerAPI({ distributionSite: "2" });
        console.log(res);
        bannerList.value = res.result;
    };
    onMounted(() => {
        getBanner();
    });
    // 此时的bannerList在另一个文件里面需要使用，使用要return出去
    return {
        bannerList
    }
}