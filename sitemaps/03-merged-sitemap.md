# Merged sitemap — "MAIA Cowork" (internal MAIA) + External MAIA
Based on the 20 Oct 2026 Dean / Bhavya session: Cowork becomes the internal front door and replaces MAIA General Chat + Agent Library;
External MAIA (client spaces) stays on its own domain and is reached by a link in the bottom-left; Studio and Architect stay links;
Accelerator Network / partnership content folds into a Help & Info section.

## Internal: MAIA Cowork (white-labeled OpenCowork, Prophet AWS)
```
maia.prophet.com (intranet link lands here)
├─ Shell
│  ├─ Top-left: Prophet mark + MAIA wordmark (replaces Lyzr mark + "OpenCowork · Beta")
│  ├─ Search (⌘K) · Toggle sidebar
│  ├─ Sidebar nav: New chat · Skills · Projects · Artifacts · Design · Agents Hub · Connectors
│  ├─ Sidebar sections: Projects · Chats
│  └─ Bottom-left (NEW link block, above user):
│     ├─ External MAIA → client spaces (separate domain, re-auth)        [from MAIA: Org switcher / client sub-orgs]
│     ├─ Agent Studio → studio.maia.prophet.com                          [from MAIA left rail]
│     ├─ Architect → deployment pipeline                                 [from MAIA: Architect Apps]
│     ├─ Help & Info → Help/Support, Accelerator Network, Ask MAIA, feedback  [from MAIA: Help, Accelerator carousel, support bubble]
│     └─ User menu: Settings · Theme · Log out                           [Cowork] + Org: Prophet's Org [MAIA]
├─ /                 Home / New chat                                     [Cowork home; replaces MAIA General Chat]
│                    composer keeps + menu, approval mode, design system, model picker
│                    MAIA carry-overs: Specialists & Skills modes surface as Skills / Agents; Sandbox = approval mode
├─ /chats            All chats                                           [Cowork]
├─ /projects         Projects                                            [Cowork]
├─ /skills           Skills — add "Prophet endorsed" tab                 [Cowork + MAIA endorsed/restricted/private model]
├─ /agents           Agents Hub — replaces MAIA Agent Library            [Cowork; MAIA filters: Endorsed · Created by me · Shared · Favorites · Architect Apps]
│                    └─ Architect apps listed here with "Open app" (same pipeline, no separate domain)
├─ /artifacts        Artifacts                                           [Cowork]
├─ /design-systems   Design — ships with "Prophet" design system (design system MCP)  [Cowork]
├─ /connectors       Connectors — knowledge graph MCP (reads Snowflake), skills repo, design system MCP  [Cowork]
└─ Settings dialog   Account · Appearance · Connections · Memory · Workspace · (NEW) Usage & analytics  [Cowork + MAIA Dashboard]
```

## External: Client MAIA (paid client product on the existing MAIA platform, own domain; multi-tenant architecture from Cowork)
Clients buy seats in their own org to use custom MAIA agents and web apps; Prophet controls what lands there via the Architect deployment pipeline.
```
clients.maia.prophet.com (example)
├─ Login (Keycloak; Prophet Employee SSO via Azure + client credentials) [MAIA]
├─ /spaces           Client spaces landing (Prophet users arriving from Cowork): cards for every org you're in
│                    (role Admin/Member, agents·apps·users, last opened, Open space) + "Create client space" (Prophet admins)
├─ /spaces/new       Create client space — one step that replaces UI Configuration: name, URL, logo, screens on/off,
│                    Prophet admins, client seats; agents/apps deployed afterwards via Architect
├─ Home — client-branded carousel, favorites, popular                      [MAIA Home + UI Configuration branding]
├─ Agent Library — scoped to the client sub-org; Architect apps + agents   [MAIA Agent Library]
├─ Chat with agent                                                         [MAIA]
├─ Help                                                                    [MAIA]
├─ Org switcher — Prophet strategists + client users per sub-org          [MAIA]
└─ Admin (Prophet only): UI Configuration · Dashboard (support / feedback / review requests) · Eval Console   [MAIA]
```

## Supporting systems (v4 diagram, 21 Oct, after infra meeting)
- Prophet knowledge base (Foundry) — AWS Neptune entity graph + S3 document store + passage index; unstructured Prophet knowledge (SharePoint, decks), graph RAG; serves Prophet knowledge to MAIA Cowork and, when we want it, Claude; fed structured data by Snowflake
- Knowledge base MCP (Foundry, AWS) — dedicated server on the Prophet knowledge base: kg.search (passage index), kg.related (Neptune), kg.get_document (S3); called by Cowork and, when we want it, Claude
- Data MCP servers (Foundry, AWS) — Snowflake MCP (Prophet warehouse, role-mapped), Client warehouse MCP (per-client databases, membership-gated), Design system MCP; same gateway/logging/guardrail skeleton as the KB MCP; called by Cowork, Claude and Architect apps
- Snowflake (IT) — Prophet's data: ClickHouse usage data first, then finance, CRM, marketing, pipeline over ~18 months; Foundry is a customer; receives usage events from Cowork and Client MAIA
- Client data (client) — stays in client systems outside Prophet AWS; reached through the Data MCP servers' Client warehouse MCP (per-client Snowflake database, membership-gated, or run-time query); never enters the Prophet warehouse or the knowledge graph
- GitHub — app code, agents, skills, MCP servers; skills and MCP flow to MAIA Cowork and Claude; deploys through Architect
- Claude / Claude Code — AI power users only (not everyone); Cowork is the daily driver for all; power users get skills, MCP and knowledge; push code and agents to GitHub
- Architect — deployment pipeline; targets Internal (Agents Hub) and Client (External MAIA)
- Lyzr API — backend for each web app, behind Architect
- Layers: User (internal users, clients) · Application (Claude, MAIA Cowork, Client MAIA) · Server apps, APIs and MCPs (Knowledge base MCP, Data MCP servers, Architect, Studio, Lyzr API) · Data (Prophet knowledge base, Snowflake, GitHub, Client data); grey region = Prophet AWS only (Cowork, Client MAIA, both MCPs, Architect, Studio, knowledge base)
- Studio — retired from the core MAIA experience; kept as the authoring backend for Lyzr API agents and as a UI for power users on request; surfacing it inside MAIA Cowork stays an open question

## Dropped / parked
- MAIA General Chat (replaced by Cowork chat)
- MAIA internal Agent Library (replaced by Agents Hub)
- Cowork "Tweaks" slide editor (not needed), Lyzr branding, "Beta" badge
- Studio as a user-facing surface (decommissioned; Architect apps + skills instead)
