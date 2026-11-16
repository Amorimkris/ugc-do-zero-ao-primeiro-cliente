// ===== APP.JS – Main Application Logic =====

// ===== STATE =====
let STATE = {
  userName: '',
  userGoal: '',
  userHours: '',
  xp: 0,
  level: 1,
  completedLessons: [],
  completedModules: [],
  completedMissions: [],
  completedQuizzes: [],
  earnedBadges: [],
  streak: 1,
  lastActivity: null,
  onboardingDone: false
};

const XP_PER_LEVEL = 200;
const LEVELS = [
  'Iniciante Corajosa',
  'Criadora em Formação',
  'UGC Creator',
  'Creator Profissional',
  'Expert em UGC',
  'Mestre do Conteúdo'
];

// ===== STORAGE =====
const Storage = {
  save() {
    localStorage.setItem('ugc_state', JSON.stringify(STATE));
  },
  load() {
    const saved = localStorage.getItem('ugc_state');
    if (saved) {
      STATE = { ...STATE, ...JSON.parse(saved) };
    }
  }
};

// ===== APP =====
const App = {
  currentPage: 'page-onboarding',
  history: [],

  init() {
    Storage.load();
    // Fake a brief load
    setTimeout(() => {
      document.querySelector('.splash').classList.add('fade-out');
      document.getElementById('app').classList.remove('hidden');
      if (STATE.onboardingDone) {
        this.showDashboard();
        document.getElementById('coachWidget').classList.remove('hidden');
      } else {
        this.showPage('page-onboarding');
      }
      this.updateXPDisplay();
    }, 2000);
  },

  showPage(pageId, toolTab) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    this.currentPage = pageId;

    // Update bottom nav
    document.querySelectorAll('.bnav-btn').forEach(b => b.classList.remove('active'));
    if (pageId === 'page-dashboard') document.getElementById('bnav-home')?.classList.add('active');
    if (pageId === 'page-tools') document.getElementById('bnav-tools')?.classList.add('active');
    if (pageId === 'page-portfolio') document.getElementById('bnav-portfolio')?.classList.add('active');
    if (pageId === 'page-badges') document.getElementById('bnav-badges')?.classList.add('active');
    if (pageId === 'page-certificate') document.getElementById('bnav-cert')?.classList.add('active');

    // Show/hide back button
    const showBack = pageId !== 'page-dashboard' && pageId !== 'page-onboarding';
    document.getElementById('btnBack').classList.toggle('hidden', !showBack);

    // Render specific pages
    if (pageId === 'page-tools') Generators.render(toolTab || 'hooks');
    if (pageId === 'page-portfolio') Portfolio.render();
    if (pageId === 'page-badges') Badges.renderPage();
    if (pageId === 'page-certificate') Certificate.render();

    window.scrollTo(0, 0);
  },

  showDashboard() {
    this.history = [];
    this.showPage('page-dashboard');
    this.renderDashboard();
  },

  goBack() {
    if (this.history.length > 0) {
      const prev = this.history.pop();
      this.showPage(prev.page, prev.data);
      if (prev.page === 'page-module' && prev.data !== undefined) {
        ModuleView.render(prev.data);
      }
    } else {
      this.showDashboard();
    }
  },

  navigate(toPage, data) {
    this.history.push({ page: this.currentPage, data });
    this.showPage(toPage);
  },

  renderDashboard() {
    const name = STATE.userName || 'Criadora';
    document.getElementById('dashGreeting').textContent = `Olá, ${name}! 👋`;

    const hour = new Date().getHours();
    let sub = hour < 12 ? 'Bom dia! Pronta pra aprender?' :
               hour < 18 ? 'Boa tarde! Continue de onde parou.' :
               'Boa noite! Que tal uma aula rápida?';
    document.getElementById('dashSub').textContent = sub;

    // Stats
    document.getElementById('statModules').textContent = STATE.completedModules.length;
    document.getElementById('statMissions').textContent = STATE.completedMissions.length;
    document.getElementById('statBadges').textContent = STATE.earnedBadges.length;
    document.getElementById('streakBadge').textContent = `🔥 ${STATE.streak}`;

    this.updateXPDisplay();
    Trail.render();
  },

  addXP(amount) {
    STATE.xp += amount;
    const newLevel = Math.floor(STATE.xp / XP_PER_LEVEL) + 1;
    if (newLevel > STATE.level) {
      STATE.level = newLevel;
      Toast.show(`🎉 Subiu pro Nível ${newLevel}! ${LEVELS[Math.min(newLevel-1, LEVELS.length-1)]}`, 'success');
    }
    this.updateXPDisplay();
    Storage.save();
  },

  updateXPDisplay() {
    const levelXP = (STATE.level - 1) * XP_PER_LEVEL;
    const nextXP = STATE.level * XP_PER_LEVEL;
    const pct = Math.min(100, ((STATE.xp - levelXP) / XP_PER_LEVEL) * 100);
    const levelName = LEVELS[Math.min(STATE.level - 1, LEVELS.length - 1)];

    document.getElementById('xpDisplay').textContent = `⭐ ${STATE.xp} XP`;
    const xpBar = document.getElementById('xpBar');
    if (xpBar) xpBar.style.width = pct + '%';
    const xpTotal = document.getElementById('xpTotal');
    if (xpTotal) xpTotal.textContent = `${STATE.xp} XP`;
    const xpLevel = document.getElementById('xpLevel');
    if (xpLevel) xpLevel.textContent = `Nível ${STATE.level} – ${levelName}`;
  },

  toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    document.querySelector('.btn-icon').textContent = isDark ? '🌙' : '☀️';
  },

  showBadges() {
    this.showPage('page-badges');
  },

  showPortfolio() {
    this.showPage('page-portfolio');
  },

  showCertificate() {
    this.showPage('page-certificate');
  }
};

