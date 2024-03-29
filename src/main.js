import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import messagePlugin from "@/utils/message.plugin";
import currencyPlugin from "@/utils/currency.plugin";
import tooltipDirective from "@/directives/tooltip.directive";
import Loader from "@/components/Loader";
import datePlugin from "@/utils/date.plugin";
import Paginate from "vuejs-paginate-next";
import VueApexCharts from "vue3-apexcharts";


const firebaseConfig = {
    apiKey: "AIzaSyDQ-osdOEdMTkj9gNGW9IH_36R0BktWg1s",
    authDomain: "vue-firebase-17d17.firebaseapp.com",
    databaseURL: "https://vue-firebase-17d17-default-rtdb.firebaseio.com",
    projectId: "vue-firebase-17d17",
    storageBucket: "vue-firebase-17d17.appspot.com",
    messagingSenderId: "562065428556",
    appId: "1:562065428556:web:b1374354ad832c8881e4e9"
};

let app;

firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App)
            .use(store)
            .use(router)
            .use(messagePlugin)
            .use(currencyPlugin)
            .use(datePlugin)
            .use(Paginate)
            .component('Loader', Loader)
            .component('ApexChart', VueApexCharts)
            .directive('tooltip', tooltipDirective)
            .mount('#app');
    }
})


