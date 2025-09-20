import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, IPTVOffer, AndroidBox, AdminSettings } from '../lib/supabase';

interface AdminContextType {
  isAuthenticated: boolean;
  showLogin: boolean;
  iptvOffers: IPTVOffer[];
  androidBoxes: AndroidBox[];
  adminSettings: AdminSettings | null;
  loading: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateIPTVOffer: (id: string, data: Partial<IPTVOffer>) => Promise<void>;
  addIPTVOffer: (data: Omit<IPTVOffer, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  deleteIPTVOffer: (id: string) => Promise<void>;
  updateAndroidBox: (id: string, data: Partial<AndroidBox>) => Promise<void>;
  addAndroidBox: (data: Omit<AndroidBox, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  deleteAndroidBox: (id: string) => Promise<void>;
  updateAdminSettings: (data: Partial<AdminSettings>) => Promise<void>;
  setShowLogin: (show: boolean) => void;
  refreshData: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [iptvOffers, setIptvOffers] = useState<IPTVOffer[]>([]);
  const [androidBoxes, setAndroidBoxes] = useState<AndroidBox[]>([]);
  const [adminSettings, setAdminSettings] = useState<AdminSettings | null>(null);
  const [loading, setLoading] = useState(false);

  // Load data from Supabase
  const refreshData = async () => {
    try {
      setLoading(true);
      
      // Fetch IPTV offers
      const { data: iptvData, error: iptvError } = await supabase
        .from('iptv_offers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (iptvError) throw iptvError;
      setIptvOffers(iptvData || []);

      // Fetch Android boxes
      const { data: androidData, error: androidError } = await supabase
        .from('android_boxes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (androidError) throw androidError;
      setAndroidBoxes(androidData || []);

      // Fetch admin settings
      const { data: settingsData, error: settingsError } = await supabase
        .from('admin_settings')
        .select('*')
        .limit(1)
        .single();
      
      if (settingsError && settingsError.code !== 'PGRST116') throw settingsError;
      setAdminSettings(settingsData || null);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
    
    // Check if admin is already logged in
    const adminSession = sessionStorage.getItem('technsat-admin');
    if (adminSession === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === 'wassim1' && password === 'zed18666') {
      setIsAuthenticated(true);
      setShowLogin(false);
      sessionStorage.setItem('technsat-admin', 'authenticated');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setShowLogin(false);
    sessionStorage.removeItem('technsat-admin');
  };

  // IPTV Offers CRUD
  const updateIPTVOffer = async (id: string, data: Partial<IPTVOffer>) => {
    try {
      const { error } = await supabase
        .from('iptv_offers')
        .update(data)
        .eq('id', id);
      
      if (error) throw error;
      await refreshData();
    } catch (error) {
      console.error('Error updating IPTV offer:', error);
      throw error;
    }
  };

  const addIPTVOffer = async (data: Omit<IPTVOffer, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('iptv_offers')
        .insert([data]);
      
      if (error) throw error;
      await refreshData();
    } catch (error) {
      console.error('Error adding IPTV offer:', error);
      throw error;
    }
  };

  const deleteIPTVOffer = async (id: string) => {
    try {
      const { error } = await supabase
        .from('iptv_offers')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      await refreshData();
    } catch (error) {
      console.error('Error deleting IPTV offer:', error);
      throw error;
    }
  };

  // Android Boxes CRUD
  const updateAndroidBox = async (id: string, data: Partial<AndroidBox>) => {
    try {
      const { error } = await supabase
        .from('android_boxes')
        .update(data)
        .eq('id', id);
      
      if (error) throw error;
      await refreshData();
    } catch (error) {
      console.error('Error updating Android box:', error);
      throw error;
    }
  };

  const addAndroidBox = async (data: Omit<AndroidBox, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('android_boxes')
        .insert([data]);
      
      if (error) throw error;
      await refreshData();
    } catch (error) {
      console.error('Error adding Android box:', error);
      throw error;
    }
  };

  const deleteAndroidBox = async (id: string) => {
    try {
      const { error } = await supabase
        .from('android_boxes')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      await refreshData();
    } catch (error) {
      console.error('Error deleting Android box:', error);
      throw error;
    }
  };

  // Admin Settings
  const updateAdminSettings = async (data: Partial<AdminSettings>) => {
    try {
      if (adminSettings) {
        const { error } = await supabase
          .from('admin_settings')
          .update(data)
          .eq('id', adminSettings.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('admin_settings')
          .insert([{ ...data, service_name: data.service_name || 'TechnSat chez Wassim' }]);
        
        if (error) throw error;
      }
      await refreshData();
    } catch (error) {
      console.error('Error updating admin settings:', error);
      throw error;
    }
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      showLogin,
      iptvOffers,
      androidBoxes,
      adminSettings,
      loading,
      login,
      logout,
      updateIPTVOffer,
      addIPTVOffer,
      deleteIPTVOffer,
      updateAndroidBox,
      addAndroidBox,
      deleteAndroidBox,
      updateAdminSettings,
      setShowLogin,
      refreshData
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}