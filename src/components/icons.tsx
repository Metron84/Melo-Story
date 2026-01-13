import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

const base = (size?: number) => ({
  width: size ?? 28,
  height: size ?? 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function IconVoice({ size, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M12 3v9a3 3 0 1 1-6 0V8" />
      <path d="M18 10a6 6 0 0 1-12 0" />
      <path d="M12 21v-3" />
    </svg>
  );
}

export function IconVideo({ size, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <rect x="3" y="6" width="12" height="12" rx="2" />
      <path d="M15 10l6-3v10l-6-3" />
    </svg>
  );
}

export function IconWords({ size, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M4 6h16M4 12h10M4 18h7" />
    </svg>
  );
}

export function IconPics({ size, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <rect x="3" y="4" width="14" height="14" rx="2" />
      <path d="M7 14l3-3 4 4" />
      <circle cx="9.5" cy="8.5" r="1.5" />
    </svg>
  );
}

export function IconCode({ size, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
      <path d="M12 6l-2 12" />
    </svg>
  );
}


