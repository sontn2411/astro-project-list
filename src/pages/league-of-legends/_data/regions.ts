import type { ImageMetadata } from "astro";
import { REGION_CREST_ICONS } from "./icons";

export interface RegionImage {
  title: string;
  subtitle?: string;
  description?: string;
  uri: string;
  encoding?: string;
  width: number;
  height: number;
}

export interface RegionChampion {
  name: string;
  title: string;
  slug: string;
  imageUri?: string;
  associatedFactionSlug?: string;
}

export interface Region {
  type: string;
  title: string;
  sectionTitle: string;
  name: string;
  slug: string;
  description: string;
  cleanDescription: string;
  image: RegionImage;
  background: RegionImage;
  crestIcon?: ImageMetadata;
  associatedChampions: RegionChampion[];
  championsCount: number;
  url: string;
  // Localized metadata
  viName: string;
  viTitle: string;
  tagline: string;
}

interface RawFaction {
  type: string;
  title: string;
  "section-title": string;
  name: string;
  slug: string;
  description: string;
  image: RegionImage;
  background: RegionImage;
  echelon?: string;
  url: string;
}

interface RawChampion {
  type: string;
  name: string;
  title: string;
  "section-title"?: string;
  slug: string;
  "associated-faction"?: string;
  "associated-faction-slug"?: string;
  image?: {
    uri: string;
  };
  background?: {
    uri: string;
  };
}

interface UniverseSearchResponse {
  id: string;
  name: string;
  locale: string;
  champions: RawChampion[];
  factions: RawFaction[];
}

// Bảng thông tin bản địa hóa bổ trợ cho 13 vùng đất Runeterra
const REGION_METADATA_MAP: Record<
  string,
  { viName: string; viTitle: string; tagline: string; defaultSlug: string }
> = {
  zaun: {
    viName: "Zaun",
    viTitle: "Thành Phố Ngầm Ô Nhiễm",
    tagline: "Hóa Kỹ & Thế Giới Ngầm",
    defaultSlug: "zaun",
  },
  void: {
    viName: "Hư Không",
    viTitle: "Cõi Hư Vô Tận Cùng",
    tagline: "Cơn Đói Bất Tận",
    defaultSlug: "void",
  },
  ixtal: {
    viName: "Ixtal",
    viTitle: "Vương Quốc Rừng Thiêng",
    tagline: "Bậc Thầy Ma Thuật Nguyên Tố",
    defaultSlug: "ixtal",
  },
  piltover: {
    viName: "Piltover",
    viTitle: "Thành Phố Của Sự Tiến Bộ",
    tagline: "Kỳ Quan Hextech & Công Nghệ",
    defaultSlug: "piltover",
  },
  "shadow-isles": {
    viName: "Quần Đảo Bóng Đêm",
    viTitle: "Vùng Đất Bị Nguyền Rủa",
    tagline: "Màn Sương Đen Chết Chóc",
    defaultSlug: "shadow-isles",
  },
  "bandle-city": {
    viName: "Thành Phố Bandle",
    viTitle: "Xứ Sở Yordle Huyền Bí",
    tagline: "Thế Giới Tinh Linh Ma Thuật",
    defaultSlug: "bandle-city",
  },
  shurima: {
    viName: "Shurima",
    viTitle: "Đế Chế Sa Mạc Cổ Đại",
    tagline: "Thời Đại Thể Thăng Hoa",
    defaultSlug: "shurima",
  },
  "mount-targon": {
    viName: "Targon",
    viTitle: "Đỉnh Núi Của Thần Linh",
    tagline: "Thượng Nhân Vũ Trụ Tối Cao",
    defaultSlug: "mount-targon",
  },
  targon: {
    viName: "Targon",
    viTitle: "Đỉnh Núi Của Thần Linh",
    tagline: "Thượng Nhân Vũ Trụ Tối Cao",
    defaultSlug: "mount-targon",
  },
  demacia: {
    viName: "Demacia",
    viTitle: "Vương Quốc Công Lý & Danh Dự",
    tagline: "Bức Tường Kháng Ma Thạch",
    defaultSlug: "demacia",
  },
  bilgewater: {
    viName: "Bilgewater",
    viTitle: "Vịnh Cướp Biển & Thủy Quái",
    tagline: "Bến Cảng Không Luật Pháp",
    defaultSlug: "bilgewater",
  },
  noxus: {
    viName: "Noxus",
    viTitle: "Đế Chế Quân Sự Hùng Mạnh",
    tagline: "Sức Mạnh Là Trên Hết",
    defaultSlug: "noxus",
  },
  freljord: {
    viName: "Freljord",
    viTitle: "Vùng Đất Băng Giá Khắc Nghiệt",
    tagline: "Chiến Binh Băng Tộc Cổ Xưa",
    defaultSlug: "freljord",
  },
  ionia: {
    viName: "Ionia",
    viTitle: "Vùng Đất Đầu Tiên",
    tagline: "Cân Bằng Giữa Tự Nhiên & Ma Thuật",
    defaultSlug: "ionia",
  },
};

/**
 * Làm sạch văn bản HTML lấy từ Universe API
 */
export function cleanHtmlText(html: string): string {
  if (!html) return "";
  return html
    .replace(/<p[^>]*>/gi, "")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rdquo;/g, "”")
    .replace(/&ldquo;/g, "“")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .trim();
}

/**
 * Lấy danh sách 13 vùng đất Runeterra từ Universe Meeps API
 */
export async function getRegions(): Promise<Region[]> {
  const url = "https://universe-meeps.leagueoflegends.com/v1/en_us/search/index.json";

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch universe search index: ${res.status} ${res.statusText}`);
    }

    const data: UniverseSearchResponse = await res.json();
    const rawFactions = data.factions || [];
    const rawChampions = data.champions || [];

    const regions: Region[] = rawFactions.map((faction) => {
      const slug = faction.slug;
      const meta = REGION_METADATA_MAP[slug] || {
        viName: faction.name,
        viTitle: faction.title,
        tagline: "Vùng Đất Runeterra",
        defaultSlug: slug,
      };

      // Tìm các vị tướng trực thuộc vùng đất này
      const associatedChamps: RegionChampion[] = rawChampions
        .filter((c) => {
          const champFaction = c["associated-faction-slug"];
          if (!champFaction) return false;
          if (champFaction === slug) return true;
          if (slug === "mount-targon" && (champFaction === "targon" || champFaction === "mount-targon")) return true;
          return false;
        })
        .map((c) => ({
          name: c.name,
          title: c.title,
          slug: c.slug,
          imageUri: c.image?.uri,
          associatedFactionSlug: c["associated-faction-slug"],
        }));

      // Lấy Crest Icon tương ứng
      const crestIcon =
        REGION_CREST_ICONS[slug] ||
        (slug === "mount-targon" ? REGION_CREST_ICONS["targon"] : undefined);

      const cleanDesc = cleanHtmlText(faction.description);

      return {
        type: faction.type,
        title: faction.title,
        sectionTitle: faction["section-title"] || faction.title,
        name: faction.name,
        slug: faction.slug,
        description: faction.description,
        cleanDescription: cleanDesc,
        image: faction.image,
        background: faction.background || faction.image,
        crestIcon,
        associatedChampions: associatedChamps,
        championsCount: associatedChamps.length,
        url: faction.url,
        viName: meta.viName,
        viTitle: meta.viTitle,
        tagline: meta.tagline,
      };
    });

    return regions;
  } catch (error) {
    console.error("[UniverseMeeps] Error fetching regions:", error);
    return [];
  }
}
