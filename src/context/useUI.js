import { useContext } from 'react';
import { UIContext } from './uiContextStore';

export const useUI = () => useContext(UIContext);
