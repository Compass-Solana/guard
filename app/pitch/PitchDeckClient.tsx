"use client";

import dynamic from "next/dynamic";

const PitchDeck = dynamic(() => import("./PitchDeck").then((module) => module.PitchDeck), {
	ssr: false,
	loading: () => (
		<div
			style={{
				position: "fixed",
				inset: 0,
				display: "grid",
				placeItems: "center",
				background: "#F4F0E6",
				color: "#0D1F17",
				fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
				letterSpacing: "0.16em",
				textTransform: "uppercase",
			}}
		>
			Loading Compass deck…
		</div>
	),
});

export function PitchDeckClient() {
	return <PitchDeck />;
}
