import { useState, CSSProperties } from "react"
import { PopAnimation } from "./animations"
import { useGameContext } from "./context"


interface BallProps {
    maxCount: number
    x: number
    y: number
    speedX: number
    speedY: number
}

export function Ball({ maxCount, x, y, speedX, speedY }: BallProps) {

    // Get gamecontext to keep track of score
    const game = useGameContext()

    // To make game more interesting
    // raise bubble slowly and make it wiggle around a bit
    const [yState, setY] = useState(y)
    const [xState, setX] = useState(x)
    const [direction, setDirection] = useState(-1)

    function handleBubble() {
        setY(yState-speedY)
        setX(xState+speedX*direction)
    }
    setTimeout(handleBubble, 32) // ~ 30fps
    
    function changeDirection() {
        if (direction < 0) {
            setDirection(1)
        }
        else setDirection(-1)
    }
    setTimeout(changeDirection, 3000)
   

    // Create hook for clicking the ball
    const [clicked, setClicked] = useState(0)

    // Init defaultsize based on randomly generated maxCount
    const defaultSize = (9-maxCount)*10 + 40

    // Adjust ballsize depending on registered clicks. 
    // This will create feeling when the ball is about to pop
    const ballSize = defaultSize + clicked*10

    // Ball's alivestatus
    const [removed, setRemoved] = useState(false)
    const [gotPoint, setGotPoint] = useState(false)


    // Popanimations duration in millis
    const animDuration = 200
    
    const style: CSSProperties = {
        background: "#00c3ff7d",
        // Adjust ballsize
        width: ballSize + "px",
        height: ballSize + "px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        position: "absolute",
        userSelect: "none",
        cursor: "pointer",
        // Adjust position accordingly it's dynamic size
        transform: `translate(${xState-ballSize/2}px,${yState-ballSize/2}px)`, 
        animationName: "popAnim",
        animationIterationCount: "1",
        animationDuration: animDuration + "ms",
        animationFillMode: "forwards",
        animationPlayState: "paused",
        boxShadow: `0 0 ${ballSize/2}px #d7faff7a inset`,
        border: "3px solid rgba(181, 242, 253, 0.582)",
        fontSize: "25px",
        color: "#00000000"
    }
 
    // Remove ball by returning nothing
    if (removed || yState < 0) {
        if (yState > 0 && !gotPoint) {
            setGotPoint(true)
            // Give point
            game.score = game.score + 1
            // Log score for now (strictmode causes dublicate score)
            console.log(game.score)
        }
        return <></>
    }

    if (clicked == maxCount) {
        // Start ball's pop animation when maxCount reached to give user satisfying pop effect
        style.animationPlayState = "running"
        style.color = "#00000050"

        // Set timer to remove component right after animation is played
        setTimeout(() => setRemoved(true), animDuration)

        return <>
            <PopAnimation />
            <div style={style}>POP
            </div>
        </>
    }
    else {
        return <>
        <div style={style} onClick={() => setClicked(clicked + 1)}>POP</div>
    </>
    }
  
}
