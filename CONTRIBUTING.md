# Contributing

## The thing that helps most

**Fix your own language.**

Twenty-five of the twenty-six interface translations were written without a native speaker. They are marked `rev:false` in the code, and the site says so to the reader in that language. Some of them are clumsy. At least one was wrong enough to be confusing before it was caught.

If you read one of these languages, correcting a single awkward phrase is worth more than any feature.

### How

1. Open `public/index.html` and find the `LANGS` object near the top of the `<script>`.
2. Find your language code. Every locale has the same 40 keys.
3. Fix what reads wrong. Keep the meaning; make it sound like your language, not like translated English.
4. If you are confident the whole locale is now correct, change `rev:false` to `rev:true` — that removes the draft notice.
5. Open a pull request saying which language you speak and roughly what you changed.

### What matters in these strings

Use the word your community actually uses, not the literal translation.

| | Right | Wrong |
|---|---|---|
| Urdu, Bengali | **پارہ / পারা** for juz' | جزء |
| Turkish | **meal** for a Qur'an translation | çeviri |
| Malay | **juzuk** | juz |
| Swahili | **msahafu**, **juzuu** | literal renderings |

Avoid words like "interface" that have no clean equivalent — name the thing in front of the reader instead.

## What is not accepted

**No machine-translated scripture, ever.** The Qur'an text and the translations come from published works via alquran.cloud, with the translator named. Pull requests that add, edit or paraphrase Qur'anic text or a translation will be closed.

If a published translation is missing for your language, the fix belongs upstream with alquran.cloud, not here.

## Code

One file, no build step, no dependencies. Open `public/index.html` in a browser and it runs.

Before opening a PR:

```bash
# extract the script and syntax-check it
sed -n '/^<script>$/,/^<\/script>$/p' public/index.html | sed '1d;$d' > /tmp/check.js
node --check /tmp/check.js
```

House rules, learned the hard way:

- **Controls announce themselves; ornament does not.** Hairlines and low-alpha fills are for the jadwal and the manuscript rules. Anything a person has to click gets a solid fill and a real border.
- **No text below 12px, and no letter-spacing above 0.09em on small type.** Contrast ratio is a floor, not a target.
- **Never mark a page read that the reader may not have read.** Dwell timers only count time the tab is visible.
- **The reading surface stays clean.** No banner, no modal, nothing floating over the muṣḥaf. Ever.

## Reporting something wrong

Two things are worth reporting immediately and will be fixed before anything else:

1. **Wrong or corrupted Qur'anic text on any page.**
2. **A translation attributed to the wrong translator.**
