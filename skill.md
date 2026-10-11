# Frontend Implementation Skill Guide

## School Repository Hub --- React + Tailwind CSS

This file defines the working conventions for implementing the frontend.
It is a project guide, not an installable AI skill package.

## 1. Preferred Stack

-   React
-   TypeScript (recommended)
-   Vite
-   Tailwind CSS
-   React Router (if multiple routes are needed)
-   Lucide React for icons
-   Optional: a small toast library if feedback patterns need it

Use the current stable versions compatible with the project's
environment. Follow the official installation instructions for the
selected Tailwind version; Tailwind configuration differs between major
versions.

## 2. Suggested Project Structure

``` text
src/
  app/
    App.tsx
    router.tsx
  components/
    layout/
      AppShell.tsx
      Sidebar.tsx
      Header.tsx
      MobileNav.tsx
    common/
      Button.tsx
      SearchInput.tsx
      Badge.tsx
      EmptyState.tsx
      LoadingState.tsx
    software/
      SoftwareCard.tsx
      SoftwareFilters.tsx
      SoftwareDetail.tsx
    files/
      Breadcrumbs.tsx
      FileToolbar.tsx
      FileList.tsx
      FileGrid.tsx
      FileRow.tsx
  pages/
    DashboardPage.tsx
    SoftwarePage.tsx
    FilesPage.tsx
    NotFoundPage.tsx
  data/
    mockSoftware.ts
    mockFiles.ts
  types/
    software.ts
    files.ts
  services/
    repositoryService.ts
    storageService.ts
  hooks/
    useDebouncedValue.ts
  lib/
    formatBytes.ts
    formatDate.ts
  index.css
  main.tsx
```

Adjust the structure if the project is small; do not create abstractions
that have only one trivial use without a clear reason.

## 3. Coding Conventions

-   Prefer function components and hooks.
-   Use TypeScript interfaces/types for software and file data.
-   Keep mock data separate from UI components.
-   Keep UI components presentational where possible.
-   Put data retrieval behind service functions so mock data can later
    be replaced by API calls.
-   Use stable IDs as React keys; do not use array indexes for mutable
    lists.
-   Avoid giant components. Split components when they have a clear
    responsibility.
-   Use semantic HTML.
-   Use Tailwind utility classes consistently; extract repeated patterns
    when doing so improves readability.
-   Do not use `dangerouslySetInnerHTML` for file names, descriptions,
    or metadata.
-   Do not hardcode credentials, API secrets, or admin endpoints into
    frontend code.
-   Avoid unnecessary global state. Start with local state and lift it
    only when shared state is needed.

## 4. Data/Service Boundary

The UI should call service functions rather than importing mock arrays
directly into every page.

Example conceptual API: - `getSoftwareItems()` - `getSoftwareById(id)` -
`getRootFolder()` - `getFolderContents(folderId)` - `getStorageStatus()`
only if a trusted endpoint exists

The first implementation may return mock data from these functions. Keep
function signatures stable enough to support a later API integration.

Never assume that a TrueNAS share can be queried directly by browser
JavaScript. SMB/NFS shares are not browser APIs. Integration requires a
supported web service, API, or direct download URLs.

## 5. State and Interaction

-   Search query: string state.
-   Category/platform filters: controlled state.
-   Sort order: controlled state.
-   File view mode: `list` or `grid`.
-   Current folder: stable folder ID or a safe application-level
    identifier.
-   Loading/error state: model explicitly if service calls are
    introduced.

Avoid storing derived results in state when they can be calculated from
source data and filters.

## 6. Download and File Safety

-   Only use trusted, configured download URLs.
-   For external links, use safe link attributes when opening a new tab.
-   Do not construct filesystem paths directly from arbitrary user
    input.
-   Do not assume hiding a button enforces authorization.
-   A frontend-only prototype must not claim to upload, delete, move, or
    rename actual server files.
-   If a download URL is missing, disable the action or show a clearly
    labeled unavailable state.
-   Use official sources and respect software distribution licenses.

## 7. Formatting Helpers

Create reusable helpers for: - Byte formatting (B, KB, MB, GB, TB) -
Date formatting with an explicit locale - File extension/type labeling -
Safe display of missing metadata

Missing values should display a neutral placeholder such as `—`, not
fabricated values.

## 8. Quality Checks

Before considering a page complete: - Check mobile and desktop
layouts. - Test empty search results. - Test missing icon and missing
metadata. - Test long file names. - Test keyboard navigation and visible
focus. - Check browser console for errors. - Ensure every visible button
has a real action or is clearly disabled. - Verify that demo/sample
links cannot be mistaken for production downloads.

## 9. Suggested Scripts

Expected Vite scripts: - `npm run dev` - `npm run build` -
`npm run preview` - `npm run lint` if ESLint is configured

Run the production build before deployment. Do not treat a successful
development server start as proof that the app is production-ready.

## 10. Definition of Done

A feature is done when its intended behavior works, responsive states
are checked, accessibility basics are covered, mock/live behavior is
clearly labeled, and no UI control makes a false claim about server-side
actions.
