import { createContext, useContext } from "react";
import { GameManagerProps } from "./GameManager";



// Create gamecontext which should be type of GameManager
export const GameContext = createContext<GameManagerProps | undefined>(undefined)

// Custom hook to use same gamecontext elsewhere in code
// This is called when setting/getting gamedata
export function useGameContext() {

    // Init game to use GameContext
    const game = useContext(GameContext)

    // If used outside GameContext, throw error
    if (!game) {
        throw new Error("useUserContext must be used with a GameContext")
    }

    return game
}