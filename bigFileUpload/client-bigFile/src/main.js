import { createApp } from 'vue'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import App from './Tus.vue'
// import { Button, Upload, ButtonGroup, Progress } from 'view-ui-plus';

const a = createApp(App);
// a.component('Button', Button);
// a.component('Upload', Upload);
// a.component('ButtonGroup', ButtonGroup);
// a.component('Progress', Progress);

a.mount('#app');
