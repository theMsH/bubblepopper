import { useState } from "react";
import { addPointsToDb } from "./services/supabase_clients";
import { PlayButton, Layout, Navigation } from "./components/common";

export default function App() {

  const [nickname, setNickname] = useState("")

  return <Layout>
    <Navigation>
      <PlayButton onClick={() => { window.location.href = "/game" }}>Play</PlayButton>
    </Navigation>

    <input value={nickname} onChange={(e) => setNickname(e.target.value)}></input>
    <button onClick={() => addPointsToDb(nickname, 0)}>Testaa supabase</button>

    Nimimerkki: {nickname}

  </Layout>
}
