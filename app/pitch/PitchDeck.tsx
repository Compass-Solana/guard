"use client";

import type { CallbackListener, PlayerRef } from "@remotion/player";
import { Player } from "@remotion/player";
import {
	ArrowLeft,
	ArrowRight,
	Bot,
	Check,
	CircleDollarSign,
	Code2,
	Expand,
	Eye,
	FileCheck2,
	Grid2X2,
	Pause,
	Play,
	RotateCcw,
	Route,
	ShieldCheck,
	Sparkles,
	SquareTerminal,
	WalletCards,
	X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Cell, Pie, PieChart } from "recharts";
import {
	AbsoluteFill,
	Easing,
	Img,
	Series,
	interpolate,
	staticFile,
	useCurrentFrame,
} from "remotion";
import {
	GTM_STAGES,
	COMPETITION_FEATURES,
	MARKET_EVIDENCE,
	MARKET_SEGMENTS,
	PITCH_SLIDES,
	PRICING_TIERS,
	TEAM_MEMBERS,
	TRACTION_TALKS,
	USE_OF_FUNDS,
} from "./pitchData";
import type { VerdictKind } from "./pitchTypes";
import styles from "./PitchDeck.module.css";

export const PITCH_FPS = 30;
export const PITCH_SLIDE_FRAMES = 210;
export const PITCH_SLIDE_STEP = PITCH_SLIDE_FRAMES;
export const PITCH_REVEALED_FRAME = 84;
export const PITCH_WIDTH = 1600;
export const PITCH_HEIGHT = 900;
export const PITCH_TOTAL_FRAMES = PITCH_SLIDES.length * PITCH_SLIDE_FRAMES;

const FPS = PITCH_FPS;
const SLIDE_FRAMES = PITCH_SLIDE_FRAMES;
const SLIDE_STEP = PITCH_SLIDE_STEP;
const REVEALED_FRAME = PITCH_REVEALED_FRAME;
const COMPOSITION_WIDTH = PITCH_WIDTH;
const COMPOSITION_HEIGHT = PITCH_HEIGHT;
const TOTAL_FRAMES = PITCH_TOTAL_FRAMES;

const ACCENT = "#B08A4E";
const GOOD = "#17453A";
const WARN = "#B08A4E";
const BAD = "#A8443A";

function slideStart(index: number) {
	return index * SLIDE_STEP;
}

function slideAtFrame(frame: number) {
	return Math.min(
		PITCH_SLIDES.length - 1,
		Math.max(0, Math.floor(frame / SLIDE_STEP)),
	);
}

