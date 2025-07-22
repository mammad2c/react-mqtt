# Shared · Lib folder (`shared/lib/`)

Reusable **“pure helper”** functions that are:

- **Domain-agnostic** – no entity, feature, or widget imports.
- **Stateless & side-effect–free** (except for explicit helpers like `genId` that need `Date.now()` or `Math.random()`).
- **Cross-layer** – can be imported from _any_ slice (`entities`, `features`, `widgets`, `pages`, `app`).

---

## 1. Bucket-by-purpose, never “utils”

Group helpers in sub-folders named for their **concept**, not for their file type.

```
shared/lib/
├─ date/
│   ├─ format-date.ts
│   └─ parse-iso-string.ts
├─ id/
│   ├─ gen-id.ts
│   └─ uuid.ts
├─ random/
│   └─ pick-random.ts
└─ index.ts          ← optional root barrel
```

_If you have only one helper in a bucket today, that’s fine—future helpers go next to it._

---

## 2. Allowed imports

- ✅ **Node/DOM APIs** (`Date`, `crypto`, `window` – if guarded by `typeof window`)
- ✅ **NPM utilities** (`clsx`, `date-fns`)
- 🚫 **FSD layers above shared** (`entities/`, `features/`, `widgets/`, `pages/`, `app/`)

The linter will flag upward imports.

---

## 3. Recommended file conventions

| Rule                                         | Example                             |
| -------------------------------------------- | ----------------------------------- |
| **File = one helper** unless truly tiny      | `format-date.ts`                    |
| **Function names are verb-based**            | `format-date`, `gen-id`, `rand-int` |
| **Type exports** live next to implementation | `export type ISODate = string;`     |
| **Add JSDoc** for non-obvious behaviour      | `/** RFC 3339 to “DD MMM YYYY” */`  |

---

## 4. Barrel export pattern (optional) - not recommended

Inside each bucket:

```ts
// shared/lib/date/index.ts
export * from "./format-date";
export * from "./parse-iso-String";
```

It is not recommended to use a barrel export pattern. Because it can be confusing and can make it hard to find the source of a helper.
