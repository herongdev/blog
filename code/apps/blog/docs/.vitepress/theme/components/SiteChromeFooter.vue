<script setup lang="ts">
import { renderFooter } from '@herong/site-chrome'
const footer = renderFooter()
</script>

<template><div class="hr-blog-footer" v-html="footer" /></template>
