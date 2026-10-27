# Tool Budget: The 2–3 Minute Fight Short

> **Owner:** `film-production-manager` · **Task:** T-090 · **Status:** draft for review
> **Every price here is an estimate from October 2026 research and must be confirmed on the tool's official pricing page before you pay.** Many figures came from third-party trackers ([ai-tool-stack.md §5](../research/ai-tool-stack.md#5-three-budget-stacks)).
> AGENTS.md points here for **spending caps**: see [Spending caps](#spending-caps-you-fill-this-in).

**Bottom line:** **~$121** for the short (2 paid months of Stack B), **~$175** with one pickup month. Hard ceiling: **$350**. Nothing is spent before week 9.

## Three stacks

| | **A: $0/month** | **B: ~$58/month (recommended)** | **C: ~$150–190/month** |
|---|---|---|---|
| **Video** | Flow daily credits (Omni Flash 720p), Dreamina/Seedance daily credits, Kling free, Comfy Cloud 400 credits, local Wan 2.2 | Google AI Pro ~$19.99 (≈660 s Omni Flash 720p) + Kling Pro ~$32.56 (≈375 s at 1080p; ~$25.99 first month) | Kling Premier ~$81 (≈1,000 s) + Google AI Pro ~$19.99 + Runway Standard ~$15 (Aleph fixes, Act-Two) |
| **Images** | Gemini app, Muse Image (Meta AI app), Ideogram free | Nano Banana Pro (in AI Pro); Muse Image API ~$0.01/image | Same as B |
| **Voice / SFX / music** | ElevenLabs free, MMAudio, Suno free | ElevenLabs Starter ~$6; Suno Pro ~$10 **in the music month only** | ElevenLabs Creator ~$22, Suno Pro ~$10 |
| **Finish** | Resolve free, Whisper | Same | + Topaz Astra ~$19–39 (4K upscale) |
| **Generated s / month** | ~1,000 (if the reported Flow allowance applies) | **~1,035** | **~1,700** |
| **Finished s / month** | ~50–120, watermarked, 720p | **~50–130 (central ~85)** | ~85–215 (central ~140) |
| **Watermark** | Visible watermarks on free tiers; SynthID on all Google output | Kling paid: no watermark (confirm). **Flow FAQ: visible watermark on non-Ultra Veo output**; SynthID always | Same as B for Google; Kling and Runway paid output clean (confirm) |
| **Commercial use** | **Mostly NO.** Kling, ElevenLabs (credit required in title), Suno and Midjourney free tiers are non-commercial. **Tests only** | Kling Pro, ElevenLabs Starter, Suno Pro: yes (confirm terms). Google Flow commercial terms **unconfirmed** | Yes on paid plans (confirm each) |
| **Use it for** | Learning, the bake-off, previs tests | **Making the short** | Only if Stack B can't keep up, or for a series later |

## Month-by-month spend plan

| Month | Weeks | Work ([ai-pipeline.md](ai-pipeline.md)) | Subscriptions | Est. cost |
|---|---|---|---|---|
| 1 | 1–4 | Idea, story, design bible | Free tiers only | **$0** |
| 2 | 5–8 | Bake-off, shot list, previs, keyframes | Free tiers only (optional Muse Image API, ≤ $2, needs a task row) | **$0** |
| 3 | 9–12 | **Paid generation 1: all fight shots first** | Google AI Pro $19.99 + Kling Pro $25.99 (first month) + ElevenLabs Starter $6 | **~$52** |
| 4 | 13–16 | **Paid generation 2: rest of the short + pickups**, voice, music | Google AI Pro $19.99 + Kling Pro $32.56 + ElevenLabs $6 + Suno Pro $10 | **~$69** |
| 5 | 17–18 | Finishing, release | Cancel everything (confirm that Suno and ElevenLabs commercial rights continue after you cancel) | **$0** |
| | | | **Core total** | **~$121** |
| *+1* | *contingency* | *Pickup month, only if Gate 3 fails* | *Kling Pro + Google AI Pro* | *+~$53 → ~$175* |

Cancel auto-renew the day you subscribe. Swap the tools if the bake-off picks Seedance over Kling or Flow.

## Credit-burn calculator

```
generated seconds = shots × seconds per clip × attempts per kept shot
cost              = generated seconds × cost per generated second
finished seconds  = shots × seconds kept per shot (usually 2–4 s of a 5 s clip)
```

**Cost per generated second (estimates):** Omni Flash in Flow ≈ $0.03 · Seedance 2.0 ≈ $0.05 · Kling Pro ≈ $0.087 (≈$32.56 ÷ 375 s) · Gemini Omni API ≈ $0.10.
**Attempts per kept shot:** fights 10 (range 5–20), dialogue and establishing shots 5 (range 3–8).

### Worked example (shot counts are placeholders until the script exists)

| Block | Generated shots | s/clip | Attempts | Generated s | Tool | Cost value |
|---|---|---|---|---|---|---|
| Fight: hero beats, powers | 12 | 5 | 10 | 600 | Kling Pro | ~$52 |
| Fight: reactions, wides, debris | 10 | 5 | 10 | 500 | Omni Flash | ~$15 |
| Fight: impact frames (3) | 0 | — | — | 0 | Made in the edit | $0 |
| Rest of short (35 shots: setup, aftermath, titles; ~30 generated) | 30 | 5 | 5 | 750 | Omni Flash | ~$23 |
| **Total** | **52** | | | **1,850** | | **~$90** |

- **Finished:** ~25 fight shots × ~2.5 s ≈ 60 s, plus ~35 other shots × ~2.6 s ≈ 90 s, for **~150 s**. The ratio is ~12:1, matching the research.
- **Fits Stack B:** two months buy ~750 s of Kling (600 used) and ~1,320 s of Flow (1,250 used). The subscription total (~$121) is higher than the ~$90 of credit value because credits come in fixed blocks and audio is included.
- **If the Flow watermark rules Google out for final shots:** move its 1,250 s to Seedance (~$0.05/s ≈ $63, on a plan sized for ~650 s/month) and keep Google for tests and keyframes.

| Sensitivity | Fight attempts | Total generated s | What it means |
|---|---|---|---|
| Good | 7 | ~1,520 | 2 paid months with room to spare |
| Expected | 10 | ~1,850 | 2 paid months, tight |
| Beginner-hard | 15 | ~2,400 | +1 pickup month (~$175 total) |
| Worst | 20 | ~2,950 | +2 months, or one Stack C month (~$300) |

## Spending caps (you fill this in)

AGENTS.md: *no tool starts paid generation or API calls without a task row, and never above these caps.*

| Tool | Plan | Monthly cap ($) | Months allowed | Hard stop (credits left) | Commercial use OK? | Approved by / date |
|---|---|---|---|---|---|---|
| Google AI Pro (Flow, Gemini) | Pro | [you set] | [e.g. M3–M4] | [e.g. 0, no top-ups] | [confirm] | |
| Kling | Pro | [you set] | | | | |
| Seedance / Dreamina (alternative) | [TBD after bake-off] | [you set] | | | | |
| ElevenLabs | Starter | [you set] | | | | |
| Suno | Pro | [you set] | [music month only] | | | |
| Muse Image API | Pay per image | [e.g. $2] | | | | |
| Gemini / Veo API (via Antigravity) | Pay per second | [e.g. $0 unless a task row says so] | | | | |
| Runway / Topaz (Stack C only) | — | [$0 by default] | | | | |
| **Total** | | **[you set, e.g. $70/month]** | | | | |

Top-up credit packs count against the cap. If a tool asks you to buy more, stop and re-plan instead.

## Burn tracker (template)

Copy one row per generation session. Monthly totals go in the summary.

| Date | Tool | Shot IDs | Attempts | Generated s | Credits used | Credits left | $ equiv. | Selects | Note |
|---|---|---|---|---|---|---|---|---|---|
| YYYY-MM-DD | Kling Pro | F-001–F-004 | 31 | 155 | 1,240 | 1,760 | ~$13.50 | 3 | F-003 rewritten after 4 fails |

| Month | Spent ($) | Generated s | Kept s | Ratio (gen:kept) | vs. plan |
|---|---|---|---|---|---|
| M3 | | | | | |
| M4 | | | | | |

**Watch:** if the ratio goes above 20:1 in week 10, stop rerolling. Rewrite the prompts, simplify the action, or cut the shot.

---

**Handoff:** budget drafted. Open: you set the caps, and the bake-off (T-012) confirms the tools and watermark terms. Next: `film-producer` (Claude Code) to review the totals; `film-pipeline-td` (Antigravity) to wire the burn tracker into the contact-sheet tooling.
