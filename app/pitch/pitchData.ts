import type {
	GtmStage,
	LandscapeRow,
	MarketEvidence,
	MarketSegment,
	PitchSlideMeta,
	PricingTier,
	TeamMember,
	TractionTalk,
	UseOfFundsItem,
} from "./pitchTypes";

export const PITCH_SLIDES: PitchSlideMeta[] = [
	{ id: "cover", label: "Cover", section: "Compass" },
	{ id: "incident", label: "The incident", section: "Problem" },
	{ id: "attack", label: "Attack anatomy", section: "Problem" },
	{ id: "insight", label: "The insight", section: "Problem" },
	{ id: "solution", label: "The checkpoint", section: "Solution" },
	{ id: "integration", label: "One command", section: "Product" },
	{ id: "landscape", label: "Landscape", section: "Market" },
	{ id: "opportunity", label: "Opportunity", section: "Market" },
	{ id: "gtm", label: "Go to market", section: "Market" },
	{ id: "traction", label: "Traction", section: "Company" },
	{ id: "business", label: "Business model", section: "Company" },
	{ id: "team", label: "Team", section: "Company" },
	{ id: "ask", label: "The ask", section: "Raise" },
	{ id: "close", label: "Close", section: "Compass" },
];

export const LANDSCAPE_ROWS: LandscapeRow[] = [
	{
		name: "AmberTrace",
		category: "Policies",
		gap: "An in-rule transfer still passes.",
		outcome: "Blind to intent",
	},
	{
		name: "Kredit",
		category: "ML scoring",
		gap: "A $0 authority change scores zero.",
		outcome: "Blind to $0",
	},
	{
		name: "Atbash",
		category: "Red lines",
		gap: "Only catches the rules already added.",
		outcome: "Known rules only",
	},
	{
		name: "Google AP2",
		category: "Mandates",
		gap: "A compromised agent can sign a valid mandate.",
		outcome: "Trusts the signer",
	},
	{
		name: "AWS Cedar",
		category: "Pre-signing",
		gap: "AWS-only, with no reasoning on ambiguity.",
		outcome: "Walled garden",
	},
];

export const MARKET_SEGMENTS: MarketSegment[] = [
	{
		name: "TAM",
		value: 8000,
		displayValue: "$8B",
		description: "2026 global agentic commerce transaction value",
	},
	{
		name: "SAM",
		value: 8,
		displayValue: "~$8M",
		description: "Current annualized x402 settlement · Base + Solana",
	},
	{
		name: "SOM",
		value: 0.3,
		displayValue: "$300K",
		description: "Year-2 protected run rate · 200 Solana agents",
	},
];

export const MARKET_EVIDENCE: MarketEvidence[] = [
	{
		label: "SAM run rate",
		value: "~$8M",
		detail: "$717K / 30D × 12",
		note: "Observed x402 settlement · Base + Solana",
	},
	{
		label: "Solana beachhead",
		value: "~$5.6M",
		detail: "70% of x402 monthly volume",
		note: "Inferred annualized share",
	},
	{
		label: "Compass SOM",
		value: "$300K",
		detail: "200 agents × $125 / mo × 12",
		note: "~5.4% of Solana run rate",
		featured: true,
	},
];

export const GTM_STAGES: GtmStage[] = [
	{
		index: "01 · NOW",
		title: "Developers Agentic Commerce on Solana",
		current: true,
	},
	{
		index: "02",
		title: "x402 payments",
	},
	{
		index: "03",
		title: "Crypto agents moving money",
	},
	{
		index: "04 · ENDGAME",
		title: "Enterprise level agents moving money",
	},
];

export const TRACTION_TALKS: TractionTalk[] = [
	{
		name: "Virtuals Protocol",
		metric: "$13.8B+",
		metricLabel: "ecosystem trading volume",
		adoption: "50K+",
		adoptionLabel: "agents launched",
		metricDate: "platform-reported · 2026",
		color: "#0D1F17",
	},
	{
		name: "Bankr",
		metric: "$7.2M",
		metricLabel: "managed across agent wallets",
		adoption: "≈30K",
		adoptionLabel: "agent wallets created",
		metricDate: "public adoption proxy · latest reported count",
		color: "#B08A4E",
	},
];

export const PRICING_TIERS: PricingTier[] = [
	{
		name: "Starter",
		volume: "$0–5M / yr",
		platformFee: "$2K / mo",
		bps: "15 bps",
		arr: "~$27K ARR",
	},
	{
		name: "Growth",
		volume: "$5–25M / yr",
		platformFee: "$5K / mo",
		bps: "10 bps",
		arr: "~$82K ARR",
	},
	{
		name: "Scale",
		volume: "$25M+ / yr",
		platformFee: "$7K / mo",
		bps: "6 bps",
		arr: "~$156K ARR",
		featured: true,
	},
];

export const TEAM_MEMBERS: TeamMember[] = [
	{
		name: "Ramiro Carnicer",
		role: "CEO · Vision · Product",
		bio: "Backend engineer, Mercado Libre — production LLM and agent workflows.",
		portrait: "/pitch-assets/ramiro-carnicer.webp",
		logos: [{ src: "/pitch-assets/mercado-libre.webp", alt: "Mercado Libre" }],
	},
	{
		name: "Lilly Guo",
		role: "CTO · Tech · Ops",
		bio: "Cryptography and Solana — owns the signing-path architecture.",
		portrait: "/pitch-assets/lilly-guo.webp",
		logos: [
			{ src: "/pitch-assets/ethglobal.webp", alt: "ETHGlobal" },
			{ src: "/pitch-assets/polkadot.webp", alt: "Polkadot" },
		],
	},
	{
		name: "Nicole Sikorski",
		role: "CMO · GTM",
		bio: "Binance — positioning and facilitator outreach.",
		portrait: "/pitch-assets/nicole-sikorski.webp",
		logos: [{ src: "/pitch-assets/binance.webp", alt: "Binance" }],
	},
];

export const USE_OF_FUNDS: UseOfFundsItem[] = [
	{ name: "Founder subsistence", value: 48, color: "#B08A4E" },
	{ name: "Validation buffer", value: 13, color: "#0D1F17" },
	{ name: "GTM", value: 12, color: "#A8443A" },
	{ name: "Security audit", value: 10, color: "#B08A4E" },
	{ name: "Infra + judge", value: 10, color: "#0D1F17" },
	{ name: "Legal", value: 7, color: "#A8443A" },
];
