import { Config } from "@remotion/cli/config"

// The opening sequence is rendered to an H.264 MP4 at 1080p.
Config.setVideoImageFormat("jpeg")
Config.setJpegQuality(95)
Config.setCodec("h264")
Config.setOverwriteOutput(true)
