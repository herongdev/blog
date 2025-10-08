# Vue.js 进度条点击跳转功能实现教程

## 📖 概述

本教程将详细介绍如何实现一个智能的进度条系统，用户可以点击进度条上的任意段来跳转到对应的表单字段。这种交互方式特别适用于问卷调查、多步骤表单等场景。

## 🎯 功能特点

- ✅ 可视化进度显示
- ✅ 点击未完成项目跳转
- ✅ 平滑滚动动画
- ✅ 自动聚焦输入框
- ✅ 视觉高亮反馈
- ✅ 响应式设计

## 🛠️ 技术栈

- **Vue 3** + **TypeScript**
- **Ant Design Vue** (表单组件)
- **Tailwind CSS** (样式)

## 📋 实现思路

### 1. 数据结构设计

```typescript
// 问题列表
const questionList = ref<string[]>(['question1', 'question2', 'question3'])

// 已回答问题映射
const answeredQuestionMap = ref<Set<string>>(new Set())
```

### 2. 进度条渲染逻辑

```vue
<div class="progress-container">
  <div
    v-for="(questionId, index) in questionList"
    :key="questionId"
    :class="[
      'progress-segment',
      {
        'completed': answeredQuestionMap.has(questionId),
        'pending': !answeredQuestionMap.has(questionId)
      }
    ]"
    @click="scrollToQuestion(questionId)"
  />
</div>
```

### 3. 滚动跳转核心逻辑

```typescript
const scrollToQuestion = (questionId: string) => {
  // 1. 检查是否已完成
  if (answeredQuestionMap.value.has(questionId)) return

  // 2. 查找对应DOM元素
  const formElement = document.querySelector(`[data-question-id="${questionId}"]`)

  // 3. 执行滚动和聚焦
  if (formElement) {
    formElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    // 自动聚焦输入框
    const inputElement = formElement.querySelector('input, textarea, select')
    inputElement?.focus()
  }
}
```

## 💻 完整实现代码

### 1. 主组件 (FormPanel.vue)

```vue
<template>
  <div class="form-panel">
    <!-- 标题和进度条 -->
    <div class="panel-header">
      <h2>{{ title }}</h2>

      <!-- 进度条 -->
      <div class="progress-bar" v-if="showProgress">
        <div
          v-for="(questionId, index) in questionList"
          :key="questionId"
          :class="[
            'progress-segment',
            {
              'segment-completed': answeredQuestionMap.has(questionId),
              'segment-pending': !answeredQuestionMap.has(questionId),
            },
          ]"
          @click="scrollToQuestion(questionId)"
        />
      </div>
    </div>

    <!-- 表单内容 -->
    <div class="form-content">
      <DynamicForm :fields="fields" v-model="formData" @finish="handleFinish" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import DynamicForm from './DynamicForm.vue'

interface Field {
  name: string
  label: string
  type: string
  required?: boolean
}

const props = defineProps<{
  title: string
  fields: Field[]
  showProgress?: boolean
}>()

// 响应式数据
const formData = ref<Record<string, any>>({})
const answeredQuestionMap = ref<Set<string>>(new Set())

// 计算属性：问题列表
const questionList = computed(() => props.fields.map((field) => field.name))

// 监听表单数据变化，更新已回答状态
watch(
  formData,
  (newData) => {
    answeredQuestionMap.value.clear()
    Object.entries(newData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        answeredQuestionMap.value.add(key)
      }
    })
  },
  { deep: true, immediate: true },
)

// 滚动到指定问题的函数
const scrollToQuestion = (questionId: string) => {
  // 如果已完成，不执行滚动
  if (answeredQuestionMap.value.has(questionId)) return

  // 查找对应的表单项
  const formElement = document.querySelector(`[data-question-id="${questionId}"]`) as HTMLElement

  if (formElement) {
    // 判断是否为第一个问题
    const questionIndex = questionList.value.indexOf(questionId)
    const isFirstQuestion = questionIndex === 0

    // 执行平滑滚动
    formElement.scrollIntoView({
      behavior: 'smooth',
      block: isFirstQuestion ? 'start' : 'center',
    })

    // 添加高亮效果
    formElement.style.transition = 'background-color 0.3s ease'
    formElement.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'

    // 2秒后移除高亮
    setTimeout(() => {
      formElement.style.backgroundColor = ''
    }, 2000)

    // 自动聚焦到输入框
    const inputElement = formElement.querySelector(
      'input, textarea, select, .ant-select-selector',
    ) as HTMLElement

    if (inputElement) {
      setTimeout(() => {
        inputElement.focus()
      }, 300)
    }
  }
}

// 表单提交处理
const handleFinish = (values: Record<string, any>) => {
  console.log('Form submitted:', values)
  // 处理表单提交逻辑
}
</script>

<style scoped>
.form-panel {
  @apply w-full h-full flex flex-col;
}

.panel-header {
  @apply sticky top-0 z-10 bg-white p-6 border-b border-gray-200;
}

.progress-bar {
  @apply flex items-center gap-1 mt-4;
}

.progress-segment {
  @apply flex-1 h-2 cursor-pointer transition-all duration-200;
  @apply rounded-full;
}

.segment-completed {
  @apply bg-green-500;
}

.segment-pending {
  @apply bg-gray-200 hover:bg-gray-300;
}

.form-content {
  @apply flex-1 overflow-y-auto p-6;
}
</style>
```

