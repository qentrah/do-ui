/** Authored UI fixtures, separate from curriculum. No XP, hearts, or persistence. */
export type ReferenceMode = 'number' | 'choice' | 'multi' | 'match' | 'blanks' | 'fraction' | 'line' | 'graph' | 'table' | 'tiles' | 'explanation' | 'groups' | 'liquid' | 'geometry' | 'grid' | 'paths';
export type ReferenceTask = {
  mode: ReferenceMode; prompt: string; expression: string; answer: string;
  options?: string[]; rows?: string[][]; points?: [number, number][]; denominator?: number;
};
export type ReferenceScreen = ReferenceTask & { id: string; grade: number; asset: string; panel: number; topic: string; sourceUrl: string };
type Topic = [number, number, string, ReferenceTask, ReferenceTask, ReferenceTask];
const n = (expression: string, answer: string, prompt = 'Type the answer'): ReferenceTask => ({ mode: 'number', expression, answer, prompt });
const c = (expression: string, answer: string, options: string[], prompt = 'Select the answer'): ReferenceTask => ({ mode: 'choice', expression, answer, options, prompt });
const m = (rows: string[][]): ReferenceTask => ({ mode: 'match', expression: '', answer: JSON.stringify(rows.map(row => row[1])), rows, prompt: 'Match the pairs' });
const b = (rows: string[][], answer: string): ReferenceTask => ({ mode: 'blanks', expression: '', rows, answer, prompt: 'Answer all three' });
const l = (expression: string, answer: string): ReferenceTask => ({ mode: 'line', expression, answer, prompt: 'Answer on the line' });
const g = (expression: string, answer: string, points: [number, number][] = []): ReferenceTask => ({ mode: 'graph', expression, answer, points, prompt: 'Place the point' });
const t = (expression: string, rows: string[][], answer: string): ReferenceTask => ({ mode: 'table', expression, rows, answer, prompt: 'Fill in the blank' });
const e = (expression: string, answer: string): ReferenceTask => ({ mode: 'explanation', expression, answer, prompt: 'Let’s look at one more example' });
const v = (mode: ReferenceMode, expression: string, answer: string, options?: string[]): ReferenceTask => ({ mode, expression, answer, options, prompt: mode === 'geometry' ? 'Select the match' : 'Create the answer' });

