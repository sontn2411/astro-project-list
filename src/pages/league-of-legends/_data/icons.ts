import type { ImageMetadata } from "astro";

// ==========================================
// 1. ROLE / CLASS ICONS
// ==========================================
import FighterIcon from "../_assets/icons/Fighter_icon.webp";
import MageIcon from "../_assets/icons/Mage_icon.webp";
import MarksmanIcon from "../_assets/icons/Marksman_icon.webp";
import SlayerIcon from "../_assets/icons/Slayer_icon.webp";
import SupportIcon from "../_assets/icons/Support_icon.webp";
import TankIcon from "../_assets/icons/Tank_icon.webp";
import ControllerIcon from "../_assets/icons/Controller_icon.webp";
import SpecialistIcon from "../_assets/icons/Specialist_icon.webp";

// ==========================================
// 2. POSITION / LANE ICONS
// ==========================================
import TopIcon from "../_assets/icons/Top_icon.webp";
import JungleIcon from "../_assets/icons/Jungle_icon.webp";
import MiddleIcon from "../_assets/icons/Middle_icon.webp";
import BottomIcon from "../_assets/icons/Bottom_icon.webp";
import UnplayedIcon from "../_assets/icons/Unplayed_icon.webp";

// ==========================================
// 3. COMBAT & STAT ICONS
// ==========================================
import MovementSpeedIcon from "../_assets/icons/Movement_speed_icon.png";
import RangeIcon from "../_assets/icons/Range_icon.webp";
import AttacksActiveIcon from "../_assets/icons/attacks_active.webp";
import ChampionIcon from "../_assets/icons/champion.png";

// ==========================================
// 4. REGION / FACTION CREST ICONS
// ==========================================
import BandleCityCrestIcon from "../_assets/icons/bandle_city_crest_icon.png";
import BilgewaterCrestIcon from "../_assets/icons/bilgewater_crest_icon.png";
import DemaciaCrestIcon from "../_assets/icons/demacia_crest_icon.png";
import FreljordCrestIcon from "../_assets/icons/freljord_crest_icon.png";
import IoniaCrestIcon from "../_assets/icons/iona_crest_icon.png";
import IxtalCrestIcon from "../_assets/icons/ixtal_crest_icon.png";
import MtTargonCrestIcon from "../_assets/icons/mt_targon_crest_icon.png";
import NoxusCrestIcon from "../_assets/icons/noxus_crest_icon.png";
import PiltoverCrestIcon from "../_assets/icons/piltover_crest_icon.png";
import ShadowIslesCrestIcon from "../_assets/icons/shadow_isles_crest_icon.png";
import ShurimaCrestIcon from "../_assets/icons/shurima_crest_icon.png";
import VoidCrestIcon from "../_assets/icons/void_crest_icon.png";
import ZaunCrestIcon from "../_assets/icons/zaun_crest_icon.png";

// Export individual icons
export {
  // Roles
  FighterIcon,
  MageIcon,
  MarksmanIcon,
  SlayerIcon,
  SupportIcon,
  TankIcon,
  ControllerIcon,
  SpecialistIcon,

  // Lanes
  TopIcon,
  JungleIcon,
  MiddleIcon,
  BottomIcon,
  UnplayedIcon,

  // Combat & Stats
  MovementSpeedIcon,
  RangeIcon,
  AttacksActiveIcon,
  ChampionIcon,

  // Regions
  BandleCityCrestIcon,
  BilgewaterCrestIcon,
  DemaciaCrestIcon,
  FreljordCrestIcon,
  IoniaCrestIcon,
  IxtalCrestIcon,
  MtTargonCrestIcon,
  NoxusCrestIcon,
  PiltoverCrestIcon,
  ShadowIslesCrestIcon,
  ShurimaCrestIcon,
  VoidCrestIcon,
  ZaunCrestIcon,
};

// ==========================================
// ROLE INFORMATION & MAPS
// ==========================================
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

// ==========================================
// MAP TIỆN ÍCH CHO VỊ TRÍ / LANE
// ==========================================
export const POSITION_ICONS: Record<string, ImageMetadata> = {
  top: TopIcon,
  jungle: JungleIcon,
  middle: MiddleIcon,
  mid: MiddleIcon,
  bottom: BottomIcon,
  bot: BottomIcon,
  support: SupportIcon,
  unplayed: UnplayedIcon,
};

// ==========================================
// MAP TIỆN ÍCH CHO KHU VỰC (REGION CRESTS)
// ==========================================
export const REGION_CREST_ICONS: Record<string, ImageMetadata> = {
  "bandle-city": BandleCityCrestIcon,
  bandlecity: BandleCityCrestIcon,
  bilgewater: BilgewaterCrestIcon,
  demacia: DemaciaCrestIcon,
  freljord: FreljordCrestIcon,
  ionia: IoniaCrestIcon,
  ixtal: IxtalCrestIcon,
  targon: MtTargonCrestIcon,
  "mt-targon": MtTargonCrestIcon,
  "mount-targon": MtTargonCrestIcon,
  mttargon: MtTargonCrestIcon,
  noxus: NoxusCrestIcon,
  piltover: PiltoverCrestIcon,
  "shadow-isles": ShadowIslesCrestIcon,
  shadowisles: ShadowIslesCrestIcon,
  shurima: ShurimaCrestIcon,
  void: VoidCrestIcon,
  zaun: ZaunCrestIcon,
};
