import styled from "styled-components";


// Animate ball from it's current state to fade out effect. 
// Increase text size as it is fading out to create more "poppy" effect
export const PopAnimation = styled.div`
    @keyframes popAnim {
        to { opacity: 0; font-size: 50px;}
    }
`
