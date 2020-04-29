import VueRouter from 'vue-router';
import PageInterface from './../../packages/page/page';

export default interface Router {
  mode: any;
  base: string;
  router: VueRouter | null;

  /**
   * Creates VueRouter
   * @param pages - pages
   */
  create(pages: PageInterface[]): void;

  /**
   * Shorthand for login redirection
   */
  redirectToLogin(): void

  /**
   * Shorthand for dashboard redirection
   */
  redirectToDashboard(): void

  /**
   * Returns VueRouter
   * @returns VueRouter
   */
  getRouter(): VueRouter
}
