import { useState } from "react"
import { Game } from "../pages/Game"
import { GameContext } from "../hooks/context"


export interface GameManagerProps {
    score: number
    nickname: string
}

export default function GameManager() {

    // Game state
    const [game] = useState<GameManagerProps>({
        score: 0,
        nickname: ""
    })

    // Return Game component inside GameContext.Provider 
    // to be able to use the correct context
    return <>
        <GameContext.Provider value={game}>
            <Game />
        </GameContext.Provider>
    </>
}
