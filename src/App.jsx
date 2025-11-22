import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import { ShoppingBag, Menu, X, ArrowRight, Star, Plus, Minus, Droplet, Shield, Clock, ChevronRight, Mail, MapPin, Phone, Check, Image as ImageIcon } from 'lucide-react';
import './index.css';

/**
 * 10 MIN LABO - FINAL STABLE EDITION (v9)
 * - Hero Section Update: Removed Brand Text (Logo is in Nav)
 * - Hero Button: Moved to bottom center to avoid overlapping the video subject
 */

// --- ASSET LIBRARY ---
const ASSETS = {
  // Hero video sources (ordered by widest device support)
  heroVideoHevc: "/10min-labo-hero-video-hevc.mp4",      // HEVC for modern iOS Safari
  heroVideoMp4: "/10min-labo-hero-video-h264.mp4",        // H.264 1080p fallback
  heroVideoMp4Mobile: "/10min-labo-hero-video-720.mp4",   // H.264 720p lightweight
  heroVideoAv1: "/10min-labo-hero-video.mp4",             // Original AV1 master

  // High-stability fallback image
  heroBg: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",

  productMain: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop",
  productTrial: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=2574&auto=format&fit=crop",
  productSub: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=2580&auto=format&fit=crop",

  textureGold: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
  textureCream: "https://images.unsplash.com/photo-1506617420156-8e4536971650?q=80&w=2670&auto=format&fit=crop",
  lifestyle: "https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=2670&auto=format&fit=crop",
  founder: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2561&auto=format&fit=crop",
  lab: "/assets/lab.jpg",
};

