<script setup lang="ts">

</script>

<template>
  <div class="box-np-background">
    <div class="box-np-border">
      <div class="box-np-content">
        button
      </div>
    </div>
  </div>
</template>

<style scoped>
.box-np-background {
  height: 200px;
  width: 200px;
  border-radius: 30px;
  background: linear-gradient(to bottom, #ECECEC, #ffffff);
  box-shadow: inset 0px 0px 0px #d5d4d4;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box-np-border {
  height: 172px;
  width: 175px;
  border-radius: 25px;
  background: linear-gradient(to top, #ECECEC, #FEFEFE);
  box-shadow: 0 0 2px 1px #959595, 0 6px 12px 0px #959595;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box-np-content {
  height: 158px;
  width: 158px;
  border-radius: 20px;
  background: linear-gradient(to bottom, #EFEFEF, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
