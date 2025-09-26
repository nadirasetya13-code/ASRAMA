import React from 'react';

interface TalentStoryProps {
  story: string;
}

const TalentStory: React.FC<TalentStoryProps> = ({ story }) => {
  return (
    <div className="p-1.5 my-2 rounded-xl shadow-inner bg-black/20 border border-white/10">
      <h3 className="pb-1 mb-1 text-xs font-serif font-bold text-center border-b-2 border-brand-pink/50">
        Cerita Latar Belakang
      </h3>
      <p className="text-[10px] font-sans text-subtle-text whitespace-pre-line">
        {story}
      </p>
    </div>
  );
};

export default TalentStory;