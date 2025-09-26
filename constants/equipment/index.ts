import { EquipmentSet, EquipmentItem } from '../../types';
import { KYMA_SET, KYMA_ITEMS } from './kyma';
import { FENOMENAL_SET, FENOMENAL_ITEMS } from './fenomenal';
import { APHRODISIA_SET, APHRODISIA_ITEMS } from './aphrodisia';
import { ARTEMISIA_SET, ARTEMISIA_ITEMS } from './artemisia';
import { WINDFALL_SET, WINDFALL_ITEMS } from './windfall';
import { HERA_SET, HERA_ITEMS } from './hera';
import { DEMETER_SET, DEMETER_ITEMS } from './demeter';
import { ATHENA_SET, ATHENA_ITEMS } from './athena';

export const ALL_EQUIPMENT_ITEMS: EquipmentItem[] = [
    ...KYMA_ITEMS,
    ...FENOMENAL_ITEMS,
    ...APHRODISIA_ITEMS,
    ...ARTEMISIA_ITEMS,
    ...WINDFALL_ITEMS,
    ...HERA_ITEMS,
    ...DEMETER_ITEMS,
    ...ATHENA_ITEMS,
];

export const EQUIPMENT_SETS: EquipmentSet[] = [
    KYMA_SET,
    FENOMENAL_SET,
    APHRODISIA_SET,
    ARTEMISIA_SET,
    WINDFALL_SET,
    HERA_SET,
    DEMETER_SET,
    ATHENA_SET,
];
