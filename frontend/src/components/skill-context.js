import { createContext } from 'react';

export const SkillContext = createContext({
    search: "",
    searched: (searchText) => {}
});