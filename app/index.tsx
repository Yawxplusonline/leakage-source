import React, { useState, useMemo, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Modal,
  Alert,
  StatusBar
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { EXAM_TYPES, PROGRAMMES, getSubjects } from '../data/catalog';
import { AppStorageService } from '../data/storage';
import { SystemConfig, UserProfile, UserRole } from '../data/types';
import { COLORS } from '../theme/colors';
import { getSubjectIconConfig } from '../theme/subjectIcons';

export default function HomeScreen() {
  const [systemConfig, setSystemConfig] = useState<SystemConfig | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  const [exam, setExam] = useState('BECE');
  const [programme, setProgramme] = useState('All subjects');
  const [selectedYear, setSelectedYear] = useState('2027');
  const [search, setSearch] = useState('');

  const [showRoleModal, setShowRoleModal] = useState(false);

  const loadData = useCallback(async () => {
    const config = await AppStorageService.getSystemConfig();
    const user = await AppStorageService.getCurrentUser();
    setSystemConfig(config);
    setCurrentUser(user);
    if (user.role === 'student') {
      setSelectedYear(config.activeYear);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const activeYear = systemConfig?.activeYear || '2027';
  const allYears = ['2027', '2028', '2029', '2030'];

  const subjects = useMemo(
    () =>
      getSubjects(exam, programme).filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase())
      ),
    [exam, programme, search]
  );

  const examOptions = EXAM_TYPES;
  const programmes = exam === 'BECE' ? ['All subjects'] : ['All subjects', ...PROGRAMMES];

  const handleSelectYear = (y: string) => {
    if (currentUser?.role === 'student' && y !== activeYear) {
      Alert.alert(
        'Locked Examination Year',
        `Year ${y} question banks are currently hidden and require official Administrator approval before release (PRD Policy). Only ${activeYear} is active for student practice.`,
        [{ text: 'Understood' }]
      );
      return;
    }
    setSelectedYear(y);
  };

  const handleSwitchRole = async (newRole: UserRole) => {
    if (!currentUser) return;
    const updated: UserProfile = {
      ...currentUser,
      role: newRole,
      name:
        newRole === 'student'
          ? 'Candidate Kwame'
          : newRole === 'reviewer'
          ? 'Academic Reviewer Mensah'
          : 'Administrator Addo'
    };
    await AppStorageService.saveCurrentUser(updated);
    setCurrentUser(updated);
    setShowRoleModal(false);
    if (newRole === 'student') {
      setSelectedYear(activeYear);
    }
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      {/* Top Glass Navigation Bar */}
      <View style={styles.topBar}>
        <View style={styles.userProfilePill}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarLetter}>
              {currentUser?.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View>
            <Text style={styles.roleTag}>
              {currentUser?.role.toUpperCase()} • MODE
            </Text>
            <Text style={styles.userName}>{currentUser?.name}</Text>
          </View>
        </View>

        <View style={styles.navActions}>
          <Pressable
            style={styles.studentPortalShortcutBtn}
            onPress={() => router.push('/student' as any)}
          >
            <Text style={styles.studentPortalShortcutText}>🎓 Student Portal</Text>
          </Pressable>
          <Pressable
            style={styles.navScoreBtn}
            onPress={() => router.push('/history')}
          >
            <Text style={styles.navScoreBtnText}>⚡ Scores</Text>
          </Pressable>
          <Pressable
            style={styles.navRoleBtn}
            onPress={() => setShowRoleModal(true)}
          >
            <Text style={styles.navRoleBtnText}>Role ▾</Text>
          </Pressable>
        </View>
      </View>

      {/* Hero Card with Gradient and Glow */}
      <LinearGradient
        colors={COLORS.heroGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={styles.heroGlowBadgeRow}>
          <View style={styles.ghanaBadge}>
            <Text style={styles.ghanaBadgeText}>🇬🇭 GHANA EXAM PREP</Text>
          </View>
          <View style={styles.activeYearPill}>
            <Text style={styles.activeYearPillText}>★ ACTIVE: {activeYear}</Text>
          </View>
        </View>

        <Text style={styles.heroTitle}>
          LEAKAGE <Text style={{ color: COLORS.primary }}>SOURCE</Text>
        </Text>
        <Text style={styles.heroText}>
          Original syllabus practice material. Master 100 verified questions per subject with instant answers, step-by-step explanations, and timed mock tests.
        </Text>

        <View style={styles.badgeRow}>
          <View style={styles.tagPill}>
            <Text style={styles.tagPillText}>BECE Standard</Text>
          </View>
          <View style={styles.tagPill}>
            <Text style={styles.tagPillText}>WASSCE Core & Electives</Text>
          </View>
          <View style={styles.tagPill}>
            <Text style={styles.tagPillText}>100 MCQs / Subject</Text>
          </View>
        </View>

        {currentUser?.role !== 'student' && (
          <Pressable
            style={styles.adminHeroBtn}
            onPress={() => router.push('/admin')}
          >
            <LinearGradient
              colors={COLORS.goldGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.adminHeroBtnGradient}
            >
              <Text style={styles.adminHeroBtnText}>
                ⚙ Administrator & Reviewer Portal →
              </Text>
            </LinearGradient>
          </Pressable>
        )}
      </LinearGradient>

      {/* Examination Selector Grid */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionHeading}>Target Examination</Text>
        <Text style={styles.sectionSubtext}>All tracks</Text>
      </View>
      <View style={styles.examGrid}>
        {examOptions.map(e => {
          const isActive = exam === e;
          return (
            <Pressable
              key={e}
              onPress={() => {
                setExam(e);
                setProgramme('All subjects');
              }}
              style={[styles.examGridCard, isActive && styles.examGridCardActive]}
            >
              <Text
                style={[
                  styles.examGridCardText,
                  isActive && styles.examGridCardTextActive
                ]}
              >
                {e}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Programme Filter for WASSCE */}
      {exam !== 'BECE' && (
        <>
          <Text style={styles.miniLabel}>ELECTIVE PROGRAMME</Text>
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
                    styles.programmeChip,
                    isActive && styles.programmeChipActive
                  ]}
                >
                  <Text
                    style={[
                      styles.programmeChipText,
                      isActive && styles.programmeChipTextActive
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

      {/* Practice Year Card with Locked Safeguards */}
      <View style={styles.yearContainer}>
        <View style={styles.yearHeaderRow}>
          <Text style={styles.yearSectionTitle}>Question Bank Release</Text>
          <Text style={styles.yearPolicyNote}>
            {currentUser?.role === 'student'
              ? `Only ${activeYear} active (PRD Policy)`
              : `Server Active: ${activeYear}`}
          </Text>
        </View>

        <View style={styles.yearButtonsRow}>
          {allYears.map(y => {
            const isCurrentlyActive = y === activeYear;
            const isLockedForStudent = currentUser?.role === 'student' && !isCurrentlyActive;
            const isSelected = selectedYear === y;

            return (
              <Pressable
                key={y}
                onPress={() => handleSelectYear(y)}
                style={[
                  styles.yearButton,
                  isSelected && styles.yearButtonSelected,
                  isLockedForStudent && styles.yearButtonLocked
                ]}
              >
                <Text
                  style={[
                    styles.yearButtonText,
                    isSelected && styles.yearButtonTextSelected,
                    isLockedForStudent && styles.yearButtonTextLocked
                  ]}
                >
                  {y} {isLockedForStudent ? '🔒' : isCurrentlyActive ? '★' : ''}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Subject Search Bar */}
      <View style={styles.searchWrapper}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search subject (e.g. Mathematics, Twi, French, Science)..."
          placeholderTextColor={COLORS.textMuted}
          style={styles.searchInput}
        />
        {search.length > 0 && (
          <Pressable onPress={() => setSearch('')}>
            <Text style={styles.clearSearch}>✕</Text>
          </Pressable>
        )}
      </View>

      {/* Subjects Header */}
      <View style={styles.subjectsHeaderRow}>
        <Text style={styles.sectionHeading}>
          Subjects ({exam})
        </Text>
        <View style={styles.subjectCountPill}>
          <Text style={styles.subjectCountText}>
            {subjects.length} Available • 100 Qs Each
          </Text>
        </View>
      </View>

      {/* Subject Cards */}
      <View style={styles.subjectCardsList}>
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
                    year: selectedYear,
                    programme
                  }
                })
              }
            >
              <View
                style={[
                  styles.subjectIconBox,
                  { backgroundColor: iconConfig.bg }
                ]}
              >
                <Text style={styles.subjectIconEmoji}>
                  {iconConfig.icon}
                </Text>
              </View>

              <View style={styles.subjectInfo}>
                <View style={styles.subjectNameRow}>
                  <Text style={styles.subjectName}>{subject.name}</Text>
                  {(isTwi || isFrench || isArabic) && (
                    <View style={styles.langBadge}>
                      <Text style={styles.langBadgeText}>
                        {isTwi ? 'TWI' : isFrench ? 'FRENCH' : 'ARABIC'}
                      </Text>
                    </View>
                  )}
                </View>

                <Text style={[styles.subjectMeta, { color: iconConfig.color }]}>
                  {subject.group} • 100 MCQs • {selectedYear} Bank
                </Text>
                <Text style={styles.subjectDesc} numberOfLines={2}>
                  {subject.description}
                </Text>
              </View>

              <View style={styles.cardArrowCircle}>
                <Text style={styles.cardArrow}>›</Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      {/* Official Disclaimer Banner */}
      <View style={styles.disclaimerBox}>
        <View style={styles.disclaimerHeader}>
          <Text style={styles.disclaimerBadge}>OFFICIAL DISCLAIMER</Text>
        </View>
        <Text style={styles.disclaimerText}>
          {systemConfig?.contentDisclaimer ||
            'Original syllabus-based practice material. Not leaked, official, predicted, or guaranteed examination questions.'}
        </Text>
      </View>

      <Text style={styles.footerNote}>
        LEAKAGE SOURCE • Ghana BECE & WASSCE Preparation Platform
      </Text>

      {/* Role Simulation Modal */}
      <Modal visible={showRoleModal} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Select Simulation Role</Text>
            <Text style={styles.modalDescription}>
              Switch roles to experience candidate revision or administrative release controls as specified in the PRD.
            </Text>

            <Pressable
              style={[
                styles.roleOptionCard,
                currentUser?.role === 'student' && styles.roleOptionActive
              ]}
              onPress={() => handleSwitchRole('student')}
            >
              <Text style={styles.roleOptionEmoji}>👨‍🎓</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.roleOptionTitle}>Student / Candidate</Text>
                <Text style={styles.roleOptionText}>
                  Restricted to active {activeYear} approved bank. 100 questions per subject with explanations.
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={[
                styles.roleOptionCard,
                currentUser?.role === 'reviewer' && styles.roleOptionActive
              ]}
              onPress={() => handleSwitchRole('reviewer')}
            >
              <Text style={styles.roleOptionEmoji}>🔍</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.roleOptionTitle}>Academic Reviewer</Text>
                <Text style={styles.roleOptionText}>
                  Verify curriculum mapping, check answer accuracy, and approve questions.
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={[
                styles.roleOptionCard,
                currentUser?.role === 'admin' && styles.roleOptionActive
              ]}
              onPress={() => handleSwitchRole('admin')}
            >
              <Text style={styles.roleOptionEmoji}>🛡</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.roleOptionTitle}>Administrator</Text>
                <Text style={styles.roleOptionText}>
                  Full governance: Year Rollover wizard, snapshot backups, emergency rollback, audit logs.
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setShowRoleModal(false)}
            >
              <Text style={styles.modalCloseButtonText}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 16, paddingBottom: 50, gap: 14 },

  // Top Nav Bar
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
  userProfilePill: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.primaryDark,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarLetter: { color: COLORS.textWhite, fontSize: 16, fontWeight: '900' },
  roleTag: { fontSize: 10, fontWeight: '900', color: COLORS.primary, letterSpacing: 1 },
  userName: { fontSize: 13, fontWeight: '800', color: COLORS.textWhite },
  navActions: { flexDirection: 'row', gap: 8 },
  studentPortalShortcutBtn: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.emerald
  },
  studentPortalShortcutText: { color: COLORS.emerald, fontSize: 11, fontWeight: '900' },
  navScoreBtn: {
    backgroundColor: COLORS.surfaceElevated,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder
  },
  navScoreBtnText: { color: COLORS.textAccent, fontSize: 12, fontWeight: '800' },
  navRoleBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10
  },
  navRoleBtnText: { color: COLORS.bg, fontSize: 12, fontWeight: '900' },

  // Hero Section
  hero: {
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
    gap: 12
  },
  heroGlowBadgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ghanaBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12
  },
  ghanaBadgeText: { color: '#FCD34D', fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  activeYearPill: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12
  },
  activeYearPillText: { color: COLORS.bg, fontSize: 11, fontWeight: '900' },
  heroTitle: {
    color: COLORS.textWhite,
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -0.5,
    lineHeight: 40
  },
  heroText: {
    color: '#CBD5E1',
    fontSize: 13,
    lineHeight: 20
  },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  tagPill: {
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)'
  },
  tagPillText: { color: COLORS.textWhite, fontSize: 11, fontWeight: '700' },
  adminHeroBtn: { marginTop: 4, borderRadius: 14, overflow: 'hidden' },
  adminHeroBtnGradient: { padding: 12, alignItems: 'center', borderRadius: 14 },
  adminHeroBtnText: { color: '#000000', fontWeight: '900', fontSize: 13 },

  // Section Headers
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 4
  },
  sectionHeading: { fontSize: 17, fontWeight: '900', color: COLORS.textWhite },
  sectionSubtext: { fontSize: 11, color: COLORS.textMuted },
  miniLabel: { fontSize: 10, fontWeight: '900', color: COLORS.textSecondary, letterSpacing: 1, marginTop: 4 },

  // Exam 2x2 Grid for instant mobile visibility
  examGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4
  },
  examGridCard: {
    width: '48.5%',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52
  },
  examGridCardActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8
  },
  examGridCardText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textWhite,
    textAlign: 'center'
  },
  examGridCardTextActive: {
    color: COLORS.bg,
    fontWeight: '900'
  },

  // Programme Chips
  programmeChip: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder
  },
  programmeChipActive: {
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    borderColor: COLORS.primary
  },
  programmeChipText: { fontSize: 11, fontWeight: '700', color: COLORS.textSecondary },
  programmeChipTextActive: { color: COLORS.primary },

  // Year Container
  yearContainer: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    gap: 10
  },
  yearHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  yearSectionTitle: { fontSize: 14, fontWeight: '800', color: COLORS.textWhite },
  yearPolicyNote: { fontSize: 11, color: COLORS.textSecondary, fontWeight: '600' },
  yearButtonsRow: { flexDirection: 'row', gap: 8 },
  yearButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    alignItems: 'center'
  },
  yearButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary
  },
  yearButtonLocked: { opacity: 0.45 },
  yearButtonText: { fontSize: 13, fontWeight: '900', color: COLORS.textWhite },
  yearButtonTextSelected: { color: COLORS.bg },
  yearButtonTextLocked: { color: COLORS.textMuted },

  // Search Bar
  searchWrapper: {
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
  clearSearch: { color: COLORS.textMuted, fontSize: 16, padding: 4 },

  // Subjects List
  subjectsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4
  },
  subjectCountPill: {
    backgroundColor: COLORS.surfaceElevated,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder
  },
  subjectCountText: { fontSize: 11, fontWeight: '800', color: COLORS.primary },
  subjectCardsList: { gap: 10 },
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
  subjectIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder
  },
  subjectIconEmoji: { fontSize: 24 },
  subjectInfo: { flex: 1, gap: 2 },
  subjectNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  subjectName: { fontSize: 15, fontWeight: '800', color: COLORS.textWhite },
  langBadge: {
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.primary
  },
  langBadgeText: { fontSize: 9, fontWeight: '900', color: COLORS.primary },
  subjectMeta: { fontSize: 11, color: COLORS.primary, fontWeight: '700' },
  subjectDesc: { fontSize: 11, color: COLORS.textSecondary, lineHeight: 16 },
  cardArrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardArrow: { fontSize: 20, color: COLORS.textSecondary, fontWeight: '400' },

  // Disclaimer
  disclaimerBox: {
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
    gap: 6
  },
  disclaimerHeader: { flexDirection: 'row' },
  disclaimerBadge: { fontSize: 10, fontWeight: '900', color: COLORS.accent, letterSpacing: 1 },
  disclaimerText: { fontSize: 11, lineHeight: 17, color: '#FDE68A' },
  footerNote: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
    marginTop: 6
  },

  // Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    padding: 20
  },
  modalSheet: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    gap: 12
  },
  modalTitle: { fontSize: 18, fontWeight: '900', color: COLORS.textWhite },
  modalDescription: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 18 },
  roleOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder
  },
  roleOptionActive: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(6, 182, 212, 0.15)'
  },
  roleOptionEmoji: { fontSize: 24 },
  roleOptionTitle: { fontSize: 14, fontWeight: '800', color: COLORS.textWhite },
  roleOptionText: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2, lineHeight: 16 },
  modalCloseButton: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 6
  },
  modalCloseButtonText: { color: COLORS.bg, fontWeight: '900', fontSize: 14 }
});
