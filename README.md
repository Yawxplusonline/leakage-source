# LEAKAGE SOURCE (Expo + React Native + TypeScript)

A mobile-first starter for Ghanaian BECE, WASSCE School, WASSCE Private 1st Series and WASSCE Private 2nd Series practice.

## Run in VS Code

1. Install Node.js LTS and VS Code.
2. Extract this ZIP and open the `leakage-source` folder in VS Code.
3. Open Terminal → New Terminal.
4. Run:
   ```bash
   npm install
   npx expo start
   ```
5. Install Expo Go on your phone and scan the QR code. If the network blocks the connection, try:
   ```bash
   npx expo start --tunnel
   ```

## Included in this starter

- Exam selector: BECE, WASSCE School, WASSCE Private 1st Series, WASSCE Private 2nd Series
- BECE subject catalogue
- WASSCE core and programme/elective catalogue
- Practice year selector for 2027–2030
- Subject search
- Multiple-choice practice screen, immediate answer feedback, explanations, score and progress
- Local starter question data and year-aware question-set structure

## Important content limitation

This is a functional starter, not a completed/verified question bank. It currently includes only a small number of reviewed-style sample questions per selected subject and repeats/varies starter items to demonstrate the 100-question practice flow. Do **not** publish these generated repetitions as 100 distinct exam questions. Each subject/year needs 100 genuinely distinct questions, syllabus mapping, answer verification and editorial review.

Questions are original practice material and are not official WAEC questions or guaranteed predictions. Confirm current syllabuses, subject names and elective combinations through WAEC Ghana and the Ghana Education Service. Use only approved/licensed textbooks and do not reproduce copyrighted exam papers without permission.

## Next development stages

1. Complete and verify all subject-specific question sets (2027–2030).
2. Add user accounts, saved progress, bookmarks and weak-topic review.
3. Add offline database, search/filter by topic and timed mock exams.
4. Add admin/content-authoring dashboard with review and publish workflow.
5. Add secure backend, backups, analytics and app-store release configuration.
