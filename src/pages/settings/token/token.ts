import {LocaleMessageObject} from 'vue-i18n';
import TokenComponent from './../../../components/pages/settings/token/Token.vue';
import messages from './../../../messages/pages/settings/token/token.json';
import Page from "../../page";

export default class Token extends Page {
  name: string = 'token';
  path: string = '/settings/token';
  component: any = TokenComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = {
    requiresAuth: true,
    requiresEnabledTokens: true,
  };
}
