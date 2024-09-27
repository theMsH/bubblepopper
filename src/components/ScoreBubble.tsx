import { useGame } from "./GameProvider"
import { CSSProperties } from "styled-components"


export default function ScoreBubble() {
    const game = useGame()

    const style: CSSProperties = {
        width: "50px",
        height: "50px",
        background: "#00aeff4e",
        marginRight: "10px",
        borderRadius: "50%",
        textAlign: "center",
        alignContent: "center",
        boxShadow: "0 0 25px #effdff inset",
        border: "3px solid rgba(255, 255, 255, 0.63)"
    }

    return <div id="score-bubble" style={style}>
        {game.score}
    </div>
}
