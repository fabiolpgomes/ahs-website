const fs = require('fs');

const site = 'https://algarvehomestay.pt';
const today = '2026-07-16';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function jsonLd(data) {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function page({ file, title, description, heroLabel, h1, intro, sections, cta = true, schema }) {
  const url = `${site}/${file}`;
  const bodySections = sections
    .map((section) => `
<section style="padding:64px 20px;background:${section.dark ? '#10203E' : '#F7F5EF'};">
  <div style="max-width:1040px;margin:0 auto;">
    <h2 style="font-family:'Cormorant Garamond',serif;font-size:34px;line-height:1.15;color:${section.dark ? '#FBFAF6' : '#10203E'};margin:0 0 20px;">${escapeHtml(section.title)}</h2>
    ${section.body
      .map((paragraph) => `<p style="font-size:16px;line-height:1.75;color:${section.dark ? '#D7D3C8' : '#4D5566'};margin:0 0 18px;">${paragraph}</p>`)
      .join('\n')}
    ${section.items ? `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;margin-top:28px;">${section.items.map((item) => {
      const content = `<strong style="display:block;color:${section.dark ? '#FBFAF6' : '#10203E'};margin-bottom:8px;">${escapeHtml(item.title)}</strong><span style="font-size:14px;line-height:1.65;color:${section.dark ? '#B9BDC9' : '#4D5566'};">${escapeHtml(item.text)}</span>`;
      if (item.href) return `<a href="${item.href}" style="display:block;background:${section.dark ? '#0C1830' : '#FBFAF6'};border-top:3px solid #C9A227;padding:22px;text-decoration:none;">${content}</a>`;
      return `<div style="background:${section.dark ? '#0C1830' : '#FBFAF6'};border-top:3px solid #C9A227;padding:22px;">${content}</div>`;
    }).join('')}</div>` : ''}
  </div>
</section>`)
    .join('\n');

  fs.writeFileSync(file, `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${url}">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:site_name" content="AHS Algarve Home Stay">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site}/assets/hero-praia.jpg">
<meta property="og:locale" content="pt_PT">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<meta name="twitter:image" content="${site}/assets/hero-praia.jpg">
${jsonLd(schema)}
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet><title>${escapeHtml(title)}</title></helmet>
<div style="font-family:'Manrope',sans-serif;background:#F7F5EF;color:#1B2430;">
<dc-import name="Nav" active="exploracao" hint-size="100%,80px"></dc-import>
<section style="padding:92px 20px;background:linear-gradient(180deg, rgba(16,32,62,0.64), rgba(12,24,48,0.9)), url('assets/hero-praia.jpg') center/cover no-repeat;">
  <div style="max-width:1040px;margin:0 auto;">
    <div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#C9A227;margin-bottom:16px;">${escapeHtml(heroLabel)}</div>
    <h1 style="font-family:'Cormorant Garamond',serif;font-size:clamp(36px,5vw,58px);font-weight:600;line-height:1.08;color:#FBFAF6;margin:0 0 22px;">${escapeHtml(h1)}</h1>
    <p style="font-size:18px;line-height:1.65;color:#E4E1D8;max-width:760px;margin:0;">${escapeHtml(intro)}</p>
  </div>
</section>
${bodySections}
${cta ? `<section style="padding:72px 20px;background:#10203E;text-align:center;">
  <h2 style="font-family:'Cormorant Garamond',serif;font-size:34px;color:#FBFAF6;margin:0 0 18px;">Quer aplicar isto ao seu imóvel?</h2>
  <p style="font-size:16px;color:#D7D3C8;max-width:680px;margin:0 auto 30px;line-height:1.7;">A AHS pode analisar potencial, operação, riscos e próximos passos antes de qualquer decisão.</p>
  <a href="contacto.html" style="display:inline-block;background:#C9A227;color:#10203E;font-weight:700;text-decoration:none;padding:15px 30px;">Pedir análise do imóvel</a>
</section>` : ''}
<dc-import name="Footer" hint-size="100%,400px"></dc-import>
</div>
</x-dc>
</body>
</html>
`);
}

function articleSchema(file, title, description) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${site}/${file}#article`,
        headline: title,
        description,
        author: { '@id': `${site}/#organization` },
        publisher: { '@id': `${site}/#organization` },
        mainEntityOfPage: `${site}/${file}`,
        inLanguage: 'pt-PT',
        datePublished: today,
        dateModified: today,
      },
      breadcrumb(file, title),
    ],
  };
}

function webpageSchema(file, type, title, description) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': type,
        '@id': `${site}/${file}#webpage`,
        name: title,
        description,
        url: `${site}/${file}`,
        inLanguage: 'pt-PT',
        isPartOf: { '@id': `${site}/#website` },
        publisher: { '@id': `${site}/#organization` },
      },
      breadcrumb(file, title),
    ],
  };
}

