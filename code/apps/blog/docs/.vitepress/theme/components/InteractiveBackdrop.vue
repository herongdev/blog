<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useData } from 'vitepress'

const canvas = ref<HTMLCanvasElement>()
const { isDark } = useData()
let dispose = () => {}

onMounted(() => {
  const el = canvas.value!
  const ctx = el.getContext('2d')
  if (!ctx) return
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  const coarse = matchMedia('(pointer: coarse)')
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, active: false, strength: 0 }
  const waves: { x: number; y: number; age: number }[] = []
  let width = 0, height = 0, frame = 0, last = 0, time = 0
  const colors = ['111,91,232', '29,164,160', '55,135,239', '220,153,64']

  function paint(dt = 0) {
    if (!ctx) return
    const lightweight = width < 600 || coarse.matches
    time += dt * (lightweight ? .5 : 1)
    const ease = 1 - Math.exp(-dt * 7)
    pointer.x += (pointer.targetX - pointer.x) * ease
    pointer.y += (pointer.targetY - pointer.y) * ease
    pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * ease
    ctx.clearRect(0, 0, width, height)
    // Layered analytic streamlines: depth, traveling highlights and eased pointer deflection.
    const rows = lightweight ? 12 : 26
    const columns = lightweight ? 22 : 52
    for (let row = 0; row < rows; row++) {
      const depth = row / rows
      let previous: { x: number; y: number } | undefined
      for (let col = 0; col < columns; col++) {
        const u = col / (columns - 1)
        let x = (u - .5) * width * (1.1 + depth * .5) + width / 2
        let y = height * .08 + depth * height * .98
        y += Math.sin(u * 10 + depth * 5 + time * .35) * (28 + depth * 38)
        y += Math.cos(u * 17 - depth * 6 - time * .2) * 14
        x += Math.sin(depth * 8 + time * .12) * (12 + depth * 20)
        y += Math.sin(u * 5 - time * .16 + depth * 11) * 22
        const dx = x - pointer.x, dy = y - pointer.y
        const distance = Math.hypot(dx, dy)
        const pull = reduced.matches || lightweight ? 0 : Math.max(0, 1 - distance / 280) * pointer.strength
        if (!reduced.matches) {
          x -= dx * pull * .28
          y -= dy * pull * .28
          x -= dy * pull * .12
          y += dx * pull * .12
          for (const wave of waves) {
            const radius = Math.hypot(x - wave.x, y - wave.y)
            y += Math.sin((radius - wave.age * 340) * .035) * Math.exp(-Math.abs(radius - wave.age * 340) / 65) * 24 * Math.max(0, 1 - wave.age / 2)
          }
        }
        const color = colors[Math.min(3, Math.floor(u * 4))]
        const phase = (u - time * .045 + row * .137 + 100) % 1
        const glint = Math.exp(-Math.pow((phase - .5) / .045, 2))
        const alpha = Math.min(1, (isDark.value ? .64 : .54) * (.55 + depth * .45) + pull * .55 + glint * .24)
        if (previous) {
          ctx.beginPath()
          ctx.moveTo(previous.x, previous.y)
          ctx.lineTo(x, y)
          ctx.strokeStyle = `rgba(${color},${alpha * (.65 + pull * .3)})`
          ctx.lineWidth = .6 + depth * .5 + pull * .8
          ctx.stroke()
        }
        ctx.beginPath()
        ctx.arc(x, y, .6 + depth * .9 + pull * 1.8 + glint * 1.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},${alpha})`
        ctx.fill()
        previous = { x, y }
      }
    }
    for (let i = waves.length - 1; i >= 0; i--) {
      waves[i].age += dt
      if (waves[i].age > 2) waves.splice(i, 1)
    }
  }
  function tick(now: number) {
    if (document.hidden || reduced.matches) { frame = 0; return }
    if (now - last >= (width < 600 || coarse.matches ? 66 : 32)) {
      paint(last ? Math.min((now - last) / 1000, .1) : 0)
      last = now
    }
    frame = requestAnimationFrame(tick)
  }
  function resume() {
    cancelAnimationFrame(frame)
    last = 0
    paint()
    frame = !document.hidden && !reduced.matches ? requestAnimationFrame(tick) : 0
  }
  function resize() {
    width = innerWidth; height = innerHeight
    const dpr = Math.min(devicePixelRatio || 1, 1.5)
    el.width = width * dpr; el.height = height * dpr
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    paint()
  }
  function move(event: PointerEvent) {
    if (!pointer.active && pointer.strength < .01) { pointer.x = event.clientX; pointer.y = event.clientY }
    pointer.targetX = event.clientX; pointer.targetY = event.clientY; pointer.active = true
  }
  function leave() { pointer.active = false }
  function click(event: PointerEvent) {
    if (!reduced.matches && !coarse.matches && width >= 600) {
      if (waves.length >= 4) waves.shift()
      waves.push({ x: event.clientX, y: event.clientY, age: 0 })
    }
  }
  const observer = new MutationObserver(() => { if (reduced.matches) paint() })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  addEventListener('resize', resize)
  addEventListener('pointermove', move, { passive: true })
  addEventListener('pointerdown', click, { passive: true })
  document.documentElement.addEventListener('pointerleave', leave)
  addEventListener('blur', leave)
  document.addEventListener('visibilitychange', resume)
  reduced.addEventListener('change', resume)
  resize(); resume()
  dispose = () => {
    cancelAnimationFrame(frame)
    observer.disconnect()
    removeEventListener('resize', resize)
    removeEventListener('pointermove', move)
    removeEventListener('pointerdown', click)
    document.documentElement.removeEventListener('pointerleave', leave)
    removeEventListener('blur', leave)
    document.removeEventListener('visibilitychange', resume)
    reduced.removeEventListener('change', resume)
  }
})
onBeforeUnmount(() => dispose())
</script>

<template>
  <canvas ref="canvas" class="interactive-backdrop" aria-hidden="true" />
</template>

<style>
.interactive-backdrop { position: fixed; inset: 0; width: 100%; height: 100dvh; pointer-events: none; z-index: 0; opacity: .52; }
.dark .interactive-backdrop { opacity: .6; }
@media (max-width: 600px), (pointer: coarse) { .interactive-backdrop, .dark .interactive-backdrop { opacity: .32; } }
.works-site--compact .project-grid-home { position: relative; z-index: 1; }
.works-site--compact .works-footer { position: relative; z-index: 1; background: var(--home-bg); }
</style>
