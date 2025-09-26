import React from 'react';

interface StatBarProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
  isProgress?: boolean;
  progressValue?: number;
  isReversedProgress?: boolean; // Baru: Untuk atribut lower is better (e.g., 'bau')
  tooltip?: string; // Baru: Tooltip khusus (e.g., untuk 'bau')
}

const StatBar: React.FC<StatBarProps> = ({ 
  icon, 
  label, 
  value, 
  color, 
  isProgress = false, 
  progressValue = 0,
  isReversedProgress = false, // Default false (higher is better)
  tooltip, // Default undefined
}) => {
  // Perbaikan: Hitung lebar bar progres (reverse jika isReversedProgress)
  const progressWidth = isReversedProgress 
    ? `${Math.max(0, 100 - (progressValue || 0))}%` // Bar penuh saat nilai rendah (0), kosong saat nilai tinggi (100)
    : `${(progressValue || 0)}%`;

  // Perbaikan: Warna bar disesuaikan untuk reversed (hijau untuk rendah, merah untuk tinggi)
  const progressColor = isReversedProgress 
    ? progressValue <= 20 ? 'bg-green-500' : progressValue <= 50 ? 'bg-yellow-500' : 'bg-red-500' // Threshold untuk 'bau'
    : color.replace('text-', 'bg-'); // Default

  // Perbaikan: Tooltip pada wrapper jika disediakan
  const barElement = (
    <div className="w-full h-2 bg-black/20 rounded-full">
      <div
        className={progressColor + ' h-2 rounded-full transition-all duration-500'}
        style={{ width: progressWidth }}
      />
    </div>
  );

  return (
    <div className="flex items-center gap-3" title={tooltip}>
      <div className="w-6">{icon}</div>
      <div className="flex-1">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs font-semibold text-light-text">
            {label}
          </span>
          <span className={`text-sm font-bold ${color}`}>
            {value}
          </span>
        </div>
        {isProgress && barElement}
      </div>
    </div>
  );
};

export default React.memo(StatBar);