function breadcrumb(file, title) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${site}/${file}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'AHS Algarve Home Stay', item: `${site}/` },
      { '@type': 'ListItem', position: 2, name: title, item: `${site}/${file}` },
    ],
  };
}

const articles = [
  {
    file: 'como-aumentar-ocupacao-airbnb.html',
    title: 'Como aumentar a ocupação no Airbnb | AHS',
    description: 'Guia prático para melhorar ocupação no Airbnb através de posicionamento, preço, fotografia, calendário e experiência do hóspede.',
    heroLabel: 'Pilar Exploração · Ocupação',
    h1: 'Como aumentar a ocupação no Airbnb sem destruir a rentabilidade.',
    intro: 'Ocupação alta só é boa quando vem acompanhada de preço saudável, hóspedes adequados e custos controlados.',
    sections: [
      { title: 'O erro comum', body: ['Muitos proprietários tentam aumentar ocupação baixando preço. Isso pode funcionar no curto prazo, mas também pode atrair reservas menos alinhadas, reduzir margem e pressionar limpeza, manutenção e desgaste do imóvel.'] },
      { title: 'O que realmente move ocupação', body: ['A ocupação melhora quando o imóvel aparece para o hóspede certo, com fotografias claras, calendário coerente, preço competitivo por época e resposta rápida. A decisão raramente depende de um único fator.'], items: [{ title: 'Fotografia', text: 'Mostra luz, escala, camas, cozinha, casas de banho e zona envolvente.' }, { title: 'Preço', text: 'Deve reagir a época, eventos, antecedência e procura.' }, { title: 'Reputação', text: 'Avaliações consistentes reduzem fricção na decisão.' }] },
      { title: 'Como a AHS aborda o tema', body: ['A AHS olha para ocupação, ADR, RevPAR, custos e manutenção em conjunto. O objetivo não é encher calendário a qualquer preço; é aumentar rendimento líquido e preservar o ativo.'] },
    ],
  },
  {
    file: 'como-funciona-gestao-alojamento-local.html',
    title: 'Como funciona a gestão de alojamento local | AHS',
    description: 'Explicação completa do funcionamento da gestão de alojamento local, desde avaliação do imóvel até reservas, limpeza e relatórios.',
    heroLabel: 'Pilar Exploração · Gestão',
    h1: 'Como funciona a gestão de alojamento local no Algarve.',
    intro: 'A gestão de alojamento local combina estratégia comercial, operação diária, manutenção e leitura financeira.',
    sections: [
      { title: 'Da avaliação à operação', body: ['Antes de publicar um imóvel, é preciso avaliar localização, tipologia, estado, equipamento, concorrência e custos. Só depois faz sentido definir preço, calendário, regras de estadia e canais.'] },
      { title: 'O que uma gestão completa acompanha', body: ['Uma operação madura acompanha anúncios, mensagens, reservas, check-in, limpeza, lavandaria, manutenção, avaliações e relatórios. Quando uma destas peças falha, a rentabilidade sofre.'], items: [{ title: 'Comercial', text: 'Posicionamento, canais, preços e calendário.' }, { title: 'Operacional', text: 'Hóspedes, acessos, limpeza, lavandaria e manutenção.' }, { title: 'Patrimonial', text: 'Custos, melhorias, risco e rendimento líquido.' }] },
      { title: 'Gestão à distância', body: ['Proprietários que vivem fora do Algarve precisam de processos, comunicação e evidência. Relatórios e rotinas claras reduzem a sensação de perda de controlo.'] },
    ],
  },
  {
    file: 'quanto-custa-gerir-airbnb.html',
    title: 'Quanto custa gerir um Airbnb no Algarve | AHS',
    description: 'Guia sobre custos de gestão de Airbnb, comissões, limpeza, manutenção, lavandaria e fatores que afetam a rentabilidade.',
    heroLabel: 'Pilar Exploração · Custos',
    h1: 'Quanto custa gerir um Airbnb no Algarve?',
    intro: 'O custo real de gestão depende do imóvel, nível de serviço, volume de reservas, limpeza, manutenção e responsabilidades assumidas.',
    sections: [
      { title: 'Comissão não é o único custo', body: ['Ao comparar propostas, o proprietário deve olhar para comissão, limpeza, lavandaria, consumíveis, manutenção, fotografia, canais, impostos, seguros e tempo de resposta. Uma comissão baixa pode sair cara se a operação for fraca.'] },
      { title: 'Perguntas para comparar propostas', body: ['Quem responde aos hóspedes? Quem coordena limpezas? Quem acompanha manutenção? Quem faz pricing? Há relatórios? O proprietário recebe dados ou apenas transferências?'] },
      { title: 'O ponto central', body: ['A melhor pergunta não é apenas quanto custa gerir, mas quanto rendimento líquido fica depois de todos os custos e que risco operacional o proprietário deixa de assumir.'] },
    ],
  },
  {
    file: 'alojamento-local-portugal.html',
    title: 'Alojamento Local em Portugal | Guia AHS',
    description: 'Guia orientativo sobre alojamento local em Portugal, responsabilidades do proprietário e pontos a confirmar antes de explorar um imóvel.',
    heroLabel: 'Pilar Exploração · Alojamento Local',
    h1: 'Alojamento Local em Portugal: o que um proprietário deve perceber antes de avançar.',
    intro: 'Este guia é informativo e não substitui aconselhamento jurídico, fiscal ou contabilístico atualizado.',
    sections: [
      { title: 'Antes da exploração', body: ['O proprietário deve confirmar enquadramento legal, licenças aplicáveis, condomínio, seguros, obrigações fiscais, regras municipais e adequação do imóvel. Estes temas podem mudar e devem ser confirmados com profissionais competentes.'] },
      { title: 'A operação também conta', body: ['Mesmo quando o enquadramento está resolvido, o sucesso depende de apresentação, preço, comunicação, limpeza, manutenção e qualidade da experiência.'] },
      { title: 'Quando pedir ajuda', body: ['Se o proprietário vive longe, não conhece o mercado local ou não quer lidar com hóspedes e fornecedores, uma gestão profissional pode reduzir risco e melhorar consistência.'] },
    ],
  },
  {
    file: 'booking-vs-airbnb.html',
    title: 'Booking vs Airbnb para alojamento local | AHS',
    description: 'Comparação prática entre Booking e Airbnb para proprietários de alojamento local no Algarve.',
    heroLabel: 'Pilar Exploração · Canais',
    h1: 'Booking vs Airbnb: qual canal faz mais sentido para o seu imóvel?',
    intro: 'A resposta depende do imóvel, perfil do hóspede, época, localização, preço e capacidade operacional.',
    sections: [
      { title: 'Airbnb', body: ['Airbnb tende a favorecer narrativa, experiência, estadias com maior contexto e comunicação direta. Pode funcionar muito bem para imóveis com personalidade, boa fotografia e regras claras.'] },
      { title: 'Booking', body: ['Booking pode gerar procura forte em mercados turísticos e reservas com comportamento mais hoteleiro. Exige atenção a políticas, disponibilidade, pagamentos e velocidade operacional.'] },
      { title: 'Estratégia multicanal', body: ['Muitos imóveis beneficiam de mais de um canal, desde que o calendário esteja controlado e a operação consiga responder. O risco é vender mais do que se consegue entregar.'] },
    ],
  },
  {
    file: 'aumentar-adr-revpar.html',
    title: 'Como aumentar ADR e RevPAR no alojamento local | AHS',
    description: 'Explicação simples de ADR, RevPAR e como melhorar rendimento sem olhar apenas para ocupação.',
    heroLabel: 'Pilar Exploração · Receita',
    h1: 'Como aumentar ADR e RevPAR no alojamento local.',
    intro: 'ADR e RevPAR ajudam a perceber qualidade de receita, não apenas quantidade de reservas.',
    sections: [
      { title: 'O que é ADR', body: ['ADR é a diária média obtida. Ajuda a perceber quanto o imóvel cobra por noite vendida, mas não mostra sozinho se o calendário está bem usado.'] },
      { title: 'O que é RevPAR', body: ['RevPAR combina preço e ocupação. É útil porque mostra receita por noite disponível, ajudando a comparar períodos e decisões de pricing.'] },
      { title: 'Como melhorar', body: ['Melhorias de apresentação, fotografia, diferenciação, flexibilidade de estadias, pricing por época e gestão de reputação podem melhorar receita sem depender apenas de baixar preços.'] },
    ],
  },
  {
    file: 'declarar-rendimentos-alojamento-local.html',
    title: 'Como declarar rendimentos de alojamento local | Guia orientativo AHS',
    description: 'Guia orientativo sobre rendimentos de alojamento local e a importância de validação contabilística e fiscal atualizada.',
    heroLabel: 'Pilar Exploração · Fiscalidade',
    h1: 'Como declarar rendimentos de alojamento local: o que preparar antes de falar com o contabilista.',
    intro: 'A fiscalidade muda e depende do caso. Este conteúdo é orientativo e não substitui aconselhamento de contabilista certificado.',
    sections: [
      { title: 'Organização antes da declaração', body: ['O proprietário deve guardar extratos, faturas, comissões de plataformas, custos de limpeza, manutenção, seguros, consumíveis e relatórios de reservas. A qualidade da informação reduz erros e retrabalho.'] },
      { title: 'Questões a validar', body: ['Enquadramento fiscal, regime aplicável, despesas aceites, IVA quando aplicável, obrigações declarativas e impacto da residência fiscal devem ser confirmados com profissional qualificado.'] },
      { title: 'Como a gestão ajuda', body: ['Relatórios organizados e histórico de reservas facilitam a conversa com o contabilista e ajudam o proprietário a perceber rendimento bruto, custos e rendimento líquido.'] },
    ],
  },
  {
    file: 'preparar-imovel-para-alojamento-local.html',
    title: 'Como preparar um imóvel para alojamento local | AHS',
    description: 'Checklist estratégica para preparar um imóvel para alojamento local, desde conforto e fotografia até manutenção e operação.',
    heroLabel: 'Pilar Exploração · Preparação',
    h1: 'Como preparar um imóvel para alojamento local.',
    intro: 'Um imóvel preparado reduz problemas operacionais, melhora avaliações e aumenta a confiança do hóspede.',
    sections: [
      { title: 'Conforto e clareza', body: ['Camas, iluminação, climatização, internet, cozinha, arrumação e casas de banho têm impacto direto na experiência. O hóspede deve entender exatamente o que vai encontrar.'] },
      { title: 'Operação simples', body: ['Acessos, fechaduras, instruções, inventário, reposição de consumíveis e manutenção preventiva devem ser pensados antes da primeira reserva.'] },
      { title: 'Fotografia e anúncio', body: ['Fotografia não deve esconder problemas; deve mostrar o imóvel com precisão e valorizar aquilo que o torna competitivo no mercado local.'] },
    ],
  },
];

