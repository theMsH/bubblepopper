import { CSSProperties, useState } from "react"
import { HomeButton, Layout, Navigation, Points } from "../components/common"
import { PopAnimation } from "../components/animations"
import { theme} from "../assets/theme"



function Ball({ maxCount, x, y }: BallProps) {

    // Create reacthook for clicking the ball
    const [clicked, setClicked] = useState(0)

    // Init defaultsize based on randomly generated maxCount
    const defaultSize = (9-maxCount)*10 + 40
    // Adjust ballsize depending on registered clicks. This will create feeling when the ball is about to pop
    const ballSize = defaultSize + clicked*10
    // Ball's status reacthook
    const [removed, setRemoved] = useState(false)
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
        transform: `translate(${x-ballSize/2}px,${y-ballSize/2}px)`, 
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

    if (clicked >= maxCount) {
        // Start ball's pop animation when maxCount reached to give user satisfying pop effect
        style.animationPlayState = "running"
        style.color = "#00000050"

        // Set timer to remove component right after animation is played
        setTimeout(() => setRemoved(true), animDuration)
    }

    // Remove ball by returning nothing
    if (removed) {
        return <></>
    }

    return <>
        <PopAnimation />
        <div style={style} onClick={() => setClicked(clicked + 1)}>POP
        </div>
    </>
}


function randomInteger(min: number, max: number) {
    const random = Math.floor(Math.random() * (max - min)) + min + 1
    return random
}


interface BallProps {
    maxCount: number
    x: number
    y: number
}


export function Game() {
    // MaxBallsize is basically 130px. This formula is used when calculating bigger size in Ball component
    const maxBallSize = (9-0)*10+40
    const maxClicks = 10

    // Get navigationbar height from theme
    const navHeight = theme.navigationHeight.split('px')[0] as unknown as number

    const allBalls = Array(20).fill(null).map((_, i) => {
        return <Ball
            key={i}
            maxCount={randomInteger(1, maxClicks)}
            // Limit x, y values to fit in the window all times
            // Reduce window to fit ball in it's largest size
            x={randomInteger(maxBallSize/2, window.innerWidth-maxBallSize/2)}
            // Reduce window to fit topAppBar
            y={randomInteger(maxBallSize/2, window.innerHeight-maxBallSize/2 - navHeight)}>
        </Ball>
    })

    return (
        <>
            <Layout>
                <Navigation>
                    <HomeButton>Quit</HomeButton>
                    <Points>0</Points>
                </Navigation>
               
                {allBalls}

            </Layout>
        </>
    )
}
