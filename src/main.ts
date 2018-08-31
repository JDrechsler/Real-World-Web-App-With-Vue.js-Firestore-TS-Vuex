import Vue from 'vue';
import App from './App.vue';
import { store } from './store';

import './styles/quasar.styl';
import 'quasar-extras/material-icons';

import Quasar, {
  QLayout,
  QBtn,
  QLayoutHeader,
  QToolbar,
  QToolbarTitle,
  QPageContainer,
  QPage,
  QPageSticky,
  QFab,
  QFabAction,
  QCard,
  QIcon,
  QModal,
  QModalLayout,
  QField,
  QToggle,
  QInput,
  QItem,
  QItemTile,
  QItemSide,
  QItemMain,
  QCollapsible,
  QList
  //@ts-ignore
} from 'quasar-framework';

Vue.use(Quasar, {
  components: [
    QLayout,
    QBtn,
    QLayoutHeader,
    QToolbar,
    QToolbarTitle,
    QPageContainer,
    QPage,
    QPageSticky,
    QFab,
    QFabAction,
    QCard,
    QIcon,
    QModal,
    QModalLayout,
    QField,
    QToggle,
    QInput,
    QItem,
    QItemTile,
    QItemSide,
    QItemMain,
    QCollapsible,
    QList
  ]
});

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
