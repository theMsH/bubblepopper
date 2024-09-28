import { useState, CSSProperties } from "react"
import { PopAnimation } from "../assets/css/animations"
import { useGame } from "./GameProvider"
import Lottie from "lottie-react"
import coinAnimData from "../assets/animations/coin.json"


interface BubbleProps {
    maxCount: number
    x: number
    y: number
    speedX: number
    speedY: number
    hasCoin: boolean
}


export function Bubble({ maxCount, x, y, speedX, speedY, hasCoin }: BubbleProps) {

    // Get gamecontext to keep track of score
    const game = useGame()

    // To make game more interesting:
    // Bubble has more value if there is coin inside
    // Raise bubble slowly and make it wiggle around a bit
    const bubbleValue = hasCoin ? 5 : 1
    const message = hasCoin ? "JACKPOP" : "POP"

    const [yState, setY] = useState(y)
    const [xState, setX] = useState(x)
    const [direction, setDirection] = useState(-1)


    // Render bubble position
    function handleBubble() {
        setY(yState-speedY)
        setX(xState+speedX*direction)
    }
    setTimeout(handleBubble, 32) // ~ 30fps

    /* 
        Timeout is basically executed infinite times, even after bubble is removed. It will not cause infinite loop error due to 32ms delay
        This is likely bad way to create raising bubble mechanics, but didn't figure out better way.
    */
    
    // This creates some wavyness for bubble
    function changeDirection() {
        if (direction < 0) {
            setDirection(1)
        }
        else setDirection(-1)
    }
    setTimeout(changeDirection, 3000)

    
    // Init defaultsize based on randomly generated maxCount
    // Adjust size depending on registered clicks. 
    // This will create feeling when the ball is about to pop
    const [clicked, setClicked] = useState(0)
    const defaultSize = (9-maxCount)*10 + 40
    const size = defaultSize + clicked*10

    // Lifecycle variables
    const scoreBubble = document.querySelector("#score-bubble") as HTMLDivElement
    const [gotPoint, setGotPoint] = useState(false)
    const [removed, setRemoved] = useState(false)
    const animDuration = 200
    

    const style: CSSProperties = {
        background: "#00c3ff7d",
        width: size + "px",
        height: size + "px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        position: "absolute",
        userSelect: "none",
        cursor: "pointer",
        transform: `translate(${xState-size/2}px,${yState-size/2}px)`,      // Adjust position accordingly it's dynamic size
        animationName: "popAnim",
        animationIterationCount: "1",
        animationDuration: animDuration + "ms",
        animationFillMode: "forwards",
        animationPlayState: "paused",
        boxShadow: `0 0 ${size/2}px #d7faff7a inset`,
        border: "3px solid rgba(181, 242, 253, 0.582)",
        fontSize: "25px",
        fontWeight: "bolder",
        color: "#00000000",
        transition: "width 0.2s cubic-bezier(0, -2, 0, 2), height 0.2s cubic-bezier(0, -2, 0, 2)"     // Smooth growth
    }

    // Remove ball by returning nothing
    if (removed || yState < 0) {

        // Give point if bubble is underwater
        if (yState > 0 && !gotPoint) {
            setGotPoint(true)
            game.score = game.score + bubbleValue
            // Update value
            scoreBubble.innerText = `${game.score}`
        }
        
        // Here we simply return nothing. I need to figure out better way to destroy this component at the end of its lifecycle.
        return
    }

    // Start ball's pop animation when maxCount reached to give user satisfying pop effect
    if (clicked === maxCount) {
        style.animationPlayState = "running"
        style.color = "#ffffff4e"

        // Set timer to remove component right after animation is played
        setTimeout(() => setRemoved(true), animDuration)
        
        return <>
            <PopAnimation />
            <div style={style}>{message}</div>
        </>
    }
    else {
        // Return with coin object if hasCoin
        return <div style={style} onClick={() => setClicked(clicked + 1)}>
            {hasCoin ? <Lottie animationData={coinAnimData}></Lottie> : null}
        </div> 
    }
}
