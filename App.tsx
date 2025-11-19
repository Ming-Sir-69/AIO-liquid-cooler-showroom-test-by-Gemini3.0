import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { 
  Moon, Sun, ChevronLeft, Thermometer, Activity, 
  Zap, Wind, Droplet, Gauge, Globe, X
} from 'lucide-react';
import { BRANDS, CONTENT } from './constants';
import { Language, Product } from './types';

// --- Paper Plane Cursor with Dotted Trail & Delayed Hover ---

const PaperPlaneCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [angle, setAngle] = useState(45); // Start angled
  const [trail, setTrail] = useState<{x: number, y: number, id: number, rotation: number}[]>([]);
  const [scraps, setScraps] = useState<{x: number, y: number, id: number, rot: number}[]>([]);
  const [isHoveringLongEnough, setIsHoveringLongEnough] = useState(false);
  
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevPos = useRef({ x: 0, y: 0 });
  const lastAnglePos = useRef({ x: 0, y: 0 }); // To dampen rotation sensitivity
  const requestRef = useRef<number>(0);
  const trailCounter = useRef(0);
  const scrapCounter = useRef(0);

  // Smooth movement but no "magnetic" snap
  const springConfig = { damping: 25, stiffness: 500, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      cursorX.set(clientX);
      cursorY.set(clientY);

      // --- Rotation Logic (Dampened) ---
      const distFromLastAngleUpdate = Math.hypot(
        clientX - lastAnglePos.current.x,
        clientY - lastAnglePos.current.y
      );

      // Only rotate if moved more than 20px to prevent jitter
      if (distFromLastAngleUpdate > 20) {
        const dx = clientX - prevPos.current.x;
        const dy = clientY - prevPos.current.y;
        // Calculate angle
        const theta = Math.atan2(dy, dx) * (180 / Math.PI);
        setAngle(theta + 90); // +90 to align SVG pointing up
        lastAnglePos.current = { x: clientX, y: clientY };
      }
      
      prevPos.current = { x: clientX, y: clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.clickable')) {
        // Start timer for 3 seconds
        if (!hoverTimerRef.current) {
          hoverTimerRef.current = setTimeout(() => {
            setIsHoveringLongEnough(true);
          }, 3000);
        }
      } else {
        // Reset if moved off
        if (hoverTimerRef.current) {
          clearTimeout(hoverTimerRef.current);
          hoverTimerRef.current = null;
        }
        setIsHoveringLongEnough(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, [cursorX, cursorY]);

  // Loop for Trail and Scraps
  useEffect(() => {
    const animate = () => {
      const cx = cursorX.get();
      const cy = cursorY.get();

      // --- Dashed Trail ---
      // Only add trail dot if moved enough to avoid clumping
      if (trail.length === 0 || Math.hypot(cx - trail[trail.length-1].x, cy - trail[trail.length-1].y) > 25) {
        trailCounter.current++;
        setTrail(prev => [...prev.slice(-20), { x: cx, y: cy, id: trailCounter.current, rotation: angle }]);
      }

      // --- Falling Scraps (Reduced Frequency) ---
      // Only if hovered for > 3 seconds and random chance is very low (rare drops)
      if (isHoveringLongEnough && Math.random() > 0.96) {
        scrapCounter.current++;
        setScraps(prev => [...prev.slice(-10), { 
          x: cx + (Math.random() * 20 - 10), 
          y: cy, 
          id: scrapCounter.current,
          rot: Math.random() * 360 
        }]);
      }

      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isHoveringLongEnough, cursorX, cursorY, angle, trail]);

  return (
    <>
      {/* Dashed Trail */}
      {trail.map(t => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 1.5 }}
          // Dashed line segment look
          className="fixed w-2 h-1 bg-amber-200/50 pointer-events-none z-[9998]"
          style={{ 
            left: t.x, 
            top: t.y, 
            transform: `translate(-50%, -50%) rotate(${t.rotation - 90}deg)` 
          }}
        />
      ))}

      {/* Falling Scraps */}
      {scraps.map(s => (
        <motion.div
          key={s.id}
          initial={{ opacity: 1, y: s.y, x: s.x, rotate: s.rot }}
          animate={{ 
            opacity: 0, 
            y: s.y + 100, // Drop distance
            x: s.x + (Math.random() * 40 - 20), // Drift
            rotate: s.rot + 180 
          }}
          transition={{ duration: 1.5, ease: "linear" }}
          className="fixed w-1.5 h-1.5 bg-white pointer-events-none z-[9998]"
        />
      ))}

      {/* The Plane - Smaller Size */}
      <motion.div
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ rotate: angle }}
        transition={{ rotate: { duration: 0.3, ease: "easeOut" } }}
        className="fixed top-0 left-0 z-[9999] pointer-events-none filter drop-shadow-lg"
      >
        {/* Yellow Paper Plane SVG */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
           {/* Main Body */}
           <path d="M12 2L22 21L12 17L2 21L12 2Z" fill="#FCD34D" />
           {/* Fold Shadow/Crease */}
           <path d="M12 2L12 17L22 21L12 2Z" fill="#F59E0B" />
        </svg>
      </motion.div>
    </>
  );
};

