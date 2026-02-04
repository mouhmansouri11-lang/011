import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface DataStore {
  bloodPressure: any[];
  bloodSugar: any[];
  appointments: any[];
  prescriptions: any[];
  labResults: any[];
  doctorProfile: any | null;
  patientProfile: any | null;
  isLoading: boolean;
}

/**
 * Global data store that syncs across all pages
 * This is the central hub for all data in the application
 */
export class DataManager {
  private static instance: DataManager;
  private data: DataStore = {
    bloodPressure: [],
    bloodSugar: [],
    appointments: [],
    prescriptions: [],
    labResults: [],
    doctorProfile: null,
    patientProfile: null,
    isLoading: false,
  };

  private subscribers: ((data: DataStore) => void)[] = [];

  private constructor() {}

  static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager();
    }
    return DataManager.instance;
  }

  /**
   * Subscribe to data changes
   */
  subscribe(callback: (data: DataStore) => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  /**
   * Notify all subscribers of data changes
   */
  private notify() {
    this.subscribers.forEach(callback => callback(this.data));
    console.log("[v0] Data updated:", this.data);
  }

  /**
   * Update data and notify subscribers
   */
  updateData<K extends keyof DataStore>(key: K, value: DataStore[K]) {
    this.data[key] = value;
    this.notify();
  }

  /**
   * Get current data
   */
  getData(): DataStore {
    return { ...this.data };
  }

  /**
   * Reset data (on logout)
   */
  reset() {
    this.data = {
      bloodPressure: [],
      bloodSugar: [],
      appointments: [],
      prescriptions: [],
      labResults: [],
      doctorProfile: null,
      patientProfile: null,
      isLoading: false,
    };
    this.notify();
  }
}

/**
 * Hook to use global data manager
 */
export const useDataManager = () => {
  const [data, setData] = useState<DataStore>(DataManager.getInstance().getData());

  useEffect(() => {
    const unsubscribe = DataManager.getInstance().subscribe(setData);
    return unsubscribe;
  }, []);

  return data;
};

/**
 * Hook to sync data with user
 */
export const useSyncData = () => {
  const { user, isAuthenticated } = useAuth();
  const manager = DataManager.getInstance();

  useEffect(() => {
    if (!isAuthenticated) {
      manager.reset();
      console.log("[v0] Data reset - user logged out");
    }
  }, [isAuthenticated]);

  return manager;
};