// ===== ONBOARDING =====
const Onboarding = {
  currentStep: 1,
  selected: {},

  nextStep(step) {
    if (step === 1) {
      const name = document.getElementById('userName').value.trim();
      if (!name) { Toast.show('Por favor, escreva seu nome! 😊'); return; }
      STATE.userName = name;
    }
    if (step === 2 && !this.selected.goal) {
      Toast.show('Escolha uma meta de renda! 🎯'); return;
    }
    if (step === 3 && !this.selected.hours) {
      Toast.show('Escolha quantas horas por semana! ⏰'); return;
    }

    document.getElementById(`step${step}`).classList.remove('active');
    document.getElementById(`step${step + 1}`).classList.add('active');
    document.getElementById(`dot${step}`).classList.remove('active');
    document.getElementById(`dot${step + 1}`).classList.add('active');
    this.currentStep = step + 1;
  },

  select(btn, field) {
    // Deselect siblings
    btn.closest('.option-grid').querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    this.selected[field] = btn.textContent;
    if (field === 'goal') STATE.userGoal = btn.textContent;
    if (field === 'hours') STATE.userHours = btn.textContent;
  },

  toggle(btn) {
    btn.classList.toggle('selected');
  },

  finish() {
    STATE.onboardingDone = true;
    Storage.save();
    document.getElementById('coachWidget').classList.remove('hidden');
    App.showDashboard();
    Confetti.burst();
    setTimeout(() => Toast.show(`Bem-vinda, ${STATE.userName}! 🎉 Vamos começar!`, 'success'), 500);
  }
};

