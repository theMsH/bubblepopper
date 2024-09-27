import { PlayButton, Layout, Navigation } from "../components/common";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { addPointsToDb } from "../services/supabase_clients";
import ScoreBubble from "../components/ScoreBubble";
import { useGame } from "../components/GameProvider";
import { useState } from "react";


export default function HomePage() {
  
  const game = useGame()
  const [nickname, setNickname] = useState(game.nickname)

  function updateNickname(newNickname:string) {
    setNickname(newNickname)
    game.nickname = newNickname
  }

  return <Layout>
    <Navigation>
      <PlayButton onClick={() => { window.location.href = "/game" }}><PlayArrowIcon/></PlayButton>
      <ScoreBubble></ScoreBubble>
    </Navigation>

    <input value={nickname} onChange={(e) => updateNickname(e.target.value)}></input>
    <button onClick={() => addPointsToDb(game.nickname, game.score)}>Test supabase</button>

    Nickname: {game.nickname}
    
  </Layout>
}