// --- Components ---

const Button = ({ children, onClick, className = '', variant = 'primary' }: { children: React.ReactNode, onClick: () => void, className?: string, variant?: 'primary' | 'secondary' }) => {
  return (
    <button
      onClick={onClick}
      className={`clickable relative px-6 py-3 font-bold tracking-wider uppercase overflow-hidden group transition-all duration-200 ${
        variant === 'primary' 
          ? 'border-2 border-white text-white hover:bg-white hover:text-black' 
          : 'bg-white text-black hover:bg-gray-200'
      } ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2 justify-center">
        {children}
      </span>
    </button>
  );
};

const ProductCard = ({ product, language, theme, onSelect }: { product: Product, language: Language, theme: 'light' | 'dark', onSelect: (p: Product) => void }) => {
  
  // Flip Animation Variants with EXAGGERATED Wobble
  const flipVariants = {
    dark: {
      rotateY: 0,
      transition: {
        rotateY: {
          keyframes: [180, 0, 25, -15, 5, 0], // Bigger swing angles
          duration: 1.5,
          times: [0, 0.4, 0.6, 0.75, 0.9, 1],
          ease: "easeInOut"
        }
      }
    },
    light: {
      rotateY: 180,
      transition: {
        rotateY: {
          keyframes: [0, 180, 155, 195, 175, 180], // Bigger swing angles around 180
          duration: 1.5,
          times: [0, 0.4, 0.6, 0.75, 0.9, 1],
          ease: "easeInOut"
        }
      }
    }
  };

  return (
    <motion.div
      className="clickable relative h-96 w-full perspective-2000 group"
      whileHover={{ z: 60, scale: 1.02 }} // Slight scale, no magnetic
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={() => onSelect(product)}
    >
      <motion.div
        className="w-full h-full relative transform-style-3d shadow-2xl"
        initial={false}
        animate={theme === 'dark' ? 'dark' : 'light'}
        variants={flipVariants}
      >
        {/* FRONT FACE (Dark Mode) */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-black border border-gray-700 overflow-hidden">
           <ProductFace product={product} language={language} mode="dark" />
        </div>

        {/* BACK FACE (Light Mode) */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white border border-gray-300 overflow-hidden rotate-y-180">
           <ProductFace product={product} language={language} mode="light" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProductFace = ({ product, language, mode }: { product: Product, language: Language, mode: 'light' | 'dark' }) => (
  <>
    <img
      src={`https://picsum.photos/seed/${product.imageSeed}/600/800`}
      alt={product.name}
      className="absolute inset-0 w-full h-full object-cover opacity-90" // Higher opacity for product bg
    />
    {/* Gradient & Overlay */}
    <div className={`absolute inset-0 z-10 ${
      mode === 'dark' 
        ? 'bg-gradient-to-t from-black via-black/60 to-transparent' 
        : 'bg-gradient-to-t from-white via-white/60 to-transparent'
    }`} />
    
    {/* Content */}
    <div className={`absolute bottom-0 left-0 w-full p-6 z-30 flex flex-col items-start ${mode === 'dark' ? 'text-white' : 'text-black'}`}>
      <h3 className="text-3xl font-black uppercase italic tracking-tighter drop-shadow-lg mb-1">
        {product.name}
      </h3>
      <div className="w-full flex justify-between items-end">
        <p className={`text-xl font-mono font-bold drop-shadow-md ${mode === 'dark' ? 'text-neon-blue' : 'text-deep-purple'}`}>
          {product.price[language]}
        </p>
        <div className={`px-3 py-1 text-xs font-bold uppercase ${
          mode === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
        }`}>
          {CONTENT.product.viewSpecs[language]}
        </div>
      </div>
    </div>

    {/* Decorative Lines */}
    <div className={`absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 z-20 transition-all duration-500 ${
      mode === 'dark' ? 'border-white/30' : 'border-black/30'
    }`} />
  </>
);

const SpecItem = ({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) => (
  <div className="flex items-center justify-between border-b border-white/20 py-3 hover:bg-white/5 px-2 transition-colors">
    <span className="flex items-center gap-3 font-bold opacity-70">{icon} {label}</span>
    <span className="text-right font-mono font-bold">{value}</span>
  </div>
);

const ProductDetailModal = ({ product, language, onClose }: { product: Product, language: Language, onClose: () => void }) => {
  if (!product) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 lg:p-12 overflow-y-auto"
    >
      <div className="relative w-full max-w-7xl bg-cyber-gray border border-white/10 shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[80vh]">
        <button 
          onClick={onClose}
          className="clickable absolute top-6 right-6 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-white hover:text-black transition-colors"
        >
          <X size={24} />
        </button>

        {/* Image Section */}
        <div className="lg:w-1/2 relative bg-black">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 animate-pulse" />
          <img 
            src={`https://picsum.photos/seed/${product.imageSeed}/1000/1000`} 
            alt={product.name}
            className="relative z-10 w-full h-full object-contain p-12"
          />
        </div>

        {/* Specs Section */}
        <div className="lg:w-1/2 p-8 lg:p-12 bg-cyber-gray text-white flex flex-col">
          <div className="mb-8">
            <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              {product.name}
            </h2>
            <p className="text-2xl font-mono text-neon-blue">{product.price[language]}</p>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
             <h3 className="text-lg uppercase font-bold border-b-2 border-white mb-6 pb-2 flex items-center gap-2">
               <Activity className="text-neon-pink" />
               {CONTENT.product.specsTitle[language]}
             </h3>

             <div className="grid grid-cols-1 gap-y-2 text-sm">
                <SpecItem label="Dimensions" value={product.specs.dimensions} icon={<Gauge size={16} />} />
                <SpecItem label="Weight" value={product.specs.weight} icon={<Droplet size={16} />} />
                <SpecItem label="Work Temp" value={product.specs.workTemp} icon={<Thermometer size={16} />} />
                <SpecItem label="Voltage" value={product.specs.voltage} icon={<Zap size={16} />} />
                <SpecItem label="Current" value={product.specs.current} icon={<Zap size={16} />} />
                <SpecItem label="Fan Speed" value={product.specs.fanSpeed} icon={<Wind size={16} />} />
                <SpecItem label="Pump Speed" value={product.specs.pumpSpeed} icon={<Activity size={16} />} />
                <SpecItem label="Coolant Conc." value={product.specs.coolantConcentration} icon={<Droplet size={16} />} />
                <SpecItem label="Freezing Point" value={product.specs.coolantFreezingPoint} icon={<Thermometer size={16} />} />
                <SpecItem label="Coolant PH" value={product.specs.coolantPH} icon={<Activity size={16} />} />
             </div>
          </div>
          
          <div className="mt-8">
            <Button onClick={onClose} variant="secondary" className="w-full">
               <ChevronLeft size={16} className="mr-2" /> {CONTENT.nav.back[language]}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FixedControls = ({ 
  theme, 
  language, 
  toggleTheme, 
  setLanguage 
}: { 
  theme: 'light' | 'dark', 
  language: Language, 
  toggleTheme: () => void, 
  setLanguage: (l: Language) => void 
}) => (
  <div className="fixed top-6 right-6 z-[60] flex flex-col gap-4 items-end">
    <div className="bg-black/50 backdrop-blur-md p-2 rounded-lg border border-white/20 flex gap-2">
      {Object.values(Language).map((lang) => (
         <button 
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`clickable px-3 py-1 text-sm font-bold rounded transition-colors ${
            language === lang 
              ? 'bg-neon-blue text-black' 
              : 'text-white hover:bg-white/10'
          }`}
         >
           {lang}
         </button>
      ))}
    </div>
    <button
      onClick={toggleTheme}
      className="clickable p-4 bg-black/50 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-colors shadow-xl"
    >
      {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  </div>
);

const App: React.FC = () => {
  const [activeBrandId, setActiveBrandId] = useState<string>(BRANDS[0].id);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [language, setLanguage] = useState<Language>(Language.EN);
  
  const activeBrand = BRANDS.find(b => b.id === activeBrandId) || BRANDS[0];

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`flex h-screen w-full overflow-hidden transition-colors duration-700 ease-in-out ${
      theme === 'dark' ? 'bg-cyber-black text-white' : 'bg-concrete-gray text-slate-900'
    }`}>
      <PaperPlaneCursor />
      <FixedControls theme={theme} language={language} toggleTheme={toggleTheme} setLanguage={setLanguage} />

      {/* Sidebar Navigation - Brands Only */}
      <aside className={`
        relative z-40 w-20 md:w-72 h-full flex flex-col border-r shadow-2xl transition-colors duration-700
        ${theme === 'dark' ? 'bg-black border-white/10' : 'bg-white border-gray-300'}
      `}>
        <div className="p-6 md:p-8 border-b border-current opacity-90">
           {/* Title - Changes with Theme */}
           <h1 className={`hidden md:block text-3xl font-black italic tracking-tighter transition-colors duration-700 ${
             theme === 'dark' ? 'text-white' : 'text-black'
           }`}>
             AIO LIQUID COOLER
           </h1>
           <h1 className={`md:hidden text-center text-xl font-black ${
             theme === 'dark' ? 'text-white' : 'text-black'
           }`}>AIO</h1>
        </div>

        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          {BRANDS.map((brand) => (
            <button
              key={brand.id}
              onClick={() => setActiveBrandId(brand.id)}
              className={`clickable w-full text-left px-4 md:px-8 py-4 md:py-5 relative group transition-all duration-300 ${
                activeBrandId === brand.id 
                  ? theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-900'
              }`}
            >
              <span className={`
                block text-sm md:text-xl font-black uppercase tracking-wider
                ${activeBrandId === brand.id ? 'scale-105 translate-x-2' : 'group-hover:translate-x-2'}
                transition-transform
              `}>
                {brand.name[language]}
              </span>
              {activeBrandId === brand.id && (
                <div className="absolute right-0 top-0 h-full w-1.5 bg-neon-pink" />
              )}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative perspective-2000">
        {/* Dynamic Background Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden transition-all duration-1000">
           <img 
              src={`https://picsum.photos/seed/${activeBrand.bgSeed}/1920/1080`} 
              className="w-full h-full object-cover blur-sm scale-105 transition-opacity duration-700"
              style={{ opacity: theme === 'dark' ? 0.7 : 0.8 }} // Increased Opacity
              alt="bg"
           />
           {/* Mode Overlay - Lighter to show BG more */}
           <div className={`absolute inset-0 transition-colors duration-700 ${
             theme === 'dark' 
               ? 'bg-black/40' 
               : 'bg-white/50 mix-blend-overlay' 
           }`}></div>
           {/* Gradient for Text Readability at bottom/top */}
           <div className={`absolute inset-0 bg-gradient-to-r transition-colors duration-700 ${
             theme === 'dark'
               ? 'from-black/70 via-transparent to-black/60'
               : 'from-white/70 via-transparent to-white/60'
           }`}></div>
        </div>

        {/* Scrollable Content */}
        <div className="relative z-10 h-full overflow-y-auto p-6 md:p-12 custom-scrollbar">
          <div className="max-w-7xl mx-auto pt-12">
            
            {/* Brand Header */}
            <div className="mb-16 relative">
               <h2 className={`text-[4rem] md:text-[8rem] font-black uppercase leading-none tracking-tighter absolute -top-12 left-0 select-none pointer-events-none transition-colors duration-700 ${
                 theme === 'dark' 
                   ? 'text-transparent bg-clip-text bg-gradient-to-b from-white to-white/0 opacity-20' 
                   : 'text-gray-900 opacity-10'
               }`}>
                 {activeBrand.name[Language.EN]}
               </h2>
               <h2 className={`text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 glitch-text relative z-10 transition-colors duration-700 ${theme === 'dark' ? 'text-white' : 'text-black'}`} data-text={activeBrand.name[language]}>
                 {activeBrand.name[language]}
               </h2>
               <div className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-widest mb-6 transition-colors duration-700 ${theme === 'dark' ? 'bg-neon-blue text-black' : 'bg-black text-white'}`}>
                 <Globe size={14} /> {activeBrand.origin}
               </div>
               <p className={`max-w-2xl text-xl md:text-2xl font-bold transition-colors duration-700 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'} drop-shadow-md`}>
                 {activeBrand.description[language]}
               </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
              {activeBrand.products.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  language={language}
                  theme={theme}
                  onSelect={setSelectedProduct} 
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal 
            product={selectedProduct} 
            language={language} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;