'use client';

import { useState, useEffect } from 'react';

export type UserRole = 'free' | 'premium';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<UserRole>('free');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(data.authenticated === true);
        setRole(data.user?.role || 'free');
      })
      .catch(() => {
        setIsAuthenticated(false);
        setRole('free');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { isAuthenticated, role, loading };
}
