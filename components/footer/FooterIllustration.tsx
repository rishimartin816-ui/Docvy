function Tree({ x, y, rose = false }: { x: number; y: number; rose?: boolean }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M0 76V36m0 24-14-13m14 4 13-13" fill="none" />
    <path d="M-24 40c-10-10-7-26 4-32-1-14 10-24 22-23C17-15 27-3 24 9c15 9 16 26 5 35-7 8-19 9-29 3-8 5-18 2-24-7Z" className={rose ? "fill-icon-peach" : "fill-icon-mint"} />
    <path d="M0 76V22m0 20-10-9m10 0 9-9" fill="none" />
  </g>;
}

function Clinic({ x, y, wide = false }: { x: number; y: number; wide?: boolean }) {
  const width = wide ? 240 : 156;
  const height = wide ? 160 : 112;
  return <g transform={`translate(${x} ${y})`}>
    <rect width={width} height={height} rx="12" className="fill-icon-mint" />
    <path d={`M-8 27h${width + 16}`} fill="none" />
    <rect x={width / 2 - 19} y="-16" width="38" height="38" rx="11" className="fill-surface" />
    <path d={`M${width / 2} -6v18m-9-9h18`} fill="none" />
    <rect x={width / 2 - 23} y={height - 65} width="46" height="65" rx="5" className="fill-surface" />
    <path d={`M${width / 2} ${height - 65}v65`} fill="none" />
    <circle cx={width / 2 + 9} cy={height - 30} r="1.5" className="fill-icon-peach" />
    <rect x="18" y="45" width="28" height="29" rx="5" className="fill-surface" />
    <rect x={width - 46} y="45" width="28" height="29" rx="5" className="fill-surface" />
    {wide && <>
      <rect x="60" y="45" width="28" height="29" rx="5" className="fill-surface" />
      <rect x="152" y="45" width="28" height="29" rx="5" className="fill-surface" />
      <path d="M18 94h50m104 0h50" fill="none" />
    </>}
    <path d={`M12 ${height}h${width - 24}`} fill="none" />
  </g>;
}

