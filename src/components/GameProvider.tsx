import { createContext, PropsWithChildren, useContext, useState } from "react";

type GameProviderProps = PropsWithChildren & {
    score: number
    nickname: string
}

export const GameContext = createContext<GameProviderProps | undefined>(undefined)


export default function GameProvider({
    children
}: GameProviderProps) {
    
    const [game] = useState<GameProviderProps | undefined>({
        score: 0,
        nickname: ""
    });

    return <GameContext.Provider value={game}>{children}</GameContext.Provider>
}

// Custom hook to get the gamecontext
export function useGame() {

    // Init game to use GameContext
    const context = useContext(GameContext)

    // If used outside GameContext, throw error
    if (!context) {
        throw new Error("useGame() must be used within a GameProvider")
    }

    return context
}