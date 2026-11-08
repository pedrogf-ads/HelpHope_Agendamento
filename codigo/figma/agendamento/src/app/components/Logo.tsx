import { useState, useEffect } from "react";

interface LogoProps {
  className?: string;
  style?: React.CSSProperties;
  showText?: boolean;
}

export function Logo({ className = "", style, showText = false }: LogoProps) {
  const [imageError, setImageError] = useState(false);
  const [logoSrc, setLogoSrc] = useState<string | null>(null);

  useEffect(() => {
    // Tenta carregar a imagem real do Figma Asset
    const loadImage = async () => {
      try {
        const module = await import("figma:asset/2865feb247f864e31fdae3c0f4a2406f74e06ed2.png");
        setLogoSrc(module.default);
      } catch {
        setImageError(true);
      }
    };
    
    loadImage();
  }, []);

  // Se a imagem falhar ou não estiver disponível, usa logo SVG inline
  if (imageError || !logoSrc) {
    return (
      <div className={`inline-flex flex-col items-center ${className}`} style={style}>
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-label="HelpHope Logo"
        >
          {/* Coração dividido - lado VERDE (esquerda) */}
          <path
            d="M100 180C100 180 40 140 40 90C40 70 50 55 65 55C80 55 90 65 100 80C100 80 100 55 100 55L100 180Z"
            fill="#4CAF50"
          />
          
          {/* Coração dividido - lado AZUL (direita) */}
          <path
            d="M100 180C100 180 160 140 160 90C160 70 150 55 135 55C120 55 110 65 100 80C100 80 100 55 100 55L100 180Z"
            fill="#5DADE2"
          />
          
          {/* Figura da criança (lado verde) - silhueta branca */}
          <g transform="translate(60, 90)">
            {/* Cabeça */}
            <circle cx="10" cy="0" r="8" fill="white" />
            {/* Corpo */}
            <rect x="6" y="8" width="8" height="18" rx="3" fill="white" />
            {/* Braço levantado */}
            <rect x="14" y="8" width="12" height="5" rx="2.5" fill="white" transform="rotate(-30 14 10)" />
            {/* Braço normal */}
            <rect x="0" y="12" width="6" height="5" rx="2.5" fill="white" />
            {/* Pernas */}
            <rect x="6" y="26" width="4" height="12" rx="2" fill="white" />
            <rect x="10" y="26" width="4" height="12" rx="2" fill="white" />
          </g>
          
          {/* Estrela branca (topo do lado azul) */}
          <path
            d="M135 40L138 48H146L140 53L142 61L135 56L128 61L130 53L124 48H132L135 40Z"
            fill="white"
          />
          
          {/* Mão apoiadora (lado azul) - formato de mão */}
          <g transform="translate(115, 110)">
            <path
              d="M0 0 L5 -2 L10 0 L12 5 L12 15 C12 18 10 20 7 20 L3 20 C0 20 -2 18 -2 15 L-2 5 C-2 2 -1 0 0 0Z"
              fill="white"
              opacity="0.9"
            />
            {/* Dedos */}
            <rect x="1" y="-5" width="2" height="6" rx="1" fill="white" opacity="0.9" />
            <rect x="4" y="-7" width="2" height="8" rx="1" fill="white" opacity="0.9" />
            <rect x="7" y="-5" width="2" height="6" rx="1" fill="white" opacity="0.9" />
          </g>
          
          {/* Contorno do coração */}
          <path
            d="M100 180C100 180 40 140 40 90C40 70 50 55 65 55C80 55 90 65 100 80C110 65 120 55 135 55C150 55 160 70 160 90C160 140 100 180 100 180Z"
            stroke="white"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
          />
          
          {/* Brilho sutil */}
          <circle cx="70" cy="70" r="12" fill="white" opacity="0.15" />
          <circle cx="130" cy="70" r="12" fill="white" opacity="0.15" />
        </svg>
        
        {showText && (
          <div className="mt-3 flex flex-col items-center">
            <div className="flex items-center text-3xl font-bold leading-none">
              <span style={{ color: "#4CAF50" }}>Help</span>
              <span style={{ color: "#5DADE2" }}>Hope</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Cuidar, Apoiar, Acreditar</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-col items-center ${className}`} style={style}>
      <img
        src={logoSrc}
        alt="HelpHope Logo"
        className="w-full h-full object-contain"
        onError={() => setImageError(true)}
      />
    </div>
  );
}

// Componente com texto sempre visível
interface LogoWithTextProps {
  className?: string;
  logoClassName?: string;
  textClassName?: string;
}

export function LogoWithText({ className = "", logoClassName = "", textClassName = "" }: LogoWithTextProps) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <Logo className={logoClassName} />
      <div className="flex flex-col items-center">
        <div className={`flex items-center text-3xl font-bold leading-none ${textClassName}`}>
          <span style={{ color: "#4CAF50" }}>Help</span>
          <span style={{ color: "#5DADE2" }}>Hope</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">Cuidar, Apoiar, Acreditar</p>
      </div>
    </div>
  );
}

// Componente apenas do ícone (sem texto, tamanho pequeno)
export function LogoIcon({ className = "" }: { className?: string }) {
  return <Logo className={className} showText={false} />;
}
