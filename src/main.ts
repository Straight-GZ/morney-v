import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icons from '@/components/Icons.vue';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icons', Icons);

new Vue({
  router, store, render: h => h(App)
}).$mount('#app');

window.onload = function () {
  setTimeout(function () {
    window.scroll(0, 200);
  }, 0);
};

if (document.documentElement.clientWidth > 500) {
  window.alert('请使用手机打开，以保证浏览效果');
  const img = document.createElement('img');
  img.src = '/qrcode.png';
  img.style.position = 'fixed';
  img.style.left = '50%';
  img.style.top = '50%';
  img.style.transform = 'translate(-50%,-50%)';
  img.style.boxShadow = '0,0,10px,rgba(0,0,0,0.25)';
  document.body.appendChild(img);
  const removeImg = () => {
    document.body.removeChild(img);
  };
  document.body.addEventListener('click', removeImg);
  document.body.removeEventListener('click', removeImg);
}