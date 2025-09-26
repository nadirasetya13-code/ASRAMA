import { openDB, IDBPDatabase } from 'idb';
import { GameState, Talent, Guest, Room, BaseTalent } from '../types';

const DB_NAME = 'AsramaBirahiDB';
const DB_VERSION = 2; // Version incremented for new store
const GAME_STATE_STORE = 'gameState';
const TALENTS_STORE = 'talents';
const GUESTS_STORE = 'guests';
const ROOMS_STORE = 'rooms';
const USER_TALENTS_STORE = 'userCreatedTalents'; // New store
const GAME_STATE_KEY = 'main';

let dbPromise: Promise<IDBPDatabase> | null = null;

const initDB = () => {
  if (dbPromise) return dbPromise;
  dbPromise = openDB(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion) {
      if (!db.objectStoreNames.contains(GAME_STATE_STORE)) {
        db.createObjectStore(GAME_STATE_STORE);
      }
      if (!db.objectStoreNames.contains(TALENTS_STORE)) {
        db.createObjectStore(TALENTS_STORE, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(GUESTS_STORE)) {
        db.createObjectStore(GUESTS_STORE, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(ROOMS_STORE)) {
        db.createObjectStore(ROOMS_STORE, { keyPath: 'id' });
      }
      // New store for user-created talents
      if (oldVersion < 2 && !db.objectStoreNames.contains(USER_TALENTS_STORE)) {
        db.createObjectStore(USER_TALENTS_STORE, { keyPath: 'id' });
      }
    },
  });
  return dbPromise;
};

// GameState operations
export const getGameState = async (): Promise<Omit<GameState, 'rooms'> | undefined> => {
  const db = await initDB();
  return db.get(GAME_STATE_STORE, GAME_STATE_KEY);
};

export const saveGameState = async (gameState: Omit<GameState, 'rooms'>) => {
  const db = await initDB();
  return db.put(GAME_STATE_STORE, gameState, GAME_STATE_KEY);
};

// Talents operations
export const getTalents = async (): Promise<Talent[]> => {
  const db = await initDB();
  return db.getAll(TALENTS_STORE);
};

export const saveTalents = async (talents: Talent[]) => {
  const db = await initDB();
  const tx = db.transaction(TALENTS_STORE, 'readwrite');
  await tx.objectStore(TALENTS_STORE).clear();
  for (const talent of talents) {
    tx.objectStore(TALENTS_STORE).put(talent);
  }
  await tx.done;
};

// Guests operations
export const getGuests = async (): Promise<Guest[]> => {
    const db = await initDB();
    return db.getAll(GUESTS_STORE);
};

export const saveGuests = async (guests: Guest[]) => {
    const db = await initDB();
    const tx = db.transaction(GUESTS_STORE, 'readwrite');
    await tx.objectStore(GUESTS_STORE).clear();
    for (const guest of guests) {
        tx.objectStore(GUESTS_STORE).put(guest);
    }
    await tx.done;
};

// Rooms operations
export const getRooms = async (): Promise<Room[]> => {
    const db = await initDB();
    return db.getAll(ROOMS_STORE);
};

export const saveRooms = async (rooms: Room[]) => {
    const db = await initDB();
    const tx = db.transaction(ROOMS_STORE, 'readwrite');
    await tx.objectStore(ROOMS_STORE).clear();
    for (const room of rooms) {
        tx.objectStore(ROOMS_STORE).put(room);
    }
    await tx.done;
};

// User-created Talents operations
export const getUserCreatedTalents = async (): Promise<BaseTalent[]> => {
    const db = await initDB();
    return db.getAll(USER_TALENTS_STORE);
};

export const saveUserCreatedTalent = async (talent: BaseTalent) => {
    const db = await initDB();
    return db.put(USER_TALENTS_STORE, talent);
};