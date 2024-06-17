<script setup lang="ts">
import { ElMenu } from 'element-plus'
import { menuItems } from './config'
import 'element-plus/dist/index.css'
import RecursiveMenu from './RecursiveMenu.vue'
</script>

<template>
  <div id="app">
    <ElMenu
      style="height: 100%; width: auto; max-width: 250px; min-height: 100vh"
      default-active="1"
      class="el-menu-vertical-demo"
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
      router
    >
      <RecursiveMenu v-for="item in menuItems" :key="item.index" :item="item" />
    </ElMenu>
    <div class="main-content">
      <RouterView />
    </div>
  </div>
</template>

<style>
#app {
  display: flex;
  width: 100%;
}
.el-menu-vertical-demo {
  border-right: 0;
}
.main-content {
  flex-grow: 1;
  padding: 20px;
  width: 100%;
}
</style>