const faqQuestions = [];
const faqCategories = [
  ['Gestão e operação', ['Como funciona a gestão de alojamento local?', 'A empresa trata das reservas?', 'Quem responde aos hóspedes?', 'Quem faz check-in?', 'Quem acompanha check-out?', 'Como são resolvidos problemas durante a estadia?', 'A gestão funciona para proprietários que vivem fora?', 'O proprietário mantém controlo do calendário?', 'Como são comunicadas ocorrências?', 'Que relatórios devo receber?', 'A gestão inclui manutenção?', 'A gestão inclui lavandaria?', 'A gestão inclui limpeza?', 'Como se reduz risco operacional?', 'Como escolher uma empresa de gestão?', 'Qual a diferença entre exploração e gestão?', 'A gestão profissional substitui o proprietário?', 'O que acontece em época alta?', 'Como evitar overbooking?', 'Como proteger a reputação do imóvel?']],
  ['Custos e comissões', ['Quanto cobra uma empresa de gestão?', 'A comissão deve ser fixa ou variável?', 'Quem paga a limpeza?', 'Quem paga lavandaria?', 'Quem paga manutenção?', 'Quem paga consumíveis?', 'Existem custos de fotografia?', 'Como comparar propostas de gestão?', 'Uma comissão baixa é sempre melhor?', 'O que é rendimento líquido?', 'Que custos reduzem a rentabilidade?', 'Como controlar despesas?', 'O proprietário deve aprovar reparações?', 'Como prever custos anuais?', 'Há custos antes da primeira reserva?', 'Quanto custa preparar um imóvel?', 'O que deve estar no contrato?', 'Como evitar custos escondidos?', 'A gestão cobra sobre bruto ou líquido?', 'Como analisar retorno depois da comissão?']],
  ['Airbnb, Booking e canais', ['Airbnb é melhor que Booking?', 'Devo estar em vários canais?', 'Como evitar calendário duplicado?', 'O que melhora a posição no Airbnb?', 'O que melhora conversão no Booking?', 'Como escrever um bom anúncio?', 'Quantas fotografias são necessárias?', 'Como definir regras da casa?', 'Como gerir cancelamentos?', 'Como gerir estadias mínimas?', 'Como responder a mensagens?', 'Vale a pena aceitar reservas instantâneas?', 'Como lidar com hóspedes difíceis?', 'Como melhorar avaliações?', 'Como evitar más avaliações?', 'O que fazer após uma crítica?', 'Como destacar diferenciais?', 'Como gerir preços por canal?', 'O que é paridade de preços?', 'Como medir desempenho por canal?']],
  ['Pricing e receita', ['O que é preço dinâmico?', 'Como aumentar ADR?', 'Como aumentar RevPAR?', 'Ocupação alta é sempre boa?', 'Quando baixar preço?', 'Quando aumentar preço?', 'Como gerir época baixa?', 'Como gerir época alta?', 'Eventos locais afetam preço?', 'Antecedência afeta preço?', 'Estadias longas reduzem rendimento?', 'Como usar descontos sem perder margem?', 'Como comparar com concorrentes?', 'O que é diária média?', 'O que é receita por noite disponível?', 'Como medir rentabilidade real?', 'Como equilibrar preço e ocupação?', 'O que fazer com dias vazios?', 'Como gerir fins de semana?', 'Como rever pricing mensalmente?']],
  ['Preparação do imóvel', ['Como preparar um apartamento para Airbnb?', 'Que equipamentos são essenciais?', 'Internet rápida é importante?', 'Ar condicionado aumenta reservas?', 'Roupa de cama influencia avaliações?', 'Como preparar cozinha?', 'Que amenities fazem diferença?', 'Como evitar desgaste?', 'Quando remodelar?', 'Como saber se uma melhoria compensa?', 'Fotografia profissional vale a pena?', 'Como organizar inventário?', 'Como preparar manual da casa?', 'O que deve estar visível no anúncio?', 'Como tornar o imóvel familiar?', 'Como receber hóspedes remotos?', 'Como reduzir chamadas de suporte?', 'Como preparar para estadias longas?', 'Como lidar com ruído?', 'Como melhorar conforto percebido?']],
  ['Legal, fiscal e responsabilidade', ['O que é alojamento local?', 'Preciso confirmar regras municipais?', 'O condomínio pode ter impacto?', 'Que seguros devo avaliar?', 'Como declarar rendimentos?', 'Preciso de contabilista?', 'Que documentos devo guardar?', 'As regras fiscais mudam?', 'Quem emite faturas?', 'Como organizar despesas?', 'O que validar antes de publicar?', 'Posso gerir à distância?', 'Quem é responsável por danos?', 'Como lidar com cauções?', 'Como gerir identificação de hóspedes?', 'Que obrigações devo confirmar?', 'O que perguntar ao contabilista?', 'O que perguntar ao advogado?', 'O que guardar para auditoria?', 'Como reduzir risco de incumprimento?']],
  ['Mercado do Algarve', ['Vale a pena alojamento local no Algarve?', 'Portimão é bom para AL?', 'Albufeira é competitiva?', 'Lagos atrai que tipo de hóspede?', 'Vilamoura exige padrão premium?', 'Faro funciona para estadias urbanas?', 'Tavira tem procura sazonal?', 'Quarteira funciona para famílias?', 'Alvor é bom para estadias tranquilas?', 'Armação de Pêra tem procura familiar?', 'Como varia a procura por cidade?', 'Praia aumenta rentabilidade?', 'Centro histórico ajuda?', 'Proximidade ao aeroporto importa?', 'Condomínio com piscina ajuda?', 'Estacionamento influencia reservas?', 'Vista mar aumenta preço?', 'Como analisar concorrência local?', 'Quando abrir calendário?', 'Como adaptar estratégia por cidade?']],
  ['Hóspedes e experiência', ['Como criar boa experiência?', 'O que hóspedes mais valorizam?', 'Como reduzir reclamações?', 'Como comunicar antes da chegada?', 'Como explicar check-in?', 'Como lidar com atrasos?', 'Como preparar guia local?', 'Como gerir famílias?', 'Como gerir nómadas digitais?', 'Como gerir hóspedes internacionais?', 'Idiomas importam?', 'Como aumentar reservas repetidas?', 'Como pedir avaliação?', 'Como responder a avaliação?', 'Como lidar com danos?', 'Como definir regras claras?', 'Como evitar festas?', 'Como tornar a estadia simples?', 'Como surpreender sem gastar muito?', 'Como manter consistência?']],
  ['Manutenção e limpeza', ['Quem coordena limpeza?', 'Como controlar qualidade da limpeza?', 'Lavandaria própria ou externa?', 'Como gerir urgências?', 'Como fazer manutenção preventiva?', 'Que itens avariam mais?', 'Como reduzir desgaste?', 'Como planear inspeções?', 'O que fazer entre estadias?', 'Como gerir consumíveis?', 'Como evitar falhas de inventário?', 'Como preparar época alta?', 'Como gerir fornecedores?', 'Como controlar custos de reparação?', 'Como documentar problemas?', 'Quem aprova reparações?', 'Como gerir chaves?', 'Fechadura inteligente ajuda?', 'Como evitar atrasos de limpeza?', 'Como manter padrão de hotelaria?']],
  ['Decisão do proprietário', ['Vale a pena colocar apartamento no Airbnb?', 'Devo arrendar ao ano ou curta duração?', 'Como saber se meu imóvel serve para AL?', 'Quando não vale a pena?', 'Que perguntas fazer antes de avançar?', 'Como calcular retorno?', 'Quanto tempo demora começar?', 'Preciso investir antes?', 'Como escolher gestor?', 'Que dados pedir mensalmente?', 'Como comparar rendimento anual?', 'Como lidar com sazonalidade?', 'Como proteger o imóvel?', 'Como sair de uma gestão ruim?', 'Posso testar por uma época?', 'Quando mudar estratégia?', 'Como reinvestir no imóvel?', 'Como vender um imóvel com histórico de AL?', 'Como pensar como investidor?', 'Qual o próximo passo?']],
];

