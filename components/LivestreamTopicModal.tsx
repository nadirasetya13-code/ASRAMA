import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../controllers/gameController';
import { LIVESTREAM_TOPICS } from '../constants';
import { BeautyIcon, MentalIcon, PopularityIcon, StaminaIcon } from './icons';

const statIconMap: Record<string, React.FC<{className?: string}>> = {
    'Kecantikan': BeautyIcon,
    'Mental': MentalIcon,
    'Popularitas': PopularityIcon,
    'Stamina': StaminaIcon,
};

const statColorMap: Record<string, string> = {
    'Kecantikan': 'text-pink-400',
    'Mental': 'text-blue-400',
    'Popularitas': 'text-yellow-400',
    'Stamina': 'text-red-400',
};

const LivestreamTopicModal: React.FC = () => {
    const { cancelLivestreamSetup, startLivestream } = useGameStore.getState();
    const isProcessing = useGameStore(state => state.isProcessing);
    const setup = useGameStore(state => state.livestreamSetup);
    const talent = useGameStore(state => state.talents.find(t => t.id === setup?.talentId));

    if (!talent || !setup?.topicOptions) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={cancelLivestreamSetup}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="w-full max-w-sm p-3 text-gray-200 bg-dark-secondary rounded-lg shadow-2xl border border-gray-700"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-serif font-bold text-center text-light-text">
                    Pilih Topik Siaran
                </h2>
                <p className="text-sm text-center text-subtle-text">
                    Pilih tema yang paling cocok untuk {talent.name}
                </p>

                <div className="mt-4 space-y-2">
                    {setup.topicOptions.map(topicKey => {
                        const topic = LIVESTREAM_TOPICS[topicKey];
                        if (!topic) return null;
                        
                        return (
                            <button
                                key={topicKey}
                                disabled={isProcessing}
                                onClick={() => startLivestream(topicKey)}
                                className="w-full p-2 text-left transition-colors bg-black/30 rounded-lg hover:bg-black/50 disabled:opacity-50"
                            >
                                <p className="font-bold text-light-text">{topic.label}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-subtle-text">Tantangan:</span>
                                    {topic.statChallenge.map(stat => {
                                        const Icon = statIconMap[stat];
                                        const color = statColorMap[stat];
                                        return (
                                            <div key={stat} className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/40 text-[10px] font-semibold ${color}`}>
                                                <Icon className="w-3 h-3" />
                                                {stat}
                                            </div>
                                        )
                                    })}
                                </div>
                            </button>
                        );
                    })}
                </div>

                <button
                    type="button"
                    onClick={cancelLivestreamSetup}
                    className="w-full px-3 py-1.5 mt-4 text-sm font-bold text-white bg-gray-700 rounded-full shadow-lg"
                >
                    Batal
                </button>
            </motion.div>
        </motion.div>
    );
};

export default LivestreamTopicModal;