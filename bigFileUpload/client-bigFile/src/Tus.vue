<template>
  <section id="file-upload">
    <input type="file" id="upload"/>

    <Button 
      @click="uploadFile"
      type="primary"
      :disabled="file.name !== undefined && phase !== 3"
    >
      <Icon class="k-icon-cloud-upload" />上传文件
    </Button>
    
    <div id="files" v-if="file.name">
      <Icon class="ion-document-text file-icon" color="#F85951" size="32"/>

      <div class="file-content">
        
        <p class="file-name" v-if="file.name.length < 18">{{ fileName }}</p>
        <Tooltip :content="file.name" v-else>
          <p class="file-name">{{ fileName }}</p>
        </Tooltip>
        <p class="file-size">{{ fileSize }}</p>
      </div>

      <div class="file-btn">
        <Icon class="ion-pause" size="10" color="#B0BDD1" @click="stop" v-if="phase === 1"/>
        <Icon class="ion-play" size="10" color="#B0BDD1" @click="excuteUpload" v-if="[0, 2].includes(phase)"/>
        <Icon class="ion-close-round" size="10" color="#B0BDD1" @click="cancel" v-if="phase !== 3"/>
      </div>

      <Progress 
        v-if="progress > 0"
        :percent="progress" 
        style="margin: 4px 0" 
        size="mini"
      />
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as tus from 'tus-js-client';
import { Button, Progress, Icon, Tooltip } from '@king-design/vue';
import { computed } from '@vue/reactivity';

function uploadFile(){
  upload.click();
}

function cancel() {
  file.value = {};
}

const file = ref({});
let tusObj = null;
/**
 * 0: 未开始，
 * 1：上传中
 * 2：暂停
 * 3：完成
 */
const phase = ref(0);
const progress = ref(0);
const sizeUnit = ['B', 'K', 'M', 'G'];
const fileSize = computed(() => {
  let rawSize = file.value.size;
  const res = [];

  while (rawSize > 0) {
    const rest = rawSize % 1024;
    res.push(rest);

    rawSize = rawSize / 1024 >> 0;
  }

  for (let i = 0; i < res.length - 1; i++) {
    let cur = res[i];
    cur = (cur / 1024).toFixed(2);
    res[i + 1] += Number(cur);
  }

  return res[res.length - 1] + sizeUnit[res.length - 1];
});
const fileName = computed(() => {
  const len = file.value.name.length;

  if (len > 18) {
    return file.value.name.slice(0, 15) + '...'
  }

  return file.value.name;
});

onMounted(() => {
  upload.addEventListener('change', function(e) {
    file.value = e.target.files[0];
    progress.value = 0;
    phase.value = 0;

    tusObj = new tus.Upload(file.value, {
      endpoint: 'http://localhost:5555/files/',
      metadata: {
        filename: file.value.name,
        filetype: file.value.type,
      },
      onError: function (error) {
        console.error('Failed because: ' + error)
        phase.value = 0;
      },
      onProgress: function (bytesUploaded, bytesTotal) {
        const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2)
        progress.value = percentage;
      },
      onSuccess: function () {
        phase.value = 3;
      },
    })
  })
})

function excuteUpload() {
  tusObj.findPreviousUploads().then(function (previousUploads) {
    if (previousUploads.length) {
      tusObj.resumeFromPreviousUpload(previousUploads[0])
    }

    tusObj.start();
    phase.value = 1;
  })
}

function stop() {
  tusObj.abort();
  phase.value = 2;
}
</script>

<style lang="stylus">
@import './App.styl';
@import './Tus.styl'
</style>