function answerFor(category, question) {
  const prefix = {
    'Gestão e operação': 'Na operação diária,',
    'Custos e comissões': 'Na análise de custos,',
    'Airbnb, Booking e canais': 'Na distribuição por canais,',
    'Pricing e receita': 'Na gestão de receita,',
    'Preparação do imóvel': 'Na preparação do imóvel,',
    'Legal, fiscal e responsabilidade': 'Em temas legais ou fiscais,',
    'Mercado do Algarve': 'No mercado do Algarve,',
    'Hóspedes e experiência': 'Na experiência do hóspede,',
    'Manutenção e limpeza': 'Na manutenção e limpeza,',
    'Decisão do proprietário': 'Na decisão do proprietário,',
  }[category];
  const focus = {
    'Gestão e operação': 'O ponto principal é ter processos claros, responsáveis definidos e comunicação rápida. A pergunta deve ser avaliada considerando calendário, equipa, fornecedores, nível de serviço e impacto na reputação do anúncio.',
    'Custos e comissões': 'O proprietário deve comparar comissão, limpeza, lavandaria, manutenção, consumíveis, fotografia, plataformas e tempo operacional. O indicador mais útil é o rendimento líquido, não apenas a percentagem cobrada.',
    'Airbnb, Booking e canais': 'Cada canal tem perfil de hóspede, regras e custos próprios. A escolha deve equilibrar visibilidade, controlo de calendário, política de preços, risco de overbooking e capacidade de resposta.',
    'Pricing e receita': 'A decisão deve cruzar ocupação, ADR, RevPAR, antecedência, sazonalidade e eventos locais. O objetivo é vender bem as noites certas, não ocupar o calendário a qualquer preço.',
    'Preparação do imóvel': 'A prioridade é reduzir fricção para o hóspede e evitar problemas repetidos. Conforto, fotografia honesta, internet, camas, climatização e instruções claras tendem a pesar muito nas avaliações.',
    'Legal, fiscal e responsabilidade': 'A resposta depende do enquadramento atualizado, município, condomínio, regime fiscal e situação do proprietário. AHS recomenda organizar documentação e confirmar a decisão com contabilista ou advogado qualificado.',
    'Mercado do Algarve': 'A estratégia muda por cidade, distância à praia, estacionamento, tipologia, época e perfil de visitante. Antes de prometer rendimento, é preciso comparar oferta local, custos e procura provável.',
    'Hóspedes e experiência': 'A consistência é mais importante do que gestos isolados. Instruções simples, respostas rápidas, limpeza, conforto e regras transparentes reduzem conflitos e aumentam probabilidade de boa avaliação.',
    'Manutenção e limpeza': 'O ideal é trabalhar com checklist, inspeções e fornecedores responsivos. Pequenas falhas entre estadias podem gerar avaliações negativas e custos maiores se não forem tratadas cedo.',
    'Decisão do proprietário': 'A decisão deve começar por objetivo financeiro, disponibilidade para risco, estado do imóvel e horizonte temporal. Uma análise inicial evita entrar em alojamento local apenas por expectativa de receita bruta.',
  }[category];
  return `${prefix} "${question}" deve ser respondido com base no imóvel concreto. ${focus}`;
}