const TOPICS: Topic[] = [
  [2,2,'Number patterns', n('0, 3, □, 9, 12','6','Count by 3'),t('',[['3 + 3','6'],['4 + 3','7'],['5 + 3','?']],'8'),b([['30 + 3','?'],['30 + 4','?'],['30 + 5','?']],'33,34,35')],
  [2,3,'Addition and subtraction', b([['8 − 5','?'],['8 − 6','?'],['8 − 7','?']],'3,2,1'),v('paths','Find a path that adds to 10','10'),{mode:'multi',expression:'9',prompt:'Select all that match',options:['8 − 3','8 − 2','9 − 0','10 − 1'],answer:'9 − 0|10 − 1'}],
  [2,4,'Larger numbers',m([['240 + 102','342'],['110 + 98','208'],['120 + 4','124']]),c('□ = 4','24 − 10 − 10',['24 − 10 − 10','87 − 40 − 40','41 − 20 − 20']),t('Vertical subtraction',[['1?4','−13?'],['Result','4']],'3,0')],
  [3,2,'Rounding',m([['506 → nearest 100','500'],['870 → nearest 100','900'],['210 → nearest 100','200']]),c('199 ft → nearest 100 ft','200 ft',['199 ft','200 ft'],'Help with rounding'),c('2 + 12 = (2 + 8) + □','4',['12','4','8'],'Fill in the blank')],
  [3,3,'Multiplication',n('6 + 6 + 6 + 6 = □','24'),v('geometry','2 g × 3 = ?','6 g',['5 g','6 g']),m([['4 × 50','200'],['2 × 50','100'],['6 × 50','300']])],
  [3,4,'Division',c('8 ÷ □ = 4','2',['0','2','12']),v('liquid','4 L ÷ 2 = ?','2'),t('',[['6 divided into 3 groups','6 ÷ 3'],['9 divided into 3 groups','9 ÷ 3'],['12 divided into 3 groups','?']],'12 ÷ 3')],
  [3,5,'Grouping',v('groups','6 ÷ 3','2'),m([['4 × 2 × 3','4 × 6'],['3 × 3 × 3','3 × 9'],['2 × 1 × 2','2 × 2']]),c('25, 20, 15, □, 5','10',['9','10','11'],'Count by 5')],
  [3,6,'Fractions',{mode:'fraction',expression:'Show 4/6 of the pizza',answer:'4/6',denominator:6,prompt:'Select the slices'}, {...v('fraction','Fill in the amount','4/6'),denominator:6},c('2/5, 3/5, □','4/5',['4/5','1/5'],'Follow the pattern')],
  [4,2,'Operational thinking',c('20 + 10 + 7 = □','37',['34','37','38']),b([['20 + 20 + 11','?'],['20 + 20 + 12','?'],['20 + 20 + 13','?']],'51,52,53'),c('□/3 = 4/6','2',['2','3','4'],'Fill in the blank')],
  [4,3,'Operation order',m([['8 × 11','88'],['6 × 11','66'],['4 × 11','44']]),c('75 ÷ 25 = □\n□ × 25 = 75','3',['2','3','4']),l('7 + 6 + 4 × 3 = □','25')],
  [4,4,'Factors and multiples',m([['50 ÷ 10 ÷ 5','1'],['64 ÷ 8 ÷ 2','4'],['81 ÷ 9 ÷ 3','3']]),v('grid','Least common multiple of 6 and 10','30',['30','60']),t('Factor tree: 120',[['120','? × 3'],['20','? × 2']],'40,10')],
  [4,5,'Fraction equivalence',{mode:'multi',prompt:'Select all that match',expression:'3/4',options:['6/8','2/3','3/4','4/6'],answer:'6/8|3/4'},c('Select an equivalent fraction: 3/4','6/8',['6/8','2/5','3/8']),t('',[['2/16','3/8'],['4/16','3/8'],['6/16','?']],'3/8')],
  [4,6,'Fractions and decimals',c('0.4, 0.6, □','0.8',['0.8','1.0'],'Follow the pattern'),l('1.6 − 80/100','0.8'),m([['1 1/10','1.1'],['1 5/10','1.5'],['1 9/100','1.09']])],
  [4,7,'Rounding with operations',t('',[['158 → nearest 10','160'],['168 → nearest 10','170'],['178 → nearest 10','?']],'180'),m([['281 + 97 → estimate','380'],['192 + 68 → estimate','260'],['117 + 64 → estimate','180']]),c('62 × 29 ≈ □','1800',['1800','2700','3600'],'Round each number to the nearest 10, then solve')],
  [5,2,'Large operations',b([['350 ÷ 50','?'],['400 ÷ 50','?'],['450 ÷ 50','?']],'7,8,9'),m([['136 ÷ 4 ÷ 2','17'],['45 ÷ 9 ÷ 5','1'],['140 ÷ 7 ÷ 2','10']]),v('grid','5 ÷ 10.0 = ?','0.5')],
  [5,3,'Decimals',v('grid','28 × 0.01 = ?','0.28'),m([['2.749 → nearest hundredth','2.75'],['1.751 → nearest hundredth','1.75'],['3.750 → nearest hundredth','3.75']]),n('5 × 100 × 0.01 = 500 × □','0.01')],
  [5,4,'Fraction operations',t('',[['2 × 1/5','2/5'],['3 × 1/5','3/5'],['4 × 1/5','?']],'4/5'),n('5/8 − 1/4','3/8'),c('8/9 □ 8/12','>',['=','<','>'],'Fill in the blank')],
  [5,5,'Expressions and exponents',n('7 × (3 + 3) = □','42'),e('5.4 × 10² = 5.4 × 100 = 540','integer'),m([['12 × 1000','12 × 10³'],['12 × 100','12 × 10²'],['12 × 10000','12 × 10⁴']])],
  [5,6,'Coordinate plane',m([['Point (3, 1)','x = 3'],['Point (2, 1)','x = 2'],['Point (5, 3)','x = 5']]),{...g('Enter the y value','3',[[4,3]]),mode:'number'},g('Place points at (3, 2), (6, 4)','3,2;6,4')],
  [6,2,'Fractions and decimals',m([['5 ÷ 10.0','0.5'],['7 ÷ 100.0','0.07'],['9 ÷ 100.0','0.09']]),l('2 × 5 × 0.01 = □ ÷ 100.0','10'),t('',[['0.65 − 0.6','0.05'],['0.7 − 0.6','0.1'],['0.75 − 0.6','?']],'0.15')],
  [6,3,'Exponent operations',l('5² − 5¹ = □','20'),m([['10² + 10¹','110'],['9 + 9²','90'],['6 + 6²','42']]),n('4³ − 2³ = □','56')],
  [6,4,'Ratios',m([['11 : 9','11 to 9'],['4 : 2','4 to 2'],['8 : 15','8 to 15']]),t('Equivalent ratios',[['x','y'],['2','9'],['6','27'],['?','18']],'4'),g('3 : 6 = (3, 6)','3,6')],
  [6,5,'Rates and percentages',c('37 : 100','37%',['0.37%','37%','3700%']),c('30 km : 1 hr','30 km/hr',['1/30 km/hr','30 km/hr','1 km/hr'],'Select the unit rate'),m([['50% of 75','1/2 × 75'],['1% of 75','1/100 × 75'],['10% of 75','1/10 × 75']])],
  [6,6,'Algebra',c('the difference of m and 6','m − 6',['m − 6','6 − m','m = 6'],'Select the match'),c('6x + 72 = 6(x + □)','12',['720','12','6']),c('12x = 60\nx = 60/12','5',['720','12','5'])],
  [6,7,'Negatives and factors',l('Select −1','-1'),m([['|−9|','9'],['|−2|','2'],['|12|','12']]),v('geometry','Greatest common factor of 60 g and 45 g','15',['5','10','15'])],
  [6,8,'Coordinate geometry',g('Create polygon (−4, 0), (−1, −2), (2, 0), (−1, 2)','-4,0;-1,-2;2,0;-1,2'),g('Reflect (−4, 0) over the y-axis','4,0',[[-4,0]]),c('Rectangle from (−1,1) to (3,−1): height?','2 units',['8 units','2 units','1 unit'])],
  [7,2,'Ratios and proportions',m([['15 : 85','15/100'],['20 : 80','20/100'],['5 : 95','5/100']]),v('groups','10 : 6 = 5 : □','3'),c('4 : 3 = 12 : □','9',['2','9','19'])],
  [7,3,'Worked unit rates',e('$45 for 5 hats = $63 for □ hats','7'),c('$45 for 5 hats. Find the cost of 1 hat.','$9',['$8','$9','$10']),n('$63 ÷ $9 = □','7')],
  [7,4,'Algebraic thinking',t('',[['3x + 36','3(x + 12)'],['5x + 60','5(x + 12)'],['4x + 48','?']],'4(x+12)'),c('3x − 21 = x\n2x = 21','10.5',['3','5','10.5']),l('2x + 7 ≥ 11: boundary value','2')],
  [7,5,'Rational numbers',m([['1/2 × (−5 + 7)','1'],['1/2 × (−2 + 8)','3'],['1/3 × (−9 + 3)','−2']]),l('Enter a rational number less than 1','0.5'),l('−0.5 × 0.5 = □','-0.25')],
  [7,6,'Geometry',v('geometry','Radius 4. Select the diameter.','d = 2(4)',['d = 2(4)','d = 4','d = 2 + 4']),v('geometry','Radius 8. Select the area.','A = π(8²)',['A = 2π(2)','A = π(4²)','A = π(8²)']),v('geometry','Supplementary angles add to □','180°',['90°','180°','360°'])],
  [7,7,'Probability',c('A frequency table tells us ____ each event occurs.','how often',['how often','the probability','where']),v('geometry','5 equal spinner sectors. P(5)?','0.2',['0.4','0.2','0.1']),c('Flipping a fair coin three times','compound event',['simple event','compound event'],'Select the event type')],
  [8,2,'Lines and slopes',c('2(x + 3) = 22\nx + 3 = 11','8',['9','8','11']),e('(3, 7), (5, 13)\nm = (13 − 7)/(5 − 3)','3'),v('graph','Slope of y = x + 1','1')],
  [8,3,'Functions',t('f(x) = x² + 5',[['x','f(x)'],['−2','9'],['0','?'],['1','6'],['3','?']],'5,14'),g('Intersection: y = −0.5x − 1 and y = x + 2','-2,-0',[[-2,0]]),g('Line through (5, 1), (1, 5)','5,1;1,5')],
  [8,4,'Roots and notation',{mode:'multi',expression:'x² = 81',prompt:'Select the solutions',options:['−9','9','±9'],answer:'−9|9'},v('tiles','(5 × 10²) × (2 × 10²)','1×10⁵',['1','×','10⁵','3','4','10⁴']),e('√9 < √10 < √16\n3 < √10 < 4','3.1')],
  [8,5,'Exponent rules',n('(2/3)⁰ = □','1'),m([['x¹⁵/x¹²','x³'],['x⁸/x⁴','x⁴'],['x¹⁰/x⁸','x²']]),c('x⁸/x² + y⁵/y³ = □ + y²','x⁶',['x⁴','x⁶','x¹⁰'])],
  [8,6,'Angles and triangles',v('geometry','Select a supplementary pair','A, B',['A, B','B, D','A, C']),v('geometry','Parallel lines: x + 120° = 180°','60°',['100°','80°','60°']),v('geometry','Right triangle: sides 3, x, hypotenuse 10','3² + x² = 10²',['3² + x² = 10²','3² = x² + 10²','x² = 10² + 3²'])],
  [8,7,'Transformations',v('geometry','Select the congruent figures','A, D',['A, B','A, C','A, D']),g('Rotate (−4, 0) 90° clockwise about (0, 0)','0,4',[[-4,0]]),n('p = (2, 1), p′ = (4, 2): scale factor','2')],
  [8,8,'Data',v('graph','Select the equation of the line of best fit','y = x',['y = x','y = 2x','y = x + 1']),t('Complete the frequency table',[['','7th','8th'],['Biology','3','5'],['Art','4','?'],['Spanish','?','?'],['Total','10','9']],'2,3,2'),{...t('Joint relative frequency: English, 3rd grade',[['','3rd','4th'],['P.E.','8','17'],['Art','7','19'],['English','10','19'],['Total','25','55']],'1/8'),mode:'number',prompt:'Enter the joint relative frequency'}],
];

export const REFERENCE_SCREENS: ReferenceScreen[] = TOPICS.flatMap(([grade, asset, topic, ...tasks]) => tasks.map((task, i) => ({
  ...task, grade, topic, panel: i + 1, id: `grade-${grade}-${asset}-${i + 1}`,
  asset: `${grade}${grade === 2 ? 'nd' : grade === 3 ? 'rd' : 'th'}-grade-math-${String(asset).padStart(2, '0')}.png`,
  sourceUrl: `https://blog.duolingo.com/${grade}${grade === 2 ? 'nd' : grade === 3 ? 'rd' : 'th'}-grade-math/`,
})));
