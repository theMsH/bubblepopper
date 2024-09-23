import { HomeButton, Layout, Navigation, Points } from "../components/common"
import { theme} from "../assets/theme"
import { Ball } from "../components/Ball"
import { randomInteger } from "../util/randomInteger"


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