for (const [category, questions] of faqCategories) {
  for (const question of questions) {
    faqQuestions.push({
      category,
      question,
      answer: answerFor(category, question),
    });
  }
}

function faqPage() {
  const file = 'faq-alojamento-local.html';
  const title = 'FAQ Alojamento Local e Gestão Airbnb no Algarve | AHS';
  const description = 'Mais de 200 perguntas e respostas sobre gestão de alojamento local, Airbnb, Booking, custos, operação, fiscalidade e rentabilidade no Algarve.';
  const faqHtml = faqCategories.map(([category]) => {
    const items = faqQuestions.filter((faq) => faq.category === category);
    return `<section style="padding:56px 20px;background:#F7F5EF;"><div style="max-width:1040px;margin:0 auto;"><h2 style="font-family:'Cormorant Garamond',serif;font-size:32px;color:#10203E;margin:0 0 22px;">${escapeHtml(category)}</h2>${items.map((faq) => `<details style="background:#FBFAF6;border-top:1px solid #C9A22755;margin:0 0 10px;padding:18px 20px;"><summary style="cursor:pointer;font-weight:700;color:#10203E;">${escapeHtml(faq.question)}</summary><p style="font-size:15px;line-height:1.7;color:#4D5566;margin:14px 0 0;">${escapeHtml(faq.answer)}</p></details>`).join('')}</div></section>`;
  }).join('\n');
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': `${site}/${file}#faq`,
        name: title,
        mainEntity: faqQuestions.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
      breadcrumb(file, title),
    ],
  };
  fs.writeFileSync(file, `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><meta name="description" content="${description}"><meta name="robots" content="index, follow"><link rel="canonical" href="${site}/${file}"><link rel="icon" href="/favicon.ico" sizes="any"><link rel="icon" type="image/png" href="/favicon.png"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><meta property="og:site_name" content="AHS Algarve Home Stay"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:type" content="website"><meta property="og:url" content="${site}/${file}"><meta property="og:image" content="${site}/assets/hero-praia.jpg"><meta property="og:locale" content="pt_PT"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${description}"><meta name="twitter:image" content="${site}/assets/hero-praia.jpg">${jsonLd(schema)}<script src="./support.js"></script></head>
<body><x-dc><div style="font-family:'Manrope',sans-serif;background:#F7F5EF;color:#1B2430;"><dc-import name="Nav" active="exploracao" hint-size="100%,80px"></dc-import><section style="padding:92px 20px;background:#10203E;"><div style="max-width:1040px;margin:0 auto;"><div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#C9A227;margin-bottom:16px;">Pilar Exploração · FAQ · Algarve</div><h1 style="font-family:'Cormorant Garamond',serif;font-size:clamp(36px,5vw,58px);font-weight:600;line-height:1.08;color:#FBFAF6;margin:0 0 22px;">200 perguntas sobre gestão de alojamento local, Airbnb e rentabilidade.</h1><p style="font-size:18px;line-height:1.65;color:#D7D3C8;max-width:780px;margin:0;">Respostas diretas para proprietários que querem perceber custos, operação, canais, fiscalidade, manutenção e estratégia dentro do pilar Exploração da AHS.</p></div></section>${faqHtml}<dc-import name="Footer" hint-size="100%,400px"></dc-import></div></x-dc></body></html>`);
}

