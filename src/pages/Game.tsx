
import { CSSProperties, useState } from "react"
import { HomeButton, Layout, Navigation, Points } from "../components/common"

interface BallProps {
    maxCount: number
    x: number
    y: number
}

function Ball({ maxCount, x, y }: BallProps) {

    const [clicked, setClicked] = useState(0)

    const style: CSSProperties = {
        background: "aqua",
        width: 50 + "px",
        height: 50 + "px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        position: "absolute",
        userSelect: "none",
        cursor: "pointer",
        transform: `translate(${x}px,${y}px)`
    }

    if (clicked >= maxCount) {
        return <div>X</div>
    }

    return <>
        <div style={style} onClick={() => setClicked(clicked + 1)}>
            {clicked} / {maxCount}
        </div>
    </>
}


function randomInteger(min: number, max: number) {
    const random = Math.floor(Math.random() * (max - min)) + min

    return random
}


export function Game() {

    const allBalls = Array(20).fill(null).map((_, i) => {
        return <Ball
            key={i}
            maxCount={randomInteger(1, 10)}
            x={randomInteger(0, window.innerWidth)}
            y={randomInteger(0, window.innerHeight)}>
        </Ball>
    })

    return (
        <>
            <Layout>
                <Navigation>
                    <HomeButton>Home</HomeButton>
                    <Points></Points>
                </Navigation>

                {allBalls}

            </Layout>
        </>
    )
}
