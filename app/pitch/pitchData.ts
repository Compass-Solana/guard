import type {
	CompetitionFeature,
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

export const COMPETITION_FEATURES = [
	{
		label: "Intent / mandate check",
		detail: "Was this action authorized for this agent?",
		values: { AmberTrace: "no", Kredit: "no", Atbash: "no", "Google AP2": "no", "AWS Cedar": "no", Compass: "yes" },
	},
	{
		label: "$0 authority changes",
		detail: "Catches permission changes with no transfer amount.",
		values: { AmberTrace: "no", Kredit: "no", Atbash: "no", "Google AP2": "no", "AWS Cedar": "no", Compass: "yes" },
	},
	{
		label: "Inbound + outbound context",
		detail: "Inspects prompts, tool results, calls and effects.",
		values: { AmberTrace: "partial", Kredit: "no", Atbash: "partial", "Google AP2": "no", "AWS Cedar": "no", Compass: "yes" },
	},
	{
		label: "Pre-signing enforcement",
		detail: "Decides before the signer makes the action irreversible.",
		values: { AmberTrace: "partial", Kredit: "partial", Atbash: "partial", "Google AP2": "partial", "AWS Cedar": "yes", Compass: "yes" },
	},
	{
		label: "Agent-agnostic adapters",
		detail: "Works across MCP tools, signers and SDKs.",
		values: { AmberTrace: "no", Kredit: "no", Atbash: "no", "Google AP2": "no", "AWS Cedar": "no", Compass: "yes" },
	},
	{
		label: "Audit receipts",
		detail: "Records every input, action and verdict.",
		values: { AmberTrace: "no", Kredit: "no", Atbash: "no", "Google AP2": "no", "AWS Cedar": "no", Compass: "yes" },
	},
] satisfies CompetitionFeature[];

export const MARKET_SEGMENTS: MarketSegment[] = [
	{
		name: "TAM",
		value: 13800,
		displayValue: "$13.8B",
		description: "Virtuals Protocol 30-day trading volume · agent economy proxy",
	},
	{
		name: "SAM",
		value: 8.3,
		displayValue: "~$8.3M",
		description: "x402 $694.6K / 30D × 12 · raw settlement proxy",
	},
	{
		name: "SOM",
		value: 0.3,
		displayValue: "$300K",
		description: "Compass 12-month protected-volume target · 200 agents",
	},
];

export const MARKET_EVIDENCE: MarketEvidence[] = [
	{
		label: "SAM run rate",
		value: "~$8.3M",
		detail: "$694.6K / 30D × 12",
		note: "x402scan global raw volume snapshot",
	},
	{
		label: "Compass SOM",
		value: "$300K",
		detail: "200 agents × $125 / mo × 12",
		note: "3.6% of annualized x402 proxy",
	},
	{
		label: "Funds safeguarded",
		value: "$10K",
		detail: "12-month validation target",
		note: "Separate from protected transaction volume",
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
		metric: "$13.8B",
		metricLabel: "30-day trading volume",
		adoption: "40K+",
		adoptionLabel: "agents / projects",
		metricDate: "official dashboard snapshot · Aug 2026",
		color: "#0D1F17",
	},
	{
		name: "Bankr",
		metric: "API",
		metricLabel: "agent + wallet infrastructure",
		adoption: "N/D",
		adoptionLabel: "public aggregate not disclosed",
		metricDate: "public docs; pipeline status is Compass-reported",
		color: "#B08A4E",
	},
];

export const PRICING_TIERS: PricingTier[] = [
	{
		name: "Starter",
		volume: "$0–5M / yr",
		platformFee: "$2K / mo",
		bps: "15 bps",
	},
	{
		name: "Growth",
		volume: "$5–25M / yr",
		platformFee: "$5K / mo",
		bps: "10 bps",
	},
	{
		name: "Scale",
		volume: "$25M+ / yr",
		platformFee: "$7K / mo",
		bps: "6 bps",
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
