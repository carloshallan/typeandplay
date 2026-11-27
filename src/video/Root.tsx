import { Composition, Still } from "remotion"
import { Vinheta, VINHETA } from "./Vinheta"
import { Capa, CAPA } from "../brand/Capa"
import { Logo, LOGO } from "../brand/Logo"

export function RemotionRoot() {
  return (
    <>
      <Composition component={Vinheta} {...VINHETA} />
      <Still component={Capa} {...CAPA} />
      <Still component={Logo} {...LOGO} />
    </>
  )
}
