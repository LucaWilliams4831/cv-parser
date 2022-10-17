import { createContext } from 'react';

export const PositionContext = createContext({
    position: "",
    positioned: (positionText) => {}
});