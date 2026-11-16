// ===== GENERATORS.JS – All Tool Panels =====

const Generators = {
  currentTab: 'hooks',

  render(tab) {
    this.currentTab = tab || 'hooks';
    const tabs = ['hooks','bio','script','price','proposal','roleplay','templates'];
    const tabLabels = {
      hooks: '🎣 Ganchos',
      bio: '👤 Bio',
      script: '📝 Roteiro',
      price: '💰 Preço',
      proposal: '📄 Proposta',
      roleplay: '🤝 Roleplay',
      templates: '📋 Templates'
    };

    document.getElementById('toolsContent').innerHTML = `
      <div class="tools-page">
        <div class="tools-tabs">
          ${tabs.map(t => `
            <button class="tool-tab ${t === this.currentTab ? 'active' : ''}"
              onclick="Generators.switchTab('${t}')">${tabLabels[t]}</button>
          `).join('')}
        </div>
        <div id="toolPanelContainer">
          ${this.renderPanel(this.currentTab)}
        </div>
      </div>
    `;
  },

  switchTab(tab) {
    this.currentTab = tab;
    document.querySelectorAll('.tool-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('toolPanelContainer').innerHTML = this.renderPanel(tab);
    this.afterRender(tab);
  },

  afterRender(tab) {
    if (tab === 'roleplay') Roleplay.init();
  },

  renderPanel(tab) {
    switch(tab) {
      case 'hooks': return this.renderHooks();
      case 'bio': return this.renderBio();
      case 'script': return this.renderScript();
      case 'price': return this.renderPrice();
      case 'proposal': return this.renderProposal();
      case 'roleplay': return this.renderRoleplay();
      case 'templates': return this.renderTemplates();
      default: return '';
    }
  },

  renderHooks() {
    return `
      <div class="tool-panel active">
        <div class="tool-title">🎣 Banco de Ganchos</div>
        <div class="tool-desc">50+ ganchos prontos para adaptar ao seu produto. Clique em "Copiar" para usar!</div>

        <div class="generator-form">
          <label class="form-label">Filtrar por categoria</label>
          <select onchange="Generators.filterHooks(this.value)" id="hookCatFilter">
            <option value="all">Todos os ganchos</option>
            ${COURSE_DATA.hooks.map(cat => `<option value="${cat.category}">${cat.category}</option>`).join('')}
          </select>
        </div>

        <div id="hookListContainer">
          ${this.renderHookList('all')}
        </div>
      </div>
    `;
  },

  renderHookList(category) {
    const categories = category === 'all' ? COURSE_DATA.hooks : COURSE_DATA.hooks.filter(c => c.category === category);
    return categories.map(cat => `
      <div class="hooks-category">${cat.category}</div>
      <div class="hook-list">
        ${cat.items.map((hook, i) => `
          <div class="hook-item">
            <div class="hook-text">${hook}</div>
            <button class="hook-copy" onclick="Generators.copyText(\`${hook.replace(/`/g, '\\`')}\`, this)">Copiar</button>
          </div>
        `).join('')}
      </div>
    `).join('');
  },

  filterHooks(category) {
    document.getElementById('hookListContainer').innerHTML = this.renderHookList(category);
  },

  renderBio() {
    return `
      <div class="tool-panel active">
        <div class="tool-title">👤 Gerador de Bio Profissional</div>
        <div class="tool-desc">Preencha os campos e gere sua bio para Instagram, TikTok ou portfólio.</div>

        <div class="generator-form">
          <label class="form-label">Seu nome</label>
          <input type="text" class="form-input" id="bioName" placeholder="Ex: Juliana">

          <label class="form-label">Seu nicho principal</label>
          <select class="form-input" id="bioNiche" style="padding:.75rem 1rem">
            <option value="">Selecione...</option>
            <option>Beleza e Skincare</option>
            <option>Casa e Decoração</option>
            <option>Pets</option>
            <option>Fitness e Saúde</option>
            <option>Moda</option>
            <option>Alimentação</option>
            <option>Tecnologia</option>
            <option>Infoprodutos</option>
            <option>Bem-estar</option>
            <option>Maternidade</option>
          </select>

          <label class="form-label">Estilo de bio</label>
          <select class="form-input" id="bioStyle" style="padding:.75rem 1rem">
            <option value="profissional">Profissional e direto</option>
            <option value="acolhedor">Acolhedor e pessoal</option>
            <option value="criativo">Criativo e divertido</option>
          </select>

          <button class="btn btn-primary btn-full" onclick="Generators.generateBio()">✨ Gerar Bio</button>
        </div>

        <div id="bioOutput" style="display:none">
          <div class="bio-output" id="bioResult">
            <p id="bioText"></p>
          </div>
          <button class="btn btn-secondary btn-full mt-2" onclick="Generators.copyText(document.getElementById('bioText').textContent, this)">📋 Copiar Bio</button>
        </div>
      </div>
    `;
  },

  generateBio() {
    const name = document.getElementById('bioName').value.trim() || 'Criadora';
    const niche = document.getElementById('bioNiche').value || 'Beleza';
    const style = document.getElementById('bioStyle').value;

    const bios = {
      profissional: [
        `✨ UGC Creator | ${niche}\n📹 Vídeos autênticos para marcas\n📧 Parcerias: [seu e-mail]\n👇 Portfólio completo`,
        `${name} • UGC Creator\n🎯 Especializada em ${niche}\n📱 Conteúdo real que converte\n💌 [seu e-mail para contato]`,
        `📸 ${name} | UGC Creator\n✅ ${niche} & campanhas de marca\n🎬 Vídeos que vendem de verdade\n📩 Propostas: [e-mail]`
      ],
      acolhedor: [
        `Oi! Sou ${name} 👋\nCrio vídeos de ${niche.toLowerCase()} para marcas 🎥\nAmo conectar pessoas a produtos que amam 💜\n📩 Vamos trabalhar juntas?`,
        `${name} aqui! ✨\nUGC Creator de ${niche.toLowerCase()} 📱\nAcredito em conteúdo real, de pessoa pra pessoa 💜\nParcerias: [seu contato]`,
        `Sou ${name} 🌸 Criadora de conteúdo\nFaço vídeos de ${niche.toLowerCase()} que as marcas adoram\n💬 Me chama pra conversar!`
      ],
      criativo: [
        `${name} | Contadora de histórias via produtos 🎬\n✨ ${niche} é minha linguagem\n📹 Vídeos que fazem marcas sorrirem\n👇 Veja meu portfólio`,
        `🎬 ${name}\nTransformo produtos em histórias 🌟\nNicho: ${niche}\nVamos criar algo incrível juntas? 💫`,
        `${name} ✨ | UGC Creator\n🎯 ${niche} com propósito\n📱 Vídeos que vendem sem parecer venda\n💌 Bora colaborar?`
      ]
    };

    const options = bios[style];
    const chosen = options[Math.floor(Math.random() * options.length)];

    document.getElementById('bioText').textContent = chosen;
    document.getElementById('bioOutput').style.display = 'block';
    document.getElementById('bioResult').style.display = 'block';
  },

  renderScript() {
    return `
      <div class="tool-panel active">
        <div class="tool-title">📝 Gerador de Roteiro</div>
        <div class="tool-desc">Informe o produto e a fórmula. O gerador cria um roteiro base para você personalizar.</div>

        <div class="generator-form">
          <label class="form-label">Produto</label>
          <input type="text" class="form-input" id="scriptProduct" placeholder="Ex: hidratante corporal, tênis de corrida...">

          <label class="form-label">Problema que o produto resolve</label>
          <input type="text" class="form-input" id="scriptProblem" placeholder="Ex: pele ressecada, falta de conforto...">

          <label class="form-label">Principal resultado / benefício</label>
          <input type="text" class="form-input" id="scriptResult" placeholder="Ex: pele hidratada por 24h, leveza nos pés...">

          <label class="form-label">Fórmula do roteiro</label>
          <select class="form-input" id="scriptFormula" style="padding:.75rem 1rem">
            <option value="gppdp">Gancho → Problema → Demo → Prova → CTA</option>
            <option value="pas">PAS (Problema – Agitação – Solução)</option>
            <option value="antes">Antes e Depois</option>
            <option value="3motivos">3 Motivos / Razões</option>
          </select>

          <label class="form-label">Duração alvo</label>
          <select class="form-input" id="scriptDuration" style="padding:.75rem 1rem">
            <option value="15">15 segundos (muito rápido)</option>
            <option value="30" selected>30 segundos (padrão)</option>
            <option value="60">60 segundos (completo)</option>
          </select>

          <button class="btn btn-primary btn-full" onclick="Generators.generateScript()">🎬 Gerar Roteiro</button>
        </div>

        <div id="scriptOutput" style="display:none">
          <div class="generator-output">
            <button class="copy-btn" onclick="Generators.copyText(document.getElementById('scriptText').textContent, this)">Copiar</button>
            <pre id="scriptText"></pre>
          </div>
        </div>
      </div>
    `;
  },

  generateScript() {
    const product = document.getElementById('scriptProduct').value.trim() || '[produto]';
    const problem = document.getElementById('scriptProblem').value.trim() || '[problema]';
    const result = document.getElementById('scriptResult').value.trim() || '[resultado incrível]';
    const formula = document.getElementById('scriptFormula').value;
    const duration = document.getElementById('scriptDuration').value;

    let script = '';

    if (formula === 'gppdp') {
      script = `🎬 ROTEIRO – ${product.toUpperCase()}
Fórmula: Gancho → Problema → Demo → Prova → CTA
Duração estimada: ${duration}s
━━━━━━━━━━━━━━━━━━━━━━━━

⚡ GANCHO (0-3s):
"Esse ${product} me surpreendeu de um jeito que não esperava..."
[Olhar direto para a câmera, animada]

😥 PROBLEMA (3-10s):
"Eu sofria com ${problem} há muito tempo. Já tentei de tudo e nada resolvia de verdade."

✨ DEMONSTRAÇÃO (10-${duration === '30' ? '25' : duration === '60' ? '40' : '12'}s):
[Mostra o produto na mão, abre a embalagem ou aplica]
"Quando recebi o ${product}, fiquei curiosa..."
[Aplica/usa o produto enquanto fala]

✅ PROVA (próximos 10s):
"Olha o resultado! ${result}. Faz [X dias/semanas] que estou usando e já percebi a diferença."

📢 CTA (últimos 5s):
"Link nos comentários para você comprar também! Vale muito a pena."
[Sorri para a câmera]`;
    } else if (formula === 'pas') {
      script = `🎬 ROTEIRO – ${product.toUpperCase()}
Fórmula: PAS (Problema – Agitação – Solução)
Duração estimada: ${duration}s
━━━━━━━━━━━━━━━━━━━━━━━━

⚡ GANCHO (0-3s):
"Quem tem ${problem}, para tudo e ouve isso:"

😥 PROBLEMA (3-12s):
"Eu conheço bem demais essa situação. ${problem.charAt(0).toUpperCase() + problem.slice(1)} atrapalha a vida da gente de um jeito que parece sem saída."

😤 AGITAÇÃO (12-${duration === '30' ? '20' : '30'}s):
"Já gastei dinheiro em várias coisas que prometiam resolver. Não funcionou. Chega um ponto em que você pensa: 'será que tem solução pra isso?'"

✨ SOLUÇÃO (${duration === '30' ? '20' : '30'}s até o fim):
"Aí alguém me indicou o ${product}. Fiz cara feia no começo... mas o resultado foi ${result}. Olha! [mostra resultado]"

📢 CTA:
"Link para comprar abaixo. Não precisa mais sofrer com isso!"`;
    } else if (formula === 'antes') {
      script = `🎬 ROTEIRO – ${product.toUpperCase()}
Fórmula: Antes e Depois
Duração estimada: ${duration}s
━━━━━━━━━━━━━━━━━━━━━━━━

⚡ GANCHO (0-3s):
"Olha a diferença antes e depois de [X dias] com ${product}:"

📸 ANTES (3-15s):
"Antes: eu acordava todo dia lidando com ${problem}. Era frustrante, afetava minha autoestima."
[Mostra foto ou situação 'antes' se tiver]

🔄 TRANSIÇÃO (15-${duration === '30' ? '22' : '35'}s):
"Aí experimentei o ${product}. Apliquei direitinho conforme a instrução..."
[Mostra o produto]

✨ DEPOIS (últimos segundos):
"E agora? Olha: ${result}! [mostra o resultado]. Não acreditei quando vi!"

📢 CTA:
"Compra o seu! O link está aqui."`;
    } else {
      script = `🎬 ROTEIRO – ${product.toUpperCase()}
Fórmula: 3 Motivos
Duração estimada: ${duration}s
━━━━━━━━━━━━━━━━━━━━━━━━

⚡ GANCHO (0-3s):
"3 motivos pelos quais não consigo parar de usar ${product}:"

✅ MOTIVO 1 (3-${duration === '15' ? '10' : '15'}s):
"Primeiro: resolve ${problem} de verdade, sem enrolação."
[Mostra ou demonstra]

✅ MOTIVO 2 (${duration === '15' ? '10' : '15'}-${duration === '30' ? '24' : '35'}s):
"Segundo: o resultado é ${result}. E não é exagero, não."
[Mostra o produto ou o resultado]

✅ MOTIVO 3 (penúltimos segundos):
"Terceiro: o custo-benefício é incrível. Vale cada centavo."

📢 CTA:
"Link para comprar abaixo. Você vai entender depois de usar!"`;
    }

    document.getElementById('scriptText').textContent = script;
    document.getElementById('scriptOutput').style.display = 'block';
  },

  renderPrice() {
    return `
      <div class="tool-panel active">
        <div class="tool-title">💰 Simulador de Preço</div>
        <div class="tool-desc">Informe sua situação e receba uma sugestão de faixa de preço baseada no mercado brasileiro.</div>

        <div class="generator-form">
          <label class="form-label">Seu nível de experiência</label>
          <select class="form-input" id="priceLevel" style="padding:.75rem 1rem">
            <option value="iniciante">🌱 Iniciante (0-3 meses)</option>
            <option value="intermediario">🌿 Intermediário (3-9 meses)</option>
            <option value="avancado">🌳 Avançado (9+ meses)</option>
          </select>

          <label class="form-label">Tipo de vídeo</label>
          <select class="form-input" id="priceType" style="padding:.75rem 1rem">
            <option value="depoimento">Depoimento / Testemunhal</option>
            <option value="tutorial">Tutorial / Como usar</option>
            <option value="unboxing">Unboxing</option>
            <option value="review">Review completo</option>
            <option value="ugc_ad">UGC Ad (pronto para anúncio)</option>
          </select>

          <label class="form-label">Nicho do produto</label>
          <select class="form-input" id="priceNiche" style="padding:.75rem 1rem">
            <option value="beleza">💄 Beleza / Skincare</option>
            <option value="casa">🏠 Casa / Decoração</option>
            <option value="pets">🐾 Pets</option>
            <option value="fitness">💪 Fitness / Saúde</option>
            <option value="moda">👗 Moda</option>
            <option value="tech">📱 Tech / Apps</option>
            <option value="info">📚 Infoprodutos</option>
            <option value="alim">🥗 Alimentação</option>
          </select>

          <label class="form-label">Direitos de uso</label>
          <select class="form-input" id="priceRights" style="padding:.75rem 1rem">
            <option value="1month">1 canal, 1 mês</option>
            <option value="3month">1 canal, 3 meses</option>
            <option value="6month" selected>1 canal, 6 meses</option>
            <option value="1year">1 canal, 1 ano</option>
            <option value="multicanal">Múltiplos canais, 1 ano</option>
            <option value="perp">Uso perpétuo (ilimitado)</option>
          </select>

          <label class="form-label">Urgência</label>
          <select class="form-input" id="priceUrgency" style="padding:.75rem 1rem">
            <option value="normal">Normal (5-7 dias úteis)</option>
            <option value="urgente">Urgente (2-3 dias) +30%</option>
            <option value="urgentissimo">Urgentíssimo (24h) +60%</option>
          </select>

          <button class="btn btn-primary btn-full" onclick="Generators.calcPrice()">💰 Calcular Faixa de Preço</button>
        </div>

        <div id="priceOutput" style="display:none"></div>
      </div>
    `;
  },

  calcPrice() {
    const level = document.getElementById('priceLevel').value;
    const type = document.getElementById('priceType').value;
    const niche = document.getElementById('priceNiche').value;
    const rights = document.getElementById('priceRights').value;
    const urgency = document.getElementById('priceUrgency').value;

    // Base prices by level
    const base = { iniciante: 150, intermediario: 400, avancado: 800 };
    let min = base[level] * 0.8;
    let max = base[level] * 1.3;

    // Type multipliers
    const typeMulti = { depoimento: 1, tutorial: 1.2, unboxing: 1.1, review: 1.3, ugc_ad: 1.5 };
    min *= typeMulti[type];
    max *= typeMulti[type];

    // Niche premiums
    const nicheMulti = { tech: 1.3, info: 1.2, fitness: 1.15, beleza: 1.1, pets: 1.05, moda: 1, casa: 1, alim: 0.95 };
    min *= nicheMulti[niche] || 1;
    max *= nicheMulti[niche] || 1;

    // Rights
    const rightsMulti = { '1month': 0.7, '3month': 0.85, '6month': 1, '1year': 1.3, multicanal: 1.7, perp: 2.5 };
    min *= rightsMulti[rights];
    max *= rightsMulti[rights];

    // Urgency
    const urgMulti = { normal: 1, urgente: 1.3, urgentissimo: 1.6 };
    min *= urgMulti[urgency];
    max *= urgMulti[urgency];

    min = Math.round(min / 10) * 10;
    max = Math.round(max / 10) * 10;

    const rightsLabels = { '1month': '1 mês', '3month': '3 meses', '6month': '6 meses', '1year': '1 ano', multicanal: 'múltiplos canais/1 ano', perp: 'uso perpétuo' };
    const typeLabels = { depoimento: 'Depoimento', tutorial: 'Tutorial', unboxing: 'Unboxing', review: 'Review', ugc_ad: 'UGC Ad' };

    document.getElementById('priceOutput').style.display = 'block';
    document.getElementById('priceOutput').innerHTML = `
      <div class="price-result">
        <div class="price-label">Faixa sugerida para ${typeLabels[type]}</div>
        <div class="price-range">R$ ${min} – R$ ${max}</div>
        <div class="price-label">por vídeo (${rightsLabels[rights]})</div>
        <div class="price-tips" style="margin-top:1.25rem">
          <div class="price-tip">📦 Pacote com 3+ vídeos: desconto de 10-15% por vídeo</div>
          <div class="price-tip">⚡ Urgência detectada: já incluída no cálculo</div>
          <div class="price-tip">💡 Sinal de 50% antes de começar sempre</div>
          <div class="price-tip">🚫 Nunca aceite "permuta" como pagamento único</div>
        </div>
      </div>
      <button class="btn btn-secondary btn-full mt-2" onclick="Generators.copyText('R\$ ${min} – R\$ ${max} por vídeo (${typeLabels[type]}, ${rightsLabels[rights]})', this)">📋 Copiar faixa de preço</button>
    `;
  },

  renderProposal() {
    return `
      <div class="tool-panel active">
        <div class="tool-title">📄 Gerador de Proposta</div>
        <div class="tool-desc">Preencha os dados e gere uma proposta profissional em segundos.</div>

        <div class="generator-form">
          <label class="form-label">Seu nome</label>
          <input type="text" class="form-input" id="propName" placeholder="Seu nome completo">

          <label class="form-label">Nome da marca / cliente</label>
          <input type="text" class="form-input" id="propBrand" placeholder="Ex: Beleza da Priscila">

          <label class="form-label">Quantidade de vídeos</label>
          <select class="form-input" id="propQty" style="padding:.75rem 1rem">
            <option value="1">1 vídeo</option>
            <option value="2">2 vídeos</option>
            <option value="3" selected>3 vídeos</option>
            <option value="5">5 vídeos</option>
            <option value="10">10 vídeos</option>
          </select>

          <label class="form-label">Formato dos vídeos</label>
          <select class="form-input" id="propFormat" style="padding:.75rem 1rem">
            <option>Depoimento (30-45 segundos)</option>
            <option>Tutorial (45-60 segundos)</option>
            <option>Unboxing (30-45 segundos)</option>
            <option>Review completo (45-60 segundos)</option>
            <option>Mix de formatos</option>
          </select>

          <label class="form-label">Valor total (R$)</label>
          <input type="number" class="form-input" id="propValue" placeholder="Ex: 450">

          <label class="form-label">Prazo de entrega (dias úteis)</label>
          <input type="number" class="form-input" id="propDeadline" placeholder="Ex: 7" value="7">

          <label class="form-label">Canal de uso</label>
          <select class="form-input" id="propChannel" style="padding:.75rem 1rem">
            <option>Instagram (Feed + Reels + Stories)</option>
            <option>Meta Ads (Facebook + Instagram)</option>
            <option>TikTok + TikTok Ads</option>
            <option>Todos os canais digitais</option>
            <option>Site / Landing Page</option>
          </select>

          <label class="form-label">Período de uso</label>
          <select class="form-input" id="propPeriod" style="padding:.75rem 1rem">
            <option>3 meses</option>
            <option>6 meses</option>
            <option>12 meses</option>
            <option>Uso perpétuo</option>
          </select>

          <button class="btn btn-primary btn-full" onclick="Generators.generateProposal()">📄 Gerar Proposta</button>
        </div>

        <div id="proposalOutput" style="display:none">
          <div class="generator-output">
            <button class="copy-btn" onclick="Generators.copyText(document.getElementById('proposalText').textContent, this)">Copiar</button>
            <pre id="proposalText"></pre>
          </div>
        </div>
      </div>
    `;
  },

  generateProposal() {
    const name = document.getElementById('propName').value.trim() || '[Seu nome]';
    const brand = document.getElementById('propBrand').value.trim() || '[Marca]';
    const qty = document.getElementById('propQty').value;
    const format = document.getElementById('propFormat').value;
    const value = document.getElementById('propValue').value || '[valor]';
    const deadline = document.getElementById('propDeadline').value || '7';
    const channel = document.getElementById('propChannel').value;
    const period = document.getElementById('propPeriod').value;
    const half = value !== '[valor]' ? `R$ ${Math.round(Number(value)/2)}` : '[metade do valor]';
    const today = new Date().toLocaleDateString('pt-BR');

    const proposal = `PROPOSTA DE UGC – ${name.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 DADOS DA PROPOSTA
Para: ${brand}
Criadora: ${name}
Data: ${today}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📹 O QUE VOCÊ RECEBE
• ${qty} vídeo(s) em formato vertical 9:16
• Formato: ${format}
• Arquivos editados e prontos para uso
• Entrega em até ${deadline} dias úteis após receber produto + briefing
• ${qty <= 3 ? '1 rodada de revisão incluída' : '2 rodadas de revisão incluídas'}

💰 INVESTIMENTO
Valor total: R$ ${value}
Pagamento: ${half} ao aprovar a proposta + ${half} na entrega final

📱 DIREITOS DE USO
Canal(is): ${channel}
Período: ${period}

📦 COMO FUNCIONA
1. Você aprova esta proposta
2. Realiza o pagamento do sinal (${half})
3. Envia o produto + briefing para meu endereço
4. Produzo e edito os vídeos
5. Envio para sua aprovação
6. Após aprovação, envio os arquivos finais
7. Pagamento do saldo restante

📩 CONTATO
${name}
[Seu e-mail] | [Seu WhatsApp]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Proposta válida por 7 dias.
Fico à disposição para dúvidas! 💜`;

    document.getElementById('proposalText').textContent = proposal;
    document.getElementById('proposalOutput').style.display = 'block';
  },

  renderRoleplay() {
    return `
      <div class="tool-panel active">
        <div class="tool-title">🤝 Roleplay de Negociação</div>
        <div class="tool-desc">Treine negociar com marcas! A IA vai simular uma situação real. Escolha um cenário e pratique responder.</div>

        <div class="scenario-badges" id="scenarioBadges">
          <button class="scenario-badge active" onclick="Roleplay.setScenario('pedido_desconto', this)">Pedem desconto</button>
          <button class="scenario-badge" onclick="Roleplay.setScenario('permuta', this)">Oferecem permuta</button>
          <button class="scenario-badge" onclick="Roleplay.setScenario('urgente', this)">Prazo urgente</button>
          <button class="scenario-badge" onclick="Roleplay.setScenario('sem_contrato', this)">Sem contrato</button>
          <button class="scenario-badge" onclick="Roleplay.setScenario('revisoes', this)">Muitas revisões</button>
        </div>

        <div class="roleplay-chat" id="roleplayChat"></div>

        <div class="roleplay-input-wrap">
          <input type="text" class="roleplay-input" id="roleplayInput" placeholder="Sua resposta como creator..." onkeydown="if(event.key==='Enter') Roleplay.send()">
          <button class="roleplay-send" onclick="Roleplay.send()">➤</button>
        </div>

        <div style="margin-top:.75rem">
          <button class="btn btn-secondary btn-sm" onclick="Roleplay.reset()">🔄 Reiniciar conversa</button>
        </div>
      </div>
    `;
  },

  renderTemplates() {
    return `
      <div class="tool-panel active">
        <div class="tool-title">📋 Templates Prontos</div>
        <div class="tool-desc">Mensagens, propostas e contratos prontos para copiar e adaptar com um clique.</div>

        ${COURSE_DATA.templates.map((tpl, i) => `
          <div class="template-card">
            <div class="template-title">${tpl.title}</div>
            <div class="template-body">${tpl.body}</div>
            <button class="btn btn-secondary btn-sm mt-2" onclick="Generators.copyText(\`${tpl.body.replace(/`/g,'\\`')}\`, this)">
              📋 Copiar Template
            </button>
          </div>
        `).join('')}
      </div>
    `;
  },

  copyText(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = '✅ Copiado!';
        setTimeout(() => btn.textContent = orig, 2000);
      }
      Toast.show('📋 Copiado para a área de transferência!', 'success');
    }).catch(() => {
      Toast.show('Não foi possível copiar. Selecione e copie manualmente.');
    });
  }
};

