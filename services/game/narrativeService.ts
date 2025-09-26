import { Talent, Guest, MatchResult } from "../../types";
import { applyAgeAttributeModifiers } from "./talentService";
import { phraseBank, NarrativeContext, NarrativePhase } from './data/narrativeBank';

export const generateSessionNarrative = (talent: Talent, guest: Guest, result: MatchResult, duration: number): string[] => {
    const currentTalent = applyAgeAttributeModifiers(talent);
    const { satisfactionScore } = result;
    const narrative: string[] = [];

    // --- DETERMINE NARRATIVE LENGTH PRECISELY ---
    const NARRATIVE_INTERVAL_MS = 6000; // Average of 5-7 seconds
    const LOADING_SCREEN_MS = 2000;
    const narrativeDuration = duration - LOADING_SCREEN_MS;
    const numScenes = Math.max(4, Math.floor(narrativeDuration / NARRATIVE_INTERVAL_MS));
    
    const usedTexts = new Set<string>();
    const contexts: NarrativeContext[] = [];

    // --- ANALYZE CONTEXT ---
    if (guest.penis.dayaTahan > currentTalent.stamina + 20) contexts.push({ duel: 'stamina_loss' });
    if (currentTalent.stamina > guest.penis.dayaTahan + 20) contexts.push({ duel: 'stamina_win' });

    const physicalIntensity = (guest.penis.panjang * guest.penis.diameter);
    const physicalResistance = (currentTalent.intim.vagina.kedalaman * currentTalent.intim.vagina.elastisitas);
    if (physicalIntensity / physicalResistance > 1.5) contexts.push({ duel: 'physical_mismatch_pain' });
    if (physicalResistance / physicalIntensity > 1.5) contexts.push({ duel: 'physical_mismatch_pleasure' });

    if (guest.penis.agresivitas > 80 && currentTalent.mental < 60) contexts.push({ duel: 'mental_overwhelm' });
    if (satisfactionScore > 90) contexts.push({ duel: 'synergy' });

    for (const kink of guest.kinks) {
        let fulfilled = false;
        switch (kink.type) {
            case 'Dominasi': if (currentTalent.mental >= 85) fulfilled = true; break;
            case 'Masokisme': if (guest.penis.agresivitas >= 70 && currentTalent.mental >= 60) fulfilled = true; break;
        }
        contexts.push({ kink: `${kink.type}_${fulfilled ? 'success' : 'fail'}` });
    }

    for (const trait of guest.personalityTraits) {
        contexts.push({ personality: trait });
    }

    // --- SELECTION LOGIC ---
    const selectPhrase = (phase: NarrativePhase): string => {
        const candidates = phraseBank[phase];
        let bestSnippets = [];

        // Try to find highly specific matches first (kink, duel)
        for (const context of contexts) {
            bestSnippets = candidates.filter(snippet => 
                !usedTexts.has(snippet.text) && (
                    (context.duel && snippet.context.duel === context.duel) ||
                    (context.kink && snippet.context.kink === context.kink)
                )
            );
            if (bestSnippets.length > 0) break;
        }

        // Then try personality matches
        if (bestSnippets.length === 0) {
            for (const context of contexts) {
                 bestSnippets = candidates.filter(snippet => 
                    !usedTexts.has(snippet.text) &&
                    (context.personality && snippet.context.personality === context.personality)
                );
                if (bestSnippets.length > 0) break;
            }
        }
        
        // Then try score-based matches
        if (bestSnippets.length === 0) {
            bestSnippets = candidates.filter(snippet => 
                !usedTexts.has(snippet.text) &&
                snippet.context.score && satisfactionScore >= snippet.context.score[0] && satisfactionScore <= snippet.context.score[1]
            );
        }
        
        // Failsafe if no specific match is found, or all specific matches have been used
        if(bestSnippets.length === 0) {
            bestSnippets = candidates.filter(snippet => !usedTexts.has(snippet.text) && snippet.context.score);
        }

        if(bestSnippets.length === 0) {
            bestSnippets = candidates; // Ultimate failsafe, might reuse text
        }

        if (bestSnippets.length === 0) {
             return "Sesi berlangsung..."; // Absolute failsafe
        }

        const totalWeight = bestSnippets.reduce((sum, snippet) => sum + snippet.weight, 0);
        let random = Math.random() * totalWeight;
        for (const snippet of bestSnippets) {
            random -= snippet.weight;
            if (random <= 0) {
                usedTexts.add(snippet.text);
                return snippet.text.replace(/\$\{talent\.name\}/g, talent.name).replace(/\$\{guest\.name\}/g, guest.name);
            }
        }
        
        const fallbackSnippet = bestSnippets[0];
        usedTexts.add(fallbackSnippet.text);
        return fallbackSnippet.text.replace(/\$\{talent\.name\}/g, talent.name).replace(/\$\{guest\.name\}/g, guest.name);
    };

    // --- BUILD NARRATIVE ---
    narrative.push(selectPhrase('opening'));

    const middleScenes = numScenes - 2;
    for (let i = 0; i < middleScenes; i++) {
        // Alternate between action and dialogue for a more dynamic story
        if (i % 2 !== 0 && phraseBank.dialogue.length > 0) {
            narrative.push(selectPhrase('dialogue'));
        } else {
            narrative.push(selectPhrase('climax'));
        }
    }
    
    narrative.push(selectPhrase('closing'));
    
    return narrative;
};