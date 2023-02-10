<template>
  <div id="main">
    <Space>
      <Space wrap>
        <Button type="primary" @click="part">接收部分</Button>
        <Button type="success">接收全部</Button>
      </Space>
    </Space>

    <Card style="margin-top: 20px">
      <template #title>接收内容</template>
      <p>{{ content }}</p>
    </Card>
  </div>
</template>

<script>
import {
  getCurrentInstance,
  reactive,
  ref,
  watch,
  computed,
  onMounted,
} from "vue";

export default {
  setup() {
    function request() {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "/trans/aaa");
      xhr.onerror = function err(e) {
        console.error(e);
      };
      xhr.onload = function load(r) {
        // debugger;
        if (r.target.readyState === 4) {
          content.value = r.target.responseText;
        }
      };
      // xhr.setRequestHeader("Transfer-Encoding", "chunked");

      return xhr;
    }

    const content = ref("");

    function part() {
      const xhr = request();
      xhr.setRequestHeader("Range", "0-10");
      xhr.send();
    }

    return {
      content,
      part,
    };
  },
};
</script>
<style scoped lang="sass">
#main
  width: 500px
  height: 500px
</style>
