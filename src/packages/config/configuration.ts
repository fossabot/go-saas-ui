import NavigationInterface from './navigation';
import TeamInterface from './team';

export default interface Configuration {
  name: string;
  logo: string | null;
  locale: string;
  host: string;
  mail: string;
  tokens: boolean | null;
  teams: TeamInterface | null;
  navigation: NavigationInterface;

  getName(): string;

  getLogo(): string | null;

  getLocale(): string;

  getHost(): string;

  getMail(): string;

  getTokens(): boolean | null;

  getTeams(): TeamInterface | null;

  getNavigation(): NavigationInterface;
}