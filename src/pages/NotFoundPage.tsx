import { CSSProperties } from "react";
import { HomeButton, Layout, Navigation } from "../assets/css/common";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";

export default function NotFoundPage() {

  const style: CSSProperties = {
    textAlign: "center",
    textShadow: "0px 1px 3px black",
    color: "white"
  }

  return <Layout>
    <Navigation>
      <Link to="/"><HomeButton><HomeIcon/></HomeButton></Link>
    </Navigation>
    <h1 style={style}>404 Page not found</h1>
  </Layout>
}