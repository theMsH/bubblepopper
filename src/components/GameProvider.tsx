import { createContext, PropsWithChildren, useContext, useState } from "react";


type GameProviderProps = PropsWithChildren & {
    score: number
    nickname: string
}

// Create contex, which is supposed to be type of GameProviderProps
// It is undefined if it's not used within GameProvider component and will not work.
// That why we call it from useGame() custom hook to make sure it is defined as GameProviderProps.
export const GameContext = createContext<GameProviderProps | undefined>(undefined)

// Give children parameter, because there will be components rendered inside GameContext.Provider component.
// Here we define context with value of "game"
export default function GameProvider({
    children
}: GameProviderProps) {
    
    // Create variable with correct type for working gamecontext
    const [game] = useState<GameProviderProps>({
        score: 0,
        nickname: ""
    });

    // Return defined GameContext with the child pages inside. This allows us to use gamecontext in multiple pages 
    // e.g. set name in HomePage and display it in GamePage.
    return <GameContext.Provider value={game}>{children}</GameContext.Provider>
}

// Custom hook to get the gamecontext from everywhere.
export function useGame() {

    // We can actually call this, but it is not sure if its defined or not and it will not work. 
    // For better DX we handle it first and raise error if it's not working properly
    const context = useContext(GameContext)

    // If used outside GameContext, throw error, because it is now undefined. We should define it in GameProvider component
    if (!context) {
        throw new Error("useGame() must be used within a GameProvider")
    }

    return context
}