// --- TRANSLATIONS ---
const CONTENT = {
  en: {
    nav: { menu: "MENU", lang: "JP", shop: "SHOP" },
    menuOverlay: {
      home: "Home",
      philosophy: "Philosophy",
      collection: "Collection",
      science: "Science",
      journal: "Journal",
      contact: "Contact"
    },
    // UPDATED HERO: Empty title since we removed the text
    hero: { subtitle: "", title: "", cta: "DISCOVER" },
    marquee: " • 10 MINUTE REVERSE AGING RITUAL • INNOVATIVE 3D NANOTECHNOLOGY",
    intro: { label: "THE MASTERPIECE", title: "Face & Body", sub: "Cream", desc: "A single masterpiece for total regeneration. Penetrates deep into the dermis in just ten minutes. Safe enough for a newborn, powerful enough to reverse time.", cta: "ACQUIRE" },
    philosophy: {
      label: "OUR ORIGIN",
      title: "The Architecture of Time",
      subTitle: "Beyond Skincare",
      p1: "10 min labo was born from a contradiction: we live in an age of acceleration, yet our skin demands patience.",
      p2: "Our founder sought to reconcile these opposing forces. By harnessing Innovative 3D Nanotechnology, we compressed the efficacy of a professional hour-long treatment into a ten-minute daily ritual for both face and body.",
      quote: "\"Safety is the ultimate luxury.\"",
      quoteDesc: "We believe that true power need not be harsh. Our formulas are crafted to be safe enough for a newborn's delicate skin, yet potent enough to reverse the visible signs of aging.",
      founderTitle: "Purposeful Beauty",
      founderName: "Kaori Kimura (K@O)",
      founderMsg: "At Speciality Salon K@O, we pursue beauty with purpose. We believe true radiance comes from the balance of four pillars: Mental, Inner, Outer, and Nutritional Beauty. 10 min labo is the physical manifestation of this philosophy—bringing the professional salon experience into your daily sanctuary.",
      pillars: ["Mental Beauty", "Inner Beauty", "Outer Beauty", "Nutritional Beauty"]
    },
    collection: {
      title: "Collection",
      label: "03 ARTIFACTS",
      items: {
        main: { name: "Reverse Aging Cream", desc: "The Icon. 150g Jar." },
        trial: { name: "Trial Size", desc: "5g Experience." },
        sub: { name: "3-Month Cycle", desc: "Subscription Plan." }
      }
    },
    science: {
      label: "THE LABO",
      title: "Innovative\nAlchemy",
      desc: "We do not merely moisturize; we reconstruct. Our formula is the result of tireless research into the cellular mechanisms of aging.",
      items: [
        { title: "Human Stem Cell", desc: "Derived from the cutting edge of medical science." },
        { title: "Electrolyzed Water", desc: "High sterilization power that protects the skin barrier." },
        { title: "3D Nano Technology", desc: "A patented delivery system." }
      ]
    },
    journal: {
      title: "The Journal",
      posts: [
        { title: "The Art of Slow Beauty", date: "NOV 12, 2025", cat: "PHILOSOPHY" },
        { title: "Understanding Stem Cells", date: "OCT 28, 2025", cat: "SCIENCE" },
        { title: "Osaka's Hidden Lab", date: "OCT 15, 2025", cat: "HERITAGE" },
        { title: "Winter Rituals", date: "SEP 01, 2025", cat: "LIFESTYLE" }
      ]
    },
    contact: {
      label: "CONCIERGE",
      title: "At Your Service",
      desc: "Our dedicated team is available to assist with product recommendations, order inquiries, and skincare consultations.",
      address: "1F BELLFACE AZABUJUBAN\n3-11-6 AZABUJUBAN, MINATO-KU\nTOKYO 106-0045, JAPAN",
      phone: "03-4500-7719",
      email: "CONTACT@NATURANUDY.COM",
      form: { name: "Name", email: "Email", message: "Message", submit: "SEND REQUEST", sending: "SENDING...", successTitle: "Request Received", successDesc: "WE WILL RESPOND SHORTLY" }
    },
    cart: { title: "YOUR SELECTION", empty: "YOUR CART IS EMPTY", subtotal: "SUBTOTAL", checkout: "PROCEED TO CHECKOUT", shipping: "Complimentary shipping via Osaka Bay Logistics." },
    footer: { explore: "EXPLORE", contact: "CONTACT" }
  },
  jp: {
    nav: { menu: "メニュー", lang: "EN", shop: "商品" },
    menuOverlay: {
      home: "ホーム",
      philosophy: "哲学・起源",
      collection: "コレクション",
      science: "サイエンス",
      journal: "ジャーナル",
      contact: "コンシェルジュ"
    },
    hero: { subtitle: "", title: "", cta: "発見する" },
    marquee: " • 10分間のリバースエイジング習慣 • 革新的な3Dナノテクノロジー",
    intro: { label: "最高傑作", title: "フェイス＆ボディ", sub: "クリーム", desc: "わずか10分で真皮層深くまで浸透。新生児にも使えるほどの安全性、時を戻すほどのパワー。全身にお使いいただけます。", cta: "手に入れる" },
    philosophy: {
      label: "起源",
      title: "時の建築学",
      subTitle: "スキンケアを超えて",
      p1: "10 min laboは矛盾から生まれました。加速する時代の中で、肌は忍耐を求めているのです。",
      p2: "創設者はこの相反する力を調和させようとしました。革新的な3Dナノテクノロジーを駆使することで、プロフェッショナルな1時間のトリートメント効果を、10分間の日々の儀式へと凝縮したのです。",
      quote: "「安全性こそ、究極の贅沢」",
      quoteDesc: "真の力は、必ずしも刺激的である必要はありません。私たちの処方は、新生児の繊細な肌にも使えるほど安全でありながら、成熟した肌のエイジングサインを逆転させるほど強力です。これこそが、私たちが極めたパラドックスです。",
      founderTitle: "目的のある美の追求",
      founderName: "木村 香織 (K@O)",
      founderMsg: "Speciality Salon K@Oでは、「精神美・内面美・外面美・栄養美」の4面美を柱に、お客様の輝く人生美に貢献することを目的に運営しております。10 min laboは、サロンで提供するスモールラグジュアリーな体験をご自宅でも体感していただくために生まれました。",
      pillars: ["精神美", "内面美", "外面美", "栄養美"]
    },
    collection: {
      title: "コレクション",
      label: "03 アーティファクト",
      items: {
        main: { name: "リバースエイジングクリーム", desc: "アイコン。150g ジャー。" },
        trial: { name: "トライアルサイズ", desc: "5g お試しサイズ。" },
        sub: { name: "3ヶ月定期便", desc: "サブスクリプション。" }
      }
    },
    science: {
      label: "研究所",
      title: "革新的な\n錬金術",
      desc: "私たちは単に保湿するのではなく、再構築します。私たちの処方は、老化の細胞メカニズムに関する絶え間ない研究の成果です。",
      items: [
        { title: "ヒト幹細胞", desc: "最先端の医療科学から導き出された再生の力。" },
        { title: "特殊電解水", desc: "皮膚バリアを保護する高い殺菌力。" },
        { title: "3Dナノテクノロジー", desc: "特許取得済みのデリバリーシステム。" }
      ]
    },
    journal: {
      title: "ジャーナル",
      posts: [
        { title: "スロービューティーの美学", date: "2025.11.12", cat: "哲学" },
        { title: "幹細胞を理解する", date: "2025.10.28", cat: "サイエンス" },
        { title: "大阪の隠された研究所", date: "2025.10.15", cat: "伝統" },
        { title: "冬の儀式", date: "2025.09.01", cat: "ライフスタイル" }
      ]
    },
    contact: {
      label: "コンシェルジュ",
      title: "お客様のために",
      desc: "専任チームが、製品の推奨、注文に関するお問い合わせ、スキンケアのご相談に対応いたします。",
      address: "〒106-0045\n東京都港区麻布十番3-11-6\nベルファース麻布十番1階",
      phone: "03-4500-7719",
      email: "CONTACT@NATURANUDY.COM",
      form: { name: "お名前", email: "メールアドレス", message: "メッセージ", submit: "リクエスト送信", sending: "送信中...", successTitle: "リクエストを受付", successDesc: "担当者より間もなくご連絡いたします" }
    },
    cart: { title: "ショッピングカート", empty: "カートは空です", subtotal: "小計", checkout: "購入手続きへ", shipping: "大阪ベイロジスティクスより送料無料でお届けします。" },
    footer: { explore: "探索", contact: "お問い合わせ" }
  }
};

