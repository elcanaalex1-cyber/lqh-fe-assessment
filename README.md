# Lendsqr Dashboard

Responsive React + TypeScript implementation of the supplied Lendsqr experience: login, dashboard, users, and user details. Styling uses Tailwind CSS v3 with an SCSS design layer and shadcn-compatible primitives.

## Run locally

```bash
npm install
npm run dev
```

Enter any email and password on the login screen. Only the views represented in the supplied designs are enabled; unsupported navigation is intentionally disabled.

## Quality checks

```bash
npm test
npm run build
```

## Architecture and implementation notes

- The mock data service generates 500 unique records. `fetchUsersPage` behaves like a paginated endpoint and returns only the requested page after filtering. A hosted API can replace this adapter without changing the table.
- The Users grid uses TanStack Table in manual-pagination mode. Only the current page is rendered, so virtualization would add complexity without improving this 500-record case.
- Buttons, inputs, filter popovers, action menus, skeletons, and shared variants live under `src/components/ui`; Radix supplies keyboard/focus behavior for overlays.
- Imported Figma assets are used for the login illustration, avatar, sidebar navigation, and user statistic cards. Lucide is reserved for utility actions that were not included in the supplied asset set.
- User details are persisted to `localStorage` before navigation and recovered on refresh or direct detail access.
- Loading, empty, error, disabled, validation, and success-feedback states are represented.
- Unsupported destinations provide clear “coming soon” feedback rather than behaving like dead controls. Detail tabs expose intentional empty states.
- On narrow screens, navigation becomes an off-canvas drawer, cards reflow, detail grids collapse, and dense tables use an intentional horizontal scroll rather than unreadably compressing columns.

Fonts use `Avenir Next` when available and the bundled Google-hosted `Work Sans` fallback. Brand colors are named tokens in `tailwind.config.js`.
