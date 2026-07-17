const fs = require('fs');

const site = 'https://algarvehomestay.pt';
const today = '2026-07-16';
const faqLastmod = '2026-07-17';

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
<div style="font-family:Georgia,'Times New Roman',serif;background:#F7F5EF;color:#1B2430;">
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

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" style="color:#10203E;text-decoration:underline;text-decoration-color:#C9A227;">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

function markdownBlocksToHtml(markdown) {
  const blocks = markdown
    .trim()
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks.map((block) => {
    const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
    if (lines.every((line) => line.startsWith('* '))) {
      return `<ul style="margin:12px 0 0;padding-left:22px;color:#4D5566;line-height:1.75;">${lines.map((line) => `<li>${inlineMarkdown(line.replace(/^\*\s+/, ''))}</li>`).join('')}</ul>`;
    }
    if (lines.every((line) => line.startsWith('> '))) {
      return `<blockquote style="margin:14px 0 0;padding:12px 16px;border-left:3px solid #C9A227;background:#F7F5EF;color:#10203E;font-weight:700;line-height:1.65;">${lines.map((line) => inlineMarkdown(line.replace(/^>\s+/, ''))).join('<br>')}</blockquote>`;
    }
    return `<p style="font-size:15px;line-height:1.7;color:#4D5566;margin:14px 0 0;">${inlineMarkdown(lines.join(' '))}</p>`;
  }).join('');
}

function markdownToText(markdown) {
  return markdown
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '$1 ($2)')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/^>\s+/gm, '')
    .replace(/^\*\s+/gm, '- ')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

