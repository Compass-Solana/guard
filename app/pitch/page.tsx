import type { Metadata } from "next";
import { PitchDeckClient } from "./PitchDeckClient";

export const metadata: Metadata = {
	metadataBase: new URL("https://compassguard.xyz"),
	title: "Compass Guard · Pitch deck",
	description:
		"Compass Guard is the execution firewall between AI-agent intent and financial execution.",
	openGraph: {
		title: "Compass Guard · Execution firewall for autonomous agents",
		description: "Run agents that can pay, act and prove what happened — without giving up control.",
		images: ["/compass-banner.png"],
	},
};

export default function PitchPage() {
	return <PitchDeckClient />;
}
