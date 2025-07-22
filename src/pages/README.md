# Pages layer (`pages/`)

_One slice ≈ one routed screen._

| Guideline                                                                                                     | Rationale |
| ------------------------------------------------------------------------------------------------------------- | --------- |
| **Start every new flow here.** Build your UI directly inside the page slice; extract later if you need reuse. |
| **Can import:** `widgets`, `features`, `entities`, `shared` (down-only).                                      |
| **Cannot import:** other pages, `app/`.                                                                       |
| **Naming:** `<something>.page.tsx` or just the business noun (`editor`, `article`, `profile`).                |
| **Segments (optional):** keep flat until the slice grows; then add `ui/`, `model/`, `lib/` as needed.         |

Typically, pages are the entry points to your application. For nested routes you can create folder and files based on next.js [routing conventions](https://nextjs.org/docs/routing).

You can't put nested routes inside `ui/`, `model/`, `api`, `lib/`, `config` folders (or any FSD specific segments (https://feature-sliced.github.io/documentation/docs/reference/slices-segments#segments)).

For example if you have `posts` page, you can create `posts/[id]/index.page.tsx` file for a single post page.
