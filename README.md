# Edanur Gündüz Portfolio

Updated October 8, 2026 from EDA-WEBSITE → WEBSİTE SON → website last (212:84).

Static HTML/CSS/JavaScript. Preview: http://127.0.0.1:8860/.

Pages: home, ShoCo, Afterimage, Steal & Seal, Multiwars. Foody remains excluded.

All 296 Figma text nodes are verified against the latest design, including typography and footer copy. Latest local Steal & Seal monitor mockups and the English CV are included. Images are high-quality WebP; vector icons remain SVG.

Afterimage uses adaptive H.264 fast-start videos: 1920×1080 desktop (547 KB) and 720×960 mobile (257 KB), CRF 19. Desktop source similarity measured SSIM 0.99577. Videos pause outside the viewport. Original media remains unchanged.

Interactions retained: home hover backplates and strokes; Afterimage creation action interactions; card enlargement; automatic/manual design evolution carousel with longer final-design pause; wireframe comparison; animated HUD highlights; video stop/play icons; next-project navigation. Reduced-motion preferences and mobile layouts are supported.

Five pages, 136 local asset references and JavaScript syntax checked. Browser verification covered widths 390, 768, 1024 and 1440 pixels without unintended text overflow or broken loaded images. Capture/Import preview switching works with mouse, keyboard and touch. Card enlargement, carousel controls, comparison and HUD controls were verified. Native Windows OS testing was unavailable; layouts were tested in Chromium.

Old media and source snapshots are archived outside the website in ../work/website-last/previous-2026-10-08. Optimization reports, desktop-image provenance and conversion sources are in ../work/website-last.

Publishing is not configured by this update.

October 9 update: replaced the downloadable CV with the supplied EdanurGündüz_CV.pdf. Home card scaling now follows container ResizeObserver updates, including desktop/mobile breakpoint transitions; the design carousel recalculates its position on width changes. Afterimage adapts its source when crossing the mobile breakpoint and uses fast-decode H.264 Baseline at 24 fps: 1280×720 desktop (326,597 bytes), 540×720 mobile (256,628 bytes). Native Windows and device-specific playback performance still require on-device verification.

Afterimage playback correction: source capture contained repeated frames and an incomplete six-second loop. The existing bubble renderer is now exported deterministically, producing 180 distinct frames at 30 fps and a complete six-second cycle, rather than transcoding the interrupted realtime recording. The desktop and mobile smooth MP4s are H.264 Main, one reference frame, no B-frames, fast-start, about 712 KB and 620 KB. Decoded-frame comparison found zero repeated frames; loop boundary movement is comparable to an ordinary frame step. Older lightweight assets are retained as backups but are no longer loaded by the page.