// ===== TRAIL =====
const Trail = {
  render() {
    const container = document.getElementById('trailContainer');
    if (!container) return;
    container.innerHTML = '';

    COURSE_DATA.modules.forEach((mod, idx) => {
      const isCompleted = STATE.completedModules.includes(mod.id);
      const isUnlocked = idx === 0 || STATE.completedModules.includes(mod.id - 1);
      const isLocked = !isUnlocked;

      const lessonsTotal = mod.lessons.length;
      const lessonsDone = mod.lessons.filter(l => STATE.completedLessons.includes(l.id)).length;
      const pct = lessonsTotal > 0 ? Math.round((lessonsDone / lessonsTotal) * 100) : 0;

      const el = document.createElement('div');
      el.className = `trail-module ${isCompleted ? 'completed' : isUnlocked ? 'unlocked' : 'locked'}`;
      el.innerHTML = `
        <div class="trail-module-header">
          <div class="module-num">${isCompleted ? '✓' : mod.id}</div>
          <div class="module-info">
            <div class="module-title">${mod.emoji} ${mod.title}</div>
            <div class="module-meta">
              <span>${mod.lessons.length} aulas</span>
              <span>•</span>
              <span>${mod.xp} XP</span>
              ${isCompleted ? '<span class="module-badge done">✓ Concluído</span>' : 
                isUnlocked && pct > 0 ? `<span class="module-badge">${pct}%</span>` : 
                isLocked ? '' : '<span class="module-badge">Disponível</span>'}
            </div>
          </div>
          ${isLocked ? '<span class="lock-icon">🔒</span>' : '<span class="lock-icon" style="color:var(--text3)">›</span>'}
        </div>
      `;

      if (isUnlocked) {
        el.onclick = () => ModuleView.open(mod.id);
      } else {
        el.onclick = () => Toast.show('Complete o módulo anterior primeiro! 🔒');
      }

      container.appendChild(el);
    });
  }
};

// ===== MODULE VIEW =====
const ModuleView = {
  currentModuleId: null,

  open(moduleId) {
    this.currentModuleId = moduleId;
    App.history.push({ page: 'page-dashboard' });
    this.render(moduleId);
    App.showPage('page-module');
  },

  render(moduleId) {
    const mod = COURSE_DATA.modules.find(m => m.id === moduleId);
    if (!mod) return;
    this.currentModuleId = moduleId;

    const isModCompleted = STATE.completedModules.includes(mod.id);
    const quizDone = STATE.completedQuizzes.includes(mod.id);
    const missionDone = STATE.completedMissions.includes(mod.id);

    const content = document.getElementById('moduleContent');
    content.innerHTML = `
      <div class="module-page">
        <div class="module-hero">
          <div class="module-hero-emoji">${mod.emoji}</div>
          <h2>${mod.title}</h2>
          <p>${mod.description}</p>
        </div>

        <h3 class="section-title">📚 Aulas</h3>
        <div class="lessons-list">
          ${mod.lessons.map((lesson, idx) => {
            const done = STATE.completedLessons.includes(lesson.id);
            return `<div class="lesson-item ${done ? 'completed' : ''}" onclick="LessonView.open('${lesson.id}', ${moduleId})">
              <span class="lesson-status">${done ? '✅' : '📖'}</span>
              <div class="lesson-info">
                <div class="lesson-name">${lesson.emoji} ${lesson.title}</div>
                <div class="lesson-time">⏱ ${lesson.time} de leitura</div>
              </div>
              <span class="lesson-xp">+${lesson.xp} XP</span>
            </div>`;
          }).join('')}
        </div>

        <h3 class="section-title">🧠 Quiz do Módulo</h3>
        <div class="lesson-item ${quizDone ? 'completed' : ''}" onclick="QuizView.open(${moduleId})" style="margin:0 0 .75rem">
          <span class="lesson-status">${quizDone ? '✅' : '❓'}</span>
          <div class="lesson-info">
            <div class="lesson-name">Quiz: ${mod.title}</div>
            <div class="lesson-time">${mod.quiz.length} perguntas</div>
          </div>
          <span class="lesson-xp">+${mod.quiz.length * 10} XP</span>
        </div>

        <h3 class="section-title">🎯 Missão Prática</h3>
        <div class="lesson-item ${missionDone ? 'completed' : ''}" onclick="MissionView.open(${moduleId})" style="margin:0 0 1.5rem">
          <span class="lesson-status">${missionDone ? '✅' : '🏆'}</span>
          <div class="lesson-info">
            <div class="lesson-name">${mod.mission.title}</div>
            <div class="lesson-time">${mod.mission.steps.length} passos</div>
          </div>
          <span class="lesson-xp">+30 XP</span>
        </div>

        ${isModCompleted ? `
          <div style="text-align:center; padding:1rem; background:linear-gradient(135deg,#ECFDF5,#D1FAE5); border-radius:var(--radius-lg); border:1px solid var(--success)">
            <div style="font-size:2.5rem; margin-bottom:.5rem">${mod.badge.emoji}</div>
            <div style="font-weight:800; color:#065F46">Badge conquistada!</div>
            <div style="color:#047857; margin-top:.25rem">${mod.badge.name}</div>
          </div>
        ` : ''}
      </div>
    `;
  }
};