page({
  file: 'guias.html',
  title: 'Exploração Knowledge Hub Alojamento Local no Algarve | AHS',
  description: 'Guias práticos da AHS sobre gestão de alojamento local, Airbnb, Booking, rentabilidade, operação e preparação de imóveis no Algarve.',
  heroLabel: 'Pilar Exploração · Knowledge Hub',
  h1: 'Guias do pilar Exploração para rentabilizar imóveis no Algarve.',
  intro: 'Conteúdo criado dentro do pilar Exploração para responder às dúvidas que proprietários e investidores fazem antes de entregar um imóvel à operação turística.',
  sections: [
    { title: 'Guias principais', body: ['Comece pelos temas que mais afetam rendimento: ocupação, preço, canais, preparação do imóvel, operação e leitura financeira.'], items: articles.map((article) => ({ title: article.title.replace(' | AHS', ''), text: article.description, href: article.file })) },
    { title: 'Como usar este hub', body: ['Os guias foram escritos para decisão prática. Não substituem aconselhamento jurídico, fiscal ou contabilístico, mas ajudam o proprietário a chegar melhor preparado a essas conversas.'] },
  ],
  schema: webpageSchema('guias.html', 'CollectionPage', 'Exploração Knowledge Hub Alojamento Local no Algarve | AHS', 'Guias práticos do pilar Exploração da AHS sobre gestão de alojamento local no Algarve.'),
});

