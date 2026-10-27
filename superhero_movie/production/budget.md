# Tool Budget: The ~3-Minute Fight Short

> **Owner:** `film-production-manager` · **Task:** T-090 · **Status:** draft for review
> **Every price here is an estimate from October 2026 research. Confirm it on the tool's official pricing page before you pay.** Many figures came from third-party trackers ([ai-tool-stack.md §5](../research/ai-tool-stack.md#5-three-budget-stacks)).
> AGENTS.md points here for **spending caps**: see [Spending caps](#spending-caps-you-fill-this-in).

**Bottom line:** **$0 while planning. Plan ~$175** (2 paid Stack B months plus 1 pickup month), **hard ceiling $350.** At ~190 s finished and ~12:1, generation comes to ≈2,300 s, so the pickup month is the **expected** case, not a contingency. Nothing is spent before week 9.

## Three stacks

| | **A: $0/month** | **B: ~$58/month (recommended)** | **C: ~$150–190/month** |
|---|---|---|---|
| **Video** | Flow daily credits (Omni Flash 720p), Dreamina/Seedance daily credits, Kling free, Comfy Cloud 400 credits, local Wan 2.2 (licence: confirm commercial use) | Google AI Pro ~$19.99 (≈660 s Omni Flash 720p)\* + Kling Pro ~$32.56 (≈375 s at 1080p; ~$25.99 first month; first-month price: sources conflict, confirm) | Kling Premier ~$81 (≈1,000 s) + Google AI Pro ~$19.99\* + Runway Standard ~$15 (Aleph fixes, Act-Two) |
| **Images** | Gemini app, Muse Image (Meta AI app), Ideogram free | Nano Banana Pro (in AI Pro); Muse Image API ~$0.01/image | Same as B |
| **Voice / SFX / music** | ElevenLabs free, MMAudio (licence: confirm commercial use), Suno free | ElevenLabs Starter ~$6. Music: royalty-free library or human composer first; Suno Pro ~$10 as a fallback, **music month only** | ElevenLabs Creator ~$22; music as in B |
| **Finish** | Resolve free, Whisper (commercial use allowed) | Same | + Topaz Astra ~$19–39 (4K upscale) |
| **Generated s / month** | ~1,000 (if the reported Flow allowance applies) | **~1,035** | **~1,700** |
| **Finished s / month** | ~50–120, watermarked, 720p | **~50–130 (central ~85)** | ~85–215 (central ~140) |
| **Watermark** | Visible watermarks on free tiers; SynthID on all Google output | Kling paid: no watermark (confirm). Flow below the top tier: **may carry a visible watermark**\*; SynthID always | Same as B for Google; Kling and Runway paid output clean (confirm) |
| **Commercial use** | **Mostly NO.** Kling, ElevenLabs (credit required in the title), Suno and Midjourney free tiers are non-commercial. **Tests only** | Kling Pro, ElevenLabs Starter: yes (confirm terms). Suno Pro: licensed, but under litigation. Google Flow: **unconfirmed**\* | Yes on paid plans (confirm each) |
| **Use it for** | Learning, the bake-off, previs tests | **Making the short** | Only if Stack B can't keep up, or for a series later |

\* **Flow caveat:** Flow/Veo output below the top tier may carry a visible watermark, and its commercial terms are unconfirmed. Flow may be limited to tests and keyframes. If the bake-off (T-012) confirms either problem, finals move to Seedance (~+$40/month).

**Rights:** finals, **and every start frame or reference image that feeds a final**, must come from a tool whose terms allow commercial use. Muse Image and Gemini image terms are still to be confirmed (T-015).

## Month-by-month spend plan

| Month | Weeks | Work ([ai-pipeline.md](ai-pipeline.md)) | Subscriptions | Est. cost |
|---|---|---|---|---|
| 1 | 1–4 | Phases 0–2: idea, script, design bible | Free tiers only | **$0** |
| 2 | 5–8 | Phases 2–3: bake-off, shot list, previs, keyframes | Free tiers only (optional Muse Image API, ≤ $2, needs a task row) | **$0** |
| 3 | 9–12 | **Paid generation 1: fight shots first** | Google AI Pro $19.99 + Kling Pro $25.99 (first-month price: sources conflict, confirm) + ElevenLabs Starter $6 | **~$52** |
| 4 | 13–16 | **Paid generation 2: rest of the short**, voice, music | Google AI Pro $19.99 + Kling Pro $32.56 + ElevenLabs $6 + music ~$10 (library first, Suno Pro as a fallback) | **~$69** |
| 5 | 17–20 | **Pickup month (expected):** remaining and regenerated shots | Kling Pro $32.56 + Google AI Pro $19.99 | **~$53** |
| | | | **Plan total** | **~$175** |
| — | — | *Flow ruled out for finals → Seedance instead of Google* | *~+$40/month × 3* | *→ ~$295* |

- Cancel auto-renew the day you subscribe.
- Confirm that ElevenLabs and music commercial rights continue after you cancel.
- A human composer's fee is [TBD]. Set it as its own cap.
- If the pickup month runs, the schedule stretches from 18 weeks to ~22.

## Credit-burn calculator

```
generated seconds = shots × seconds per clip × attempts per kept shot
cost              = generated seconds × cost per generated second
finished seconds  = shots × seconds kept per shot (usually 2–4 s of a 5 s clip)
```

**Cost per generated second (estimates):** Omni Flash in Flow ≈ $0.03\* · Seedance 2.0 ≈ $0.05 · Kling Pro ≈ $0.087 (≈$32.56 ÷ 375 s) · Gemini Omni API ≈ $0.10.
**Attempts per kept shot:** fights 10 (range 5–20); other shots 6 (range 3–8).

### Worked example: ~190 s (shot counts are placeholders until the script exists)

| Block | Generated shots | s/clip | Attempts | Generated s | Tool | Cost value |
|---|---|---|---|---|---|---|
| Fight: hero beats, powers | 12 | 5 | 10 | 600 | Kling Pro | ~$52 |
| Fight: reactions, wides, debris | 10 | 5 | 10 | 500 | Flow\* (may be tests only) | ~$15 |
| Fight: impact frames (3) | 0 | — | — | 0 | Made in the edit | $0 |
| Rest: key character and power shots | 13 | 5 | 6 | 390 | Kling Pro | ~$34 |
| Rest: setup, wides, aftermath (+5 titles/cards made in the edit) | 27 | 5 | 6 | 810 | Flow\* (may be tests only) | ~$24 |
| **Total** | **62 of ~70** | | | **~2,300** | | **~$125** |

- **Finished:** 25 fight shots × ~2.6 s ≈ 65 s, plus 45 other shots × ~2.8 s ≈ 125 s, for **~190 s**. The ratio is ~12:1.
- **Why the pickup month is expected:** two Stack B months buy ~750 s of Kling, but the example needs ~990 s. Three months buy ~1,125 s of Kling and ~1,980 s of Flow, which covers the 1,310 s planned for Flow.
- **\*If Flow is tests and keyframes only:** move its 1,310 s to Seedance (≈$0.05/s ≈ $66 of credit value, on a plan sized for ~450 s/month). That puts the plan at ~$295.

| Sensitivity | Fight attempts | Total generated s | What it means |
|---|---|---|---|
| Good | 7 | ~1,970 | 2–3 paid months |
| Expected | 10 | ~2,300 | 3 paid months (~$175) |
| Beginner-hard | 15 | ~2,850 | Swap the pickup month for one Stack C month (~$300) |
| Worst | 20 | ~3,400 | Over the ceiling: redesign or cut shots before spending more |

## Spending caps (you fill this in)

AGENTS.md: *no tool starts paid generation or API calls without a task row, and never above these caps.*

| Tool | Plan | Monthly cap ($) | Months allowed | Hard stop (credits left) | Commercial use OK? | Approved by / date |
|---|---|---|---|---|---|---|
| Google AI Pro (Flow, Gemini) | Pro | [you set] | [e.g. M3–M5] | [e.g. 0, no top-ups] | [confirm; see Flow caveat] | |
| Kling | Pro | [you set] | | | | |
| Seedance / Dreamina (alternative) | [TBD after bake-off] | [you set] | | | | |
| ElevenLabs | Starter | [you set] | | | | |
| Music (library / composer / Suno Pro fallback) | [TBD] | [you set] | [music month only] | | | |
| Muse Image API | Pay per image | [e.g. $2] | | | [confirm, T-015] | |
| Gemini / Veo API (via Antigravity) | Pay per second | [e.g. $0 unless a task row says so] | | | | |
| Runway / Topaz (Stack C only) | — | [$0 by default] | | | | |
| **Total** | | **[you set, e.g. $70/month]** | | | | |

Top-up credit packs count against the cap. If a tool asks you to buy more, stop and re-plan instead.

## Burn tracker (template)

Add one row per generation session. Monthly totals go in the summary.

| Date | Tool | Shot IDs | Attempts | Generated s | Credits used | Credits left | $ equiv. | Selects | Note |
|---|---|---|---|---|---|---|---|---|---|
| YYYY-MM-DD | Kling Pro | F01-010 – F01-040 | 31 | 155 | 1,240 | 1,760 | ~$13.50 | 3 | F01-030 rewritten after 4 fails |

| Month | Spent ($) | Generated s | Kept s | Ratio (gen:kept) | vs. plan |
|---|---|---|---|---|---|
| M3 | | | | | |
| M4 | | | | | |
| M5 | | | | | |

**Watch:** if the ratio goes above 20:1 in week 10, stop rerolling. Rewrite the prompt, simplify the action, or mark the shot `redesign` or `cut`.

---

**Handoff:** budget updated for ~190 s, with the pickup month as the expected case. Open: you set the caps; the bake-off (T-012) and T-015 confirm the Flow, Muse and Gemini terms. Next: `film-producer` (Claude Code) to review the totals; `film-pipeline-td` (Antigravity) to wire up the burn tracker.
