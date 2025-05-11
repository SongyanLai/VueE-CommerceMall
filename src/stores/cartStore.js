// 封装购物车模块

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './userStore'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'
export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)

    // 获取最新购物车列表action
    const updateNewList=async()=>{
        const res=await findNewCartListAPI()
        cartList.value=res.result
    }


    // 1.定义state--cartList
    const cartList = ref([])
    // 2.定义action--addCart
    const addCart = async (goods) => {
        // console.log('添加',goods);
        const { skuId, count } = goods
        if (isLogin.value) {
            // 登录之后的加入购物车逻辑
            await insertCartAPI({ skuId, count })
            updateNewList()

        } else {
            // 添加购物车操作
            // 已添加过的---count+1
            // 没有添加过的---直接push
            // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找的，找到了就是添加过的
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if (item) {
                // 找到了
                item.count++
            } else {
                // 没有找到
                cartList.value.push(goods)
            }
        }

    }

    // 删除购物车
    const delCart = async (skuId) => {
        if (isLogin.value) {
            // 调用接口实现接口购物车中的删除功能
            await delCartAPI([skuId])
            updateNewList()
        } else {
            // 思路：
            // 1.找到要删除项的下标值--splice
            // 2.使用数组的过滤方法--filter
            const idx = cartList.value.findIndex((item) => skuId === item.skuId)
            cartList.value.splice(idx, 1)
        }

    }


    // 清除购物车
    const clearCart=()=>{
        cartList.value=[]
    }



    // 单选功能
    const singleCheck2 = (skuId, selected) => {
        // 通过skuId找的要修改的那一项，然后把它的selected修改为传过来的selected
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }

    // 全选功能
    const allCheck2 = (selected) => {
        // 把cartList中的每一项的selected都设置为当前全选框的状态
        cartList.value.forEach(item => item.selected = selected)
    }

    // 计算属性
    // 1.总的数量 所有项的count之和
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    // 2.总价 所有项的count*price之和
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

    // 3.已选择数量
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
    // 4.已选择商品价格合计
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))

    // 是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected))

    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        singleCheck2,
        isAll,
        allCheck2,
        selectedCount,
        selectedPrice,
        clearCart,
        updateNewList

    }
}, {
    persist: true,
})