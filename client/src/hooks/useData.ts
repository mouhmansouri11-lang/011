import { useAuth } from "@/contexts/AuthContext";
import { trpc } from "@/utils/trpc";
import { useEffect, useState } from "react";

/**
 * Hook to fetch patient-specific data
 */
export const usePatientData = (patientId?: number) => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!patientId && user?.userType === "patient") {
      // TODO: Fetch patient data using patientId
      console.log("[v0] Loading patient data");
      setIsLoading(false);
    }
  }, [patientId, user]);

  return { data, isLoading, error };
};

/**
 * Hook to fetch blood pressure records
 */
export const useBloodPressureRecords = (patientId?: number) => {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!patientId && user?.userType === "patient") {
      console.log("[v0] Loading blood pressure records");
      // TODO: Fetch blood pressure records
      setIsLoading(false);
    }
  }, [patientId, user]);

  return { records, isLoading };
};

/**
 * Hook to fetch blood sugar records
 */
export const useBloodSugarRecords = (patientId?: number) => {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!patientId && user?.userType === "patient") {
      console.log("[v0] Loading blood sugar records");
      // TODO: Fetch blood sugar records
      setIsLoading(false);
    }
  }, [patientId, user]);

  return { records, isLoading };
};

/**
 * Hook to fetch appointments
 */
export const useAppointments = (patientId?: number) => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      console.log("[v0] Loading appointments for user:", user.userType);
      // TODO: Fetch appointments based on user type (patient or doctor)
      setIsLoading(false);
    }
  }, [patientId, user]);

  return { appointments, isLoading };
};

/**
 * Hook to fetch prescriptions
 */
export const usePrescriptions = (patientId?: number) => {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!patientId && user?.userType === "patient") {
      console.log("[v0] Loading prescriptions");
      // TODO: Fetch prescriptions
      setIsLoading(false);
    }
  }, [patientId, user]);

  return { prescriptions, isLoading };
};

/**
 * Hook to fetch lab results
 */
export const useLabResults = (patientId?: number) => {
  const { user } = useAuth();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!patientId && user?.userType === "patient") {
      console.log("[v0] Loading lab results");
      // TODO: Fetch lab results
      setIsLoading(false);
    }
  }, [patientId, user]);

  return { results, isLoading };
};

/**
 * Hook to search for doctors
 */
export const useDoctorSearch = (query?: string, specialization?: string) => {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = async () => {
    if (!query && !specialization) return;
    
    setIsLoading(true);
    try {
      console.log("[v0] Searching doctors with query:", query, "specialization:", specialization);
      // TODO: Implement doctor search via tRPC
      setIsLoading(false);
    } catch (error) {
      console.error("[v0] Error searching doctors:", error);
      setIsLoading(false);
    }
  };

  return { doctors, isLoading, search };
};

/**
 * Hook to fetch doctor profile
 */
export const useDoctorProfile = (doctorId?: number) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!doctorId) {
      setIsLoading(false);
      return;
    }

    const loadProfile = async () => {
      try {
        console.log("[v0] Loading doctor profile:", doctorId);
        // TODO: Fetch doctor profile
        setIsLoading(false);
      } catch (error) {
        console.error("[v0] Error loading doctor profile:", error);
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [doctorId]);

  return { profile, isLoading };
};
