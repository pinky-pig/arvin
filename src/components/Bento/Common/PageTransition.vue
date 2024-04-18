<script setup lang="ts">
// https://uiverse.io/Pradeepsaranbishnoi/cuddly-sheep-92
import type { CurrentTransitionNameType } from '~/logics/index'
import { currentTransitionName } from '~/logics/index'

function handleChange(e: CurrentTransitionNameType) {
  currentTransitionName.value = e
}
</script>

<template>
  <ShadowCard class="!p-5px">
    <div class="h-full w-full flex flex-col items-center justify-center gap-16px">
      <div class="mx-10px w-full px-2">
        <span class="block text-14px font-bold">
          页面过渡动画：<span class="capitalize">{{ currentTransitionName.slice(0, 4) }}</span>
        </span>
        <span class="block text-12px leading-16px opacity-40">
          改变后可以切换页面查看效果
        </span>
      </div>
      <div class="w-full">
        <form class="form">
          <label class="label">
            <input :checked="currentTransitionName === 'page'" value="page" name="band" type="radio" class="input" @change="handleChange('page')">
          </label>
          <label class="label">
            <input :checked="currentTransitionName === 'null'" value="sw" name="band" type="radio" class="input" @change="handleChange('null')">
          </label>
          <label class="label">
            <input :checked="currentTransitionName === 'translateY'" value="translateY" name="band" type="radio" class="input" @change="handleChange('translateY')">
          </label>
        </form>
      </div>
    </div>
  </ShadowCard>
</template>

<style scoped>
.form {
  display: flex;
}

.input {
  color: var(--fg);
  font:
    1em/1.5 Helvetica,
    sans-serif;
}

.form,
.label {
  width: 100%;
}

.form {
  margin: auto;
  max-width: 24em;
  padding: 0 1.5em;
}

.label {
  display: block;
  text-align: center;
  color: rgb(132, 248, 0);
  -webkit-tap-highlight-color: transparent;
}

.label:first-child .input {
  border-radius: 0.5em 0 0 0.5em;
  box-shadow:
    0.1em 0 0 #2726267f inset,
    -0.1em 0 0 #27262600 inset,
    0 0.1em 0 #afa490 inset,
    0 -0.1em 0 #ffffff3f,
    0 0.2em 0.5em #0000007f,
    0 -0.1em 0 #926086 inset,
    -0.1em -0.2em 0 #ffffff7f inset,
    0.2em 0 0 #ffffff7f inset;
}

.label:last-child .input {
  border-radius: 0 0.5em 0.5em 0;
  box-shadow:
    0 -0.1em 0 #926086 inset,
    0.1em 0 0 #2726267f inset,
    -0.1em 0 0 #2726267f inset,
    0 0.1em 0 #afa490 inset,
    -0.1em 0 0 #afa490 inset,
    0 -0.1em 0 #ffffff3f,
    0 0.2em 0.5em #0000007f,
    -0.1em -0.1em 0 0.1em #ffffff7f inset;
}

.label:first-child .input:checked {
  box-shadow:
    0.1em 0 0 #272626af inset,
    -0.1em 0 0 #272626 inset,
    0 0.1em 0 #847a62 inset,
    0 -0.1em 0 #ffffff3f,
    0 0.1em 0 #ffffff7f,
    0 -0.1em 0 #722257 inset,
    -0.1em -0.2em 0 #ffffff7f inset,
    0.2em 0 0 #ffffff7f inset;
}

.label:last-child .input:checked {
  box-shadow:
    0.1em 0 0 #272626af inset,
    -0.1em 0 0 #272626 inset,
    0 -0.1em 0 #722257 inset,
    0 0.1em 0 #847a62 inset,
    -0.1em 0 0 #847a62 inset,
    0 -0.1em 0 #ffffff3f,
    0 0.1em 0 #ffffff7f,
    -0.1em -0.1em 0 0.1em #ffffff7f inset;
}

