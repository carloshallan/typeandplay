import { Composition, Still } from "remotion"
import { Intro, INTRO } from "./Intro"
import { Banner, BANNER_SIZE } from "../brand/Banner"
import { Logo, LOGO } from "../brand/Logo"

export function RemotionRoot() {
  return (
    <>
      <Composition id="IntroPt" component={Intro} {...INTRO} defaultProps={{ language: "pt" }} />
      <Composition id="IntroEn" component={Intro} {...INTRO} defaultProps={{ language: "en" }} />
      <Still id="BannerPt" component={Banner} {...BANNER_SIZE} defaultProps={{ language: "pt" }} />
      <Still id="BannerEn" component={Banner} {...BANNER_SIZE} defaultProps={{ language: "en" }} />
      <Still component={Logo} {...LOGO} />
    </>
  )
}
