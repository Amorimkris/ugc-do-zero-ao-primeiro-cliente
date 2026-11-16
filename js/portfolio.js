// ===== PORTFOLIO.JS – Creator Profile & Interactive Showcase =====

const Portfolio = {
  data: {
    name: 'Juliana Silva',
    title: 'UGC Creator & Especialista em Vídeos Humanizados',
    headline: 'Criando conexões reais entre marcas e mulheres que decidem a compra da casa',
    bio: 'Mais de 40 anos, apaixonada por rotinas reais, cuidados com a pele madura, organização do lar e bem-estar. Gravo conteúdos que passam verdade e geram identificação instantânea nos anúncios.',
    avatar: '👩‍🦰',
    location: 'São Paulo, SP • Atende marcas de todo o Brasil',
    whatsapp: '11999998888',
    instagram: '@juliana.ugc',
    email: 'contato.juliana.ugc@gmail.com',
    primaryNiches: ['Beleza & Skincare 40+', 'Casa & Organização', 'Saúde & Bem-Estar'],
    videos: []
  },

  init() {
    this.load();
    if (!this.data.videos || this.data.videos.length === 0) {
      this.data.videos = [...COURSE_DATA.portfolioTemplates];
      this.save();
    }
  },

  load() {
    const saved = localStorage.getItem('ugc_portfolio');
    if (saved) {
      try {
        this.data = { ...this.data, ...JSON.parse(saved) };
      } catch (e) {
        console.error('Error loading portfolio:', e);
      }
    }
    // Sync with app state if user name was filled
    if (STATE && STATE.userName && (!saved || this.data.name === 'Juliana Silva')) {
      this.data.name = STATE.userName;
    }
  },

  save() {
    localStorage.setItem('ugc_portfolio', JSON.stringify(this.data));
  },

  render() {
    this.init();
    const container = document.getElementById('portfolioContent');
    if (!container) return;

    container.innerHTML = `
      <div class="portfolio-page">
        <!-- HEADER / HERO -->
        <div class="portfolio-hero card">
          <div class="portfolio-avatar-wrap">
            <span class="portfolio-avatar" id="portAvatar">${this.data.avatar}</span>
            <button class="btn-sm btn-secondary change-avatar-btn" onclick="Portfolio.changeAvatar()">Mudar Foto ✏️</button>
          </div>
          <h2 class="portfolio-name">${this.data.name}</h2>
          <div class="portfolio-badge-pill">✨ UGC Creator Profissional</div>
          <p class="portfolio-headline">${this.data.headline}</p>
          
          <div class="portfolio-chips">
            ${this.data.primaryNiches.map(n => `<span class="chip">${n}</span>`).join('')}
          </div>

          <div class="portfolio-actions">
            <button class="btn btn-primary" onclick="Portfolio.openShareModal()">
              🔗 Compartilhar Portfólio
            </button>
            <button class="btn btn-secondary" onclick="Portfolio.openEditModal()">
              ⚙️ Editar Perfil
            </button>
          </div>
        </div>

        <!-- STATS & DIFERENCIAIS -->
        <div class="portfolio-highlights">
          <div class="highlight-item">
            <div class="hl-num">5+</div>
            <div class="hl-label">Formatos Testados</div>
          </div>
          <div class="highlight-item">
            <div class="hl-num">1080p</div>
            <div class="hl-label">Alta Resolução Vertical</div>
          </div>
          <div class="highlight-item">
            <div class="hl-num">48h</div>
            <div class="hl-label">Prazo Ágil de Produção</div>
          </div>
        </div>

        <!-- VIDEO SHOWCASE TABS -->
        <div class="portfolio-section-head">
          <div>
            <h3 class="section-title-clean">🎬 Vídeos de Demonstração (Amostras)</h3>
            <p class="section-sub">Amostras reais gravadas em luz natural prontas para anúncios</p>
          </div>
          <button class="btn btn-sm btn-primary" onclick="Portfolio.openAddVideoModal()">+ Adicionar Vídeo</button>
        </div>

        <div class="video-grid" id="videoGrid">
          ${this.data.videos.map((vid, idx) => this.renderVideoCard(vid, idx)).join('')}
        </div>

        <!-- TABELA DE PREÇOS / RATE CARD -->
        <div class="portfolio-rates card mt-3">
          <div class="rates-header">
            <h3>💳 Tabela de Pacotes & Investimento</h3>
            <p>Valores sugeridos com direitos de uso para anúncios por 90 dias</p>
          </div>

          <div class="rates-grid">
            <div class="rate-card">
              <div class="rate-tag">Teste Rápido</div>
              <h4>1 Vídeo Avulso</h4>
              <div class="rate-price">R$ 250</div>
              <ul>
                <li>✓ 1 Formato à escolha</li>
                <li>✓ Formato 9:16 (Full HD)</li>
                <li>✓ Legendas automáticas</li>
                <li>✓ 1 Rodada de revisão</li>
              </ul>
              <button class="btn btn-secondary btn-full btn-sm" onclick="Generators.copyText('Olá! Gostaria de contratar 1 vídeo UGC avulso por R$ 250.', this)">Selecionar</button>
            </div>

            <div class="rate-card popular">
              <div class="rate-tag popular-tag">Mais Vendido 🔥</div>
              <h4>Pacote Starter (3 Vídeos)</h4>
              <div class="rate-price">R$ 600 <span class="old-price">R$ 750</span></div>
              <div class="rate-sub">R$ 200 por vídeo (Economia de R$ 150)</div>
              <ul>
                <li>✓ 3 Formatos complementares</li>
                <li>✓ 2 Variações de gancho grátis</li>
                <li>✓ Edição completa com música e texto</li>
                <li>✓ Suporte no alinhamento do briefing</li>
              </ul>
              <button class="btn btn-primary btn-full btn-sm" onclick="Generators.copyText('Olá! Gostaria de fechar o Pacote Starter de 3 vídeos UGC por R$ 600.', this)">Selecionar Pacote</button>
            </div>

            <div class="rate-card">
              <div class="rate-tag">Recorrência Mensal</div>
              <h4>Parceria Mensal (4 Vídeos)</h4>
              <div class="rate-price">R$ 750<small>/mês</small></div>
              <div class="rate-sub">Entrega quinzenal contínua</div>
              <ul>
                <li>✓ 4 Vídeos novos todo mês</li>
                <li>✓ Testes A/B de ganchos</li>
                <li>✓ Prioridade na agenda de gravação</li>
                <li>✓ Análise de performance básica</li>
              </ul>
              <button class="btn btn-secondary btn-full btn-sm" onclick="Generators.copyText('Olá! Tenho interesse no plano de recorrência mensal de 4 vídeos UGC.', this)">Quero Parceria</button>
            </div>
          </div>
        </div>

        <!-- CONTATO DIRETO -->
        <div class="portfolio-contact card mt-3 text-center">
          <h3>💌 Vamos criar conteúdos incríveis juntas?</h3>
          <p class="mt-1" style="color:var(--text2)">Estou disponível para novas parcerias e campanhas este mês.</p>
          <div class="contact-buttons mt-2">
            <button class="btn btn-success" onclick="Portfolio.contactWhatsApp()">
              💬 Chamar no WhatsApp
            </button>
            <button class="btn btn-secondary" onclick="Portfolio.copyEmail(this)">
              📧 Copiar E-mail
            </button>
          </div>
        </div>
      </div>

      <!-- MODAL DE VISUALIZAÇÃO DE VÍDEO -->
      <div id="videoModal" class="modal hidden">
        <div class="modal-content" id="videoModalContent"></div>
      </div>

      <!-- MODAL DE EDIÇÃO DE PERFIL -->
      <div id="profileModal" class="modal hidden">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Editar Perfil de Criadora</h3>
            <button class="btn-close" onclick="Portfolio.closeModal('profileModal')">✕</button>
          </div>
          <div class="modal-body">
            <label class="form-label">Nome Completo</label>
            <input type="text" class="form-input" id="editName" value="${this.data.name}">

            <label class="form-label">Título Profissional</label>
            <input type="text" class="form-input" id="editTitle" value="${this.data.title}">

            <label class="form-label">Frase de Destaque (Headline)</label>
            <input type="text" class="form-input" id="editHeadline" value="${this.data.headline}">

            <label class="form-label">Biografia</label>
            <textarea class="form-input" id="editBio" rows="3">${this.data.bio}</textarea>

            <label class="form-label">Número do WhatsApp (com DDD, ex: 11999998888)</label>
            <input type="text" class="form-input" id="editWhatsapp" value="${this.data.whatsapp}">

            <label class="form-label">Instagram Comercial</label>
            <input type="text" class="form-input" id="editInstagram" value="${this.data.instagram}">

            <button class="btn btn-primary btn-full mt-2" onclick="Portfolio.saveProfile()">Salvar Alterações</button>
          </div>
        </div>
      </div>

      <!-- MODAL ADICIONAR VÍDEO -->
      <div id="addVideoModal" class="modal hidden">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Adicionar Vídeo ao Portfólio</h3>
            <button class="btn-close" onclick="Portfolio.closeModal('addVideoModal')">✕</button>
          </div>
          <div class="modal-body">
            <label class="form-label">Título da Amostra</label>
            <input type="text" class="form-input" id="newVidTitle" placeholder="Ex: Demonstração de AirFryer Prática">

            <label class="form-label">Nicho</label>
            <input type="text" class="form-input" id="newVidNiche" placeholder="Ex: Casa & Cozinha">

            <label class="form-label">Formato</label>
            <select class="form-input" id="newVidFormat">
              <option>Depoimento / Review</option>
              <option>Unboxing Dinâmico</option>
              <option>Problema → Solução</option>
              <option>Mini-Tutorial</option>
              <option>3 Motivos / Dica Rápida</option>
            </select>

            <label class="form-label">Gancho Utilizado (Frase inicial)</label>
            <input type="text" class="form-input" id="newVidHook" placeholder="Ex: Essa dica salvou meu almoço em 10 minutos...">

            <label class="form-label">Descrição / Roteiro Resumido</label>
            <textarea class="form-input" id="newVidDesc" rows="3" placeholder="Conte como foi a gravação e o resultado..."></textarea>

            <button class="btn btn-primary btn-full mt-2" onclick="Portfolio.saveNewVideo()">Adicionar Amostra</button>
          </div>
        </div>
      </div>

      <!-- MODAL COMPARTILHAR PORTFÓLIO -->
      <div id="shareModal" class="modal hidden">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Compartilhar com Marcas</h3>
            <button class="btn-close" onclick="Portfolio.closeModal('shareModal')">✕</button>
          </div>
          <div class="modal-body">
            <p style="color:var(--text2); margin-bottom:1rem">
              Copie o texto pronto de apresentação abaixo para enviar direto para a marca no WhatsApp ou no Direct do Instagram:
            </p>
            <div class="generator-output" style="max-height:220px; overflow-y:auto">
              <pre id="sharePitchText">${this.generatePitchText()}</pre>
            </div>
            <button class="btn btn-primary btn-full mt-2" onclick="Generators.copyText(document.getElementById('sharePitchText').textContent, this)">
              📋 Copiar Apresentação Completa
            </button>
          </div>
        </div>
      </div>
    `;
  },

  renderVideoCard(vid, idx) {
    const emojis = ['💄', '📦', '🐾', '📱', '🌿', '✨'];
    const emoji = emojis[idx % emojis.length];

    return `
      <div class="video-card card" onclick="Portfolio.openVideoDetails(${idx})">
        <div class="video-thumbnail">
          <div class="video-play-btn">▶</div>
          <div class="video-duration">${vid.duration || '35s'}</div>
          <div class="video-format-badge">${vid.format || 'UGC'}</div>
          <div class="video-emoji-cover">${emoji}</div>
        </div>
        <div class="video-card-body">
          <div class="video-card-niche">${vid.niche}</div>
          <h4 class="video-card-title">${vid.title}</h4>
          <p class="video-card-hook">${vid.hook}</p>
          <div class="video-card-footer">
            <span class="video-metric">📈 ${vid.metrics || 'Conversão'}</span>
            <span class="video-view-link">Ver Roteiro & Detalhes →</span>
          </div>
        </div>
      </div>
    `;
  },

  openVideoDetails(idx) {
    const vid = this.data.videos[idx];
    if (!vid) return;

    const modalContent = document.getElementById('videoModalContent');
    modalContent.innerHTML = `
      <div class="modal-header">
        <div>
          <span class="chip">${vid.niche}</span>
          <h3 style="margin-top:.25rem">${vid.title}</h3>
        </div>
        <button class="btn-close" onclick="Portfolio.closeModal('videoModal')">✕</button>
      </div>
      <div class="modal-body">
        <!-- SIMULADOR DE PLAYER DE VÍDEO VERTICAL -->
        <div class="mock-player">
          <div class="mock-player-screen">
            <div class="player-center-icon">🎬</div>
            <div class="player-overlay">
              <div class="player-tag">${vid.format}</div>
              <div class="player-hook-display">${vid.hook}</div>
            </div>
          </div>
          <div class="mock-player-bar">
            <div class="mock-play-indicator"></div>
          </div>
        </div>

        <div class="video-details-info mt-2">
          <h4>📝 Roteiro Completo da Gravação:</h4>
          <div class="sample-script-box">
            <pre>${vid.sampleScript || vid.description || 'Roteiro dinâmico gravado em luz natural com foco na transformação do produto.'}</pre>
          </div>

          <div class="video-key-points mt-2">
            <h5>💡 Por que esse vídeo vende bem:</h5>
            <ul>
              <li><strong>Gancho nos primeiros 3s:</strong> Quebra o padrão da rolagem e filtra o público ideal.</li>
              <li><strong>Demonstração sem cortes falsos:</strong> Mostra o produto real em uso doméstico.</li>
              <li><strong>Tom de amiga recomendando:</strong> Elimina a barreira de venda tradicional.</li>
            </ul>
          </div>
        </div>

        <button class="btn btn-secondary btn-full mt-2" onclick="Generators.copyText(\`${(vid.sampleScript || vid.hook).replace(/`/g, '\\`')}\`, this)">
          📋 Copiar Roteiro deste Vídeo
        </button>
      </div>
    `;

    document.getElementById('videoModal').classList.remove('hidden');
  },

  openEditModal() {
    document.getElementById('profileModal').classList.remove('hidden');
  },

  openAddVideoModal() {
    document.getElementById('addVideoModal').classList.remove('hidden');
  },

  openShareModal() {
    document.getElementById('sharePitchText').textContent = this.generatePitchText();
    document.getElementById('shareModal').classList.remove('hidden');
  },

  closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
  },

  saveProfile() {
    this.data.name = document.getElementById('editName').value.trim() || this.data.name;
    this.data.title = document.getElementById('editTitle').value.trim() || this.data.title;
    this.data.headline = document.getElementById('editHeadline').value.trim() || this.data.headline;
    this.data.bio = document.getElementById('editBio').value.trim() || this.data.bio;
    this.data.whatsapp = document.getElementById('editWhatsapp').value.trim() || this.data.whatsapp;
    this.data.instagram = document.getElementById('editInstagram').value.trim() || this.data.instagram;

    this.save();
    this.closeModal('profileModal');
    this.render();
    Toast.show('Perfil atualizado com sucesso! ✨', 'success');
  },

  saveNewVideo() {
    const title = document.getElementById('newVidTitle').value.trim();
    if (!title) {
      Toast.show('Digite um título para o seu vídeo!');
      return;
    }
    const niche = document.getElementById('newVidNiche').value.trim() || 'Geral';
    const format = document.getElementById('newVidFormat').value;
    const hook = document.getElementById('newVidHook').value.trim() || 'Veja como esse produto transformou meu dia...';
    const desc = document.getElementById('newVidDesc').value.trim() || 'Vídeo gravado em luz natural focado no benefício.';

    const newVid = {
      id: 'vid_' + Date.now(),
      title,
      niche,
      format,
      duration: '35s',
      hook: `"${hook}"`,
      description: desc,
      metrics: 'Alta Conversão',
      sampleScript: desc
    };

    this.data.videos.unshift(newVid);
    this.save();
    this.closeModal('addVideoModal');
    this.render();
    Confetti.burst();
    Toast.show('Vídeo adicionado ao seu portfólio! 🎉', 'success');
  },

  changeAvatar() {
    const avatars = ['👩‍🦰', '👩', '👩‍🦱', '👱‍♀️', '👩‍🦳', '✨', '🎬', '🌟'];
    const current = avatars.indexOf(this.data.avatar);
    const next = avatars[(current + 1) % avatars.length];
    this.data.avatar = next;
    this.save();
    document.getElementById('portAvatar').textContent = next;
    Toast.show('Foto de perfil alterada!');
  },

  contactWhatsApp() {
    const num = this.data.whatsapp.replace(/\D/g, '');
    const msg = encodeURIComponent(`Olá, ${this.data.name}! Vi seu portfólio de UGC Creator e gostaria de solicitar um orçamento para nossa marca.`);
    window.open(`https://wa.me/55${num}?text=${msg}`, '_blank');
  },

  copyEmail(btn) {
    Generators.copyText(this.data.email, btn);
  },

  generatePitchText() {
    return `Olá! Me chamo ${this.data.name} e sou criadora de conteúdo UGC.

Crio vídeos autênticos de alta conversão para marcas nos formatos de Depoimento, Unboxing, Problema/Solução e Reviews.

✨ Meu Portfólio Oficial:
• Especialidades: ${this.data.primaryNiches.join(', ')}
• Formato de gravação: 1080p Vertical (9:16)
• Pacote Starter: 3 vídeos por R$ 600
• Contato direto: WhatsApp (${this.data.whatsapp}) | Instagram (${this.data.instagram})

Você teria interesse em testar novos criativos em vídeo para as campanhas da sua marca? Posso apresentar uma proposta personalizada! 💜`;
  }
};