// ===== ROLEPLAY ENGINE =====
const Roleplay = {
  scenario: 'pedido_desconto',
  messages: [],
  turnCount: 0,

  scenarios: {
    pedido_desconto: {
      name: 'Cliente pede desconto',
      opening: `Oi! Vi sua proposta. Os vídeos parecem ótimos, mas R$ 450 está um pouco acima do nosso orçamento. Você consegue fazer por R$ 250?`,
      responses: [
        { trigger: ['entend', 'compreen'], reply: `Entendo sua posição. Mas R$ 250 fica bem difícil pela qualidade que entrego. Você consegue ir até R$ 380? Posso incluir uma versão extra do melhor vídeo como bônus.` },
        { trigger: ['não', 'nao', 'impossível', 'minimo'], reply: `Que pena! Mas entendo. Se mudar de ideia, estou aqui. Posso reduzir para 2 vídeos em vez de 3, mantendo a qualidade. Ficaria R$ 320. Faz sentido pra você?` },
        { trigger: ['pacote', 'reduz', 'menos', 'dois', '2'], reply: `Combinado! 2 vídeos por R$ 320, pagamento 50% agora e 50% na entrega. Posso enviar o contrato?` },
        { trigger: ['contrat', 'fechad', 'topei', 'aceito'], reply: `Ótimo! Vou preparar o contrato hoje. Você pode me enviar o briefing e o endereço para envio do produto? 💜` },
      ],
      fallback: `Posso considerar um pequeno ajuste se fecharmos um pacote maior. O que você acha de 3 vídeos por R$ 400?`
    },
    permuta: {
      name: 'Oferecem permuta',
      opening: `Adorei o seu trabalho! Mas no momento não temos orçamento em dinheiro. Podemos te enviar nossos produtos em troca dos vídeos. O que acha?`,
      responses: [
        { trigger: ['não aceito', 'nao aceito', 'apenas dinheiro', 'pagamento'], reply: `Obrigada pelo interesse! Entendo a situação, mas trabalho apenas com pagamento em dinheiro. Os produtos não cobrem meu tempo de trabalho, edição e minha expertise. Você tem previsão de quando terá orçamento para isso?` },
        { trigger: ['quando', 'previsão', 'futuro', 'mês'], reply: `Tudo bem! Me guarda para quando tiver orçamento. Posso fazer uma permuta parcial: você cobre 50% em dinheiro e complementa com produtos. Isso seria viável?` },
        { trigger: ['parcial', 'metade', '50%', 'parcialmente'], reply: `Ótimo! Vamos acertar os detalhes então. Qual é o valor dos produtos que você enviaria? Preciso calcular se fecha com minha tabela.` },
        { trigger: ['não posso', 'nao posso', 'inviável', 'impossível'], reply: `Entendo! Sem problema. Se quiser trabalhar comigo quando tiver orçamento, fique à vontade para me chamar. Muito sucesso!` },
      ],
      fallback: `Obrigada pela transparência! No momento minha política é de pagamento em dinheiro. Posso permuta parcial se cobrir pelo menos 60% do valor. Isso seria possível?`
    },
    urgente: {
      name: 'Prazo urgente',
      opening: `Preciso urgente! Temos um lançamento amanhã e precisamos de 3 vídeos ainda hoje. Você consegue?`,
      responses: [
        { trigger: ['cobr', 'taxa', 'urg', 'valor'], reply: `Para essa urgência, posso fazer 1 vídeo hoje (não 3) com adicional de urgência de 60% sobre o valor normal. E precisaria do produto e briefing nos próximos 30 minutos. É possível?` },
        { trigger: ['um', '1', 'tudo bem', 'ok'], reply: `Perfeito! Mas precisarei de pagamento total antecipado para começar imediatamente. Você pode fazer o Pix agora? Assim que confirmar, começo.` },
        { trigger: ['pix', 'pago', 'enviando', 'transf'], reply: `Assim que o pagamento cair, começo imediatamente. Me mande o briefing e as fotos do produto por aqui. Vamos trabalhar! 💜` },
        { trigger: ['não posso', 'nao posso', 'impossível', 'cancelar'], reply: `Entendo! Para urgências futuras, sempre entre em contato com pelo menos 48h de antecedência. Assim consigo planejar melhor. Podemos marcar algo para a próxima campanha?` },
      ],
      fallback: `Urgência tem custo adicional de 60%. Para hoje, consigo apenas 1 vídeo com qualidade. 3 vídeos em 24h não é possível mantendo qualidade profissional.`
    },
    sem_contrato: {
      name: 'Querem sem contrato',
      opening: `Adorei seu portfólio! Posso fazer uma transferência agora e você começa? Sem burocracia de contrato.`,
      responses: [
        { trigger: ['contrat', 'precis', 'protect'], reply: `Fico feliz que gostou! Trabalho sempre com contrato – não é burocracia, é segurança para nós duas. Ele define o que será entregue, prazo, revisões e direitos de uso. É rápido, envio em formato digital. Posso mandar agora?` },
        { trigger: ['tudo bem', 'ok', 'pode', 'manda'], reply: `Ótimo! Envio o contrato por e-mail agora. Assim que assinar digitalmente, recebo o sinal e começo! Qual seu e-mail?` },
        { trigger: ['email', 'e-mail', '@'], reply: `Perfeito! Enviando o contrato agora. É simples, 1 página, bem objetivo. Qualquer dúvida me chama! 💜` },
        { trigger: ['não quero', 'nao quero', 'sem isso'], reply: `Entendo sua preferência, mas trabalho apenas com contrato. É uma proteção para você também – define exatamente o que receberá. Se mudar de ideia, estou aqui!` },
      ],
      fallback: `Obrigada pelo interesse! Sempre trabalho com contrato digital – é rápido, proteção para nós duas. Posso enviar o modelo agora por e-mail?`
    },
    revisoes: {
      name: 'Pedem revisões infinitas',
      opening: `Recebemos o vídeo mas não ficou exatamente como queríamos. Precisamos de algumas mudanças: corte diferente, música trocada, nova frase no começo e uma segunda versão sem a cena do produto. São 4 alterações.`,
      responses: [
        { trigger: ['1 revis', 'uma revis', 'inclui', 'contrat'], reply: `Que bom que recebeu! Como acordado no contrato, estão incluídas 1 rodada de revisão. Essa rodada cobre até 3 alterações pontuais. Para a quarta alteração e a versão extra, seria um adicional de R$ [valor]. Posso enviar um aditivo?` },
        { trigger: ['adicion', 'valor', 'quanto', 'cobr'], reply: `Para as 2 alterações extras, cobro R$ [valor] cada. Fica R$ [2x o valor] o adicional. Aprovo o aditivo e faço as mudanças hoje mesmo. O que você prefere?` },
        { trigger: ['tudo bem', 'ok', 'pode', 'aceito'], reply: `Ótimo! Envio o aditivo para você aprovar e depois finalizamos tudo. Obrigada pela compreensão! 💜` },
        { trigger: ['caro', 'muito', 'absurdo', 'grátis', 'gratis'], reply: `Entendo que parece muito, mas cada alteração demanda meu tempo de reedição, exportação e envio. São horas de trabalho. Posso fazer desconto de 20% no adicional. Ficaria R$ [valor com desconto]. Faz sentido?` },
      ],
      fallback: `Pelo contrato, temos 1 rodada de revisão com até 3 alterações. As extras têm custo adicional. Assim mantenho a qualidade e o prazo para todos os clientes!`
    }
  },

  setScenario(key, btn) {
    this.scenario = key;
    document.querySelectorAll('.scenario-badge').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    this.reset();
  },

  init() {
    this.scenario = 'pedido_desconto';
    this.reset();
  },

  reset() {
    this.messages = [];
    this.turnCount = 0;
    const chat = document.getElementById('roleplayChat');
    if (!chat) return;
    chat.innerHTML = '';

    const sc = this.scenarios[this.scenario];
    this.addMessage('brand', sc.opening);
    this.addMessage('system', '💡 Dica: Responda como creator profissional. Seja firme, educada e aberta a negociar dentro do razoável.');
  },

  addMessage(type, text) {
    const chat = document.getElementById('roleplayChat');
    if (!chat) return;

    const div = document.createElement('div');
    div.className = `rp-msg ${type === 'brand' ? 'brand' : type === 'user' ? 'user' : 'brand'}`;

    if (type === 'system') {
      div.style.cssText = 'align-self:center; background:var(--primary-light); color:var(--primary); border-radius:var(--radius-sm); padding:.5rem .875rem; font-size:.8rem; font-weight:600; max-width:100%; text-align:center';
    } else {
      div.innerHTML = `<div class="rp-name">${type === 'brand' ? '🏢 Marca' : '👩 Você'}</div>${text}`;
    }

    div.textContent = type === 'system' ? text : '';
    if (type !== 'system') {
      div.innerHTML = `<div class="rp-name">${type === 'brand' ? '🏢 Marca' : '👩 Você'}</div>${text}`;
    }

    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
    this.messages.push({ type, text });
  },

  send() {
    const input = document.getElementById('roleplayInput');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    this.addMessage('user', text);
    input.value = '';
    this.turnCount++;

    // Find matching response
    const sc = this.scenarios[this.scenario];
    const textLower = text.toLowerCase();
    let reply = sc.fallback;

    for (const r of sc.responses) {
      if (r.trigger.some(t => textLower.includes(t))) {
        reply = r.reply;
        break;
      }
    }

    setTimeout(() => {
      this.addMessage('brand', reply);

      if (this.turnCount >= 4) {
        setTimeout(() => {
          this.addMessage('system', '🎉 Ótima prática! Tente outro cenário ou refaça essa conversa com uma abordagem diferente.');
        }, 800);
      }
    }, 800);
  }
};
