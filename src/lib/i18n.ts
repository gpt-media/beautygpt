// i18n.ts — in-language UI strings keyed by lang ('en'|'ms'|'zh').
//
// This site renders one language per page (lang prop). These are the strings the feature set
// needs: the AEO quick-answer label, the E-E-A-T "Reviewed by" label, and the newsletter copy.
// Newsletter copy reuses the reference site's en / ms / zh-Hans values verbatim (skincare brand
// name aside).

export type Lang = 'en' | 'ms' | 'zh';

export const UI: Record<Lang, Record<string, string>> = {
  en: {
    quickAnswer: 'Quick answer',
    metaReviewed: 'Reviewed by',
    footerPrivacy: 'Privacy',
    nlHeading: 'Get the evidence, not the hype.',
    nlSub: 'Occasional, plain-English skincare answers in your inbox. No spam.',
    nlPlaceholder: 'Your email',
    nlButton: 'Subscribe',
    nlPrivacy: 'We respect your inbox. Unsubscribe anytime. See our Privacy page.',
  },
  ms: {
    quickAnswer: 'Jawapan ringkas',
    metaReviewed: 'Disemak oleh',
    footerPrivacy: 'Privasi',
    nlHeading: 'Dapatkan bukti, bukan hype.',
    nlSub: 'Jawapan penjagaan kulit ringkas sekali-sekala ke peti masuk anda. Tiada spam.',
    nlPlaceholder: 'E-mel anda',
    nlButton: 'Langgan',
    nlPrivacy: 'Kami hormati peti masuk anda. Berhenti langgan bila-bila masa. Lihat halaman Privasi kami.',
  },
  zh: {
    quickAnswer: '快速解答',
    metaReviewed: '审核',
    footerPrivacy: '隐私',
    nlHeading: '只给证据，不夸大。',
    nlSub: '偶尔把通俗易懂的护肤解答发到你的邮箱。绝不发垃圾邮件。',
    nlPlaceholder: '你的邮箱',
    nlButton: '订阅',
    nlPrivacy: '我们尊重你的邮箱，可随时取消订阅。详见隐私页面。',
  },
};
