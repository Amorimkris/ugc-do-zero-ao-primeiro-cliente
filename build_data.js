// Node script to generate the complete data.js with all 11 modules (0 to 10) + portfolio templates
const fs = require('fs');
const path = require('path');

const COURSE_DATA = {
  modules: [
    // ==================== MÓDULO 0 ====================
    {
      id: 0,
      title: 'Boas-vindas e Mentalidade',
      emoji: '🌟',
      description: 'O que é UGC e por que você é perfeita pra isso',
      xp: 100,
      badge: { emoji: '🌱', name: 'Primeira Semente' },
      lessons: [
        {
          id: 'l0-1',
          title: 'O que é UGC? (Explicado sem complicação)',
          emoji: '📱',
          time: '5 min',
          xp: 20,
          content: `
<h3>Vamos começar do começo! 😊</h3>
<p>UGC significa <strong>User Generated Content</strong> – mas em português simples chamamos de <strong>Conteúdo de Criadora</strong>.</p>
<p>Na prática: <strong>você grava um vídeo curto com o seu celular usando ou recomendando um produto, e a marca te paga para usar esse vídeo nos anúncios dela.</strong></p>
<div class="highlight-box"><p>✨ Pensa assim: você já recomendou um creme, uma panela ou uma loja para uma amiga no WhatsApp? Pois é! Agora você vai ser paga por isso – de forma profissional, segura e sem sair de casa.</p></div>
<h3>Por que as marcas pagam por isso?</h3>
<p>As pessoas hoje em dia pulam comerciais de televisão e desconfiam de propagandas com atrizes perfeitas. Quando elas veem uma mulher real, no ambiente de casa, falando com naturalidade, <strong>a confiança é imediata</strong>.</p>
<div class="tip-box"><p>Vídeos com cara de pessoa comum convertem até 4x mais vendas para as marcas do que anúncios tradicionais. É por isso que o mercado de UGC está explodindo no Brasil!</p></div>
<h3>O que você NÃO precisa:</h3>
<ul>
<li>❌ Não precisa ter seguidores (pode começar com perfil do zero ou privado)</li>
<li>❌ Não precisa de câmera cara ou luz de estúdio (seu celular atual resolve)</li>
<li>❌ Não precisa ter menos de 30 anos (marcas procuram desesperadamente mulheres 40+ para produtos de beleza madura, casa, família e saúde)</li>
<li>❌ Não precisa de faculdade de marketing ou edição avançada</li>
</ul>`
        },
        {
          id: 'l0-2',
          title: 'UGC Creator vs Influenciador: a grande diferença',
          emoji: '🆚',
          time: '4 min',
          xp: 20,
          content: `
<h3>Entenda a diferença que vai tirar um peso das suas costas</h3>
<p>Muitas mulheres acham que para ganhar dinheiro com internet precisam virar "blogueiras", dançar na frente da câmera ou expor a vida íntima da família. <strong>UGC é o oposto disso!</strong></p>
<h3>Influenciador Tradicional</h3>
<ul>
<li>Depende de ter dezenas de milhares de seguidores</li>
<li>A marca paga pelo número de pessoas que vão assistir no perfil dele</li>
<li>Precisa postar a rotina o dia todo para manter o público</li>
<li>Leva anos para começar a monetizar</li>
</ul>
<h3>UGC Creator (Você!)</h3>
<ul>
<li>Você é uma <strong>prestadora de serviços de vídeo</strong></li>
<li>A marca paga pelo <strong>arquivo de vídeo</strong> (MP4) que você entrega</li>
<li>O vídeo vai ser veiculado nos anúncios da marca, não necessariamente na sua rede social pessoal</li>
<li>Você pode fechar seu primeiro trabalho já no primeiro mês de prática</li>
</ul>
<div class="highlight-box"><p>💡 Você não vende a sua vida privada. Você entrega um serviço profissional de criação e recebe por cada vídeo entregue!</p></div>`
        },
        {
          id: 'l0-3',
          title: 'Quanto dá pra ganhar de forma realista',
          emoji: '💰',
          time: '5 min',
          xp: 20,
          content: `
<h3>Sem promessas mágicas: números do mercado brasileiro</h3>
<p>Vamos falar com transparência para você planejar sua meta financeira com os pés no chão:</p>
<h3>Faixas de remuneração por vídeo:</h3>
<ul>
<li><strong>🌱 Iniciante (seus primeiros 1 a 3 meses):</strong> R$ 150 a R$ 300 por vídeo</li>
<li><strong>🌿 Intermediária (com portfólio e 5+ clientes atendidos):</strong> R$ 350 a R$ 600 por vídeo</li>
<li><strong>🌳 Criadora Consolidada (com pacotes e recorrência):</strong> R$ 700 a R$ 1.500+ por vídeo</li>
</ul>
<div class="highlight-box"><p>📊 <strong>Exemplo de meta simples:</strong> Se você gravar 2 vídeos por semana a R$ 200 cada, no fim do mês são <strong>R$ 1.600 extras</strong> na sua conta, dedicando cerca de 4 a 6 horas por semana!</p></div>
<p>Conforme você ganha agilidade, grava um vídeo completo em menos de 1 hora. O potencial para atingir R$ 3.000 a R$ 5.000 mensais é muito real conforme você fecha contratos mensais recorrentes.</p>`
        },
        {
          id: 'l0-4',
          title: 'Quebrando os 4 maiores medos de começar',
          emoji: '💪',
          time: '4 min',
          xp: 20,
          content: `
<h3>Respira fundo. Esses medos são completamente normais!</h3>
<p>Toda aluna iniciante sente exatamente as mesmas inseguranças antes de gravar o primeiro vídeo. Vamos desarmar uma por uma:</p>
<h3>1. "Não tenho vergonha de aparecer, mas e se eu gaguejar?"</h3>
<p>Ninguém assiste ao vivo! Você pode errar 10 vezes e só salvar a tomada que ficou boa. Na edição, cortamos qualquer suspiro ou pausa.</p>
<h3>2. "Minha casa é simples, não tenho cenário de novela..."</h3>
<p>As marcas querem justamente a vida real! Um cantinho limpo perto de uma janela, uma mesa organizada ou a bancada da pia é tudo o que você precisa.</p>
<h3>3. "Tenho mais de 40 anos, isso não é coisa de adolescente?"</h3>
<p>Pelo contrário: o mercado está saturado de jovens de 20 anos. Marcas de cosméticos anti-sinais, utilidades domésticas, suplementos e colchões precisam urgentemente do perfil 40+ para gerar identificação com quem realmente tem poder de compra!</p>
<h3>4. "E se ninguém me responder nas mensagens?"</h3>
<p>Prospecção é um jogo de números e método. Com os modelos certos que você vai aprender aqui, a taxa de resposta é garantida!</p>`
        }
      ],
      quiz: [
        {
          q: 'Qual é a principal diferença entre uma UGC Creator e uma Influenciadora?',
          options: [
            'A UGC Creator precisa de pelo menos 10.000 seguidores',
            'A UGC Creator é contratada pelo vídeo produzido, que será usado pela marca, sem depender de seguidores',
            'A influenciadora cobra mais barato porque trabalha menos',
            'Não existe nenhuma diferença entre as duas'
          ],
          correct: 1,
          explanation: 'Exato! A criadora de UGC vende o trabalho de criação de vídeo. A marca usa o material nos anúncios dela, eliminando a necessidade de audiência prévia.'
        },
        {
          q: 'Qual é uma expectativa realista de ganhos para uma iniciante que se dedica semanalmente?',
          options: [
            'R$ 50.000 no primeiro mês sem esforço',
            'Trabalhar de graça durante um ano inteiro',
            'R$ 150 a R$ 300 por vídeo, podendo somar R$ 1.000 a R$ 2.500 no mês com dedicação parcial',
            'Apenas receber brindes e produtos para sempre'
          ],
          correct: 2,
          explanation: 'Cobrar entre R$ 150 e R$ 300 por vídeo no início é o padrão profissional seguro no Brasil, gerando renda extra real desde os primeiros trabalhos.'
        }
      ],
      mission: {
        title: 'Missão: Definir Sua Meta e Seu Tempo',
        description: 'Coloque sua intenção no papel para transformar esse curso em clientes reais.',
        steps: [
          'Escrevi minha meta de renda mensal com UGC para os próximos 3 meses',
          'Defini os dias da semana e horários em que vou estudar e gravar (ex: sábados pela manhã)',
          'Calculei quantos vídeos a R$ 200 preciso fazer no mês para atingir minha meta',
          'Tirei uma foto mental ou escrevi: "Eu sou capaz de aprender e criar no meu tempo"'
        ],
        note: 'Seja generosa com você mesma. Pequenos passos constantes valem muito mais do que tentar fazer tudo em um dia.'
      }
    },

    // ==================== MÓDULO 1 ====================
    {
      id: 1,
      title: 'Como o Mercado Funciona',
      emoji: '🏪',
      description: 'Quem contrata, onde os vídeos rodam e por que pagam',
      xp: 120,
      badge: { emoji: '🔍', name: 'Detetive do Mercado' },
      lessons: [
        {
          id: 'l1-1',
          title: 'Quem contrata criadoras de UGC no Brasil?',
          emoji: '🤝',
          time: '5 min',
          xp: 25,
          content: `
<h3>O mapa dos seus futuros clientes</h3>
<p>O mercado é muito mais amplo do que apenas multinacionais famosas. Na verdade, seus clientes mais fáceis e rápidos de fechar são:</p>
<h3>1. E-commerces e Lojas no Instagram / Shopee / Mercado Livre</h3>
<p>Lojas que vendem roupas, bolsas, bijuterias, utilidades para o lar, cosméticos artesanais e organizadores. Elas precisam de vídeos novos toda semana para colocar anúncios rodando.</p>
<h3>2. Pequenas e Médias Marcas Nacionais</h3>
<p>Empresas de suplementos, vitaminas, produtos para cabelo, dermocosméticos e chás naturais.</p>
<h3>3. Infoprodutores (Cursos online e e-books)</h3>
<p>Professores e especialistas que vendem cursos online de culinária, artesanato, idiomas, finanças e desenvolvimento pessoal.</p>
<h3>4. Negócios Locais da Sua Cidade</h3>
<p>Clínicas de estética, salões de beleza, confeitarias, óticas e pet shops perto da sua casa. Esse é o caminho mais rápido para o primeiro cliente!</p>`
        },
        {
          id: 'l1-2',
          title: 'Os 6 tipos de vídeos que as marcas mais compram',
          emoji: '🎬',
          time: '5 min',
          xp: 25,
          content: `
<h3>Conheça os formatos que você vai oferecer:</h3>
<ul>
<li>🗣️ <strong>Depoimento / Testemunho Sincero:</strong> Você falando de forma calorosa como o produto te ajudou na sua rotina real.</li>
<li>📦 <strong>Unboxing com Reações Naturais:</strong> Abrindo a embalagem, mostrando o cuidado do envio, a textura e o cheirinho do produto.</li>
<li>⭐ <strong>Review & Demonstração:</strong> Mostrando o produto em ação (aplicando na pele, limpando um móvel ou vestindo uma peça).</li>
<li>⚡ <strong>Problema → Solução:</strong> Começa com uma dor comum ("odiava passar horas esfregando o forno") e mostra a solução prática.</li>
<li>📖 <strong>Mini-Tutorial / "Como usar":</strong> Passo a passo explicativo em 3 etapas rápidas.</li>
<li>✨ <strong>3 Motivos / Dica de Amiga:</strong> Lista dinâmica com 3 benefícios principais para a pessoa comprar agora.</li>
</ul>`
        },
        {
          id: 'l1-3',
          title: 'Onde o seu vídeo vai rodar e as regras técnicas',
          emoji: '📡',
          time: '4 min',
          xp: 25,
          content: `
<h3>Entendendo o destino da sua entrega</h3>
<p>Quando você grava para uma marca, ela geralmente utiliza o material em:</p>
<ul>
<li><strong>Anúncios no Instagram & Facebook (Meta Ads):</strong> No feed, stories e reels patrocinados.</li>
<li><strong>TikTok Ads:</strong> Anúncios dinâmicos com legenda em tela.</li>
<li><strong>Página do Produto (Site da loja):</strong> Para convencer o cliente indeciso a finalizar a compra.</li>
</ul>
<div class="tip-box"><p><strong>Padrão de ouro de gravação:</strong> Sempre na vertical (formato 9:16), em 1080p, com duração média entre 25 a 45 segundos. Esse é o tamanho perfeito que segura a atenção sem cansar!</p></div>`
        }
      ],
      quiz: [
        {
          q: 'Qual formato de vídeo é ideal para mostrar a chegada e primeira impressão de um produto?',
          options: [
            'Entrevista corporativa de 30 minutos',
            'Unboxing dinâmico mostrando a abertura do pacote e detalhes',
            'Vídeo mudo em formato horizontal de cinema',
            'Apenas fotos estáticas com texto'
          ],
          correct: 1,
          explanation: 'O unboxing conecta com a curiosidade e expectativa de quem quer comprar o produto pela internet!'
        }
      ],
      mission: {
        title: 'Missão: Analisando Anúncios Reais',
        description: 'Abra seu Instagram ou TikTok e role o feed com olhar de criadora profissional.',
        steps: [
          'Encontrei 3 anúncios patrocinados de marcas diferentes no meu feed',
          'Identifiquei qual o formato de cada um (depoimento, review, unboxing ou tutorial)',
          'Prestei atenção no gancho: o que a pessoa disse nos primeiros 3 segundos?',
          'Anotei 1 coisa que gostei e 1 coisa que eu faria melhor nesses vídeos'
        ]
      }
    },

    // ==================== MÓDULO 2 ====================
    {
      id: 2,
      title: 'Escolher Nicho e Posicionamento',
      emoji: '🎯',
      description: 'Sua especialidade é o seu maior diferencial',
      xp: 130,
      badge: { emoji: '🎯', name: 'Nicho Certeiro' },
      lessons: [
        {
          id: 'l2-1',
          title: 'Os nichos mais aquecidos e fáceis de fechar',
          emoji: '💄',
          time: '5 min',
          xp: 30,
          content: `
<h3>Onde está o dinheiro no mercado de UGC?</h3>
<p>Embora qualquer produto possa ter UGC, alguns nichos compram vídeos continuamente:</p>
<ul>
<li>🌸 <strong>Beleza e Cuidados da Pele:</strong> Hidratantes, protetor solar, séruns anti-idade, maquiagem prática.</li>
<li>🏡 <strong>Casa, Cozinha e Decoração:</strong> Panelas, organizadores, itens de limpeza inteligente, pequenos eletrodomésticos.</li>
<li>🐕 <strong>Mundo Pet:</strong> Rações especiais, brinquedos, roupinhas, caminhas e produtos de higiene animal.</li>
<li>🏃 <strong>Saúde, Bem-Estar e Fitness:</strong> Chás, suplementos, garrafas térmicas, tênis confortáveis.</li>
<li>📱 <strong>Aplicativos e Serviços Digitais:</strong> Bancos digitais, apps de cashback, ferramentas de produtividade.</li>
</ul>
<div class="tip-box"><p>Dica de ouro: O melhor nicho para você começar é aquele com produtos que você <strong>já usa e ama na sua casa</strong>. Você não precisa comprar nada novo para treinar!</p></div>`
        },
        {
          id: 'l2-2',
          title: 'Sua frase de posicionamento profissional',
          emoji: '✍️',
          time: '4 min',
          xp: 30,
          content: `
<h3>Apresente-se com autoridade desde o primeiro dia</h3>
<p>Quando uma marca perguntar o que você faz, você não vai dizer "tô tentando fazer uns vídeos". Você vai usar a fórmula de posicionamento:</p>
<div class="highlight-box"><p><strong>Fórmula:</strong> "Sou a [Seu Nome], criadora de UGC especializada em [Seu Nicho]. Ajudo marcas a venderem mais através de vídeos autênticos e humanizados que conectam de verdade com o cliente."</p></div>
<p>Essa frase simples transmite segurança imediata e separa você de quem parece amadora descompromissada.</p>`
        }
      ],
      quiz: [
        {
          q: 'Qual o critério mais inteligente para uma iniciante escolher seus primeiros nichos?',
          options: [
            'Escolher nichos que nunca viu na vida só porque ouviu dizer que dão dinheiro',
            'Escolher nichos com os quais já tem vivência, afinidade e produtos em casa',
            'Mudar de nicho todo dia sem foco algum',
            'Copiar exatamente o nicho de uma celebridade de Hollywood'
          ],
          correct: 1,
          explanation: 'Começar com produtos que você já tem em casa economiza dinheiro e garante que sua fala soe 100% natural e sincera!'
        }
      ],
      mission: {
        title: 'Missão: Definir Seus 2 Nichos Principais',
        description: 'Escolha suas duas frentes de atuação e crie sua frase oficial.',
        steps: [
          'Olhei pela minha casa e listei 5 produtos que eu realmente gosto de usar',
          'Escolhi meus 2 nichos principais (ex: Casa & Organização + Cuidados Pessoais)',
          'Escrevi minha frase de posicionamento completa usando o Gerador de Bio das Ferramentas',
          'Coloquei a frase no meu bloco de notas pronta para uso'
        ]
      }
    },

    // ==================== MÓDULO 3 ====================
    {
      id: 3,
      title: 'Setup Básico (Zero Gasto)',
      emoji: '📸',
      description: 'Grave vídeos lindos com o que você já tem em mãos',
      xp: 140,
      badge: { emoji: '🎥', name: 'Set Pronto' },
      lessons: [
        {
          id: 'l3-1',
          title: 'Luz natural de janela: o segredo do cinema sem gastar 1 real',
          emoji: '☀️',
          time: '4 min',
          xp: 30,
          content: `
<h3>Você não precisa de ring light cara!</h3>
<p>A luz natural de uma janela aberta é infinitamente mais suave e bonita do que luz artificial de luminária barata.</p>
<ul>
<li><strong>Posição perfeita:</strong> Fique de frente para a janela, com o celular entre você e a janela. A luz vai banhar seu rosto de forma homogênea.</li>
<li><strong>O que NUNCA fazer:</strong> Ficar de costas para a janela (contra a luz). Você vai virar uma sombra escura!</li>
<li><strong>Melhores horários:</strong> Entre 8h e 10h da manhã ou das 14h às 16h da tarde, quando a luz não é agressiva.</li>
</ul>`
        },
        {
          id: 'l3-2',
          title: 'Áudio limpo e enquadramento vertical 9:16',
          emoji: '🎙️',
          time: '4 min',
          xp: 30,
          content: `
<h3>Regra técnica essencial:</h3>
<p>Um vídeo com imagem boa e áudio com eco ou barulho de trânsito é descartado pelas marcas. Para ter áudio perfeito sem gastar:</p>
<ul>
<li>Feche as janelas da rua enquanto grava sua fala</li>
<li>Desligue ventilador ou ar condicionado</li>
<li>Grave num cômodo com móveis, tapetes e cortinas (eles absorvem o eco da voz)</li>
<li>Fale a cerca de um palmo e meio do microfone do celular</li>
<li>Limpe a lente da câmera do celular antes de apertar o play com um paninho limpo (90% dos vídeos embaçados são apenas marca de dedo na lente!)</li>
</ul>`
        }
      ],
      quiz: [
        {
          q: 'Qual é o erro mais comum que deixa a imagem do celular embaçada ou sem brilho?',
          options: [
            'Lente do celular com gordura de dedos acumulada',
            'Gravar perto da janela',
            'Falar com naturalidade',
            'Usar roupa de cor clara'
          ],
          correct: 0,
          explanation: 'Limpar a lente da câmera com um pano limpo antes de cada gravação transforma a qualidade do seu vídeo instantaneamente!'
        }
      ],
      mission: {
        title: 'Missão: Cantinho de Gravação e Teste de 15s',
        description: 'Monte seu espaço simples e faça seu primeiro teste de gravação.',
        steps: [
          'Limpei a lente da câmera do meu celular com uma flanelinha',
          'Encontrei uma janela com boa claridade na minha casa',
          'Apoiei o celular na vertical em uma xícara, livro ou suporte improvisado',
          'Gravei um vídeo teste de 15 segundos falando: "Oi, estou testando a luz e o som do meu espaço!"',
          'Assisti com fone de ouvido para conferir se o som ficou nítido'
        ]
      }
    },

    // ==================== MÓDULO 4 ====================
    {
      id: 4,
      title: 'Anatomia de um Vídeo que Converte',
      emoji: '🎯',
      description: 'A fórmula de 5 partes para roteiros magnéticos',
      xp: 150,
      badge: { emoji: '⚡', name: 'Roteirista Poderosa' },
      lessons: [
        {
          id: 'l4-1',
          title: 'A estrutura infalível de 5 etapas',
          emoji: '🏗️',
          time: '5 min',
          xp: 35,
          content: `
<h3>Como prender a atenção do início ao fim:</h3>
<ol>
<li><strong>1. Gancho (0 a 3s):</strong> Uma frase ou ação impactante para a pessoa parar de rolar a tela. Ex: <em>"Se você tem mais de 40 anos e sente a pele ressecando, não compre nada antes de ver isso!"</em></li>
<li><strong>2. Problema / Identificação (3 a 10s):</strong> Mostrar a dor real. Ex: <em>"Eu acordava todo dia com a sensação de pele repuxando e nenhum creme barato durava."</em></li>
<li><strong>3. Demonstração do Produto (10 a 25s):</strong> Mostrar o produto, aplicando na pele, textura cremosa, absorção rápida.</li>
<li><strong>4. Prova do Benefício (25 a 35s):</strong> Sensação de alívio e bem-estar. <em>"Minha pele ficou com toque aveludado o dia inteiro sem ficar oleosa."</em></li>
<li><strong>5. Chamada para Ação - CTA (35 a 40s):</strong> Direta e convidativa. <em>"Clica no link aqui embaixo para garantir com desconto!"</em></li>
</ol>`
        },
        {
          id: 'l4-2',
          title: 'Como falar sem parecer que está lendo ou decorando',
          emoji: '🗣️',
          time: '5 min',
          xp: 35,
          content: `
<h3>O segredo das criadoras profissionais: Tópicos, não textos longos!</h3>
<p>Se você tentar memorizar um parágrafo inteiro, seus olhos vão ficar paralisados ou olhando para cima tentando lembrar as palavras. Isso soa falso.</p>
<div class="tip-box"><p><strong>Método dos 4 Post-its:</strong> Anote no papel apenas 4 palavras-chave: 1. Gancho, 2. Problema, 3. Aplicação, 4. Link. Cole ao lado da câmera do celular e fale como se estivesse fofocando com a sua irmã no telefone!</p></div>`
        }
      ],
      quiz: [
        {
          q: 'Qual é o papel dos primeiros 3 segundos de um vídeo de anúncio?',
          options: [
            'Falar seu nome completo e cidade natal',
            'Ficar em silêncio olhando para a tela',
            'Fazer um gancho magnético para parar a rolagem e reter o espectador',
            'Mostrar o comprovante fiscal da compra'
          ],
          correct: 2,
          explanation: 'Nos primeiros 3 segundos você precisa fisgar o interesse da pessoa, senão ela continua rolando o feed e o anúncio perde a chance de venda!'
        }
      ],
      mission: {
        title: 'Missão: Escrever Seu Primeiro Roteiro de 5 Etapas',
        description: 'Pegue um produto da sua rotina e use o Gerador de Roteiros para criar seu script.',
        steps: [
          'Abri o Gerador de Roteiro na aba Ferramentas',
          'Preenchi o produto, a dor e a solução',
          'Gerei meu roteiro e ajustei com as minhas próprias palavras cotidianas',
          'Li em voz alta 3 vezes cronometrando para ficar entre 30 e 40 segundos'
        ]
      }
    },

    // ==================== MÓDULO 5 ====================
    {
      id: 5,
      title: 'Gravar e Editar no Celular',
      emoji: '📱',
      description: 'Dominando tomadas, B-roll e edição rápida no CapCut',
      xp: 160,
      badge: { emoji: '🎬', name: 'Diretora de Si Mesma' },
      lessons: [
        {
          id: 'l5-1',
          title: 'Gravação em múltiplos blocos e B-Roll',
          emoji: '🎥',
          time: '5 min',
          xp: 40,
          content: `
<h3>Você não precisa gravar tudo de uma vez só!</h3>
<p>Gravar tudo em uma tomada contínua sem errar é quase impossível. Criadoras inteligentes dividem o vídeo em pequenos pedacinhos:</p>
<ul>
<li><strong>A-Roll (Tomada Principal):</strong> Você falando para a câmera (o gancho e o encerramento).</li>
<li><strong>B-Roll (Imagens de Apoio):</strong> Tomadas aproximadas do produto sem seu rosto. Ex: suas mãos segurando a embalagem, a textura do produto na ponta dos dedos, o produto sendo guardado na bolsa.</li>
</ul>
<div class="tip-box"><p>Quando você intercala seu rosto com imagens de apoio bem feitas, o vídeo fica super dinâmico e gostoso de assistir, e você nem precisa ficar falando o tempo todo!</p></div>`
        },
        {
          id: 'l5-2',
          title: 'Edição Passo a Passo no CapCut (Gratuito e em Português)',
          emoji: '✂️',
          time: '5 min',
          xp: 40,
          content: `
<h3>Os 4 passos que você precisa dominar:</h3>
<ol>
<li><strong>1. Corte de Silêncios (Jump Cut):</strong> Importe seus vídeos e corte os segundos antes de você começar a falar e depois que termina. Deixe a fala fluida, sem respirações longas.</li>
<li><strong>2. Legendas Automáticas:</strong> No CapCut, clique em <em>Texto > Legendas Automáticas</em>. Ele gera sozinho! Escolha uma fonte limpa, com borda preta ou fundo contrastante. Cerca de 80% das pessoas assistem vídeos sem som no celular.</li>
<li><strong>3. Trilha Sonora de Fundo:</strong> Escolha uma música suave e animada da biblioteca, mas <strong>baixe o volume para 10% a 15%</strong> para não abafar sua voz.</li>
<li><strong>4. Exportação Profissional:</strong> Exporte sempre em 1080p a 30fps. Desative a tela final padrão do CapCut para entregar um arquivo 100% limpo para a marca.</li>
</ol>`
        }
      ],
      quiz: [
        {
          q: 'Por que é fundamental colocar legendas automáticas no seu vídeo UGC?',
          options: [
            'Porque a maioria dos usuários assiste vídeos nas redes com o áudio desativado',
            'Porque é obrigatório por lei federal',
            'Para cobrir qualquer erro na imagem do produto',
            'Apenas para vídeos com mais de duas horas de duração'
          ],
          correct: 0,
          explanation: 'Mais de 70% das pessoas no Instagram e TikTok navegam no mudo durante o trabalho ou transporte. A legenda garante a mensagem e dobra a retenção!'
        }
      ],
      mission: {
        title: 'Missão: Gravar e Editar Seu Vídeo Piloto',
        description: 'Produza seu primeiro vídeo completo de 30 segundos usando o CapCut.',
        steps: [
          'Gravei 2 tomadas falando para a câmera (gancho e chamada final)',
          'Gravei 3 pequenas tomadas de apoio (B-roll) mostrando o produto em detalhes',
          'Abri o CapCut, juntei os cortes e eliminei os silêncios vazios',
          'Adicionei legendas automáticas e conferi a ortografia',
          'Coloquei uma musiquinha em volume baixo (12%) e exportei em 1080p'
        ]
      }
    },

    // ==================== MÓDULO 6 ====================
    {
      id: 6,
      title: 'Portfólio que Vende Sem Ter Cliente',
      emoji: '💼',
      description: 'Como montar suas amostras e seu perfil profissional',
      xp: 170,
      badge: { emoji: '💼', name: 'Portfólio Montado' },
      lessons: [
        {
          id: 'l6-1',
          title: 'Os 5 vídeos que todo portfólio vencedor precisa ter',
          emoji: '📂',
          time: '5 min',
          xp: 40,
          content: `
<h3>O maior mito: "Preciso que alguém me contrate para ter o que mostrar"</h3>
<p>Toda criadora de sucesso começou gravando com produtos que já tinha no banheiro ou na despensa. As marcas querem avaliar a sua iluminação, seu áudio, sua naturalidade e sua capacidade de demonstrar o benefício.</p>
<h3>A coleção dos 5 vídeos de ouro:</h3>
<ul>
<li>1. <strong>Depoimento / Review:</strong> Mostrando sua conexão sincera com um produto.</li>
<li>2. <strong>Unboxing:</strong> Mostrando capricho, embalagem e entusiasmo genuíno.</li>
<li>3. <strong>Problema e Solução:</strong> Focado em dor e alívio imediato.</li>
<li>4. <strong>Tutorial Prático:</strong> Ensinando passo a passo como aplicar ou montar.</li>
<li>5. <strong>3 Motivos / Lista Rápida:</strong> Dinâmico e direto ao ponto.</li>
</ul>`
        },
        {
          id: 'l6-2',
          title: 'Onde hospedar seu portfólio para impressionar as marcas',
          emoji: '🌐',
          time: '4 min',
          xp: 40,
          content: `
<h3>Praticidade e elegância:</h3>
<p>Não gaste dinheiro com site complexo agora! Suas melhores opções são:</p>
<ul>
<li><strong>Nossa ferramenta "Meu Portfólio" integrada:</strong> Já vem com suas amostras organizadas, biografia e botão direto para seu WhatsApp!</li>
<li><strong>Google Drive Profissional:</strong> Uma pasta pública organizada com pastas numeradas (01_Depoimentos, 02_Unboxings, 03_Reviews).</li>
<li><strong>Instagram de Criadora:</strong> Um perfil separado exclusivamente para postar seus vídeos de demonstração, fixando os melhores no feed.</li>
</ul>`
        }
      ],
      quiz: [
        {
          q: 'Como uma iniciante monta seu primeiro portfólio se nenhuma marca a contratou ainda?',
          options: [
            'Pagando atores profissionais para gravarem por ela',
            'Gravando vídeos de demonstração com produtos de qualidade que já usa em sua própria casa',
            'Esperando um ano até alguém mandar mensagem por acaso',
            'Baixando vídeos de outras criadoras da internet e fingindo que fez'
          ],
          correct: 1,
          explanation: 'Criar amostras com produtos que você já tem em casa demonstra sua técnica e proatividade. A marca avalia seu estilo de gravação e sua autenticidade!'
        }
      ],
      mission: {
        title: 'Missão: Montar Seu Portfólio com 5 Amostras',
        description: 'Configure seus dados e prepare suas amostras na aba Portfólio.',
        steps: [
          'Acessei a aba Meu Portfólio no menu do curso',
          'Preenchi meu nome, foto/avatar, nichos principais e link de WhatsApp',
          'Revisei os 5 formatos modelo recomendados para meu portfólio',
          'Gerei o link ou visualização do meu portfólio de criadora pronto para enviar'
        ]
      }
    },

    // ==================== MÓDULO 7 ====================
    {
      id: 7,
      title: 'Achar Clientes e Prospecção Ativa',
      emoji: '📨',
      description: 'Como encontrar marcas e mandar mensagens que recebem sim',
      xp: 180,
      badge: { emoji: '📨', name: 'Prospectora Corajosa' },
      lessons: [
        {
          id: 'l7-1',
          title: 'Onde encontrar 50 marcas para prospectar hoje',
          emoji: '🔎',
          time: '5 min',
          xp: 45,
          content: `
<h3>Minas de ouro de clientes:</h3>
<ul>
<li><strong>1. Biblioteca de Anúncios do Meta (Facebook Ad Library):</strong> Ferramenta pública e gratuita onde você pesquisa marcas e vê quais já estão investindo em anúncios pagos. Se a marca já anuncia, ela precisa de UGC!</li>
<li><strong>2. Instagram - Aba de Compras e Sugestões:</strong> Siga 3 marcas médias do seu nicho. O algoritmo do Instagram vai começar a sugerir dezenas de lojas similares no seu feed.</li>
<li><strong>3. Shopee & Mercado Livre (Lojas Oficiais):</strong> Empresas que vendem muito no marketplace mas querem crescer a marca própria nas redes.</li>
<li><strong>4. Comércio Local:</strong> Clínicas, lojas de roupas e serviços da sua cidade que querem vídeos com sotaque e cara da região.</li>
</ul>`
        },
        {
          id: 'l7-2',
          title: 'O Script de Ouro para Direct e WhatsApp',
          emoji: '💬',
          time: '5 min',
          xp: 45,
          content: `
<h3>Nunca mande mensagem parecendo robô!</h3>
<p>Mensagens genéricas copiadas e coladas sem carinho vão direto para o lixo. A estrutura campeã tem 4 elementos:</p>
<ol>
<li><strong>Elogio sincero e específico:</strong> Mostre que você realmente olhou o perfil da marca.</li>
<li><strong>Apresentação curta:</strong> Quem você é e seu nicho.</li>
<li><strong>Oportunidade de valor:</strong> Explicar como vídeos com pessoas reais aumentam as conversões dos anúncios deles.</li>
<li><strong>Convite leve (Call to Action):</strong> Perguntar se pode enviar o link do seu portfólio para apreciação sem compromisso.</li>
</ol>
<div class="tip-box"><p>Use os modelos prontos na aba <strong>Ferramentas > Templates</strong>! Eles foram testados e aprovados para abrir conversas de forma acolhedora.</p></div>`
        }
      ],
      quiz: [
        {
          q: 'Qual é o segredo para ter uma alta taxa de resposta na prospecção de marcas?',
          options: [
            'Mandar a mesma mensagem idêntica para mil perfis em 5 minutos',
            'Personalizar a mensagem citando o produto real da marca e convidando para ver o portfólio',
            'Exigir pagamento imediato na primeira frase da conversa',
            'Reclamar da qualidade dos posts atuais da marca'
          ],
          correct: 1,
          explanation: 'Personalização e cordialidade mostram profissionalismo. A marca percebe quando alguém dedicou atenção real aos produtos dela!'
        }
      ],
      mission: {
        title: 'Missão: A Regra das 10 Mensagens',
        description: 'Coloque a prospecção em prática enviando suas primeiras abordagens.',
        steps: [
          'Selecionei 10 marcas de pequeno e médio porte no Instagram compatíveis com meu nicho',
          'Copiei o modelo de prospecção na aba Templates e personalizei com o nome de cada marca',
          'Enviei as 10 mensagens cordiais no Direct',
          'Anotei na minha lista as marcas contactadas para fazer o follow-up em 3 dias'
        ]
      }
    },

    // ==================== MÓDULO 8 ====================
    {
      id: 8,
      title: 'Preço, Proposta e Negociação',
      emoji: '💰',
      description: 'Como precificar, cobrar 50% de sinal e fechar contratos',
      xp: 190,
      badge: { emoji: '💰', name: 'Negociante Expert' },
      lessons: [
        {
          id: 'l8-1',
          title: 'Como montar sua tabela e direitos de uso',
          emoji: '🏷️',
          time: '5 min',
          xp: 45,
          content: `
<h3>O que você realmente vende: Criação + Licença de Uso</h3>
<p>O preço de um vídeo UGC é composto por duas partes:</p>
<ul>
<li><strong>1. Taxa de Produção:</strong> Seu tempo de roteirizar, gravar, editar e tratar o vídeo.</li>
<li><strong>2. Direitos de Uso (Licença):</strong> A permissão para a marca colocar dinheiro para veicular sua imagem em anúncios pelo prazo de 30, 90 ou 180 dias.</li>
</ul>
<div class="highlight-box"><p>💡 <strong>Pacotes inteligentes vendem mais:</strong> Em vez de vender 1 vídeo avulso por R$ 250, ofereça o Pacote de 3 Vídeos por R$ 600 (R$ 200 cada). A marca economiza e você garante um faturamento maior!</p></div>`
        },
        {
          id: 'l8-2',
          title: 'A Regra Sagrada: 50% de sinal e contrato simples',
          emoji: '🛡️',
          time: '5 min',
          xp: 45,
          content: `
<h3>Proteja seu trabalho desde o primeiro dia:</h3>
<ul>
<li><strong>Regra do Sinal:</strong> Nunca comece a gravar sem que a marca pague 50% adiantado via Pix. Os outros 50% são pagos na entrega do vídeo com marca d'água para aprovação final.</li>
<li><strong>Contrato Simples:</strong> Use o modelo de 1 página disponível na aba Templates. Ele define claramente o número de revisões (máximo 1 ou 2) e o prazo de entrega.</li>
<li><strong>Como recusar permuta gratuita com classe:</strong> <em>"Agradeço muito o carinho e os produtos, mas trabalho exclusivamente com prestação de serviço profissional. Posso aceitar o envio do produto como complemento, mantendo o valor do trabalho."</em></li>
</ul>`
        }
      ],
      quiz: [
        {
          q: 'Qual é a regra mais segura para iniciar a produção de um vídeo para uma marca?',
          options: [
            'Gravar tudo, enviar os arquivos originais e torcer para pagarem daqui a 6 meses',
            'Exigir 50% de sinal antes da gravação e os 50% restantes na entrega final',
            'Aceitar receber apenas um batom como pagamento de 4 dias de gravação',
            'Trabalhar sem nenhum tipo de acordo registrado'
          ],
          correct: 1,
          explanation: 'O sinal de 50% é a prática padrão de serviços no mercado criativo. Garante o compromisso da marca e valoriza seu tempo e dedicação!'
        }
      ],
      mission: {
        title: 'Missão: Simulação de Preço e Treino no Roleplay',
        description: 'Defina seus valores e treine suas respostas com nossa IA de negociação.',
        steps: [
          'Usei o Simulador de Preços nas Ferramentas e calculei meu valor para 1 e 3 vídeos',
          'Gerei uma proposta formal de exemplo com o Gerador de Propostas',
          'Entrei no Roleplay de Negociação e respondi aos cenários de pedido de desconto e permuta',
          'Senti segurança na minha postura firme e educada'
        ]
      }
    },

    // ==================== MÓDULO 9 ====================
    {
      id: 9,
      title: 'Entrega Profissional e Recorrência',
      emoji: '⭐',
      description: 'Como encantar clientes e transformar 1 vídeo em contrato mensal',
      xp: 200,
      badge: { emoji: '⭐', name: 'Entrega de Ouro' },
      lessons: [
        {
          id: 'l9-1',
          title: 'O protocolo de entrega via Google Drive',
          emoji: '📦',
          time: '4 min',
          xp: 50,
          content: `
<h3>A experiência que faz a marca te chamar de novo:</h3>
<p>Quando a marca recebe os arquivos jogados pelo WhatsApp, os vídeos perdem resolução e parecem amadores. Faça como uma profissional:</p>
<ol>
<li>Crie uma pasta no Google Drive com o nome: <code>[Nome da Marca] - Conteúdos UGC - [Seu Nome]</code></li>
<li>Dentro, coloque: o vídeo finalizado em alta resolução, as variações de gancho (se houver) e o arquivo de texto com o roteiro e sugestão de legenda para o anúncio.</li>
<li>Envie uma mensagem calorosa avisando da entrega e abrindo o prazo de 48h para eventuais ajustes simples.</li>
</ol>`
        },
        {
          id: 'l9-2',
          title: 'Transformando clientes pontuais em renda mensal garantida',
          emoji: '🔄',
          time: '5 min',
          xp: 50,
          content: `
<h3>O segredo da estabilidade financeira no UGC:</h3>
<p>Prospectar todo mês cansa. O segredo das criadoras que faturam R$ 3.000 a R$ 5.000 é ter <strong>clientes mensais fixos</strong>.</p>
<p>Após a marca aprovar o primeiro vídeo e constatar que ele performou bem nos anúncios, você faz a proposta de continuidade:</p>
<div class="highlight-box"><p><em>"Olá, [Nome do cliente]! Fiquei muito feliz que o vídeo deu super certo nos anúncios. Para manter suas campanhas sempre com novidades e público engajado, que tal fecharmos um pacote fixo de 4 vídeos por mês com valor promocional e entrega quinzenal?"</em></p></div>
<p>Com apenas 3 clientes de 4 vídeos por mês a R$ 800 cada, você tem <strong>R$ 2.400 fixos todo mês</strong> sem precisar caçar clientes novos todos os dias!</p>`
        }
      ],
      quiz: [
        {
          q: 'Qual é a maior vantagem de fechar pacotes mensais recorrentes com as marcas?',
          options: [
            'Ter previsibilidade de renda e estabilidade sem precisar prospectar clientes novos o tempo todo',
            'Trabalhar 24 horas por dia sem descanso',
            'Poder entregar vídeos sem edição',
            'Não precisar mais conversar com ninguém'
          ],
          correct: 0,
          explanation: 'A recorrência mensal é a chave da tranquilidade na carreira de criadora. Poucos clientes fiéis garantem sua renda mensal de forma organizada!'
        }
      ],
      mission: {
        title: 'Missão: Seu Checklist de Entrega de Ouro',
        description: 'Organize seu modelo de entrega e mensagem pós-venda.',
        steps: [
          'Criei uma pasta modelo no meu Google Drive para entregas',
          'Copiei a mensagem de pós-venda para meu arquivo de modelos',
          'Defini minha meta de conseguir 2 contratos mensais recorrentes nos próximos meses'
        ]
      }
    },

    // ==================== MÓDULO 10 ====================
    {
      id: 10,
      title: 'Parte Legal, Financeira e Escala',
      emoji: '👑',
      description: 'Formalização MEI, emissão de nota fiscal e plano de 30 dias',
      xp: 220,
      badge: { emoji: '👑', name: 'Primeira Cliente' },
      lessons: [
        {
          id: 'l10-1',
          title: 'MEI, emissão de Nota Fiscal e conta PJ sem complicação',
          emoji: '🧾',
          time: '5 min',
          xp: 50,
          content: `
<h3>Profissionalismo que abre portas em empresas grandes</h3>
<p>Muitas marcas médias e agências só podem contratar quem emite Nota Fiscal de Serviços. Formalizar é muito simples no Brasil:</p>
<ul>
<li><strong>Abertura de MEI gratuita:</strong> Pelo Portal do Empreendedor oficial do governo. Você pode usar atividades de <em>Promotora de Vendas</em> ou <em>Edição e Criação de Conteúdo</em>.</li>
<li><strong>Custo mensal fixo:</strong> Cerca de R$ 75 por mês (o DAS do MEI), que já inclui sua contribuição para aposentadoria pelo INSS.</li>
<li><strong>Emissão de Nota Eletrônica:</strong> Gratuita através do portal nacional do governo ou da prefeitura da sua cidade.</li>
<li><strong>Conta Bancária PJ Gratuita:</strong> Bancos digitais (como Nubank, Inter ou C6) abrem conta PJ em minutos para você separar o dinheiro do trabalho das contas da casa.</li>
</ul>`
        },
        {
          id: 'l10-2',
          title: 'Seu Plano Prático de 30 Dias para o Primeiro Cliente',
          emoji: '🚀',
          time: '5 min',
          xp: 50,
          content: `
<h3>O roteiro do seu primeiro mês de sucesso:</h3>
<ul>
<li><strong>Semana 1:</strong> Concluir as aulas, definir seus 2 nichos e escrever sua frase de posicionamento.</li>
<li><strong>Semana 2:</strong> Gravar e editar seus 3 a 5 vídeos de portfólio usando produtos da sua casa. Montar sua página de portfólio.</li>
<li><strong>Semana 3:</strong> Prospectar 10 marcas por dia (50 marcas na semana). Fazer follow-up cordial em 3 dias.</li>
<li><strong>Semana 4:</strong> Apresentar propostas, fechar seu primeiro contrato com sinal de 50%, gravar, entregar com maestria e pedir indicação!</li>
</ul>
<div class="highlight-box"><p>🎓 <strong>Parabéns por chegar até aqui!</strong> Você tem todas as ferramentas, conhecimentos e modelos na palma da sua mão. Agora dê o primeiro passo com coragem!</p></div>`
        }
      ],
      quiz: [
        {
          q: 'Por que abrir um MEI e ter capacidade de emitir Nota Fiscal ajuda nos seus ganhos como UGC?',
          options: [
            'Porque permite negociar com marcas maiores e agências corporativas que só pagam via NF',
            'Porque é a única forma de acessar a internet',
            'Porque impede que você grave vídeos em casa',
            'Não traz nenhum benefício prático'
          ],
          correct: 0,
          explanation: 'Empresas consolidadas têm departamentos financeiros formais que exigem emissão de nota. O MEI te qualifica para os melhores orçamentos!'
        }
      ],
      mission: {
        title: 'Missão Final: Seu Compromisso de 30 Dias',
        description: 'Celebre sua formação e ative seu certificado oficial!',
        steps: [
          'Revisei todos os módulos e completei meus quizzes',
          'Tenho meu portfólio com meus dados e amostras configurados',
          'Tenho minha lista de prospecção da Semana 1 pronta para início',
          'Assinei mentalmente meu compromisso de não desistir diante dos primeiros nãos'
        ]
      }
    }
  ],

  // Default portfolio showcase templates for Juliana
  portfolioTemplates: [
    {
      id: 'vid1',
      title: 'Review Sincero de Hidratante Facial',
      niche: 'Beleza & Cuidados',
      format: 'Depoimento / Review',
      duration: '38s',
      hook: '"Nunca imaginei que um produto de farmácia ia salvar minha pele madura..."',
      description: 'Depoimento autêntico com luz natural de janela, demonstrando aplicação suave e pele iluminada sem filtros.',
      tags: ['Depoimento', 'Beleza 40+', 'Luz Natural'],
      metrics: 'Alta Conversão em Meta Ads',
      sampleScript: `[Câmera próxima com luz natural]
"Nunca imaginei que um hidratante de farmácia fosse fazer isso com a minha pele depois dos 40!
Eu sentia meu rosto repuxando e com linhas marcadas logo depois da maquiagem.
Comecei a usar esse sérum faz duas semanas [mostra aplicando suavemente].
Olha o viço e a maciez! Não fica pegajoso.
Se você quer cuidar da sua pele sem gastar fortuna, clica no botão aqui embaixo!"`
    },
    {
      id: 'vid2',
      title: 'Unboxing Envolvente de Organizador de Cozinha',
      niche: 'Casa & Organização',
      format: 'Unboxing Dinâmico',
      duration: '42s',
      hook: '"Minha bancada da pia era um caos total até essa encomenda chegar..."',
      description: 'Abertura de pacote com foco nos detalhes, montagem rápida e resultado surpreendente do armário antes e depois.',
      tags: ['Unboxing', 'Casa & Lar', 'Antes & Depois'],
      metrics: 'Engajamento no TikTok & Reels',
      sampleScript: `[Mostra a caixa chegando na porta]
"Chegou meu pedido e eu precisava abrir com vocês!
Olha o capricho dessa embalagem. Veio super bem protegido.
Ele vem com divisórias ajustáveis em acrílico resistente [mostra encaixando].
Olha como estava minha gaveta antes... e olha agora! Tudo no lugar.
O link com cupom tá na minha bio!"`
    },
    {
      id: 'vid3',
      title: 'Problema e Solução: Escova Tira-Pelos Pet',
      niche: 'Mundo Pet',
      format: 'Problema → Solução',
      duration: '34s',
      hook: '"Se seu sofá vive coberto de pelos do seu cachorro, você precisa ver isso aqui."',
      description: 'Demonstração rápida da remoção de pelos no sofá e o pet relaxando com carinho. Conexão emocional imediata.',
      tags: ['Pets', 'Problema/Solução', 'Alívio Imediato'],
      metrics: 'Viralidade em Anúncios',
      sampleScript: `[Passa a mão no sofá cheio de pelos]
"Quem tem cachorro em casa sabe o desespero que é receber visita com o sofá assim.
Já tentei fita adesiva, aspirador pesado, nada resolvia rápido.
Aí testei esse removedor com autolimpeza [demonstra passando uma vez só].
Gente, olha isso! Saiu tudo em 5 segundos sem esforço.
Vale cada centavo, corre no link!"`
    },
    {
      id: 'vid4',
      title: 'Tutorial Prático de Aplicativo Financeiro',
      niche: 'Apps & Tecnologia',
      format: 'Mini-Tutorial',
      duration: '48s',
      hook: '"Eu achava que controlar gastos no celular era complicado até conhecer esse app..."',
      description: 'Gravação da tela do celular com narração calorosa da Juliana, mostrando como é simples anotar despesas da semana.',
      tags: ['Apps', 'Tutorial', 'Fácil de Usar'],
      metrics: 'Retenção e Download de Apps',
      sampleScript: `[Juliana com o celular na mão com sorriso simpático]
"Sempre achei que aplicativo de finanças era cheio de termos difíceis.
Mas olha como esse aqui é simples: você abre, clica no mais e fala quanto gastou no mercado [mostra a tela].
Ele separa tudo em categorias coloridas automaticamente!
Agora não levo mais susto no fim do mês.
Baixa grátis no link aqui embaixo!"`
    },
    {
      id: 'vid5',
      title: '3 Motivos para Usar o Suplemento de Colágeno',
      niche: 'Saúde & Bem-Estar',
      format: '3 Motivos / Lista Rápida',
      duration: '40s',
      hook: '"3 coisas que mudaram na minha disposição depois que adotei esse hábito matinal..."',
      description: 'Preparando a bebida na caneca pela manhã, destacando sabor agradável, unhas mais fortes e facilidade na rotina.',
      tags: ['Bem-Estar', '3 Motivos', 'Rotina Matinal'],
      metrics: 'Autoridade e Confiança',
      sampleScript: `[Cozinha arrumada pela manhã, mexendo a xícara]
"3 motivos pelos quais eu não fico mais sem esse colágeno na minha manhã:
1º: O sabor é uma delícia, dissolve rápido e não tem gosto residual.
2º: Minhas unhas pararam de quebrar à toa em menos de um mês.
3º: É super prático para levar na bolsa quando viajo.
Aproveita que eles estão com frete grátis no site hoje!"`
    }
  ],

  hooks: [
    { category: 'Curiosidade', items: [
      'O que esse produto fez na minha rotina em 7 dias me surpreendeu...',
      'Nunca imaginei que ia recomendar isso na internet, mas...',
      'Minha amiga me mandou isso e eu não vivo mais sem...',
      'Esse foi o produto que mais me arrependi de ter demorado tanto pra comprar',
      'Testei por 15 dias. O resultado foi o que me convenceu de vez.',
      'Preciso te contar uma coisa sobre esse produto que ninguém fala...',
      'Se você tem esse problema todo dia, para tudo e vê esse vídeo!'
    ]},
    { category: 'Identificação com Dor', items: [
      'Se você sofre com pele ressecada e repuxando como eu sofria, isso é pra você',
      'Pra quem ama casa limpa mas não tem tempo de ficar esfregando...',
      'Você já acordou de manhã sem disposição nenhuma? Eu era assim todo dia...',
      'Fazia meses que eu procurava uma solução prática e finalmente achei...',
      'Já gastei muito dinheiro com soluções que não funcionavam até achar isso.'
    ]},
    { category: 'Resultado em Destaque', items: [
      'Olha o resultado depois de apenas 1 semana de uso contínuo:',
      'Antes e depois real: sem filtro de rede social, luz do dia pura!',
      'Esse é meu resultado depois de 21 dias usando todas as manhãs:',
      'Não acreditei quando vi a diferença no espelho!',
      'Resultado honesto de quem comprou achando que não ia funcionar:'
    ]},
    { category: 'Inversão / Negação', items: [
      'Não compre hidratante caro antes de ver esse teste sincero',
      'Para de jogar dinheiro fora em produtos que só prometem e não entregam!',
      'Eu era super desconfiada de anúncios online... até testar esse aqui.',
      'Todo mundo acha que precisa gastar rios de dinheiro, mas a verdade é outra.',
      'O maior erro que cometi na minha rotina foi não ter conhecido isso antes.'
    ]},
    { category: 'Urgência / Descoberta', items: [
      'Acabei de descobrir isso e precisei vir correndo contar pra vocês!',
      'Achei esse achadinho por acaso e virou meu favorito do mês.',
      'Minha dermatologista me indicou e agora eu entendi o motivo do sucesso!',
      'Estava procurando algo bom e acessível e achei a melhor opção da internet.'
    ]},
    { category: 'Pergunta Direta', items: [
      'Você também fica perdida na hora de organizar a gaveta da cozinha?',
      'Qual é o maior desafio que você enfrenta na sua rotina de cuidados?',
      'Já calculou quanto dinheiro já perdeu com produtos que ficaram encostados?',
      'Você usaria um produto que resolvesse esse incômodo em 5 minutos?'
    ]}
  ],

  templates: [
    {
      title: 'Mensagem de Prospecção – Direct do Instagram',
      body: `Oi, equipe da [Nome da Marca]! Tudo bem com vocês? 😊

Me chamo Juliana, sou criadora de UGC especializada no nicho de [Seu Nicho].

Acompanho o trabalho de vocês e sou apaixonada pelos produtos da marca, especialmente o [Nome do Produto Específico]! ✨

Crio vídeos autênticos e humanizados com o celular (depoimentos, reviews e unboxings) pensados exatamente para performar nos anúncios do Instagram e TikTok, gerando muito mais confiança e vendas.

Preparei um portfólio curtinho com alguns exemplos do meu estilo de vídeo. Posso enviar o link para vocês darem uma olhada sem compromisso?

Um abraço carinhoso,
[Seu Nome] | UGC Creator`
    },
    {
      title: 'Mensagem de Prospecção – WhatsApp Comercial',
      body: `Olá, [Nome do Contato ou Equipe da Marca]! Tudo bem? 😊

Me chamo [Seu Nome], sou criadora de conteúdo UGC (User Generated Content).

Encontrei a loja de vocês e adorei a proposta dos produtos! Sei o quanto anúncios em vídeo com pessoas reais convertem mais hoje em dia.

Produzo vídeos curtos verticais (formato Reels/TikTok) com foco em gerar identificação imediata e conversão de vendas.

Gostaria de apresentar meu portfólio rápido com exemplos práticos. Posso te enviar por aqui?

Obrigada pelo tempo e muito sucesso! 💜`
    },
    {
      title: 'Mensagem de Follow-up (3 dias sem resposta)',
      body: `Oi, [Nome da Marca]! Tudo bem por aí? 👋

Passei rapidinho só para confirmar se minha mensagem anterior chegou até vocês.

Sei como a rotina de quem cuida de uma marca é corrida! Fiquem super à vontade.

Se em algum momento vocês tiverem interesse em testar novos vídeos e formatos nos anúncios de vocês, estou à disposição para colaborar! ✨

Tenham uma ótima semana!
[Seu Nome]`
    },
    {
      title: 'Proposta Comercial Simplificada (1 Página)',
      body: `PROPOSTA COMERCIAL DE UGC – [SEU NOME]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Para: [Nome da Marca]
Data: [Data de Hoje]

📹 O QUE ESTÁ INCLUSO:
• 3 Vídeos em formato vertical 9:16 (1080p)
• Formatos: 1 Depoimento + 1 Review com aplicação + 1 Demonstração prática
• Duração média: 30 a 45 segundos cada
• 2 Variações extras de gancho inicial para testes de anúncio
• Edição completa com cortes dinâmicos e legendas automáticas
• 1 Rodada de revisão simples inclusa

📱 DIREITOS DE USO:
• Licença para veiculação em anúncios pagos (Meta Ads / TikTok Ads)
• Prazo: 90 dias a partir da aprovação

💰 INVESTIMENTO:
• Valor do pacote: R$ 600,00 (R$ 200 por vídeo)
• Condição de pagamento: 50% de sinal no aceite (R$ 300) e 50% na aprovação final

📦 PRAZO DE ENTREGA:
• Em até 5 dias úteis após o recebimento do produto e briefing alinhado.

Fico à disposição para começarmos a criar! 💜
[Seu Nome] | [Seu Telefone / WhatsApp]`
    },
    {
      title: 'Contrato Simples de Prestação de Serviços UGC',
      body: `CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE CRIAÇÃO UGC

CONTRATADA: [Seu Nome Completo], Criadora de Conteúdo, CPF nº [Seu CPF].
CONTRATANTE: [Nome da Empresa / Razão Social], CNPJ nº [CNPJ da Marca].

1. OBJETO
A CONTRATADA compromete-se a produzir [Quantidade] vídeo(s) no formato vertical 9:16, conforme o briefing e produtos fornecidos pela CONTRATANTE.

2. ENTREGA E REVISÕES
A entrega dos arquivos finais ocorrerá via Google Drive em até [X] dias úteis após o recebimento dos produtos. Está inclusa até 1 (uma) rodada de revisões pontuais.

3. PAGAMENTO
O valor total deste serviço é de R$ [Valor], sendo 50% pago no ato da assinatura deste instrumento a título de sinal e 50% na entrega final dos materiais.

4. DIREITOS DE IMAGEM E VEICULAÇÃO
A CONTRATADA autoriza a veiculação de sua imagem e voz exclusivamente para anúncios digitais da CONTRATANTE pelo prazo determinado de [X] meses nos canais acordados.

5. FORO
As partes elegem o foro da comarca da CONTRATADA para dirimir quaisquer dúvidas decorrentes deste contrato.

[Localidade], [Data de Hoje].

_______________________________            _______________________________
CONTRATADA: [Seu Nome]                    CONTRATANTE: [Nome da Marca]`
    }
  ],

  badges: [
    { id: 'b0', emoji: '🌱', name: 'Primeira Semente', desc: 'Completou o Módulo 0', module: 0 },
    { id: 'b1', emoji: '🔍', name: 'Detetive do Mercado', desc: 'Completou o Módulo 1', module: 1 },
    { id: 'b2', emoji: '🎯', name: 'Nicho Certeiro', desc: 'Completou o Módulo 2', module: 2 },
    { id: 'b3', emoji: '🎥', name: 'Set Pronto', desc: 'Completou o Módulo 3', module: 3 },
    { id: 'b4', emoji: '⚡', name: 'Roteirista Poderosa', desc: 'Completou o Módulo 4', module: 4 },
    { id: 'b5', emoji: '🎬', name: 'Diretora de Si Mesma', desc: 'Completou o Módulo 5', module: 5 },
    { id: 'b6', emoji: '💼', name: 'Portfólio Montado', desc: 'Completou o Módulo 6', module: 6 },
    { id: 'b7', emoji: '📨', name: 'Prospectora Corajosa', desc: 'Completou o Módulo 7', module: 7 },
    { id: 'b8', emoji: '💰', name: 'Negociante Expert', desc: 'Completou o Módulo 8', module: 8 },
    { id: 'b9', emoji: '⭐', name: 'Entrega de Ouro', desc: 'Completou o Módulo 9', module: 9 },
    { id: 'b10', emoji: '👑', name: 'Primeira Cliente', desc: 'Completou o Módulo 10', module: 10 },
    { id: 'bquiz', emoji: '🧠', name: 'Rainha do Quiz', desc: 'Acertou todos os quizzes', module: null },
    { id: 'bport', emoji: '🌟', name: 'Criadora com Portfólio', desc: 'Portfólio configurado e ativo', module: null }
  ]
};

const fileContent = 'const COURSE_DATA = ' + JSON.stringify(COURSE_DATA, null, 2) + ';\n';
fs.writeFileSync('C:\\Users\\Gamer\\.gemini\\antigravity\\scratch\\ugc-course\\js\\data.js', fileContent, 'utf8');
console.log('Successfully wrote complete data.js with all 11 modules and portfolio templates!');
