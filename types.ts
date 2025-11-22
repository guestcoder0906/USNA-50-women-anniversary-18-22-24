export enum PageView {
  HOME = 'HOME',
  EXHIBIT = 'EXHIBIT',
  SHARE_STORY = 'SHARE_STORY',
  REGISTER = 'REGISTER'
}

export interface NavItem {
  label: string;
  view: PageView;
}

export interface EventItem {
  title: string;
  date: string;
  location: string;
  description: string;
}

export interface ScheduleItem {
  day: string;
  date: string;
  events: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}