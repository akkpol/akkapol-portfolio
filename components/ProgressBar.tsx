interface ProgressBarProps {
  value: number;
}

export default function ProgressBar({ value }: ProgressBarProps) {
  const v = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
      <div className="h-full bg-gray-900 dark:bg-gray-100" style={{ width: `${v}%` }} />
    </div>
  );
}

