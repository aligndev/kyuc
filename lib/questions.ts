// Danh sách câu hỏi theo danh mục — Tiếng Anh & Tiếng Việt
export type Category = 'roots' | 'traditions' | 'life_lessons';
export type Language = 'en' | 'vi';

export interface Question {
  id: string;
  category: Category;
  en: string;
  vi: string;
}

export const questions: Question[] = [
  // ── ROOTS ──────────────────────────────────────
  {
    id: 'roots-1',
    category: 'roots',
    en: 'What is one childhood memory that still makes you smile?',
    vi: 'Ký ức thời thơ ấu nào vẫn khiến bạn mỉm cười?',
  },
  {
    id: 'roots-2',
    category: 'roots',
    en: 'What did home feel like when you were little?',
    vi: 'Khi còn nhỏ, nhà với bạn là cảm giác như thế nào?',
  },
  {
    id: 'roots-3',
    category: 'roots',
    en: 'What was your favorite thing to do as a child?',
    vi: 'Điều bạn thích làm nhất khi còn là đứa trẻ là gì?',
  },
  {
    id: 'roots-4',
    category: 'roots',
    en: 'Tell me about the neighborhood you grew up in.',
    vi: 'Kể cho tôi nghe về khu phố nơi bạn lớn lên.',
  },
  {
    id: 'roots-5',
    category: 'roots',
    en: 'Who was your closest friend growing up, and what did you do together?',
    vi: 'Người bạn thân nhất thời thơ ấu của bạn là ai, và các bạn thường làm gì cùng nhau?',
  },
  {
    id: 'roots-6',
    category: 'roots',
    en: 'What did you dream of becoming when you were young?',
    vi: 'Khi còn nhỏ, bạn mơ ước trở thành gì?',
  },
  {
    id: 'roots-7',
    category: 'roots',
    en: 'What was school like for you growing up?',
    vi: 'Trường học với bạn như thế nào khi còn nhỏ?',
  },

  // ── TRADITIONS ─────────────────────────────────
  {
    id: 'traditions-1',
    category: 'traditions',
    en: 'Which family meal brings back the most memories?',
    vi: 'Bữa ăn gia đình nào gợi lại nhiều kỷ niệm nhất?',
  },
  {
    id: 'traditions-2',
    category: 'traditions',
    en: 'Is there a recipe you learned from your parents or grandparents?',
    vi: 'Bạn có công thức nào học được từ cha mẹ hoặc ông bà không?',
  },
  {
    id: 'traditions-3',
    category: 'traditions',
    en: 'How did your family celebrate Tết when you were young?',
    vi: 'Gia đình bạn đón Tết như thế nào khi bạn còn nhỏ?',
  },
  {
    id: 'traditions-4',
    category: 'traditions',
    en: 'What is a family tradition that you hope will never be forgotten?',
    vi: 'Truyền thống gia đình nào mà bạn mong sẽ không bao giờ bị quên lãng?',
  },
  {
    id: 'traditions-5',
    category: 'traditions',
    en: 'What songs did your family sing together?',
    vi: 'Gia đình bạn thường hát những bài gì cùng nhau?',
  },
  {
    id: 'traditions-6',
    category: 'traditions',
    en: 'Describe a holiday or celebration that meant the most to you.',
    vi: 'Hãy kể về một ngày lễ hay buổi lễ kỷ niệm mà bạn trân trọng nhất.',
  },

  // ── LIFE LESSONS ────────────────────────────────
  {
    id: 'lessons-1',
    category: 'life_lessons',
    en: 'What do you hope your grandchildren always remember?',
    vi: 'Điều bạn muốn các cháu luôn ghi nhớ là gì?',
  },
  {
    id: 'lessons-2',
    category: 'life_lessons',
    en: 'What is the best piece of advice you have ever received?',
    vi: 'Lời khuyên tốt nhất mà bạn từng nhận được là gì?',
  },
  {
    id: 'lessons-3',
    category: 'life_lessons',
    en: 'What is something you wish you had known when you were younger?',
    vi: 'Điều bạn ước mình đã biết khi còn trẻ hơn là gì?',
  },
  {
    id: 'lessons-4',
    category: 'life_lessons',
    en: 'What has been the greatest challenge you have overcome?',
    vi: 'Thử thách lớn nhất mà bạn đã vượt qua là gì?',
  },
  {
    id: 'lessons-5',
    category: 'life_lessons',
    en: 'What are you most proud of in your life?',
    vi: 'Điều bạn tự hào nhất trong cuộc đời mình là gì?',
  },
  {
    id: 'lessons-6',
    category: 'life_lessons',
    en: 'What does happiness mean to you?',
    vi: 'Hạnh phúc có ý nghĩa gì với bạn?',
  },
  {
    id: 'lessons-7',
    category: 'life_lessons',
    en: 'If you could write a letter to your younger self, what would you say?',
    vi: 'Nếu có thể viết thư cho bản thân thời trẻ, bạn sẽ nói gì?',
  },
];

export function getQuestionsByCategory(category: Category): Question[] {
  return questions.filter(q => q.category === category);
}

export function getRandomQuestion(category?: Category): Question {
  const pool = category ? getQuestionsByCategory(category) : questions;
  return pool[Math.floor(Math.random() * pool.length)];
}

export const categoryMeta = {
  roots: {
    label: { en: 'Roots', vi: 'Gốc Rễ' },
    number: '01',
    tagline: { en: 'The street they grew up on.', vi: 'Con đường họ lớn lên.' },
    sampleQuestion: { en: '"What did home feel like when you were little?"', vi: '"Khi còn nhỏ, nhà với bạn là cảm giác như thế nào?"' },
    color: 'var(--color-roots)',
  },
  traditions: {
    label: { en: 'Traditions', vi: 'Truyền Thống' },
    number: '02',
    tagline: { en: 'Her recipe. No measuring cups.', vi: 'Công thức của bà. Không cần đo lường.' },
    sampleQuestion: { en: '"Which family meal brings back the most memories?"', vi: '"Bữa ăn gia đình nào gợi lại nhiều kỷ niệm nhất?"' },
    color: 'var(--color-traditions)',
  },
  life_lessons: {
    label: { en: 'Life Lessons', vi: 'Bài Học Cuộc Đời' },
    number: '03',
    tagline: { en: 'The advice you\'ll carry forever.', vi: 'Lời khuyên mang theo cả đời.' },
    sampleQuestion: { en: '"What do you hope your grandchildren always remember?"', vi: '"Điều bạn muốn các cháu luôn ghi nhớ là gì?"' },
    color: 'var(--color-lessons)',
  },
} as const;
