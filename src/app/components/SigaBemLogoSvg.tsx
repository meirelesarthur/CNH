export function SigaBemLogoSvg({ height = 40, className = "" }: { height?: number, className?: string }) {
  return (
    <svg 
      height={height} 
      viewBox="0 0 100 100" 
      fill="currentColor" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Wheel Rim */}
      <path d="M50 10 C27.9 10 10 27.9 10 50 C10 72.1 27.9 90 50 90 C72.1 90 90 72.1 90 50 C90 27.9 72.1 10 50 10 Z M50 20 C66.6 20 80 33.4 80 50 C80 66.6 66.6 80 50 80 C33.4 80 20 66.6 20 50 C20 33.4 33.4 20 50 20 Z" />
      
      {/* Inner Wheel Spokes */}
      <path d="M20 50 L35 55 L45 78 L55 78 L65 55 L80 50 L65 45 L35 45 Z" />
      
      {/* Road inside the wheel */}
      <path d="M45 78 L38 45 L62 45 L55 78 Z" fill="white" />
      
      {/* Dashed line on the road */}
      <path d="M49 48 L51 48 L50.5 53 L49.5 53 Z" fill="currentColor" />
      <path d="M49 58 L51 58 L50.5 63 L49.5 63 Z" fill="currentColor" />
      <path d="M49 68 L51 68 L50.5 73 L49.5 73 Z" fill="currentColor" />
      
      {/* Left Hand */}
      <path d="M15 65 C10 60 5 50 10 40 C15 45 20 50 25 55 C25 65 20 70 15 65 Z" />
      
      {/* Right Hand */}
      <path d="M85 65 C90 60 95 50 90 40 C85 45 80 50 75 55 C75 65 80 70 85 65 Z" />
    </svg>
  );
}
