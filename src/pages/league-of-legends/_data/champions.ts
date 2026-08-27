import FighterIcon from "../_assets/icons/Fighter_icon.webp";
import MageIcon from "../_assets/icons/Mage_icon.webp";
import MarksmanIcon from "../_assets/icons/Marksman_icon.webp";
import SlayerIcon from "../_assets/icons/Slayer_icon.webp";
import SupportIcon from "../_assets/icons/Support_icon.webp";
import TankIcon from "../_assets/icons/Tank_icon.webp";
import ControllerIcon from "../_assets/icons/Controller_icon.webp";
import SpecialistIcon from "../_assets/icons/Specialist_icon.webp";
import type { ImageMetadata } from "astro";

export const DDRAGON_VERSION = "16.17.1";

export interface ChampionImage {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChampionInfo {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
}

export interface ChampionStats {
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed: number;
}

export interface Champion {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: ChampionInfo;
  image: ChampionImage;
  tags: string[];
  partype: string;
  stats: ChampionStats;
}

export interface ChampionResponse {
  type: string;
  format: string;
  version: string;
  data: Record<string, Champion>;
}

/* ========================================
   CHAMPION DETAIL TYPES
   ======================================== */

export interface ChampionSkin {
  id: string;
  num: number;
  name: string;
  chromas: boolean;
}

export interface ChampionSpell {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  leveltip?: {
    label: string[];
    effect: string[];
  };
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  datavalues: Record<string, unknown>;
  effect: (number[] | null)[];
  effectBurn: (string | null)[];
  vars: unknown[];
  costType: string;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: ChampionImage;
  resource?: string;
}

export interface ChampionPassive {
  name: string;
  description: string;
  image: ChampionImage;
}

export interface ChampionDetail extends Champion {
  skins: ChampionSkin[];
  lore: string;
  allytips: string[];
  enemytips: string[];
  spells: ChampionSpell[];
  passive: ChampionPassive;
  recommended: unknown[];
}

export interface ChampionDetailResponse {
  type: string;
  format: string;
  version: string;
  data: Record<string, ChampionDetail>;
}

export interface RoleInfo {
  key: string;
  label: string;
  viLabel: string;
  icon: ImageMetadata;
}

export const ALL_ROLES: Record<string, RoleInfo> = {
  Assassin: { key: "Assassin", label: "Assassin", viLabel: "Sát Thủ", icon: SlayerIcon },
  Slayer: { key: "Slayer", label: "Slayer", viLabel: "Sát Thủ", icon: SlayerIcon },
  Fighter: { key: "Fighter", label: "Fighter", viLabel: "Đấu Sĩ", icon: FighterIcon },
  Mage: { key: "Mage", label: "Mage", viLabel: "Pháp Sư", icon: MageIcon },
  Marksman: { key: "Marksman", label: "Marksman", viLabel: "Xạ Thủ", icon: MarksmanIcon },
  Support: { key: "Support", label: "Support", viLabel: "Hỗ Trợ", icon: SupportIcon },
  Tank: { key: "Tank", label: "Tank", viLabel: "Đỡ Đòn", icon: TankIcon },
  Controller: { key: "Controller", label: "Controller", viLabel: "Khống Chế", icon: ControllerIcon },
  Specialist: { key: "Specialist", label: "Specialist", viLabel: "Đặc Biệt", icon: SpecialistIcon },
};

// 6 vai trò tiêu chuẩn dùng cho Filter Bar
export const ROLES_LIST: RoleInfo[] = [
  ALL_ROLES.Assassin,
  ALL_ROLES.Fighter,
  ALL_ROLES.Mage,
  ALL_ROLES.Marksman,
  ALL_ROLES.Support,
  ALL_ROLES.Tank,
];

export const ROLE_ICONS: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(ALL_ROLES).map(([key, value]) => [key, value.icon])
);

/**
 * Lấy nhãn tên hiển thị của vai trò theo ngôn ngữ
 */
