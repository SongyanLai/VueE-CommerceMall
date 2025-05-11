// 定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'


export const lazyPlugin = {
    install(app) {
        // 懒加载指令逻辑
        app.directive('img-lazy', {
            mounted(el, binding) {
                // el:指令绑定的那个元素 img
                // binding:binding.value 指令等于号后面绑定的表达式的值 图片url
                // console.log(el, binding.value);
                // 利用vueUse判断图片是否进入视口区域
                // isIntersecting是一个布尔值
                const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
                    // console.log(isIntersecting);
                    if (isIntersecting) {
                        // 进入了视口区域,发送图片资源请求
                        el.src = binding.value
                        // 在监听的图片第一次完成加载之后就停止监听
                        stop()
                    }
                })
            }
        })
    }
}