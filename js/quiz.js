// ===== QUIZ.JS – Quiz Utilities & Practice Engine =====

const QuizEngine = {
  // Quick test or custom practice mode across all modules
  getRandomQuestions(count = 5) {
    if (!COURSE_DATA || !COURSE_DATA.modules) return [];
    const all = [];
    COURSE_DATA.modules.forEach(m => {
      if (m.quiz) {
        m.quiz.forEach(q => {
          all.push({ ...q, moduleTitle: m.title, moduleId: m.id });
        });
      }
    });
    // Shuffle
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    return all.slice(0, count);
  },

  calculateOverallScore() {
    if (!STATE || !STATE.completedQuizzes) return 0;
    const total = COURSE_DATA.modules.length;
    const done = STATE.completedQuizzes.length;
    return total > 0 ? Math.round((done / total) * 100) : 0;
  }
};
