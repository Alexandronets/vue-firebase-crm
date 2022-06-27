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
import Loader from "@/components/Loader";

const firebaseConfig = {
    apiKey: "AIzaSyBueh3BoDp9mFD2WV_0octB12p2eyosCGI",
    authDomain: "crm-system-1db55.firebaseapp.com",
    databaseURL: "https://crm-system-1db55-default-rtdb.firebaseio.com",
    projectId: "crm-system-1db55",
    storageBucket: "crm-system-1db55.appspot.com",
    messagingSenderId: "252844443696",
    appId: "1:252844443696:web:d5c42c8eb56fb7aeb785f5"
};
let app;

firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App).use(store).use(router).use(messagePlugin)
            .component('Loader', Loader)
            .mount('#app');
    }
})


