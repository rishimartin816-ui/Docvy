export default function HealthcareBackdrop({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 640 440" fill="none" aria-hidden="true" focusable="false">
      <circle cx="365" cy="216" r="174" fill="#eeecfa" />
      <circle cx="365" cy="216" r="191" stroke="#d8d3ff" strokeDasharray="4 12" strokeWidth="2" />
      <path d="M104 326h80l24-39 27 60 28-43h56l20-28 21 50h167" stroke="#a8a0d8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <g transform="rotate(-9 337 214)">
        <rect x="242" y="106" width="190" height="229" rx="30" fill="#d8d3ff" opacity=".55" />
        <rect x="229" y="94" width="190" height="229" rx="30" fill="white" stroke="#c9c4ec" strokeWidth="3" />
        <rect x="281" y="77" width="85" height="36" rx="15" fill="#c9c4ec" />
        <path d="M323 141v43m-21-22h43" stroke="#77719e" strokeWidth="10" strokeLinecap="round" />
        <path d="m268 221 7 7 13-15m-20 45 7 7 13-15m18-29h73m-73 37h73" stroke="#a8a0d8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g transform="rotate(12 470 247)">
        <rect x="420" y="194" width="113" height="107" rx="27" fill="#f8f7fc" stroke="#d8d3ff" strokeWidth="3" />
        <path d="M477 272c-18-11-29-21-29-32 0-15 18-19 29-7 11-12 29-8 29 7 0 11-11 21-29 32Z" fill="#d8d3ff" />
        <path d="M450 248h13l6-9 8 17 6-8h18" stroke="#77719e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <path d="M157 293c-26-20-36-44-31-71 24 12 35 33 31 71Zm-1 13c17-37 39-56 67-57-5 31-29 49-67 57Zm5 47c-3-33-8-55-16-72m364 75c11-35 33-57 66-65-7 34-29 56-66 65Z" fill="#d8d3ff" stroke="#c9c4ec" strokeWidth="2" strokeLinecap="round" />
      <path d="M482 123h23m-11-11v23M170 164h19m-9-9v19" stroke="#a8a0d8" strokeWidth="3" strokeLinecap="round" />
      <circle cx="540" cy="158" r="5" fill="#c9c4ec" />
      <circle cx="198" cy="103" r="6" fill="#d8d3ff" />
    </svg>
  );
}
