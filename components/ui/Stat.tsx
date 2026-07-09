type Props = {
  label: string;
  value: string;
};

export function Stat({ value }: Props) {
  return (
    <div>
      <div className="mt-1 font-mono text-sm text-cm-green">{value}</div>
    </div>
  );
}
