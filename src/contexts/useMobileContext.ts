import { createContext, useContext } from "react";

export interface MobileContextProps {
    Provider: React.FC,
    Consumer: React.FC,
    children: React.ReactNode,
    setMobile: React.Dispatch<React.SetStateAction<boolean>>,
    mobile: boolean,
    mobileDisplays: boolean,
    setMobileDisplays: React.Dispatch<React.SetStateAction<boolean>>,
    mobileHeight: number,
    mobileWidth: number,
    setMobileHeight: React.Dispatch<React.SetStateAction<number>>,
    setMobileWidth: React.Dispatch<React.SetStateAction<number>>,
    menuShowing: boolean,
    setMenuShowing: React.Dispatch<React.SetStateAction<boolean>>,
    fullScreen: boolean,
    setFullScreen: React.Dispatch<React.SetStateAction<boolean>>
}



export const MobileContext = createContext<MobileContextProps>({} as MobileContextProps);

export const useMobile = () => {
    return useContext(MobileContext);
};