function appear(frame: number, delay = 0, duration = 24) {
	return interpolate(frame, [delay, delay + duration], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
}

function Reveal({
	children,
	className,
}: {
	children: ReactNode;
	delay?: number;
	distance?: number;
	className?: string;
}) {
	return (
		<div className={className}>
			{children}
		</div>
	);
}

function Eyebrow({ children, tone = "accent" }: { children: ReactNode; tone?: VerdictKind | "accent" }) {
	return (
		<div
			className={styles.eyebrow}
			style={{
				color: tone === "allow" ? GOOD : tone === "escalate" ? WARN : tone === "deny" ? BAD : ACCENT,
			}}
		>
			{children}
		</div>
	);
}

function VerdictPill({ verdict, children }: { verdict: VerdictKind; children?: ReactNode }) {
	const color = verdict === "allow" ? GOOD : verdict === "escalate" ? WARN : BAD;
	return (
		<span className={styles.verdictPill} style={{ color, borderColor: `${color}66`, background: `${color}1C` }}>
			{children ?? verdict}
		</span>
	);
}

function BackgroundGrid() {
	return (
		<>
			<div className={styles.gridBackground} />
			<div className={styles.glowOne} />
			<div className={styles.glowTwo} />
		</>
	);
}

function SlideShell({
	children,
	index,
	variant = "default",
}: {
	children: ReactNode;
	index: number;
	variant?: "default" | "danger" | "light";
}) {
	return (
		<AbsoluteFill
			className={`${styles.slide} ${variant === "danger" ? styles.slideDanger : ""} ${variant === "light" ? styles.slideLight : ""}`}
		>
			<BackgroundGrid />
			<div className={styles.slideChrome}>
				<div className={styles.slideBrand}>
					<Img src={staticFile("pitch-assets/compass-brand-logo.webp")} className={styles.slideBrandLogo} />
					<span>Compass · execution firewall</span>
				</div>
				<div className={styles.slideNumber}>{String(index + 1).padStart(2, "0")}</div>
			</div>
			<div className={styles.slideBody}>{children}</div>
		</AbsoluteFill>
	);
}

function CoverSlide() {
	const frame = useCurrentFrame();
	return (
		<SlideShell index={0}>
			<div className={styles.coverGrid}>
				<div>
					<Reveal delay={2}>
						<div className={styles.coverBrand}>
							<Img src={staticFile("pitch-assets/compass-brand-logo.webp")} className={styles.coverLogo} />
							<span>Compass Guard</span>
						</div>
					</Reveal>
					<Reveal delay={10}>
						<h1 className={styles.coverTitle}>
							The only place where your agents <span className={styles.accentText}>live safe.</span>
						</h1>
					</Reveal>
					<Reveal delay={25}>
						<p className={styles.coverLead}>Run agents that can pay, act and prove what happened.</p>
					</Reveal>
					<Reveal delay={38}>
						<div className={styles.coverTag}>Intent enforcement for agents that move money</div>
					</Reveal>
				</div>
				<div className={styles.mascotStage}>
					<div
						className={styles.orbit}
						style={{ rotate: `${interpolate(frame, [0, SLIDE_FRAMES], [0, 36])}deg` }}
					/>
					<Img
						src={staticFile("pitch-assets/compass-mascot.webp")}
						className={styles.mascot}
						style={{
							opacity: appear(frame, 14, 28),
							scale: interpolate(frame, [14, 46], [0.84, 1], {
								extrapolateLeft: "clamp",
								extrapolateRight: "clamp",
								easing: Easing.bezier(0.16, 1, 0.3, 1),
							}),
							translate: `0 ${Math.sin(frame / 14) * 8}px`,
						}}
					/>
					<div className={styles.orbitLabel} style={{ opacity: appear(frame, 40, 20) }}>
						<ShieldCheck size={25} /> before the signer
					</div>
				</div>
			</div>
		</SlideShell>
	);
}

function IncidentSlide() {
	const frame = useCurrentFrame();
	return (
		<SlideShell index={1} variant="danger">
			<div className={styles.twoColumnWide}>
				<div>
					<Reveal delay={2}><Eyebrow tone="deny">Grok incident · May 2026</Eyebrow></Reveal>
					<Reveal delay={10}>
						<h2 className={styles.giantNumber}>
							${Math.round(interpolate(frame, [10, 44], [0, 175], {
								extrapolateLeft: "clamp",
								extrapolateRight: "clamp",
								easing: Easing.bezier(0.16, 1, 0.3, 1),
							}))}K
						</h2>
					</Reveal>
					<Reveal delay={22}>
						<p className={styles.incidentLead}>lost by an autonomous agent.</p>
					</Reveal>
				</div>
				<div className={styles.incidentPanel}>
					{[
						["Private key", "Valid", Check, GOOD],
						["Transaction", "Valid", Check, GOOD],
						["Owner intent", "Violated", X, BAD],
					].map(([label, value, Icon, color], index) => (
						<div
							className={styles.incidentRow}
							key={String(label)}
							style={{ opacity: appear(frame, 18 + index * 10, 20), translate: `${interpolate(frame, [18 + index * 10, 38 + index * 10], [28, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px 0` }}
						>
							<div className={styles.incidentIcon} style={{ color: String(color), borderColor: `${String(color)}55` }}>
								<Icon size={27} />
							</div>
							<span>{String(label)}</span>
							<strong style={{ color: String(color) }}>{String(value)}</strong>
						</div>
					))}
					<div className={styles.incidentConclusion} style={{ opacity: appear(frame, 55, 20) }}>
						The transaction was valid — but outside the owner&apos;s intent.
					</div>
				</div>
			</div>
		</SlideShell>
	);
}

function AttackSlide() {
	const frame = useCurrentFrame();
	const nodes = [
		{ icon: Eye, title: "$0 authority change", copy: "A harmless-looking NFT expands permissions.", tone: WARN },
		{ icon: Code2, title: "Hidden instruction", copy: "A Morse payload hijacks the agent's next action.", tone: BAD },
		{ icon: WalletCards, title: "Valid signature", copy: "The signer sees a technically valid transaction.", tone: WARN },
		{ icon: CircleDollarSign, title: "$175K settled", copy: "On-chain means irreversible.", tone: BAD },
	];
	return (
		<SlideShell index={2}>
			<Reveal delay={2}><Eyebrow tone="deny">Attack anatomy</Eyebrow></Reveal>
			<Reveal delay={8}><h2 className={styles.headline}>Four valid steps. One catastrophic outcome.</h2></Reveal>
			<div className={styles.attackFlow}>
				{nodes.map((node, index) => {
					const start = 18 + index * 13;
					const Icon = node.icon;
					return (
						<div className={styles.attackNodeWrap} key={node.title}>
							<div
								className={styles.attackNode}
								style={{
									opacity: appear(frame, start, 20),
									scale: interpolate(frame, [start, start + 22], [0.88, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }),
									borderColor: `${node.tone}55`,
								}}
							>
								<div className={styles.attackIcon} style={{ color: node.tone, background: `${node.tone}18` }}><Icon size={31} /></div>
								<div className={styles.attackIndex}>0{index + 1}</div>
								<h3>{node.title}</h3>
								<p>{node.copy}</p>
							</div>
							{index < nodes.length - 1 ? (
								<div className={styles.attackConnector}>
									<div style={{ width: `${interpolate(frame, [start + 16, start + 34], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%` }} />
									<ArrowRight size={22} />
								</div>
							) : null}
						</div>
					);
				})}
			</div>
			<Reveal delay={72} className={styles.bottomStatement}>
				No stolen key. No smart-contract exploit. No human to catch the mismatch.
			</Reveal>
		</SlideShell>
	);
}

function InsightSlide() {
	const frame = useCurrentFrame();
	return (
		<SlideShell index={3}>
			<Reveal delay={2}><Eyebrow>The category error</Eyebrow></Reveal>
			<Reveal delay={8}><h2 className={styles.headline}>The damage wasn&apos;t in the amount. It was in the mandate.</h2></Reveal>
			<div className={styles.insightGrid}>
				<div className={styles.questionCard} style={{ opacity: appear(frame, 22, 24) }}>
					<div className={styles.cardLabel}>Every other layer asks</div>
					<div className={styles.question}>“Does this transaction look malicious?”</div>
					<div className={styles.signalList}>
						<span>amount: $0</span><span>signature: valid</span><span>contract: valid</span>
					</div>
					<VerdictPill verdict="allow">allow</VerdictPill>
				</div>
				<div className={styles.questionArrow} style={{ opacity: appear(frame, 36, 16) }}><ArrowRight size={38} /></div>
				<div className={`${styles.questionCard} ${styles.questionCardWin}`} style={{ opacity: appear(frame, 42, 24) }}>
					<div className={styles.cardLabel}>Compass asks</div>
					<div className={styles.question}>“Was this authorized for <em>this</em> agent?”</div>
					<div className={styles.signalList}>
						<span>effect: authority change</span><span>recipient: unknown</span><span>intent: mismatch</span>
					</div>
					<VerdictPill verdict="deny">deny</VerdictPill>
				</div>
			</div>
		</SlideShell>
	);
}

function SolutionSlide() {
	const frame = useCurrentFrame();
	const inboundProgress = interpolate(frame, [12, 44], [0, 100], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const outboundProgress = interpolate(frame, [42, 74], [0, 100], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	return (
		<SlideShell index={4}>
			<Eyebrow tone="allow">How Compass works</Eyebrow>
			<h2 className={styles.headline}>Your agent lives inside Compass. We inspect everything that enters and leaves.</h2>
			<div className={styles.agentBoundaryScene}>
				<div className={styles.ioColumn}>
					<div className={styles.ioDirection}>Enters the agent</div>
					<div><SquareTerminal size={19} /><span>Prompts</span></div>
					<div><Route size={19} /><span>Tool results</span></div>
					<div><WalletCards size={19} /><span>Payment requests</span></div>
				</div>
				<div className={styles.guardRail}>
					<span />
					<i style={{ left: `${inboundProgress}%`, opacity: appear(frame, 10, 10) }} />
					<ArrowRight size={25} />
				</div>
				<div className={styles.compassBoundary}>
					<div className={styles.compassBoundaryHead}>
						<Img src={staticFile("pitch-assets/compass-brand-logo.webp")} />
						<div><strong>Compass</strong><span>execution perimeter</span></div>
						<b><i /> active</b>
					</div>
					<div className={styles.compassBoundaryBody}>
						<div className={styles.inspectionNode} style={{ opacity: appear(frame, 18, 16) }}>
							<Eye size={24} /><strong>Inbound check</strong><span>source · permissions · context</span>
						</div>
						<div
							className={styles.agentCore}
							style={{
								scale: interpolate(frame, [30, 52], [0.92, 1], {
									extrapolateLeft: "clamp",
									extrapolateRight: "clamp",
									easing: Easing.bezier(0.16, 1, 0.3, 1),
								}),
							}}
						>
							<Bot size={44} /><strong>Your agent</strong><span>reason · plan · act</span>
						</div>
						<div className={styles.inspectionNode} style={{ opacity: appear(frame, 48, 16) }}>
							<ShieldCheck size={24} /><strong>Outbound check</strong><span>intent · policy · effect</span>
						</div>
					</div>
					<div className={styles.compassBoundaryFoot}>
						<FileCheck2 size={18} /> Every input, action and verdict is recorded.
					</div>
				</div>
				<div className={styles.guardRail}>
					<span />
					<i style={{ left: `${outboundProgress}%`, opacity: appear(frame, 40, 10) }} />
					<ArrowRight size={25} />
				</div>
				<div className={styles.ioColumn}>
					<div className={styles.ioDirection}>Leaves the agent</div>
					<div><Code2 size={19} /><span>Tool calls</span></div>
					<div><CircleDollarSign size={19} /><span>Transactions</span></div>
					<div><FileCheck2 size={19} /><span>Audit receipts</span></div>
				</div>
			</div>
		</SlideShell>
	);
}

function IntegrationSlide() {
	const frame = useCurrentFrame();
	const usageSteps = [
		{ label: "Use CLI", detail: "compass init", icon: SquareTerminal },
		{ label: "Enter Compass", detail: "compass login", icon: Route },
		{ label: "Set permissions", detail: "compass policy set", icon: ShieldCheck },
		{ label: "Run agent", detail: "compass run", icon: CircleDollarSign },
		{ label: "Done", detail: "guardrails active", icon: FileCheck2 },
	];
	return (
		<SlideShell index={5}>
			<div className={styles.integrationGrid}>
				<div>
					<Reveal delay={2}><Eyebrow>Integration</Eyebrow></Reveal>
					<Reveal delay={8}><h2 className={styles.headline}>One command to run them all.</h2></Reveal>
					<Reveal delay={20}><p className={styles.lead}>No new wallet. No custody. No rewrite of the agent&apos;s reasoning loop.</p></Reveal>
					<div className={styles.integrationBullets}>
						{["MCP compatibility mode", "Normalized safe tools", "Signer and SDK adapters"].map((item, index) => (
							<div key={item} style={{ opacity: appear(frame, 36 + index * 8, 16) }}><Check size={20} /> {item}</div>
						))}
					</div>
				</div>
				<div className={styles.usageFlowPanel}>
					<div className={styles.usageFlowCommand}>$ compass</div>
					<div className={styles.usageFlowCaption}>Install once. Configure once. Run guarded.</div>
					<div className={styles.usageFlow}>
						{usageSteps.map((step, index) => {
							const Icon = step.icon;
							const delay = 28 + index * 10;
							return (
								<div className={styles.usageFlowItem} key={step.label}>
									<div className={styles.usageFlowNode} style={{ opacity: appear(frame, delay, 14), translate: `0 ${interpolate(frame, [delay, delay + 14], [12, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) })}px` }}>
										<div className={styles.usageFlowIcon}><Icon size={20} /></div>
										<div><strong>{step.label}</strong><span>{step.detail}</span></div>
									</div>
									{index < usageSteps.length - 1 && <div className={styles.usageFlowConnector} style={{ opacity: appear(frame, delay + 7, 12) }} />}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</SlideShell>
	);
}

function LandscapeSlide() {
	const frame = useCurrentFrame();
	const columns = [
		{ label: "Policy & scoring", members: ["AmberTrace", "Kredit", "Atbash"] },
		{ label: "Mandates & infra", members: ["Google AP2", "AWS Cedar"] },
		{ label: "Compass", members: ["Compass"] },
	];
	const groupedStatus = (values: Record<string, "yes" | "partial" | "no">, members: string[]) => {
		const statuses = members.map((member) => values[member]);
		if (statuses.every((status) => status === "yes")) return "yes";
		if (statuses.some((status) => status === "yes" || status === "partial")) return "partial";
		return "no";
	};
	return (
		<SlideShell index={6}>
			<Reveal delay={2}><Eyebrow>The landscape</Eyebrow></Reveal>
			<Reveal delay={8}><h2 className={styles.headline}>Others guard a slice. Compass enforces the full mandate.</h2></Reveal>
			<div className={styles.competitionMatrix}>
				<div className={styles.competitionHeader}>
					<div className={styles.competitionFeatureHead}>Capability</div>
					{columns.map((column) => <div className={`${styles.competitionColumnHead} ${column.label === "Compass" ? styles.competitionCompassHead : ""}`} key={column.label}><strong>{column.label}</strong><small>{column.members.join(" · ")}</small></div>)}
				</div>
				{COMPETITION_FEATURES.map((feature, index) => {
					const delay = 18 + index * 7;
					return (
						<div className={styles.competitionRow} key={feature.label} style={{ opacity: appear(frame, delay, 16), translate: `0 ${interpolate(frame, [delay, delay + 16], [14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px` }}>
							<div className={styles.competitionFeature}>
								<strong>{feature.label}</strong>
								<span>{feature.detail}</span>
							</div>
							{columns.map((column) => {
								const status = groupedStatus(feature.values, column.members);
								return <div className={`${styles.competitionCell} ${column.label === "Compass" ? styles.competitionCompassCell : ""} ${styles[`competitionCell_${status}`]}`} key={column.label}>{status === "yes" ? "✓" : status === "partial" ? "◐" : "—"}</div>;
							})}
						</div>
					);
				})}
			</div>
			<div className={styles.competitionLegend}><span><b>✓</b> native capability</span><span><b>◐</b> partial / scoped</span><span><b>—</b> not the primitive</span></div>
		</SlideShell>
	);
}

function OpportunitySlide() {
	const frame = useCurrentFrame();
	return (
		<SlideShell index={7}>
			<div className={styles.marketGrid}>
				<div>
					<Reveal delay={2}><Eyebrow>Opportunity</Eyebrow></Reveal>
					<Reveal delay={8}><h2 className={styles.headline}>Every agent with a wallet will need a guard.</h2></Reveal>
					<div className={styles.marketCards}>
						{MARKET_SEGMENTS.map((segment, index) => (
							<div className={`${styles.marketCard} ${index === 2 ? styles.marketCardFocus : ""}`} key={segment.name} style={{ opacity: appear(frame, 28 + index * 10, 16) }}>
								<span>{segment.name}</span><strong>{segment.displayValue}</strong><p>{segment.description}</p>
							</div>
						))}
					</div>
					<div className={styles.marketSource} style={{ opacity: appear(frame, 62, 16) }}>
							Sources: Virtuals Protocol dashboard · x402scan · 30-day snapshots, Aug 2026.
					</div>
				</div>
					<div className={`${styles.chartPanel} ${styles.marketEvidencePanel}`}>
						<div className={styles.chartCaption}>Observed market → reachable share</div>
						<div className={styles.marketEvidenceList}>
							{MARKET_EVIDENCE.map((item, index) => (
								<div
									className={`${styles.marketEvidenceRow} ${item.featured ? styles.marketEvidenceRowFocus : ""}`}
									key={item.label}
									style={{
										opacity: appear(frame, 24 + index * 12, 18),
										translate: `0 ${interpolate(frame, [24 + index * 12, 42 + index * 12], [10, 0], {
											extrapolateLeft: "clamp",
											extrapolateRight: "clamp",
											easing: Easing.bezier(0.16, 1, 0.3, 1),
										})}px`,
									}}
								>
									<div>
										<span>{item.label}</span>
										<p>{item.detail}</p>
										<small>{item.note}</small>
									</div>
									<strong>{item.value}</strong>
								</div>
							))}
						</div>
						<div className={styles.marketCapture} style={{ opacity: appear(frame, 64, 18) }}>
							<div className={styles.marketCaptureLabels}>
									<span>Compass share of annualized x402 proxy</span>
									<strong>3.6%</strong>
							</div>
							<div className={styles.marketCaptureTrack}>
								<div
									className={styles.marketCaptureFill}
									style={{
											width: `${interpolate(frame, [66, 94], [0, 3.6], {
											extrapolateLeft: "clamp",
											extrapolateRight: "clamp",
											easing: Easing.bezier(0.16, 1, 0.3, 1),
										})}%`,
									}}
								/>
							</div>
								<small>$300K of an implied ~$8.3M annual x402 volume proxy</small>
						</div>
					</div>
			</div>
		</SlideShell>
	);
}

function GtmSlide() {
	const frame = useCurrentFrame();
	return (
		<SlideShell index={8}>
			<Eyebrow>Go-to-market</Eyebrow>
			<h2 className={styles.headline}>GTM strategy</h2>
			<p className={styles.lead}>Developers first. Then every agent that moves money.</p>
			<div className={styles.gtmLadder}>
				{GTM_STAGES.map((stage, index) => {
					const delay = 18 + index * 12;
					return (
						<div className={`${styles.gtmStage} ${stage.current ? styles.gtmCurrent : ""}`} key={stage.index} style={{ opacity: appear(frame, delay, 18), translate: `0 ${interpolate(frame, [delay, delay + 18], [32, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px` }}>
							<div className={styles.gtmIndex}>{stage.index}</div>
							<h3>{stage.title}</h3>
							{stage.current ? <span className={styles.nowPill}>starting point</span> : null}
						</div>
					);
				})}
			</div>
		</SlideShell>
	);
}

function TractionSlide() {
	const frame = useCurrentFrame();
	return (
		<SlideShell index={9}>
			<div className={styles.tractionGrid}>
				<div>
					<Reveal delay={2}><Eyebrow tone="allow">Traction</Eyebrow></Reveal>
					<Reveal delay={8}><h2 className={styles.headline}>In close talks with the platforms already moving agent capital.</h2></Reveal>
					<Reveal delay={22}><p className={styles.lead}>A direct path for Compass to protect meaningful agent transaction volume.</p></Reveal>
					<div className={styles.backerRow} style={{ opacity: appear(frame, 55, 18) }}>
						<span>backed by</span>
						<div className={styles.backerPartner}><Img src={staticFile("pitch-assets/emprelatam-current.png")} /><strong>Emprelatam</strong></div>
						<div className={styles.backerPartner}><Img src={staticFile("pitch-assets/superteam-ar-current.svg")} /><strong>Superteam</strong></div>
						<div className={styles.backerPartner}><Img src={staticFile("pitch-assets/dev3pack-current.png")} /><strong>dev3pack</strong></div>
					</div>
				</div>
				<div className={styles.talksPanel}>
					<div className={styles.talksPanelHeader}>
						<span>Active pipeline</span>
						<strong>2 close talks</strong>
					</div>
					{TRACTION_TALKS.map((talk, index) => {
						const delay = 18 + index * 12;
						return (
							<div
								className={styles.talkCard}
								key={talk.name}
								style={{
									opacity: appear(frame, delay, 18),
									translate: `0 ${interpolate(frame, [delay, delay + 18], [24, 0], {
										extrapolateLeft: "clamp",
										extrapolateRight: "clamp",
										easing: Easing.bezier(0.16, 1, 0.3, 1),
									})}px`,
								}}
							>
								<div className={styles.talkCardTop}>
									<h3>{talk.name}</h3>
									<span>close talks</span>
								</div>
								<div className={styles.talkStats}>
									<div>
										<strong className={styles.talkMetric} style={{ color: talk.color }}>{talk.metric}</strong>
										<p>{talk.metricLabel}</p>
									</div>
									<div>
										<strong className={styles.talkMetric}>{talk.adoption}</strong>
										<p>{talk.adoptionLabel}</p>
									</div>
								</div>
								<small>{talk.metricDate}</small>
							</div>
						);
					})}
						<div className={styles.talksSource}>Virtuals scale metrics are public; Bankr aggregate is not disclosed. Conversation status is Compass pipeline.</div>
				</div>
			</div>
		</SlideShell>
	);
}

function BusinessSlide() {
	const frame = useCurrentFrame();
	return (
		<SlideShell index={10}>
			<Reveal delay={2}><Eyebrow>Business model</Eyebrow></Reveal>
			<Reveal delay={8}><h2 className={styles.headline}>Platform fee + basis points on protected volume.</h2></Reveal>
			<div className={styles.pricingGrid}>
				{PRICING_TIERS.map((tier, index) => {
					const delay = 20 + index * 12;
					return (
						<div className={`${styles.priceCard} ${tier.featured ? styles.priceFeatured : ""}`} key={tier.name} style={{ opacity: appear(frame, delay, 20), translate: `0 ${interpolate(frame, [delay, delay + 20], [28, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px` }}>
							<div className={styles.priceTop}><span>{tier.name}</span>{tier.featured ? <Sparkles size={22} /> : null}</div>
							<div className={styles.priceVolume}>{tier.volume}</div>
							<div className={styles.priceFee}>{tier.platformFee}</div>
							<div className={styles.priceBps}>+ {tier.bps} protected volume</div>
								{tier.arr ? <div className={styles.priceArr}>{tier.arr}</div> : null}
						</div>
					);
				})}
			</div>
			<Reveal delay={68} className={styles.businessFoot}>Enterprise adds liability SLA. Deterministic decisions resolve at near-zero inference cost.</Reveal>
		</SlideShell>
	);
}

function TeamSlide() {
	const frame = useCurrentFrame();
	return (
		<SlideShell index={11}>
			<Reveal delay={2}><Eyebrow>Team</Eyebrow></Reveal>
			<Reveal delay={8}><h2 className={styles.headline}>Three founders — one owner per area.</h2></Reveal>
			<div className={styles.teamGrid}>
				{TEAM_MEMBERS.map((member, index) => {
					const delay = 18 + index * 13;
					return (
						<div
							className={styles.teamCard}
							key={member.name}
							style={{
								opacity: appear(frame, delay, 22),
								translate: `0 ${interpolate(frame, [delay, delay + 22], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) + Math.sin((frame + index * 12) / 25) * 3}px`,
							}}
						>
							<div className={styles.teamTop}>
								<Img src={staticFile(member.portrait.replace(/^\//, ""))} className={styles.teamPortrait} />
								<div><h3>{member.name}</h3><div className={styles.teamRole}>{member.role}</div></div>
							</div>
							<p>{member.bio}</p>
							<div className={styles.teamLogos}>
								{member.logos.map((logo) => <Img key={logo.alt} src={staticFile(logo.src.replace(/^\//, ""))} alt={logo.alt} />)}
							</div>
						</div>
					);
				})}
			</div>
		</SlideShell>
	);
}

function AskSlide() {
	const frame = useCurrentFrame();
	const pieProgress = interpolate(frame, [24, 82], [0.001, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) });
	return (
		<SlideShell index={12}>
			<div className={styles.askGrid}>
				<div>
					<Reveal delay={2}><Eyebrow>The ask</Eyebrow></Reveal>
					<Reveal delay={8}>
						<div className={styles.raiseAmount}>
							${Math.round(interpolate(frame, [8, 42], [0, 200], {
								extrapolateLeft: "clamp",
								extrapolateRight: "clamp",
								easing: Easing.bezier(0.16, 1, 0.3, 1),
							}))}K
						</div>
					</Reveal>
					<Reveal delay={18}><div className={styles.raiseMeta}>12 months · 3 founders · LATAM</div></Reveal>
					<div className={styles.fundingTargets}>
						<div>
							<strong>≈200</strong>
							<span>agents running through Compass</span>
						</div>
						<div>
							<strong>$10K</strong>
							<span>in funds safeguarded</span>
						</div>
						<div>
							<strong>$300K</strong>
							<span>in protected transaction volume</span>
						</div>
						<div>
							<strong>1+ LOI</strong>
							<span>from an agentic commerce platform</span>
						</div>
					</div>
				</div>
				<div className={styles.askVisual} style={{ opacity: appear(frame, 16, 20) }}>
					<div className={styles.pieWrap}>
						<PieChart width={390} height={390}>
							<Pie data={USE_OF_FUNDS} dataKey="value" cx="50%" cy="50%" innerRadius={104} outerRadius={176} startAngle={90} endAngle={90 - 360 * pieProgress} stroke="transparent" isAnimationActive={false}>
								{USE_OF_FUNDS.map((item) => <Cell key={item.name} fill={item.color} />)}
							</Pie>
						</PieChart>
						<div className={styles.pieCenter}><span>Use of</span><strong>funds</strong></div>
					</div>
					<div className={styles.fundLegend}>
						{USE_OF_FUNDS.map((item, index) => (
							<div key={item.name} style={{ opacity: appear(frame, 38 + index * 6, 14) }}><i style={{ background: item.color }} /><span>{item.name}</span><strong>{item.value}%</strong></div>
						))}
					</div>
				</div>
			</div>
		</SlideShell>
	);
}

function CloseSlide() {
	const frame = useCurrentFrame();
	return (
		<SlideShell index={13}>
			<div className={styles.closeGrid}>
				<div>
					<Reveal delay={3}><Eyebrow>Close</Eyebrow></Reveal>
					<Reveal delay={10}><h2 className={styles.closeTitle}>Agents will move the money.</h2></Reveal>
					<Reveal delay={24}><h2 className={`${styles.closeTitle} ${styles.accentText}`}>Compass makes sure it only moves where you authorized.</h2></Reveal>
					<div className={styles.closeVerdicts} style={{ opacity: appear(frame, 48, 20) }}>
						<VerdictPill verdict="allow" /><VerdictPill verdict="escalate" /><VerdictPill verdict="deny" />
					</div>
					<Reveal delay={62} className={styles.contactLine}>compassguard.xyz · @compass_solana</Reveal>
				</div>
				<div className={styles.mascotStage}>
					<div className={styles.orbit} style={{ rotate: `${interpolate(frame, [0, SLIDE_FRAMES], [0, 30])}deg` }} />
					<Img src={staticFile("pitch-assets/compass-mascot.webp")} className={styles.mascot} style={{ opacity: appear(frame, 22, 26), scale: interpolate(frame, [22, 52], [0.86, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), translate: `0 ${Math.sin(frame / 14) * 8}px` }} />
				</div>
			</div>
		</SlideShell>
	);
}

const SLIDE_COMPONENTS = [
	CoverSlide,
	IncidentSlide,
	AttackSlide,
	InsightSlide,
	SolutionSlide,
	IntegrationSlide,
	LandscapeSlide,
	OpportunitySlide,
	GtmSlide,
	TractionSlide,
	BusinessSlide,
	TeamSlide,
	AskSlide,
	CloseSlide,
];

export function PitchComposition() {
	return (
		<Series>
			{PITCH_SLIDES.map((slideMeta, index) => {
				const SlideComponent = SLIDE_COMPONENTS[index];
				return (
					<Series.Sequence key={`slide-${slideMeta.id}`} durationInFrames={SLIDE_FRAMES}>
						<SlideComponent />
					</Series.Sequence>
				);
			})}
		</Series>
	);
}

export function PitchDeck() {
	const playerRef = useRef<PlayerRef>(null);
	const touchStart = useRef<number | null>(null);
	const playUntilFrame = useRef<number | null>(REVEALED_FRAME);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [showOverview, setShowOverview] = useState(false);

	const goToSlide = useCallback((nextIndex: number) => {
		const clamped = Math.min(PITCH_SLIDES.length - 1, Math.max(0, nextIndex));
		playerRef.current?.pause();
		playerRef.current?.seekTo(slideStart(clamped));
		playUntilFrame.current = Math.min(TOTAL_FRAMES - 1, slideStart(clamped) + REVEALED_FRAME);
		playerRef.current?.play();
		setCurrentSlide(clamped);
		setShowOverview(false);
	}, []);

	const togglePlayback = useCallback(() => {
		if (playerRef.current?.isPlaying()) {
			playerRef.current.pause();
		} else {
			playUntilFrame.current = null;
			playerRef.current?.play();
		}
	}, []);

	const replaySlide = useCallback(() => {
		playerRef.current?.seekTo(slideStart(currentSlide));
		playUntilFrame.current = Math.min(TOTAL_FRAMES - 1, slideStart(currentSlide) + REVEALED_FRAME);
		playerRef.current?.play();
	}, [currentSlide]);

	const requestFullscreen = useCallback(() => {
		try {
			playerRef.current?.requestFullscreen();
		} catch {
			// Fullscreen can be unavailable in embedded or mobile browser contexts.
		}
	}, []);

	useEffect(() => {
		const player = playerRef.current;
		if (!player) return;

		const onPlay: CallbackListener<"play"> = () => setIsPlaying(true);
		const onPause: CallbackListener<"pause"> = () => setIsPlaying(false);
		const onEnded: CallbackListener<"ended"> = () => setIsPlaying(false);
		const onTimeUpdate: CallbackListener<"timeupdate"> = (event) => {
			setCurrentSlide(slideAtFrame(event.detail.frame));
			const target = playUntilFrame.current;
			if (target !== null && event.detail.frame >= target) {
				playUntilFrame.current = null;
				player.pause();
				player.seekTo(target);
			}
		};

		player.addEventListener("play", onPlay);
		player.addEventListener("pause", onPause);
		player.addEventListener("ended", onEnded);
		player.addEventListener("timeupdate", onTimeUpdate);
		return () => {
			player.removeEventListener("play", onPlay);
			player.removeEventListener("pause", onPause);
			player.removeEventListener("ended", onEnded);
			player.removeEventListener("timeupdate", onTimeUpdate);
		};
	}, []);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "ArrowRight" || event.key === "PageDown") {
				event.preventDefault();
				goToSlide(currentSlide + 1);
			} else if (event.key === "ArrowLeft" || event.key === "PageUp") {
				event.preventDefault();
				goToSlide(currentSlide - 1);
			} else if (event.key === " " || event.key.toLowerCase() === "k") {
				event.preventDefault();
				togglePlayback();
			} else if (event.key.toLowerCase() === "r") {
				replaySlide();
			} else if (event.key.toLowerCase() === "o") {
				setShowOverview((value) => !value);
			} else if (event.key.toLowerCase() === "f") {
				requestFullscreen();
			} else if (event.key === "Home") {
				goToSlide(0);
			} else if (event.key === "End") {
				goToSlide(PITCH_SLIDES.length - 1);
			} else if (event.key === "Escape") {
				setShowOverview(false);
			}
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [currentSlide, goToSlide, replaySlide, requestFullscreen, togglePlayback]);

	const currentMeta = PITCH_SLIDES[currentSlide];
	const playerInputProps = useMemo(() => ({}), []);

	return (
		<main className={styles.page}>
			<div className={styles.ambient} />
			<div
				className={styles.stage}
				onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
				onTouchEnd={(event) => {
					if (touchStart.current === null) return;
					const delta = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
					if (Math.abs(delta) > 60) goToSlide(currentSlide + (delta < 0 ? 1 : -1));
					touchStart.current = null;
				}}
			>
				<div className={styles.progressTrack}><i style={{ width: `${((currentSlide + 1) / PITCH_SLIDES.length) * 100}%` }} /></div>
				<div className={styles.playerShell}>
					<Player
						ref={playerRef}
						component={PitchComposition}
						inputProps={playerInputProps}
						durationInFrames={TOTAL_FRAMES}
						compositionWidth={COMPOSITION_WIDTH}
						compositionHeight={COMPOSITION_HEIGHT}
						fps={FPS}
						initialFrame={0}
						autoPlay
						controls={false}
						clickToPlay={false}
						spaceKeyToPlayOrPause={false}
						allowFullscreen
						style={{ width: "100%", height: "100%" }}
					/>
					<button className={`${styles.clickZone} ${styles.clickZoneLeft}`} onClick={() => goToSlide(currentSlide - 1)} aria-label="Previous slide" disabled={currentSlide === 0} />
					<button className={`${styles.clickZone} ${styles.clickZoneRight}`} onClick={() => goToSlide(currentSlide + 1)} aria-label="Next slide" disabled={currentSlide === PITCH_SLIDES.length - 1} />
				</div>

				<div className={styles.deckChrome}>
					<div className={styles.chromeMeta}>
						<span>{currentMeta.section}</span>
						<strong>{currentMeta.label}</strong>
					</div>
					<div className={styles.chromeControls}>
						<button onClick={() => goToSlide(currentSlide - 1)} disabled={currentSlide === 0} aria-label="Previous slide"><ArrowLeft size={18} /></button>
						<button onClick={togglePlayback} aria-label={isPlaying ? "Pause deck" : "Play deck"}>{isPlaying ? <Pause size={18} /> : <Play size={18} />}</button>
						<button onClick={replaySlide} aria-label="Replay slide animation"><RotateCcw size={18} /></button>
						<button onClick={() => setShowOverview(true)} aria-label="Open slide overview"><Grid2X2 size={18} /></button>
						<button onClick={requestFullscreen} aria-label="Enter fullscreen"><Expand size={18} /></button>
						<button onClick={() => goToSlide(currentSlide + 1)} disabled={currentSlide === PITCH_SLIDES.length - 1} aria-label="Next slide"><ArrowRight size={18} /></button>
					</div>
					<div className={styles.chromeCount}><strong>{String(currentSlide + 1).padStart(2, "0")}</strong><span>/ {String(PITCH_SLIDES.length).padStart(2, "0")}</span></div>
				</div>
			</div>

			{showOverview ? (
				<div className={styles.overview} role="dialog" aria-modal="true" aria-label="Slide overview">
					<div className={styles.overviewPanel}>
						<div className={styles.overviewHead}><div><span>Compass pitch deck</span><h2>Slide overview</h2></div><button onClick={() => setShowOverview(false)} aria-label="Close overview"><X size={22} /></button></div>
						<div className={styles.overviewGrid}>
							{PITCH_SLIDES.map((slideMeta, index) => (
								<button key={slideMeta.id} className={index === currentSlide ? styles.overviewActive : ""} onClick={() => goToSlide(index)}>
									<span>{String(index + 1).padStart(2, "0")}</span><small>{slideMeta.section}</small><strong>{slideMeta.label}</strong>
								</button>
							))}
						</div>
						<div className={styles.shortcutHint}>← / → navigate · space play · R replay · F fullscreen · O overview</div>
					</div>
				</div>
			) : null}
		</main>
	);
}
