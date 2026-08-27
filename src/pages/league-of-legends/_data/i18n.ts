export type Locale = 'vi_VN' | 'en_US';

export const defaultLocale: Locale = 'vi_VN';

export const supportedLocales: { code: Locale; label: string; flag: string }[] = [
  { code: 'vi_VN', label: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en_US', label: 'English (US)', flag: '🇺🇸' },
];

export const translations: Record<
  Locale,
  {
    meta: {
      title: string;
      description: string;
    };
    nav: {
      home: string;
      champions: string;
      universe: string;
      news: string;
      regions: string
    };
    championsHero: {
      tagline: string;
      heading: string;
      desc: string;
      quote: {
        text: string;
        author: string;
      };
      stats: {
        totalLabel: string;
        totalCount: string;
        lastUpdateLabel: string;
        lastUpdateValue: string;
      };
    };
    comingSoon: {
      tag: string;
      title: string;
      desc: string;
      backHome: string;
      viewChampions: string;
    };
    universePage: {
      title: string;
      desc: string;
    };
    regionsPage: {
      tagline: string;
      title: string;
      desc: string;
      searchPlaceholder: string;
      totalRegionsLabel: string;
      associatedChampionsLabel: string;
      viewDetails: string;
      noResultsTitle: string;
      noResultsDesc: string;
      clearFilter: string;
    };
    newsPage: {
      title: string;
      desc: string;
    };
    homePage: {
      title: string;
      desc: string;
    };
  }
> = {
  vi_VN: {
    meta: {
      title: 'Liên Minh Huyền Thoại',
      description: 'Trang thông tin & trải nghiệm Liên Minh Huyền Thoại',
    },
    nav: {
      home: 'Trang chủ',
      champions: 'Tướng',
      universe: 'Vũ trụ',
      news: 'Tin tức',
      regions: 'Vùng đất'
    },
    championsHero: {
      tagline: 'CHIẾN TRƯỜNG LÀ CỦA CHÚNG TA',
      heading: 'TƯỚNG',
      desc: 'Từ những thể thăng hoa cổ đại đến những kẻ tinh quái tộc yordle, hãy khám phá tất cả các anh hùng chiến đấu khắp cõi Runeterra.',
      quote: {
        text: 'Con người là gì, nếu không phải là sự tổng hòa của những ký ức và những lựa chọn.',
        author: 'BRAND',
      },
      stats: {
        totalLabel: 'TỔNG SỐ TƯỚNG',
        totalCount: '168',
        lastUpdateLabel: 'CẬP NHẬT MỚI NHẤT',
        lastUpdateValue: '25.05.2024',
      },
    },
    comingSoon: {
      tag: 'TÍNH NĂNG ĐANG PHÁT TRIỂN',
      title: 'SẮP RA MẮT',
      desc: 'Nội dung này đang được hoàn thiện. Hãy quay lại sau để đón xem những cập nhật mới nhất!',
      backHome: 'VỀ TRANG CHỦ',
      viewChampions: 'XEM DANH SÁCH TƯỚNG',
    },
    universePage: {
      title: 'Vũ Trụ Runeterra',
      desc: 'Khám phá lịch sử, vùng đất và câu chuyện sử thi của các vị tướng Runeterra.',
    },
    regionsPage: {
      tagline: 'VÙNG ĐẤT RUNETERRA',
      title: 'CÁC VÙNG ĐẤT',
      desc: 'Từ vương quốc Demacia kiêu hãnh đến xứ tuyết băng giá Freljord và cõi hư không The Void huyền bí. Khám phá các vùng đất tạo nên thế giới Liên Minh Huyền Thoại.',
      searchPlaceholder: 'Tìm kiếm vùng đất hoặc thủ phủ...',
      totalRegionsLabel: 'TỔNG SỐ VÙNG ĐẤT',
      associatedChampionsLabel: 'Tướng trực thuộc',
      viewDetails: 'KHÁM PHÁ CHI TIẾT',
      noResultsTitle: 'Không tìm thấy vùng đất nào',
      noResultsDesc: 'Hãy thử tìm kiếm với tên vùng đất hoặc từ khóa khác.',
      clearFilter: 'XÓA TÌM KIẾM',
    },
    newsPage: {
      title: 'Tin Tức & Bản Cập Nhật',
      desc: 'Cập nhật tin tức sự kiện, bản vá và thông báo mới nhất từ Riot Games.',
    },
    homePage: {
      title: 'Trang Chủ Liên Minh',
      desc: 'Cổng thông tin chính thức của Liên Minh Huyền Thoại.',
    },
  },
  en_US: {
    meta: {
      title: 'League of Legends',
      description: 'Official League of Legends game and universe hub',
    },
    nav: {
      home: 'Home',
      champions: 'Champions',
      universe: 'Universe',
      news: 'News',
      regions: 'Regions'

    },
    championsHero: {
      tagline: 'THE RIFT IS OURS',
      heading: 'CHAMPIONS',
      desc: 'From ancient ascended to yordle tricksters, explore all who fight across Runeterra.',
      quote: {
        text: 'What is a man, but the sum of his memories and his choices.',
        author: 'BRAND',
      },
      stats: {
        totalLabel: 'TOTAL CHAMPIONS',
        totalCount: '168',
        lastUpdateLabel: 'LAST UPDATE',
        lastUpdateValue: '25.05.2024',
      },
    },
    comingSoon: {
      tag: 'FEATURE UNDER DEVELOPMENT',
      title: 'COMING SOON',
      desc: 'This section is currently in development. Check back soon for exciting updates!',
      backHome: 'BACK TO HOME',
      viewChampions: 'VIEW CHAMPIONS',
    },
    universePage: {
      title: 'Runeterra Universe',
      desc: 'Explore the lore, regions, and epic stories behind the champions of Runeterra.',
    },
    regionsPage: {
      tagline: 'REALMS OF RUNETERRA',
      title: 'REGIONS',
      desc: 'From the proud kingdom of Demacia to the frozen wastes of the Freljord and the mysterious Void. Explore the factions and realms that shape the League of Legends universe.',
      searchPlaceholder: 'Search regions or territories...',
      totalRegionsLabel: 'TOTAL REGIONS',
      associatedChampionsLabel: 'Champions',
      viewDetails: 'EXPLORE REGION',
      noResultsTitle: 'No regions found',
      noResultsDesc: 'Try searching with a different region name or keyword.',
      clearFilter: 'CLEAR SEARCH',
    },
    newsPage: {
      title: 'News & Patch Notes',
      desc: 'Get the latest event announcements, patch notes, and news directly from Riot Games.',
    },
    homePage: {
      title: 'League of Legends Home',
      desc: 'The official gateway to the League of Legends experience.',
    },
  },
};

export function isValidLocale(locale: string): locale is Locale {
  return locale in translations;
}

export function getI18n(lang?: string) {
  const currentLang = (lang && isValidLocale(lang) ? lang : defaultLocale) as Locale;
  return {
    lang: currentLang,
    t: translations[currentLang],
    supportedLocales,
  };
}
