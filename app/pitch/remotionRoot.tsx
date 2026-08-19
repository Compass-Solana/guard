import { Composition, registerRoot } from "remotion";
import {
	PITCH_FPS,
	PITCH_HEIGHT,
	PITCH_TOTAL_FRAMES,
	PITCH_WIDTH,
	PitchComposition,
} from "./PitchDeck";

function CompassPitchRoot() {
	return (
		<Composition
			id="CompassPitch"
			component={PitchComposition}
			durationInFrames={PITCH_TOTAL_FRAMES}
			fps={PITCH_FPS}
			width={PITCH_WIDTH}
			height={PITCH_HEIGHT}
		/>
	);
}

registerRoot(CompassPitchRoot);
