export type VerdictKind = "allow" | "escalate" | "deny";

export type PitchSlideMeta = {
	id: string;
	label: string;
	section: string;
};

export type LandscapeRow = {
	name: string;
	category: string;
	gap: string;
	outcome: string;
};

export type CompetitionFeature = {
	label: string;
	detail: string;
	values: Record<string, "yes" | "partial" | "no">;
};

export type MarketSegment = {
	name: string;
	value: number;
	displayValue: string;
	description: string;
};

export type MarketEvidence = {
	label: string;
	value: string;
	detail: string;
	note: string;
	featured?: boolean;
};

export type GtmStage = {
	index: string;
	title: string;
	description?: string;
	current?: boolean;
};

export type TractionTalk = {
	name: string;
	metric: string;
	metricLabel: string;
	adoption: string;
	adoptionLabel: string;
	metricDate: string;
	color: string;
};

export type PricingTier = {
	name: string;
	volume: string;
	platformFee: string;
	bps: string;
	arr: string;
	featured?: boolean;
};

export type TeamMember = {
	name: string;
	role: string;
	bio: string;
	portrait: string;
	logos: Array<{ src: string; alt: string }>;
};

export type UseOfFundsItem = {
	name: string;
	value: number;
	color: string;
};
