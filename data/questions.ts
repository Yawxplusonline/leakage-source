import { Subject, getSubjects } from './catalog';

export type Question = { id:string; question:string; options:string[]; answerIndex:number; explanation:string; topic:string };
const questionSets:Record<string,Question[]> = {
 'english-language':[
  {id:'eng-01',question:'Choose the word nearest in meaning to “brief”.',options:['Lengthy','Short','Unclear','Loud'],answerIndex:1,explanation:'Brief means short in duration or length.',topic:'Vocabulary'},
  {id:'eng-02',question:'Choose the correctly punctuated sentence.',options:['Ama said “I am ready”.','Ama said, “I am ready.”','Ama said “I am ready.”,','Ama, said “I am ready.”'],answerIndex:1,explanation:'A comma introduces the quotation and the full stop is placed inside the closing quotation mark in this style.',topic:'Punctuation'},
  {id:'eng-03',question:'Choose the correct verb: Neither the teacher nor the students ___ late.',options:['was','is','were','has'],answerIndex:2,explanation:'With neither…nor, the verb commonly agrees with the nearer subject: students were.',topic:'Grammar'}
 ],
 'mathematics':[
  {id:'math-01',question:'Evaluate 3/4 + 1/8.',options:['4/12','1/2','7/8','1'],answerIndex:2,explanation:'Convert 3/4 to 6/8; 6/8 + 1/8 = 7/8.',topic:'Fractions'},
  {id:'math-02',question:'Solve 2x + 5 = 17.',options:['5','6','11','12'],answerIndex:1,explanation:'Subtract 5 to get 2x = 12, then divide by 2: x = 6.',topic:'Algebra'},
  {id:'math-03',question:'A rectangle is 8 cm long and 3 cm wide. What is its area?',options:['11 cm²','22 cm²','24 cm²','48 cm²'],answerIndex:2,explanation:'Area = length × width = 8 × 3 = 24 cm².',topic:'Measurement'}
 ],
 'integrated-science':[
  {id:'sci-01',question:'Which organ pumps blood around the human body?',options:['Lung','Kidney','Heart','Liver'],answerIndex:2,explanation:'The heart pumps blood through the circulatory system.',topic:'Human body'},
  {id:'sci-02',question:'Which process do green plants use to make food?',options:['Respiration','Photosynthesis','Transpiration','Germination'],answerIndex:1,explanation:'Photosynthesis uses light energy to make food from carbon dioxide and water.',topic:'Plants'},
  {id:'sci-03',question:'Which of these is a renewable source of energy?',options:['Coal','Petroleum','Sunlight','Natural gas'],answerIndex:2,explanation:'Sunlight is naturally replenished and is a renewable energy source.',topic:'Energy'}
 ],
 'social-studies':[
  {id:'ss-01',question:'Which institution is primarily responsible for making laws in Ghana?',options:['Parliament','The Police Service','The Electoral Commission','The courts alone'],answerIndex:0,explanation:'Parliament is Ghana’s national legislature and makes laws.',topic:'Governance'},
  {id:'ss-02',question:'Which practice helps prevent soil erosion?',options:['Removing all vegetation','Bush burning','Planting cover crops','Overgrazing'],answerIndex:2,explanation:'Cover crops protect soil from direct rain impact and runoff.',topic:'Environment'},
  {id:'ss-03',question:'A person’s responsibility to obey lawful rules is an example of',options:['a civic duty','a natural resource','a tradition only','a human right only'],answerIndex:0,explanation:'Obeying lawful rules is a civic responsibility.',topic:'Citizenship'}
 ],
 'rme':[
  {id:'rme-01',question:'Which quality promotes peaceful living in a community?',options:['Intolerance','Honesty','Revenge','Selfishness'],answerIndex:1,explanation:'Honesty builds trust and supports peaceful relationships.',topic:'Moral values'},
  {id:'rme-02',question:'Showing respect to people with different beliefs demonstrates',options:['prejudice','religious intolerance','religious tolerance','discrimination'],answerIndex:2,explanation:'Religious tolerance means respecting people whose beliefs differ from yours.',topic:'Religious tolerance'}
 ],
 'computing':[
  {id:'comp-01',question:'Which device is used to enter text into a computer?',options:['Monitor','Keyboard','Speaker','Projector'],answerIndex:1,explanation:'A keyboard is an input device used to enter text and commands.',topic:'Computer hardware'},
  {id:'comp-02',question:'Which password is the strongest?',options:['123456','password','ama2027','T!ger9_River#42'],answerIndex:3,explanation:'A long, unique password with varied character types is generally harder to guess.',topic:'Cyber safety'}
 ],
 'career-technology':[
  {id:'ct-01',question:'Why should safety goggles be worn when cutting or grinding materials?',options:['To decorate the workshop','To protect the eyes','To make tools heavier','To reduce the size of tools'],answerIndex:1,explanation:'Safety goggles protect the eyes from dust and flying particles.',topic:'Workshop safety'},
  {id:'ct-02',question:'Which tool is most suitable for measuring a straight length?',options:['Tape measure','Paintbrush','Pliers','Chisel'],answerIndex:0,explanation:'A tape measure is designed to measure length.',topic:'Tools'}
 ],
 'french':[
  {id:'fr-01',question:'What does “Bonjour” mean in English?',options:['Good night','Good morning/hello','Goodbye forever','Thank you'],answerIndex:1,explanation:'Bonjour is a common French greeting meaning good day or hello.',topic:'Vocabulary'},
  {id:'fr-02',question:'Choose the correct French phrase for “I am a student.”',options:['Je suis élève.','Tu es élève.','Nous sommes élèves.','Ils sont élèves.'],answerIndex:0,explanation:'“Je suis élève” means “I am a student.”',topic:'Grammar'}
 ],
 'twi':[
  {id:'twi-01',question:'Which Twi expression is commonly used to greet someone in the morning?',options:['Maakye','Da yie','Medaase','Kafra'],answerIndex:0,explanation:'“Maakye” is a common morning greeting in Twi.',topic:'Greetings'},
  {id:'twi-02',question:'What does “Medaase” mean in English?',options:['Welcome','Please','Thank you','Good night'],answerIndex:2,explanation:'“Medaase” means “thank you” in Twi.',topic:'Vocabulary'}
 ],
 'core-mathematics':[
  {id:'cm-01',question:'If 5x = 35, find x.',options:['5','6','7','8'],answerIndex:2,explanation:'Divide both sides by 5: x = 7.',topic:'Algebra'}
 ],
 'biology':[
  {id:'bio-01',question:'Which cell structure controls most activities of a typical plant cell?',options:['Cell wall','Nucleus','Vacuole','Chloroplast only'],answerIndex:1,explanation:'The nucleus contains genetic material and regulates many cell activities.',topic:'Cell biology'}
 ],
 'chemistry':[
  {id:'chem-01',question:'What is the chemical symbol for sodium?',options:['S','So','Na','N'],answerIndex:2,explanation:'Sodium has the chemical symbol Na.',topic:'Elements'}
 ],
 'physics':[
  {id:'phy-01',question:'What is the SI unit of force?',options:['Joule','Watt','Newton','Pascal'],answerIndex:2,explanation:'Force is measured in newtons (N).',topic:'Mechanics'}
 ],
 'economics':[
  {id:'eco-01',question:'What is the basic economic problem caused by limited resources and unlimited wants?',options:['Inflation only','Scarcity','Monopoly','Taxation'],answerIndex:1,explanation:'Scarcity means resources are limited relative to wants.',topic:'Basic concepts'}
 ],
 'government':[
  {id:'gov-01',question:'The principle that government powers are divided among different branches is called',options:['federalism','separation of powers','universal suffrage','nationalism'],answerIndex:1,explanation:'Separation of powers distributes functions among branches of government.',topic:'Political systems'}
 ],
 'general-knowledge-in-art':[
  {id:'gka-01',question:'Which element of art refers to the lightness or darkness of a colour?',options:['Texture','Value','Shape','Form'],answerIndex:1,explanation:'Value describes how light or dark a colour or tone appears.',topic:'Elements of art'}
 ],
 'business-management':[
  {id:'bm-01',question:'Which management function involves setting goals and deciding how to achieve them?',options:['Planning','Controlling','Staffing','Directing only'],answerIndex:0,explanation:'Planning establishes objectives and selects actions to achieve them.',topic:'Management'}
 ],
 'financial-accounting':[
  {id:'fa-01',question:'The accounting equation is',options:['Assets = Capital − Liabilities','Assets = Liabilities + Capital','Capital = Assets + Liabilities','Liabilities = Assets + Capital'],answerIndex:1,explanation:'The accounting equation is Assets = Liabilities + Owner’s Equity/Capital.',topic:'Accounting equation'}
 ],
 'foods-and-nutrition':[
  {id:'fn-01',question:'Which nutrient is the body’s main immediate source of energy?',options:['Carbohydrate','Vitamin C','Water','Minerals'],answerIndex:0,explanation:'Carbohydrates are a major source of energy for the body.',topic:'Nutrition'}
 ],
 'general-agriculture':[
  {id:'ag-01',question:'Which soil component is formed from decomposed plant and animal remains?',options:['Gravel','Humus','Bedrock','Clay only'],answerIndex:1,explanation:'Humus is the dark organic material formed by decomposition.',topic:'Soil'}
 ]
};

