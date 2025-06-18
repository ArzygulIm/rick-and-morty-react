// src/store/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// Кастомный хук с типизацией диспетчера
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Кастомный хук с типизацией селектора
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;