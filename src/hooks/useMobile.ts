export interface MobileContextProps {
    Provider: React.FC,
    Consumer: React.FC,
    children: React.ReactNode,
    admin: boolean
}



const MobileContext = createContext();

const useMobile = () => {
    return useContext(MobileContext);
};