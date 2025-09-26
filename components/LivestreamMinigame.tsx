import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../controllers/gameController';
import {
  BeautyIcon,
  MentalIcon,
  PopularityIcon,
  StaminaIcon,
  LoadingSpinner,
  ViewersIcon,
} from './icons';

const LivestreamMinigame: React.FC = () => {
  const session = useGameStore((state) => state.activeLivestreamSession);
  const talent = useGameStore((state) =>
    state.talents.find((t) => t.id === session?.talentId)
  );
  const { handleLivestreamChoice } = useGameStore.getState();

  const [feedback, setFeedback] = useState<{
    message: string;
    isSuccess: boolean;
  } | null>(null);
  const feedbackTimerRef = useRef<number | null>(null);

  const handleChoice = (choiceIndex: number) => {
    if (!session || session.activeEventIndex < 0 || feedback) return;
    const currentEvent = session.events[session.activeEventIndex];
    if (!currentEvent || !talent) return;

    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current);
    }

    const choice = currentEvent.choices[choiceIndex];
    const statValue = talent[choice.stat];

    // Simplified prediction for immediate UI feedback.
    // The final result is still correctly determined by the more complex logic in the store.
    const isSuccess = Array.isArray(choice.threshold)
      ? statValue >= choice.threshold[0]
      : statValue >= choice.threshold;
    const result = isSuccess ? choice.success : choice.failure;

    setFeedback({ message: result.message, isSuccess });
    feedbackTimerRef.current = window.setTimeout(() => {
      setFeedback(null);
      handleLivestreamChoice(choiceIndex);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) {
        clearTimeout(feedbackTimerRef.current);
      }
    };
  }, []);

  const statIconMap: Record<string, React.ReactNode> = {
    kecantikan: <BeautyIcon className="w-3.5 h-3.5 text-pink-400" />,
    mental: <MentalIcon className="w-3.5 h-3.5 text-blue-400" />,
    popularitas: <PopularityIcon className="w-3.5 h-3.5 text-yellow-400" />,
    stamina: <StaminaIcon className="w-3.5 h-3.5 text-red-400" />,
  };

  if (!session || !talent) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <LoadingSpinner className="w-12 h-12 text-white" />
      </div>
    );
  }

  const hypePercentage = session.hype;
  const currentEvent =
    session.activeEventIndex >= 0
      ? session.events[session.activeEventIndex]
      : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col p-2 sm:p-4 bg-gradient-to-br from-purple-900/80 via-black/80 to-pink-900/80 backdrop-blur-sm text-white"
    >
      {/* Header */}
      <div className="relative flex items-center justify-between p-2 rounded-t-lg bg-black/30">
        <div className="flex items-center gap-2">
          <img
            src={talent.imageUrl}
            alt={talent.name}
            className="object-cover w-10 h-10 border-2 rounded-full border-pink-500"
          />
          <div>
            <p className="font-bold">{talent.name}</p>
            <div className="flex items-center gap-1.5 text-xs text-subtle-text">
              <ViewersIcon className="w-4 h-4 text-red-500 animate-pulse" />
              <span>{Math.floor(session.currentViewers).toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="font-mono text-xl font-bold">
            Event {session.eventProgressIndex + 1} / {session.events.length}
          </p>
          <p className="text-xs text-subtle-text">Progres Sesi</p>
        </div>
      </div>

      {/* Hype and Time Bars */}
      <div className="p-2 space-y-1 bg-black/30">
        <div>
          <div className="text-xs font-bold text-center text-yellow-300">
            HYPE METER
          </div>
          <div className="w-full h-4 mt-1 bg-gray-700 rounded-full shadow-inner">
            {/* IMPROVEMENT: Simplified animation logic. Framer Motion animates from the previous value automatically. */}
            <motion.div
              className="h-4 rounded-full bg-gradient-to-r from-yellow-500 to-amber-400"
              animate={{ width: `${hypePercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content: Event & Choices */}
      <div className="relative flex flex-col items-center justify-center flex-grow p-4 my-2 overflow-hidden rounded-lg bg-black/20">
        <AnimatePresence>
          {feedback && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className={`absolute z-20 top-4 px-4 py-2 rounded-lg shadow-lg text-center ${
                feedback.isSuccess ? 'bg-green-600' : 'bg-red-600'
              }`}
            >
              <p className="font-bold">{feedback.message}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {currentEvent ? (
            <motion.div
              key={currentEvent.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center w-full"
            >
              <div className="p-4 mb-4 text-center border-2 border-dashed rounded-lg bg-black/20 border-white/30">
                <p className="text-sm font-semibold italic">
                  &quot;{currentEvent.text}&quot;
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                {currentEvent.choices.map((choice, index) => {
                  // IMPROVEMENT: Provide player with their current stat value for better decision making.
                  const statValue = talent[choice.stat];
                  const threshold = Array.isArray(choice.threshold)
                    ? choice.threshold[0]
                    : choice.threshold;
                  const thresholdText = Array.isArray(choice.threshold)
                    ? `${choice.threshold[0]}-${choice.threshold[1]}`
                    : choice.threshold;
                  const playerStatColor =
                    statValue >= threshold
                      ? 'text-green-400'
                      : 'text-red-400';

                  return (
                    <button
                      key={index}
                      onClick={() => handleChoice(index)}
                      disabled={!!feedback}
                      className="w-full p-2 text-left transition-transform bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-md hover:scale-105 disabled:opacity-50 disabled:scale-100"
                    >
                      <p className="text-sm font-bold">{choice.text}</p>
                      <div className="flex items-center justify-between mt-1 text-xs text-purple-200">
                        <div className="flex items-center gap-1.5">
                          {statIconMap[choice.stat]}
                          <span>
                            Tes {choice.stat} &ge; {thresholdText}
                          </span>
                        </div>
                        <span className={`font-bold ${playerStatColor}`}>
                          (Kamu: {statValue})
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
              className="text-center text-subtle-text"
            >
              <LoadingSpinner className="w-8 h-8 mx-auto animate-spin" />
              <p className="mt-2">Memproses hasil...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LivestreamMinigame;