### 2. 动态表单组件 (DynamicForm.vue)

```vue
<template>
  <a-form
    :model="formData"
    layout="vertical"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item
      v-for="field in fields"
      :key="field.name"
      :label="field.label"
      :name="field.name"
      :rules="getValidationRules(field)"
      :data-question-id="field.name"
    >
      <!-- 文本输入 -->
      <a-input
        v-if="field.type === 'text'"
        v-model:value="formData[field.name]"
        :placeholder="`请输入${field.label}`"
      />

      <!-- 数字输入 -->
      <a-input-number
        v-else-if="field.type === 'number'"
        v-model:value="formData[field.name]"
        class="w-full"
      />

      <!-- 文本域 -->
      <a-textarea
        v-else-if="field.type === 'textarea'"
        v-model:value="formData[field.name]"
        :placeholder="`请输入${field.label}`"
      />

      <!-- 选择器 -->
      <a-select
        v-else-if="field.type === 'select'"
        v-model:value="formData[field.name]"
        :placeholder="`请选择${field.label}`"
      >
        <a-select-option value="option1">选项1</a-select-option>
        <a-select-option value="option2">选项2</a-select-option>
      </a-select>

      <!-- 日期选择器 -->
      <a-date-picker
        v-else-if="field.type === 'date'"
        v-model:value="formData[field.name]"
        class="w-full"
      />
    </a-form-item>

    <!-- 提交按钮 -->
    <a-form-item>
      <a-button type="primary" html-type="submit" size="large"> 提交表单 </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

interface Field {
  name: string
  label: string
  type: string
  required?: boolean
  options?: any[]
}

const props = defineProps<{
  fields: Field[]
  modelValue?: Record<string, any>
}>()

const emit = defineEmits<{
  (e: 'finish', values: Record<string, any>): void
  (e: 'finishFailed', error: any): void
  (e: 'update:modelValue', value: Record<string, any>): void
}>()

const formData = reactive<Record<string, any>>({})

// 监听 props 变化
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      Object.assign(formData, newValue)
    }
  },
  { immediate: true, deep: true },
)

// 监听表单数据变化，同步到父组件
watch(
  formData,
  (newData) => {
    emit('update:modelValue', { ...newData })
  },
  { deep: true },
)

// 表单验证规则
const getValidationRules = (field: Field) => {
  const rules = []

  if (field.required) {
    rules.push({
      required: true,
      message: `请输入${field.label}`,
      trigger: 'blur',
    })
  }

  return rules
}

// 表单提交成功
const handleFinish = (values: Record<string, any>) => {
  emit('finish', values)
}

// 表单提交失败
const handleFinishFailed = (error: any) => {
  emit('finishFailed', error)
}
</script>
```

### 3. 使用示例 (App.vue)

```vue
<template>
  <div class="app">
    <FormPanel
      title="用户信息调查表"
      :fields="formFields"
      :show-progress="true"
      @finish="handleFormSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormPanel from './components/FormPanel.vue'

const formFields = ref([
  { name: 'name', label: '姓名', type: 'text', required: true },
  { name: 'age', label: '年龄', type: 'number', required: true },
  { name: 'email', label: '邮箱', type: 'text', required: true },
  { name: 'phone', label: '电话', type: 'text', required: true },
  { name: 'address', label: '地址', type: 'textarea', required: false },
  { name: 'gender', label: '性别', type: 'select', required: true },
  { name: 'birthday', label: '生日', type: 'date', required: false },
])

const handleFormSubmit = (values: any) => {
  console.log('表单提交成功:', values)
  // 处理表单数据
}
</script>

<style>
.app {
  @apply min-h-screen bg-gray-50;
}
</style>
```

