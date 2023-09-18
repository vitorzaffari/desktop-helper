// import { createContext, useState, useEffect, ReactNode } from "react";

// interface TranslateContextValues {
//   dateFormHeight: number;
//   setDateFormHeight: React.Dispatch<React.SetStateAction<number>>;
//   setIsDateFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   isDateFormOpen: boolean;
// }

// const TranslateContext = createContext<TranslateContextValues>(
//  { dateFormHeight: 0,
//   setDateFormHeight: () => {},
//   setIsDateFormOpen: () => {},
//   isDateFormOpen: false
// }
// );

// interface TranslateContextProviderProps {
//   children: ReactNode;
// }
// const TranslateContextProvider = ({
//   children,
// }: TranslateContextProviderProps) => {
//   const [dateFormHeight, setDateFormHeight] = useState(0);
//   const [isDateFormOpen, setIsDateFormOpen] = useState(false);

//   const contextValues: TranslateContextValues = {
//     dateFormHeight,
//     setDateFormHeight,
//     isDateFormOpen,
//     setIsDateFormOpen,
//   };

//   useEffect(() => {
//     // console.log(dateFormHeight);
//   }, [isDateFormOpen]);

//   return (
//     <TranslateContext.Provider value={contextValues}>
//       {children}
//     </TranslateContext.Provider>
//   );
// };

// export { TranslateContext, TranslateContextProvider };
