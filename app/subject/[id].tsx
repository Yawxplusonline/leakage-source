import React, { useState, useEffect, useRef } from 'react';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { getSubjectById } from '../../data/catalog';
import { AppStorageService } from '../../data/storage';
import { QuestionItem, AttemptAnswerRecord, QuizAttemptRecord } from '../../data/types';
import { COLORS } from '../../theme/colors';

export default function SubjectScreen() {
  const params = useLocalSearchParams<{
    id: string;
    exam: string;
    year: string;
    programme: string;
  }>();

  const subjectId = String(params.id);
  const subject = getSubjectById(subjectId);

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [activeYear, setActiveYear] = useState('2027');
  const [isGuarded, setIsGuarded] = useState(false);

  const [mode, setMode] = useState<'practice' | 'mock'>('practice');

  const [index, setIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes for mock
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      const res = await AppStorageService.getStudentPracticeQuestions(
        subjectId,
        String(params.year || '2027')
      );
      setQuestions(res.questions);
      setActiveYear(res.activeYear);
      setIsGuarded(res.isGuarded);
      setLoading(false);
    }
    fetchQuestions();
  }, [subjectId, params.year]);

  useEffect(() => {
    if (mode === 'mock' && timerActive && timeRemaining > 0 && !quizFinished) {
      timerRef.current = setTimeout(() => {
        setTimeRemaining(t => t - 1);
      }, 1000);
    } else if (mode === 'mock' && timeRemaining === 0 && !quizFinished) {
      finishMockExam();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [mode, timerActive, timeRemaining, quizFinished]);

  const currentQ = questions[index];

  const chooseOption = (optionIndex: number) => {
    if (quizFinished) return;

    if (mode === 'practice') {
      if (showAnswer) return;
      setSelectedOptions(prev => ({ ...prev, [index]: optionIndex }));
      setShowAnswer(true);
      if (optionIndex === currentQ.answerIndex) {
        setScore(s => s + 1);
      }
    } else {
      setSelectedOptions(prev => ({ ...prev, [index]: optionIndex }));
    }
  };

  const handleNext = () => {
    if (index === questions.length - 1) {
      if (mode === 'mock') {
        finishMockExam();
      } else {
        completePractice();
      }
      return;
    }
    setIndex(i => i + 1);
    setShowAnswer(mode === 'practice' && selectedOptions[index + 1] !== undefined);
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(i => i - 1);
      setShowAnswer(mode === 'practice' && selectedOptions[index - 1] !== undefined);
    }
  };

  const completePractice = async () => {
    setQuizFinished(true);
    await persistAttempt(score);
  };

  const finishMockExam = async () => {
    setTimerActive(false);
    let finalScore = 0;
    questions.forEach((q, idx) => {
      if (selectedOptions[idx] === q.answerIndex) {
        finalScore++;
      }
    });
    setScore(finalScore);
    setQuizFinished(true);
    await persistAttempt(finalScore);
  };

  const persistAttempt = async (computedScore: number) => {
    const user = await AppStorageService.getCurrentUser();
    const answers: AttemptAnswerRecord[] = questions.map((q, idx) => ({
      questionId: q.id,
      selectedOption: selectedOptions[idx] ?? -1,
      correctOption: q.answerIndex,
      isCorrect: selectedOptions[idx] === q.answerIndex
    }));

    const attemptRecord: QuizAttemptRecord = {
      id: `att-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      releaseYear: activeYear,
      examFamily: String(params.exam || 'BECE'),
      subjectId,
      subjectName: subject?.name || subjectId,
      mode,
      startedAt: new Date(Date.now() - 300000).toISOString(),
      submittedAt: new Date().toISOString(),
      durationSeconds: mode === 'mock' ? 1800 - timeRemaining : 300,
      score: computedScore,
      totalQuestions: questions.length,
      percentage: Math.round((computedScore / Math.max(1, questions.length)) * 100),
      answers
    };

    await AppStorageService.recordAttempt(attemptRecord);
  };

  const restartQuiz = (newMode: 'practice' | 'mock') => {
    setMode(newMode);
    setIndex(0);
    setSelectedOptions({});
    setShowAnswer(false);
    setScore(0);
    setQuizFinished(false);
    setTimeRemaining(1800);
    setTimerActive(newMode === 'mock');
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading 100 syllabus-verified questions...</Text>
      </View>
    );
  }

  if (!subject || questions.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyTitle}>Subject question set not found.</Text>
        <Pressable onPress={() => router.back()} style={styles.backBtnLarge}>
          <Text style={styles.backBtnLargeText}>‹ Return to Subjects</Text>
        </Pressable>
      </View>
    );
  }

  // --- RESULTS VIEW ---
  if (quizFinished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <ScrollView style={styles.page} contentContainerStyle={styles.content}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
        <LinearGradient
          colors={COLORS.cardGradient}
          style={styles.resultsCard}
        >
          <View style={styles.resultsBadge}>
            <Text style={styles.resultsBadgeText}>
              {mode === 'mock' ? 'MOCK EXAMINATION SUBMITTED' : 'PRACTICE SET COMPLETED'}
            </Text>
          </View>

          <Text style={styles.resultsSubject}>{subject.name}</Text>
          <Text style={styles.resultsYear}>Syllabus Practice Bank: {activeYear}</Text>

          <View style={styles.scoreCircle}>
            <Text style={styles.scoreNumber}>{pct}%</Text>
            <Text style={styles.scoreFraction}>
              {score} / {questions.length} Correct
            </Text>
          </View>

          <Text style={styles.resultsSummary}>
            {pct >= 70
              ? '🎉 Outstanding mastery! You demonstrate superior preparedness for the 2027 examination.'
              : pct >= 50
              ? '👍 Solid attempt! Review explanations for incorrect items below to sharpen accuracy.'
              : '📖 Recommended revision: review the verified answers and retake the test.'}
          </Text>

          <View style={styles.actionRow}>
            <Pressable
              style={styles.retryBtn}
              onPress={() => restartQuiz(mode)}
            >
              <Text style={styles.retryBtnText}>🔄 Retake Quiz</Text>
            </Pressable>
            <Pressable
              style={styles.dashboardBtn}
              onPress={() => router.back()}
            >
              <Text style={styles.dashboardBtnText}>Back to Subjects</Text>
            </Pressable>
          </View>
        </LinearGradient>

        <Text style={styles.reviewHeading}>
          Detailed Breakdown ({questions.length} Items)
        </Text>

        {questions.map((item, idx) => {
          const userChoice = selectedOptions[idx];
          const isCorrect = userChoice === item.answerIndex;
          const userChoiceLetter =
            userChoice !== undefined && userChoice >= 0
              ? String.fromCharCode(65 + userChoice)
              : 'Skipped';
          const correctLetter = String.fromCharCode(65 + item.answerIndex);

          return (
            <View
              key={item.id}
              style={[
                styles.reviewItemCard,
                isCorrect ? styles.reviewCardCorrect : styles.reviewCardWrong
              ]}
            >
              <View style={styles.reviewItemHeader}>
                <Text style={styles.reviewItemIndex}>Question {idx + 1}</Text>
                <View
                  style={[
                    styles.reviewStatusBadge,
                    isCorrect ? styles.badgeCorrect : styles.badgeWrong
                  ]}
                >
                  <Text
                    style={[
                      styles.reviewStatusBadgeText,
                      isCorrect ? { color: COLORS.emerald } : { color: COLORS.rose }
                    ]}
                  >
                    {isCorrect ? '✓ CORRECT' : '✗ INCORRECT'}
                  </Text>
                </View>
              </View>

              <Text style={styles.reviewQuestionText}>{item.stem}</Text>

              <View style={styles.reviewChoiceRow}>
                <Text style={styles.reviewChoiceLabel}>
                  Your Selection: <Text style={{ fontWeight: 'bold', color: COLORS.textWhite }}>{userChoiceLetter}</Text>
                </Text>
                <Text style={styles.reviewChoiceLabel}>
                  Keyed Correct: <Text style={{ fontWeight: 'bold', color: COLORS.emerald }}>{correctLetter}</Text>
                </Text>
              </View>

              <View style={styles.reviewExplanationBox}>
                <Text style={styles.reviewExplanationTitle}>💡 Explanation & Syllabus Key:</Text>
                <Text style={styles.reviewExplanationText}>{item.explanation}</Text>
                {item.syllabusRef && (
                  <Text style={styles.reviewSyllabusRef}>Ref: {item.syllabusRef}</Text>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    );
  }

  // --- ACTIVE QUIZ QUESTION VIEW ---
  const currentSelected = selectedOptions[index];

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      {/* Top Nav */}
      <Pressable onPress={() => router.back()} style={styles.topBackNav}>
        <Text style={styles.topBackText}>‹ All Subjects</Text>
      </Pressable>

      {/* Policy Guard Alert Banner if requested future year */}
      {isGuarded && (
        <View style={styles.securityWarningBox}>
          <Text style={styles.securityWarningText}>
            🛡 Policy Guard Enforced: Future examination banks (2028-2030) are hidden until administrator approval. You are practicing the active {activeYear} approved bank.
          </Text>
        </View>
      )}

      {/* Header Info Banner with Gradient */}
      <LinearGradient
        colors={COLORS.heroGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerTopRow}>
          <Text style={styles.eyebrow}>
            {params.exam} • {activeYear} PRACTICE BANK
          </Text>

          {/* Mode Switcher */}
          <View style={styles.modeToggleGroup}>
            <Pressable
              style={[
                styles.modeToggleBtn,
                mode === 'practice' && styles.modeToggleActive
              ]}
              onPress={() => restartQuiz('practice')}
            >
              <Text
                style={[
                  styles.modeToggleText,
                  mode === 'practice' && styles.modeToggleTextActive
                ]}
              >
                Practice
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.modeToggleBtn,
                mode === 'mock' && styles.modeToggleActive
              ]}
              onPress={() => restartQuiz('mock')}
            >
              <Text
                style={[
                  styles.modeToggleText,
                  mode === 'mock' && styles.modeToggleTextActive
                ]}
              >
                Mock Test
              </Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.title}>{subject.name}</Text>

        <View style={styles.statusRow}>
          <Text style={styles.subtitle}>
            Question <Text style={{ color: COLORS.primary, fontWeight: '900' }}>{index + 1}</Text> of {questions.length}
          </Text>
          {mode === 'practice' ? (
            <View style={styles.scorePill}>
              <Text style={styles.scorePillText}>Score: {score}</Text>
            </View>
          ) : (
            <View style={styles.timerPill}>
              <Text style={styles.timerPillText}>⏱ {formatTimer(timeRemaining)}</Text>
            </View>
          )}
        </View>

        {/* Dynamic Progress Bar */}
        <View style={styles.progressBg}>
          <View
            style={[
              styles.progress,
              { width: `${((index + 1) / questions.length) * 100}%` }
            ]}
          />
        </View>
      </LinearGradient>

      {/* Question Card */}
      <View style={styles.questionCard}>
        <View style={styles.topicRow}>
          <View style={styles.topicBadge}>
            <Text style={styles.topicTag}>{currentQ.topic.toUpperCase()}</Text>
          </View>
          <View style={styles.difficultyBadge}>
            <Text style={styles.difficultyTag}>{currentQ.difficulty}</Text>
          </View>
        </View>

        <Text style={styles.questionStem}>{currentQ.stem}</Text>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {currentQ.options.map((option, i) => {
            const isSelected = currentSelected === i;
            const isKeyedCorrect = i === currentQ.answerIndex;
            const isCorrectRevealed = mode === 'practice' && showAnswer && isKeyedCorrect;
            const isWrongRevealed =
              mode === 'practice' && showAnswer && isSelected && !isKeyedCorrect;

            return (
              <Pressable
                key={`${currentQ.id}-opt-${i}`}
                onPress={() => chooseOption(i)}
                style={[
                  styles.option,
                  isSelected && styles.optionSelected,
                  isCorrectRevealed && styles.optionCorrect,
                  isWrongRevealed && styles.optionWrong
                ]}
              >
                <View
                  style={[
                    styles.optionLetter,
                    isSelected && { backgroundColor: COLORS.primary },
                    isCorrectRevealed && { backgroundColor: COLORS.emerald },
                    isWrongRevealed && { backgroundColor: COLORS.rose }
                  ]}
                >
                  <Text
                    style={[
                      styles.optionLetterText,
                      (isSelected || isCorrectRevealed || isWrongRevealed) && {
                        color: COLORS.bg
                      }
                    ]}
                  >
                    {String.fromCharCode(65 + i)}
                  </Text>
                </View>
                <Text style={styles.optionText}>{option}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* Immediate Explanation (Practice Mode) */}
        {mode === 'practice' && showAnswer && (
          <View
            style={[
              styles.explanationBox,
              currentSelected === currentQ.answerIndex
                ? { borderColor: COLORS.emerald }
                : { borderColor: COLORS.rose }
            ]}
          >
            <Text
              style={[
                styles.explanationTitle,
                currentSelected === currentQ.answerIndex
                  ? { color: COLORS.emerald }
                  : { color: COLORS.rose }
              ]}
            >
              {currentSelected === currentQ.answerIndex
                ? '✅ Correct Answer!'
                : `❌ Correct Key: Option ${String.fromCharCode(
                    65 + currentQ.answerIndex
                  )}`}
            </Text>
            <Text style={styles.explanationText}>{currentQ.explanation}</Text>
            {currentQ.syllabusRef && (
              <Text style={styles.syllabusRefText}>
                Curriculum Reference: {currentQ.syllabusRef}
              </Text>
            )}
          </View>
        )}

        {/* Next / Previous Navigation */}
        <View style={styles.navRow}>
          <Pressable
            onPress={handlePrev}
            disabled={index === 0}
            style={[styles.prevBtn, index === 0 && styles.prevBtnDisabled]}
          >
            <Text
              style={[
                styles.prevBtnText,
                index === 0 && styles.prevBtnTextDisabled
              ]}
            >
              ‹ Previous
            </Text>
          </Pressable>

          <Pressable onPress={handleNext} style={styles.nextBtn}>
            <Text style={styles.nextBtnText}>
              {index === questions.length - 1
                ? mode === 'mock'
                  ? 'Submit Mock Exam'
                  : 'Finish Practice'
                : 'Next Question ›'}
            </Text>
          </Pressable>
        </View>
      </View>

      <Text style={styles.disclaimerText}>
        Official Syllabus Practice Material • 100 Multiple-Choice Questions
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 16, paddingBottom: 50, gap: 14 },
  centerContainer: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  loadingText: { marginTop: 14, color: COLORS.textWhite, fontSize: 13, fontWeight: '700' },
  emptyTitle: { fontSize: 16, fontWeight: '800', color: COLORS.textWhite, marginBottom: 12 },
  backBtnLarge: { backgroundColor: COLORS.primary, padding: 14, borderRadius: 12 },
  backBtnLargeText: { color: COLORS.bg, fontWeight: '900' },
  topBackNav: { paddingVertical: 4 },
  topBackText: { fontSize: 13, fontWeight: '800', color: COLORS.primary },
  securityWarningBox: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.accent
  },
  securityWarningText: { fontSize: 11, color: '#FCD34D', lineHeight: 16, fontWeight: '600' },

  // Header Banner
  header: {
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    gap: 8
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  eyebrow: { color: '#8FE3E8', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  modeToggleGroup: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
    padding: 3
  },
  modeToggleBtn: { paddingVertical: 5, paddingHorizontal: 10, borderRadius: 8 },
  modeToggleActive: { backgroundColor: COLORS.primary },
  modeToggleText: { fontSize: 11, fontWeight: '800', color: COLORS.textSecondary },
  modeToggleTextActive: { color: COLORS.bg },
  title: { fontSize: 24, fontWeight: '900', color: COLORS.textWhite, marginTop: 4 },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4
  },
  subtitle: { fontSize: 13, color: '#D7E5EF' },
  scorePill: {
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary
  },
  scorePillText: { color: COLORS.primary, fontSize: 12, fontWeight: '900' },
  timerPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)'
  },
  timerPillText: { color: '#FFFFFF', fontSize: 13, fontWeight: '900', letterSpacing: 0.5 },
  progressBg: {
    height: 7,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    marginTop: 10,
    overflow: 'hidden'
  },
  progress: { height: 7, backgroundColor: COLORS.primary, borderRadius: 4 },

  // Question Card
  questionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    gap: 14
  },
  topicRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  topicBadge: {
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  topicTag: { fontSize: 11, fontWeight: '900', color: COLORS.primary, letterSpacing: 0.8 },
  difficultyBadge: {
    backgroundColor: COLORS.surfaceElevated,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder
  },
  difficultyTag: { fontSize: 11, fontWeight: '800', color: COLORS.textSecondary },
  questionStem: {
    fontSize: 19,
    fontWeight: '800',
    lineHeight: 28,
    color: '#FFFFFF',
    letterSpacing: 0.2
  },
  optionsContainer: { gap: 12 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderWidth: 1.5,
    borderColor: COLORS.surfaceBorder,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceElevated
  },
  optionSelected: { borderColor: COLORS.primary, backgroundColor: COLORS.selectedBg },
  optionCorrect: { borderColor: COLORS.emerald, backgroundColor: COLORS.correctBg },
  optionWrong: { borderColor: COLORS.rose, backgroundColor: COLORS.wrongBg },
  optionLetter: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  optionLetterText: { fontSize: 16, fontWeight: '900', color: COLORS.textWhite },
  optionText: {
    fontSize: 16,
    color: '#F1F5F9',
    fontWeight: '600',
    flex: 1,
    lineHeight: 24,
    letterSpacing: 0.1
  },

  // Explanations
  explanationBox: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderWidth: 1.5,
    gap: 8,
    marginTop: 6
  },
  explanationTitle: { fontSize: 15, fontWeight: '900', letterSpacing: 0.2 },
  explanationText: { fontSize: 15, lineHeight: 23, color: '#E2E8F0', fontWeight: '500' },
  syllabusRefText: { fontSize: 12, color: COLORS.textSecondary, fontStyle: 'italic', marginTop: 4 },

  // Navigation
  navRow: { flexDirection: 'row', gap: 10, marginTop: 6 },
  prevBtn: {
    flex: 1,
    padding: 13,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    backgroundColor: COLORS.surfaceElevated,
    alignItems: 'center'
  },
  prevBtnDisabled: { opacity: 0.35 },
  prevBtnText: { fontSize: 13, fontWeight: '800', color: COLORS.textWhite },
  prevBtnTextDisabled: { color: COLORS.textMuted },
  nextBtn: {
    flex: 2,
    padding: 13,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center'
  },
  nextBtnText: { color: COLORS.bg, fontSize: 13, fontWeight: '900' },
  disclaimerText: { fontSize: 10, lineHeight: 14, color: COLORS.textMuted, textAlign: 'center' },

  // Results Styles
  resultsCard: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    gap: 12
  },
  resultsBadge: {
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary
  },
  resultsBadgeText: { fontSize: 10, fontWeight: '900', color: COLORS.primary, letterSpacing: 1 },
  resultsSubject: { fontSize: 24, fontWeight: '900', color: COLORS.textWhite, textAlign: 'center' },
  resultsYear: { fontSize: 12, color: COLORS.textSecondary },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.primary,
    marginVertical: 10
  },
  scoreNumber: { fontSize: 32, fontWeight: '900', color: COLORS.primary },
  scoreFraction: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  resultsSummary: {
    fontSize: 13,
    textAlign: 'center',
    color: '#E2E8F0',
    lineHeight: 20,
    marginHorizontal: 10
  },
  actionRow: { flexDirection: 'row', gap: 10, marginTop: 10, width: '100%' },
  retryBtn: {
    flex: 1,
    padding: 13,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceElevated,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder
  },
  retryBtnText: { fontSize: 13, fontWeight: '800', color: COLORS.textWhite },
  dashboardBtn: {
    flex: 1,
    padding: 13,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center'
  },
  dashboardBtnText: { color: COLORS.bg, fontSize: 13, fontWeight: '900' },
  reviewHeading: { fontSize: 17, fontWeight: '900', color: COLORS.textWhite, marginTop: 6 },
  reviewItemCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    gap: 8
  },
  reviewCardCorrect: { borderLeftWidth: 4, borderLeftColor: COLORS.emerald },
  reviewCardWrong: { borderLeftWidth: 4, borderLeftColor: COLORS.rose },
  reviewItemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  reviewItemIndex: { fontSize: 13, fontWeight: '900', color: COLORS.textWhite },
  reviewStatusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  badgeCorrect: { backgroundColor: 'rgba(16, 185, 129, 0.2)' },
  badgeWrong: { backgroundColor: 'rgba(244, 63, 94, 0.2)' },
  reviewStatusBadgeText: { fontSize: 10, fontWeight: '900' },
  reviewQuestionText: { fontSize: 16, fontWeight: '700', color: COLORS.textWhite, lineHeight: 24 },
  reviewChoiceRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  reviewChoiceLabel: { fontSize: 14, color: COLORS.textSecondary },
  reviewExplanationBox: {
    backgroundColor: COLORS.surfaceElevated,
    padding: 14,
    borderRadius: 12,
    marginTop: 6,
    gap: 6
  },
  reviewExplanationTitle: { fontSize: 13, fontWeight: '800', color: COLORS.textWhite },
  reviewExplanationText: { fontSize: 14, color: '#E2E8F0', lineHeight: 21 },
  reviewSyllabusRef: { fontSize: 12, color: COLORS.textMuted, fontStyle: 'italic', marginTop: 2 }
});
