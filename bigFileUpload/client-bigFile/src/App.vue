<template>
  <section id="big-file-upload">
    <input type="file" id="upload"/>

    <Button 
      icon="ios-cloud-upload-outline"
      @click="uploadFile"
      type="primary"
    >Upload files</Button>

    <div id="files" v-if="file.name">
      <p class="file-name">{{ file.name }}</p>

      <p class="file-slice">文件被分为了 <strong>{{ files.length }}</strong> 份</p>

      <ButtonGroup>
        <Button type="warning" size="small" @click="excuteUpload">上传</Button>
        <Button type="error" size="small" @click="cancel">取消</Button>
      </ButtonGroup>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import {v4 as uuidv4} from 'uuid';
import sliceFiles from '../lib/fileSlice';
import httpPro from '../lib/http/Promise';

function uploadFile(){
  upload.click();
}

function cancel() {
  file.value = {};
  files.value = [];
}

const file = ref({});
const files = ref([]);
let fileId = '';
onMounted(() => {
  upload.addEventListener('change', function(e) {
    file.value = e.target.files[0];

    files.value = sliceFiles(file.value);

    fileId = uuidv4();
  })
})

function excuteUpload() {
  httpPro(files.value, fileId);
}
</script>

<style lang="stylus">
@import './App.styl'
</style>