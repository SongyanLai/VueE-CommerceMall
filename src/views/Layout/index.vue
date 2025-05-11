<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue';

// 触发获取导航列表的action
import {useCategoryStore} from '@/stores/categoryStore'
import { onMounted } from 'vue';

const categoryStore=useCategoryStore()

onMounted(()=>{categoryStore.getCategory()})
</script>

<template>
  <LayoutNav />
  <LayoutHeader />
  <!-- 添加key属性，破坏缓存 -->
  <RouterView :key="$route.fullPath"/>
  <LayoutFooter />
  <LayoutFixed></LayoutFixed>
</template>