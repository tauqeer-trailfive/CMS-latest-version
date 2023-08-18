import { RaRecord, Identifier } from "react-admin";

export type ThemeName = "light" | "dark";

export interface Category extends RaRecord {
  name: string;
}

export interface Product extends RaRecord {
  category_id: Identifier;
  description: string;
  height: number;
  image: string;
  price: number;
  reference: string;
  stock: number;
  thumbnail: string;
  width: number;
}

export interface Customer extends RaRecord {
  first_name: string;
  last_name: string;
  address: string;
  stateAbbr: string;
  city: string;
  zipcode: string;
  avatar: string;
  birthday: string;
  first_seen: string;
  last_seen: string;
  has_ordered: boolean;
  latest_purchase: string;
  has_newsletter: boolean;
  groups: string[];
  nb_commands: number;
  total_spent: number;
}

export interface TimeLineItem extends RaRecord {
  text: string;
}

export interface Genre extends RaRecord {
  name: string;
  description: string;
}

export interface ReferralCode extends RaRecord {
  referralcode: string;
}

export interface Track extends RaRecord {
  project_id: Identifier;
  project: string[];
  order: number;
  isMuted: boolean;
  isSolo: boolean;
  volume: number;
  pan: number;
}

export interface Playlist extends RaRecord {
  projects: string[];
  name: string;
  public: boolean;
  tracks: string[];
  imageUrl: string;
  users: string[];
}

export interface Homescreen extends RaRecord {
  title: string;
  type: string;
  status: boolean;
  priority: number;
}

export interface Comment extends RaRecord {
  text: string;
  users: string[];
  projects: string[];
}

export interface Timelineitem extends RaRecord {
  text: string;
  type: string;
  users: string[];
  projects: string[];
  isAnon: boolean;
  dummy: string;
  weight: number;
}

export interface Preset extends RaRecord {
  name: string;
  imageUrl: string;
  effects: string[];
  tracks: string[];
  projects: string[];
}

export interface ProjectCategory extends RaRecord {
  name: string;
  project: string[];
}

export interface Effect extends RaRecord {
  name: string;
  order: number;
  effectValues: string;
  imageUrl: string;
  preSets: string[];
  tracks: string[];
  projects: string[];
}

export interface Sample extends RaRecord {
  id: string;
  name: string;
  samplerate: number;
  bpm: number;
  sampleLengthBeats: number;
  sampleLengthMicros: number;
  url: string;
  samplesets: string[];
  projects: string[];
  // bpmTemp: string[];
}

export interface SampleSet extends RaRecord {
  name: string;
  order: number;
  effectValues: string;
  imageUrl: string;
  preSets: string[];
  tracks: string[];
  projects: string[];
}

export interface NewsItem extends RaRecord {
  title: string;
  description: string;
  url: string;
  imageCoverPath: string;
}

export interface Contest extends RaRecord {
  title: string;
  image: string;
  ownerId: string;
  description: string;
  // project: Project[];
  submittedProjects: ContestProject[];
}

export interface ContestProject extends RaRecord {
  contestprojects_id: Identifier;
  highlighted: boolean;
  // project: Project[];
}

export interface Project extends RaRecord {
  // contestprojectsproject_id: Identifier;
  name: string;
  bpm: number;
  user_id: Identifier;
  slug: string;
  private: boolean;
  views: number;
  headerImage: string;
  headerVideo: string;
  mixdownVideo: string;
  mixdownAudio: string;
  mixdownPath: string;
  videoExists: boolean;
  mixdonPathMp3: string;
  mixdownPathMav: string;
  shouldUpdateMixdown: boolean;
  description: string;
  waveformData: string;
  wfIphone3x: string;
  wfIphone2x: string;
  preSetWet: number;
  effectsSnapshot: string;
  recordingsCount: number;
  tagsCount: number;
  tracks: string[];
  projects: string[];
}

export interface bpmTemp extends RaRecord {
  // contestprojectsproject_id: Identifier;
  value: number;
}

export interface playlistprojects extends RaRecord {
  // contestprojectsproject_id: Identifier;
  sortOrder: number;
}

export type OrderStatus = "ordered" | "delivered" | "cancelled";

export interface Order extends RaRecord {
  status: OrderStatus;
  basket: BasketItem[];
  date: Date;
  total: number;
}

export interface BasketItem {
  product_id: Identifier;
  quantity: number;
}

export interface Invoice extends RaRecord {}

export type ReviewStatus = "accepted" | "pending" | "rejected";

export type UserStatus = "accepted" | "pending" | "rejected";

export interface Review extends RaRecord {
  date: Date;
  status: ReviewStatus;
  customer_id: Identifier;
  product_id: Identifier;
}

export interface User extends RaRecord {
  date: Date;
}

declare global {
  interface Window {
    restServer: any;
  }
}
