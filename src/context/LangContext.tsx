import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Lang = 'pt' | 'en';
interface LangCtx { lang: Lang; toggle: () => void; }

const LangContext = createContext<LangCtx>({ lang: 'pt', toggle: () => {} });

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>('pt');
  const toggle = () => setLang(l => l === 'pt' ? 'en' : 'pt');
  return <LangContext.Provider value={{ lang, toggle }}>{children}</LangContext.Provider>;
};

export const useLang = () => useContext(LangContext);
