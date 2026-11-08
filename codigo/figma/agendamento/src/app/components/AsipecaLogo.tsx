import React from "react";
import asipecaLogo from "../../imports/Asipeca_logo-4.jpg";

interface AsipecaLogoProps {
  className?: string;
}

/**
 * Logo da ONG ASIPECA
 * Usado exclusivamente no perfil institucional
 */
export function AsipecaLogo({ className = "h-16" }: AsipecaLogoProps) {
  return (
    <img
      src={asipecaLogo}
      alt="ASIPECA"
      className={className}
    />
  );
}

export default AsipecaLogo;
