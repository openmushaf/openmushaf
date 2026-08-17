# Open Muṣḥaf

A free, open Qur'an reader. One HTML file, no build step, no server, no account.

**openmushaf.org**

---

## What it does

Three reading densities, one book. Your place carries across all three.

| | On screen | Translation | For |
|---|---|---|---|
| **Muṣḥaf** | facing leaves, Arabic only | on tap | reading, memorising |
| **Parallel** | one page beside its translation | always | learning |
| **Āyah** | a single verse | primary | study, citation |

- **The Madani muṣḥaf, 604 pages** — verses run on and are closed by a rosette, as they are on the page. Sūrah openings get an illuminated cartouche.
- **The khatma wheel** — five traditional divisions of the same text, filling as you read: 114 sūrahs drawn by length, 604 pages, 240 rub el-ḥizb, 30 juz', 7 manzil. Reaching 604 records the completion and the next khatma begins.
- **Recitation** — verse by verse, highlighting as it goes, turning the page on its own.
- **Citation** — Short, Full, Block and Markdown, translator always named.
- **26 interface languages**, right-to-left where it belongs, with Nastaliq for Urdu and the correct digit set per script.

## Privacy

There is no server. No account, no analytics, no cookies, no telemetry. Reading progress lives in `localStorage` and cannot leave the browser, because there is nowhere for it to go. The Content-Security-Policy in `_headers` enforces this — the page may talk to exactly four hosts, and nothing else.

## Honest limits

- **Line breaks are the browser's, not the muṣḥaf's.** True fifteen-line setting needs a per-page font. The right verses are on the right pages; where each line ends is not authentic.
- **It needs the network on first read of each juz'.** Bundling the text is the next task — see below.
- **25 of the 26 interface translations have not been reviewed by a native speaker.** The UI says so, in that language.

## Sources

- Qur'an text, translations and sūrah data — [alquran.cloud](https://alquran.cloud)
- Recitation — `cdn.islamic.network`
- Fonts — Amiri and Noto, both OFL

The Qur'an is never translated here. Every translation is a published work by a named translator, served as-is. Nothing on this site is machine-translated scripture.

## Contributing

The most useful thing you can send is **a correction to your own language**. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Roadmap

- [ ] Bundle the Qur'an text so the site works with the network unplugged
- [ ] Self-host the fonts (removes the Google Fonts dependency and the request it makes)
- [ ] Service worker for full offline
- [ ] Split locales into `locales/*.json`
- [ ] Native-speaker review, one language at a time

## Licence

Code: MIT, © Al Arabi — see [LICENSE](LICENSE).

The Qur'an text and the translations are **not** covered by that licence. They belong to their sources and translators and are served under their own terms.

## Support

Open Muṣḥaf costs about $37 a year to run: two domains, and nothing else. The code is static and the hosting is free.

[Support development](https://ko-fi.com/openmushaf)
