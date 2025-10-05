# Changelog

## Round 1
- Site-level favorite star toggle, restore add-site flow, YouTube mock modal.

## Round 2
- "Favorite Site" checkbox, enforce gold star, global favorites handleLaunch, YouTube Cancel+Search rebind.

## Round 3
- Reverted to renderLinks() + UI reset, site-level favorites logic, add Backlog + Changelog.

## Round 4 Corrections
- Forced landing restore after add (exit input mode, show header/icons).
- Fixed site-level favorite star gold logic via persistent class toggle.
- Unified global favorites launch through handleLaunch (YouTube int/ext options).
- Rebound YouTube modal buttons and input on each open; cancel closes properly.
- Search results: mock rendering, scrollable container with max-height and body lock.
- Safe storage guards and environment separation.
- Lightweight event logging for key actions.

**Test Checklist**
1. Add site → landing restores header/icons/categories.
2. Favorite site → gold star at site level, global favorites updated.
3. Launch YouTube (card + global favorites) → int/ext prompt works, video loads or modal opens.
4. YouTube modal → input focus, Search mock results render, Cancel closes overlay.
5. Scrollable results container works; thumbnails load reliably.

⚠️ Deployment Note:
When extracting this bundle:
- Overwrite `script.js` and `style.css` in your repo.
- Keep `Enhancements_Backlog.md` and `Changelog.md` alongside your code (commit them too).