// --- LANGUAGE CONTEXT ---
const LanguageContext = createContext();
const useLanguage = () => useContext(LanguageContext);

const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const toggleLang = () => setLang(prev => prev === 'en' ? 'jp' : 'en');

  return (
    <LanguageContext.Provider value={{ lang, t: CONTENT[lang], toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

// --- GLOBAL STYLES ---
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Manrope:wght@200;300;400&family=Shippori+Mincho:wght@400;500&display=swap');

  :root {
    --gold: #d4af37;
    --void: #0a0a0a;
    --cream: #f4f4f4;
    --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  }

  html { scroll-behavior: smooth; }
  body { background-color: var(--cream); color: var(--void); overflow-x: hidden; }

  /* Dynamic Fonts based on Language */
  .lang-en .font-display { font-family: 'Cinzel', serif; }
  .lang-en .font-body { font-family: 'Cormorant Garamond', serif; }
  
  .lang-jp .font-display { font-family: 'Shippori Mincho', serif; letter-spacing: 0.1em; }
  .lang-jp .font-body { font-family: 'Shippori Mincho', serif; }
  
  .font-ui { font-family: 'Manrope', sans-serif; }

  /* Custom Cursor (keeps native cursor visible) */
  .cursor-dot { position: fixed; top: 0; left: 0; width: 6px; height: 6px; background: var(--gold); border-radius: 50%; pointer-events: none; z-index: 9999; transform: translate(-50%, -50%); mix-blend-mode: difference; }
  .cursor-outline { position: fixed; top: 0; left: 0; width: 40px; height: 40px; border: 1px solid var(--gold); border-radius: 50%; pointer-events: none; z-index: 9998; transform: translate(-50%, -50%); transition: all 0.15s ease-out; mix-blend-mode: difference; }
  body:hover .cursor-outline { opacity: 1; }
  .hover-target:hover ~ .cursor-outline { transform: translate(-50%, -50%) scale(1.8); background: rgba(212, 175, 55, 0.1); }

  /* Animations */
  .page-enter { animation: pageEnter 1.2s var(--ease-out-expo) forwards; }
  @keyframes pageEnter { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

  .fade-in-up { animation: fadeInUp 1s var(--ease-out-expo) forwards; opacity: 0; transform: translateY(30px); }
  @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
  
  .reveal-layer { position: absolute; inset: 0; background: var(--void); z-index: 10; transition: height 1.2s var(--ease-out-expo); height: 100%; }
  .is-visible .reveal-layer { height: 0%; }

  .noise { position: fixed; inset: 0; z-index: 90; pointer-events: none; opacity: 0.04; background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); }
  
  .toast-enter { animation: toastEnter 0.5s var(--ease-out-expo) forwards; }
  @keyframes toastEnter { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
`;

// --- UTILS & HOOKS ---
const formatPrice = (price) => {
  return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(price);
};

const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return scrollY;
};

const useInView = (options = { threshold: 0.1 }) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.disconnect(); };
  }, []);
  return [ref, isInView];
};

// --- SHARED COMPONENTS ---

// New SafeImage Component for robust error handling
const SafeImage = ({ src, alt, className }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center bg-[#E5E5E5] text-gray-400 ${className}`}>
        <ImageIcon size={24} className="mb-2 opacity-50" />
        <span className="font-ui text-[10px] tracking-widest uppercase">Image Unavailable: {src}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
};

const CustomCursor = () => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  useEffect(() => {
    const moveCursor = (e) => {
      if (dotRef.current) { dotRef.current.style.left = `${e.clientX}px`; dotRef.current.style.top = `${e.clientY}px`; }
      if (outlineRef.current) { outlineRef.current.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 500, fill: "forwards" }); }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);
  return (<> <div ref={dotRef} className="cursor-dot hidden md:block"></div> <div ref={outlineRef} className="cursor-outline hidden md:block"></div> </>);
};

const Preloader = () => {
  const [active, setActive] = useState(true);
  useEffect(() => { setTimeout(() => setActive(false), 2000); }, []);
  if (!active) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center animate-[slideOut_1s_ease-in-out_1.5s_forwards]">
      <div className="text-center text-[#f4f4f4]">
        <h1 className="font-display text-5xl md:text-7xl tracking-widest animate-[pulse_2s_ease-in-out]">10 MIN</h1>
        <div className="w-full h-[1px] bg-[#d4af37] mt-4 transform scale-x-0 animate-[expandLine_1s_ease-out_0.2s_forwards]"></div>
        <p className="font-ui text-xs tracking-[0.5em] mt-4 opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">OSAKA BAY LABO</p>
      </div>
      <style>{`@keyframes slideOut { to { transform: translateY(-100%); } } @keyframes expandLine { to { transform: scaleX(1); } } @keyframes fadeIn { to { opacity: 1; } }`}</style>
    </div>
  );
};

