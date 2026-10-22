# Backwards compatibility plan — MAIA → MAIA Cowork
Proposal, 21 Oct 2026. How existing Studio agents, Architect apps and chat sessions carry over, without knowing Cowork's schema or all of MAIA's implementation yet.

## 1. What we know and what we don't

Known
- MAIA agents are Lyzr Studio agents: each has a stable Lyzr agent ID and runs on Lyzr API. MAIA's Agent Library is a catalogue over those IDs with Prophet metadata (endorsed / restricted / private, author, favourites, ratings, query counts, conversation starters).
- Architect apps are Next.js web apps on their own URLs, gated by Keycloak SSO (SSOGuard), calling Lyzr API agents through the app's own /api/agent proxy. The library only stores a card and an "Open app" link.
- Cowork's Agents Hub says it holds "agents you build, agents shared with you, and agents your company runs here or imports from elsewhere". "Imports from elsewhere" is the hook to test first.
- Both sides authenticate through Azure, so a user's identity (email) is the same object in MAIA and Cowork. Ownership can map by email.
- Cowork keeps chats, projects, artifacts and skills in its own store; its UI shows chats grouped by day with ids and timestamps, and projects with shared instructions and files.

Unknown (and who answers it)
- Cowork's data model for agents, chats, projects, artifacts: fields, ids, whether there is an import API. (Lyzr)
- Whether Agents Hub can reference an external Lyzr agent by ID without copying it. (Lyzr)
- MAIA's chat storage: where General Chat conversations live, export format, attachment storage (S3 bucket seen: prophet-maia-chat-attachments). (Lyzr, with Foundry confirming)
- Exact list of production agents, apps and owners after removing UAT test agents. (Foundry)

## 2. Principles
- Reference, don't copy. Wherever Cowork can point at an existing Lyzr agent ID or app URL, do that. No rebuilds in phase 1.
- Nothing is deleted on cutover. Internal MAIA stays up read-only for a defined window.
- Identity maps by email. No manual re-assignment of ownership.
- Each track has a cheapest option that works with zero Lyzr changes, and a better option that needs one.

## 3. Track A — Studio agents → Agents Hub

| Option | What it is | Needs from Lyzr | Verdict |
|---|---|---|---|
| A1 Native reference | Register each Lyzr agent ID as a Company agent in Agents Hub. Runs on Lyzr API as today. Metadata (name, description, starters, tier) mapped across. | Confirm "imports from elsewhere" supports Lyzr agents by ID; a bulk import or API. | Preferred. Zero rebuild, one source of truth. |
| A2 MCP / skill wrapper | Expose each agent as a tool on Prophet's MCP server (call Lyzr API agent X). Cowork reaches it through MCP. | None. | Fallback if A1 is not possible. Works, but agents appear as tools, not cards. |
| A3 Rebuild | Re-author in Cowork's agent builder. | None. | Only for agents being rewritten anyway (Ask MAIA). |

Tier mapping: endorsed → Company; restricted → Company + request-access (needs the enhancement) or Shared-with-me lists maintained by the approver until then; private → Mine, owner by email.
Not migrated: UAT and test agents (anything named UAT-*, test, retest, nil*, Copy). Favourites, ratings and query counts: keep in Snowflake as history; do not try to recreate in Cowork.
Ask MAIA: rewrite for Cowork (its knowledge is the old UI). Likely becomes a skill plus the Help & Info drawer rather than a chat agent.

## 4. Track B — Architect apps → Agents Hub "Open app"

| Option | What it is | Needs | Verdict |
|---|---|---|---|
| B1 Link cards | Agents Hub card with app URL, owner, tier, "Open app" in a new tab. Architect gains a "publish to Agents Hub" target that writes the card. | Cowork: a card type that is just a link (or an agent with a launch URL). Architect: one more deploy target. | Phase 1. Apps unchanged. |
| B2 SSO pass-through | Make sure Keycloak and Azure sessions are shared so "Open app" never prompts. | Keycloak client config; no app changes. | Do with B1. |
| B3 Embedded | App opens inside Cowork (iframe or panel) with identity passed in. | Lyzr: embed support. Apps: accept Cowork session, frame-ancestors. | Later; see enhancements. |

Client-space apps: unchanged. Architect keeps deploying to client sub-orgs; those cards never appear in the internal hub.

## 5. Track C — Existing chat sessions

| Option | What it is | Needs | Verdict |
|---|---|---|---|
| C1 Read-only archive | Keep internal MAIA General Chat readable (no new chats) for 90 days. Cowork Help & Info gets a "Previous MAIA chats" link. | Nothing new. Intranet link flips to Cowork; old URL stays. | Do this regardless. |
| C2 Import | Export MAIA conversations (messages, timestamps, attachments) and import into Cowork as chats, owned by email, in a "Imported from MAIA" project. | Lyzr: export from MAIA + import API or schema for Cowork chats. Attachment re-upload from S3. | Only if Lyzr exposes both ends. Pilot with one user first. |
| C3 Summaries only | Per user, generate a short "what you were working on" document into a Cowork project. | Nothing from Lyzr; a script over the export. | Cheap middle ground if C2 is heavy. |

Favourites → optional: pre-pin the user's favourite agents in Agents Hub if the import API supports it. Otherwise skip.

## 6. Sequence and gates
1. Discovery (1–2 weeks): Lyzr answers the schema questions below; Foundry produces the inventory (agents, apps, owners, tiers, usage from Eval/Dashboard, chat volume).
2. Pilot (2 weeks): A1 or A2 with 5 agents, B1+B2 with 2 apps, C1 on, for a 10-person group. Gate: every pilot user can reach their agents and apps from Cowork without a login prompt.
3. Cutover: intranet link → Cowork; internal MAIA read-only; Ask MAIA rewritten; usage events flowing to Snowflake.
4. Close-out (90 days later): decide on C2/C3 from what pilot users actually missed; retire internal MAIA.
Rollback at any gate: flip the intranet link back; nothing has been deleted.

## 7. Questions for Lyzr that unblock this
1. Agents Hub: can a Company agent reference an existing Lyzr Studio agent by ID, and is there a bulk import? What fields does an agent object have (name, description, starters, tags, visibility, owner)?
2. Can an Agents Hub card be a launch link to an external app (Architect app) with an "Open app" action? Can Architect write that card as a deploy target?
3. Chat schema: what does a Cowork chat/message/attachment look like, is there an import API, and are chat ids stable across upgrades?
4. MAIA export: can MAIA conversations and attachments be exported per user, in what format?
5. Identity: is the user's email the stable key on both sides, so ownership maps without manual work?
6. What survives a Cowork upgrade: imported agents, cards, chats, config? (ties to the delivery model item)
