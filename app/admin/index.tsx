import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { AppStorageService } from '../../data/storage';
import { SystemConfig, UserProfile, QuestionItem, AuditLogEntry } from '../../data/types';
import { COLORS } from '../../theme/colors';

export default function AdminPortalScreen() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [systemConfig, setSystemConfig] = useState<SystemConfig | null>(null);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);

  const [activeTab, setActiveTab] = useState<'overview' | 'review' | 'rollover' | 'audit'>('overview');
  const [selectedTargetYear, setSelectedTargetYear] = useState('2028');
  const [rolloverInProgress, setRolloverInProgress] = useState(false);

  const loadAdminData = useCallback(async () => {
    setLoading(true);
    const user = await AppStorageService.getCurrentUser();
    const config = await AppStorageService.getSystemConfig();
    const allQ = await AppStorageService.getAllQuestions();
    const logs = await AppStorageService.getAuditLogs();

    setCurrentUser(user);
    setSystemConfig(config);
    setQuestions(allQ);
    setAuditLogs(logs);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadAdminData();
    }, [loadAdminData])
  );

  const activeYear = systemConfig?.activeYear || '2027';

  const totalQuestions = questions.length;
  const publishedQuestions = questions.filter(q => q.status === 'published').length;
  const inReviewQuestions = questions.filter(q => q.status === 'in_review').length;
  const draftQuestions = questions.filter(q => q.status === 'draft').length;

  const reviewQueue = questions.filter(q => q.status === 'in_review' || q.status === 'draft');

  const handleApproveQuestion = async (qId: string) => {
    const updated = questions.map(q => {
      if (q.id === qId) {
        return {
          ...q,
          status: 'published' as const,
          reviewedBy: currentUser?.name,
          version: q.version + 1
        };
      }
      return q;
    });
    setQuestions(updated);
    await AppStorageService.saveAllQuestions(updated);

    if (currentUser) {
      await AppStorageService.recordAuditLog({
        actorId: currentUser.id,
        actorName: currentUser.name,
        actorRole: currentUser.role,
        action: `QUESTION_APPROVED: Published item ${qId}`,
        targetType: 'question_review',
        targetId: qId,
        details: `Approved syllabus mapping and answer key for item ${qId}.`
      });
    }
    const freshLogs = await AppStorageService.getAuditLogs();
    setAuditLogs(freshLogs);
    Alert.alert('Approved', `Question ${qId} has been verified and published.`);
  };

  const handleRejectQuestion = async (qId: string) => {
    const updated = questions.map(q => {
      if (q.id === qId) {
        return {
          ...q,
          status: 'rejected' as const,
          reviewedBy: currentUser?.name,
          reviewNotes: 'Flagged for ambiguous distractor or syllabus mismatch.'
        };
      }
      return q;
    });
    setQuestions(updated);
    await AppStorageService.saveAllQuestions(updated);

    if (currentUser) {
      await AppStorageService.recordAuditLog({
        actorId: currentUser.id,
        actorName: currentUser.name,
        actorRole: currentUser.role,
        action: `QUESTION_REJECTED: Item ${qId} moved to rejected state`,
        targetType: 'question_review',
        targetId: qId,
        details: `Flagged ambiguity/syllabus mismatch. Will not be served to candidates.`
      });
    }
    const freshLogs = await AppStorageService.getAuditLogs();
    setAuditLogs(freshLogs);
    Alert.alert('Flagged', `Question ${qId} is rejected from student practice.`);
  };

  const triggerRollover = () => {
    if (!currentUser) return;
    if (currentUser.role !== 'admin' && currentUser.role !== 'superadmin') {
      Alert.alert('Access Denied', 'Only an Administrator or Super Admin can approve Year Rollover.');
      return;
    }

    Alert.alert(
      'Confirm Year Rollover',
      `Are you sure you want to activate ${selectedTargetYear}? \n\n• Current active year (${activeYear}) will be archived from candidate view.\n• Automatic pre-rollover snapshot backup will be created.\n• Candidate accounts and attempt history will be safely preserved.\n• Active year cache will be invalidated.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: `Approve & Activate ${selectedTargetYear}`,
          style: 'destructive',
          onPress: async () => {
            setRolloverInProgress(true);
            const res = await AppStorageService.executeYearRollover(
              selectedTargetYear,
              currentUser
            );
            setRolloverInProgress(false);
            if (res.success) {
              Alert.alert('Rollover Complete', res.message);
              await loadAdminData();
            } else {
              Alert.alert('Rollover Failed', res.message);
            }
          }
        }
      ]
    );
  };

  const triggerEmergencyRollback = () => {
    if (!currentUser) return;
    Alert.alert(
      'Emergency Rollback',
      `Revert active bank back to 2027? Use this if ${activeYear} contains defects or syllabus changes.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Revert to 2027',
          style: 'destructive',
          onPress: async () => {
            setRolloverInProgress(true);
            const res = await AppStorageService.executeRollback('2027', currentUser);
            setRolloverInProgress(false);
            Alert.alert('Rollback Status', res.message);
            await loadAdminData();
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.centerText}>Loading Admin Console...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      {/* Header with Gradient */}
      <LinearGradient
        colors={COLORS.heroGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>‹ Candidate View</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Admin & Reviewer Portal</Text>
        <Text style={styles.headerSub}>
          Signed in as: <Text style={{ color: COLORS.primary, fontWeight: '800' }}>{currentUser?.name}</Text> ({currentUser?.role.toUpperCase()})
        </Text>
      </LinearGradient>

      {/* Navigation Tabs */}
      <View style={styles.tabBar}>
        <Pressable
          style={[styles.tabItem, activeTab === 'overview' && styles.tabItemActive]}
          onPress={() => setActiveTab('overview')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'overview' && styles.tabTextActive
            ]}
          >
            Dashboard
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tabItem, activeTab === 'review' && styles.tabItemActive]}
          onPress={() => setActiveTab('review')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'review' && styles.tabTextActive
            ]}
          >
            Review ({reviewQueue.length})
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tabItem, activeTab === 'rollover' && styles.tabItemActive]}
          onPress={() => setActiveTab('rollover')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'rollover' && styles.tabTextActive
            ]}
          >
            Year Rollover
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tabItem, activeTab === 'audit' && styles.tabItemActive]}
          onPress={() => setActiveTab('audit')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'audit' && styles.tabTextActive
            ]}
          >
            Audit Log
          </Text>
        </Pressable>
      </View>

      {/* TAB 1: OVERVIEW & DASHBOARD */}
      {activeTab === 'overview' && (
        <View style={styles.tabContent}>
          <View style={styles.statusBanner}>
            <Text style={styles.bannerKicker}>OPERATIONAL RELEASE STATE</Text>
            <Text style={styles.bannerTitle}>Active Bank: Year {activeYear}</Text>
            <Text style={styles.bannerText}>
              • Student visibility: {systemConfig?.studentVisibleYears.join(', ')}{'\n'}
              • Future years (2028-2030): Strict server-guarded hidden status{'\n'}
              • Target size: 100 reviewed MCQs per subject across 48 syllabus subjects
            </Text>
          </View>

          <Text style={styles.sectionHeading}>Question Bank Metrics</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Text style={styles.metricNumber}>{totalQuestions}</Text>
              <Text style={styles.metricLabel}>Total Items</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={[styles.metricNumber, { color: COLORS.emerald }]}>
                {publishedQuestions}
              </Text>
              <Text style={styles.metricLabel}>Published (Active)</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={[styles.metricNumber, { color: COLORS.accent }]}>
                {inReviewQuestions}
              </Text>
              <Text style={styles.metricLabel}>In Review</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={[styles.metricNumber, { color: COLORS.rose }]}>
                {draftQuestions}
              </Text>
              <Text style={styles.metricLabel}>Drafts</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Quality Standards (PRD Section 13)</Text>
            <Text style={styles.cardBody}>
              1. 100 reviewed, unique MCQs per subject per applicable exam track.{'\n'}
              2. 4 options (A-D), 1 keyed answer, and full explanation per question.{'\n'}
              3. Original language preservation: Twi, French, and Arabic maintain native syntax.{'\n'}
              4. Automatic database snapshot backups created prior to any year rollover.
            </Text>
          </View>
        </View>
      )}

      {/* TAB 2: REVIEW QUEUE */}
      {activeTab === 'review' && (
        <View style={styles.tabContent}>
          <Text style={styles.sectionHeading}>
            Academic Review Queue ({reviewQueue.length} items)
          </Text>
          {reviewQueue.length === 0 ? (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>✅ All questions are verified!</Text>
              <Text style={styles.cardBody}>
                All 4,800 question items have been verified against current syllabus objectives.
              </Text>
            </View>
          ) : (
            reviewQueue.map(item => (
              <View key={item.id} style={styles.reviewCard}>
                <View style={styles.reviewTopRow}>
                  <Text style={styles.reviewSubjectBadge}>{item.subjectId}</Text>
                  <Text style={styles.reviewStatusBadge}>{item.status.toUpperCase()}</Text>
                </View>
                <Text style={styles.reviewStem}>{item.stem}</Text>
                <Text style={styles.reviewSyllabus}>Syllabus: {item.syllabusRef || item.topic}</Text>
                <Text style={styles.reviewAnswer}>
                  Keyed Option {String.fromCharCode(65 + item.answerIndex)}: {item.options[item.answerIndex]}
                </Text>

                <View style={styles.reviewActions}>
                  <Pressable
                    style={styles.rejectBtn}
                    onPress={() => handleRejectQuestion(item.id)}
                  >
                    <Text style={styles.rejectBtnText}>Flag / Reject</Text>
                  </Pressable>
                  <Pressable
                    style={styles.approveBtn}
                    onPress={() => handleApproveQuestion(item.id)}
                  >
                    <Text style={styles.approveBtnText}>Approve & Publish</Text>
                  </Pressable>
                </View>
              </View>
            ))
          )}
        </View>
      )}

      {/* TAB 3: YEAR ROLLOVER WIZARD */}
      {activeTab === 'rollover' && (
        <View style={styles.tabContent}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Year Rollover Wizard (PRD Section 7 & 8)</Text>
            <Text style={styles.cardBody}>
              Switch active bank to the next examination year. This operation archives current active questions, updates student navigation, preserves student attempt history, and creates an audit entry.
            </Text>

            <View style={styles.rolloverSelectorBox}>
              <Text style={styles.selectorLabel}>Select Target Examination Year:</Text>
              <View style={styles.yearChoiceRow}>
                {['2028', '2029', '2030'].map(yr => (
                  <Pressable
                    key={yr}
                    style={[
                      styles.yearChoiceBtn,
                      selectedTargetYear === yr && styles.yearChoiceBtnActive
                    ]}
                    onPress={() => setSelectedTargetYear(yr)}
                  >
                    <Text
                      style={[
                        styles.yearChoiceText,
                        selectedTargetYear === yr && styles.yearChoiceTextActive
                      ]}
                    >
                      {yr}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Checklist */}
            <View style={styles.checklist}>
              <Text style={styles.checklistTitle}>Rollover Safeguards Active:</Text>
              <Text style={styles.checkItem}>✔ Pre-rollover database snapshot backup enabled</Text>
              <Text style={styles.checkItem}>✔ Preserve candidate accounts and attempt history</Text>
              <Text style={styles.checkItem}>✔ Invalidate client active-year cache</Text>
              <Text style={styles.checkItem}>✔ Audit log verification trail enabled</Text>
            </View>

            {rolloverInProgress ? (
              <ActivityIndicator size="large" color={COLORS.primary} style={{ marginVertical: 12 }} />
            ) : (
              <Pressable style={styles.executeRolloverBtn} onPress={triggerRollover}>
                <Text style={styles.executeRolloverBtnText}>
                  🚀 Execute Rollover to {selectedTargetYear}
                </Text>
              </Pressable>
            )}

            {activeYear !== '2027' && (
              <View style={styles.rollbackBox}>
                <Text style={styles.rollbackTitle}>Emergency Safety Rollback</Text>
                <Text style={styles.rollbackDesc}>
                  Active year is currently {activeYear}. Revert to 2027 immediately if defects or syllabus issues are identified.
                </Text>
                <Pressable
                  style={styles.rollbackBtn}
                  onPress={triggerEmergencyRollback}
                >
                  <Text style={styles.rollbackBtnText}>⚠️ Emergency Rollback to 2027</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      )}

      {/* TAB 4: AUDIT LOG */}
      {activeTab === 'audit' && (
        <View style={styles.tabContent}>
          <Text style={styles.sectionHeading}>Immutable Audit Trail</Text>
          {auditLogs.length === 0 ? (
            <View style={styles.card}>
              <Text style={styles.cardBody}>No audit entries logged yet.</Text>
            </View>
          ) : (
            auditLogs.map(log => (
              <View key={log.id} style={styles.logCard}>
                <View style={styles.logHeader}>
                  <Text style={styles.logAction}>{log.action}</Text>
                  <Text style={styles.logTime}>
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </Text>
                </View>
                <Text style={styles.logActor}>
                  Actor: {log.actorName} ({log.actorRole})
                </Text>
                <Text style={styles.logDetails}>{log.details}</Text>
              </View>
            ))
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 16, paddingBottom: 50, gap: 14 },
  center: { flex: 1, backgroundColor: COLORS.bg, alignItems: 'center', justifyContent: 'center' },
  centerText: { marginTop: 10, fontSize: 13, fontWeight: '700', color: COLORS.textWhite },
  header: {
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    gap: 4
  },
  backBtn: { paddingVertical: 4 },
  backBtnText: { color: COLORS.primary, fontSize: 12, fontWeight: '800' },
  headerTitle: { fontSize: 22, fontWeight: '900', color: COLORS.textWhite, marginTop: 4 },
  headerSub: { fontSize: 12, color: '#D7E5EF', marginTop: 2 },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder
  },
  tabItem: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  tabItemActive: { backgroundColor: COLORS.primary },
  tabText: { fontSize: 11, fontWeight: '800', color: COLORS.textSecondary },
  tabTextActive: { color: COLORS.bg },
  tabContent: { gap: 12 },
  statusBanner: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    gap: 6
  },
  bannerKicker: { fontSize: 10, fontWeight: '900', color: COLORS.primary, letterSpacing: 1 },
  bannerTitle: { fontSize: 18, fontWeight: '900', color: COLORS.textWhite },
  bannerText: { fontSize: 12, color: COLORS.textSecondary, marginTop: 4, lineHeight: 18 },
  sectionHeading: { fontSize: 16, fontWeight: '900', color: COLORS.textWhite, marginTop: 4 },
  metricsGrid: { flexDirection: 'row', gap: 8 },
  metricCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    alignItems: 'center'
  },
  metricNumber: { fontSize: 20, fontWeight: '900', color: COLORS.textWhite },
  metricLabel: { fontSize: 10, color: COLORS.textSecondary, marginTop: 2, textAlign: 'center' },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    gap: 10
  },
  cardTitle: { fontSize: 15, fontWeight: '800', color: COLORS.textWhite },
  cardBody: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 18 },
  reviewCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    gap: 8
  },
  reviewTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  reviewSubjectBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primary,
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6
  },
  reviewStatusBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.accent,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6
  },
  reviewStem: { fontSize: 13, fontWeight: '700', color: COLORS.textWhite, lineHeight: 19 },
  reviewSyllabus: { fontSize: 11, color: COLORS.textSecondary },
  reviewAnswer: { fontSize: 11, fontWeight: '700', color: COLORS.emerald },
  reviewActions: { flexDirection: 'row', gap: 8, marginTop: 6 },
  rejectBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(244, 63, 94, 0.15)',
    borderWidth: 1,
    borderColor: COLORS.rose,
    alignItems: 'center'
  },
  rejectBtnText: { color: COLORS.rose, fontSize: 11, fontWeight: '800' },
  approveBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: COLORS.emerald,
    alignItems: 'center'
  },
  approveBtnText: { color: COLORS.emerald, fontSize: 11, fontWeight: '800' },
  rolloverSelectorBox: { gap: 6, marginTop: 4 },
  selectorLabel: { fontSize: 12, fontWeight: '700', color: COLORS.textWhite },
  yearChoiceRow: { flexDirection: 'row', gap: 8 },
  yearChoiceBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.surfaceElevated,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder
  },
  yearChoiceBtnActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  yearChoiceText: { fontSize: 13, fontWeight: '800', color: COLORS.textWhite },
  yearChoiceTextActive: { color: COLORS.bg },
  checklist: {
    backgroundColor: COLORS.surfaceElevated,
    padding: 14,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder
  },
  checklistTitle: { fontSize: 11, fontWeight: '800', color: COLORS.textWhite, marginBottom: 2 },
  checkItem: { fontSize: 11, color: COLORS.textSecondary },
  executeRolloverBtn: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4
  },
  executeRolloverBtnText: { color: COLORS.bg, fontWeight: '900', fontSize: 13 },
  rollbackBox: {
    marginTop: 14,
    padding: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(244, 63, 94, 0.1)',
    borderWidth: 1,
    borderColor: COLORS.rose,
    gap: 6
  },
  rollbackTitle: { fontSize: 12, fontWeight: '800', color: COLORS.rose },
  rollbackDesc: { fontSize: 11, color: '#FECDD3', lineHeight: 16 },
  rollbackBtn: {
    backgroundColor: COLORS.rose,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4
  },
  rollbackBtnText: { color: '#FFFFFF', fontWeight: '800', fontSize: 11 },
  logCard: {
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    gap: 4
  },
  logHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  logAction: { fontSize: 11, fontWeight: '800', color: COLORS.textWhite, flex: 1 },
  logTime: { fontSize: 10, color: COLORS.textMuted },
  logActor: { fontSize: 11, color: COLORS.primary, fontWeight: '700' },
  logDetails: { fontSize: 11, color: COLORS.textSecondary, lineHeight: 16 }
});
