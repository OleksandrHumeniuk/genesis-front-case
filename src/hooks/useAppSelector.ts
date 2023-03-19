import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { AppState } from '@/redux';

const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default useAppSelector;
