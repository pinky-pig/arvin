<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { cn } from '@/utils'

interface AccountSwitcherProps {
  isCollapsed: boolean
  user: {
    label: string
    email: string
    icon: string
  }
}

defineProps<AccountSwitcherProps>()
</script>

<template>
  <div
    :class="cn(
      'flex items-center gap-4 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0',
      { 'flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden': isCollapsed },
    )"
  >
    <Icon class="size-4" :icon="user!.icon" />
    <span v-if="!isCollapsed">
      {{ user!.label }}
    </span>
  </div>
</template>
