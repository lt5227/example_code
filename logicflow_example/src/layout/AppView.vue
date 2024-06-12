<script setup lang="ts">
import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
import { menuItems } from './config'
import 'element-plus/dist/index.css'
</script>

<template>
  <div id="app">
    <ElMenu
    
      style="height: 100vh; width: 200px"
      default-active="1"
      class="el-menu-vertical-demo"
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
      router
    >
      <!-- 使用 v-for 和 v-if/v-else 分别处理有子菜单和无子菜单的情况 -->
      <template v-for="item in menuItems">
        <!-- 当存在子菜单时，使用 ElSubMenu -->
        <ElSubMenu
          v-if="item.children"
          :key="'submenu-' + item.index"
          :index="item.index"
        >
          <template #title>
            <i v-if="item.icon" :class="item.icon" style="margin-right: 10px" />
            <span>{{ item.title }}</span>
          </template>
          <ElMenuItem
            v-for="child in item.children"
            :key="child.index"
            :index="child.index"
            :route="child.path"
          >
            {{ child.title }}
          </ElMenuItem>
        </ElSubMenu>
        <!-- 没有子菜单时，直接显示 ElMenuItem -->
        <ElMenuItem
          v-else
          :key="'menuitem-' + item.index"
          :index="item.index"
          :route="item.path"
        >
          <i v-if="item.icon" :class="item.icon" style="margin-right: 10px" />
          <span>{{ item.title }}</span>
        </ElMenuItem>
      </template>
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
