import { PlayButton, Layout, Navigation } from "../assets/css/common";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { addPointsToDb } from "../services/supabase_clients";
import ScoreBubble from "../components/ScoreBubble";
import { useGame } from "../components/GameProvider";
import { useState } from "react";
import { Link } from "react-router-dom";


export default function HomePage() {
  
  const game = useGame()
  const [nickname, setNickname] = useState(game.nickname)

  // Render temporary nickname in the site and also save it in gamecontext
  function updateNickname(newNickname:string) {
    setNickname(newNickname)
    game.nickname = newNickname
  }

  // Return react-dom-router's Link component with mui icon library's Play arrow component.
  // It will basically draw svg icon inside our stylized "PlayButton" div and the whole thing will work as a button
  return <Layout>
    <Navigation>
      <Link to="/play"><PlayButton><PlayArrowIcon/></PlayButton></Link>
      <ScoreBubble></ScoreBubble>
    </Navigation>

    <input value={nickname} onChange={(e) => updateNickname(e.target.value)}></input>
    <button onClick={() => addPointsToDb(game.nickname, game.score)}>Test supabase</button>

    Nickname: {game.nickname}
    
  </Layout>
}