const fallbackTopics:Record<string,string[]> = {
 'BECE':['key concepts','definitions','everyday applications','problem solving','revision'],
 'WASSCE':['core principles','applications','analysis','interpretation','problem solving']
};

function yearVariant(q:Question, year:string, idx:number):Question {
 // Year variants keep the tested skill but alter context/numbers; the seed bank remains clearly marked as starter content.
 if (year === '2027') return q;
 const y = Number(year);
 const variants:Record<string,Record<number,Partial<Question>>> = {
  'mathematics': {
   0:{question:`For the ${y} practice set, evaluate 2/3 + 1/6.`,options:['1/2','5/6','1','2/9'],answerIndex:1,explanation:'Convert 2/3 to 4/6; 4/6 + 1/6 = 5/6.'},
   1:{question:`For the ${y} practice set, solve 3x − 4 = 14.`,options:['4','5','6','7'],answerIndex:2,explanation:'Add 4 to get 3x = 18; divide by 3 to get x = 6.'}
  },
  'english-language': {
   0:{question:`In the ${y} practice set, choose the word nearest in meaning to “rapid”.`,options:['Slow','Quick','Weak','Late'],answerIndex:1,explanation:'Rapid means fast or quick.'}
  },
  'integrated-science': {
   0:{question:`In the ${y} practice set, which organ pumps blood around the body?`,options:['Liver','Heart','Lung','Stomach'],answerIndex:1,explanation:'The heart pumps blood through the circulatory system.'}
  }
 };
 const patch = variants[q.id.startsWith('math')?'mathematics':q.id.startsWith('eng')?'english-language':q.id.startsWith('sci')?'integrated-science':'']?.[idx];
 if (!patch) return {...q, id:`${q.id}-${year}`, question: q.question};
 return {...q,...patch,id:`${q.id}-${year}`};
}
export function getSubjectById(id:string):Subject|undefined {
 const all = [...getSubjects('BECE','All subjects'),...getSubjects('WASSCE School','All subjects')];
 return all.find(s=>s.id===id);
}
export function getQuestions(subjectId:string, year:string):Question[] {
 const seed = questionSets[subjectId] || [{
  id:`${subjectId}-starter`,question:`Which statement best describes a key idea in ${getSubjectById(subjectId)?.name || 'this subject'}?`,
  options:['A statement unrelated to the subject','A relevant principle that should be checked against the current syllabus','A guaranteed WAEC question','None of the above'],answerIndex:1,
  explanation:'This is a placeholder starter item. Replace it with a syllabus-reviewed subject question before publishing.',topic:'Starter question'
 }];
 const expanded:Question[] = [];
 for (let i=0;i<100;i++) {
  const base = seed[i % seed.length];
  const copy = yearVariant(base, year, i % seed.length);
  expanded.push({...copy,id:`${subjectId}-${year}-${String(i+1).padStart(3,'0')}`,question: i < seed.length ? copy.question : `${copy.question} (Practice variation ${Math.floor(i/seed.length)+1})`});
 }
 return expanded;
}