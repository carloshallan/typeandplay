import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces"
import { loadFont as loadVT323 } from "@remotion/google-fonts/VT323"

// The two typefaces of the brand, loaded once for every video and still.
loadFraunces("normal", { weights: ["300", "400", "500"], subsets: ["latin", "latin-ext"] })
loadFraunces("italic", { weights: ["300", "400"], subsets: ["latin", "latin-ext"] })
loadVT323("normal", { weights: ["400"], subsets: ["latin", "latin-ext"] })
