import { EquipmentStatEffect } from './item';

export interface SetBonus {
    threshold: 2 | 4 | 8;
    description: string;
    effects: Partial<Record<EquipmentStatEffect, number>>;
}

export interface EquipmentSet {
    setName: string;
    bonuses: SetBonus[];
}