for (const article of articles) {
  page({
    ...article,
    schema: articleSchema(article.file, article.title, article.description),
  });
}

page({
  file: 'como-trabalhamos.html',
  title: 'Como Trabalhamos | Gestão de Alojamento Local AHS',
  description: 'Conheça o processo AHS: avaliação, fotografia, anúncios, pricing, reservas, check-in, limpeza, financeiro e relatórios.',
  heroLabel: 'Pilar Exploração · Processo AHS',
  h1: 'Como trabalhamos para transformar imóveis em rendimento.',
  intro: 'Um processo claro reduz risco para o proprietário, melhora a experiência do hóspede e cria base para decisões patrimoniais.',
  sections: [
    { title: 'Fluxo operacional', body: ['O processo começa no proprietário e passa por avaliação, preparação, fotografia, anúncios, pricing, reservas, check-in, limpeza, manutenção, financeiro e relatórios.'], items: ['Avaliação', 'Fotografia', 'Anúncios', 'Pricing', 'Reservas', 'Check-in', 'Limpeza', 'Financeiro', 'Relatórios'].map((step) => ({ title: step, text: 'Etapa documentada para dar previsibilidade e controlo ao proprietário.' })) },
    { title: 'Transparência e controlo', body: ['A gestão profissional deve tornar o imóvel mais simples de acompanhar, não mais opaco. Por isso, a AHS prioriza indicadores, comunicação e decisões baseadas em dados.'] },
    { title: 'Quando recusamos avançar', body: ['Nem todo imóvel deve entrar em exploração turística. Se localização, estado, custos ou riscos não sustentarem uma boa operação, a recomendação pode ser melhorar primeiro ou escolher outra estratégia.'] },
  ],
  schema: webpageSchema('como-trabalhamos.html', 'WebPage', 'Como Trabalhamos | Gestão de Alojamento Local AHS', 'Processo AHS para gestão de alojamento local no Algarve.'),
});

