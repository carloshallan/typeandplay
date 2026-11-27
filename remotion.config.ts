import { existsSync } from "node:fs"
import { Config } from "@remotion/cli/config"

// The opening sequence is rendered to an H.264 MP4 at 1080p.
Config.setVideoImageFormat("jpeg")
Config.setJpegQuality(95)
Config.setCodec("h264")
Config.setOverwriteOutput(true)

// Remotion's own headless Chrome closes as soon as it opens on this Mac
// ("Target closed"), so renders use the installed Google Chrome when there is one.
const SYSTEM_CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
if (existsSync(SYSTEM_CHROME)) Config.setBrowserExecutable(SYSTEM_CHROME)
