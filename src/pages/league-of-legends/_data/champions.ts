export * from "./icons";

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

export interface ChampionSkillVideosMap {
  P?: string;
  Q?: string;
  W?: string;
  E?: string;
  R?: string;
}

/**
 * Lấy video mô tả kỹ năng (Passive, Q, W, E, R) từ CDN json
 * @param championId Tên id tướng (ví dụ: "Aatrox", "Ahri")
 * @param championKey Key số của tướng (ví dụ: "266", "103")
 */
export async function getChampionSkillVideos(
  championId: string,
  championKey?: string
): Promise<ChampionSkillVideosMap> {
  const url = `https://cdn.jsdelivr.net/gh/sontn2411/lol-data/champions/${championId}.json`;
  const result: ChampionSkillVideosMap = {};

  try {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      let key4 = "";

      if (data.spells && Array.isArray(data.spells)) {
        const spellKeys = ["Q", "W", "E", "R"] as const;
        data.spells.forEach((spell: { abilityVideoPath?: string }, idx: number) => {
          if (spell?.abilityVideoPath && idx < spellKeys.length) {
            // Chuẩn hóa URL thiếu dấu gạch chéo
            const normalizedUrl = spell.abilityVideoPath.replace(
              "cloudfront.netchampion-abilities",
              "cloudfront.net/champion-abilities"
            );
            result[spellKeys[idx]] = normalizedUrl;

            if (!key4) {
              const match = normalizedUrl.match(/ability_(\d{4})_/);
              if (match) key4 = match[1];
            }
          }
        });
      }

      // Tìm id 4 số để tạo video cho Passive (P) nếu cần
      if (!key4 && data.id) {
        key4 = String(data.id).padStart(4, "0");
      }
      if (!key4 && championKey) {
        key4 = String(championKey).padStart(4, "0");
      }

      if (key4) {
        result.P = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key4}/ability_${key4}_P1.webm`;
        // Nếu các chiêu khác bị thiếu link, tự bù vào
        if (!result.Q) result.Q = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key4}/ability_${key4}_Q1.webm`;
        if (!result.W) result.W = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key4}/ability_${key4}_W1.webm`;
        if (!result.E) result.E = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key4}/ability_${key4}_E1.webm`;
        if (!result.R) result.R = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key4}/ability_${key4}_R1.webm`;
      }

      return result;
    }
  } catch (error) {
    console.error(`[SkillVideos] Error fetching skill videos for ${championId}:`, error);
  }

  // Fallback nếu không fetch được CDN json nhưng có championKey
  if (championKey) {
    const key4 = String(championKey).padStart(4, "0");
    result.P = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key4}/ability_${key4}_P1.webm`;
    result.Q = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key4}/ability_${key4}_Q1.webm`;
    result.W = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key4}/ability_${key4}_W1.webm`;
    result.E = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key4}/ability_${key4}_E1.webm`;
    result.R = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key4}/ability_${key4}_R1.webm`;
  }

  return result;
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
