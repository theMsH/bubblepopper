import { useState } from "react";
import { addPointsToDb } from "./services/supabase_clients";
import { HomeButton, Layout, Navigation } from "./components/common";


export default function App() {

  const [nickname, setNickname] = useState("")

  return <Layout>
    <Navigation>
      <HomeButton>Home</HomeButton>
    </Navigation>

    <input value={nickname} onChange={(e) => setNickname(e.target.value)}></input>
    <button onClick={() => addPointsToDb(nickname, 0)}>Testaa supabase</button>

    Nimimerkki: {nickname}

  </Layout>
}
