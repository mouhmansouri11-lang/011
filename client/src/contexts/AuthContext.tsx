import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { trpc } from "@/utils/trpc";

export interface User {
  id: number;
  openId: string;
  email?: string;
  phone?: string;
  name?: string;
  userType: "patient" | "doctor" | "clinic" | "lab" | "admin";
  loginMethod?: string;
  createdAt: string;
  updatedAt: string;
  lastSignedIn: string;
}

export interface PatientData {
  id: number;
  userId: number;
  dateOfBirth?: string;
  gender?: string;
  bloodType?: string;
  wilaya?: string;
  commune?: string;
  address?: string;
  emergencyContact?: string;
  medicalHistory?: any;
  allergies?: any;
}

export interface DoctorData {
  id: number;
  userId: number;
  professionalType: string;
  specialization?: string;
  licenseNumber?: string;
  yearsOfExperience?: number;
  wilaya?: string;
  commune?: string;
  address?: string;
  phone?: string;
  website?: string;
  consultationFee?: number;
  bio?: string;
  avatar?: string;
  rating?: number;
  reviewCount?: number;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  patientData: PatientData | null;
  doctorData: DoctorData | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (userType: "patient" | "doctor") => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [doctorData, setDoctorData] = useState<DoctorData | null>(null);
  const [loading, setLoading] = useState(true);

  const meQuery = trpc.auth.me.useQuery();
  const logoutMutation = trpc.auth.logout.useMutation();

  // Load user data on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        if (meQuery.data) {
          setUser(meQuery.data);

          // Load patient or doctor data based on user type
          if (meQuery.data.userType === "patient") {
            // TODO: Fetch patient data
            console.log("[v0] Loading patient data for user:", meQuery.data.id);
          } else if (["doctor", "clinic", "lab"].includes(meQuery.data.userType)) {
            // TODO: Fetch doctor/professional data
            console.log("[v0] Loading professional data for user:", meQuery.data.id);
          }
        }
      } catch (error) {
        console.error("[v0] Error loading user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [meQuery.data]);

  const handleLogin = (userType: "patient" | "doctor") => {
    console.log("[v0] Login initiated for:", userType);
    // Navigation handled by page components
  };

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      setUser(null);
      setPatientData(null);
      setDoctorData(null);
      console.log("[v0] User logged out successfully");
    } catch (error) {
      console.error("[v0] Error during logout:", error);
    }
  };

  const refreshUser = async () => {
    try {
      await meQuery.refetch();
      console.log("[v0] User data refreshed");
    } catch (error) {
      console.error("[v0] Error refreshing user:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        patientData,
        doctorData,
        loading,
        isAuthenticated: !!user,
        login: handleLogin,
        logout: handleLogout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
