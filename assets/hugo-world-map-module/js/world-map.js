(function () {
    'use strict';
    const root = document.getElementById('wm-root');
    if (!root) return;
    const viewport = document.getElementById('wm-viewport');
    const svgLayer = viewport ? viewport.querySelector('svg') : null;
    const tt = document.getElementById('wm-tooltip');
    const loader = document.getElementById('wm-loader');
    const btnZoomIn = document.getElementById('wm-btn-zoom-in');
    const btnZoomOut = document.getElementById('wm-btn-zoom-out');
    if (!svgLayer) return;

    const state = { scale: 1, x: 0, y: 0, isDragging: false, initialized: false };
    const MIN_SCALE = 1, MAX_SCALE = 20;
    const COLORS = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef', '#f43f5e'];

    let startX = 0, startY = 0;
    const pointers = new Map();
    let lastDist = 0, lastCenter = { x: 0, y: 0 };
    let rafId = null;

    function initMap() {
        if (state.initialized) return;
        state.initialized = true;
        root.classList.remove('wm-loading');
        if (loader) loader.style.display = 'none';

        if (!svgLayer.hasAttribute('viewBox')) {
            svgLayer.setAttribute('viewBox', '0 0 2000 857');
        }
        svgLayer.removeAttribute('width');
        svgLayer.removeAttribute('height');

        let visited = {}, names = {}, isos = {};
        try {
            const visitEl = document.getElementById('wm-data-visit');
            const mapEl = document.getElementById('wm-data-map');
            const isoEl = document.getElementById('wm-data-iso');
            if (visitEl) visited = JSON.parse(visitEl.dataset.json);
            if (mapEl) names = JSON.parse(mapEl.dataset.json);
            if (isoEl) isos = JSON.parse(isoEl.dataset.json);
        } catch (e) {
            console.error("World Map: Data parse error", e);
        }

        const paths = viewport.querySelectorAll('path');
        paths.forEach(p => {
            let iso = p.id && p.id.length === 2 ? p.id.toUpperCase() : null;
            let n = p.getAttribute('name');
            if (!n && !iso) {
                const cls = p.getAttribute('class') || "";
                if (cls.length > 2) n = cls.replace("land", "").trim();
            }
            if (n) n = n.replace(/_/g, " ").trim();
            if (n && !iso) iso = names[n];

            let disp = n || iso;
            if (iso && isos[iso]) disp = isos[iso];
            p.dataset.disp = disp || "";

            if (iso && visited[iso]) {
                p.classList.add('wm-visited');
                const hash = (iso || "x").split("").reduce((a, b) => a + b.charCodeAt(0), 0);
                p.style.fill = COLORS[hash % COLORS.length];
                p.dataset.link = visited[iso].link;
                p.dataset.visitedName = visited[iso].name;
            }
        });

        setupEventListeners();
        resizeMap();
        setTimeout(resizeMap, 300);
    }

    function requestUpdate() {
        if (!rafId) rafId = requestAnimationFrame(render);
    }

    function render() {
        svgLayer.style.transform = `translate(${state.x}px, ${state.y}px) scale(${state.scale})`;
        rafId = null;
    }

    function clamp(val, min, max) { return Math.min(Math.max(val, min), max); }

    function zoom(factor, cx, cy) {
        if (cx === undefined) {
            const rect = root.getBoundingClientRect();
            cx = rect.width / 2;
            cy = rect.height / 2;
        }
        const oldScale = state.scale;
        const newScale = clamp(oldScale * factor, MIN_SCALE, MAX_SCALE);
        if (newScale === oldScale) return;

        const wx = (cx - state.x) / oldScale;
        const wy = (cy - state.y) / oldScale;
        state.x = cx - (wx * newScale);
        state.y = cy - (wy * newScale);
        state.scale = newScale;

        if (newScale > 1) {
            root.classList.add('wm-zoomed');
        } else {
            root.classList.remove('wm-zoomed');
        }
        requestUpdate();
    }

    function getCenter(ptrs) {
        let x = 0, y = 0, count = 0;
        for (const p of ptrs.values()) { x += p.x; y += p.y; count++; }
        return { x: x / count, y: y / count };
    }

    function getDist(p1, p2) { return Math.hypot(p2.x - p1.x, p2.y - p1.y); }

    let interactionTimeout = null;
    function startInteraction() {
        if (interactionTimeout) { clearTimeout(interactionTimeout); interactionTimeout = null; }
        viewport.classList.add('wm-interacting');
    }
    function endInteraction() {
        if (interactionTimeout) clearTimeout(interactionTimeout);
        interactionTimeout = setTimeout(() => {
            viewport.classList.remove('wm-interacting');
            interactionTimeout = null;
        }, 150);
    }

    function onPointerDown(e) {
        if (e.button !== 0 && e.pointerType === 'mouse') return;
        startInteraction();
        root.setPointerCapture(e.pointerId);
        pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
        state.isDragging = true;
        if (pointers.size === 2) {
            const pts = Array.from(pointers.values());
            lastDist = getDist(pts[0], pts[1]);
        }
        lastCenter = getCenter(pointers);
        if (e.isPrimary || pointers.size === 1) { startX = e.clientX; startY = e.clientY; }
    }

    function onPointerMove(e) {
        if (e.pointerType === 'mouse' && tt) {
            const t = document.elementFromPoint(e.clientX, e.clientY);
            const path = t ? t.closest('path') : null;
            if (path && (path.dataset.visitedName || path.dataset.disp)) {
                tt.textContent = path.dataset.visitedName || path.dataset.disp;
                if (path.classList.contains('wm-visited')) {
                    tt.textContent += " " + (root.dataset.visitedLabel || "(Visited)");
                }
                tt.classList.add('wm-show');
                const rect = root.getBoundingClientRect();
                tt.style.transform = `translate(${e.clientX - rect.left + 15}px, ${e.clientY - rect.top + 15}px)`;
            } else {
                tt.classList.remove('wm-show');
            }
        }
        if (!pointers.has(e.pointerId)) return;
        pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
        const currentCenter = getCenter(pointers);
        const dx = currentCenter.x - lastCenter.x;
        const dy = currentCenter.y - lastCenter.y;
        state.x += dx;
        state.y += dy;
        if (pointers.size === 2) {
            const pts = Array.from(pointers.values());
            const currentDist = getDist(pts[0], pts[1]);
            if (lastDist > 0) {
                const rect = root.getBoundingClientRect();
                zoom(currentDist / lastDist, currentCenter.x - rect.left, currentCenter.y - rect.top);
            }
            lastDist = currentDist;
        } else {
            requestUpdate();
        }
        lastCenter = currentCenter;
    }

    function onPointerUp(e) {
        pointers.delete(e.pointerId);
        try { root.releasePointerCapture(e.pointerId); } catch (err) { }
        const dist = Math.hypot(e.clientX - startX, e.clientY - startY);
        if (pointers.size === 0) {
            state.isDragging = false;
            endInteraction();
            if (dist < 10) {
                const target = document.elementFromPoint(e.clientX, e.clientY);
                const t = target ? target.closest('.wm-visited') : null;
                if (t && t.dataset.link) { window.location.href = t.dataset.link; }
            }
        } else {
            lastCenter = getCenter(pointers);
            lastDist = 0;
        }
    }

    function onPointerCancel(e) { pointers.delete(e.pointerId); state.isDragging = false; }

    function onWheel(e) {
        e.preventDefault();
        startInteraction();
        const rect = root.getBoundingClientRect();
        zoom(e.deltaY > 0 ? 0.9 : 1.1, e.clientX - rect.left, e.clientY - rect.top);
        endInteraction();
    }

    function setupEventListeners() {
        root.addEventListener('pointerdown', onPointerDown);
        root.addEventListener('pointermove', onPointerMove);
        root.addEventListener('pointerup', onPointerUp);
        root.addEventListener('pointercancel', onPointerCancel);
        root.addEventListener('wheel', onWheel, { passive: false });
        if (btnZoomIn) btnZoomIn.addEventListener('click', () => zoom(1.3));
        if (btnZoomOut) btnZoomOut.addEventListener('click', () => zoom(0.7));
        window.addEventListener('resize', resizeMap);
    }

    function resizeMap() { }

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { initMap(); observer.disconnect(); }
            });
        }, { rootMargin: '100px', threshold: 0.01 });
        observer.observe(root);
    } else {
        initMap();
    }
})();