function Doctor({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="m-8 59-2 25h-8m24-25 2 25h8" fill="none" />
    <path d="M-13 19c-9 4-13 13-14 27m40-27c8 3 11 10 12 18l9-4" fill="none" />
    <path d="M-13 18 0 24l13-6 6 43h-38Z" className="fill-surface" />
    <path d="m-8 20 8 20 8-20M0 40v21m-8-15h-6m22 0h6" fill="none" />
    <circle cy="5" r="13" className="fill-surface" />
    <path d="M-13 3c-1-16 23-20 26-3-8 1-12-6-13-6-4 5-8 7-13 9Z" className="fill-icon-peach" />
    <path d="M-6 29v8c0 8 12 8 12 0v-8" fill="none" />
    <circle cx="6" cy="38" r="3" className="fill-icon-mint" />
  </g>;
}

function Patient({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="m-7 58-3 26h-7m24-26 3 26h7" fill="none" />
    <path d="M-12 21c-7 3-10 10-12 16l-12-4m48-12c8 7 10 15 10 26" fill="none" />
    <path d="m-12 20 12 4 12-4 5 40h-34Z" className="fill-icon-peach" />
    <path d="M0 25v15" fill="none" />
    <circle cy="5" r="13" className="fill-surface" />
    <path d="M-13 3C-15-13 12-17 13 1c-10 0-12-7-12-7s-3 8-14 9Z" className="fill-icon-mint" />
  </g>;
}

function Heart({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}><path d="M0 23-18 7C-32-6-10-22 0-8 10-22 32-6 18 7Z" className="fill-icon-peach" /></g>;
}

function Calendar({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect width="38" height="36" rx="7" className="fill-icon-mint" />
    <path d="M0 11h38M10-4v9m18-9v9m-17 17 5 5 11-12" fill="none" />
  </g>;
}

function DesktopScene() {
  return <svg width="1440" height="260" viewBox="0 0 1440 260" aria-hidden="true" role="presentation" focusable="false" className="mx-auto hidden h-auto w-full max-w-[1440px] fill-none text-primary md:block [&_*]:[vector-effect:non-scaling-stroke]" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <g data-scene-group="background">
      <path d="M0 225c100-43 193-48 300-15 110 33 165-17 272-9 154 12 210 41 359 9 202-44 319-18 509 18v32H0Z" className="fill-icon-mint" stroke="none" />
      <path d="M82 75c0-12 17-16 24-8 3-20 33-20 36 0 12-7 27 0 26 11H82m1160-21c0-12 17-16 24-8 4-20 32-20 36 0 12-7 26 1 25 11h-85" fill="none" />
      <path d="M60 225h1320" fill="none" />
    </g>
    <g data-scene-group="buildings">
      <Clinic x={235} y={113} />
      <Clinic x={520} y={65} wide />
      <Clinic x={960} y={113} />
      <path d="M205 225v-72m-18 0h36m928 72v-72m-18 0h36" fill="none" />
      <rect x="188" y="136" width="34" height="24" rx="6" className="fill-surface" />
      <path d="M200 148h10m-5-5v10" fill="none" />
      <rect x="1134" y="136" width="34" height="24" rx="6" className="fill-surface" />
      <path d="M1146 148h10m-5-5v10" fill="none" />
    </g>
    <g data-scene-group="trees">
      <Tree x={130} y={149} />
      <Tree x={435} y={149} rose />
      <Tree x={1210} y={149} rose />
      <Tree x={1310} y={149} />
      <path d="M78 225c-13-14-2-27 10-18 2-19 24-19 26 0 12-7 25 5 14 18m1007 0c-9-11 1-22 10-16 2-14 20-14 22 0 9-5 19 6 10 16" className="fill-icon-peach" />
    </g>
    <g data-scene-group="doctor"><Doctor x={795} y={141} /></g>
    <g data-scene-group="patient"><Patient x={881} y={141} /></g>
    <g data-scene-group="floating-icons">
      <Heart x={463} y={64} />
      <Calendar x={1018} y={48} />
      <path d="M336 47h12V35h12v12h12v12h-12v12h-12V59h-12Z" className="fill-icon-mint" />
      <circle cx="853" cy="66" r="23" className="fill-surface" />
      <path d="M853 52v15l10 6" fill="none" />
      <path d="M1179 55v18c0 24 34 24 34 0V55m-34 4h5m24 0h5m-17 33v9c0 17 28 17 28 0v-7" fill="none" />
      <circle cx="1224" cy="88" r="6" className="fill-icon-peach" />
    </g>
  </svg>;
}

function MobileScene() {
  return <svg width="390" height="140" viewBox="0 0 390 140" aria-hidden="true" role="presentation" focusable="false" className="mx-auto block h-[140px] w-full fill-none text-primary md:hidden [&_*]:[vector-effect:non-scaling-stroke]" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <g data-scene-group="background"><path d="M0 120c50-20 76-11 119-8 53 4 89-12 143-6 44 5 85-2 128 14v20H0Z" className="fill-icon-mint" stroke="none" /><path d="M18 120h354" fill="none" /></g>
    <g data-scene-group="buildings" transform="translate(90 47) scale(.65)"><Clinic x={0} y={0} /></g>
    <g data-scene-group="trees" transform="scale(.65)"><Tree x={68} y={108} /><Tree x={530} y={108} rose /></g>
    <g data-scene-group="doctor" transform="translate(229 68) scale(.62)"><Doctor x={0} y={0} /></g>
    <g data-scene-group="patient" transform="translate(281 68) scale(.62)"><Patient x={0} y={0} /></g>
    <g data-scene-group="floating-icons">
      <g transform="translate(217 28) scale(.65)"><Heart x={0} y={0} /></g>
      <g transform="translate(293 17) scale(.65)"><Calendar x={0} y={0} /></g>
      <path d="M62 27h7v-7h7v7h7v7h-7v7h-7v-7h-7Z" className="fill-icon-mint" />
    </g>
  </svg>;
}

export default function FooterIllustration() {
  return <div aria-hidden="true" role="presentation" className="w-full overflow-hidden bg-surface pt-6">
    <DesktopScene />
    <MobileScene />
  </div>;
}
