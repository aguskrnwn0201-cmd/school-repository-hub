# Frontend Roadmap

## School Repository Hub

The roadmap is staged so the interface can be built and tested before
connecting it to the existing server.

## Current Progress

- Phase 1 is complete: React + TypeScript + Vite, Tailwind CSS, routing, shared navigation, and local sample data are in place.
- Phases 2–4 are complete: the dashboard, searchable/category-filtered software catalog, and folder browser with breadcrumbs and list/grid views are available. Download links for software and files are active, pointing to official sources.
- Phase 4.5 is complete: login page (new `src/pages/LoginPage.tsx` component), protected routes, Teknisi/Guest roles, and a technician-only user management page with add/edit/delete flows are implemented using local storage. Guest users bypass login and access the portal directly without credentials. Only the Teknisi role requires login. Session and user data are stored in localStorage with schema versioning to handle future migrations cleanly.
- Auth model change: login form now uses **username** instead of email. `AppUser` has a `username` field. `handleLogin` matches by username.
- Download model: `SoftwareItem` and `FileEntry` now include an optional `downloadUrl` field. All four software items and four file entries have configured download URLs pointing to official sources. Download buttons and file rows activate automatically when a URL is present.
- Frontend prototype status: complete for this scope. The project is not production-ready without a real backend or authentication service, but the UI and interaction flow are finished for the current frontend milestone.

## Phase 0 --- Confirm Constraints

**Deliverables** - Confirm current TrueNAS version and how files are
currently accessed. - Confirm whether the existing service exposes
HTTP/HTTPS download URLs or an API. - Confirm intended audiences and
whether authentication already exists. - Agree on which folders/files
may be exposed in the portal.

**Exit criteria** - No planned feature depends on an assumed API. -
Existing storage service remains unchanged.

## Phase 1 --- Project Foundation

**Tasks** - Create React + TypeScript + Vite project. - Configure
Tailwind CSS using the installation method for its chosen version. - Add
routing if required. - Add icon library. - Set up global styles,
typography, color tokens, and responsive container. - Create mock data
and TypeScript types.

**Deliverables** - Running project with shared layout. - Sidebar/header
and mobile navigation. - Basic route navigation.

**Exit criteria** - Project builds successfully. - Navigation works on
mobile and desktop.

**Status: ✅ Complete**

## Phase 2 --- Dashboard

**Tasks** - Build welcome area and quick links. - Add recent software
and recent files sections. - Add global search entry point. - Omit live
storage metrics until a real data source exists.

**Deliverables** - Dashboard using clearly labeled sample data.

**Exit criteria** - Every dashboard card navigates to a relevant page. -
Sample information is not represented as live server status.

**Status: ✅ Complete**

## Phase 3 --- Software Center

**Tasks** - Build software card and detail view. - Add search. - Add
category and platform filters. - Add sorting. - Format size and date. -
Implement configured download-link behavior and unavailable/demo states.

**Deliverables** - Searchable software catalog.

**Exit criteria** - Search, filters, sorting, and detail view work with
sample data. - Missing URLs cannot trigger misleading downloads.

**Status: ✅ Complete** — `downloadUrl` added to `SoftwareItem`. Download
button renders as an active `<a>` link when URL is present, disabled
state when not. All four catalog items have official download URLs
configured.

## Phase 4 --- Cloud Storage Browser

**Tasks** - Build breadcrumbs and folder navigation. - Build list and
grid views. - Add folder/file icons. - Add search within the current
folder. - Add sorting where metadata exists. - Add empty, disconnected,
and error states. - Keep destructive actions out of scope.

**Deliverables** - Functional frontend file browser using mock data.

**Exit criteria** - Folder navigation and breadcrumbs work. - Switching
views does not lose the current folder. - UI does not claim to mutate
real files.

**Status: ✅ Complete** — `downloadUrl` added to `FileEntry`. File rows
with a configured URL render as `<a download>` links; file rows without
a URL remain disabled. Four file entries have sample download URLs.

## Phase 4.5 --- Authentication and Access Control