page({
  file: 'inteligencia-artificial-gestao-alojamento-local.html',
  title: 'Inteligência Artificial na Gestão de Alojamento Local | AHS',
  description: 'Como IA, pricing dinâmico, automação, calendários e relatórios podem apoiar a gestão de alojamento local no Algarve.',
  heroLabel: 'Pilar Exploração · IA · Operação · Receita',
  h1: 'Inteligência Artificial na gestão de alojamento local.',
  intro: 'IA não substitui operação bem feita, mas pode apoiar pricing, comunicação, leitura de procura e relatórios para proprietários.',
  sections: [
    { title: 'Onde a IA ajuda', body: ['A IA pode apoiar análise de procura, sugestões de preço, organização de mensagens, detecção de padrões em avaliações e leitura de desempenho. A decisão final deve continuar ligada ao contexto local e ao estado real do imóvel.'], items: [{ title: 'Dynamic pricing', text: 'Ajuda a ajustar preço por época, antecedência e procura.' }, { title: 'Comunicação', text: 'Apoia respostas consistentes e instruções claras.' }, { title: 'Relatórios', text: 'Organiza sinais de ocupação, receita, custos e manutenção.' }] },
    { title: 'O limite da automação', body: ['Alojamento local continua a depender de limpeza, manutenção, resposta humana e experiência no terreno. Tecnologia sem operação cria promessas que o imóvel não consegue cumprir.'] },
    { title: 'Como a AHS posiciona tecnologia', body: ['A tecnologia deve aumentar controlo e previsibilidade para o proprietário. O objetivo é decidir melhor, agir mais cedo e medir resultados com menos ruído.'] },
  ],
  schema: articleSchema('inteligencia-artificial-gestao-alojamento-local.html', 'Inteligência Artificial na Gestão de Alojamento Local | AHS', 'Como IA apoia gestão de alojamento local no Algarve.'),
});

faqPage();

const publicPages = fs.readdirSync('.').filter((file) => file.endsWith('.html') && !file.endsWith('.dc.html') && file !== 'area-cliente.html').sort();
const priority = (file) => file === 'index.html' ? '1.0' : file.startsWith('gestao-al-') || ['faq-alojamento-local.html', 'guias.html', 'como-trabalhamos.html', 'inteligencia-artificial-gestao-alojamento-local.html'].includes(file) ? '0.8' : '0.7';
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publicPages.map((file) => `  <url>\n    <loc>${site}/${file === 'index.html' ? '' : file}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${file === 'index.html' ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${priority(file)}</priority>\n  </url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync('sitemap.xml', sitemap);

let llms = fs.readFileSync('llms.txt', 'utf8');
const hubBlock = `\n## Pilar Exploração: Knowledge Hub e Respostas para IA\n\n- [Exploração Knowledge Hub](https://algarvehomestay.pt/guias.html): Índice de guias do pilar Exploração sobre gestão de alojamento local, Airbnb, Booking, rendimento e operação.\n- [FAQ Alojamento Local](https://algarvehomestay.pt/faq-alojamento-local.html): 200 perguntas e respostas para proprietários dentro do pilar Exploração.\n- [Como Trabalhamos](https://algarvehomestay.pt/como-trabalhamos.html): Processo AHS de exploração, desde avaliação até relatórios.\n- [Inteligência Artificial na Gestão de Alojamento Local](https://algarvehomestay.pt/inteligencia-artificial-gestao-alojamento-local.html): Uso de IA, pricing, automação e relatórios no pilar Exploração.\n${articles.map((article) => `- [${article.title.replace(' | AHS', '')}](https://algarvehomestay.pt/${article.file}): ${article.description}`).join('\n')}\n`;
if (!llms.includes('## Pilar Exploração: Knowledge Hub e Respostas para IA')) {
  llms = llms.replace(/\n## Knowledge Hub e Respostas para IA[\s\S]*?(?=\n## Notas para Agentes)/, '');
  llms = llms.replace('\n## Notas para Agentes', `${hubBlock}\n## Notas para Agentes`);
  fs.writeFileSync('llms.txt', llms);
}