export function getRoleLabel(roleKey: string, lang: string = "vi_VN"): string {
  const role = ALL_ROLES[roleKey];
  if (!role) return roleKey;
  return lang === "vi_VN" ? role.viLabel : role.label;
}

/**
 * Lấy danh sách tất cả tướng từ Riot Data Dragon API theo ngôn ngữ
 * @param lang Mã ngôn ngữ (vi_VN hoặc en_US)
 */
export async function getChampions(lang: string = "en_US"): Promise<Champion[]> {
  const locale = lang === "vi_VN" ? "vi_VN" : "en_US";
  const url = `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/data/${locale}/champion.json`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch champions: ${res.status} ${res.statusText}`);
    }
    const data: ChampionResponse = await res.json();
    return Object.values(data.data);
  } catch (error) {
    console.error(`[DataDragon] Error fetching champions for ${locale}:`, error);
    return [];
  }
}

/**
 * Lấy chi tiết thông tin đầy đủ của 1 vị tướng (kỹ năng, skins, cốt truyện lore, passive)
 * @param championId ID của tướng (ví dụ: "Ahri", "Aatrox", "Yasuo")
 * @param lang Mã ngôn ngữ (vi_VN hoặc en_US)
 */
export async function getChampionDetail(
  championId: string,
  lang: string = "vi_VN"
): Promise<ChampionDetail | null> {
  const locale = lang === "vi_VN" ? "vi_VN" : "en_US";
  const url = `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/data/${locale}/champion/${championId}.json`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch detail for ${championId}: ${res.status} ${res.statusText}`);
    }
    const data: ChampionDetailResponse = await res.json();
    return data.data[championId] || null;
  } catch (error) {
    console.error(`[DataDragon] Error fetching detail for ${championId} (${locale}):`, error);
    return null;
  }
}

/**
 * Lấy dữ liệu mở rộng từ Universe Meeps API (League of Legends Universe)
 * @param championId ID hoặc slug của tướng (ví dụ: "lucian", "ahri", "aatrox")
 */
export async function getChampionUniverseDetail(championId: string): Promise<Record<string, any> | null> {
  const cleanId = championId.toLowerCase();
  const url = `https://universe-meeps.leagueoflegends.com/v1/en_us/champions/${cleanId}/index.json`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`[UniverseMeeps] Status ${res.status} when fetching for ${cleanId}`);
      return null;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`[UniverseMeeps] Error fetching universe data for ${cleanId}:`, error);
    return null;
  }
}

/**
 * Lấy URL ảnh đại diện (avatar vuông) của tướng
 */
export function getChampionIconUrl(fullImage: string, version: string = DDRAGON_VERSION): string {
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${fullImage}`;
}

/**
 * Lấy URL hình nền Splash Art của tướng
 * @param championId ID của tướng (ví dụ: "Aatrox", "Ahri")
 * @param skinNum Số thứ tự skin (mặc định 0 là skin cơ bản)
 */
export function getChampionSplashUrl(championId: string, skinNum: number = 0): string {
  return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_${skinNum}.jpg`;
}

/**
 * Lấy URL hình thẻ tải trận (Loading Screen) của tướng
 * @param championId ID của tướng (ví dụ: "Aatrox", "Ahri")
 * @param skinNum Số thứ tự skin (mặc định 0 là skin cơ bản)
 */
export function getChampionLoadingUrl(championId: string, skinNum: number = 0): string {
  return `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championId}_${skinNum}.jpg`;
}

/**
 * Lấy URL icon chiêu thức (Q, W, E, R)
 * @param fullImage Tên file ảnh (ví dụ: "AhriOrbofDeception.png")
 */
export function getSpellIconUrl(fullImage: string, version: string = DDRAGON_VERSION): string {
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${fullImage}`;
}

/**
 * Lấy URL icon nội tại (Passive)
 * @param fullImage Tên file ảnh nội tại (ví dụ: "Ahri_Passive.png")
 */
export function getPassiveIconUrl(fullImage: string, version: string = DDRAGON_VERSION): string {
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${fullImage}`;
}