// ===== LESSON VIEW =====
const LessonView = {
  currentLessonId: null,
  currentModuleId: null,

  open(lessonId, moduleId) {
    this.currentLessonId = lessonId;
    this.currentModuleId = moduleId;
    App.history.push({ page: 'page-module', data: moduleId });
    this.render(lessonId, moduleId);
    App.showPage('page-lesson');
  },

  render(lessonId, moduleId) {
    const mod = COURSE_DATA.modules.find(m => m.id === moduleId);
    const lesson = mod.lessons.find(l => l.id === lessonId);
    const lessonIdx = mod.lessons.findIndex(l => l.id === lessonId);
    const isCompleted = STATE.completedLessons.includes(lessonId);
    const nextLesson = mod.lessons[lessonIdx + 1];

    const content = document.getElementById('lessonContent');
    content.innerHTML = `
      <div class="lesson-page">
        <div class="lesson-header">
          <span class="lesson-tag">Módulo ${mod.id} – ${mod.title}</span>
          <h2>${lesson.emoji} ${lesson.title}</h2>
          <span class="lesson-xp-badge">⭐ +${lesson.xp} XP ao concluir</span>
        </div>

        <div class="lesson-body">${lesson.content}</div>

        <div class="lesson-nav">
          ${!isCompleted ? `
            <button class="btn btn-primary" onclick="LessonView.complete('${lessonId}', ${moduleId})">
              ✅ Marcar como concluída (+${lesson.xp} XP)
            </button>
          ` : nextLesson ? `
            <button class="btn btn-secondary" onclick="LessonView.open('${nextLesson.id}', ${moduleId})">
              Próxima aula →
            </button>
          ` : `
            <button class="btn btn-primary" onclick="QuizView.open(${moduleId})">
              Fazer o Quiz 🧠
            </button>
          `}
        </div>
      </div>
    `;
  },

  complete(lessonId, moduleId) {
    if (STATE.completedLessons.includes(lessonId)) return;

    const mod = COURSE_DATA.modules.find(m => m.id === moduleId);
    const lesson = mod.lessons.find(l => l.id === lessonId);

    STATE.completedLessons.push(lessonId);
    App.addXP(lesson.xp);
    Confetti.burst();
    Toast.show(`+${lesson.xp} XP! Aula concluída! 🎉`, 'success');
    Storage.save();

    // Re-render
    this.render(lessonId, moduleId);

    // Check if all lessons done
    this.checkModuleCompletion(moduleId);
  },

  checkModuleCompletion(moduleId) {
    const mod = COURSE_DATA.modules.find(m => m.id === moduleId);
    const allLessons = mod.lessons.every(l => STATE.completedLessons.includes(l.id));
    const quizDone = STATE.completedQuizzes.includes(moduleId);
    const missionDone = STATE.completedMissions.includes(moduleId);

    if (allLessons && quizDone && missionDone && !STATE.completedModules.includes(moduleId)) {
      STATE.completedModules.push(moduleId);
      App.addXP(50); // bonus
      Storage.save();
      Badges.award(moduleId);
    }
  }
};

