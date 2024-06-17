<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { ElMenuItem, ElSubMenu } from 'element-plus'
import { MenuItem } from './config'

const props = defineProps({
  item: {
    type: Object as PropType<MenuItem>,
    default: {}
  }
})
const item: MenuItem = props.item
</script>
<template>
  <div>
    <ElSubMenu v-if="item.children && item.children.length" :index="item.index">
      <template #title>
        <i v-if="item.icon" :class="item.icon" style="margin-right: 10px" />
        <span style="display: block; margin-right: 5px">{{ item.title }}</span>
      </template>
      <RecursiveMenu v-for="child in item.children" :key="child.index" :item="child" />
    </ElSubMenu>
    <ElMenuItem v-else :index="item.index" :route="item.path">
      <i v-if="item.icon" :class="item.icon" style="margin-right: 10px" />
      <span>{{ item.title }}</span>
    </ElMenuItem>
  </div>
</template>
