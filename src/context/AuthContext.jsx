import React, { useState } from 'react';
import { AuthContext } from './authContextStore';
const SUPPORTED_ROLES = ['Guest', 'Buyer', 'Seller', 'Agent'];

const normalizeRole = (role) => {
  if (!role) return 'Guest';
  const titleRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  return SUPPORTED_ROLES.includes(titleRole) ? titleRole : 'Guest';
};

const withRoleFlags = (baseUser = {}) => {
  const role = normalizeRole(baseUser.role);
  return {
    ...baseUser,
    role,
    isGuest: role === 'Guest',
    isBuyer: role === 'Buyer',
    isSeller: role === 'Seller',
    isAgent: role === 'Agent',
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLoggedIn: true,
    role: 'Seller', // 'Guest' | 'Buyer' | 'Seller' | 'Agent'
    name: 'Demo User',
  });

  // Convenience setter for the DevControls widget
  const setRole = (nextRole) => {
    const role = normalizeRole(nextRole);
    if (role === 'Guest') {
      setUser({ isLoggedIn: false, role: 'Guest', name: '' });
    } else {
      setUser({ isLoggedIn: true, role, name: 'Demo User' });
    }
  };

  const authUser = withRoleFlags(user);

  return (
    <AuthContext.Provider value={{ user: authUser, setUser, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};
