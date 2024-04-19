<script setup lang="ts">

</script>

<template>
  <div class="h-full w-full">
    <div class="box">
      <span class="sticker bg bg1">GitHub</span>
      <span class="sticker bg bg2">GitHub</span>
      <span class="sticker bg bg3">GitHub</span>
      <span class="sticker bg bg4">GitHub</span>
      <span class="sticker bg bg5">GitHub</span>
      <span class="sticker bg bg6">GitHub</span>

      <span class="sticker text6">GitHub</span>
      <span class="sticker text5">GitHub</span>
      <span class="sticker text4">GitHub</span>
      <span class="sticker text3">GitHub</span>
      <span class="sticker text2">GitHub</span>
      <span class="sticker text1">GitHub</span>

      <span class="sticker text">GitHub</span>
    </div>
  </div>
</template>

<style scoped>
.box{
  margin: auto;
  font-size: 70px;
  color: #ffffff;
  width: fit-content;
  height: fit-content;
  position: relative;

  font-family: 'Cherry Bomb One', cursive;
  background-image: radial-gradient(farthest-corner circle at top right in oklab, oklch(80% .4 222) 0%, oklch(35% .5 313) 100%);
}

.sticker{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.bg{
  -webkit-text-stroke: 20px #fff;
}

.bg2{
  left: calc(50% + 8px);
  top: calc(50% + 8px);
}
.bg3{
  left: calc(50% + 20px);
  top: calc(50% + 20px);
}
.bg4{
  left: calc(50% + 26px);
  top: calc(50% + 26px);
}
.bg5{
  left: calc(50% + 32px);
  top: calc(50% + 32px);
}
.bg6{
  left: calc(50% + 38px);
  top: calc(50% + 38px);
}

.text{
  color: #FFF;
  -webkit-text-stroke: 6px #132043;
}

.text1{
  color: #337CCF;
  -webkit-text-stroke: 4px #132043;
  left: calc(50% + 8px);
  top: calc(50% + 8px);
}

.text2{
  color: #C8E4B2;
  -webkit-text-stroke: 4px #132043;
  left: calc(50% + 14px);
  top: calc(50% + 14px);
}

.text3{
  color: #FFD9B7;
  -webkit-text-stroke: 4px #132043;
  left: calc(50% + 20px);
  top: calc(50% + 20px);
}

.text4{
  color: #FF6969;
  -webkit-text-stroke: 4px #132043;
  left: calc(50% + 26px);
  top: calc(50% + 26px);
}

.text5{
  color: #DE006B;
  -webkit-text-stroke: 4px #132043;
  left: calc(50% + 32px);
  top: calc(50% + 32px);
}

.text6{
  color: #A203CB;
  -webkit-text-stroke: 4px #132043;
  left: calc(50% + 38px);
  top: calc(50% + 38px);
}
</style>
