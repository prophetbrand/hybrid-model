# MAIA (dev) sitemap
Source: https://dev.maia.prophet.com — crawled 2026-10-20, signed in as bpatel@prophet.com (Prophet's Org).
Routing note: deep links reload to Home; every page is reached through the header nav or the left rail.

## Shell (on every page)
- Header: Prophet logo | MAIA wordmark | version tag (V1.2)
- Header nav pills: Home · General Chat · Agent Library · Dashboard
- Header right: Notifications (bell) · Search conversations
- Left rail (collapsible): Help / Support · UI Configuration · Eval Console · Agent Studio (external link) · Org switcher (Prophet's Org) · User (name + email)
- Floating bottom-right: "Open chat" support bubble + info icon

## Pages
```
/login                        Welcome to MAIA → Login → Keycloak (keycloak.dev.maia.prophet.com, realm lyzr-dev)
                              ├─ Username / password
                              └─ Prophet Employee SSO
/                             Home
                              ├─ Welcome carousel (3 slides: Welcome to V1.2 UAT · Browse the Agent Library · Accelerator Network)
                              ├─ My favorite agents (cards: Request Access / Open app / Start chat, ratings, favorite, promote)
                              ├─ Most popular agents this week
                              └─ First-run onboarding tour (11 steps)
/general-chat                 General Chat
                              ├─ Chat history sidebar (New Chat, dated conversation list)
                              ├─ Composer: message box · Attach file · Send
                              ├─ Chat mode menu: Standard · Specialists (Writing / Research / Data) · Skills (Editing & Reviewing, Slides & Executive Summaries, Document Review, Research & Comparisons, Data & Numerical Analysis)
                              ├─ Sandbox toggle
                              ├─ Model picker (default Gemini 3.7 Flash) + model info card
                              └─ Thinking level (Low …)
/agent-library                Agent Library
                              ├─ Filter rail: Access (View all, Created by me, Endorsed, My favorites, Recents, Shared with me) · Type (Agents, Workflows, Architect Apps) · Agent Type (Chat Agent, Guided Agent) · Persona
                              ├─ Search agents and workflows
                              ├─ Agent cards (endorsed / restricted / private badge, queries, rating, author, Start chat | Open app | Request Access, Learn more)
                              └─ Agent detail modal (description, conversation starters, capabilities, Start Chat)
/dashboard                    Dashboard (tabs)
                              ├─ /dashboard/support      Support dashboard: feedback submissions table
                              ├─ /dashboard/feedback     Feedback
                              └─ /dashboard/review-requests  Review requests
/help                         Help / Support (currently hidden by UI config → redirects Home)
/ui-config                    UI Configuration (admin)
                              ├─ Session picker, Save / Preview / Publish
                              ├─ Screen visibility toggles: Home, General Chat, Agent Library, Accelerator Network, Help, Dashboard
                              ├─ Branding: client name, logo image
                              └─ Per-screen editors (Home carousel, favorites empty state, popular agents; Agent Library)
/eval                         Eval Console (admin)
                              └─ Tabs: Dashboard · New eval · Runs · Compare · Jobs · Test sets · Labels · Settings · Advanced
studio.dev.maia.prophet.com   Agent Studio (external, Lyzr Studio)
Org switcher                  Prophet's Org → client sub-orgs (client spaces; agent library scoped per org)
```
