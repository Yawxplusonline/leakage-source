import React, { useState, useMemo, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  StatusBar
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { EXAM_TYPES, PROGRAMMES, getSubjects } from '../../data/catalog';
import { AppStorageService } from '../../data/storage';
import { SystemConfig, UserProfile } from '../../data/types';
import { COLORS } from '../../theme/colors';
import { getSubjectIconConfig } from '../../theme/subjectIcons';

export default function StudentPortalScreen() {
  const [systemConfig, setSystemConfig] = useState<SystemConfig | null>(null);
  const [studentUser, setStudentUser] = useState<UserProfile | null>(null);

  const [exam, setExam] = useState('BECE');
  const [programme, setProgramme] = useState('All subjects');
  const [search, setSearch] = useState('');

  const loadData = useCallback(async () => {
    const config = await AppStorageService.getSystemConfig();
    const user = await AppStorageService.getCurrentUser();
    setSystemConfig(config);
    // Guarantee this portal stays in candidate student mode
    setStudentUser({
      ...user,
      role: 'student',
      name: user.role === 'student' ? user.name : 'Candidate Kwame'
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const activeYear = systemConfig?.activeYear || '2027';

  const subjects = useMemo(
    () =>
      getSubjects(exam, programme).filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase())
      ),
    [exam, programme, search]
  );

  const examOptions = EXAM_TYPES;
  const programmes = exam === 'BECE' ? ['All subjects'] : ['All subjects', ...PROGRAMMES];

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      {/* Student Protected Top Banner */}
      <View style={styles.topBar}>
        <View style={styles.studentBadge}>
          <View style={styles.studentAvatar}>
            <Text style={styles.studentAvatarText}>🎓</Text>
          </View>
          <View>
            <View style={styles.candidateRow}>
              <Text style={styles.portalTag}>STUDENT CANDIDATE PORTAL</Text>
              <View style={styles.liveIndicator} />
            </View>
          </View>
        </View>

        <Pressable
          style={styles.scoresBtn}
          onPress={() => router.push('/history')}
        >
          <Text style={styles.scoresBtnText}>📊 My Results</Text>
        </Pressable>
      </View>

      {/* Hero Welcome Card */}
      <LinearGradient
        colors={COLORS.heroGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={styles.heroTopRow}>
          <View style={styles.activeYearPill}>
            <Text style={styles.activeYearText}>★ ACTIVE EXAM YEAR: {activeYear}</Text>
          </View>
          <View style={styles.ghanaPill}>
            <Text style={styles.ghanaPillText}>🇬🇭 BECE & WASSCE</Text>
          </View>
        </View>

        <Text style={styles.heroTitle}>
          CANDIDATE <Text style={{ color: COLORS.primary }}>PRACTICE</Text>
        </Text>
        <Text style={styles.heroSub}>
          Practise 100 syllabus-verified objective questions per subject. Get step-by-step answers in Practice Mode or take a full Timed Mock Exam.
        </Text>

        <View style={styles.infoPillsRow}>
          <View style={styles.infoPill}>
            <Text style={styles.infoPillText}>✓ 100 Verified Qs / Subject</Text>
          </View>
          <View style={styles.infoPill}>
            <Text style={styles.infoPillText}>✓ Native Languages (Twi, French, Arabic)</Text>
          </View>
          <View style={styles.infoPill}>
            <Text style={styles.infoPillText}>✓ Timed Mock Simulation</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Exam Selector */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Select Examination</Text>
        <Text style={styles.sectionSub}>Choose your track</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, paddingBottom: 4 }}
      >
        {examOptions.map(e => {
          const isActive = exam === e;
          return (
            <Pressable
              key={e}
              onPress={() => {
                setExam(e);
                setProgramme('All subjects');
              }}
              style={[styles.examChip, isActive && styles.examChipActive]}
            >
              <Text
                style={[
                  styles.examChipText,
                  isActive && styles.examChipTextActive
                ]}
              >
                {e}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Electives for WASSCE */}
      {exam !== 'BECE' && (
        <>
          <Text style={styles.filterLabel}>ELECTIVE PROGRAMME</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingBottom: 4 }}
          >
            {programmes.map(p => {
              const isActive = programme === p;
              return (
                <Pressable
                  key={p}
                  onPress={() => setProgramme(p)}
                  style={[
                    styles.progChip,
                    isActive && styles.progChipActive
                  ]}
                >
                  <Text
                    style={[
                      styles.progChipText,
                      isActive && styles.progChipTextActive
                    ]}
                  >
                    {p}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </>
      )}

      {/* Active Year Guard Card */}
      <View style={styles.activeYearCard}>
        <View style={styles.lockRow}>
          <Text style={styles.activeYearCardTitle}>Authorized Year: {activeYear}</Text>
          <Text style={styles.lockIcon}>🔒 2028-2030 Private</Text>
        </View>
        <Text style={styles.activeYearCardText}>
          Candidates have direct access to the approved {activeYear} syllabus bank. Future question banks remain locked on the server until authorized by administrators.
        </Text>
      </View>

      {/* Subject Search */}
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search subjects (e.g. Mathematics, Twi, Science)..."
          placeholderTextColor={COLORS.textMuted}
          style={styles.searchInput}
        />
        {search.length > 0 && (
          <Pressable onPress={() => setSearch('')}>
            <Text style={styles.searchClear}>✕</Text>
          </Pressable>
        )}
      </View>

      {/* Subject Count */}
      <View style={styles.subjectCountRow}>
        <Text style={styles.sectionTitle}>Subjects ({exam})</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countBadgeText}>{subjects.length} Subjects • 100 Qs Each</Text>
        </View>
      </View>

      {/* Subject Cards with Custom Themed Icons */}
      <View style={styles.subjectList}>
        {subjects.map(subject => {
          const iconConfig = getSubjectIconConfig(subject.id);
          const isTwi = subject.id === 'twi' || subject.id === 'ghanaian-language';
          const isFrench = subject.id === 'french';
          const isArabic = subject.id === 'arabic';

          return (
            <Pressable
              key={subject.id}
              style={styles.subjectCard}
              onPress={() =>
                router.push({
                  pathname: '/subject/[id]',
                  params: {
                    id: subject.id,
                    exam,
                    year: activeYear,
                    programme
                  }
                })
              }
            >
              <View style={[styles.subjectIconWrap, { backgroundColor: iconConfig.bg }]}>
                <Text style={styles.subjectIconEmoji}>{iconConfig.icon}</Text>
              </View>

              <View style={styles.subjectDetails}>
                <View style={styles.subjectTitleRow}>
                  <Text style={styles.subjectName}>{subject.name}</Text>
                  {(isTwi || isFrench || isArabic) && (
                    <View style={styles.langPill}>
                      <Text style={styles.langPillText}>
                        {isTwi ? 'TWI' : isFrench ? 'FRANÇAIS' : 'العربية'}
                      </Text>
                    </View>
                  )}
                </View>

                <Text style={[styles.subjectCategory, { color: iconConfig.color }]}>
                  {subject.group} • 100 Objective Questions
                </Text>
                <Text style={styles.subjectDescription} numberOfLines={2}>
                  {subject.description}
                </Text>
              </View>

              <View style={styles.arrowCircle}>
                <Text style={styles.arrowText}>›</Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      {/* Content Disclaimer */}
      <View style={styles.disclaimerContainer}>
        <Text style={styles.disclaimerTitle}>EXAM PREPARATION NOTICE</Text>
        <Text style={styles.disclaimerBody}>
          {systemConfig?.contentDisclaimer ||
            'Original syllabus-based practice material. Not leaked, official, predicted, or guaranteed examination questions.'}
        </Text>
      </View>

      <Text style={styles.studentFooter}>
        LEAKAGE SOURCE • Ghana Candidate Study Portal
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 16, paddingBottom: 50, gap: 14 },

  // Top Bar
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder
  },
  studentBadge: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  studentAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary
  },
  studentAvatarText: { fontSize: 18 },
  candidateRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  portalTag: { fontSize: 13, fontWeight: '900', color: COLORS.primary, letterSpacing: 1 },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.emerald
  },
  scoresBtn: {
    backgroundColor: COLORS.surfaceElevated,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder
  },
  scoresBtnText: { color: COLORS.textAccent, fontSize: 12, fontWeight: '800' },

  // Hero Card
  hero: {
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
    gap: 12
  },
  heroTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  activeYearPill: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12
  },
  activeYearText: { color: COLORS.bg, fontSize: 10, fontWeight: '900' },
  ghanaPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12
  },
  ghanaPillText: { color: '#FCD34D', fontSize: 10, fontWeight: '800' },
  heroTitle: {
    color: COLORS.textWhite,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.5,
    lineHeight: 38
  },
  heroSub: { color: '#CBD5E1', fontSize: 13, lineHeight: 20 },
  infoPillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 4 },
  infoPill: {
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)'
  },
  infoPillText: { color: COLORS.textWhite, fontSize: 10, fontWeight: '700' },

  // Section Headers
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 4
  },
  sectionTitle: { fontSize: 17, fontWeight: '900', color: COLORS.textWhite },
  sectionSub: { fontSize: 11, color: COLORS.textMuted },
  filterLabel: { fontSize: 10, fontWeight: '900', color: COLORS.textSecondary, letterSpacing: 1, marginTop: 4 },

  // Chips
  examChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder
  },
  examChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  examChipText: { fontSize: 13, fontWeight: '800', color: COLORS.textSecondary },
  examChipTextActive: { color: COLORS.bg },

  progChip: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder
  },
  progChipActive: {
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    borderColor: COLORS.primary
  },
  progChipText: { fontSize: 11, fontWeight: '700', color: COLORS.textSecondary },
  progChipTextActive: { color: COLORS.primary },

  // Active Year Card
  activeYearCard: {
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    gap: 6
  },
  lockRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  activeYearCardTitle: { fontSize: 13, fontWeight: '800', color: COLORS.primary },
  lockIcon: { fontSize: 11, fontWeight: '700', color: COLORS.textMuted },
  activeYearCardText: { fontSize: 11, color: COLORS.textSecondary, lineHeight: 17 },

  // Search
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder
  },
  searchIcon: { fontSize: 15, marginRight: 8 },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    color: COLORS.textWhite,
    fontSize: 13,
    fontWeight: '600'
  },
  searchClear: { color: COLORS.textMuted, fontSize: 16, padding: 4 },

  // Count
  subjectCountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4
  },
  countBadge: {
    backgroundColor: COLORS.surfaceElevated,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder
  },
  countBadgeText: { fontSize: 11, fontWeight: '800', color: COLORS.primary },

  // Subject Cards
  subjectList: { gap: 10 },
  subjectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    gap: 12
  },
  subjectIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder
  },
  subjectIconEmoji: { fontSize: 24 },
  subjectDetails: { flex: 1, gap: 2 },
  subjectTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  subjectName: { fontSize: 15, fontWeight: '800', color: COLORS.textWhite },
  langPill: {
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.primary
  },
  langPillText: { fontSize: 9, fontWeight: '900', color: COLORS.primary },
  subjectCategory: { fontSize: 11, fontWeight: '700' },
  subjectDescription: { fontSize: 11, color: COLORS.textSecondary, lineHeight: 16 },
  arrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center'
  },
  arrowText: { fontSize: 20, color: COLORS.textSecondary, fontWeight: '400' },

  // Disclaimer
  disclaimerContainer: {
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
    gap: 6
  },
  disclaimerTitle: { fontSize: 10, fontWeight: '900', color: COLORS.accent, letterSpacing: 1 },
  disclaimerBody: { fontSize: 11, lineHeight: 17, color: '#FDE68A' },
  studentFooter: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
    marginTop: 6
  }
});