**Tasks** - Add login screen and protected route guards. - Create demo users with only two roles: Teknisi and Guest. - Add a technician-only user-management page for create, edit, deactivate, and delete operations in the prototype. - Store prototype session state locally and keep the flow isolated from backend services.

**Deliverables** - Authenticated portal experience for demo use. - Role-based access visibility in the sidebar and management UI. - Guest read-only mode and technician operational dashboard.

**Exit criteria** - Valid credentials grant access, invalid credentials are rejected, and inactive users cannot sign in. - User management is available only to the Teknisi role. - All auth logic remains clearly marked as prototype data and is ready to be replaced by a real backend.

**Status: ✅ Complete** — with the following adjustments from original spec:

- Login form uses **username** (not email) as the identifier. `AppUser` now has a `username` field alongside `email`. `handleLogin` matches by username.
- Guest role bypasses login entirely. `getStoredSession` falls back to the guest user when no session exists, so the portal is immediately accessible without credentials.
- Logging out from a Teknisi session returns to guest mode (not a logged-out state), keeping the portal accessible.
- Topbar shows a **"Masuk sebagai Teknisi"** button for guests and a **"Keluar"** button for the Teknisi role.
- `LoginPage` extracted to `src/pages/LoginPage.tsx` as a standalone, presentational component. `demoAccounts` prop populated from `App.tsx` (only Teknisi shown; Guest removed since guest access is automatic).
- `localStorage` schema versioning added (`SCHEMA_VERSION` constant). On schema mismatch, stale data is cleared automatically to prevent runtime crashes from outdated stored structures.
- React `ErrorBoundary` added to `src/main.tsx` to surface runtime errors visibly instead of a blank screen.

## Phase 5 --- Responsive and Accessibility Pass

**Tasks** - Test at 360 px, tablet, and desktop widths. - Test
keyboard-only navigation. - Add focus indicators and accessible
labels. - Test long names, missing metadata, and empty states. - Check
contrast and touch target sizes.

**Deliverables** - Responsive, accessible frontend prototype.

**Exit criteria** - No major overflow or unusable navigation. - Visible
controls have working or explicitly disabled behavior.

**Status: 🔲 Not started**

## Phase 6 --- Integration Readiness

**Tasks** - Route page data through service modules. - Document expected
API response shapes. - Confirm CORS, HTTPS, authentication, and direct
download behavior with the existing system. - Replace mock service
functions only after the real integration method is verified. - Keep
credentials and privileged tokens out of the browser.

**Deliverables** - Integration-ready frontend and API contract notes.

**Exit criteria** - Mock and live implementations can be switched
without rewriting page components. - Unauthorized operations are not
treated as safe merely because a button is hidden.

**Status: 🔲 Not started** — `downloadUrl` fields in `SoftwareItem` and
`FileEntry` are ready to be replaced with real server URLs. `AppUser`
fields are ready to be populated from a real auth endpoint. The
`SCHEMA_VERSION` mechanism provides a migration path for future data
shape changes.

## Phase 7 --- Deployment

**Tasks** - Build production assets. - Deploy the static frontend to an
approved web host or existing web service. - Configure HTTPS and routing
fallback if using client-side routes. - Test downloads from the intended
networks. - Confirm access restrictions and backup responsibilities with
the server owner.

**Deliverables** - Published frontend portal.

**Exit criteria** - HTTPS works where the portal is exposed remotely. -
Existing file storage remains unaffected. - Download links and
navigation are verified in the deployed environment.

**Status: 🔲 Not started**

## Priority Summary

1.  Foundation and shared layout
2.  Software Center
3.  Cloud Storage browser
4.  Dashboard polish
5.  Accessibility/responsive QA
6.  Integration and deployment

## Scope Guardrails

-   No backend rewrite in the frontend milestone.
-   No upload/delete/rename/move implementation without a supported API
    and authorization.
-   No public exposure of private shares.
-   No fabricated storage statistics, download counts, or activity
    history.
-   Do not expose the TrueNAS administrative interface as part of the
    public portal.
