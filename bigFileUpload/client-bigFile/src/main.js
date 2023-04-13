import { createApp } from 'vue'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import App from './App.vue'
import { Button, Upload, ButtonGroup } from 'view-ui-plus';

const a = createApp(App);
a.component('Button', Button);
a.component('Upload', Upload);
a.component('ButtonGroup', ButtonGroup);

a.mount('#app');
