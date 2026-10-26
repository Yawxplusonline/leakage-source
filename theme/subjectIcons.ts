// Distinct, vibrant emoji icons and color schemes mapped to each subject
export const SUBJECT_ICONS: Record<string, { icon: string; bg: string; color: string }> = {
  // Languages
  'english-language': { icon: '📖', bg: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8' },
  'literature-in-english': { icon: '🎭', bg: 'rgba(168, 85, 247, 0.15)', color: '#A855F7' },
  'french': { icon: '🇫🇷', bg: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA' },
  'twi': { icon: '🇬🇭', bg: 'rgba(245, 158, 11, 0.15)', color: '#FBBF24' },
  'ghanaian-language': { icon: '🇬🇭', bg: 'rgba(245, 158, 11, 0.15)', color: '#FBBF24' },
  'arabic': { icon: '🇸🇦', bg: 'rgba(16, 185, 129, 0.15)', color: '#34D399' },

  // Mathematics & Computing
  'mathematics': { icon: '📐', bg: 'rgba(236, 72, 153, 0.15)', color: '#F472B6' },
  'core-mathematics': { icon: '➗', bg: 'rgba(236, 72, 153, 0.15)', color: '#F472B6' },
  'elective-mathematics': { icon: '∫dx', bg: 'rgba(217, 70, 239, 0.15)', color: '#E879F9' },
  'computing': { icon: '💻', bg: 'rgba(6, 182, 212, 0.15)', color: '#22D3EE' },
  'elective-ict': { icon: '🖥️', bg: 'rgba(6, 182, 212, 0.15)', color: '#22D3EE' },

  // Sciences
  'integrated-science': { icon: '🔬', bg: 'rgba(16, 185, 129, 0.15)', color: '#34D399' },
  'biology': { icon: '🧬', bg: 'rgba(34, 197, 94, 0.15)', color: '#4ADE80' },
  'chemistry': { icon: '🧪', bg: 'rgba(14, 165, 233, 0.15)', color: '#38BDF8' },
  'physics': { icon: '⚡', bg: 'rgba(234, 179, 8, 0.15)', color: '#FACC15' },

  // Social & Humanities
  'social-studies': { icon: '🌍', bg: 'rgba(20, 184, 166, 0.15)', color: '#2DD4BF' },
  'geography': { icon: '🗺️', bg: 'rgba(20, 184, 166, 0.15)', color: '#2DD4BF' },
  'history': { icon: '🏛️', bg: 'rgba(249, 115, 22, 0.15)', color: '#FB923C' },
  'government': { icon: '⚖️', bg: 'rgba(99, 102, 241, 0.15)', color: '#818CF8' },
  'economics': { icon: '📈', bg: 'rgba(16, 185, 129, 0.15)', color: '#34D399' },
  'rme': { icon: '🕊️', bg: 'rgba(217, 70, 239, 0.15)', color: '#E879F9' },
  'christian-religious-studies': { icon: '✝️', bg: 'rgba(139, 92, 246, 0.15)', color: '#A78BFA' },
  'islamic-religious-studies': { icon: '☪️', bg: 'rgba(16, 185, 129, 0.15)', color: '#34D399' },
  'traditional-religion': { icon: '🏺', bg: 'rgba(217, 119, 6, 0.15)', color: '#FBBF24' },

  // Business
  'business-management': { icon: '💼', bg: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA' },
  'financial-accounting': { icon: '📊', bg: 'rgba(16, 185, 129, 0.15)', color: '#34D399' },
  'cost-accounting': { icon: '🧾', bg: 'rgba(14, 165, 233, 0.15)', color: '#38BDF8' },
  'typewriting': { icon: '⌨️', bg: 'rgba(148, 163, 184, 0.15)', color: '#CBD5E1' },
  'clerical-office-duties': { icon: '📂', bg: 'rgba(100, 116, 139, 0.15)', color: '#94A3B8' },

  // Technical & Vocational
  'career-technology': { icon: '🛠️', bg: 'rgba(245, 158, 11, 0.15)', color: '#FBBF24' },
  'graphic-design': { icon: '🎨', bg: 'rgba(236, 72, 153, 0.15)', color: '#F472B6' },
  'general-knowledge-in-art': { icon: '🖼️', bg: 'rgba(168, 85, 247, 0.15)', color: '#C084FC' },
  'picture-making': { icon: '🖌️', bg: 'rgba(236, 72, 153, 0.15)', color: '#F472B6' },
  'sculpture': { icon: '🗿', bg: 'rgba(180, 83, 9, 0.15)', color: '#F59E0B' },
  'ceramics': { icon: '🏺', bg: 'rgba(217, 119, 6, 0.15)', color: '#FBBF24' },
  'textiles': { icon: '🧶', bg: 'rgba(244, 63, 94, 0.15)', color: '#FB7185' },
  'basketry': { icon: '🧺', bg: 'rgba(217, 119, 6, 0.15)', color: '#FBBF24' },
  'leatherwork': { icon: '👞', bg: 'rgba(180, 83, 9, 0.15)', color: '#D97706' },
  'jewellery': { icon: '💍', bg: 'rgba(234, 179, 8, 0.15)', color: '#FACC15' },
  'music': { icon: '🎵', bg: 'rgba(168, 85, 247, 0.15)', color: '#C084FC' },

  // Home Economics
  'foods-and-nutrition': { icon: '🥗', bg: 'rgba(34, 197, 94, 0.15)', color: '#4ADE80' },
  'clothing-and-textiles': { icon: '👗', bg: 'rgba(236, 72, 153, 0.15)', color: '#F472B6' },
  'management-in-living': { icon: '🏡', bg: 'rgba(245, 158, 11, 0.15)', color: '#FBBF24' },

  // Agriculture
  'general-agriculture': { icon: '🌱', bg: 'rgba(34, 197, 94, 0.15)', color: '#4ADE80' },
  'animal-husbandry': { icon: '🐄', bg: 'rgba(217, 119, 6, 0.15)', color: '#FBBF24' },
  'crop-husbandry-and-horticulture': { icon: '🌽', bg: 'rgba(234, 179, 8, 0.15)', color: '#FACC15' },
  'fisheries': { icon: '🐟', bg: 'rgba(6, 182, 212, 0.15)', color: '#22D3EE' },
  'forestry': { icon: '🌲', bg: 'rgba(16, 185, 129, 0.15)', color: '#34D399' }
};

export function getSubjectIconConfig(subjectId: string) {
  return SUBJECT_ICONS[subjectId] || { icon: '📚', bg: 'rgba(100, 116, 139, 0.15)', color: '#94A3B8' };
}
