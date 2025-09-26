import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { HeartIcon, LoadingSpinner } from './icons';
import { useGameStore } from '../controllers/gameController';

interface SessionProcessingModalProps {
  progress: {
    narrative: string[];
    duration: number; // in milliseconds
  };
}

const paragraphVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  exit: { opacity: 0 },
};

const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0'
  )}`;
};

const SessionProcessingModal: React.FC<SessionProcessingModalProps> = ({
  progress,
}) => {
  const { narrative, duration } = progress;
  const isSessionProcessingComplete = useGameStore(
    (state) => state.isSessionProcessingComplete
  );
  const acknowledgeSessionNarrative = useGameStore(
    (state) => state.acknowledgeSessionNarrative
  );

  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(Math.round(duration / 1000));
  const [displayedNarrative, setDisplayedNarrative] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- Refs for managing timers to prevent re-creation on re-renders ---
  const countdownTimerRef = useRef<number | null>(null);
  const narrativeTimerRef = useRef<number | null>(null);

  // Effect for initial 2-second loading phase
  useEffect(() => {
    const loadingTimer = window.setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds

    return () => window.clearTimeout(loadingTimer);
  }, []);

  // Effect for the countdown timer
  useEffect(() => {
    countdownTimerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, []);

  // Effect for displaying narrative paragraphs sequentially with precise timing
  useEffect(() => {
    if (isLoading || currentIndex >= narrative.length) {
      if (narrativeTimerRef.current)
        window.clearTimeout(narrativeTimerRef.current);
      return;
    }

    // First paragraph appears immediately after loading.
    if (currentIndex === 0) {
      setDisplayedNarrative([narrative[0]]);
      setCurrentIndex(1);
      return;
    }

    // Calculate the precise interval to make the narrative last the entire duration
    const remainingDuration = duration - 2000; // Subtract loading time
    const remainingNarrativeCount = narrative.length - 1;
    const interval =
      remainingNarrativeCount > 0 ? remainingDuration / remainingNarrativeCount : 0;

    narrativeTimerRef.current = window.setTimeout(() => {
      setDisplayedNarrative((prev) => [...prev, narrative[currentIndex]]);
      setCurrentIndex((prev) => prev + 1);
    }, interval);

    return () => {
      if (narrativeTimerRef.current)
        window.clearTimeout(narrativeTimerRef.current);
    };
  }, [isLoading, currentIndex, narrative, duration]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 font-serif bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Sesi sedang berlangsung"
    >
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center text-center"
          >
            <LoadingSpinner className="w-12 h-12 mb-4 text-white" />
            <p
              className="text-xl text-white"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
            >
              berjalan menuju kamar...
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center w-full h-full"
          >
            <div className="absolute top-4 right-4 px-3 py-1 text-xl font-bold text-white bg-black/50 rounded-lg shadow-lg">
              {formatTime(timeLeft)}
            </div>

            <div className="w-full max-w-2xl space-y-4 text-center">
              <AnimatePresence>
                {displayedNarrative.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    variants={paragraphVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-lg leading-relaxed text-white md:text-xl"
                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {isSessionProcessingComplete && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  onClick={acknowledgeSessionNarrative}
                  className="absolute bottom-24 px-6 py-2 mt-8 font-bold text-white transform transition-transform bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:scale-105"
                >
                  Lanjutkan
                </motion.button>
              )}
            </AnimatePresence>

            <motion.div
              className="absolute bottom-10"
              animate={{
                scale: isSessionProcessingComplete ? 1 : [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: isSessionProcessingComplete ? 0 : Infinity,
                ease: 'easeInOut',
              }}
            >
              <HeartIcon className="w-10 h-10 text-red-500/80" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SessionProcessingModal;
