import { HomeButton, Layout, Navigation } from "../assets/css/common"
import { theme} from "../assets/css/theme"
import { Bubble } from "../components/Bubble"
import { randomInteger, randomizeCoin } from "../util/randomizer"
import ScoreBubble from "../components/ScoreBubble"
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom"
import { useGame } from "../components/GameProvider"


export function GamePage() {
    /*
        Tehtävän kommentointiosuus 28.9.2024

        Käyttäjäkokemus parannukset:
          - Halusin tehdä pelistä mielenkiintoisemman luomalla meriteeman, jossa pallot ovatkin kuplia.
                Kuplat nousevat pintaan ja ne täytyy ehtiä klikutella, jotta niistä saisi pisteen.
                Jokaisella klikkauksella pallo laajenee hieman, luoden fiiliksen jäljellä olevista klikkausten määristä
          - Kuplalle loin animaatiokomponentin, joka aktivoidaan pallon hajotessa.
          - Lisäksi kuplan sisällä voi olla kolikko, joka tuo lisää pisteitä. Kolikko on .json objekti, jota käytetään Bubble.tsx Lottie kirjaston avulla
          - Lottiesta on hyötyä käyttäjäkokemuksen parantamiseen, koska sillä voidaan tehdä pelistä vielä enemmän mielenkiintoisempi
          - Materialicons kirjastosta on aina hyötyä -> vähentää tekstiä -> vähentää lokalisointia
          - 404 page: käyttäjälle tehdään selväksi, ettei kuulu olla kyseisellä routella, tarjotaan nappula takaisin homepageen

        
        Kehittäjäkokemuksen parannukset:
          - Loin pelikontekstin, joka ylläpitää pisteytystä. Tämän avulla pisteisiin pääsee
               käsiksi joka paikasta käyttämällä customhookkia "useGame()" (löytyy GameProvider.tsx),
               jollon sitä tietoa ei tarvitse välitellä edestakaisin komponenttien välillä. 
               Tiedot kuitenkin katoaa sivun refreshauksen yhteydessä, eli varmaan pitäisi tehdä joku init joka hakee ne localstoragesta
          - Refaktoroin ball komponentin omaan tiedostoon bubble nimellä.
          - Lottien avulla on helppo luoda komponentteja, joilla on monimutkainen animaatio.

        Lottien dokumentaatio ja kolikkoanimaation linkki:
        https://lottiereact.com/components/Lottie#getting-started
        https://app.lottiefiles.com/animation/c243523a-e48f-47c1-b811-1ff4cbabd7d6?channel=web&source=public-animation&panel=download

        Material Icons:
        https://mui.com/material-ui/material-icons/

    */

    const game = useGame()

    // Init score as the new game has begun
    game.score = 0

    // MaxBallsize is basically 130px. This formula is used when calculating bigger size in Ball component
    const maxBallSize = (9-0)*10+40
    const maxClicks = 10

    // Get navigationbar height from theme
    const navHeight = theme.navigationHeight.split('px')[0] as unknown as number

    // Value determines how deep the ball will spawn at minimum
    const startingDepth = 200

    const allBalls = Array(25).fill(null).map((_, i) => {
        return <Bubble
            key={i}
            maxCount={randomInteger(1, maxClicks)}
            // Limit x, y values to fit in the window all times
            // Reduce window to fit ball in it's largest size
            x={randomInteger(maxBallSize/2, window.innerWidth-maxBallSize/2)}
            // Reduce window to fit topAppBar
            y={randomInteger(maxBallSize/2 + startingDepth, window.innerHeight-maxBallSize/2 - navHeight + startingDepth*2)}
            speedX={randomInteger(0,5)*0.03}
            speedY={randomInteger(3,5)*0.3}
            hasCoin={randomizeCoin()}
            >
            </Bubble>
    })

    // Return Homebutton in react-dom-router's Link component, so it doenst refresh the site and will be instantenious. 
    // This helps gamecontext to remember it's values
    return <Layout>
        <Navigation>
            <Link to="/"><HomeButton><HomeIcon/></HomeButton></Link>
            <p>You are playing as: {game.nickname}</p>
            <ScoreBubble/>
        </Navigation>
        {allBalls}

    </Layout>
}