// ===== QUIZ VIEW =====
const QuizView = {
  currentModuleId: null,
  currentQ: 0,
  score: 0,
  answered: false,

  open(moduleId) {
    this.currentModuleId = moduleId;
    this.currentQ = 0;
    this.score = 0;
    this.answered = false;
    App.history.push({ page: 'page-module', data: moduleId });
    App.showPage('page-quiz');
    this.render();
  },

  render() {
    const mod = COURSE_DATA.modules.find(m => m.id === this.currentModuleId);
    const questions = mod.quiz;
    const q = questions[this.currentQ];
    const total = questions.length;
    const pct = ((this.currentQ) / total) * 100;
    const done = STATE.completedQuizzes.includes(this.currentModuleId);

    if (this.currentQ >= total) {
      this.showResult(total);
      return;
    }

    document.getElementById('quizContent').innerHTML = `
      <div class="quiz-page">
        <div class="quiz-header">
          <h2>Quiz: ${mod.title}</h2>
          <div class="quiz-progress-wrap">
            <div class="quiz-progress" style="width:${pct}%"></div>
          </div>
          <div class="quiz-counter">Pergunta ${this.currentQ + 1} de ${total}</div>
        </div>
        <p class="quiz-question">${q.q}</p>
        <div class="quiz-options">
          ${q.options.map((opt, i) => `
            <button class="quiz-option" id="opt${i}" onclick="QuizView.answer(${i})">${opt}</button>
          `).join('')}
        </div>
        <div class="quiz-feedback" id="quizFeedback"></div>
        <button class="btn btn-primary btn-full mt-2" id="nextBtn" style="display:none" onclick="QuizView.next()">
          ${this.currentQ + 1 < total ? 'Próxima pergunta →' : 'Ver resultado 🎉'}
        </button>
      </div>
    `;
    this.answered = false;
  },

  answer(idx) {
    if (this.answered) return;
    this.answered = true;

    const mod = COURSE_DATA.modules.find(m => m.id === this.currentModuleId);
    const q = mod.quiz[this.currentQ];
    const isCorrect = idx === q.correct;

    if (isCorrect) this.score++;

    document.querySelectorAll('.quiz-option').forEach((btn, i) => {
      btn.classList.add('disabled');
      if (i === q.correct) btn.classList.add('correct');
      if (i === idx && !isCorrect) btn.classList.add('wrong');
    });

    const fb = document.getElementById('quizFeedback');
    fb.className = `quiz-feedback show ${isCorrect ? 'correct-fb' : 'wrong-fb'}`;
    fb.innerHTML = `${isCorrect ? '✅ Correto!' : '❌ Quase!'} ${q.explanation}`;

    document.getElementById('nextBtn').style.display = 'block';
  },

  next() {
    this.currentQ++;
    this.render();
  },

  showResult(total) {
    const pct = Math.round((this.score / total) * 100);
    const passed = pct >= 70;
    const xpEarned = this.score * 10;

    if (!STATE.completedQuizzes.includes(this.currentModuleId)) {
      STATE.completedQuizzes.push(this.currentModuleId);
      App.addXP(xpEarned);
      Storage.save();
      if (passed) Confetti.burst();
    }

    document.getElementById('quizContent').innerHTML = `
      <div class="quiz-page">
        <div class="quiz-result">
          <div class="quiz-score">${pct}%</div>
          <div class="quiz-score-label">${this.score} de ${total} corretas</div>
          <p style="margin-bottom:1.5rem">${
            pct === 100 ? '🏆 Perfeito! Você é incrível!' :
            pct >= 70 ? '🎉 Parabéns! Você passou!' :
            '💪 Continue estudando! Você consegue!'
          }</p>
          ${!STATE.completedQuizzes.includes(this.currentModuleId) || STATE.completedQuizzes.filter(q => q === this.currentModuleId).length > 0
            ? `<p style="color:var(--accent); font-weight:700; margin-bottom:1.5rem">+${xpEarned} XP ganhos!</p>` : ''}
          <div style="display:flex; gap:.75rem; flex-direction:column">
            <button class="btn btn-primary" onclick="MissionView.open(${this.currentModuleId})">Ir para a Missão 🎯</button>
            <button class="btn btn-secondary" onclick="QuizView.open(${this.currentModuleId})">Refazer Quiz</button>
            <button class="btn btn-secondary" onclick="ModuleView.open(${this.currentModuleId})">Voltar ao Módulo</button>
          </div>
        </div>
      </div>
    `;

    LessonView.checkModuleCompletion(this.currentModuleId);
  }
};

