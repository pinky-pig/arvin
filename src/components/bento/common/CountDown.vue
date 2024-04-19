<script setup lang="ts">
const time = ref(countdownTime()) // 23.84

function runAtMidnight(callback: Function) {
  const now = Date.now()
  const midnight = new Date()
  midnight.setHours(24, 0, 0, 0)
  // eslint-disable-next-line unused-imports/no-unused-vars
  let tomorrow = midnight.getTime() - now
  setInterval(() => {
    const now = Date.now()
    if (now >= midnight.getTime()) {
      callback()
      const midnight = new Date()
      midnight.setHours(24, 0, 0, 0)
      tomorrow = midnight.getTime() - now
    }
  }, 1000)
}

runAtMidnight(() => {
  time.value = countdownTime()
})

function countdownTime() {
  // 获取今年的年份
  const year = new Date().getFullYear()

  // 判断今年是否为闰年，计算今年的总天数
  const daysInYear = new Date(year, 2, 0).getDate() === 29 ? 366 : 365

  // 获取今天是今年的第几天
  const today = Math.floor((new Date().getTime() - new Date(year, 0, 0).getTime()) / 86400000)

  // 计算今年已经过去了多少天
  const daysGone = today + 1

  // 计算已经过去的百分比
  const percentage = ((daysGone / daysInYear) * 100).toFixed(2)
  return Number(percentage) < 10 ? `0${percentage}` : percentage
}
</script>

<template>
  <ShadowBlock class="h-300px w-400px text-5rem">
    <div class="relative h-full w-full" style="font-family: Digital">
      <span class="absolute left-50% top-50% w-180px flex flex-row -translate-1/2">
        <span>{{ time.slice(0, 2) }}</span>
        <div class="relative grid w-fit place-items-center">
          <div class="opacity-0">:</div>
          <div class="absolute left-1px top-0 w-full">.</div>
        </div>
        <span>{{ time.slice(3) }}</span>
      </span>
      <span
        v-show="Number(time) !== 100 && Number(time) !== 100.00"
        class="absolute left-50% top-50% w-180px text-[#0000001c] -translate-1/2 dark:text-[#ffffff1c]"
      >
        00:00
      </span>

      <span class="absolute left-[calc(50%_-_150px)] top-50% text-24px opacity-30">
        <span>{{ new Date().getFullYear() }}</span>
      </span>
      <span class="absolute left-[calc(50%_+_100px)] top-50% text-24px opacity-30">
        %
      </span>
    </div>
  </ShadowBlock>
</template>

<style scoped>

</style>
