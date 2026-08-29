# Test Coverage Analysis & Plan

> Analysis date: April 20, 2026  
> Total test files: 49 (16 `.test.ts` + 28 `.test.tsx` + 5 `.spec.ts`)

---

## Summary

| Category              | Total Files | Tested | Missing Tests |
| --------------------- | ----------- | ------ | ------------- |
| **Components** (.tsx) | 57          | 28     | 29            |
| **Hooks** (.ts)       | 41          | 13     | 28            |
| **Scripts** (.ts)     | 40          | 16     | 24            |
| **TOTAL**             | 138         | 57     | 81            |

> **Note:** Index files (e.g., `index.ts`, `hooks/index.ts`) and type files (`.types.ts`) typically don't need tests as they are re-exports or type definitions.

---

## Components Needing Tests (29)

### App Level

- [ ] `src/app/components/context-provider.tsx`
- [ ] `src/app/components/app-routes.tsx`

### Editor Feature

- [ ] `src/features/editor/components/editor-setup.tsx`
- [ ] `src/features/editor/modules/edit-space/components/text-to-edit.tsx`
- [ ] `src/features/editor/modules/edit-space/components/start-edit.tsx`
- [ ] `src/features/editor/modules/edit-space/components/editor-controllers.tsx`
- [ ] `src/features/editor/modules/edit-space/components/edit-text-field.tsx`
- [ ] `src/features/editor/modules/edit-space/components/edit-space.tsx`
- [ ] `src/features/editor/modules/settings/components/settings-bar.tsx`
- [ ] `src/features/editor/modules/settings/components/mobile-menue.tsx`
- [ ] `src/features/editor/modules/settings/components/desktop-menue.tsx`
- [ ] `src/features/editor/modules/settings/components/challenge-params.tsx`
- [ ] `src/features/editor/modules/settings/components/challenge-options.tsx`
- [ ] `src/features/editor/modules/settings/components/challenge-mode.tsx`
- [ ] `src/features/editor/modules/settings/modules/results/components/result-shower.tsx`
- [ ] `src/features/editor/modules/settings/modules/results/components/accuracy.tsx`
- [ ] `src/features/editor/modules/settings/modules/results/components/time.tsx`
- [ ] `src/features/editor/modules/settings/modules/results/components/results.tsx`
- [ ] `src/features/editor/modules/settings/modules/results/components/word-per-minute.tsx`

### Header Feature

- [ ] `src/features/header/components/header.tsx`
- [ ] `src/features/header/components/logo-large.tsx`

### History Feature

- [ ] `src/features/history/components/clear-button.tsx`

### Results Feature

- [ ] `src/features/results/components/results-show.tsx`

### Shared

- [ ] `src/shared/heading-manager/components/heading-managers.tsx` ⚠️ Has region-drawer.test.tsx but not specific to this component
- [ ] `src/shared/paging/components/paging-button.tsx`
- [ ] `src/shared/paging/components/page-holding.tsx`

---

## Hooks Needing Tests (28)

### Editor Feature

- [ ] `src/features/editor/modules/edit-space/hooks/use-text-to-edit.ts`
- [ ] `src/features/editor/modules/edit-space/hooks/use-start-edit.ts`
- [ ] `src/features/editor/modules/edit-space/hooks/use-editor-field.ts`
- [ ] `src/features/editor/modules/settings/modules/results/hooks/use-results-time.ts`
- [ ] `src/features/editor/modules/settings/modules/results/hooks/use-accuracy.ts`

### Results Feature

- [ ] `src/features/results/hooks/use-results-landing.ts`

### Heading Manager (Shared)

- [ ] `src/shared/heading-manager/hooks/use-heading.ts`
- [ ] `src/shared/heading-manager/hooks/HeadingCtx.ts`

### Redirect (Shared)

- [ ] `src/shared/redirect/hooks/use-redirect.ts` (if exists)

---

## Scripts Needing Tests (24)

### Editor Feature

- [ ] `src/features/editor/modules/settings/scripts/save-params.ts`
- [ ] `src/features/editor/modules/settings/scripts/normalize-parameters.ts`
- [ ] `src/features/editor/modules/settings/scripts/desktop-scroll.ts`

### Results Feature

- [ ] `src/features/results/scripts/share-helper.ts`

### Theme Feature

- [ ] `src/features/theme/scripts/preload-theme.ts`

### Helpers (Shared)

- [ ] `src/shared/helpers/scripts/focus-element.ts`

### Memorization (Shared)

- [ ] (All tested: set-item.ts, get-memo.ts)

### Redirect (Shared)

- [ ] `src/shared/redirect/scripts/set-redirect-path.ts`
- [ ] `src/shared/redirect/scripts/rebuild-path.ts`

