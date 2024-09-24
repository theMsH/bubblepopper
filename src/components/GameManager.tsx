import { useState } from "react"
import { Game } from "../pages/Game"
import { GameContext } from "./context"


export interface GameManagerProps {
    score: number
}

export default function GameManager() {

    // Game state
    const [game] = useState<GameManagerProps>({
        score: 0
    })

    // Return Game component inside GameContext.Provider 
    // to be able to use the correct context
    return <div>
        <GameContext.Provider value={game}>
            <Game />
        </GameContext.Provider>
    </div>
}