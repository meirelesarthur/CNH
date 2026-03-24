import logoImage from "../../assets/logo.png";

interface SigaBemLogoProps {
  height?: number;
}

export function SigaBemLogo({ height = 40 }: SigaBemLogoProps) {
  return (
    <img
      src={logoImage}
      alt="Siga Bem"
      height={height}
      style={{
        height,
        width: "auto",
        objectFit: "contain"
      }}
    />
  );
}