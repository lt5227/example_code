<script setup lang="tsx">
import { ref } from 'vue'

const props = defineProps({
  properties: {
    type: Object,
    required: true
  }
})

type Answer = {
  text: string
  id: string
}

type Properties = {
  title: string
  content: string
  answers: Answer[]
}

// Example props passed to the component
const properties = ref(props.properties as Properties)
</script>
<template>
  <div class="html-card">
    <!-- <ElButton onclick="alert(123)" type="primary" style="margin-left: 15px">Title</ElButton> -->
    <div class="html-card-header">{{ properties.title }}</div>
    <div class="html-card-body">{{ properties.content }}</div>
    <div class="html-card-footer">
      <div v-for="answer in properties.answers" :key="answer.id" class="html-card-label">
        {{ answer.text }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.html-card {
  width: 240px;
  height: 100%;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
  box-sizing: border-box;
  padding: 5px;
}
/* 定义节点不被允许连接的时候，节点样式 */
.lf-node-not-allow .html-card {
  border-color: #f56c6c;
}
.lf-node-allow .html-card {
  border-color: #67c23a;
}
.html-card-header {
  font-size: 12px;
  line-height: 24px;
  margin-left: 14px;
}
.html-card-header:before {
  content: '';
  position: absolute;
  left: 5px;
  top: 13px;
  display: block;
  width: 7px;
  height: 7px;
  border: 1px solid #cbcef5;
  border-radius: 6px;
}
.html-card-body {
  font-size: 12px;
  color: #6f6a6f;
  margin-top: 5px;
}

.html-card-footer {
  display: flex;
  position: absolute;
  bottom: 5px;
}
.html-card-label {
  font-size: 12px;
  line-height: 16px;
  padding: 2px;
  background: #ebeef5;
  margin-right: 10px;
}
</style>
