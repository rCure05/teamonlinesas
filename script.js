tailwind.config = {
    theme: {
        extend: {
            fontFamily: { sans: ['Inter', 'sans-serif'] },
            colors: {
                brand: { 50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca', 900: '#1e1b4b' }
            }
        }
    }
};

(function () {
    'use strict';

    const SUPABASE_URL = 'https://hfbrlvsvvwnckvojlnuk.supabase.co';
    const SUPABASE_ANON_KEY = 'sb_publishable_WZnlCuSlvo5qfi3AVhsSpQ_Mt6iO14m';
    const AUTH_KEY = 'team-online-supabase-session-v1';
    const LEGACY_PERIOD = '2026-11';
    const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const CHART_COLORS = ['#4f46e5', '#f59e0b', '#06b6d4', '#8b5cf6', '#10b981', '#f43f5e', '#64748b'];

    const $ = id => document.getElementById(id);
    const $$ = sel => document.querySelectorAll(sel);

    const now = new Date();
    const TODAY_ISO = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const CURRENT_YEAR = now.getFullYear();
    const CURRENT_MONTH = TODAY_ISO.slice(0, 7);

    // ==========================================
    // 1. IKON SVG, HELPER & MODERN APP ALERT
    // ==========================================
    const ICONS = {
        'wallet': '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
        'lock': '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
        'eye': '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
        'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
        'menu': '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
        'x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
        'layout-dashboard': '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
        'arrow-left-right': '<path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/>',
        'users': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
        'clipboard-check': '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
        'sliders-horizontal': '<line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/>',
        'sparkles': '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>',
        'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
        'plus': '<path d="M5 12h14"/><path d="M12 5v14"/>',
        'calendar-range': '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/><path d="M17 14h-6"/><path d="M13 18H7"/>',
        'check': '<path d="M20 6 9 17l-5-5"/>',
        'rotate-ccw': '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
        'landmark': '<line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/>',
        'shield-check': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
        'alert-triangle': '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
        'arrow-down-left': '<path d="M17 7 7 17"/><path d="M17 17H7V7"/>',
        'arrow-up-right': '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
        'trending-up': '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
        'trending-down': '<polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>',
        'file-clock': '<path d="M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><circle cx="8" cy="16" r="6"/><path d="M9.5 17.5 8 16.25V14"/>',
        'user-check': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/>',
        'check-check': '<path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/>',
        'check-circle-2': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
        'clock': '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
        'search': '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
        'calendar': '<rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>',
        'info': '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
        'user-plus': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>',
        'pencil': '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>',
        'trash-2': '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
        'shield': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
        'save': '<path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/>'
    };

    const icon = (name, cls = 'w-4 h-4 shrink-0') =>
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls}" aria-hidden="true">${ICONS[name] || ''}</svg>`;

    const parseCurrency = raw => Number(String(raw || '').replace(/\D/g, '')) || 0;
    const formatThousand = num => (parseCurrency(num) > 0 ? parseCurrency(num).toLocaleString('id-ID') : '');
    const formatRp = num => 'Rp ' + Math.abs(Number(num) || 0).toLocaleString('id-ID');
    const esc = str => String(str || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

    function formatDateID(iso) {
        if (!iso || typeof iso !== 'string') return '-';
        const [y, m, d] = iso.split('-');
        return d && MONTHS_SHORT[Number(m) - 1] ? `${Number(d)} ${MONTHS_SHORT[Number(m) - 1]} ${y}` : iso;
    }

    function createUniqueId(prefix, list) {
        const used = new Set(list.map(x => String(x.id)));
        let max = list.reduce((m, x) => {
            const match = String(x.id).match(new RegExp(`^${prefix}-(\\d+)$`));
            return match ? Math.max(m, Number(match[1])) : m;
        }, 0) + 1;
        while (used.has(`${prefix}-${String(max).padStart(2, '0')}`)) max++;
        return `${prefix}-${String(max).padStart(2, '0')}`;
    }

    function notify(msg, type = 'success', customTitle = null) {
        const box = $('toast-container');
        if (!box) return;
        const cfg = {
            success: { title: 'Berhasil', icon: 'check-circle-2', iconBox: 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20', bar: 'bg-emerald-500' },
            warning: { title: 'Perhatian', icon: 'alert-triangle', iconBox: 'bg-amber-50 text-amber-600 ring-1 ring-amber-500/20', bar: 'bg-amber-500' },
            danger:  { title: 'Dihapus', icon: 'trash-2', iconBox: 'bg-rose-50 text-rose-600 ring-1 ring-rose-500/20', bar: 'bg-rose-500' },
            info:    { title: 'Informasi', icon: 'info', iconBox: 'bg-brand-50 text-brand-600 ring-1 ring-brand-500/20', bar: 'bg-brand-600' }
        }[type] || { title: 'Informasi', icon: 'info', iconBox: 'bg-brand-50 text-brand-600 ring-1 ring-brand-500/20', bar: 'bg-brand-600' };

        const el = document.createElement('div');
        el.setAttribute('role', 'status');
        el.className = 'toast-item pointer-events-auto relative overflow-hidden bg-white/95 backdrop-blur-md text-slate-800 border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-900/10 p-3.5 flex items-start gap-3 -translate-y-3 opacity-0 scale-95';
        el.innerHTML = `
            <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${cfg.iconBox}">${icon(cfg.icon, 'w-4 h-4')}</div>
            <div class="min-w-0 flex-1 pt-0.5">
                <p class="text-xs font-bold text-slate-900 leading-tight">${esc(customTitle || cfg.title)}</p>
                <p class="text-xs text-slate-600 mt-0.5 leading-relaxed break-words">${esc(msg)}</p>
            </div>
            <button type="button" aria-label="Tutup notifikasi" class="toast-close p-1 -mr-1 -mt-0.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 shrink-0">${icon('x', 'w-3.5 h-3.5')}</button>
            <div class="toast-bar absolute bottom-0 left-0 h-0.5 w-full ${cfg.bar} origin-left"></div>
        `;

        box.appendChild(el);
        requestAnimationFrame(() => el.classList.remove('-translate-y-3', 'opacity-0', 'scale-95'));

        let timer = null;
        const bar = el.querySelector('.toast-bar');
        const close = () => {
            clearTimeout(timer);
            el.classList.add('-translate-y-2', 'opacity-0', 'scale-95');
            setTimeout(() => el.remove(), 260);
        };
        const startTimer = (ms = 3400) => {
            if (bar) {
                bar.style.transition = `transform ${ms}ms linear`;
                requestAnimationFrame(() => { bar.style.transform = 'scaleX(0)'; });
            }
            timer = setTimeout(close, ms);
        };

        el.querySelector('.toast-close')?.addEventListener('click', close);
        el.addEventListener('mouseenter', () => { clearTimeout(timer); if (bar) bar.style.transition = 'none'; });
        el.addEventListener('mouseleave', () => startTimer(1800));
        startTimer();
    }

    function toggleModal(id, show) {
        const el = $(id);
        if (!el) return;
        el.classList.toggle('hidden', !show);
        el.classList.toggle('flex', show);
    }

    function openPortal(isLoading = false) {
        const portal = $('access-portal');
        if (!portal) return;
        portal.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
        $('portal-loading')?.classList.toggle('hidden', !isLoading);
        $('portal-choice')?.classList.toggle('hidden', isLoading);
        document.body.classList.add('overflow-hidden');
    }

    function closePortal() {
        const portal = $('access-portal');
        if (!portal) return;
        portal.classList.add('opacity-0', 'pointer-events-none');
        document.body.classList.remove('overflow-hidden');
        setTimeout(() => {
            if (portal.classList.contains('pointer-events-none')) {
                portal.classList.add('hidden');
            }
        }, 300);
    }

    function confirmAction({ title = 'Konfirmasi', message = '', confirmText = 'Ya, Lanjutkan', cancelText = 'Batal', variant = 'danger' } = {}) {
        return new Promise(resolve => {
            const modal = $('confirm-modal');
            const okBtn = $('btn-confirm-ok');
            const cancelBtn = $('btn-confirm-cancel');
            const iconBox = $('confirm-icon-box');
            if (!modal || !okBtn || !cancelBtn) return resolve(false);

            const styles = {
                danger:  { box: 'bg-rose-50 text-rose-600', btn: 'bg-rose-600 hover:bg-rose-700 text-white', ic: 'trash-2' },
                warning: { box: 'bg-amber-50 text-amber-600', btn: 'bg-amber-600 hover:bg-amber-700 text-white', ic: 'alert-triangle' },
                brand:   { box: 'bg-brand-50 text-brand-600', btn: 'bg-brand-600 hover:bg-brand-700 text-white', ic: 'info' }
            }[variant] || { box: 'bg-rose-50 text-rose-600', btn: 'bg-rose-600 hover:bg-rose-700 text-white', ic: 'alert-triangle' };

            $('confirm-title').textContent = title;
            $('confirm-message').textContent = message;
            okBtn.textContent = confirmText;
            cancelBtn.textContent = cancelText;
            iconBox.className = `w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${styles.box}`;
            iconBox.innerHTML = icon(styles.ic, 'w-5 h-5');
            okBtn.className = `w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-colors ${styles.btn}`;

            const cleanup = result => {
                toggleModal('confirm-modal', false);
                okBtn.removeEventListener('click', onOk);
                cancelBtn.removeEventListener('click', onCancel);
                modal.removeEventListener('click', onBackdrop);
                document.removeEventListener('keydown', onKey);
                resolve(result);
            };
            const onOk = () => cleanup(true);
            const onCancel = () => cleanup(false);
            const onBackdrop = e => { if (e.target === modal) cleanup(false); };
            const onKey = e => { if (e.key === 'Escape') cleanup(false); };

            okBtn.addEventListener('click', onOk);
            cancelBtn.addEventListener('click', onCancel);
            modal.addEventListener('click', onBackdrop);
            document.addEventListener('keydown', onKey);
            toggleModal('confirm-modal', true);
        });
    }

    // ==========================================
    // 2. STATE & KONEKSI SUPABASE
    // ==========================================
    let kasConfig = { openingBalance: 0, minSaldo: 10000000, iuranWajib: 250000, limitTanpaApproval: 500000 };
    let dateFilter = { preset: 'semua', startDate: `${CURRENT_YEAR}-01-01`, endDate: TODAY_ISO };
    let txTypeFilter = 'all';
    let dueStatusFilter = 'all';
    let publicDueFilter = 'all';
    let publicDuesPeriod = CURRENT_MONTH;
    let duesPeriod = CURRENT_MONTH;
    let editingTxId = null;

    let transactions = [];
    let approvalQueue = [];
    let members = [];

    let authSession = null;
    let isAdmin = false;
    let publicSummary = null;
    let saveTimer = null;
    let isSaving = false;
    let cashflowChart = null;
    let categoryChart = null;

    window.addEventListener('beforeunload', e => { if (isSaving) { e.preventDefault(); e.returnValue = ''; } });

    const setStatus = msg => {
        if ($('connection-status')) $('connection-status').textContent = msg;
        if ($('portal-status')) $('portal-status').textContent = msg;
    };

    function setSession(session) {
        authSession = session;
        if (session) localStorage.setItem(AUTH_KEY, JSON.stringify(session));
        else localStorage.removeItem(AUTH_KEY);
    }

    async function sbFetch(path, { method = 'GET', token, body, prefer } = {}) {
        const res = await fetch(`${SUPABASE_URL}${path}`, {
            method,
            headers: {
                apikey: SUPABASE_ANON_KEY,
                Authorization: `Bearer ${token || SUPABASE_ANON_KEY}`,
                ...(body ? { 'Content-Type': 'application/json' } : {}),
                ...(prefer ? { Prefer: prefer } : {})
            },
            body: body ? JSON.stringify(body) : undefined
        });
        if (!res.ok) {
            const txt = await res.text();
            let msg = txt || `HTTP ${res.status}`;
            try { const p = JSON.parse(txt); msg = p.message || p.msg || p.error_description || msg; } catch {}
            throw new Error(msg);
        }
        if (res.status === 204) return null;
        const txt = await res.text();
        return txt ? JSON.parse(txt) : null;
    }

    async function getValidToken() {
        if (!authSession?.access_token) throw new Error('Sesi admin tidak ditemukan.');
        if (Number(authSession.expires_at || 0) <= Math.floor(Date.now() / 1000) + 60) {
            if (!authSession.refresh_token) throw new Error('Sesi berakhir, silakan masuk kembali.');
            const refreshed = await sbFetch('/auth/v1/token?grant_type=refresh_token', {
                method: 'POST',
                body: { refresh_token: authSession.refresh_token }
            });
            setSession({ ...refreshed, expires_at: Math.floor(Date.now() / 1000) + Number(refreshed.expires_in || 3600) });
        }
        return authSession.access_token;
    }

    function saveState() {
        if (!isAdmin) return;
        clearTimeout(saveTimer);
        isSaving = true;
        setStatus('Menyimpan ke Supabase...');
        saveTimer = setTimeout(async () => {
            try {
                const token = await getValidToken();
                await sbFetch('/rest/v1/kas_state?on_conflict=id', {
                    method: 'POST',
                    token,
                    prefer: 'resolution=merge-duplicates,return=minimal',
                    body: [{
                        id: 'main',
                        state: { transactions, approvalQueue, members, kasConfig, duesPeriod },
                        updated_at: new Date().toISOString()
                    }]
                });
                setStatus('Tersimpan di Supabase');
            } catch (err) {
                console.error(err);
                setStatus('Gagal menyimpan ke Supabase');
                notify('Gagal menyimpan ke Supabase. Periksa koneksi internet.', 'warning', 'Koneksi Terputus');
            } finally {
                isSaving = false;
            }
        }, 350);
    }

    async function verifyAdminAccess(token) {
        const res = await sbFetch('/rest/v1/rpc/is_kas_admin', { method: 'POST', token, body: {} });
        return res === true || res?.[0]?.is_kas_admin === true;
    }

    async function signInAdmin(rawLogin, password) {
        const clean = rawLogin.trim();
        const email = clean.includes('@') ? clean.toLowerCase() : `${clean.toLowerCase()}@teamonline.local`;
        const session = await sbFetch('/auth/v1/token?grant_type=password', { method: 'POST', body: { email, password } });
        setSession({ ...session, expires_at: Math.floor(Date.now() / 1000) + Number(session.expires_in || 3600) });
        const token = await getValidToken();
        try {
            if (!(await verifyAdminAccess(token))) {
                throw new Error('Akun ini belum memiliki akses admin.');
            }
            await loadAdminState();
        } catch (err) {
            setSession(null);
            isAdmin = false;
            throw err;
        }
        isAdmin = true;
        publicSummary = null;
        applyAccessMode();
        selectDatePreset('semua', false);
        renderAll();
        closePortal();
        setStatus('Admin tersambung • Supabase');
    }

    async function signOutAdmin() {
        clearTimeout(saveTimer);
        isSaving = false;
        const token = authSession?.access_token;
        setSession(null);
        isAdmin = false;
        if (token) sbFetch('/auth/v1/logout', { method: 'POST', token }).catch(() => {});
        openPortal(true);
        await loadPublicSummary();
        openPortal(false);
    }

    function normalizeMemberList(rawList) {
        if (!Array.isArray(rawList)) return [];
        return rawList.map(m => {
            const duesByPeriod = m.duesByPeriod && typeof m.duesByPeriod === 'object' ? { ...m.duesByPeriod } : {};
            if (!duesByPeriod[LEGACY_PERIOD] && typeof m.paid === 'boolean') {
                duesByPeriod[LEGACY_PERIOD] = { paid: m.paid, date: m.date && m.date !== '-' ? m.date : '', transactionId: '', legacy: true };
            }
            return { ...m, duesByPeriod };
        });
    }

    async function loadAdminState() {
        const token = await getValidToken();
        const rows = await sbFetch('/rest/v1/kas_state?select=state&id=eq.main', { token });
        const saved = rows?.[0]?.state;
        if (saved && typeof saved === 'object') {
            transactions = Array.isArray(saved.transactions) ? saved.transactions : [];
            approvalQueue = Array.isArray(saved.approvalQueue) ? saved.approvalQueue : [];
            members = normalizeMemberList(saved.members);
            kasConfig = {
                openingBalance: Number(saved.kasConfig?.openingBalance) || 0,
                minSaldo: Number(saved.kasConfig?.minSaldo) ?? 10000000,
                iuranWajib: Number(saved.kasConfig?.iuranWajib) || 250000,
                limitTanpaApproval: Number(saved.kasConfig?.limitTanpaApproval) ?? 500000
            };
            duesPeriod = /^\d{4}-(0[1-9]|1[0-2])$/.test(saved.duesPeriod) ? saved.duesPeriod : CURRENT_MONTH;
        } else {
            transactions = []; approvalQueue = []; members = [];
            kasConfig = { openingBalance: 0, minSaldo: 10000000, iuranWajib: 250000, limitTanpaApproval: 500000 };
            duesPeriod = CURRENT_MONTH;
            await sbFetch('/rest/v1/kas_state?on_conflict=id', {
                method: 'POST', token, prefer: 'resolution=merge-duplicates,return=minimal',
                body: [{ id: 'main', state: { transactions, approvalQueue, members, kasConfig, duesPeriod }, updated_at: new Date().toISOString() }]
            });
        }
        syncSettingsInputs();
        syncMemberDatalist();
        if ($('dues-period')) $('dues-period').value = duesPeriod;
    }

    async function loadPublicSummary() {
        isAdmin = false;
        setStatus('Memuat ringkasan kas...');
        try {
            publicSummary = await sbFetch('/rest/v1/rpc/get_public_kas_summary', { method: 'POST', body: {} });
            publicDuesPeriod = /^\d{4}-(0[1-9]|1[0-2])$/.test(publicSummary?.duesPeriod)
                ? publicSummary.duesPeriod
                : CURRENT_MONTH;
            setStatus('Tersambung • Mode Tamu');
        } catch (err) {
            console.error(err);
            publicSummary = { balance: 0, income: 0, expenses: 0, minSaldo: kasConfig.minSaldo, iuranWajib: kasConfig.iuranWajib, duesPeriod: CURRENT_MONTH, transactionsCount: 0, incomeCount: 0, expenseCount: 0, months: [], categories: [], members: [] };
            publicDuesPeriod = CURRENT_MONTH;
            setStatus('Database belum siap');
            notify('Database Supabase belum siap. Jalankan SQL setup terlebih dahulu.', 'warning', 'Setup Database');
        }
        applyAccessMode();
        renderAll();
    }

    async function initSupabase() {
        openPortal(true);
        const raw = localStorage.getItem(AUTH_KEY);
        if (raw) {
            try {
                authSession = JSON.parse(raw);
                const token = await getValidToken();
                if (await verifyAdminAccess(token)) {
                    await loadAdminState();
                    isAdmin = true;
                    applyAccessMode();
                    selectDatePreset('semua', false);
                    renderAll();
                    closePortal();
                    setStatus('Admin tersambung • Supabase');
                    return;
                }
            } catch {}
            setSession(null);
        }
        await loadPublicSummary();
        openPortal(false);
    }

    // ==========================================
    // 3. FILTER TANGGAL, KPI & GRAFIK (UNIFIED)
    // ==========================================
    const getFilteredTx = () => transactions
        .filter(t => (!dateFilter.startDate || t.date >= dateFilter.startDate) && (!dateFilter.endDate || t.date <= dateFilter.endDate))
        .sort((a, b) => b.date.localeCompare(a.date));

    function updatePresetButtonsUI() {
        const prev = new Date(CURRENT_YEAR, now.getMonth() - 1, 1);
        const labels = {
            'bulan-ini': `Bulan Ini (${MONTHS_SHORT[now.getMonth()]} ${CURRENT_YEAR})`,
            'bulan-lalu': `Bulan Lalu (${MONTHS_SHORT[prev.getMonth()]} ${prev.getFullYear()})`,
            'tahun-ini': `Tahun ${CURRENT_YEAR}`
        };
        $$('.preset-btn').forEach(btn => {
            if (labels[btn.dataset.preset]) btn.textContent = labels[btn.dataset.preset];
            const active = btn.dataset.preset === dateFilter.preset;
            btn.className = active
                ? 'preset-btn px-3 py-2 sm:py-1.5 rounded-xl text-xs font-semibold bg-brand-600 text-white shadow-sm text-center'
                : 'preset-btn px-3 py-2 sm:py-1.5 rounded-xl text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200/70 text-center';
        });

        const s = formatDateID(dateFilter.startDate), e = formatDateID(dateFilter.endDate);
        if ($('active-range-badge')) $('active-range-badge').textContent = dateFilter.preset === 'semua' ? `Semua Waktu (${s} – ${e})` : `${s} – ${e}`;
        if ($('sidebar-period-label') && isAdmin) $('sidebar-period-label').textContent = `Rentang: ${s} – ${e}`;
    }

    function selectDatePreset(preset, shouldRender = true) {
        dateFilter.preset = preset;
        const monthRange = ym => {
            const [y, m] = ym.split('-').map(Number);
            return { startDate: `${y}-${String(m).padStart(2, '0')}-01`, endDate: `${y}-${String(m).padStart(2, '0')}-${String(new Date(y, m, 0).getDate()).padStart(2, '0')}` };
        };
        if (preset === 'bulan-ini') Object.assign(dateFilter, monthRange(CURRENT_MONTH));
        else if (preset === 'bulan-lalu') {
            const p = new Date(CURRENT_YEAR, now.getMonth() - 1, 1);
            Object.assign(dateFilter, monthRange(`${p.getFullYear()}-${String(p.getMonth() + 1).padStart(2, '0')}`));
        } else if (preset === 'tahun-ini') {
            dateFilter.startDate = `${CURRENT_YEAR}-01-01`; dateFilter.endDate = `${CURRENT_YEAR}-12-31`;
        } else if (preset === 'semua') {
            const dates = transactions.map(t => t.date).filter(Boolean).sort();
            dateFilter.startDate = dates[0] || `${CURRENT_YEAR}-01-01`;
            dateFilter.endDate = dates[dates.length - 1] || TODAY_ISO;
        }
        if ($('filter-start-date')) $('filter-start-date').value = dateFilter.startDate;
        if ($('filter-end-date')) $('filter-end-date').value = dateFilter.endDate;
        updatePresetButtonsUI();
        if (shouldRender) renderAll();
    }

    function buildSummaryData() {
        if (!isAdmin && publicSummary) {
            return {
                balance: Number(publicSummary.balance) || 0,
                income: Number(publicSummary.income) || 0,
                expenses: Number(publicSummary.expenses) || 0,
                minSaldo: Number(publicSummary.minSaldo) || 0,
                txCount: Number(publicSummary.transactionsCount) || 0,
                incomeCount: Number(publicSummary.incomeCount) || 0,
                expenseCount: Number(publicSummary.expenseCount) || 0,
                months: Array.isArray(publicSummary.months) ? publicSummary.months : [],
                categories: Array.isArray(publicSummary.categories) ? publicSummary.categories : [],
                chartSubtitle: 'Ringkasan kas per bulan (12 bulan terakhir)'
            };
        }

        const periodTxs = getFilteredTx();
        const masukTxs = periodTxs.filter(t => t.type === 'masuk');
        const keluarTxs = periodTxs.filter(t => t.type === 'keluar');
        const income = masukTxs.reduce((s, t) => s + t.amount, 0);
        const expenses = keluarTxs.reduce((s, t) => s + t.amount, 0);

        const cumTxs = transactions.filter(t => !dateFilter.endDate || t.date <= dateFilter.endDate);
        const balance = kasConfig.openingBalance +
            cumTxs.filter(t => t.type === 'masuk').reduce((s, t) => s + t.amount, 0) -
            cumTxs.filter(t => t.type === 'keluar').reduce((s, t) => s + t.amount, 0);

        const [sY, sM] = (dateFilter.startDate || `${CURRENT_YEAR}-01-01`).split('-').map(Number);
        const [eY, eM] = (dateFilter.endDate || TODAY_ISO).split('-').map(Number);
        const months = [];
        for (let y = sY, m = sM, g = 0; (y < eY || (y === eY && m <= eM)) && g < 48; g++) {
            const ym = `${y}-${String(m).padStart(2, '0')}`;
            months.push({
                month: ym,
                income: masukTxs.filter(t => t.date.startsWith(ym)).reduce((s, t) => s + t.amount, 0),
                expenses: keluarTxs.filter(t => t.date.startsWith(ym)).reduce((s, t) => s + t.amount, 0)
            });
            if (++m > 12) { m = 1; y++; }
        }

        const catMap = new Map();
        keluarTxs.forEach(t => catMap.set(t.category || 'Lain-lain', (catMap.get(t.category || 'Lain-lain') || 0) + t.amount));
        const categories = Array.from(catMap.entries()).sort((a, b) => b[1] - a[1]).map(([category, amount]) => ({ category, amount }));

        return {
            balance, income, expenses, minSaldo: kasConfig.minSaldo,
            txCount: periodTxs.length, incomeCount: masukTxs.length, expenseCount: keluarTxs.length,
            months, categories,
            chartSubtitle: `Mutasi bulanan (${formatDateID(dateFilter.startDate)} – ${formatDateID(dateFilter.endDate)})`
        };
    }

    function renderKPIsAndCharts() {
        const d = buildSummaryData();
        const net = d.income - d.expenses;
        const pos = net >= 0;
        const safe = d.balance >= d.minSaldo;

        $('kpi-saldo').textContent = `${d.balance < 0 ? '- ' : ''}${formatRp(d.balance)}`;
        $('kpi-masuk').textContent = formatRp(d.income);
        $('kpi-keluar').textContent = formatRp(d.expenses);
        $('kpi-masuk-count').textContent = `${d.incomeCount} masuk`;
        $('kpi-keluar-count').textContent = `${d.expenseCount} keluar`;
        $('active-range-count').textContent = `${d.txCount} transaksi`;
        $('kpi-min-label').textContent = formatRp(d.minSaldo);

        $('kpi-saldo-status').className = `inline-flex items-center self-start gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold border ${safe ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70' : 'bg-rose-50 text-rose-700 border-rose-200/80'}`;
        $('kpi-saldo-status').innerHTML = `${icon(safe ? 'shield-check' : 'alert-triangle', 'w-3 h-3')} <span>${safe ? 'Aman' : 'Di Bawah Min'}</span>`;

        $('kpi-net').textContent = `${pos ? '+' : '-'} ${formatRp(net)}`;
        $('kpi-net').className = `text-[15px] sm:text-2xl font-extrabold tabular-nums ${pos ? 'text-emerald-600' : 'text-rose-600'} mt-1.5 truncate`;
        $('kpi-net-badge').textContent = pos ? 'Surplus' : 'Defisit';
        $('kpi-net-badge').className = `inline-flex items-center self-start px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold border ${pos ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70' : 'bg-rose-50 text-rose-700 border-rose-200/70'}`;
        $('kpi-net-icon-box').className = `w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl ${pos ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'} flex items-center justify-center shrink-0`;
        $('kpi-net-icon-box').innerHTML = icon(pos ? 'trending-up' : 'trending-down', 'w-4 h-4 sm:w-5 sm:h-5');

        if (isAdmin) {
            const paid = members.filter(m => getDueRecord(m).paid).length;
            $('kpi-iuran-mini').textContent = `${paid}/${members.length}`;
            $('widget-iuran-nominal').textContent = formatRp(kasConfig.iuranWajib);
            $('badge-iuran-count').textContent = `${paid}/${members.length}`;
            $('badge-tx-count').textContent = String(transactions.length);
            $('approval-limit-badge').textContent = formatRp(kasConfig.limitTanpaApproval);
        }

        if (typeof Chart === 'undefined') return;
        $('chart-cashflow-subtitle').textContent = d.chartSubtitle;

        if (cashflowChart) cashflowChart.destroy();
        cashflowChart = new Chart($('cashflowChart').getContext('2d'), {
            type: 'bar',
            data: {
                labels: d.months.map(m => { const [y, mo] = m.month.split('-').map(Number); return `${MONTHS_SHORT[mo - 1]} ${String(y).slice(2)}`; }),
                datasets: [
                    { label: 'Kas Masuk', data: d.months.map(m => Number(m.income) || 0), backgroundColor: '#10b981', borderRadius: 5, barPercentage: 0.72 },
                    { label: 'Kas Keluar', data: d.months.map(m => Number(m.expenses) || 0), backgroundColor: '#f43f5e', borderRadius: 5, barPercentage: 0.72 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false, animation: { duration: 250 },
                plugins: { legend: { display: false }, tooltip: { backgroundColor: '#0f172a', callbacks: { label: ctx => `${ctx.dataset.label}: ${formatRp(ctx.raw)}` } } },
                scales: {
                    x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 10 }, color: '#64748b' } },
                    y: { border: { display: false }, grid: { color: '#f1f5f9' }, ticks: { font: { family: 'Inter', size: 10 }, color: '#64748b', callback: v => `Rp ${(v / 1000000).toFixed(v % 1000000 ? 1 : 0)} Jt` } }
                }
            }
        });

        const cats = d.categories.length ? d.categories : [{ category: 'Belum ada pengeluaran', amount: 0 }];
        if (categoryChart) categoryChart.destroy();
        categoryChart = new Chart($('categoryChart').getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: cats.map(c => c.category),
                datasets: [{ data: cats.map(c => Number(c.amount) || 0), backgroundColor: cats.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]), borderWidth: 0 }]
            },
            options: {
                responsive: true, maintainAspectRatio: false, animation: { duration: 250 }, cutout: '72%',
                plugins: { legend: { display: false }, tooltip: { backgroundColor: '#0f172a', callbacks: { label: ctx => ` ${ctx.label}: ${formatRp(ctx.raw)}` } } }
            }
        });

        const totalExp = d.categories.reduce((s, c) => s + (Number(c.amount) || 0), 0);
        $('category-legend').innerHTML = d.categories.length
            ? d.categories.map((c, i) => `
                <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2 min-w-0">
                        <span class="w-2.5 h-2.5 rounded-full shrink-0" style="background:${CHART_COLORS[i % CHART_COLORS.length]}"></span>
                        <span class="text-slate-600 font-medium truncate">${esc(c.category)}</span>
                    </div>
                    <div class="flex items-center gap-2 shrink-0">
                        <span class="font-semibold text-slate-800">${formatRp(c.amount)}</span>
                        <span class="text-slate-400 w-8 text-right">${totalExp > 0 ? Math.round((c.amount / totalExp) * 100) : 0}%</span>
                    </div>
                </div>`).join('')
            : '<p class="text-center text-slate-400">Belum ada pengeluaran pada periode ini.</p>';
    }

    // ==========================================
    // 4. RIWAYAT PEMBAYARAN IURAN WAJIB (MODE TAMU)
    // ==========================================
    function renderPublicDues() {
        const listEl = $('public-dues-list');
        if (!listEl) return;

        const periodInput = $('public-dues-period');
        if (periodInput && periodInput.value !== publicDuesPeriod) periodInput.value = publicDuesPeriod;

        const [y, mo] = publicDuesPeriod.split('-').map(Number);
        const periodTitle = new Date(y, mo - 1, 1).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
        const iuranAmt = Number(publicSummary?.iuranWajib) || kasConfig.iuranWajib;

        if ($('public-iuran-nominal')) $('public-iuran-nominal').textContent = formatRp(iuranAmt);
        if ($('public-iuran-period-label')) $('public-iuran-period-label').textContent = periodTitle;

        const pubMembers = normalizeMemberList(publicSummary?.members);
        const getPubDue = m => m.duesByPeriod?.[publicDuesPeriod] || { paid: false, date: '' };

        const paidMembers = pubMembers.filter(m => getPubDue(m).paid);
        const unpaidMembers = pubMembers.filter(m => !getPubDue(m).paid);
        const pct = pubMembers.length ? Math.round((paidMembers.length / pubMembers.length) * 100) : 0;

        if ($('public-iuran-progress-text')) {
            $('public-iuran-progress-text').textContent = pubMembers.length
                ? `${paidMembers.length} dari ${pubMembers.length} anggota sudah bayar (${pct}%)`
                : 'Belum ada data anggota terdaftar';
        }
        if ($('public-iuran-progress-bar')) $('public-iuran-progress-bar').style.width = `${pct}%`;

        // Update label jumlah pada tombol filter Mode Tamu
        $$('#public-due-filter-group [data-action="filter-public-dues"]').forEach(btn => {
            const mode = btn.dataset.mode;
            const labelMap = {
                all: `Semua (${pubMembers.length})`,
                paid: `Sudah Bayar (${paidMembers.length})`,
                unpaid: `Belum Bayar (${unpaidMembers.length})`
            };
            btn.textContent = labelMap[mode] || btn.textContent;
            const active = mode === publicDueFilter;
            btn.className = active
                ? 'pub-due-btn px-2.5 py-1.5 sm:py-1 rounded-lg bg-white text-slate-900 shadow-sm font-semibold'
                : 'pub-due-btn px-2.5 py-1.5 sm:py-1 rounded-lg text-slate-500 hover:text-slate-800';
        });

        const bannerEl = $('public-unpaid-banner');
        if (bannerEl) {
            bannerEl.classList.toggle('hidden', pubMembers.length === 0 || unpaidMembers.length === 0);
        }

        // Urutkan yang sudah bayar di atas agar terlihat jelas daftar lunas, diikuti yang belum bayar
        const sortedMembers = [...paidMembers, ...unpaidMembers];
        const shown = publicDueFilter === 'paid'
            ? paidMembers
            : publicDueFilter === 'unpaid'
                ? unpaidMembers
                : sortedMembers;

        if (pubMembers.length === 0) {
            listEl.innerHTML = `<div class="col-span-full py-8 text-center text-xs text-slate-500">Daftar anggota iuran belum tersedia atau database belum diperbarui.</div>`;
            return;
        }

        if (shown.length === 0) {
            listEl.innerHTML = `<div class="col-span-full py-8 text-center text-xs text-slate-500">${publicDueFilter === 'paid' ? 'Belum ada anggota yang tercatat lunas pada periode ini.' : 'Semua anggota sudah melunasi iuran wajib pada periode ini!'}</div>`;
            return;
        }

        listEl.innerHTML = shown.map(m => {
            const due = getPubDue(m);
            const initials = m.name.split(' ').map(x => x[0] || '').join('').slice(0, 2).toUpperCase();
            return `
            <div class="flex items-center justify-between gap-3 p-3.5 rounded-xl border transition-colors ${due.paid ? 'border-emerald-200/70 bg-emerald-50/30' : 'border-slate-200/80 bg-slate-50/50'}">
                <div class="flex items-center gap-3 min-w-0">
                    <div class="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${due.paid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">${esc(initials)}</div>
                    <div class="min-w-0">
                        <p class="text-xs sm:text-sm font-bold text-slate-800 truncate">${esc(m.name)}</p>
                        <p class="text-[11px] text-slate-500 truncate">${esc(m.role || 'Anggota Tim')}</p>
                    </div>
                </div>
                <div class="text-right shrink-0">
                    ${due.paid
                        ? `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                            ${icon('check-circle-2', 'w-3.5 h-3.5')}
                            <span>Sudah Bayar</span>
                           </span>
                           ${due.date ? `<p class="text-[10px] text-slate-400 mt-1">Tgl: ${esc(due.date)}</p>` : ''}`
                        : `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/80">
                            ${icon('clock', 'w-3.5 h-3.5')}
                            <span>Belum Bayar</span>
                           </span>
                           <p class="text-[10px] text-slate-400 mt-1">${formatRp(iuranAmt)}</p>`
                    }
                </div>
            </div>`;
        }).join('');
    }

    // ==========================================
    // 5. PERSETUJUAN DANA & IURAN ANGGOTA (ADMIN)
    // ==========================================
    function renderApprovals() {
        $('pill-approval-count').textContent = `${approvalQueue.length} Menunggu`;
        $('badge-approval-count').textContent = String(approvalQueue.length);
        $('badge-approval-count').classList.toggle('hidden', approvalQueue.length === 0);

        $('approval-list').innerHTML = approvalQueue.length === 0
            ? `<div class="py-8 text-center"><div class="w-11 h-11 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-2.5">${icon('check-check', 'w-5 h-5')}</div><p class="text-sm font-semibold text-slate-800">Tidak Ada Antrean Persetujuan</p><p class="text-xs text-slate-400 mt-1">Semua pengajuan dana sudah dikonfirmasi.</p></div>`
            : approvalQueue.map(item => `
                <div class="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div class="min-w-0 space-y-1">
                        <div class="flex items-center gap-2">
                            <span class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-200/70 text-slate-700">${esc(item.category)}</span>
                            <span class="text-[11px] text-slate-400">${formatDateID(item.date)}</span>
                        </div>
                        <h4 class="text-sm font-bold text-slate-800 truncate">${esc(item.title)}</h4>
                        <p class="text-xs text-slate-500 truncate">Oleh <strong class="text-slate-700">${esc(item.requester)}</strong> • ${esc(item.role)}</p>
                    </div>
                    <div class="flex sm:flex-col items-center sm:items-end justify-between gap-2 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 shrink-0">
                        <span class="text-sm font-bold text-rose-600">${formatRp(item.amount)}</span>
                        <div class="flex items-center gap-1.5">
                            <button type="button" data-action="reject-approval" data-id="${esc(item.id)}" class="px-3 py-1.5 sm:py-1 rounded-lg text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200/70">Tolak</button>
                            <button type="button" data-action="approve-approval" data-id="${esc(item.id)}" class="px-3 py-1.5 sm:py-1 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700">Setujui</button>
                        </div>
                    </div>
                </div>`).join('');
    }

    function processApproval(id, action) {
        if (!isAdmin) return notify('Silakan masuk sebagai Admin terlebih dahulu.', 'warning', 'Akses Terbatas');
        const idx = approvalQueue.findIndex(a => a.id === id);
        if (idx === -1) return;
        const [req] = approvalQueue.splice(idx, 1);
        if (action === 'approve') {
            transactions.unshift({ id: createUniqueId('TX', transactions), date: req.date || TODAY_ISO, title: req.title, category: req.category, pic: req.requester, type: 'keluar', amount: req.amount, status: 'Disetujui' });
            notify(`Pengajuan "${req.title}" disetujui (${formatRp(req.amount)}).`, 'success', 'Dana Disetujui');
        } else {
            notify(`Pengajuan "${req.title}" ditolak.`, 'danger', 'Pengajuan Ditolak');
        }
        commitChanges();
    }

    const getDueRecord = m => m.duesByPeriod?.[duesPeriod] || { paid: false, date: '', transactionId: '' };

    function renderDues() {
        if ($('dues-period') && $('dues-period').value !== duesPeriod) $('dues-period').value = duesPeriod;
        const [y, mo] = duesPeriod.split('-').map(Number);
        $('widget-iuran-period').textContent = new Date(y, mo - 1, 1).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

        const paid = members.filter(m => getDueRecord(m).paid).length;
        const pct = members.length ? Math.round((paid / members.length) * 100) : 0;
        $('iuran-progress-text').textContent = members.length ? `${paid} dari ${members.length} (${pct}%)` : 'Belum ada anggota';
        $('iuran-progress-bar').style.width = `${pct}%`;

        const shown = dueStatusFilter === 'unpaid' ? members.filter(m => !getDueRecord(m).paid) : members;
        $('dues-list').innerHTML = shown.length === 0
            ? `<div class="py-8 text-center text-xs text-slate-500">${members.length ? 'Semua anggota sudah melunasi iuran periode ini.' : 'Tambahkan anggota untuk mulai mencatat iuran.'}</div>`
            : shown.map(m => {
                const due = getDueRecord(m);
                const initials = m.name.split(' ').map(x => x[0] || '').join('').slice(0, 2).toUpperCase();
                return `
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/40 hover:bg-white">
                    <div class="flex items-center gap-2.5 min-w-0">
                        <div class="w-8 h-8 rounded-full ${due.paid ? 'bg-brand-100 text-brand-700' : 'bg-slate-200 text-slate-600'} flex items-center justify-center text-xs font-bold shrink-0">${esc(initials)}</div>
                        <div class="min-w-0">
                            <p class="text-xs sm:text-sm font-semibold text-slate-800 truncate">${esc(m.name)}</p>
                            <p class="text-[11px] text-slate-400 truncate">${esc(m.role)}</p>
                        </div>
                    </div>
                    <div class="flex items-center justify-between sm:justify-end gap-1.5 shrink-0 pl-10 sm:pl-0">
                        <button type="button" data-action="toggle-due" data-id="${m.id}" class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 px-2.5 py-1.5 sm:py-1 rounded-full text-xs font-semibold border transition-colors ${due.paid ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70 hover:bg-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-200/80 hover:bg-emerald-600 hover:text-white hover:border-emerald-600'}">
                            ${icon(due.paid ? 'check-circle-2' : 'clock', 'w-3.5 h-3.5')}
                            <span>${due.paid ? `Lunas${due.date ? ` (${esc(due.date)})` : ''}` : `Catat ${formatRp(kasConfig.iuranWajib)}`}</span>
                        </button>
                        <button type="button" data-action="delete-member" data-id="${m.id}" class="p-2 sm:p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 shrink-0" title="Hapus Anggota">${icon('trash-2', 'w-3.5 h-3.5')}</button>
                    </div>
                </div>`;
            }).join('');
    }

    function toggleDue(memberId) {
        if (!isAdmin) return notify('Silakan masuk sebagai Admin terlebih dahulu.', 'warning', 'Akses Terbatas');
        const m = members.find(x => x.id === Number(memberId));
        if (!m) return;
        const prev = getDueRecord(m);
        if (!m.duesByPeriod) m.duesByPeriod = {};

        if (prev.paid) {
            if (prev.transactionId) transactions = transactions.filter(t => t.id !== prev.transactionId);
            m.duesByPeriod[duesPeriod] = { paid: false, date: '', transactionId: '' };
            notify(`Pencatatan iuran ${m.name} dibatalkan.`, 'info', 'Iuran Dibatalkan');
        } else {
            const txId = createUniqueId('TX', transactions);
            transactions.unshift({ id: txId, date: TODAY_ISO, title: `Iuran Wajib ${duesPeriod} — ${m.name}`, category: 'Iuran Anggota', pic: m.name, type: 'masuk', amount: kasConfig.iuranWajib, status: 'Disetujui', duesMemberId: m.id, duesPeriod });
            m.duesByPeriod[duesPeriod] = { paid: true, date: formatDateID(TODAY_ISO), transactionId: txId };
            notify(`Iuran ${m.name} (${formatRp(kasConfig.iuranWajib)}) ditandai LUNAS!`, 'success', 'Iuran Lunas');
        }
        commitChanges();
    }

    function syncMemberDatalist() {
        if ($('member-pic-list')) {
            $('member-pic-list').innerHTML = members.map(m => `<option value="${esc(m.name)}">${esc(m.role || 'Anggota Tim')}</option>`).join('');
        }
    }

    // ==========================================
    // 6. RIWAYAT TRANSAKSI (MOBILE CARD & TABEL DESKTOP)
    // ==========================================
    function renderTransactions() {
        const q = ($('tx-search')?.value || '').toLowerCase().trim();
        const list = getFilteredTx().filter(t =>
            (txTypeFilter === 'all' || t.type === txTypeFilter) &&
            (!q || [t.title, t.pic, t.category, t.id].some(v => String(v).toLowerCase().includes(q)))
        );

        $('tx-empty').classList.toggle('hidden', list.length > 0);

        if ($('tx-mobile-list')) {
            $('tx-mobile-list').innerHTML = list.map(t => {
                const isMasuk = t.type === 'masuk';
                return `
                <div class="p-4 space-y-2.5 hover:bg-slate-50/70">
                    <div class="flex items-start justify-between gap-2.5">
                        <div class="min-w-0">
                            <div class="flex flex-wrap items-center gap-1.5 mb-1">
                                <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600">${esc(t.category)}</span>
                                <span class="text-[11px] text-slate-400 font-medium">${formatDateID(t.date)}</span>
                            </div>
                            <p class="font-bold text-slate-800 text-sm leading-snug break-words">${esc(t.title)}</p>
                        </div>
                        <span class="font-extrabold text-sm tabular-nums whitespace-nowrap shrink-0 ${isMasuk ? 'text-emerald-600' : 'text-rose-600'}">${isMasuk ? '+' : '-'} ${formatRp(t.amount)}</span>
                    </div>
                    <div class="flex items-center justify-between gap-2 pt-1">
                        <div class="flex items-center gap-2 min-w-0 text-xs text-slate-500">
                            <span class="truncate font-medium text-slate-700">${esc(t.pic)}</span>
                            <span>•</span>
                            <span class="font-mono text-[11px] text-slate-400 shrink-0">${esc(t.id)}</span>
                        </div>
                        <div class="flex items-center gap-1 shrink-0">
                            <button type="button" data-action="edit-tx" data-id="${esc(t.id)}" class="p-2 rounded-lg text-slate-500 hover:text-brand-600 bg-slate-100/80 hover:bg-brand-50" title="Edit">${icon('pencil', 'w-3.5 h-3.5')}</button>
                            <button type="button" data-action="delete-tx" data-id="${esc(t.id)}" class="p-2 rounded-lg text-slate-500 hover:text-rose-600 bg-slate-100/80 hover:bg-rose-50" title="Hapus">${icon('trash-2', 'w-3.5 h-3.5')}</button>
                        </div>
                    </div>
                </div>`;
            }).join('');
        }

        $('tx-tbody').innerHTML = list.map(t => {
            const isMasuk = t.type === 'masuk';
            return `
            <tr class="hover:bg-slate-50/90">
                <td class="py-3.5 px-5 text-xs text-slate-600 whitespace-nowrap font-semibold">${formatDateID(t.date)}</td>
                <td class="py-3.5 px-5 max-w-xs"><p class="font-semibold text-slate-800 text-xs sm:text-sm truncate">${esc(t.title)}</p><span class="text-[11px] text-slate-400 font-mono">${esc(t.id)}</span></td>
                <td class="py-3.5 px-5 whitespace-nowrap"><span class="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-600">${esc(t.category)}</span></td>
                <td class="py-3.5 px-5 text-xs sm:text-sm text-slate-700 whitespace-nowrap">${esc(t.pic)}</td>
                <td class="py-3.5 px-5 whitespace-nowrap"><span class="px-2.5 py-0.5 rounded-full text-xs font-semibold border ${isMasuk ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70' : 'bg-rose-50 text-rose-700 border-rose-200/70'}">${isMasuk ? 'Pemasukan' : 'Pengeluaran'}</span></td>
                <td class="py-3.5 px-5 text-right font-bold text-xs sm:text-sm whitespace-nowrap ${isMasuk ? 'text-emerald-600' : 'text-rose-600'}">${isMasuk ? '+' : '-'} ${formatRp(t.amount)}</td>
                <td class="py-3.5 px-5 text-center whitespace-nowrap"><span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>${esc(t.status)}</span></td>
                <td class="py-3.5 px-4 text-center whitespace-nowrap">
                    <button type="button" data-action="edit-tx" data-id="${esc(t.id)}" class="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50" title="Edit">${icon('pencil')}</button>
                    <button type="button" data-action="delete-tx" data-id="${esc(t.id)}" class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50" title="Hapus">${icon('trash-2')}</button>
                </td>
            </tr>`;
        }).join('');
    }

    function syncModalCategories() {
        const type = document.querySelector('input[name="txType"]:checked')?.value || 'masuk';
        $('m-limit-val').textContent = formatRp(kasConfig.limitTanpaApproval);
        const opts = type === 'masuk'
            ? ['Iuran Anggota', 'Sponsor/Project', 'Lain-lain']
            : ['Operasional Server', 'Konsumsi Rapat', 'Perlengkapan Tim', 'Lain-lain'];
        $('m-category').innerHTML = opts.map(o => `<option value="${o}">${o}</option>`).join('');
        $('m-limit-hint').classList.toggle('hidden', type === 'masuk' || Boolean(editingTxId));
    }

    function openTxModal(tx = null) {
        if (!isAdmin) return notify('Silakan masuk sebagai Admin untuk mencatat transaksi.', 'warning', 'Akses Terbatas');
        editingTxId = tx ? tx.id : null;
        $('tx-modal-title').textContent = tx ? `Edit Transaksi (${tx.id})` : 'Catat Transaksi Kas';
        $('tx-modal-subtitle').textContent = tx ? 'Perbarui rincian transaksi tercatat' : 'Input pemasukan atau pengeluaran tim';
        $('btn-save-add-another').classList.toggle('hidden', Boolean(tx));
        $('btn-submit-tx-modal').textContent = tx ? 'Simpan Perubahan' : 'Simpan Transaksi';

        const radio = document.querySelector(`input[name="txType"][value="${tx ? tx.type : 'masuk'}"]`);
        if (radio) radio.checked = true;
        syncMemberDatalist();
        syncModalCategories();

        if (tx) {
            if (!Array.from($('m-category').options).some(o => o.value === tx.category)) {
                $('m-category').add(new Option(tx.category, tx.category));
            }
            $('m-category').value = tx.category;
            $('m-date').value = tx.date;
            $('m-amount').value = formatThousand(tx.amount);
            $('m-title').value = tx.title;
            $('m-pic').value = tx.pic;
        } else {
            $('m-date').value = TODAY_ISO;
        }
        toggleModal('tx-modal', true);
    }

    function closeTxModal() {
        editingTxId = null;
        toggleModal('tx-modal', false);
        $('tx-form')?.reset();
        $('m-limit-hint')?.classList.add('hidden');
    }

    function handleSaveTx(keepOpen) {
        if (!isAdmin) return notify('Silakan masuk sebagai Admin terlebih dahulu.', 'warning', 'Akses Terbatas');
        if (!$('tx-form').checkValidity()) return $('tx-form').reportValidity();
        const type = document.querySelector('input[name="txType"]:checked')?.value || 'masuk';
        const title = $('m-title').value.trim();
        const amount = parseCurrency($('m-amount').value);
        const date = $('m-date').value;
        const category = $('m-category').value || 'Lain-lain';
        const pic = $('m-pic').value.trim() || 'Anggota Tim';

        if (!title || amount <= 0 || !date) return notify('Lengkapi tanggal, keterangan, dan nominal yang valid.', 'warning', 'Data Belum Lengkap');

        if (editingTxId) {
            const target = transactions.find(t => t.id === editingTxId);
            if (target) Object.assign(target, { type, date, category, amount, title, pic });
            closeTxModal();
            commitChanges();
            return notify(`Perubahan transaksi "${title}" disimpan.`, 'success', 'Perubahan Disimpan');
        }

        if (date >= TODAY_ISO && type === 'keluar' && amount > kasConfig.limitTanpaApproval) {
            approvalQueue.unshift({ id: createUniqueId('REQ', approvalQueue), title, requester: pic, role: 'Anggota TEAM ONLINE', date, category, amount });
            if (keepOpen) { $('m-title').value = ''; $('m-amount').value = ''; $('m-title').focus(); }
            else closeTxModal();
            commitChanges();
            return notify(`Melebihi batas ${formatRp(kasConfig.limitTanpaApproval)}. Masuk ke antrean Persetujuan.`, 'warning', 'Butuh Persetujuan');
        }

        transactions.unshift({ id: createUniqueId('TX', transactions), date, title, category, pic, type, amount, status: 'Disetujui' });
        if (dateFilter.startDate && date < dateFilter.startDate) { dateFilter.startDate = date; dateFilter.preset = 'custom'; $('filter-start-date').value = date; }
        if (dateFilter.endDate && date > dateFilter.endDate) { dateFilter.endDate = date; dateFilter.preset = 'custom'; $('filter-end-date').value = date; }

        updatePresetButtonsUI();
        commitChanges();

        if (keepOpen) {
            $('m-title').value = ''; $('m-amount').value = ''; $('m-title').focus();
            notify(`Tersimpan (${formatDateID(date)})! Lanjut input berikutnya.`, 'success', 'Transaksi Tercatat');
        } else {
            closeTxModal();
            notify(`Transaksi "${title}" berhasil dicatat!`, 'success', 'Transaksi Tercatat');
        }
    }

    // ==========================================
    // 7. NAVIGASI, EKSPOR EXCEL (.XLSX) & BACKUP JSON
    // ==========================================
    function applyAccessMode() {
        const adminActions = $('admin-header-actions');
        if (adminActions) {
            adminActions.className = isAdmin
                ? 'grid grid-cols-3 sm:flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto'
                : 'hidden';
        }

        const guestActions = $('guest-header-actions');
        if (guestActions) {
            guestActions.className = isAdmin ? 'hidden' : 'flex items-center gap-1.5 shrink-0';
        }

        $('view-public-dues')?.classList.toggle('hidden', isAdmin);

        ['view-filter-bar', 'view-pengaturan', 'view-transaksi', 'sidebar-config-group', 'kpi-iuran-wrap']
            .forEach(id => $(id)?.classList.toggle('hidden', !isAdmin));

        const settingsLink = $('btn-kpi-goto-settings');
        if (settingsLink) {
            settingsLink.className = isAdmin
                ? 'text-left sm:text-right text-[10px] sm:text-[11px] font-semibold text-brand-600 hover:underline truncate'
                : 'text-left sm:text-right text-[10px] sm:text-[11px] font-semibold text-slate-500 cursor-default truncate';
        }

        $$('#sidebar-nav [data-tab]').forEach(btn => {
            btn.classList.toggle('hidden', !isAdmin && btn.dataset.tab !== 'ringkasan');
        });

        switchTab('ringkasan');
        if (!isAdmin) {
            $('header-subtitle').textContent = 'Ringkasan saldo kas, grafik arus kas & status pembayaran iuran wajib anggota.';
            $('sidebar-period-label').textContent = 'Mode Ringkasan Publik';
        }
    }

    function switchTab(tab) {
        if (!isAdmin) tab = 'ringkasan';
        $$('.nav-item').forEach(btn => {
            const active = btn.dataset.tab === tab;
            const hidden = !isAdmin && btn.dataset.tab !== 'ringkasan';
            btn.className = `nav-item w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${active ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}${hidden ? ' hidden' : ''}`;
        });

        const views = {
            ringkasan: ['Ringkasan Kas — TEAM ONLINE', 'Pantau saldo kas, arus pemasukan, pengeluaran, dan batas minimal kas tim.', ['view-filter-bar', 'view-kpi', 'view-charts', 'view-widgets', 'card-approval', 'card-iuran', 'view-pengaturan', 'view-transaksi']],
            transaksi: ['Riwayat Transaksi — TEAM ONLINE', 'Daftar mutasi kas masuk & keluar sesuai rentang tanggal terpilih.', ['view-filter-bar', 'view-transaksi']],
            iuran: ['Iuran Anggota — TEAM ONLINE', 'Kelola status pelunasan iuran bulanan dan daftar anggota tim.', ['view-widgets', 'card-iuran']],
            persetujuan: ['Persetujuan Dana — TEAM ONLINE', 'Tinjau pengajuan pengeluaran di atas batas otomatis.', ['view-widgets', 'card-approval']],
            pengaturan: ['Pengaturan Kas — TEAM ONLINE', 'Atur batas minimal saldo kas, nominal iuran, dan backup data.', ['view-pengaturan']]
        };

        const [title, sub, visible] = isAdmin ? views[tab] : ['Ringkasan Kas — TEAM ONLINE', 'Ringkasan saldo kas, grafik arus kas & status pembayaran iuran wajib anggota.', ['view-kpi', 'view-charts', 'view-public-dues']];
        $('header-title').textContent = title;
        $('header-subtitle').textContent = sub;

        ['view-filter-bar', 'view-kpi', 'view-charts', 'view-public-dues', 'card-approval', 'card-iuran', 'view-pengaturan', 'view-transaksi']
            .forEach(id => $(id)?.classList.toggle('hidden', !visible.includes(id)));

        const widgetsEl = $('view-widgets');
        if (widgetsEl) {
            if (!visible.includes('view-widgets')) {
                widgetsEl.className = 'hidden';
            } else {
                widgetsEl.className = (tab === 'iuran' || tab === 'persetujuan')
                    ? 'grid grid-cols-1 gap-4 sm:gap-6'
                    : 'grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6';
            }
        }

        if (window.innerWidth < 1024) toggleSidebar(true);
    }

    function toggleSidebar(forceClose = false) {
        const open = !forceClose && $('sidebar').classList.contains('-translate-x-full');
        $('sidebar').classList.toggle('-translate-x-full', !open);
        $('sidebar-backdrop').classList.toggle('hidden', !open);
    }

    function syncSettingsInputs() {
        $('input-opening-balance').value = formatThousand(kasConfig.openingBalance) || '0';
        $('input-min-saldo').value = formatThousand(kasConfig.minSaldo) || '0';
        $('input-iuran-wajib').value = formatThousand(kasConfig.iuranWajib);
        $('input-limit-auto').value = formatThousand(kasConfig.limitTanpaApproval) || '0';
    }

    function exportExcel() {
        if (!isAdmin) return notify('Silakan masuk sebagai Admin untuk mengekspor Excel.', 'warning', 'Akses Terbatas');
        if (typeof XLSX === 'undefined') {
            return notify('Library Excel sedang dimuat. Coba beberapa detik lagi atau periksa koneksi internet.', 'warning', 'Library Belum Siap');
        }

        const periodTxs = getFilteredTx();
        const chrono = [...periodTxs].sort((a, b) => a.date.localeCompare(b.date) || String(a.id).localeCompare(String(b.id)));
        const income = periodTxs.filter(t => t.type === 'masuk').reduce((s, t) => s + (Number(t.amount) || 0), 0);
        const expenses = periodTxs.filter(t => t.type === 'keluar').reduce((s, t) => s + (Number(t.amount) || 0), 0);
        const opening = Number(kasConfig.openingBalance) || 0;
        const before = transactions
            .filter(t => dateFilter.startDate && t.date < dateFilter.startDate)
            .reduce((b, t) => b + (t.type === 'masuk' ? (Number(t.amount) || 0) : -(Number(t.amount) || 0)), opening);
        const endingBalance = before + income - expenses;
        const netFlow = income - expenses;
        const minSaldo = Number(kasConfig.minSaldo) || 0;

        const rpFormat = '"Rp" #,##0;-"Rp" #,##0;"Rp" 0';
        const periodLabel = `${formatDateID(dateFilter.startDate)} s/d ${formatDateID(dateFilter.endDate)}`;
        const exportedAt = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });

        let run = before;
        const ledgerHeader = ['No', 'Tanggal', 'ID Transaksi', 'Keterangan', 'Kategori', 'PIC / Anggota', 'Jenis', 'Kas Masuk (Rp)', 'Kas Keluar (Rp)', 'Saldo Berjalan (Rp)', 'Status'];
        const ledgerRows = [
            ['-', formatDateID(dateFilter.startDate), '-', 'Saldo Awal Sebelum Periode', '-', '-', 'Saldo Awal', 0, 0, before, 'Aktif']
        ];

        chrono.forEach((t, idx) => {
            const masuk = t.type === 'masuk' ? (Number(t.amount) || 0) : 0;
            const keluar = t.type === 'keluar' ? (Number(t.amount) || 0) : 0;
            run += masuk - keluar;
            ledgerRows.push([
                idx + 1,
                formatDateID(t.date),
                t.id || '-',
                t.title || '-',
                t.category || 'Lain-lain',
                t.pic || '-',
                t.type === 'masuk' ? 'Pemasukan' : 'Pengeluaran',
                masuk,
                keluar,
                run,
                t.status || 'Disetujui'
            ]);
        });

        if (chrono.length === 0) {
            ledgerRows.push(['-', '-', '-', 'Belum ada transaksi tercatat pada periode ini', '-', '-', '-', 0, 0, before, '-']);
        }

        const ledgerTotalRow = ['', '', '', 'TOTAL MUTASI & SALDO AKHIR PERIODE', '', '', '', income, expenses, endingBalance, ''];

        const mainSheetData = [
            ['LAPORAN REKAPITULASI & RIWAYAT KAS BERJALAN — TEAM ONLINE'],
            [`Periode Laporan: ${periodLabel}  |  Diekspor: ${exportedAt}`],
            [],
            ['RINGKASAN SALDO & ARUS KAS'],
            ['Keterangan', 'Nominal (Rp)', 'Catatan'],
            ['Saldo Awal Kas Master', opening, 'Saldo dasar awal sebelum transaksi tercatat'],
            ['Saldo Awal Periode Ini', before, `Akumulasi saldo sebelum ${formatDateID(dateFilter.startDate)}`],
            ['Total Kas Masuk', income, `${periodTxs.filter(t => t.type === 'masuk').length} transaksi pemasukan`],
            ['Total Kas Keluar', expenses, `${periodTxs.filter(t => t.type === 'keluar').length} transaksi pengeluaran`],
            ['Arus Kas Bersih (Surplus / Defisit)', netFlow, netFlow >= 0 ? 'Surplus pada periode aktif' : 'Defisit pada periode aktif'],
            ['Saldo Akhir Periode Ini', endingBalance, endingBalance >= minSaldo ? 'Aman (Di atas batas minimal)' : 'Perhatian (Di bawah batas minimal)'],
            ['Batas Minimal Saldo Aman', minSaldo, 'Standar minimal kas operasional tim'],
            [],
            ['RIWAYAT KAS BERJALAN (MUTASI MASUK & KELUAR)'],
            ledgerHeader,
            ...ledgerRows,
            ledgerTotalRow
        ];

        const wsMain = XLSX.utils.aoa_to_sheet(mainSheetData);
        for (let r = 6; r <= 12; r++) {
            if (wsMain[`B${r}`]) wsMain[`B${r}`].z = rpFormat;
        }
        const startLedgerRow = 16;
        const endLedgerRow = startLedgerRow + ledgerRows.length;
        for (let r = startLedgerRow; r <= endLedgerRow; r++) {
            ['H', 'I', 'J'].forEach(col => {
                if (wsMain[`${col}${r}`] && typeof wsMain[`${col}${r}`].v === 'number') {
                    wsMain[`${col}${r}`].z = rpFormat;
                }
            });
        }

        const txSheetData = [ledgerHeader, ...ledgerRows, ledgerTotalRow];
        const wsTx = XLSX.utils.aoa_to_sheet(txSheetData);
        for (let r = 2; r <= ledgerRows.length + 2; r++) {
            ['H', 'I', 'J'].forEach(col => {
                if (wsTx[`${col}${r}`] && typeof wsTx[`${col}${r}`].v === 'number') {
                    wsTx[`${col}${r}`].z = rpFormat;
                }
            });
        }

        const iuranNominal = Number(kasConfig.iuranWajib) || 0;
        const duesHeader = ['No', 'Nama Anggota', 'Divisi / Role', `Periode (${duesPeriod})`, 'Nominal Wajib (Rp)', 'Status Pembayaran', 'Tanggal Bayar'];
        const duesRows = members.length
            ? members.map((m, idx) => {
                const rec = getDueRecord(m);
                return [
                    idx + 1,
                    m.name,
                    m.role || 'Anggota Tim',
                    duesPeriod,
                    iuranNominal,
                    rec.paid ? 'LUNAS' : 'BELUM LUNAS',
                    rec.paid ? (rec.date || '-') : '-'
                ];
            })
            : [['-', 'Belum ada anggota terdaftar', '-', duesPeriod, iuranNominal, '-', '-']];

        const wsDues = XLSX.utils.aoa_to_sheet([duesHeader, ...duesRows]);
        for (let r = 2; r <= duesRows.length + 1; r++) {
            if (wsDues[`E${r}`] && typeof wsDues[`E${r}`].v === 'number') {
                wsDues[`E${r}`].z = rpFormat;
            }
        }

        const autoFitCols = (ws, rows) => {
            const colWidths = [];
            rows.forEach((row, rIdx) => {
                if (rIdx <= 1) return;
                row.forEach((val, cIdx) => {
                    const str = typeof val === 'number' && val > 999 ? `Rp ${val.toLocaleString('id-ID')}` : String(val ?? '');
                    colWidths[cIdx] = Math.min(44, Math.max(colWidths[cIdx] || 10, str.length + 4));
                });
            });
            ws['!cols'] = colWidths.map(wch => ({ wch }));
        };

        autoFitCols(wsMain, mainSheetData);
        autoFitCols(wsTx, txSheetData);
        autoFitCols(wsDues, [duesHeader, ...duesRows]);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, wsMain, 'Laporan Kas');
        XLSX.utils.book_append_sheet(wb, wsTx, 'Riwayat Transaksi');
        XLSX.utils.book_append_sheet(wb, wsDues, 'Iuran Anggota');

        XLSX.writeFile(wb, `Rekap_Kas_TEAM_ONLINE_${dateFilter.startDate}_sd_${dateFilter.endDate}.xlsx`);
        notify('File Excel (.xlsx) dengan riwayat kas berjalan berhasil diunduh.', 'success', 'Ekspor Selesai');
    }

    function renderAll() {
        renderKPIsAndCharts();
        if (!isAdmin) {
            renderPublicDues();
            return;
        }
        renderApprovals();
        renderDues();
        renderTransactions();
    }

    function commitChanges() {
        renderAll();
        if (isAdmin) saveState();
    }

    // ==========================================
    // 8. INISIALISASI EVENT LISTENER
    // ==========================================
    document.addEventListener('DOMContentLoaded', () => {
        $$('[data-icon]').forEach(el => { el.innerHTML = icon(el.dataset.icon, el.dataset.iconClass || 'w-4 h-4 shrink-0'); });
        syncSettingsInputs();
        selectDatePreset('semua', false);
        applyAccessMode();

        // Tombol Portal Depan
        const openAdminLoginModal = () => {
            $('admin-login-error').classList.add('hidden');
            toggleModal('admin-login-modal', true);
            $('admin-email').focus();
        };

        $('btn-enter-admin')?.addEventListener('click', openAdminLoginModal);
        $('btn-enter-guest')?.addEventListener('click', () => {
            closePortal();
            notify('Anda masuk sebagai Tamu (Mode Ringkasan & Status Iuran).', 'info', 'Mode Tamu');
        });
        $('btn-open-portal')?.addEventListener('click', () => openPortal(false));

        // Filter & Periode Iuran Wajib pada Mode Tamu
        $('public-dues-period')?.addEventListener('change', e => {
            if (/^\d{4}-(0[1-9]|1[0-2])$/.test(e.target.value)) {
                publicDuesPeriod = e.target.value;
                renderPublicDues();
            }
        });
        $('public-due-filter-group')?.addEventListener('click', e => {
            const btn = e.target.closest('[data-action="filter-public-dues"]');
            if (!btn) return;
            publicDueFilter = btn.dataset.mode;
            renderPublicDues();
        });

        $('btn-open-sidebar')?.addEventListener('click', () => toggleSidebar());
        $('btn-close-sidebar')?.addEventListener('click', () => toggleSidebar(true));
        $('sidebar-backdrop')?.addEventListener('click', () => toggleSidebar(true));
        $('sidebar-nav')?.addEventListener('click', e => { const btn = e.target.closest('[data-action="switch-tab"]'); if (btn) switchTab(btn.dataset.tab); });
        $('btn-kpi-goto-settings')?.addEventListener('click', () => { if (isAdmin) switchTab('pengaturan'); });
        $('btn-export-excel')?.addEventListener('click', exportExcel);
        $('btn-open-tx-modal')?.addEventListener('click', () => openTxModal());

        // Login & Logout Admin
        $('btn-admin-login')?.addEventListener('click', openAdminLoginModal);
        $('btn-close-admin-login')?.addEventListener('click', () => toggleModal('admin-login-modal', false));
        $('admin-login-modal')?.addEventListener('click', e => { if (e.target.id === 'admin-login-modal') toggleModal('admin-login-modal', false); });
        $('admin-login-form')?.addEventListener('submit', async e => {
            e.preventDefault();
            const btn = e.target.querySelector('button[type="submit"]');
            const prevText = btn.textContent;
            btn.disabled = true;
            btn.textContent = 'Memproses...';
            try {
                await signInAdmin($('admin-email').value, $('admin-password').value);
                toggleModal('admin-login-modal', false);
                e.target.reset();
                notify('Berhasil masuk sebagai admin kas.', 'success', 'Login Berhasil');
            } catch (err) {
                $('admin-login-error').textContent = err.message || 'Login gagal.';
                $('admin-login-error').classList.remove('hidden');
            } finally {
                btn.disabled = false;
                btn.textContent = prevText;
            }
        });
        $('btn-admin-logout')?.addEventListener('click', async () => { await signOutAdmin(); notify('Anda telah keluar dari akun admin.', 'info', 'Keluar Admin'); });

        // Filter Tanggal
        $('preset-buttons-container')?.addEventListener('click', e => { const btn = e.target.closest('[data-action="preset-date"]'); if (btn) selectDatePreset(btn.dataset.preset); });
        $('btn-apply-custom-date')?.addEventListener('click', () => {
            const s = $('filter-start-date').value, e = $('filter-end-date').value;
            if (!s || !e || s > e) return notify('Pastikan tanggal mulai tidak melebihi tanggal akhir.', 'warning', 'Rentang Tidak Valid');
            Object.assign(dateFilter, { preset: 'custom', startDate: s, endDate: e });
            updatePresetButtonsUI();
            renderAll();
        });
        $('btn-reset-custom-date')?.addEventListener('click', () => selectDatePreset('semua'));

        // Format Ribuan Otomatis
        document.addEventListener('input', e => { if (e.target.classList?.contains('currency-input')) e.target.value = formatThousand(e.target.value); });

        // Persetujuan Dana & Iuran Anggota
        $('approval-list')?.addEventListener('click', e => {
            const btn = e.target.closest('[data-id]');
            if (btn?.dataset.action === 'approve-approval') processApproval(btn.dataset.id, 'approve');
            if (btn?.dataset.action === 'reject-approval') processApproval(btn.dataset.id, 'reject');
        });

        $('due-filter-group')?.addEventListener('click', e => {
            const btn = e.target.closest('[data-action="filter-dues"]');
            if (!btn) return;
            dueStatusFilter = btn.dataset.mode;
            $('btn-due-all').className = dueStatusFilter === 'all' ? 'px-2.5 py-1.5 sm:py-1 rounded-lg font-semibold bg-white text-slate-800 shadow-sm' : 'px-2.5 py-1.5 sm:py-1 rounded-lg font-medium text-slate-500';
            $('btn-due-unpaid').className = dueStatusFilter === 'unpaid' ? 'px-2.5 py-1.5 sm:py-1 rounded-lg font-semibold bg-white text-slate-800 shadow-sm' : 'px-2.5 py-1.5 sm:py-1 rounded-lg font-medium text-slate-500';
            renderDues();
        });

        $('dues-period')?.addEventListener('change', e => { if (/^\d{4}-(0[1-9]|1[0-2])$/.test(e.target.value)) { duesPeriod = e.target.value; commitChanges(); } });
        $('dues-list')?.addEventListener('click', async e => {
            const btn = e.target.closest('[data-id]');
            if (!btn) return;
            if (btn.dataset.action === 'toggle-due') toggleDue(btn.dataset.id);
            if (btn.dataset.action === 'delete-member') {
                if (!isAdmin) return;
                const idx = members.findIndex(m => m.id === Number(btn.dataset.id));
                if (idx !== -1 && await confirmAction({
                    title: 'Hapus Anggota?',
                    message: `Anggota "${members[idx].name}" akan dihapus dari daftar iuran tim.`,
                    confirmText: 'Ya, Hapus',
                    variant: 'danger'
                })) {
                    const [rem] = members.splice(idx, 1);
                    syncMemberDatalist();
                    commitChanges();
                    notify(`Anggota "${rem.name}" dihapus dari daftar.`, 'danger', 'Anggota Dihapus');
                }
            }
        });

        $('add-member-form')?.addEventListener('submit', e => {
            e.preventDefault();
            if (!isAdmin) return;
            const name = $('new-member-name').value.trim();
            if (!name) return notify('Masukkan nama anggota terlebih dahulu.', 'warning', 'Nama Kosong');
            if (members.some(m => m.name.toLowerCase() === name.toLowerCase())) return notify(`Anggota "${name}" sudah terdaftar.`, 'warning', 'Sudah Terdaftar');
            members.push({ id: members.reduce((max, m) => Math.max(max, m.id), 0) + 1, name, role: $('new-member-role').value.trim() || 'Anggota Tim', duesByPeriod: {} });
            $('new-member-name').value = ''; $('new-member-role').value = '';
            syncMemberDatalist();
            commitChanges();
            notify(`Anggota "${name}" berhasil ditambahkan.`, 'success', 'Anggota Baru');
        });

        // Pengaturan Kas & Backup JSON
        $('kas-settings-form')?.addEventListener('submit', e => {
            e.preventDefault();
            if (!isAdmin) return;
            const iuran = parseCurrency($('input-iuran-wajib').value);
            if (iuran <= 0) return notify('Nominal iuran wajib harus lebih dari Rp 0.', 'warning', 'Nominal Tidak Valid');
            kasConfig = {
                openingBalance: parseCurrency($('input-opening-balance').value),
                minSaldo: parseCurrency($('input-min-saldo').value),
                iuranWajib: iuran,
                limitTanpaApproval: parseCurrency($('input-limit-auto').value)
            };
            syncSettingsInputs();
            commitChanges();
            notify('Pengaturan kas berhasil disimpan ke Supabase!', 'success', 'Pengaturan Tersimpan');
        });

        $('btn-reset-kas-settings')?.addEventListener('click', () => {
            if (!isAdmin) return;
            kasConfig = { openingBalance: 0, minSaldo: 10000000, iuranWajib: 250000, limitTanpaApproval: 500000 };
            syncSettingsInputs();
            commitChanges();
            notify('Pengaturan dikembalikan ke standar awal.', 'info', 'Reset Default');
        });

        $('btn-export-backup')?.addEventListener('click', () => {
            if (!isAdmin) return;
            const a = Object.assign(document.createElement('a'), {
                href: URL.createObjectURL(new Blob([JSON.stringify({ format: 'team-online-cash-backup', version: 1, exportedAt: new Date().toISOString(), transactions, approvalQueue, members, kasConfig, duesPeriod }, null, 2)], { type: 'application/json' })),
                download: `Backup_Kas_TEAM_ONLINE_${TODAY_ISO}.json`
            });
            a.click();
            notify('File backup JSON berhasil diunduh.', 'success', 'Backup Diunduh');
        });

        $('btn-import-backup')?.addEventListener('click', () => { if (isAdmin) $('backup-file').click(); });
        $('backup-file')?.addEventListener('change', e => {
            const file = e.target.files?.[0];
            if (!file || !isAdmin) return;
            const reader = new FileReader();
            reader.onload = async () => {
                try {
                    const b = JSON.parse(String(reader.result));
                    if (!Array.isArray(b.transactions) || !Array.isArray(b.members) || !b.kasConfig) throw new Error();
                    if (!(await confirmAction({
                        title: 'Pulihkan Data Backup?',
                        message: 'Seluruh transaksi, anggota, dan pengaturan saat ini akan diganti dengan data dari file backup.',
                        confirmText: 'Ya, Pulihkan',
                        variant: 'warning'
                    }))) return;
                    transactions = b.transactions;
                    approvalQueue = Array.isArray(b.approvalQueue) ? b.approvalQueue : [];
                    members = normalizeMemberList(b.members);
                    kasConfig = { openingBalance: Number(b.kasConfig.openingBalance) || 0, minSaldo: Number(b.kasConfig.minSaldo) ?? 10000000, iuranWajib: Number(b.kasConfig.iuranWajib) || 250000, limitTanpaApproval: Number(b.kasConfig.limitTanpaApproval) ?? 500000 };
                    duesPeriod = b.duesPeriod || CURRENT_MONTH;
                    syncSettingsInputs();
                    syncMemberDatalist();
                    selectDatePreset('semua', false);
                    commitChanges();
                    notify('Seluruh data berhasil dipulihkan dari backup!', 'success', 'Backup Dipulihkan');
                } catch { notify('Format file backup tidak valid atau rusak.', 'warning', 'Gagal Memulihkan'); }
                finally { e.target.value = ''; }
            };
            reader.readAsText(file);
        });

        // Tabel & Kartu Mobile Transaksi + Modal
        $('tx-search')?.addEventListener('input', renderTransactions);
        $('tx-type-filter-group')?.addEventListener('click', e => {
            const btn = e.target.closest('[data-action="filter-tx-type"]');
            if (!btn) return;
            txTypeFilter = btn.dataset.type;
            $$('.tx-tab-btn').forEach(b => { b.className = b.dataset.type === txTypeFilter ? 'tx-tab-btn px-3 py-1.5 rounded-lg bg-white text-slate-900 shadow-sm font-semibold' : 'tx-tab-btn px-3 py-1.5 rounded-lg text-slate-500'; });
            renderTransactions();
        });

        const handleTxAction = async e => {
            const btn = e.target.closest('[data-id]');
            if (!btn || !isAdmin) return;
            if (btn.dataset.action === 'edit-tx') {
                const tx = transactions.find(t => t.id === btn.dataset.id);
                if (tx) openTxModal(tx);
            } else if (btn.dataset.action === 'delete-tx') {
                const idx = transactions.findIndex(t => t.id === btn.dataset.id);
                if (idx !== -1 && await confirmAction({
                    title: 'Hapus Transaksi?',
                    message: `Transaksi "${transactions[idx].title}" akan dihapus permanen dan saldo kas otomatis disesuaikan.`,
                    confirmText: 'Ya, Hapus',
                    variant: 'danger'
                })) {
                    const [rem] = transactions.splice(idx, 1);
                    if (rem.duesMemberId !== undefined && rem.duesPeriod) {
                        const m = members.find(x => Number(x.id) === Number(rem.duesMemberId));
                        if (m?.duesByPeriod?.[rem.duesPeriod]) m.duesByPeriod[rem.duesPeriod] = { paid: false, date: '', transactionId: '' };
                    }
                    commitChanges();
                    notify(`Transaksi "${rem.title}" dihapus.`, 'danger', 'Transaksi Dihapus');
                }
            }
        };
        $('tx-tbody')?.addEventListener('click', handleTxAction);
        $('tx-mobile-list')?.addEventListener('click', handleTxAction);

        $('btn-close-tx-modal')?.addEventListener('click', closeTxModal);
        $('btn-cancel-tx-modal')?.addEventListener('click', closeTxModal);
        $('tx-modal')?.addEventListener('click', e => { if (e.target.id === 'tx-modal') closeTxModal(); });
        $$('input[name="txType"]').forEach(r => r.addEventListener('change', syncModalCategories));
        $('modal-quick-dates')?.addEventListener('click', e => {
            const chip = e.target.closest('[data-action="modal-quick-date"]');
            if (!chip) return;
            const prev = new Date(CURRENT_YEAR, now.getMonth() - 1, 15);
            $('m-date').value = {
                'today': TODAY_ISO,
                'last-month': `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, '0')}-15`,
                'current-year': `${CURRENT_YEAR}-06-15`,
                'early-current-year': `${CURRENT_YEAR}-01-10`
            }[chip.dataset.when] || TODAY_ISO;
        });

        $('tx-form')?.addEventListener('submit', e => { e.preventDefault(); handleSaveTx(false); });
        $('btn-save-add-another')?.addEventListener('click', () => handleSaveTx(true));

        initSupabase();
    });
})();
