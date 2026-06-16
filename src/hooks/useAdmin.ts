import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface UseAdminReturn {
  isAdmin: boolean;
  isLoading: boolean;
}

export function useAdmin(): UseAdminReturn {
  const { user, isAdmin, isLoading } = useAuth();
  return { isAdmin, isLoading };
}