// ===== MISSION VIEW =====
const MissionView = {
  currentModuleId: null,
  checkedSteps: [],

  open(moduleId) {
    this.currentModuleId = moduleId;
    this.checkedSteps = [];
    App.history.push({ page: 'page-module', data: moduleId });
    App.showPage('page-mission');
    this.render();
  },

  render() {
    const mod = COURSE_DATA.modules.find(m => m.id === this.currentModuleId);
    const mission = mod.mission;
    const isDone = STATE.completedMissions.includes(this.currentModuleId);

    document.getElementById('missionContent').innerHTML = `
      <div class="mission-page">
        <div class="mission-hero">
          <h2>🏆 ${mission.title}</h2>
          <p>${mission.description}</p>
        </div>

        ${mission.note ? `<div class="tip-box" style="margin:0 0 1rem"><p>${mission.note}</p></div>` : ''}

        <div class="mission-steps">
          ${mission.steps.map((step, i) => `
            <div class="mission-step ${isDone || this.checkedSteps.includes(i) ? 'checked' : ''}" 
                 id="step_${i}" onclick="MissionView.toggleStep(${i})">
              <div class="step-check">${isDone || this.checkedSteps.includes(i) ? '✓' : ''}</div>
              <div class="step-text">${step}</div>
            </div>
          `).join('')}
        </div>

        ${!isDone ? `
          <div style="margin-bottom:1rem">
            <label class="form-label" style="font-size:.9rem">📝 Notas ou reflexões (opcional)</label>
            <textarea class="mission-textarea" id="missionNotes" placeholder="Escreva aqui o que aprendeu, como foi, dificuldades...">${''}</textarea>
          </div>
          <button class="btn btn-primary btn-full mission-complete-btn" onclick="MissionView.complete()">
            ✅ Missão Concluída! (+30 XP)
          </button>
        ` : `
          <div style="text-align:center; padding:1.5rem; background:linear-gradient(135deg,#ECFDF5,#D1FAE5); border-radius:var(--radius-lg)">
            <div style="font-size:2.5rem">🏆</div>
            <div style="font-weight:800; color:#065F46; margin:.5rem 0">Missão Concluída!</div>
            <button class="btn btn-secondary" onclick="ModuleView.open(${this.currentModuleId})" style="margin-top:.75rem">Voltar ao Módulo</button>
          </div>
        `}
      </div>
    `;
  },

  toggleStep(idx) {
    if (STATE.completedMissions.includes(this.currentModuleId)) return;
    const stepEl = document.getElementById(`step_${idx}`);
    if (this.checkedSteps.includes(idx)) {
      this.checkedSteps = this.checkedSteps.filter(s => s !== idx);
      stepEl.classList.remove('checked');
      stepEl.querySelector('.step-check').textContent = '';
    } else {
      this.checkedSteps.push(idx);
      stepEl.classList.add('checked');
      stepEl.querySelector('.step-check').textContent = '✓';
    }
  },

  complete() {
    const mod = COURSE_DATA.modules.find(m => m.id === this.currentModuleId);
    const total = mod.mission.steps.length;
    const doneCount = this.checkedSteps.length;

    if (doneCount < Math.ceil(total * 0.6)) {
      Toast.show(`Complete pelo menos ${Math.ceil(total * 0.6)} passos antes de concluir! 💪`);
      return;
    }

    if (!STATE.completedMissions.includes(this.currentModuleId)) {
      STATE.completedMissions.push(this.currentModuleId);
      App.addXP(30);
      Confetti.burst();
      Toast.show('🏆 Missão concluída! +30 XP!', 'success');
      Storage.save();
    }

    LessonView.checkModuleCompletion(this.currentModuleId);
    this.render();
  }
};

