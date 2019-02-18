//TODO add authentications

import Vue from 'vue';
import App from './App.vue';

import './styles/quasar.styl';
import 'quasar-extras/material-icons';

import Quasar, {
  QLayout,
  QTabs,
  QTab,
  QTabPane,
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
  QList,
  Notify
  //@ts-ignore
} from 'quasar-framework';

Vue.use(Quasar, {
  components: [
    QLayout,
    QTabs,
    QTab,
    QTabPane,
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
    QList,
    Notify
  ]
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