.input {
  width: 36px !important;
  background-image: linear-gradient(
    #ffffff 33%,
    #414751 58%,
    #837b52,
    #c5baa1,
    #c3adaa
  );
  border-radius: 0;
  box-shadow:
    0.1em 0 0 #2726267f inset,
    -0.1em 0 0 #27262600 inset,
    0 0.1em 0 #afa490 inset,
    0 -0.1em 0 #ffffff3f,
    0 0.2em 0.5em #0000007f,
    0 -0.1em 0 #926086 inset,
    -0.1em -0.2em 0 #ffffff7f inset;
  cursor: pointer;
  display: block;
  width: 100%;
  height: 1em;
  transition: box-shadow var(--transDur) ease-in-out;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.input:checked {
  background-image: linear-gradient(
    #ffffff 33%,
    #414751 58%,
    #827a7b,
    #c0b6ac,
    #c3adaa
  );
  box-shadow:
    0.1em 0 0 #272626af inset,
    -0.1em 0 0 #272626 inset,
    0 0.1em 0 #847a62 inset,
    0 -0.1em 0 #ffffff3f,
    0 0.1em 0 #ffffff7f,
    0 -0.1em 0 #722257 inset,
    -0.1em -0.2em 0 #ffffff7f inset;
}

.input:checked + .span {
  opacity: 1;
  color: red;
}

.input:focus {
  outline: transparent;
}

.input + .span {
  opacity: 0.65;
  transition: opacity var(--transDur) ease-in-out;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #5c6270;
    --fg: #e3e4e8;
  }

  .label:first-child .input {
    box-shadow:
      0.1em 0 0 #2726267f inset,
      -0.1em 0 0 #27262600 inset,
      0 0.1em 0 #afa490 inset,
      0 -0.1em 0 #0000001f,
      0 0.2em 0.5em #0000007f,
      0 -0.1em 0 #926086 inset,
      -0.1em -0.2em 0 #ffffff7f inset,
      0.2em 0 0 #ffffff7f inset;
  }

  .label:last-child .input {
    box-shadow:
      0 -0.1em 0 #926086 inset,
      0.1em 0 0 #2726267f inset,
      -0.1em 0 0 #2726267f inset,
      0 0.1em 0 #afa490 inset,
      -0.1em 0 0 #afa490 inset,
      0 -0.1em 0 #0000001f,
      0 0.2em 0.5em #0000007f,
      -0.1em -0.1em 0 0.1em #ffffff7f inset;
  }

  .label:first-child .input:checked {
    box-shadow:
      0.1em 0 0 #272626af inset,
      -0.1em 0 0 #272626 inset,
      0 0.1em 0 #847a62 inset,
      0 -0.1em 0 #0000007f,
      0 0.1em 0 #0000007f,
      0 -0.1em 0 #722257 inset,
      -0.1em -0.2em 0 #ffffff7f inset,
      0.2em 0 0 #ffffff7f inset;
  }

  .label:last-child .input:checked {
    box-shadow:
      0.1em 0 0 #272626af inset,
      -0.1em 0 0 #272626 inset,
      0 -0.1em 0 #722257 inset,
      0 0.1em 0 #847a62 inset,
      -0.1em 0 0 #847a62 inset,
      0 -0.1em 0 #0000001f,
      0 0.1em 0 #0000007f,
      -0.1em -0.1em 0 0.1em #ffffff7f inset;
  }

  .input {
    box-shadow:
      0.1em 0 0 #2726267f inset,
      -0.1em 0 0 #27262600 inset,
      0 0.1em 0 #afa490 inset,
      0 -0.1em 0 #0000001f,
      0 0.2em 0.5em #0000007f,
      0 -0.1em 0 #926086 inset,
      -0.1em -0.2em 0 #ffffff7f inset;
  }

  .input:checked {
    box-shadow:
      0.1em 0 0 #272626af inset,
      -0.1em 0 0 #272626af inset,
      0 0.1em 0 #847a62 inset,
      0 -0.1em 0 #0000007f,
      0 0.1em 0 #0000007f,
      0 -0.1em 0 #722257 inset,
      -0.1em -0.2em 0 #ffffff7f inset;
  }
}
</style>