function parseFaqMarkdown(markdown) {
  const categories = [];
  let category = null;
  let question = null;
  let buffer = [];

  const closeQuestion = () => {
    if (!question || !category) return;
    const answerMarkdown = buffer.join('\n').trim();
    category.items.push({
      ...question,
      answerMarkdown,
      answerHtml: markdownBlocksToHtml(answerMarkdown),
      answerText: markdownToText(answerMarkdown),
    });
    question = null;
    buffer = [];
  };

  for (const rawLine of markdown.replace(/\r\n/g, '\n').split('\n')) {
    const categoryMatch = rawLine.match(/^##\s+(.+)$/);
    if (categoryMatch) {
      closeQuestion();
      category = { title: categoryMatch[1].trim(), intro: [], items: [] };
      categories.push(category);
      continue;
    }

    const questionMatch = rawLine.match(/^###\s+(\d+)\.\s+(.+)$/);
    if (questionMatch) {
      closeQuestion();
      question = { number: Number(questionMatch[1]), question: questionMatch[2].trim() };
      continue;
    }

    if (question) {
      buffer.push(rawLine);
    } else if (category && rawLine.trim()) {
      category.intro.push(rawLine);
    }
  }

  closeQuestion();
  return categories;
}

function faqPage() {
  const file = 'faq-alojamento-local.html';
  const title = 'FAQ Alojamento Local e Gestão Airbnb no Algarve | AHS';
  const description = '200 perguntas e respostas sobre gestão de alojamento local, Airbnb, Booking, custos, operação, fiscalidade e rentabilidade no Algarve.';
  const faqCategories = parseFaqMarkdown(fs.readFileSync('content/faq.md', 'utf8'));
  const faqQuestions = faqCategories.flatMap((category) => category.items);
  const faqHtml = faqCategories.map((category) => {
    const introHtml = category.intro.length ? `<div style="font-size:15px;line-height:1.75;color:#4D5566;margin:0 0 22px;">${markdownBlocksToHtml(category.intro.join('\n'))}</div>` : '';
    return `<section style="padding:56px 20px;background:#F7F5EF;"><div style="max-width:1040px;margin:0 auto;"><h2 style="font-family:'Cormorant Garamond',serif;font-size:32px;color:#10203E;margin:0 0 22px;">${escapeHtml(category.title)}</h2>${introHtml}${category.items.map((faq) => `<details style="background:#FBFAF6;border-top:1px solid #C9A22755;margin:0 0 10px;padding:18px 20px;"><summary style="cursor:pointer;font-weight:700;color:#10203E;">${escapeHtml(faq.question)}</summary>${faq.answerHtml}</details>`).join('')}</div></section>`;
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
          acceptedAnswer: { '@type': 'Answer', text: faq.answerText },
        })),
      },
      breadcrumb(file, title),
    ],
  };
  fs.writeFileSync(file, `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><meta name="description" content="${description}"><meta name="robots" content="index, follow"><link rel="canonical" href="${site}/${file}"><link rel="icon" href="/favicon.ico" sizes="any"><link rel="icon" type="image/png" href="/favicon.png"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><meta property="og:site_name" content="AHS Algarve Home Stay"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:type" content="website"><meta property="og:url" content="${site}/${file}"><meta property="og:image" content="${site}/assets/hero-praia.jpg"><meta property="og:locale" content="pt_PT"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${description}"><meta name="twitter:image" content="${site}/assets/hero-praia.jpg">${jsonLd(schema)}<script src="./support.js"></script></head>
<body><x-dc><div style="font-family:Georgia,'Times New Roman',serif;background:#F7F5EF;color:#1B2430;"><dc-import name="Nav" active="exploracao" hint-size="100%,80px"></dc-import><section style="padding:92px 20px;background:#10203E;"><div style="max-width:1040px;margin:0 auto;"><div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#C9A227;margin-bottom:16px;">Pilar Exploração · FAQ · Algarve</div><h1 style="font-family:'Cormorant Garamond',serif;font-size:clamp(36px,5vw,58px);font-weight:600;line-height:1.08;color:#FBFAF6;margin:0 0 22px;">200 perguntas sobre gestão de alojamento local, Airbnb e rentabilidade.</h1><p style="font-size:18px;line-height:1.65;color:#D7D3C8;max-width:780px;margin:0;">Respostas atualizadas para proprietários que querem perceber custos, operação, canais, fiscalidade, manutenção e estratégia dentro do pilar Exploração da AHS.</p></div></section>${faqHtml}<dc-import name="Footer" hint-size="100%,400px"></dc-import></div></x-dc></body></html>`);
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
const lastmod = (file) => file === 'faq-alojamento-local.html' ? faqLastmod : today;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publicPages.map((file) => `  <url>\n    <loc>${site}/${file === 'index.html' ? '' : file}</loc>\n    <lastmod>${lastmod(file)}</lastmod>\n    <changefreq>${file === 'index.html' ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${priority(file)}</priority>\n  </url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync('sitemap.xml', sitemap);

let llms = fs.readFileSync('llms.txt', 'utf8');
const hubBlock = `\n## Pilar Exploração: Knowledge Hub e Respostas para IA\n\n- [Exploração Knowledge Hub](https://algarvehomestay.pt/guias.html): Índice de guias do pilar Exploração sobre gestão de alojamento local, Airbnb, Booking, rendimento e operação.\n- [FAQ Alojamento Local](https://algarvehomestay.pt/faq-alojamento-local.html): 200 perguntas e respostas para proprietários dentro do pilar Exploração.\n- [Como Trabalhamos](https://algarvehomestay.pt/como-trabalhamos.html): Processo AHS de exploração, desde avaliação até relatórios.\n- [Inteligência Artificial na Gestão de Alojamento Local](https://algarvehomestay.pt/inteligencia-artificial-gestao-alojamento-local.html): Uso de IA, pricing, automação e relatórios no pilar Exploração.\n${articles.map((article) => `- [${article.title.replace(' | AHS', '')}](https://algarvehomestay.pt/${article.file}): ${article.description}`).join('\n')}\n`;
if (!llms.includes('## Pilar Exploração: Knowledge Hub e Respostas para IA')) {
  llms = llms.replace(/\n## Knowledge Hub e Respostas para IA[\s\S]*?(?=\n## Notas para Agentes)/, '');
  llms = llms.replace('\n## Notas para Agentes', `${hubBlock}\n## Notas para Agentes`);
  fs.writeFileSync('llms.txt', llms);
}