---

## Already Covered (No Action Needed)

### Components (28 tested)

| Component                      | Test File                 |
| ------------------------------ | ------------------------- |
| theme-switch.tsx               | theme-switch.test.tsx     |
| results-stats.tsx              | results-stats.test.tsx    |
| results-landing.tsx            | results-landing.test.tsx  |
| wpm-text.tsx                   | wpm-text.test.tsx         |
| error-element.tsx              | error-element.test.tsx    |
| personal-best.tsx              | personal-best.test.tsx    |
| score-history.tsx              | score-history.test.tsx    |
| history-element.tsx            | history-element.test.tsx  |
| empty-score.tsx                | empty-score.test.tsx      |
| ColorsHelper.tsx               | ColorsHelper.test.tsx     |
| heading-managers.tsx           | heading-managers.test.tsx |
| SROnly.tsx                     | SROnly.test.tsx           |
| CustomDialog.tsx               | CustomDialog.test.tsx     |
| CustomDetails.tsx              | CustomDetails.test.tsx    |
| bi-icon.tsx                    | bi-icon.test.tsx          |
| paging-element.tsx             | paging-element.test.tsx   |
| typing-context.tsx             | typing-context.test.tsx   |
| use-error.test.tsx             | (hook test)               |
| use-results.test.tsx           | (hook test)               |
| use-results-stats.test.tsx     | (hook test)               |
| use-personal-best.test.tsx     | (hook test)               |
| use-score-history.test.tsx     | (hook test)               |
| use-challenge-mode.test.tsx    | (hook test)               |
| use-challenge-options.test.tsx | (hook test)               |
| use-mobile-menue.test.tsx      | (hook test)               |
| region-drawer.test.tsx         | (script test)             |

### Hooks (13 tested)

| Hook                     | Test File                      |
| ------------------------ | ------------------------------ |
| use-theme.ts             | use-theme.test.ts              |
| use-typing-speed.ts      | use-typing-speed.test.ts       |
| use-colors-helper.ts     | use-colors-helper.test.ts      |
| use-pagination.ts        | use-pagination.test.ts         |
| use-error.ts             | use-error.test.tsx             |
| use-results.ts           | use-results.test.tsx           |
| use-results-stats.ts     | use-results-stats.test.tsx     |
| use-personal-best.ts     | use-personal-best.test.tsx     |
| use-score-history.ts     | use-score-history.test.tsx     |
| use-challenge-mode.ts    | use-challenge-mode.test.tsx    |
| use-challenge-options.ts | use-challenge-options.test.tsx |
| use-mobile-menue.ts      | use-mobile-menue.test.tsx      |
| handle-screen-size.ts    | handle-screen-size.test.ts     |
| use-route-with-search.ts | use-route-with-search.test.tsx |

### Scripts (16 tested)

| Script                     | Test File                    |
| -------------------------- | ---------------------------- |
| typing-speed-scripts.ts    | typing-speed-scripts.test.ts |
| initial-state-helper.ts    | initial-state-helper.test.ts |
| calculation-helper.ts      | calculation-helper.test.ts   |
| handle-theme.ts            | handle-theme.test.ts         |
| helpers.ts (colors-helper) | helpers.test.ts              |
| check-heading-order.ts     | check-heading-order.test.ts  |
| time-helper.ts             | time-helper.test.ts          |
| random-gen.ts              | random-gen.test.ts           |
| other-helpers.ts           | other-helpers.test.ts        |
| set-item.ts                | set-item.test.ts             |
| get-memo.ts                | get-memo.test.ts             |
| region-drawer.ts           | region-drawer.test.tsx       |

---

## Priority Recommendations

### High Priority (Core Business Logic)

1. **Editor hooks** - `use-text-to-edit`, `use-start-edit`, `use-editor-field` (critical for typing test functionality)
2. **Results scripts** - `share-helper.ts` (user-facing feature)
3. **Redirect scripts** - `set-redirect-path.ts`, `rebuild-path.ts` (navigation logic)

### Medium Priority (UI Components)

1. **Editor components** - edit-space and settings components (many files)
2. **Header components** - header.tsx, logo-large.tsx

### Low Priority (Utility/Helpers)

1. **focus-element.ts** - utility script
2. **preload-theme.ts** - theme initialization
3. **paging-button.tsx**, **page-holding.tsx** - simple components

---

## Excluded from Testing

### Index Files (Re-exports only)

- `*/index.ts` - barrel exports
- `*/hooks/index.ts`
- `*/scripts/index.ts`
- `*/components/index.ts`

### Type Files

- `*.types.ts`
- `types/index.ts`
- Any file containing only type definitions

### Configuration Files

- `playwright.config.ts`
- `vitest-setup.ts`
