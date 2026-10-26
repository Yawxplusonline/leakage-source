export type Subject = { id:string; name:string; group:string; description:string };

export const EXAM_TYPES = ['BECE','WASSCE School','WASSCE Private 1st Series','WASSCE Private 2nd Series'];

export const PROGRAMMES = ['General Arts','Visual Arts','Science','Business','Home Economics','Agriculture'];

const core: Subject[] = [
 {id:'english-language',name:'English Language',group:'Core',description:'Comprehension, grammar, summary and writing skills.'},
 {id:'core-mathematics',name:'Core Mathematics',group:'Core',description:'Number, algebra, geometry, statistics and probability.'},
 {id:'integrated-science',name:'Integrated Science',group:'Core',description:'Scientific concepts, health, environment and practical reasoning.'},
 {id:'social-studies',name:'Social Studies',group:'Core',description:'Citizenship, governance, development and Ghanaian society.'}
];
const bece: Subject[] = [
 {id:'english-language',name:'English Language',group:'BECE',description:'Language use, comprehension and writing.'},
 {id:'mathematics',name:'Mathematics',group:'BECE',description:'Number, algebra, geometry, measurement and data.'},
 {id:'integrated-science',name:'Integrated Science',group:'BECE',description:'Life, physical and environmental science.'},
 {id:'social-studies',name:'Social Studies',group:'BECE',description:'Ghana, citizenship, environment and development.'},
 {id:'rme',name:'Religious and Moral Education (RME)',group:'BECE',description:'Religious beliefs, values and moral decisions.'},
 {id:'computing',name:'Computing',group:'BECE',description:'Digital literacy, computer systems and safe technology use.'},
 {id:'career-technology',name:'Career Technology',group:'BECE',description:'Materials, tools, design, safety and practical problem-solving.'},
 {id:'french',name:'French',group:'BECE',description:'Vocabulary, grammar, reading and everyday communication.'},
 {id:'twi',name:'Twi',group:'BECE',description:'Language, comprehension, grammar and cultural expression.'}
];
const generalArts = ['Christian Religious Studies','Islamic Religious Studies','Traditional Religion','Literature-in-English','Government','History','Geography','Economics','French','Arabic','Elective Mathematics','Elective ICT','Ghanaian Language'];
const visualArts = ['General Knowledge in Art','Graphic Design','Picture Making','Basketry','Ceramics','Jewellery','Leatherwork','Sculpture','Textiles','Biology','Chemistry','Physics','Elective Mathematics','French','Music','Economics','Literature-in-English','Elective ICT'];
const science = ['Elective Mathematics','Biology','Chemistry','Physics','Geography','General Agriculture','French','Music','Elective ICT'];
const business = ['Business Management','Financial Accounting','Cost Accounting','Economics','Elective Mathematics','Elective ICT','French','Music','Typewriting','Clerical Office Duties'];
const homeEcon = ['Management-in-Living','Clothing and Textiles','Foods and Nutrition','General Knowledge in Art','Textiles','French','Music','Economics','Biology','Chemistry','Physics','Elective Mathematics','Elective ICT'];
const agriculture = ['General Agriculture','Animal Husbandry','Crop Husbandry and Horticulture','Fisheries','Forestry','Biology','Chemistry','Physics','Elective Mathematics','Geography','French','Music','Elective ICT'];

const makeElective = (name:string):Subject => ({id:name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''),name,group:'Elective',description:`Revision questions for ${name}.`});
const electives = [...new Set([...generalArts,...visualArts,...science,...business,...homeEcon,...agriculture])].map(makeElective);
export function getSubjects(exam:string, programme:string):Subject[] {
 if (exam === 'BECE') return bece;
 const list = [...core,...electives];
 if (programme === 'All subjects') return list;
 const map:Record<string,string[]> = {'General Arts':generalArts,'Visual Arts':visualArts,'Science':science,'Business':business,'Home Economics':homeEcon,'Agriculture':agriculture};
 const allowed = map[programme] || [];
 return [...core,...electives.filter(s=>allowed.includes(s.name))];
}
export function getSubjectById(id:string):Subject|undefined {
 return [...bece,...core,...electives].find(s=>s.id===id);
}