// ===== BADGES =====
const Badges = {
  award(moduleId) {
    const badge = COURSE_DATA.badges.find(b => b.module === moduleId);
    if (!badge) return;
    if (STATE.earnedBadges.includes(badge.id)) return;

    STATE.earnedBadges.push(badge.id);
    Storage.save();

    // Show popup
    document.getElementById('badgePopupEmoji').textContent = badge.emoji;
    document.getElementById('badgePopupName').textContent = badge.name + ' – ' + badge.desc;
    document.getElementById('badgePopup').classList.remove('hidden');
    Confetti.burst();
  },

  closePopup() {
    document.getElementById('badgePopup').classList.add('hidden');
  },

  renderPage() {
    document.getElementById('badgesContent').innerHTML = `
      <div class="badges-page">
        <div class="emoji-header">
          <div class="big-emoji">🏅</div>
          <h2>Suas Badges</h2>
          <p>${STATE.earnedBadges.length} de ${COURSE_DATA.badges.length} conquistadas</p>
        </div>
        <div class="badges-grid">
          ${COURSE_DATA.badges.map(badge => {
            const earned = STATE.earnedBadges.includes(badge.id);
            return `
              <div class="badge-card ${earned ? 'earned' : 'locked'}">
                <div class="badge-emoji">${badge.emoji}</div>
                <div class="badge-name">${badge.name}</div>
                <div class="badge-status">${earned ? '✅ Conquistada' : '🔒 Bloqueada'}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }
};

// ===== CERTIFICATE =====
const Certificate = {
  render() {
    const allMods = COURSE_DATA.modules.length;
    const doneMods = STATE.completedModules.length;
    const finished = doneMods >= allMods;
    const name = STATE.userName || 'Criadora';

    document.getElementById('certificateContent').innerHTML = `
      <div class="certificate-page">
        ${finished ? `
          <div class="cert-card">
            <div class="cert-logo">🎓</div>
            <div class="cert-title">Certificado de Conclusão</div>
            <div class="cert-name">${name}</div>
            <div class="cert-course">UGC do Zero ao Primeiro Cliente</div>
            <div style="opacity:.7; font-size:.85rem; margin-bottom:1rem">${new Date().toLocaleDateString('pt-BR')}</div>
            <div class="cert-seal">✅ Certificado Autêntico</div>
          </div>
          <button class="btn btn-primary btn-full" onclick="window.print()">🖨️ Imprimir Certificado</button>
        ` : `
          <div class="cert-locked">
            <div class="cert-locked-emoji">🔒</div>
            <h2 style="font-size:1.3rem; font-weight:900; margin-bottom:.5rem">Certificado Bloqueado</h2>
            <p style="color:var(--text2); margin-bottom:1.5rem">Complete todos os ${allMods} módulos do curso para desbloquear o seu certificado!</p>
            <div style="background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:1rem; margin-bottom:1rem">
              <div style="font-weight:700; margin-bottom:.5rem">Seu progresso:</div>
              <div style="font-size:1.5rem; font-weight:900; color:var(--primary)">${doneMods} / ${allMods} módulos</div>
              <div class="xp-bar-wrap" style="margin-top:.75rem">
                <div class="xp-bar" style="width:${Math.round(doneMods/allMods*100)}%"></div>
              </div>
            </div>
            <button class="btn btn-primary btn-full" onclick="App.showDashboard()">Continuar Aprendendo →</button>
          </div>
        `}
      </div>
    `;
  }
};

// ===== TOAST =====
const Toast = {
  timeout: null,
  show(msg, type = '') {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.className = `toast ${type}`;
    el.classList.remove('hidden');
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => el.classList.add('hidden'), 3000);
  }
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => App.init());
