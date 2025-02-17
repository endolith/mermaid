import DefaultTheme from 'vitepress/theme';
// @ts-ignore
import Mermaid from 'vitepress-plugin-mermaid/Mermaid.vue';
import './custom.css';
import { getRedirect } from './redirect';

export default {
  ...DefaultTheme,
  enhanceApp({ app, router }) {
    // register global components
    app.component('Mermaid', Mermaid);
    router.onBeforeRouteChange = (to) => {
      if (router.route.path !== '/') {
        return;
      }
      try {
        const newPath = getRedirect(to);
        if (newPath) {
          console.log(`Redirecting to ${newPath} from ${window.location}`);
          // router.go isn't loading the ID properly.
          window.location.href = `/mermaid/${newPath}`;
        }
      } catch (e) {}
    };
  },
} as typeof DefaultTheme;