const Navigation = ({ activePage, onNavigate, onMenuClick, onCartClick, cartCount }) => {
  const { t, toggleLang } = useLanguage();
  const scrollY = useScroll();
  const isScrolled = scrollY > 50;
  const isDark = activePage === 'home' || activePage === 'science' || activePage === 'contact';

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4 bg-[#f4f4f4]/95 backdrop-blur-md text-[#0a0a0a] border-b border-[#0a0a0a]/10' : `py-8 ${isDark ? 'text-[#f4f4f4]' : 'text-[#0a0a0a]'}`}`}>
      <div className="max-w-[1800px] mx-auto px-6 flex justify-between items-center">
        <button onClick={onMenuClick} className="group flex items-center gap-3">
          <Menu size={24} strokeWidth={1} />
          <span className="hidden md:block font-ui text-[10px] tracking-[0.25em] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover:translate-x-0">{t.nav.menu}</span>
        </button>

        <button onClick={() => onNavigate('home')} className={`font-display tracking-[0.2em] transition-all duration-500 ${isScrolled ? 'text-xl' : 'text-2xl'}`}>
          10 MIN LABO
        </button>

        <div className="flex items-center gap-6">
          <button onClick={toggleLang} className="font-ui text-[10px] tracking-[0.25em] hover:text-[#d4af37] transition-colors">{t.nav.lang}</button>
          <button onClick={onCartClick} className="relative group">
            <ShoppingBag size={20} strokeWidth={1} className="group-hover:text-[#d4af37] transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#d4af37] text-[#0a0a0a] text-[8px] font-bold flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

const Footer = ({ onNavigate }) => {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#0a0a0a] text-[#f4f4f4] pt-32 pb-12 px-6 border-t border-white/5">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="md:col-span-2">
            <h2 className="font-display text-4xl tracking-[0.1em] mb-6">10 MIN LABO</h2>
            <p className="font-body text-xl text-gray-500 max-w-md italic">"Science that respects the sanctity of time."</p>
          </div>
          <div>
            <h4 className="font-ui text-[10px] tracking-[0.3em] text-[#d4af37] mb-8">{t.footer.explore}</h4>
            <ul className="space-y-4 font-ui text-xs tracking-widest text-gray-400">
              <li onClick={() => onNavigate('collection')} className="hover:text-white cursor-pointer transition-colors">COLLECTION</li>
              <li onClick={() => onNavigate('philosophy')} className="hover:text-white cursor-pointer transition-colors">PHILOSOPHY</li>
              <li onClick={() => onNavigate('science')} className="hover:text-white cursor-pointer transition-colors">SCIENCE</li>
              <li onClick={() => onNavigate('journal')} className="hover:text-white cursor-pointer transition-colors">JOURNAL</li>
            </ul>
          </div>
          <div>
            <h4 className="font-ui text-[10px] tracking-[0.3em] text-[#d4af37] mb-8">{t.footer.contact}</h4>
            <address className="not-italic font-ui text-xs tracking-widest text-gray-400 space-y-2">
              <p>Speciality Salon K@O</p>
              <p className="whitespace-pre-line">{t.contact.address}</p>
            </address>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex justify-between items-end">
          <p className="font-ui text-[9px] tracking-[0.2em] text-gray-600">© 2025 10 MIN LABO. ALL RIGHTS RESERVED.</p>
          <span className="font-display text-[10rem] leading-[0.8] text-[#1a1a1a] opacity-50 select-none hidden md:block -mb-16 -mr-8">JAPAN</span>
        </div>
      </div>
    </footer>
  )
};

// --- PAGE COMPONENTS ---

const Home = ({ onNavigate, addToCart }) => {
  const { t } = useLanguage();
  const scrollY = useScroll();
  const [ref, inView] = useInView({ threshold: 0.2 });
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showPlayPrompt, setShowPlayPrompt] = useState(false);

  useEffect(() => {
    const attemptPlay = () => {
      if (!videoRef.current) return;
      const vid = videoRef.current;
      vid.muted = true;
      vid.playsInline = true;
      vid.autoplay = true;
      vid
        .play()
        .then(() => setVideoLoaded(true))
        .catch(error => {
          console.log("Video autoplay blocked/failed:", error);
          setVideoLoaded(false);
        });
    };

    attemptPlay();

    const promptTimeout = setTimeout(() => {
      if (!videoLoaded) setShowPlayPrompt(true);
    }, 1500);

    const handleTouchStart = () => attemptPlay();
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') attemptPlay();
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearTimeout(promptTimeout);
      window.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [videoLoaded]);

  return (
    <div className="page-enter">
      {/* Hero with Fallback Architecture */}
      <section className="relative h-screen w-full overflow-hidden bg-[#0a0a0a] text-[#f4f4f4]">

        {/* 1. Base Layer: High-Res Poster Image (Always Visible initially) */}
        <div className="absolute inset-0 w-full h-full animate-[fadeIn_1.2s_ease-out_0.5s_forwards] opacity-0">
          <SafeImage
            src={ASSETS.heroBg}
            className="w-full h-full object-cover"
            alt="Hero Background"
          />
        </div>

        {/* 2. Video Layer: Only visible if loaded and playing */}
        <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            controls={false}
            preload="auto"
            poster={ASSETS.heroBg}
            className="absolute inset-0 w-full h-full object-cover"
            onLoadedData={() => setVideoLoaded(true)}
            onCanPlay={() => setVideoLoaded(true)}
            onError={() => { setVideoError(true); setVideoLoaded(false); }}
          >
            <source src={ASSETS.heroVideoHevc} type='video/mp4; codecs="hvc1"' />
            <source src={ASSETS.heroVideoMp4} type="video/mp4" />
            <source src={ASSETS.heroVideoMp4Mobile} type="video/mp4" media="(max-width: 767px)" />
            <source src={ASSETS.heroVideoAv1} type='video/mp4; codecs="av01.0.04M.08"' />
          </video>
        </div>

        {/* Video fallback notice (only shown if playback fails) */}
        {videoError && (
          <div className="absolute top-4 right-4 z-20 bg-black/60 text-white text-xs px-3 py-2 font-ui rounded">
            Video fallback active
          </div>
        )}

        {/* Tap-to-play prompt for strict mobile autoplay environments */}
        {showPlayPrompt && !videoLoaded && !videoError && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <button
              onClick={() => {
                setShowPlayPrompt(false);
                videoRef.current?.play();
              }}
              className="px-6 py-3 bg-black/70 text-white font-ui text-xs tracking-[0.2em] border border-white/20 rounded-full"
            >
              TAP TO PLAY
            </button>
          </div>
        )}

        {/* 3. Overlay Layer: Ensures text contrast */}
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/30 via-transparent to-black/80 pointer-events-none"></div>

        {/* 4. Content Layer - Updated to remove text and position button at bottom */}
        <div className="relative z-10 h-full flex flex-col justify-end items-center pb-24 px-4">
          <button onClick={() => onNavigate('collection')} className="group border border-white/20 px-10 py-4 flex items-center gap-4 hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-sm bg-black/20">
            <span className="font-ui text-xs tracking-[0.2em]">{t.hero.cta}</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-[#d4af37] py-3 overflow-hidden whitespace-nowrap">
        <div className="animate-[marquee_30s_linear_infinite] inline-block">
          {Array(10).fill(t.marquee).map((text, i) => (
            <span key={i} className="font-ui text-[10px] font-bold tracking-[0.3em] text-[#0a0a0a]">{text}</span>
          ))}
        </div>
        <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      </div>

      {/* Intro Product */}
      <section className="py-32 px-6 bg-[#f4f4f4] text-[#0a0a0a]">
        <div ref={ref} className={`max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="lg:col-span-5 order-2 lg:order-1">
            <span className="block font-ui text-xs tracking-[0.3em] text-[#d4af37] mb-6">{t.intro.label}</span>
            <h2 className="font-display text-5xl md:text-6xl leading-none mb-8">{t.intro.title}<br /><span className="font-body italic text-gray-500">{t.intro.sub}</span></h2>
            <p className="font-body text-lg text-gray-600 leading-relaxed mb-8">{t.intro.desc}</p>
            <div className="flex items-center gap-8">
              <span className="font-display text-2xl">¥19,800</span>
              <button
                onClick={() => addToCart({ id: 1, name: "Reverse Aging Cream", price: 19800, image: ASSETS.productMain, desc: "150g Jar" })}
                className="px-8 py-4 bg-[#0a0a0a] text-white font-ui text-xs tracking-[0.2em] hover:bg-[#d4af37] transition-colors duration-500"
              >
                {t.intro.cta}
              </button>
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2 relative group">
            <div className={`relative aspect-[4/5] overflow-hidden bg-[#EAE8E3] ${inView ? 'is-visible' : ''}`}>
              <div className="reveal-layer"></div>
              <SafeImage src={ASSETS.productMain} alt="Cream" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Philosophy = () => {
  const { t } = useLanguage();
  return (
    <div className="page-enter pt-32 pb-20 bg-[#f4f4f4]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Origin Section */}
        <div className="text-center mb-24">
          <span className="font-ui text-xs tracking-[0.4em] text-[#d4af37]">{t.philosophy.label}</span>
          <h1 className="font-display text-6xl mt-6 mb-12">{t.philosophy.title}</h1>
          {/* IMPROVED DIVIDER: Jewel Style */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-[1px] h-12 bg-[#d4af37]/40"></div>
            <div className="w-2 h-2 border border-[#d4af37] rotate-45"></div>
            <div className="w-[1px] h-12 bg-[#d4af37]/40"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-200">
            <SafeImage
              src={ASSETS.lifestyle}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              alt="Zen Garden"
            />
          </div>
          <div>
            <h3 className="font-display text-3xl mb-6">{t.philosophy.subTitle}</h3>
            <p className="font-body text-xl text-gray-600 leading-loose mb-6">
              {t.philosophy.p1}
            </p>
            <p className="font-body text-xl text-gray-600 leading-loose">
              {t.philosophy.p2}
            </p>
          </div>
        </div>

        {/* Founder Section */}
        <div className="grid md:grid-cols-2 gap-20 items-center mb-32">
          <div className="order-2 md:order-1">
            <span className="font-ui text-xs tracking-[0.4em] text-[#d4af37] block mb-4">{t.philosophy.founderTitle}</span>
            <h3 className="font-display text-4xl mb-6">{t.philosophy.founderName}</h3>
            <p className="font-body text-lg text-gray-600 leading-loose mb-8">
              {t.philosophy.founderMsg}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {t.philosophy.pillars.map((pillar, i) => (
                <div key={i} className="border border-gray-300 p-4 text-center font-ui text-xs tracking-widest text-gray-500 uppercase">
                  {pillar}
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2 relative aspect-square bg-gray-200">
            <SafeImage
              src={ASSETS.founder}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              alt="Founder"
            />
          </div>
        </div>

        {/* Quote Section */}
        <div className="bg-[#0a0a0a] text-[#f4f4f4] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-display text-4xl mb-8">{t.philosophy.quote}</h3>
            <p className="font-ui text-xs tracking-widest leading-loose max-w-2xl mx-auto text-gray-400">
              {t.philosophy.quoteDesc}
            </p>
          </div>
          <img src={ASSETS.textureGold} className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay" alt="Texture" />
        </div>
      </div>
    </div>
  );
};

const Collection = ({ addToCart }) => {
  const { t } = useLanguage();
  // Corrected Product Lineup
  const products = [
    { id: 1, name: t.collection.items.main.name, price: 19800, desc: t.collection.items.main.desc, image: ASSETS.productMain },
    { id: 2, name: t.collection.items.trial.name, price: 680, desc: t.collection.items.trial.desc, image: ASSETS.productTrial },
    { id: 3, name: t.collection.items.sub.name, price: 59400, desc: t.collection.items.sub.desc, image: ASSETS.productSub },
  ];

  return (
    <div className="page-enter pt-32 bg-[#f4f4f4] min-h-screen">
      <div className="max-w-[1800px] mx-auto px-6">
        <div className="flex justify-between items-end mb-20 border-b border-gray-200 pb-8">
          <h1 className="font-display text-5xl md:text-7xl">{t.collection.title}</h1>
          <span className="font-ui text-xs tracking-widest hidden md:block">{t.collection.label}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 border-t border-l border-gray-200">
          {products.map((p) => (
            <div key={p.id} className="group bg-[#f4f4f4] p-8 md:p-12 border-r border-b border-gray-200 hover:bg-white transition-all duration-500 relative overflow-hidden">
              <div className="aspect-[3/4] mb-8 overflow-hidden relative bg-[#f9f9f9]">
                <SafeImage src={p.image} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" alt={p.name} />
                <button
                  onClick={() => addToCart(p)}
                  className="absolute bottom-4 right-4 w-10 h-10 bg-[#0a0a0a] text-white flex items-center justify-center rounded-full translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#d4af37]"
                >
                  <Plus size={16} />
                </button>
              </div>
              <h3 className="font-display text-2xl mb-2">{p.name}</h3>
              <p className="font-ui text-xs text-gray-500 tracking-widest mb-4">{p.desc}</p>
              <p className="font-body text-lg italic text-[#d4af37]">{formatPrice(p.price)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Science = () => {
  const { t } = useLanguage();
  // Use highly reliable assets to avoid broken thumbnails
  const images = [ASSETS.lab, ASSETS.textureGold, ASSETS.productTrial];
  const icons = [Shield, Droplet, Clock];

  return (
    <div className="page-enter bg-[#0a0a0a] text-[#f4f4f4] min-h-screen pt-32">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 mb-32">
          <div>
            <span className="font-ui text-xs tracking-[0.4em] text-[#d4af37]">{t.science.label}</span>
            <h1 className="font-display text-6xl mt-6 mb-12 whitespace-pre-wrap">{t.science.title}</h1>
            <p className="font-body text-xl text-gray-400 leading-relaxed">
              {t.science.desc}
            </p>
          </div>
          <div className="relative aspect-square">
            <SafeImage src={ASSETS.lab} className="w-full h-full object-cover opacity-80" alt="Lab" />
          </div>
        </div>

        <div className="space-y-32 pb-32">
          {t.science.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className={`flex flex-col md:flex-row gap-20 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <Icon size={48} strokeWidth={0.5} className="text-[#d4af37] mb-8" />
                  <h3 className="font-display text-4xl mb-6">{item.title}</h3>
                  <p className="font-body text-lg text-gray-400 leading-loose border-l border-[#d4af37] pl-6">{item.desc}</p>
                </div>
                <div className="flex-1 aspect-video overflow-hidden">
                  <SafeImage src={images[i]} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt={item.title} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

const Journal = () => {
  const { t } = useLanguage();

  return (
    <div className="page-enter pt-32 bg-[#f4f4f4] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6">
        <h1 className="font-display text-6xl mb-20 text-center">{t.journal.title}</h1>
        <div className="space-y-px bg-gray-300 border-t border-b border-gray-300">
          {t.journal.posts.map((post, i) => (
            <div key={i} className="group bg-[#f4f4f4] py-12 flex flex-col md:flex-row justify-between items-center hover:bg-white transition-colors cursor-pointer px-4">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <span className="font-ui text-[10px] tracking-[0.2em] text-[#d4af37] block mb-2">{post.cat}</span>
                <h3 className="font-display text-3xl group-hover:translate-x-4 transition-transform duration-500">{post.title}</h3>
              </div>
              <div className="flex items-center gap-8">
                <span className="font-ui text-xs text-gray-400 tracking-widest">{post.date}</span>
                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  const { t } = useLanguage();
  const [formState, setFormState] = useState('idle'); // idle, submitting, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <div className="page-enter bg-[#0a0a0a] text-[#f4f4f4] min-h-screen pt-32">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20">
        <div>
          <span className="font-ui text-xs tracking-[0.4em] text-[#d4af37]">{t.contact.label}</span>
          <h1 className="font-display text-6xl mt-6 mb-12">{t.contact.title}</h1>
          <p className="font-body text-gray-400 text-lg mb-12">
            {t.contact.desc}
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-6 border-b border-white/10 pb-8">
              <MapPin className="text-[#d4af37]" />
              <div>
                <h4 className="font-display text-xl">Speciality Salon K@O</h4>
                <p className="font-ui text-xs text-gray-500 mt-1 tracking-widest whitespace-pre-line">{t.contact.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 border-b border-white/10 pb-8">
              <Phone className="text-[#d4af37]" />
              <div>
                <h4 className="font-display text-xl">Call Us</h4>
                <p className="font-ui text-xs text-gray-500 mt-1 tracking-widest">{t.contact.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 border-b border-white/10 pb-8">
              <Mail className="text-[#d4af37]" />
              <div>
                <h4 className="font-display text-xl">Email</h4>
                <p className="font-ui text-xs text-gray-500 mt-1 tracking-widest">{t.contact.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#111] p-12 border border-white/5 relative overflow-hidden">
          {formState === 'success' ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#111] animate-[fadeIn_0.5s_ease-out]">
              <Check size={48} className="text-[#d4af37] mb-4" />
              <h3 className="font-display text-2xl mb-2">{t.contact.form.successTitle}</h3>
              <p className="font-ui text-xs text-gray-400 tracking-widest">{t.contact.form.successDesc}</p>
              <button onClick={() => setFormState('idle')} className="mt-8 text-xs underline text-gray-500 hover:text-white">Reset</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={`space-y-8 transition-opacity duration-500 ${formState === 'submitting' ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="space-y-2">
                <label className="font-ui text-[10px] tracking-widest uppercase text-gray-500">{t.contact.form.name}</label>
                <input required type="text" className="w-full bg-transparent border-b border-gray-700 py-4 text-white outline-none focus:border-[#d4af37] transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="font-ui text-[10px] tracking-widest uppercase text-gray-500">{t.contact.form.email}</label>
                <input required type="email" className="w-full bg-transparent border-b border-gray-700 py-4 text-white outline-none focus:border-[#d4af37] transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="font-ui text-[10px] tracking-widest uppercase text-gray-500">{t.contact.form.message}</label>
                <textarea required rows="4" className="w-full bg-transparent border-b border-gray-700 py-4 text-white outline-none focus:border-[#d4af37] transition-colors"></textarea>
              </div>
              <button type="submit" className="w-full bg-[#f4f4f4] text-[#0a0a0a] py-5 font-ui text-xs tracking-[0.3em] hover:bg-[#d4af37] transition-colors">
                {formState === 'submitting' ? t.contact.form.sending : t.contact.form.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// --- OVERLAYS ---

const CartDrawer = ({ isOpen, onClose, cartItems, updateQuantity }) => {
  const { t } = useLanguage();
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <>
      <div className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      <div className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#f4f4f4] z-[70] transform transition-transform duration-700 cubic-bezier(0.19, 1, 0.22, 1) ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col p-8">
          <div className="flex justify-between items-center mb-12">
            <span className="font-ui text-xs tracking-[0.3em] text-[#d4af37]">{t.cart.title}</span>
            <button onClick={onClose}><X className="hover:rotate-90 transition-transform duration-300" /></button>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center flex-col text-center opacity-50">
              <ShoppingBag size={48} strokeWidth={0.5} className="mb-4" />
              <p className="font-ui text-xs tracking-widest">{t.cart.empty}</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-8 scrollbar-hide">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-6">
                  <SafeImage src={item.image} className="w-20 h-24 object-cover bg-gray-200" alt={item.name} />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display text-base mb-1">{item.name}</h4>
                      <p className="font-ui text-[10px] text-gray-500 tracking-widest">{item.desc}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-gray-300 px-2 py-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-[#d4af37]"><Minus size={10} /></button>
                        <span className="mx-3 font-ui text-xs w-3 text-center">{item.qty}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-[#d4af37]"><Plus size={10} /></button>
                      </div>
                      <span className="font-display text-sm">{formatPrice(item.price * item.qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="pt-8 border-t border-gray-200 mt-auto">
              <div className="flex justify-between items-center mb-6">
                <span className="font-ui text-xs tracking-widest">{t.cart.subtotal}</span>
                <span className="font-display text-xl">{formatPrice(subtotal)}</span>
              </div>
              <button className="w-full bg-[#0a0a0a] text-white py-5 font-ui text-xs tracking-[0.3em] hover:bg-[#d4af37] transition-colors">
                {t.cart.checkout}
              </button>
              <p className="text-center font-body text-sm text-gray-400 mt-4 italic">
                {t.cart.shipping}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const MenuOverlay = ({ isOpen, onClose, onNavigate }) => {
  const { t } = useLanguage();
  const menuItems = [
    { id: 'home', label: t.menuOverlay.home },
    { id: 'philosophy', label: t.menuOverlay.philosophy },
    { id: 'collection', label: t.menuOverlay.collection },
    { id: 'science', label: t.menuOverlay.science },
    { id: 'journal', label: t.menuOverlay.journal },
    { id: 'contact', label: t.menuOverlay.contact },
  ];

  return (
    <div className={`fixed inset-0 bg-[#0a0a0a] z-[60] transition-all duration-1000 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      <button onClick={onClose} className="absolute top-8 right-8 text-white hover:rotate-90 transition-transform duration-500"><X size={32} strokeWidth={1} /></button>
      <div className="h-full flex flex-col justify-center items-center space-y-6">
        {menuItems.map((item, i) => (
          <h2
            key={item.id}
            className={`font-display text-4xl md:text-6xl text-[#f4f4f4] hover:text-[#d4af37] cursor-pointer transition-all duration-500 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: `${i * 100}ms` }}
            onClick={() => { onNavigate(item.id); onClose(); }}
          >
            {item.label}
          </h2>
        ))}
      </div>
    </div>
  )
}

const Toast = ({ message, visible }) => {
  if (!visible) return null;
  return (
    <div className="fixed bottom-8 right-8 bg-[#0a0a0a] text-white px-6 py-4 z-[80] toast-enter flex items-center gap-4 shadow-2xl">
      <Check size={16} className="text-[#d4af37]" />
      <span className="font-ui text-xs tracking-widest">{message}</span>
    </div>
  )
}

// --- MAIN APP ---

const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [toast, setToast] = useState(null);
  const { lang } = useLanguage();

  // Scroll to top on page change
  useEffect(() => { window.scrollTo(0, 0); }, [activePage]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setToast(`Added ${product.name}`);
    setIsCartOpen(true);
    setTimeout(() => setToast(null), 3000);
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) return { ...item, qty: Math.max(0, item.qty + delta) };
      return item;
    }).filter(item => item.qty > 0));
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <Home onNavigate={setActivePage} addToCart={addToCart} />;
      case 'philosophy': return <Philosophy />;
      case 'collection': return <Collection addToCart={addToCart} />;
      case 'science': return <Science />;
      case 'journal': return <Journal />;
      case 'contact': return <Contact />;
      default: return <Home onNavigate={setActivePage} addToCart={addToCart} />;
    }
  };

  return (
    <div className={`relative min-h-screen selection:bg-[#d4af37] selection:text-white lang-${lang}`}>
      <style>{styles}</style>
      <div className="noise"></div>
      <CustomCursor />
      <Preloader />

      <Navigation
        activePage={activePage}
        onNavigate={setActivePage}
        onMenuClick={() => setIsMenuOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
        cartCount={cartItems.reduce((acc, item) => acc + item.qty, 0)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
      />

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onNavigate={setActivePage} />
      <Toast message={toast} visible={!!toast} />

      <main>
        <div key={activePage} className="h-full">
          {renderPage()}
        </div>
      </main>

      <Footer onNavigate={setActivePage} />
    </div>
  );
};

// Wrap App with Provider
export default () => (
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
