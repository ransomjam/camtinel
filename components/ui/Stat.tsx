type Props = {
  label: string;
  value: string;
};

export function Stat({ label, value }: Props) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div className="mt-1 font-mono text-sm text-cm-green">{value}</div>
    </div>
  );
}
