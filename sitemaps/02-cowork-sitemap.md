# OpenCowork sitemap
Source: https://open-cowork.product.lyzr.ai (Lyzr, v0.6.1 Web, "Beta") — crawled 2026-10-20, signed in as bpatel@prophet.com.

## Shell (on every page)
- Top-left: Lyzr mark + "OpenCowork" + Beta badge · Search (⌘K) · Toggle sidebar
- Left sidebar: New chat (⌘⇧L) · Skills · Projects · Artifacts · Design · Agents Hub · Connectors
- Sidebar sections: Projects (See all, New project, project list with "New chat in project" + options) · Chats (See all, New chat, recent list with options)
- Bottom-left: User (name + email) → menu: Settings · Log out · theme (System / Light / Dark)
- Main breadcrumb: Projects › <project name>

## Pages
```
/login                        Welcome to OpenCowork → Continue with Microsoft | work email
/                             Home / New chat ("Good afternoon, <name> · What are we working on?")
                              ├─ Environment picker: Cloud · Local (desktop app) · No environment
                              ├─ Composer: + menu (Add photos & files, Web search, Connectors, Skills, Tools, Design system, Agents Hub)
                              │           Tool approval mode (Manually approve / Automatically approve)
                              │           Design system chip (Meridian) · Model picker (Auto …) · Send
                              └─ Suggested prompts: Connect your tools · Chat with a document · Design a UI mockup · Generate a document
/chat/<id>                    Chat view (messages, artifacts panel, tweaks / slide editor for decks)
/chats                        All chats (tabs: All · Pinned · Shared by me · Shared with me · Projects), grouped by day
/projects                     Projects list (New project; cards: name, description, owner, updated)
/projects/<id>                Project (shared instructions + files, project chats)
/skills                       Skills (Beta) — tabs All · Mine · Shared with me · Company · Built in; New skill (single markdown upload); on/off, Private/Built in badges
/artifacts                    Artifacts — tabs All · Documents · Designs · Files · Websites · Images; grouped by day, paginated
/design-systems               Design Systems (Beta) — New design system; cards (e.g. Meridian), Light/Dark
/agents                       Agents Hub — tabs All · Mine · Shared with me · Company; New agent; starter agents (Research analyst, Email & message drafter, Meeting notes & actions) with Use
/connectors                   Connectors — tabs All · Connected · To connect; Request a tool
/?settings=<section>          Settings dialog
                              ├─ Personal: Account · Appearance · Connections · Memory · Web pages
                              └─ Workspace: Workspaces · Dictation & read aloud · Image generation
```

## Theme tokens (light)
- Background #eeeeec · Card #fff · Foreground #16151a · Muted fg #6b6a65 · Border #e7e6e2
- Primary (buttons, active sidebar) #6b4c4c (brown) · Ring #6b4c4c · Radius 0.625rem
- Font: Geist Variable (sans), Playfair Display (serif headings), Geist Mono
