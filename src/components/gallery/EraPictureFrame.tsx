import React from 'react';

interface EraPictureFrameProps {
  eraId: string;
  isHero?: boolean;
  accentColor: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

// AI-generated museum-grade physical frame texture coordinates & assets for Hero masterpieces
export const HERO_ERA_FRAMES: Record<
  string,
  {
    png: string;
    top: string;
    bottom: string;
    left: string;
    right: string;
    nameZh: string;
    innerRadius?: string;
  }
> = {
  'axial-age': {
    png: '/assets/frames/hero_axial.png',
    top: '30.3%',
    bottom: '30.6%',
    left: '32.5%',
    right: '32.1%',
    nameZh: '古典希腊汉白玉回纹金叶雕花框',
  },
  'hellenistic-medieval': {
    png: '/assets/frames/hero_medieval.png',
    top: '29.5%',
    bottom: '21.7%',
    left: '29.1%',
    right: '29.2%',
    nameZh: '中世纪哥特修道院泥金古栎木尖券框',
    innerRadius: '4px',
  },
  'enlightenment': {
    png: '/assets/frames/hero_enlightenment.png',
    top: '28.2%',
    bottom: '20.8%',
    left: '23.5%',
    right: '23.5%',
    nameZh: '启蒙理性凡尔赛鎏金巴洛克星盘罗盘框',
  },
  'nineteenth-century': {
    png: '/assets/frames/hero_nineteenth.png',
    top: '28.4%',
    bottom: '28.5%',
    left: '30.1%',
    right: '30.2%',
    nameZh: '19世纪工业革命重铸铁六角铆钉黑胡桃木框',
  },
  'twentieth-century': {
    png: '/assets/frames/hero_modern.png',
    top: '23.5%',
    bottom: '23.7%',
    left: '21.9%',
    right: '22.0%',
    nameZh: '20世纪包豪斯拉丝钛钢蒙德里安色块框',
  },
  'modern-twentieth': {
    png: '/assets/frames/hero_modern.png',
    top: '23.5%',
    bottom: '23.7%',
    left: '21.9%',
    right: '22.0%',
    nameZh: '20世纪包豪斯拉丝钛钢蒙德里安色块框',
  },
  'contemporary-future': {
    png: '/assets/frames/hero_contemporary.png',
    top: '28.0%',
    bottom: '23.1%',
    left: '23.0%',
    right: '23.2%',
    nameZh: '当代赛博全息碳纤霓虹HUD视界框',
    innerRadius: '4px',
  },
  'contemporary': {
    png: '/assets/frames/hero_contemporary.png',
    top: '28.0%',
    bottom: '23.1%',
    left: '23.0%',
    right: '23.2%',
    nameZh: '当代赛博全息碳纤霓虹HUD视界框',
    innerRadius: '4px',
  },
};

export const EraPictureFrame: React.FC<EraPictureFrameProps> = ({
  eraId,
  isHero = false,
  accentColor,
  className = '',
  onClick,
  children,
}) => {
  const heroCfg = HERO_ERA_FRAMES[eraId];

  // 1. Hero Masterpiece: Photorealistic AI Museum Frame with Spotlights
  if (isHero && heroCfg) {
    return (
      <div className="relative group/frame flex flex-col items-center select-none">
        {/* =========================================================
            MUSEUM GALLERY CEILING TRACK LIGHT SPOTLIGHT (藏品级物理射灯)
            ========================================================= */}
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-30 select-none">
          {/* Ceiling Rail Clamp */}
          <div className="w-5 h-1.5 bg-zinc-600 rounded-t-sm shadow-sm" />
          {/* Swivel Pivot Arm */}
          <div className="w-1.5 h-3.5 bg-zinc-400" />
          {/* Heavy Metal Track Light Canister with Adjustable Hood */}
          <div className="relative w-8 h-8 rounded-sm bg-gradient-to-b from-zinc-800 via-zinc-900 to-black border border-zinc-500 shadow-xl flex items-end justify-center pb-0.5">
            {/* Glowing Emitter Core */}
            <div
              className="w-6 h-2 rounded-full blur-[1px] transition-colors duration-500"
              style={{
                backgroundColor: accentColor,
                boxShadow: `0 0 16px ${accentColor}, 0 0 30px #ffffff`,
              }}
            />
          </div>

          {/* Authentic Conical Volumetric Light Cone Beam */}
          <div
            className="w-0 h-0 border-l-[140px] border-l-transparent border-r-[140px] border-r-transparent border-b-[380px] pointer-events-none mix-blend-screen opacity-30"
            style={{
              borderBottomColor: accentColor,
              filter: 'blur(22px)',
              transform: 'translateY(-10px)',
            }}
          />
        </div>

        {/* Hero Physical Frame Outer Container */}
        <div
          onClick={onClick}
          className={`relative w-[210px] sm:w-[230px] aspect-[3/4] max-h-[300px] cursor-pointer transition-transform duration-500 hover:scale-[1.02] filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] ${className}`}
        >
          {/* Layer 0: Philosopher Oil Painting nestled inside transparent cutout */}
          <div
            className="absolute overflow-hidden z-0"
            style={{
              top: heroCfg.top,
              bottom: heroCfg.bottom,
              left: heroCfg.left,
              right: heroCfg.right,
              borderRadius: heroCfg.innerRadius || '0px',
            }}
          >
            {children}
            {/* Inner canvas edge bevel shadow */}
            <div className="absolute inset-0 shadow-[inset_0_0_14px_rgba(0,0,0,0.85)] pointer-events-none z-10" />
          </div>

          {/* Layer 1: Photorealistic Bespoke Physical Frame Asset (AI-Generated Ultra HD PNG) */}
          <img
            src={heroCfg.png}
            alt={heroCfg.nameZh}
            className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10 select-none"
            loading="eager"
          />

          {/* Layer 2: Museum Glass Glaze Reflection & Surface Sheen */}
          <div
            className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-500 group-hover/frame:opacity-80"
            style={{
              background:
                'radial-gradient(ellipse at 50% 15%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.06) 45%, transparent 75%)',
              mixBlendMode: 'overlay',
            }}
          />
        </div>
      </div>
    );
  }

  // 2. Secondary & Salon Paintings: Airy Outer Gallery Frame (外框 + 留白空气感)
  // Clean passe-partout mat board that surrounds the portrait from the OUTSIDE,
  // leaving the portrait itself 100% pristine with NO claustrophobic inner lines!
  const getOuterTheme = () => {
    switch (eraId) {
      case 'axial-age':
        return {
          matBg: 'bg-gradient-to-b from-[#181a20] to-[#0c0d10]',
          outerBorder: 'border-[1.5px] border-[#d4a359]/40',
          shadow: 'shadow-[0_12px_28px_rgba(0,0,0,0.85)] hover:shadow-[0_14px_34px_rgba(212,163,89,0.3)]',
        };
      case 'hellenistic-medieval':
        return {
          matBg: 'bg-gradient-to-b from-[#1a1524] to-[#0d0a14]',
          outerBorder: 'border-[1.5px] border-[#c88a2e]/50',
          shadow: 'shadow-[0_12px_28px_rgba(0,0,0,0.85)] hover:shadow-[0_14px_34px_rgba(200,138,46,0.3)]',
        };
      case 'enlightenment':
        return {
          matBg: 'bg-gradient-to-b from-[#131f36] to-[#091120]',
          outerBorder: 'border-[1.5px] border-[#d97736]/50',
          shadow: 'shadow-[0_12px_28px_rgba(0,0,0,0.85)] hover:shadow-[0_14px_34px_rgba(217,119,54,0.3)]',
        };
      case 'nineteenth-century':
        return {
          matBg: 'bg-gradient-to-b from-[#220e14] to-[#120609]',
          outerBorder: 'border-[1.5px] border-[#b83a4b]/50',
          shadow: 'shadow-[0_12px_28px_rgba(0,0,0,0.9)] hover:shadow-[0_14px_34px_rgba(184,58,75,0.3)]',
        };
      case 'twentieth-century':
      case 'modern-twentieth':
        return {
          matBg: 'bg-gradient-to-b from-[#141b2c] to-[#080d17]',
          outerBorder: 'border-[1.5px] border-[#3b82c4]/40',
          shadow: 'shadow-[0_12px_28px_rgba(0,0,0,0.85)] hover:shadow-[0_14px_34px_rgba(59,130,196,0.3)]',
        };
      case 'contemporary-future':
      case 'contemporary':
      default:
        return {
          matBg: 'bg-gradient-to-b from-[#081a24] to-[#02090e]',
          outerBorder: 'border-[1.5px] border-[#0ea5b7]/55',
          shadow: 'shadow-[0_12px_28px_rgba(0,0,0,0.9)] hover:shadow-[0_14px_34px_rgba(14,165,183,0.35)]',
        };
    }
  };

  const renderOuterAccents = () => {
    switch (eraId) {
      case 'axial-age':
        // Greek Doric Meander Motifs on Outer Frame Corners
        return (
          <>
            <svg className="absolute -top-0.5 -left-0.5 w-4 h-4 pointer-events-none z-20" viewBox="0 0 16 16">
              <path d="M1,15 L15,15 L15,1 L1,1 L1,10 L10,10 L10,5 L5,5" fill="none" stroke="#d4a359" strokeWidth="1.2" />
            </svg>
            <svg className="absolute -top-0.5 -right-0.5 w-4 h-4 pointer-events-none z-20 scale-x-[-1]" viewBox="0 0 16 16">
              <path d="M1,15 L15,15 L15,1 L1,1 L1,10 L10,10 L10,5 L5,5" fill="none" stroke="#d4a359" strokeWidth="1.2" />
            </svg>
            <svg className="absolute -bottom-0.5 -left-0.5 w-4 h-4 pointer-events-none z-20 scale-y-[-1]" viewBox="0 0 16 16">
              <path d="M1,15 L15,15 L15,1 L1,1 L1,10 L10,10 L10,5 L5,5" fill="none" stroke="#d4a359" strokeWidth="1.2" />
            </svg>
            <svg className="absolute -bottom-0.5 -right-0.5 w-4 h-4 pointer-events-none z-20 scale-[-1]" viewBox="0 0 16 16">
              <path d="M1,15 L15,15 L15,1 L1,1 L1,10 L10,10 L10,5 L5,5" fill="none" stroke="#d4a359" strokeWidth="1.2" />
            </svg>
          </>
        );

      case 'hellenistic-medieval':
        // Monastic Gilded Rosette Studs on 4 Outer Corners
        return (
          <>
            <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-amber-400 border border-amber-900 shadow-[0_0_5px_#c88a2e] z-20 pointer-events-none" />
            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 border border-amber-900 shadow-[0_0_5px_#c88a2e] z-20 pointer-events-none" />
            <div className="absolute bottom-1 left-1 w-2 h-2 rounded-full bg-amber-400 border border-amber-900 shadow-[0_0_5px_#c88a2e] z-20 pointer-events-none" />
            <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-amber-400 border border-amber-900 shadow-[0_0_5px_#c88a2e] z-20 pointer-events-none" />
          </>
        );

      case 'enlightenment':
        // Cartesian Astrolabe Precision Tick Markers on Outer Top Edge
        return (
          <>
            <div className="absolute top-0 inset-x-3 h-1 flex justify-between pointer-events-none z-20 opacity-60">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`w-[1px] bg-amber-400 ${i % 2 === 0 ? 'h-1' : 'h-0.5'}`} />
              ))}
            </div>
            <svg className="absolute top-0.5 left-0.5 w-3 h-3 pointer-events-none z-20" viewBox="0 0 12 12">
              <path d="M0,0 L12,0 M0,0 L0,12" stroke="#d97736" strokeWidth="1.2" fill="none" />
            </svg>
            <svg className="absolute top-0.5 right-0.5 w-3 h-3 pointer-events-none z-20 scale-x-[-1]" viewBox="0 0 12 12">
              <path d="M0,0 L12,0 M0,0 L0,12" stroke="#d97736" strokeWidth="1.2" fill="none" />
            </svg>
          </>
        );

      case 'nineteenth-century':
        // Heavy Forged Iron Corner Gusset Plates on Outer Frame
        return (
          <>
            <svg className="absolute top-0 left-0 w-4 h-4 pointer-events-none z-20" viewBox="0 0 16 16">
              <polygon points="0,0 16,0 0,16" fill="#3a161e" stroke="#b83a4b" strokeWidth="1" />
              <circle cx="5" cy="5" r="1.5" fill="#b83a4b" />
            </svg>
            <svg className="absolute top-0 right-0 w-4 h-4 pointer-events-none z-20 scale-x-[-1]" viewBox="0 0 16 16">
              <polygon points="0,0 16,0 0,16" fill="#3a161e" stroke="#b83a4b" strokeWidth="1" />
              <circle cx="5" cy="5" r="1.5" fill="#b83a4b" />
            </svg>
            <svg className="absolute bottom-0 left-0 w-4 h-4 pointer-events-none z-20 scale-y-[-1]" viewBox="0 0 16 16">
              <polygon points="0,0 16,0 0,16" fill="#3a161e" stroke="#b83a4b" strokeWidth="1" />
              <circle cx="5" cy="5" r="1.5" fill="#b83a4b" />
            </svg>
            <svg className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none z-20 scale-[-1]" viewBox="0 0 16 16">
              <polygon points="0,0 16,0 0,16" fill="#3a161e" stroke="#b83a4b" strokeWidth="1" />
              <circle cx="5" cy="5" r="1.5" fill="#b83a4b" />
            </svg>
          </>
        );

      case 'twentieth-century':
      case 'modern-twentieth':
        // Bauhaus & Mondrian Primary Enamel Square Accents on Outer Frame
        return (
          <>
            <div className="absolute top-0 left-0 w-2.5 h-2.5 bg-blue-600 z-20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-red-600 z-20 pointer-events-none" />
          </>
        );

      case 'contemporary-future':
      case 'contemporary':
      default:
        // Cyber HUD Targeting Brackets on Outer Frame Corners
        return (
          <>
            <svg className="absolute top-0.5 left-0.5 w-3.5 h-3.5 pointer-events-none z-20" viewBox="0 0 14 14">
              <path d="M1,9 L1,1 L9,1" fill="none" stroke="#0ea5b7" strokeWidth="1.8" strokeLinecap="square" />
            </svg>
            <svg className="absolute top-0.5 right-0.5 w-3.5 h-3.5 pointer-events-none z-20 scale-x-[-1]" viewBox="0 0 14 14">
              <path d="M1,9 L1,1 L9,1" fill="none" stroke="#0ea5b7" strokeWidth="1.8" strokeLinecap="square" />
            </svg>
            <svg className="absolute bottom-0.5 left-0.5 w-3.5 h-3.5 pointer-events-none z-20 scale-y-[-1]" viewBox="0 0 14 14">
              <path d="M1,9 L1,1 L9,1" fill="none" stroke="#0ea5b7" strokeWidth="1.8" strokeLinecap="square" />
            </svg>
            <svg className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 pointer-events-none z-20 scale-[-1]" viewBox="0 0 14 14">
              <path d="M1,9 L1,1 L9,1" fill="none" stroke="#0ea5b7" strokeWidth="1.8" strokeLinecap="square" />
            </svg>
          </>
        );
    }
  };

  const outerTheme = getOuterTheme();

  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer transition-all duration-300 group/frame select-none shrink-0 overflow-hidden ${className}`}
    >
      {/* Outer Frame Box with Passe-Partout Mat (空气感留白衬底) */}
      <div
        className={`relative w-full h-full p-1.5 sm:p-2 rounded-sm transition-all duration-300 ${outerTheme.matBg} ${outerTheme.outerBorder} ${outerTheme.shadow} flex flex-col`}
      >
        {/* Era Architectural Hardware on Outer Bezel Corners */}
        {renderOuterAccents()}

        {/* Clean Inner Portrait - Strictly Bounded & Cropped to Frame */}
        <div className="relative w-full h-full min-h-0 flex-1 overflow-hidden rounded-[2px] shadow-[0_2px_8px_rgba(0,0,0,0.65)] bg-black">
          <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
            {children}
          </div>

          {/* Gentle Museum Glass Sheen */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30 group-hover/frame:opacity-60 transition-opacity duration-300"
            style={{
              background:
                'linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, transparent 45%, rgba(0, 0, 0, 0.25) 100%)',
              mixBlendMode: 'overlay',
            }}
          />
        </div>
      </div>
    </div>
  );
};