## 🎨 样式优化建议

### 1. 进度条样式增强

```css
.progress-segment {
  position: relative;
  overflow: hidden;
}

.progress-segment::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.5s;
}

.segment-pending:hover::after {
  left: 100%;
}
```

### 2. 高亮动画效果

```css
@keyframes highlight {
  0% {
    background-color: transparent;
  }
  50% {
    background-color: rgba(59, 130, 246, 0.2);
  }
  100% {
    background-color: transparent;
  }
}

.form-item-highlight {
  animation: highlight 2s ease-in-out;
}
```

## 🚀 进阶功能

### 1. 添加进度百分比显示

```vue
<template>
  <div class="progress-info">
    <span class="progress-text"> {{ completedCount }} / {{ totalCount }} 已完成 </span>
    <span class="progress-percentage"> {{ progressPercentage }}% </span>
  </div>
</template>

<script setup lang="ts">
const completedCount = computed(() => answeredQuestionMap.value.size)
const totalCount = computed(() => questionList.value.length)
const progressPercentage = computed(() =>
  Math.round((completedCount.value / totalCount.value) * 100),
)
</script>
```

### 2. 添加键盘导航支持

```typescript
// 添加键盘事件监听
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Tab' && event.shiftKey) {
    // Shift + Tab: 跳转到上一个未完成项目
    jumpToPreviousUncompleted()
  } else if (event.key === 'Tab') {
    // Tab: 跳转到下一个未完成项目
    jumpToNextUncompleted()
  }
}
```

### 3. 添加保存草稿功能

```typescript
const saveDraft = () => {
  localStorage.setItem('form-draft', JSON.stringify(formData.value))
}

const loadDraft = () => {
  const draft = localStorage.getItem('form-draft')
  if (draft) {
    Object.assign(formData.value, JSON.parse(draft))
  }
}
```

## 📱 移动端适配

```css
@media (max-width: 768px) {
  .progress-segment {
    min-width: 20px;
  }

  .form-content {
    padding: 1rem;
  }

  .panel-header {
    padding: 1rem;
  }
}
```

## 🧪 测试建议

### 1. 单元测试

```typescript
import { mount } from '@vue/test-utils'
import FormPanel from '@/components/FormPanel.vue'

describe('FormPanel', () => {
  it('should scroll to question when clicked', async () => {
    const wrapper = mount(FormPanel, {
      props: {
        fields: [
          { name: 'test1', label: 'Test 1', type: 'text' },
          { name: 'test2', label: 'Test 2', type: 'text' },
        ],
      },
    })

    // 模拟点击进度条
    const progressSegment = wrapper.find('.segment-pending')
    await progressSegment.trigger('click')

    // 验证滚动行为
    expect(document.querySelector).toHaveBeenCalledWith('[data-question-id="test1"]')
  })
})
```

### 2. E2E 测试

```typescript
// Cypress 测试示例
describe('Progress Bar Navigation', () => {
  it('should navigate to form fields when clicking progress segments', () => {
    cy.visit('/form')

    // 点击第一个未完成项目
    cy.get('.segment-pending').first().click()

    // 验证页面滚动到对应位置
    cy.get('[data-question-id]').should('be.visible')

    // 验证输入框获得焦点
    cy.focused().should('have.attr', 'type', 'text')
  })
})
```

## 🎯 最佳实践

1. **性能优化**: 使用 `debounce` 防抖处理频繁的表单数据变化
2. **可访问性**: 添加 `aria-label` 和键盘导航支持
3. **错误处理**: 添加滚动失败的回退机制
4. **用户体验**: 提供加载状态和错误提示
5. **代码维护**: 将滚动逻辑抽取为独立的 composable

## 📚 总结

这个进度条点击跳转功能通过以下几个核心概念实现：

1. **数据驱动**: 使用响应式数据管理进度状态
2. **DOM 操作**: 通过 `data-*` 属性定位表单元素
3. **平滑动画**: 利用 `scrollIntoView` API 实现平滑滚动
4. **用户反馈**: 通过视觉高亮和自动聚焦提升体验

这种实现方式不仅提供了良好的用户体验，还保持了代码的可维护性和扩展性。您可以根据具体需求对功能进行定制和扩展。

## 🔗 相关资源

- [Vue 3 官方文档](https://vuejs.org/)
- [Ant Design Vue 组件库](https://antdv.com/)
- [Tailwind CSS 样式框架](https://tailwindcss.com/)
- [MDN scrollIntoView API](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)
