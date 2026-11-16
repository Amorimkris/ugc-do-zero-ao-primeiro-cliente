// ===== COACH.JS – AI Coach Widget =====

const Coach = {
  isOpen: false,

  toggle() {
    this.isOpen = !this.isOpen;
    const panel = document.getElementById('coachPanel');
    if (this.isOpen) {
      panel.classList.add('open');
    } else {
      panel.classList.remove('open');
    }
  },

  send() {
    const input = document.getElementById('coachInput');
    const text = input.value.trim();
    if (!text) return;

    this.addMessage('user', text);
    input.value = '';

    // Simulate typing delay
    setTimeout(() => {
      const reply = this.getReply(text.toLowerCase());
      this.addMessage('bot', reply);
    }, 600);
  },

  addMessage(type, text) {
    const container = document.getElementById('coachMessages');
    const div = document.createElement('div');
    div.className = `coach-msg ${type}`;
    div.innerHTML = `<p>${text}</p>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  },

  getReply(text) {
    // Knowledge base for the coach
    const kb = [
      {
        keys: ['seguidores', 'preciso de seguidores', 'quantos seguidores'],
        reply: `Boa notícia: você NÃO precisa de seguidores para ser UGC Creator! 🎉 As marcas pagam pelo vídeo em si, não pelo seu alcance. Seu portfólio de vídeos é o que importa!`
      },
      {
        keys: ['câmera', 'equipamento', 'celular', 'preciso comprar'],
        reply: `Seu celular já é suficiente! 📱 Qualquer smartphone dos últimos 5 anos grava em qualidade ótima. Só compre equipamento (tripé, mic de lapela) depois de ter os primeiros clientes. Comece com o que tem!`
      },
      {
        keys: ['quanto cobrar', 'preço', 'valor', 'precificação'],
        reply: `Para iniciante: R$ 100-300 por vídeo é uma faixa realista e honesta. 💰 Use o Simulador de Preço nas Ferramentas para calcular exatamente o seu caso! Ele leva em conta nível, formato, nicho e direitos de uso.`
      },
      {
        keys: ['nicho', 'especialidade', 'área'],
        reply: `Escolha 2 nichos que você usa e conhece no dia a dia! 🎯 Beleza, casa, pets, fitness e infoprodutos têm muita demanda no Brasil. No Módulo 2 tem um exercício de 3 perguntas que vai te ajudar a decidir!`
      },
      {
        keys: ['cliente', 'primeiro cliente', 'onde encontrar'],
        reply: `Para o primeiro cliente: comece pelas lojas locais da sua cidade! 🏪 São mais acessíveis, fecham mais rápido e ajudam a construir portfólio. Depois expanda para Instagram de marcas e plataformas de UGC.`
      },
      {
        keys: ['portfólio', 'portfolio', 'sem cliente'],
        reply: `Você pode criar vídeos de portfólio com produtos que já tem em casa! 🎬 Não precisa de cliente real para começar. O Módulo 6 ensina exatamente como montar um portfólio incrível sem ter clientes ainda.`
      },
      {
        keys: ['gancho', 'hook', 'primeiros segundos'],
        reply: `O gancho é os 1-3 primeiros segundos do vídeo – o mais importante! ⚡ Use o Banco de Ganchos nas Ferramentas: tem 50+ modelos prontos por categoria. Sempre escreva 3-5 variações antes de gravar!`
      },
      {
        keys: ['nervosa', 'medo', 'travada', 'câmera', 'falar'],
        reply: `Isso é 100% normal! 💜 Use bullet points (não texto corrido) e grave várias tomadas – ninguém vê as tentativas. Imagine que está conversando com uma amiga. Com o tempo, fica cada vez mais natural, prometo!`
      },
      {
        keys: ['luz', 'iluminação', 'ring light'],
        reply: `A luz natural de janela é a melhor e mais barata! ☀️ Posicione-se DE FRENTE para a janela. Só compre ring light depois de ter clientes. No Módulo 3 tem tudo sobre iluminação gratuita!`
      },
      {
        keys: ['capcut', 'edição', 'editar'],
        reply: `CapCut é gratuito e em português! 🎬 É o app mais usado por UGC creators. No Módulo 5 tem um passo a passo completo de como editar: cortes, legendas automáticas, música e exportação.`
      },
      {
        keys: ['contrato', 'segurança'],
        reply: `Sempre trabalhe com contrato! 📄 Mesmo simples, ele protege você e o cliente. Use o template de contrato nas Ferramentas > Templates. Exija 50% de sinal antes de começar qualquer trabalho.`
      },
      {
        keys: ['permuta', 'produto', 'troca'],
        reply: `Permuta (produto em vez de dinheiro) não é pagamento real! 🚫 No máximo aceite permuta parcial (produto + dinheiro). No Módulo 8 tem um roleplay de negociação sobre exatamente essa situação!`
      },
      {
        keys: ['mei', 'nota fiscal', 'imposto'],
        reply: `MEI é a forma mais simples de formalizar! 🧾 Custa R$ 70,60/mês e permite emitir nota fiscal. No Módulo 10 você aprende tudo sobre a parte legal e financeira do negócio.`
      },
      {
        keys: ['prospecção', 'mensagem', 'abordar', 'contatar'],
        reply: `Use os templates de prospecção nas Ferramentas > Templates! 📩 Comece pelo DM do Instagram das marcas. Script básico: se apresente, cite um produto que gostou, mostre o portfólio, pergunte se tem interesse. Simples assim!`
      },
      {
        keys: ['roteiro', 'script', 'escrever'],
        reply: `Use o Gerador de Roteiros nas Ferramentas! 📝 As fórmulas principais: Gancho→Problema→Demo→Prova→CTA, PAS (Problema-Agitação-Solução) e "3 Motivos". O Módulo 4 explica cada uma em detalhes!`
      },
      {
        keys: ['oi', 'olá', 'ola', 'boa', 'tudo bem'],
        reply: `Oi! 👋 Que bom ter você aqui! Pode me perguntar qualquer coisa sobre UGC, precificação, gravação, edição, prospecção... Estou aqui para ajudar! 💜`
      },
      {
        keys: ['obrigada', 'obrigado', 'valeu'],
        reply: `Fico feliz em ajudar! 💜 Qualquer dúvida que surgir, pode perguntar. Você está no caminho certo – continue firme nos estudos!`
      }
    ];

    // Find matching knowledge
    for (const item of kb) {
      if (item.keys.some(k => text.includes(k))) {
        return item.reply;
      }
    }

    // Generic helpful responses
    const generic = [
      `Boa pergunta! 🤔 Recomendo verificar o módulo relacionado ao seu tema. Se não encontrar, pode me perguntar de forma mais específica que vou tentar ajudar melhor!`,
      `Interessante! 💡 Para essa dúvida, procure nas aulas do módulo correspondente. E lembre-se: use as Ferramentas (Gerador de Ganchos, Roteiros, Simulador de Preço) para colocar em prática!`,
      `Essa é uma ótima dúvida! 🌟 O curso vai cobrir isso em detalhes. Continue estudando na sequência dos módulos – cada um prepara você para o próximo!`,
      `Entendi sua dúvida! 💜 O mais importante agora é continuar avançando nos módulos e fazer as missões práticas. A prática é o que realmente consolida o aprendizado!`
    ];

    return generic[Math.floor(Math.random() * generic.length)];
  }
};
