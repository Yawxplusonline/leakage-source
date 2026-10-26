import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { AppStorageService } from '../../data/storage';
import { QuizAttemptRecord } from '../../data/types';
import { COLORS } from '../../theme/colors';

export default function HistoryScreen() {
  const [loading, setLoading] = useState(true);
  const [attempts, setAttempts] = useState<QuizAttemptRecord[]>([]);

  const loadAttempts = useCallback(async () => {
    setLoading(true);
    const list = await AppStorageService.getAllAttempts();
    setAttempts(list);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadAttempts();
    }, [loadAttempts])
  );

  const totalCompleted = attempts.length;
  const avgScore =
    totalCompleted > 0
      ? Math.round(attempts.reduce((acc, a) => acc + a.percentage, 0) / totalCompleted)
      : 0;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading candidate learning history...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backBtnText}>‹ Back to Home</Text>
      </Pressable>

      <LinearGradient
        colors={COLORS.heroGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <Text style={styles.kicker}>LEARNING ANALYTICS & ARCHIVE</Text>
        <Text style={styles.title}>Candidate Score History</Text>
        <Text style={styles.sub}>
          PRD Policy: Attempt records and learning analytics persist permanently and are never wiped out by question bank year rollovers.
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{totalCompleted}</Text>
            <Text style={styles.statLabel}>Quizzes Completed</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{avgScore}%</Text>
            <Text style={styles.statLabel}>Average Accuracy</Text>
          </View>
        </View>
      </LinearGradient>

      <Text style={styles.sectionHeading}>Completed Tests</Text>

      {attempts.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No attempts recorded yet</Text>
          <Text style={styles.emptyText}>
            Select any subject from the home screen to start practicing 100 objective questions!
          </Text>
          <Pressable style={styles.startBtn} onPress={() => router.back()}>
            <Text style={styles.startBtnText}>Start Practicing Now</Text>
          </Pressable>
        </View>
      ) : (
        attempts.map(item => (
          <View key={item.id} style={styles.attemptCard}>
            <View style={styles.attemptHeader}>
              <View>
                <Text style={styles.attemptSubject}>{item.subjectName}</Text>
                <Text style={styles.attemptExam}>
                  {item.examFamily} • {item.releaseYear} Bank • {item.mode.toUpperCase()}
                </Text>
              </View>
              <View
                style={[
                  styles.scoreBadge,
                  item.percentage >= 60 ? styles.badgeGood : styles.badgeLow
                ]}
              >
                <Text
                  style={[
                    styles.scoreBadgeText,
                    item.percentage >= 60
                      ? { color: COLORS.emerald }
                      : { color: COLORS.rose }
                  ]}
                >
                  {item.percentage}%
                </Text>
              </View>
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.metaText}>
                Score: {item.score} / {item.totalQuestions} items
              </Text>
              <Text style={styles.metaText}>
                Date: {new Date(item.submittedAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 16, paddingBottom: 50, gap: 14 },
  center: { flex: 1, backgroundColor: COLORS.bg, alignItems: 'center', justifyContent: 'center' },
  loadingText: { marginTop: 10, fontSize: 13, fontWeight: '700', color: COLORS.textWhite },
  backBtn: { paddingVertical: 4 },
  backBtnText: { color: COLORS.primary, fontSize: 13, fontWeight: '800' },
  hero: {
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    gap: 8
  },
  kicker: { color: COLORS.primary, fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  title: { fontSize: 24, fontWeight: '900', color: COLORS.textWhite },
  sub: { fontSize: 12, color: '#CBD5E1', lineHeight: 18 },
  statsRow: { flexDirection: 'row', gap: 10, marginTop: 10 },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder
  },
  statNumber: { fontSize: 26, fontWeight: '900', color: COLORS.primary },
  statLabel: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2, fontWeight: '600' },
  sectionHeading: { fontSize: 17, fontWeight: '900', color: COLORS.textWhite, marginTop: 4 },
  emptyCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 26,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    gap: 10
  },
  emptyTitle: { fontSize: 16, fontWeight: '800', color: COLORS.textWhite },
  emptyText: { fontSize: 12, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 18 },
  startBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 8
  },
  startBtnText: { color: COLORS.bg, fontWeight: '900', fontSize: 13 },
  attemptCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    gap: 10
  },
  attemptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  attemptSubject: { fontSize: 16, fontWeight: '800', color: COLORS.textWhite },
  attemptExam: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },
  scoreBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  badgeGood: { backgroundColor: 'rgba(16, 185, 129, 0.2)' },
  badgeLow: { backgroundColor: 'rgba(244, 63, 94, 0.2)' },
  scoreBadgeText: { fontSize: 15, fontWeight: '900' },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceBorder,
    paddingTop: 10
  },
  metaText: { fontSize: 11, color: COLORS.textSecondary }
});
