<template>
  <div inline-flex cursor-default text-2xl font-300>
    <div flex flex-col children:mx-auto>
      <img inline-block h-18 w-18 src="/logo.svg">
      <span mt--2 text-green5>Arvin</span>
    </div>
    <div
      text="3xl gray4"
      m="x-4 y-auto"
      i-carbon-add transform transition-all-500 hover:rotate-135
    />
    <div flex flex-col children:mx-auto>
      <img inline-block h-18 w-18 src="/logo.png">
      <span mt--2 text-purple5>Arvin</span>
    </div>
  </div>
</template>
