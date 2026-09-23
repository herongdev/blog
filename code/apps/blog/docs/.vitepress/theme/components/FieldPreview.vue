<script setup lang="ts">
import { withBase } from 'vitepress'
defineProps<{ field: string }>()
</script>

<template>
  <div class="field-preview" aria-hidden="true">
    <img class="field-preview__light" :src="withBase(`/covers/${field}-v1.jpg`)" alt="" width="1200" height="800" decoding="async" :loading="field === 'ai-agent' ? 'eager' : 'lazy'" />
    <img class="field-preview__dark" :src="withBase(`/covers/${field}-dark-v1.jpg`)" alt="" width="1200" height="800" decoding="async" :loading="field === 'ai-agent' ? 'eager' : 'lazy'" />
    <span class="field-preview__label">领域概念</span>
  </div>
</template>

<style>
.field-preview { position:relative; height:clamp(180px, 21vh, 225px); overflow:hidden; border-radius:8px; flex-shrink:0; background:#eee9e1; }
.field-preview img { display:block; width:100%; height:100%; object-fit:contain; transition:transform .45s ease; }
.field-preview .field-preview__dark { display:none; }
.dark .field-preview { background:#1c2028; }
.dark .field-preview .field-preview__light { display:none; }
.dark .field-preview .field-preview__dark { display:block; }
.dark .field-preview .field-preview__label { color:#c3c8d1; background:#232831dc; }
.field-preview__label { position:absolute; right:10px; bottom:9px; padding:3px 6px; border-radius:3px; font-size:10px; letter-spacing:.06em; color:#625c55; background:#f7f4eecc; }
@media (hover:hover) and (prefers-reduced-motion:no-preference) { a:hover .field-preview img { transform:scale(1.025); } }
@media(max-width:600px) { .field-preview { height:210px; } }
</style>
