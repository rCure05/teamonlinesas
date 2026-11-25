tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    },
                    colors: {
                        brand: {
                            50: '#eef2ff',
                            100: '#e0e7ff',
                            200: '#c7d2fe',
                            400: '#818cf8',
                            500: '#6366f1',
                            600: '#4f46e5',
                            700: '#4338ca',
                            900: '#1e1b4b',
                        }
                    }
                }
            }
        };

(function () {
            'use strict';

            // ==========================================
            // 1. INLINE SVG ICON HELPER (ZERO EXTERNAL DEPENDENCY)
            // ==========================================
            const SVG_PATHS = {
                'wallet': '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
                'menu': '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
                'x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
                'layout-dashboard': '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
                'arrow-left-right': '<path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/>',
                'users': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
                'clipboard-check': '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
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
                'calendar': '<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>',
                'info': '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
                'user-plus': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>',
                'trash-2': '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
                'shield': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
                'save': '<path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/>'
            };

            function icon(name, className = 'w-4 h-4') {
                const paths = SVG_PATHS[name] || '';
                return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}" aria-hidden="true">${paths}</svg>`;
            }

            function hydrateStaticIcons() {
                document.querySelectorAll('[data-icon]').forEach(el => {
                    const name = el.getAttribute('data-icon');
                    const cls = el.getAttribute('data-icon-class') || 'w-4 h-4';
                    el.innerHTML = icon(name, cls);
                });
            }

            // ==========================================
            // 2. APPLICATION STATE & MULTI-YEAR DATASET
            // ==========================================
            const INITIAL_BALANCE = 0;
            const TODAY_ISO = (() => {
                const now = new Date();
                return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
            })();
            const CURRENT_YEAR = Number(TODAY_ISO.slice(0, 4));
            const CURRENT_MONTH = TODAY_ISO.slice(0, 7);
            const LEGACY_DUES_PERIOD = '2026-11';

            let kasConfig = {
                openingBalance: INITIAL_BALANCE,
                minSaldo: 10000000,
                iuranWajib: 250000,
                limitTanpaApproval: 500000
            };

            let dateFilter = {
                preset: 'semua',
                startDate: `${CURRENT_YEAR}-01-01`,
                endDate: TODAY_ISO
            };

            let activeTab = 'ringkasan';
            let txTypeFilter = 'all';
            let dueStatusFilter = 'all';
            let duesPeriod = CURRENT_MONTH;

            let cashflowChart = null;
            let categoryChart = null;
            const STORAGE_KEY = 'team-online-cash-dashboard-v1';
            let storageWarningShown = false;

            let transactions = [];
            let approvalQueue = [];
            let members = [];

            function loadSavedState() {
                try {
                    const raw = localStorage.getItem(STORAGE_KEY);
                    if (!raw) {
                        normalizeMemberDues();
                        return;
                    }
                    const saved = JSON.parse(raw);
                    if (Array.isArray(saved.transactions)) transactions = saved.transactions;
                    if (Array.isArray(saved.approvalQueue)) approvalQueue = saved.approvalQueue;
                    if (Array.isArray(saved.members)) members = saved.members;
                    if (saved.kasConfig && typeof saved.kasConfig === 'object') {
                        kasConfig = {
                            openingBalance: Number.isFinite(Number(saved.kasConfig.openingBalance))
                                ? Number(saved.kasConfig.openingBalance)
                                : INITIAL_BALANCE,
                            minSaldo: Number.isFinite(Number(saved.kasConfig.minSaldo))
                                ? Number(saved.kasConfig.minSaldo)
                                : 10000000,
                            iuranWajib: Number.isFinite(Number(saved.kasConfig.iuranWajib))
                                ? Number(saved.kasConfig.iuranWajib)
                                : 250000,
                            limitTanpaApproval: Number.isFinite(Number(saved.kasConfig.limitTanpaApproval))
                                ? Number(saved.kasConfig.limitTanpaApproval)
                                : 500000
                        };
                    }
                    if (typeof saved.duesPeriod === 'string' && /^\d{4}-\d{2}$/.test(saved.duesPeriod)) {
                        duesPeriod = saved.duesPeriod;
                    }
                } catch (error) {
                    console.warn('Data dashboard tersimpan tidak dapat dimuat.', error);
                }
                normalizeMemberDues();
            }

            function saveState() {
                try {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify({
                        transactions,
                        approvalQueue,
                        members,
                        kasConfig,
                        duesPeriod
                    }));
                } catch (error) {
                    console.warn('Perubahan dashboard tidak dapat disimpan.', error);
                    if (!storageWarningShown) {
                        storageWarningShown = true;
                        notify('Penyimpanan browser gagal. Segera unduh backup agar perubahan tidak hilang.', 'warning');
                    }
                }
            }

            function normalizeMemberDues() {
                members = members.map(member => {
                    const duesByPeriod = member.duesByPeriod && typeof member.duesByPeriod === 'object'
                        ? member.duesByPeriod
                        : {};
                    if (!duesByPeriod[LEGACY_DUES_PERIOD] && typeof member.paid === 'boolean') {
                        duesByPeriod[LEGACY_DUES_PERIOD] = {
                            paid: member.paid,
                            date: member.date && member.date !== '-' ? member.date : '',
                            transactionId: '',
                            legacy: true
                        };
                    }
                    return { ...member, duesByPeriod };
                });

                const legacyPaidMembers = members
                    .filter(member => member.duesByPeriod[LEGACY_DUES_PERIOD]?.paid)
                    .sort((a, b) => Number.parseInt(a.duesByPeriod[LEGACY_DUES_PERIOD].date, 10) - Number.parseInt(b.duesByPeriod[LEGACY_DUES_PERIOD].date, 10));
                let memberOffset = 0;
                transactions
                    .filter(tx => tx.type === 'masuk' && /^Iuran Kas November Batch/.test(tx.title) && !Array.isArray(tx.duesMembers))
                    .sort((a, b) => a.date.localeCompare(b.date))
                    .forEach(tx => {
                        const countMatch = tx.title.match(/\((\d+) Anggota\)/);
                        const memberCount = countMatch ? Number(countMatch[1]) : 0;
                        const batchMembers = legacyPaidMembers.slice(memberOffset, memberOffset + memberCount);
                        if (memberCount > 0 && batchMembers.length === memberCount) {
                            tx.duesPeriod = LEGACY_DUES_PERIOD;
                            tx.duesMembers = batchMembers.map(member => member.id);
                            tx.duesAmountPerMember = tx.amount / memberCount;
                            memberOffset += memberCount;
                        }
                    });
            }

            loadSavedState();

            // ==========================================
            // 3. SAFE FORMATTERS & HELPERS
            // ==========================================
            function parseCurrency(raw) {
                const digits = String(raw || '').replace(/\D/g, '');
                if (!digits) return 0;
                const parsed = Number(digits);
                return Number.isFinite(parsed) ? parsed : 0;
            }

            function formatThousand(num) {
                const clean = parseCurrency(num);
                return clean > 0 ? clean.toLocaleString('id-ID') : '';
            }

            function createUniqueId(prefix, records) {
                const usedIds = new Set(records.map(record => String(record.id)));
                const idInfo = records.reduce((info, record) => {
                    const match = String(record.id).match(new RegExp(`^${prefix}-(\\d+)$`));
                    if (!match) return info;
                    return {
                        maxNumber: Math.max(info.maxNumber, Number(match[1])),
                        width: Math.max(info.width, match[1].length)
                    };
                }, { maxNumber: 0, width: 2 });
                let nextNumber = idInfo.maxNumber + 1;
                let candidate = `${prefix}-${String(nextNumber).padStart(idInfo.width, '0')}`;
                while (usedIds.has(candidate)) {
                    nextNumber++;
                    candidate = `${prefix}-${String(nextNumber).padStart(idInfo.width, '0')}`;
                }
                return candidate;
            }

            function formatRp(num) {
                const val = Number(num);
                const safe = Number.isFinite(val) ? Math.abs(val) : 0;
                return 'Rp ' + safe.toLocaleString('id-ID');
            }

            function formatDateID(isoDate) {
                if (!isoDate || typeof isoDate !== 'string') return '-';
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
                const parts = isoDate.split('-');
                if (parts.length !== 3) return isoDate;
                const year = parts[0];
                const monthIdx = parseInt(parts[1], 10) - 1;
                const day = parseInt(parts[2], 10);
                if (monthIdx < 0 || monthIdx > 11 || isNaN(day)) return isoDate;
                return `${day} ${months[monthIdx]} ${year}`;
            }

            function getMonthRange(monthValue) {
                const [year, month] = monthValue.split('-').map(Number);
                const lastDay = new Date(year, month, 0).getDate();
                return {
                    startDate: `${year}-${String(month).padStart(2, '0')}-01`,
                    endDate: `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`
                };
            }

            function escapeHTML(str) {
                return String(str || '')
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#39;');
            }

            function notify(msg, type = 'success') {
                const box = document.getElementById('toast-container');
                if (!box) return;

                const el = document.createElement('div');
                const bgMap = {
                    success: 'bg-slate-900 text-white border-emerald-500/40',
                    warning: 'bg-amber-950 text-white border-amber-500/40',
                    info: 'bg-brand-900 text-white border-brand-400/40'
                };
                const iconMap = {
                    success: 'check-circle-2',
                    warning: 'alert-triangle',
                    info: 'info'
                };
                const colorMap = {
                    success: 'text-emerald-400',
                    warning: 'text-amber-400',
                    info: 'text-brand-300'
                };

                el.className = `pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg text-xs sm:text-sm font-medium transition-all duration-300 translate-y-3 opacity-0 ${bgMap[type] || bgMap.success}`;
                el.innerHTML = `${icon(iconMap[type] || 'info', `w-4 h-4 shrink-0 ${colorMap[type] || ''}`)}<span class="leading-snug">${escapeHTML(msg)}</span>`;
                box.appendChild(el);

                requestAnimationFrame(() => el.classList.remove('translate-y-3', 'opacity-0'));
                setTimeout(() => {
                    el.classList.add('translate-y-3', 'opacity-0');
                    setTimeout(() => el.remove(), 300);
                }, 3400);
            }

            // ==========================================
            // 4. DATE RANGE FILTERING (ISO STRING SAFE)
            // ==========================================
            function getFilteredTransactions() {
                return transactions
                    .filter(tx => {
                        if (dateFilter.startDate && tx.date < dateFilter.startDate) return false;
                        if (dateFilter.endDate && tx.date > dateFilter.endDate) return false;
                        return true;
                    })
                    .sort((a, b) => b.date.localeCompare(a.date));
            }

            function updatePresetButtonsUI() {
                const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
                const currentMonthButton = document.querySelector('[data-preset="bulan-ini"]');
                const previousMonthButton = document.querySelector('[data-preset="bulan-lalu"]');
                const currentYearButton = document.querySelector('[data-preset="tahun-ini"]');
                if (currentMonthButton) currentMonthButton.textContent = `Bulan Ini (${monthNames[new Date().getMonth()]} ${CURRENT_YEAR})`;
                if (previousMonthButton) {
                    const previousMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
                    previousMonthButton.textContent = `Bulan Lalu (${monthNames[previousMonth.getMonth()]} ${previousMonth.getFullYear()})`;
                }
                if (currentYearButton) currentYearButton.textContent = `Tahun ${CURRENT_YEAR}`;

                document.querySelectorAll('.preset-btn').forEach(btn => {
                    if (btn.dataset.preset === dateFilter.preset) {
                        btn.className = 'preset-btn px-3 py-1.5 rounded-xl text-xs font-semibold bg-brand-600 text-white shadow-2xs transition-colors whitespace-nowrap';
                    } else {
                        btn.className = 'preset-btn px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200/70 transition-colors whitespace-nowrap';
                    }
                });

                const startText = formatDateID(dateFilter.startDate);
                const endText = formatDateID(dateFilter.endDate);
                const badgeText = dateFilter.preset === 'semua'
                    ? `Menampilkan data: Semua Waktu (${startText} – ${endText})`
                    : `Menampilkan data: ${startText} – ${endText}`;

                const badgeEl = document.getElementById('active-range-badge');
                const sidebarLabel = document.getElementById('sidebar-period-label');
                if (badgeEl) badgeEl.textContent = badgeText;
                if (sidebarLabel) sidebarLabel.textContent = `Rentang: ${startText} – ${endText}`;
            }

            function selectDatePreset(preset) {
                dateFilter.preset = preset;
                const startInput = document.getElementById('filter-start-date');
                const endInput = document.getElementById('filter-end-date');
                const today = new Date();
                let range;
                if (preset === 'bulan-ini') {
                    range = getMonthRange(CURRENT_MONTH);
                } else if (preset === 'bulan-lalu') {
                    const previousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                    range = getMonthRange(`${previousMonth.getFullYear()}-${String(previousMonth.getMonth() + 1).padStart(2, '0')}`);
                } else if (preset === 'tahun-ini') {
                    range = { startDate: `${CURRENT_YEAR}-01-01`, endDate: `${CURRENT_YEAR}-12-31` };
                } else if (preset === 'semua') {
                    const dates = transactions.map(tx => tx.date).filter(Boolean).sort();
                    range = {
                        startDate: dates[0] || `${CURRENT_YEAR}-01-01`,
                        endDate: dates[dates.length - 1] || TODAY_ISO
                    };
                } else {
                    return;
                }
                dateFilter.startDate = range.startDate;
                dateFilter.endDate = range.endDate;

                if (startInput) startInput.value = dateFilter.startDate;
                if (endInput) endInput.value = dateFilter.endDate;
                updatePresetButtonsUI();
                updateAll();
            }

            function applyCustomDateFilter() {
                const startInput = document.getElementById('filter-start-date');
                const endInput = document.getElementById('filter-end-date');
                const s = startInput ? startInput.value : '';
                const e = endInput ? endInput.value : '';

                if (!s || !e) {
                    notify('Silakan isi tanggal awal dan tanggal akhir terlebih dahulu.', 'warning');
                    return;
                }
                if (s > e) {
                    notify('Tanggal awal tidak boleh lebih besar dari tanggal akhir.', 'warning');
                    return;
                }

                dateFilter.preset = 'custom';
                dateFilter.startDate = s;
                dateFilter.endDate = e;
                updatePresetButtonsUI();
                updateAll();
                notify(`Filter custom diterapkan: ${formatDateID(s)} – ${formatDateID(e)}.`, 'info');
            }

            // ==========================================
            // 5. KPI & KAS SETTINGS LOGIC
            // ==========================================
            function refreshKPIs() {
                const periodTxs = getFilteredTransactions();
                const masukPeriod = periodTxs.filter(t => t.type === 'masuk').reduce((s, t) => s + t.amount, 0);
                const keluarPeriod = periodTxs.filter(t => t.type === 'keluar').reduce((s, t) => s + t.amount, 0);
                const netPeriod = masukPeriod - keluarPeriod;

                // Saldo Kas Kumulatif sampai akhir periode (endDate)
                const upToEndTxs = transactions.filter(t => !dateFilter.endDate || t.date <= dateFilter.endDate);
                const cumMasuk = upToEndTxs.filter(t => t.type === 'masuk').reduce((s, t) => s + t.amount, 0);
                const cumKeluar = upToEndTxs.filter(t => t.type === 'keluar').reduce((s, t) => s + t.amount, 0);
                const endPeriodSaldo = kasConfig.openingBalance + cumMasuk - cumKeluar;

                const saldoEl = document.getElementById('kpi-saldo');
                const masukEl = document.getElementById('kpi-masuk');
                const keluarEl = document.getElementById('kpi-keluar');
                const masukCountEl = document.getElementById('kpi-masuk-count');
                const keluarCountEl = document.getElementById('kpi-keluar-count');
                const rangeCountEl = document.getElementById('active-range-count');

                if (saldoEl) saldoEl.textContent = (endPeriodSaldo < 0 ? '- ' : '') + formatRp(endPeriodSaldo);
                if (masukEl) masukEl.textContent = formatRp(masukPeriod);
                if (keluarEl) keluarEl.textContent = formatRp(keluarPeriod);
                if (masukCountEl) masukCountEl.textContent = `${periodTxs.filter(t => t.type === 'masuk').length} transaksi masuk`;
                if (keluarCountEl) keluarCountEl.textContent = `${periodTxs.filter(t => t.type === 'keluar').length} transaksi keluar`;
                if (rangeCountEl) rangeCountEl.textContent = `${periodTxs.length} transaksi`;

                // Arus Kas Bersih (Surplus / Defisit)
                const netEl = document.getElementById('kpi-net');
                const netBadge = document.getElementById('kpi-net-badge');
                const netIconBox = document.getElementById('kpi-net-icon-box');

                if (netEl && netBadge && netIconBox) {
                    if (netPeriod >= 0) {
                        netEl.textContent = `+ ${formatRp(netPeriod)}`;
                        netEl.className = 'text-xl sm:text-2xl font-extrabold text-emerald-600 mt-1.5 tracking-tight truncate';
                        netBadge.textContent = 'Surplus Periode';
                        netBadge.className = 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70 whitespace-nowrap';
                        netIconBox.className = 'w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0';
                        netIconBox.innerHTML = icon('trending-up', 'w-5 h-5');
                    } else {
                        netEl.textContent = `- ${formatRp(netPeriod)}`;
                        netEl.className = 'text-xl sm:text-2xl font-extrabold text-rose-600 mt-1.5 tracking-tight truncate';
                        netBadge.textContent = 'Defisit Periode';
                        netBadge.className = 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/70 whitespace-nowrap';
                        netIconBox.className = 'w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0';
                        netIconBox.innerHTML = icon('trending-down', 'w-5 h-5');
                    }
                }

                // Status Minimal Kas
                const statusEl = document.getElementById('kpi-saldo-status');
                const minLabelEl = document.getElementById('kpi-min-label');
                if (minLabelEl) minLabelEl.textContent = formatRp(kasConfig.minSaldo);

                if (statusEl) {
                    if (endPeriodSaldo >= kasConfig.minSaldo) {
                        statusEl.className = 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70 whitespace-nowrap';
                        statusEl.innerHTML = `${icon('shield-check', 'w-3 h-3')} <span>Saldo Aman</span>`;
                    } else {
                        statusEl.className = 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/80 whitespace-nowrap';
                        statusEl.innerHTML = `${icon('alert-triangle', 'w-3 h-3')} <span>Di Bawah Minimal</span>`;
                    }
                }

                // Update Iuran & Sidebar Counters
                const paid = members.filter(m => getDueRecord(m).paid).length;
                const total = members.length;
                const iuranMiniEl = document.getElementById('kpi-iuran-mini');
                const widgetNominalEl = document.getElementById('widget-iuran-nominal');
                const badgeIuranEl = document.getElementById('badge-iuran-count');
                const badgeTxEl = document.getElementById('badge-tx-count');
                const approvalLimitBadge = document.getElementById('approval-limit-badge');

                if (iuranMiniEl) iuranMiniEl.textContent = `${paid}/${total} Lunas`;
                if (widgetNominalEl) widgetNominalEl.textContent = formatRp(kasConfig.iuranWajib);
                if (badgeIuranEl) badgeIuranEl.textContent = `${paid}/${total}`;
                if (badgeTxEl) badgeTxEl.textContent = String(transactions.length);
                if (approvalLimitBadge) approvalLimitBadge.textContent = formatRp(kasConfig.limitTanpaApproval);
            }

            function handleSaveKasSettings(e) {
                e.preventDefault();
                const openingBalance = parseCurrency(document.getElementById('input-opening-balance')?.value);
                const minSaldo = parseCurrency(document.getElementById('input-min-saldo')?.value);
                const iuran = parseCurrency(document.getElementById('input-iuran-wajib')?.value);
                const limitAuto = parseCurrency(document.getElementById('input-limit-auto')?.value);

                if (iuran <= 0) {
                    notify('Nominal iuran wajib harus lebih dari Rp 0.', 'warning');
                    return;
                }

                kasConfig.openingBalance = openingBalance;
                kasConfig.minSaldo = minSaldo;
                kasConfig.iuranWajib = iuran;
                kasConfig.limitTanpaApproval = limitAuto;

                // Re-format inputs neatly
                document.getElementById('input-opening-balance').value = formatThousand(openingBalance) || '0';
                document.getElementById('input-min-saldo').value = formatThousand(minSaldo) || '0';
                document.getElementById('input-iuran-wajib').value = formatThousand(iuran);
                document.getElementById('input-limit-auto').value = formatThousand(limitAuto);

                updateAll();
                notify(`Pengaturan kas TEAM ONLINE disimpan! Minimal saldo aman: ${formatRp(minSaldo)}.`, 'success');
            }

            function handleResetKasSettings() {
                kasConfig = { openingBalance: INITIAL_BALANCE, minSaldo: 10000000, iuranWajib: 250000, limitTanpaApproval: 500000 };
                document.getElementById('input-opening-balance').value = formatThousand(kasConfig.openingBalance);
                document.getElementById('input-min-saldo').value = formatThousand(kasConfig.minSaldo);
                document.getElementById('input-iuran-wajib').value = formatThousand(kasConfig.iuranWajib);
                document.getElementById('input-limit-auto').value = formatThousand(kasConfig.limitTanpaApproval);
                updateAll();
                notify('Pengaturan kas dikembalikan ke nilai default.', 'info');
            }

            // ==========================================
            // 6. CHARTS (CHART.JS 4.4.1 WITH SAFE DESTROY)
            // ==========================================
            function getMonthBucketsForActiveRange() {
                const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
                const periodTxs = getFilteredTransactions();

                let startStr = dateFilter.startDate;
                let endStr = dateFilter.endDate;

                if (!startStr || !endStr) {
                    const dates = periodTxs.map(t => t.date).sort();
                    startStr = dates[0] || `${CURRENT_YEAR}-01-01`;
                    endStr = dates[dates.length - 1] || TODAY_ISO;
                }

                const [sY, sM] = startStr.split('-').map(Number);
                const [eY, eM] = endStr.split('-').map(Number);

                const buckets = [];
                let curY = sY;
                let curM = sM;
                let guard = 0;

                while ((curY < eY || (curY === eY && curM <= eM)) && guard < 48) {
                    const ym = `${curY}-${String(curM).padStart(2, '0')}`;
                    const label = `${monthsShort[curM - 1]} ${String(curY).slice(2)}`;
                    const masuk = periodTxs
                        .filter(t => t.date.startsWith(ym) && t.type === 'masuk')
                        .reduce((acc, t) => acc + t.amount, 0);
                    const keluar = periodTxs
                        .filter(t => t.date.startsWith(ym) && t.type === 'keluar')
                        .reduce((acc, t) => acc + t.amount, 0);

                    buckets.push({ ym, label, masuk, keluar });

                    curM++;
                    if (curM > 12) {
                        curM = 1;
                        curY++;
                    }
                    guard++;
                }

                return buckets;
            }

            function renderCharts() {
                if (typeof Chart === 'undefined') return;

                const buckets = getMonthBucketsForActiveRange();
                const subtitleEl = document.getElementById('chart-cashflow-subtitle');
                if (subtitleEl) {
                    subtitleEl.textContent = `Mutasi bulanan (${formatDateID(dateFilter.startDate)} – ${formatDateID(dateFilter.endDate)})`;
                }

                // 1. Bar Chart: Cashflow
                const canvas1 = document.getElementById('cashflowChart');
                if (canvas1) {
                    if (cashflowChart) {
                        cashflowChart.destroy();
                        cashflowChart = null;
                    }
                    const ctx1 = canvas1.getContext('2d');
                    cashflowChart = new Chart(ctx1, {
                        type: 'bar',
                        data: {
                            labels: buckets.map(b => b.label),
                            datasets: [
                                {
                                    label: 'Kas Masuk',
                                    data: buckets.map(b => b.masuk),
                                    backgroundColor: '#10b981',
                                    borderRadius: 5,
                                    barPercentage: 0.72,
                                    categoryPercentage: 0.75
                                },
                                {
                                    label: 'Kas Keluar',
                                    data: buckets.map(b => b.keluar),
                                    backgroundColor: '#f43f5e',
                                    borderRadius: 5,
                                    barPercentage: 0.72,
                                    categoryPercentage: 0.75
                                }
                            ]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            animation: { duration: 250 },
                            plugins: {
                                legend: { display: false },
                                tooltip: {
                                    backgroundColor: '#0f172a',
                                    padding: 10,
                                    cornerRadius: 8,
                                    callbacks: {
                                        label: ctx => `${ctx.dataset.label}: ${formatRp(ctx.raw)}`
                                    }
                                }
                            },
                            scales: {
                                x: {
                                    grid: { display: false },
                                    ticks: { font: { family: 'Inter', size: 11 }, color: '#64748b', maxRotation: 45, minRotation: 0 }
                                },
                                y: {
                                    border: { display: false },
                                    grid: { color: '#f1f5f9' },
                                    ticks: {
                                        font: { family: 'Inter', size: 11 },
                                        color: '#64748b',
                                        callback: val => 'Rp ' + (val / 1000000).toFixed(val % 1000000 === 0 ? 0 : 1) + ' Jt'
                                    }
                                }
                            }
                        }
                    });
                }

                // 2. Doughnut Chart: Category Allocation
                const expenses = getFilteredTransactions().filter(t => t.type === 'keluar');
                const cats = ['Operasional Server', 'Konsumsi Rapat', 'Perlengkapan Tim', 'Lain-lain'];
                const colors = ['#4f46e5', '#f59e0b', '#06b6d4', '#8b5cf6'];
                const vals = cats.map(c => expenses.filter(t => t.category === c).reduce((a, b) => a + b.amount, 0));

                const canvas2 = document.getElementById('categoryChart');
                if (canvas2) {
                    if (categoryChart) {
                        categoryChart.destroy();
                        categoryChart = null;
                    }
                    const ctx2 = canvas2.getContext('2d');
                    categoryChart = new Chart(ctx2, {
                        type: 'doughnut',
                        data: {
                            labels: cats,
                            datasets: [{
                                data: vals,
                                backgroundColor: colors,
                                borderWidth: 0,
                                hoverOffset: 4
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            animation: { duration: 250 },
                            cutout: '72%',
                            plugins: {
                                legend: { display: false },
                                tooltip: {
                                    backgroundColor: '#0f172a',
                                    padding: 10,
                                    cornerRadius: 8,
                                    callbacks: {
                                        label: ctx => ` ${ctx.label}: ${formatRp(ctx.raw)}`
                                    }
                                }
                            }
                        }
                    });
                }

                const legendEl = document.getElementById('category-legend');
                if (legendEl) {
                    const sum = vals.reduce((a, b) => a + b, 0);
                    legendEl.innerHTML = cats.map((c, i) => {
                        const pct = sum > 0 ? Math.round((vals[i] / sum) * 100) : 0;
                        return `
                            <div class="flex items-center justify-between gap-2">
                                <div class="flex items-center gap-2 min-w-0">
                                    <span class="w-2.5 h-2.5 rounded-full shrink-0" style="background:${colors[i]}"></span>
                                    <span class="text-slate-600 font-medium truncate">${escapeHTML(c)}</span>
                                </div>
                                <div class="flex items-center gap-2 shrink-0">
                                    <span class="font-semibold text-slate-800">${formatRp(vals[i])}</span>
                                    <span class="text-slate-400 w-8 text-right">${pct}%</span>
                                </div>
                            </div>
                        `;
                    }).join('');
                }
            }

            // ==========================================
            // 7. APPROVAL QUEUE & MEMBER DUES (EVENT DELEGATION)
            // ==========================================
            function renderApprovals() {
                const list = document.getElementById('approval-list');
                const pill = document.getElementById('pill-approval-count');
                const badge = document.getElementById('badge-approval-count');

                if (pill) pill.textContent = `${approvalQueue.length} Menunggu`;
                if (badge) {
                    badge.textContent = String(approvalQueue.length);
                    badge.classList.toggle('hidden', approvalQueue.length === 0);
                }

                if (!list) return;

                if (approvalQueue.length === 0) {
                    list.innerHTML = `
                        <div class="py-10 text-center">
                            <div class="w-11 h-11 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-2.5">
                                ${icon('check-check', 'w-5 h-5')}
                            </div>
                            <p class="text-sm font-semibold text-slate-800">Tidak Ada Antrean Persetujuan</p>
                            <p class="text-xs text-slate-400 mt-1">Semua pengajuan dana TEAM ONLINE sudah dikonfirmasi.</p>
                        </div>
                    `;
                    return;
                }

                list.innerHTML = approvalQueue.map(item => `
                    <div class="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div class="min-w-0 space-y-1">
                            <div class="flex items-center gap-2">
                                <span class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-200/70 text-slate-700 whitespace-nowrap">${escapeHTML(item.category)}</span>
                                <span class="text-[11px] text-slate-400 truncate">${formatDateID(item.date)}</span>
                            </div>
                            <h4 class="text-sm font-bold text-slate-800 truncate">${escapeHTML(item.title)}</h4>
                            <p class="text-xs text-slate-500 truncate">Oleh <span class="font-semibold text-slate-700">${escapeHTML(item.requester)}</span> • ${escapeHTML(item.role)}</p>
                        </div>

                        <div class="flex sm:flex-col items-center sm:items-end justify-between gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 shrink-0">
                            <span class="text-sm font-bold text-rose-600 whitespace-nowrap">${formatRp(item.amount)}</span>
                            <div class="flex items-center gap-1.5">
                                <button type="button" data-action="reject-approval" data-id="${escapeHTML(item.id)}" class="px-2.5 py-1 rounded-lg text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200/70">Tolak</button>
                                <button type="button" data-action="approve-approval" data-id="${escapeHTML(item.id)}" class="px-3 py-1 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700">Setujui</button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }

            function processApproval(id, action) {
                const idx = approvalQueue.findIndex(a => a.id === id);
                if (idx === -1) return;
                const req = approvalQueue[idx];
                approvalQueue.splice(idx, 1);

                if (action === 'approve') {
                    transactions.unshift({
                        id: createUniqueId('TX', transactions),
                        date: req.date || TODAY_ISO,
                        title: req.title,
                        category: req.category,
                        pic: req.requester,
                        type: 'keluar',
                        amount: req.amount,
                        status: 'Disetujui'
                    });
                    updateAll();
                    notify(`Pengajuan "${req.title}" disetujui (${formatRp(req.amount)}).`, 'success');
                } else {
                    updateAll();
                    notify(`Pengajuan "${req.title}" ditolak.`, 'info');
                }
            }

            function getDueRecord(member) {
                return member.duesByPeriod?.[duesPeriod] || { paid: false, date: '', transactionId: '' };
            }

            function renderDues() {
                const list = document.getElementById('dues-list');
                const progressText = document.getElementById('iuran-progress-text');
                const progressBar = document.getElementById('iuran-progress-bar');
                const periodInput = document.getElementById('dues-period');
                const periodLabel = document.getElementById('widget-iuran-period');
                if (periodInput && periodInput.value !== duesPeriod) periodInput.value = duesPeriod;

                const paidCount = members.filter(m => getDueRecord(m).paid).length;
                const totalCount = members.length;
                const pct = totalCount > 0 ? Math.round((paidCount / totalCount) * 100) : 0;
                if (periodLabel) {
                    const [year, month] = duesPeriod.split('-').map(Number);
                    periodLabel.textContent = new Date(year, month - 1, 1).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
                }

                if (progressText) progressText.textContent = totalCount
                    ? `${paidCount} dari ${totalCount} Anggota (${pct}%)`
                    : 'Belum ada anggota';
                if (progressBar) progressBar.style.width = `${pct}%`;

                if (!list) return;

                const filtered = dueStatusFilter === 'unpaid'
                    ? members.filter(m => !getDueRecord(m).paid)
                    : members;

                if (filtered.length === 0) {
                    list.innerHTML = `<div class="py-8 text-center text-xs text-slate-500">${members.length ? 'Semua anggota sudah melunasi iuran periode ini.' : 'Tambahkan anggota untuk mulai mencatat iuran tim.'}</div>`;
                    return;
                }

                list.innerHTML = filtered.map(m => {
                    const due = getDueRecord(m);
                    const initials = m.name.split(' ').map(x => x[0] || '').join('').slice(0, 2).toUpperCase();
                    const actionBtn = due.paid
                        ? `<button type="button" data-action="toggle-due" data-id="${m.id}" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70 hover:bg-emerald-100 whitespace-nowrap" title="Klik untuk membatalkan pencatatan pembayaran ini">
                            ${icon('check-circle-2', 'w-3.5 h-3.5')} <span>Lunas${due.date ? ` (${escapeHTML(due.date)})` : ''}</span>
                           </button>`
                        : `<button type="button" data-action="toggle-due" data-id="${m.id}" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/80 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-colors whitespace-nowrap">
                            ${icon('clock', 'w-3.5 h-3.5')} <span>Catat Iuran ${formatRp(kasConfig.iuranWajib)}</span>
                           </button>`;

                    return `
                        <div class="flex items-center justify-between gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/40 hover:bg-white transition-colors">
                            <div class="flex items-center gap-2.5 min-w-0">
                                <div class="w-8 h-8 rounded-full ${due.paid ? 'bg-brand-100 text-brand-700' : 'bg-slate-200 text-slate-600'} flex items-center justify-center text-xs font-bold shrink-0">
                                    ${escapeHTML(initials)}
                                </div>
                                <div class="min-w-0">
                                    <p class="text-xs sm:text-sm font-semibold text-slate-800 truncate">${escapeHTML(m.name)}</p>
                                    <p class="text-[11px] text-slate-400 truncate">${escapeHTML(m.role)}</p>
                                </div>
                            </div>
                            <div class="shrink-0">${actionBtn}</div>
                        </div>
                    `;
                }).join('');
            }

            function toggleDue(memberId) {
                const m = members.find(x => x.id === Number(memberId));
                if (!m) return;
                const previous = getDueRecord(m);
                let legacyAdjusted = false;
                if (!m.duesByPeriod) m.duesByPeriod = {};

                if (previous.paid) {
                    if (previous.transactionId) {
                        transactions = transactions.filter(tx => tx.id !== previous.transactionId);
                    } else if (previous.legacy) {
                        const batch = transactions.find(tx =>
                            tx.duesPeriod === duesPeriod &&
                            Array.isArray(tx.duesMembers) &&
                            tx.duesMembers.some(id => Number(id) === Number(m.id))
                        );
                        if (batch) {
                            batch.duesMembers = batch.duesMembers.filter(id => Number(id) !== Number(m.id));
                            batch.amount = Math.max(0, batch.amount - batch.duesAmountPerMember);
                            batch.title = batch.title.replace(/\(\d+ Anggota\)/, `(${batch.duesMembers.length} Anggota)`);
                            if (batch.duesMembers.length === 0 || batch.amount === 0) {
                                transactions = transactions.filter(tx => tx.id !== batch.id);
                            }
                            legacyAdjusted = true;
                        }
                    }
                    m.duesByPeriod[duesPeriod] = { paid: false, date: '', transactionId: '' };
                    if (!previous.legacy) notify(`Pencatatan iuran ${m.name} dibatalkan.`, 'info');
                    else if (legacyAdjusted) notify(`Iuran ${m.name} dibatalkan dan nilai transaksi gabungan disesuaikan.`, 'info');
                    else notify('Status iuran contoh diperbarui, tetapi transaksi gabungan tidak ditemukan. Periksa riwayat kas.', 'warning');
                } else {
                    const transactionId = createUniqueId('TX', transactions);
                    transactions.unshift({
                        id: transactionId,
                        date: TODAY_ISO,
                        title: `Iuran Wajib ${duesPeriod} — ${m.name}`,
                        category: 'Iuran Anggota',
                        pic: m.name,
                        type: 'masuk',
                        amount: kasConfig.iuranWajib,
                        status: 'Disetujui',
                        duesMemberId: m.id,
                        duesPeriod
                    });
                    m.duesByPeriod[duesPeriod] = {
                        paid: true,
                        date: formatDateID(TODAY_ISO),
                        transactionId
                    };
                    notify(`Iuran ${m.name} (${formatRp(kasConfig.iuranWajib)}) ditandai LUNAS!`, 'success');
                }
                updateAll();
            }

            function handleAddMember(e) {
                e.preventDefault();
                const nameInput = document.getElementById('new-member-name');
                const roleInput = document.getElementById('new-member-role');
                const name = nameInput ? nameInput.value.trim() : '';
                const role = (roleInput ? roleInput.value.trim() : '') || 'Anggota Tim';

                if (!name) {
                    notify('Masukkan nama anggota terlebih dahulu.', 'warning');
                    return;
                }
                if (members.some(member => member.name.toLocaleLowerCase('id-ID') === name.toLocaleLowerCase('id-ID'))) {
                    notify(`Anggota "${name}" sudah terdaftar.`, 'warning');
                    return;
                }

                const nextId = members.reduce((max, m) => Math.max(max, m.id), 0) + 1;
                members.push({
                    id: nextId,
                    name: name,
                    role: role,
                    duesByPeriod: {}
                });

                if (nameInput) nameInput.value = '';
                if (roleInput) roleInput.value = '';
                updateAll();
                notify(`Anggota baru "${name}" berhasil ditambahkan ke TEAM ONLINE.`, 'success');
            }

            // ==========================================
            // 8. TRANSACTIONS TABLE & HISTORICAL MODAL
            // ==========================================
            function getVisibleTransactionsForTable() {
                const searchInput = document.getElementById('tx-search');
                const q = searchInput ? searchInput.value.toLowerCase().trim() : '';

                let list = getFilteredTransactions();
                if (txTypeFilter !== 'all') {
                    list = list.filter(t => t.type === txTypeFilter);
                }
                if (q) {
                    list = list.filter(t =>
                        t.title.toLowerCase().includes(q) ||
                        t.pic.toLowerCase().includes(q) ||
                        t.category.toLowerCase().includes(q) ||
                        t.id.toLowerCase().includes(q)
                    );
                }
                return list;
            }

            function renderTransactions() {
                const tbody = document.getElementById('tx-tbody');
                const empty = document.getElementById('tx-empty');
                if (!tbody || !empty) return;

                const list = getVisibleTransactionsForTable();

                if (list.length === 0) {
                    tbody.innerHTML = '';
                    empty.classList.remove('hidden');
                    return;
                }

                empty.classList.add('hidden');
                tbody.innerHTML = list.map(t => {
                    const isMasuk = t.type === 'masuk';
                    return `
                        <tr class="hover:bg-slate-50/90 transition-colors">
                            <td class="py-3.5 px-5 text-xs text-slate-600 whitespace-nowrap font-semibold">${formatDateID(t.date)}</td>
                            <td class="py-3.5 px-5 max-w-xs">
                                <p class="font-semibold text-slate-800 text-xs sm:text-sm truncate">${escapeHTML(t.title)}</p>
                                <span class="text-[11px] text-slate-400 font-mono">${escapeHTML(t.id)}</span>
                            </td>
                            <td class="py-3.5 px-5 whitespace-nowrap">
                                <span class="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-600">${escapeHTML(t.category)}</span>
                            </td>
                            <td class="py-3.5 px-5 text-xs sm:text-sm text-slate-700 whitespace-nowrap">${escapeHTML(t.pic)}</td>
                            <td class="py-3.5 px-5 whitespace-nowrap">
                                ${isMasuk
                                    ? `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70">Pemasukan</span>`
                                    : `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200/70">Pengeluaran</span>`
                                }
                            </td>
                            <td class="py-3.5 px-5 text-right font-bold text-xs sm:text-sm whitespace-nowrap ${isMasuk ? 'text-emerald-600' : 'text-rose-600'}">
                                ${isMasuk ? '+' : '-'} ${formatRp(t.amount)}
                            </td>
                            <td class="py-3.5 px-5 text-center whitespace-nowrap">
                                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> ${escapeHTML(t.status)}
                                </span>
                            </td>
                            <td class="py-3.5 px-4 text-center whitespace-nowrap">
                                <button type="button" data-action="delete-tx" data-id="${escapeHTML(t.id)}" class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors" title="Hapus Transaksi">
                                    ${icon('trash-2', 'w-4 h-4')}
                                </button>
                            </td>
                        </tr>
                    `;
                }).join('');
            }

            function deleteTransaction(txId) {
                const idx = transactions.findIndex(t => t.id === txId);
                if (idx === -1) return;
                const removed = transactions[idx];
                if (!window.confirm(`Hapus transaksi "${removed.title}" sebesar ${formatRp(removed.amount)}? Saldo kas akan ikut berubah.`)) return;
                transactions.splice(idx, 1);
                if (Array.isArray(removed.duesMembers)) {
                    removed.duesMembers.forEach(memberId => {
                        const member = members.find(item => Number(item.id) === Number(memberId));
                        if (member?.duesByPeriod?.[removed.duesPeriod]) {
                            member.duesByPeriod[removed.duesPeriod] = { paid: false, date: '', transactionId: '' };
                        }
                    });
                }
                if (removed.duesMemberId !== undefined && removed.duesPeriod) {
                    const member = members.find(item => Number(item.id) === Number(removed.duesMemberId));
                    if (member?.duesByPeriod?.[removed.duesPeriod]) {
                        member.duesByPeriod[removed.duesPeriod] = { paid: false, date: '', transactionId: '' };
                    }
                }
                updateAll();
                notify(`Transaksi "${removed.title}" dihapus dari buku kas.`, 'info');
            }

            function syncModalCategories() {
                const checkedRadio = document.querySelector('input[name="txType"]:checked');
                const type = checkedRadio ? checkedRadio.value : 'masuk';
                const catSelect = document.getElementById('m-category');
                const hint = document.getElementById('m-limit-hint');
                const limitValEl = document.getElementById('m-limit-val');

                if (limitValEl) limitValEl.textContent = formatRp(kasConfig.limitTanpaApproval);
                if (!catSelect) return;

                if (type === 'masuk') {
                    catSelect.innerHTML = `
                        <option value="Iuran Anggota">Iuran Anggota</option>
                        <option value="Sponsor/Project">Sponsor/Project</option>
                        <option value="Lain-lain">Lain-lain</option>
                    `;
                    if (hint) hint.classList.add('hidden');
                } else {
                    catSelect.innerHTML = `
                        <option value="Operasional Server">Operasional Server</option>
                        <option value="Konsumsi Rapat">Konsumsi Rapat</option>
                        <option value="Perlengkapan Tim">Perlengkapan Tim</option>
                        <option value="Lain-lain">Lain-lain</option>
                    `;
                    if (hint) hint.classList.remove('hidden');
                }
            }

            function openTxModal() {
                const dateInput = document.getElementById('m-date');
                if (dateInput) dateInput.value = TODAY_ISO;
                syncModalCategories();

                const modal = document.getElementById('tx-modal');
                if (modal) {
                    modal.classList.remove('hidden');
                    modal.classList.add('flex');
                }
            }

            function closeTxModal() {
                const modal = document.getElementById('tx-modal');
                const form = document.getElementById('tx-form');
                const hint = document.getElementById('m-limit-hint');

                if (modal) {
                    modal.classList.add('hidden');
                    modal.classList.remove('flex');
                }
                if (form) form.reset();
                if (hint) hint.classList.add('hidden');
            }

            function handleSaveTransaction(keepOpen) {
                const form = document.getElementById('tx-form');
                if (form && !form.checkValidity()) {
                    form.reportValidity();
                    return;
                }

                const checkedRadio = document.querySelector('input[name="txType"]:checked');
                const type = checkedRadio ? checkedRadio.value : 'masuk';
                const title = (document.getElementById('m-title')?.value || '').trim();
                const amount = parseCurrency(document.getElementById('m-amount')?.value);
                const date = document.getElementById('m-date')?.value || '';
                const category = document.getElementById('m-category')?.value || 'Lain-lain';
                const pic = (document.getElementById('m-pic')?.value || '').trim() || 'Anggota Tim';

                if (!title) {
                    notify('Keterangan transaksi wajib diisi.', 'warning');
                    return;
                }
                if (amount <= 0) {
                    notify('Masukkan nominal Rupiah yang valid (lebih dari 0).', 'warning');
                    return;
                }
                if (!date) {
                    notify('Pilih tanggal transaksi terlebih dahulu.', 'warning');
                    return;
                }

                // Transaksi baru hari ini/ke depan di atas limit masuk Persetujuan; data historis (tanggal lampau) langsung tercatat
                const isHistorical = date < TODAY_ISO;
                if (!isHistorical && type === 'keluar' && amount > kasConfig.limitTanpaApproval) {
                    approvalQueue.unshift({
                        id: createUniqueId('REQ', approvalQueue),
                        title: title,
                        requester: pic,
                        role: 'Anggota TEAM ONLINE',
                        date: date,
                        category: category,
                        amount: amount
                    });

                    if (!keepOpen) {
                        closeTxModal();
                    } else {
                        document.getElementById('m-title').value = '';
                        document.getElementById('m-amount').value = '';
                        document.getElementById('m-title').focus();
                    }
                    updateAll();
                    notify(`Nominal melebihi batas ${formatRp(kasConfig.limitTanpaApproval)}. Dimasukkan ke antrean Persetujuan.`, 'warning');
                    return;
                }

                transactions.unshift({
                    id: createUniqueId('TX', transactions),
                    date: date,
                    title: title,
                    category: category,
                    pic: pic,
                    type: type,
                    amount: amount,
                    status: 'Disetujui'
                });

                // Otomatis perluas rentang filter jika tanggal transaksi historis berada di luar filter aktif
                let rangeExpanded = false;
                if (dateFilter.startDate && date < dateFilter.startDate) {
                    dateFilter.startDate = date;
                    dateFilter.preset = 'custom';
                    const sIn = document.getElementById('filter-start-date');
                    if (sIn) sIn.value = date;
                    rangeExpanded = true;
                }
                if (dateFilter.endDate && date > dateFilter.endDate) {
                    dateFilter.endDate = date;
                    dateFilter.preset = 'custom';
                    const eIn = document.getElementById('filter-end-date');
                    if (eIn) eIn.value = date;
                    rangeExpanded = true;
                }

                updatePresetButtonsUI();
                updateAll();

                if (keepOpen) {
                    document.getElementById('m-title').value = '';
                    document.getElementById('m-amount').value = '';
                    document.getElementById('m-title').focus();
                    notify(`Tersimpan (${formatDateID(date)})! Lanjut input data berikutnya.`, 'success');
                } else {
                    closeTxModal();
                    const extraInfo = rangeExpanded ? ' Rentang filter otomatis diperluas.' : '';
                    notify(`Transaksi "${title}" (${formatDateID(date)}) berhasil dicatat!${extraInfo}`, 'success');
                }
            }

            // ==========================================
            // 9. NAVIGATION & CSV EXPORT
            // ==========================================
            function toggleSidebar(forceClose = false) {
                const sb = document.getElementById('sidebar');
                const bd = document.getElementById('sidebar-backdrop');
                if (!sb || !bd) return;

                if (forceClose) {
                    sb.classList.add('-translate-x-full');
                    bd.classList.add('hidden');
                    return;
                }

                const willOpen = sb.classList.contains('-translate-x-full');
                sb.classList.toggle('-translate-x-full', !willOpen);
                bd.classList.toggle('hidden', !willOpen);
            }

            function switchTab(tab) {
                activeTab = tab;
                document.querySelectorAll('.nav-item').forEach(btn => {
                    if (btn.dataset.tab === tab) {
                        btn.className = 'nav-item w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm font-medium bg-brand-600 text-white shadow-sm transition-colors';
                    } else {
                        btn.className = 'nav-item w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors';
                    }
                });

                const vFilter = document.getElementById('view-filter-bar');
                const vKpi = document.getElementById('view-kpi');
                const vCharts = document.getElementById('view-charts');
                const vWidgets = document.getElementById('view-widgets');
                const cApproval = document.getElementById('card-approval');
                const cIuran = document.getElementById('card-iuran');
                const vSetting = document.getElementById('view-pengaturan');
                const vTx = document.getElementById('view-transaksi');

                const hTitle = document.getElementById('header-title');
                const hSub = document.getElementById('header-subtitle');

                // Reset visibility
                [vFilter, vKpi, vCharts, vWidgets, cApproval, cIuran, vSetting, vTx].forEach(el => {
                    if (el) el.classList.remove('hidden');
                });
                if (vWidgets) vWidgets.className = 'grid grid-cols-1 lg:grid-cols-2 gap-6';

                if (tab === 'ringkasan') {
                    if (hTitle) hTitle.textContent = 'Ringkasan Kas — TEAM ONLINE';
                    if (hSub) hSub.textContent = 'Pantau saldo kas, arus pemasukan, pengeluaran, dan batas minimal kas tim.';
                } else if (tab === 'transaksi') {
                    if (hTitle) hTitle.textContent = 'Riwayat Transaksi — TEAM ONLINE';
                    if (hSub) hSub.textContent = 'Daftar lengkap mutasi kas masuk & keluar sesuai rentang tanggal terpilih.';
                    [vKpi, vCharts, vWidgets, vSetting].forEach(el => el && el.classList.add('hidden'));
                } else if (tab === 'iuran') {
                    if (hTitle) hTitle.textContent = 'Iuran Anggota — TEAM ONLINE';
                    if (hSub) hSub.textContent = 'Kelola status pelunasan iuran bulanan dan daftar anggota tim.';
                    [vFilter, vKpi, vCharts, cApproval, vSetting, vTx].forEach(el => el && el.classList.add('hidden'));
                    if (vWidgets) vWidgets.className = 'grid grid-cols-1 gap-6';
                } else if (tab === 'persetujuan') {
                    if (hTitle) hTitle.textContent = 'Persetujuan Dana — TEAM ONLINE';
                    if (hSub) hSub.textContent = 'Tinjau pengajuan pengeluaran di atas batas otomatis.';
                    [vFilter, vKpi, vCharts, cIuran, vSetting, vTx].forEach(el => el && el.classList.add('hidden'));
                    if (vWidgets) vWidgets.className = 'grid grid-cols-1 gap-6';
                } else if (tab === 'pengaturan') {
                    if (hTitle) hTitle.textContent = 'Pengaturan Kas — TEAM ONLINE';
                    if (hSub) hSub.textContent = 'Atur nominal minimal saldo kas aman, iuran wajib, dan limit persetujuan.';
                    [vFilter, vKpi, vCharts, vWidgets, vTx].forEach(el => el && el.classList.add('hidden'));
                }

                if (window.innerWidth < 1024) {
                    toggleSidebar(true);
                }
            }

            function exportExcel() {
                const periodTransactions = getFilteredTransactions();
                const chronologicalTransactions = [...periodTransactions].sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
                const income = periodTransactions
                    .filter(tx => tx.type === 'masuk')
                    .reduce((sum, tx) => sum + Number(tx.amount), 0);
                const expenses = periodTransactions
                    .filter(tx => tx.type === 'keluar')
                    .reduce((sum, tx) => sum + Number(tx.amount), 0);
                const beforePeriod = transactions
                    .filter(tx => dateFilter.startDate && tx.date < dateFilter.startDate)
                    .reduce((balance, tx) => balance + (tx.type === 'masuk' ? Number(tx.amount) : -Number(tx.amount)), kasConfig.openingBalance);
                const closingBalance = beforePeriod + income - expenses;
                let runningBalance = beforePeriod;

                const escapeXml = value => String(value ?? '')
                    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g, '')
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&apos;');
                const stringCell = value => `<Cell><Data ss:Type="String">${escapeXml(value)}</Data></Cell>`;
                const numberCell = value => `<Cell ss:StyleID="Currency"><Data ss:Type="Number">${Number(value) || 0}</Data></Cell>`;
                const row = cells => `<Row>${cells.join('')}</Row>`;
                const summaryRows = [
                    row([stringCell('Rekap Kas Team'), stringCell('')]),
                    row([stringCell('Periode'), stringCell(`${formatDateID(dateFilter.startDate)} - ${formatDateID(dateFilter.endDate)}`)]),
                    row([stringCell('Jumlah Transaksi'), numberCell(periodTransactions.length)]),
                    row([stringCell('Saldo Awal Kas (pengaturan)'), numberCell(kasConfig.openingBalance)]),
                    row([stringCell('Saldo Sebelum Periode'), numberCell(beforePeriod)]),
                    row([stringCell('Total Pemasukan'), numberCell(income)]),
                    row([stringCell('Total Pengeluaran'), numberCell(expenses)]),
                    row([stringCell('Arus Kas Bersih'), numberCell(income - expenses)]),
                    row([stringCell('Saldo Akhir Periode'), numberCell(closingBalance)])
                ];
                const transactionRows = [
                    row(['ID Transaksi', 'Tanggal', 'Keterangan', 'Kategori', 'PIC', 'Jenis', 'Pemasukan', 'Pengeluaran', 'Saldo Setelah Transaksi', 'Status'].map(stringCell)),
                    ...chronologicalTransactions.map(tx => {
                        const amount = Number(tx.amount);
                        runningBalance += tx.type === 'masuk' ? amount : -amount;
                        return row([
                            stringCell(tx.id),
                            stringCell(tx.date),
                            stringCell(tx.title),
                            stringCell(tx.category),
                            stringCell(tx.pic),
                            stringCell(tx.type === 'masuk' ? 'Pemasukan' : 'Pengeluaran'),
                            numberCell(tx.type === 'masuk' ? amount : 0),
                            numberCell(tx.type === 'keluar' ? amount : 0),
                            numberCell(runningBalance),
                            stringCell(tx.status)
                        ]);
                    })
                ];
                const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
    <Styles>
        <Style ss:ID="Default" ss:Name="Normal"><Alignment ss:Vertical="Center"/><Font ss:FontName="Calibri" ss:Size="11"/></Style>
        <Style ss:ID="Header"><Font ss:Bold="1" ss:Color="#FFFFFF"/><Interior ss:Color="#4F46E5" ss:Pattern="Solid"/><Alignment ss:Vertical="Center"/></Style>
        <Style ss:ID="Title"><Font ss:Bold="1" ss:Size="16" ss:Color="#1E1B4B"/></Style>
        <Style ss:ID="Currency"><NumberFormat ss:Format="&quot;Rp&quot; #,##0;[Red]-&quot;Rp&quot; #,##0"/></Style>
    </Styles>
    <Worksheet ss:Name="Ringkasan">
        <Table>
            <Column ss:Width="230"/><Column ss:Width="220"/>
            <Row ss:StyleID="Title"><Cell><Data ss:Type="String">Rekap Kas Team</Data></Cell></Row>
            ${summaryRows.slice(1).join('\n            ')}
        </Table>
        <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel"><FreezePanes/><FrozenNoSplit/><SplitHorizontal>2</SplitHorizontal><TopRowBottomPane>2</TopRowBottomPane></WorksheetOptions>
    </Worksheet>
    <Worksheet ss:Name="Transaksi">
        <Table>
            <Column ss:Width="100"/><Column ss:Width="90"/><Column ss:Width="260"/><Column ss:Width="150"/><Column ss:Width="160"/><Column ss:Width="100"/><Column ss:Width="120"/><Column ss:Width="120"/><Column ss:Width="160"/><Column ss:Width="110"/>
            ${transactionRows[0].replace(/<Cell>/g, '<Cell ss:StyleID="Header">')}
            ${transactionRows.slice(1).join('\n            ')}
        </Table>
        <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel"><FreezePanes/><FrozenNoSplit/><SplitHorizontal>1</SplitHorizontal><TopRowBottomPane>1</TopRowBottomPane><AutoFilter x:Range="R1C1:R${transactionRows.length}C10" xmlns="urn:schemas-microsoft-com:office:excel"/></WorksheetOptions>
    </Worksheet>
</Workbook>`;
                const file = new Blob([xml], { type: 'application/vnd.ms-excel;charset=utf-8' });
                const url = URL.createObjectURL(file);
                const link = document.createElement('a');
                link.href = url;
                link.download = `Rekap_Kas_TEAM_ONLINE_${dateFilter.startDate}_sd_${dateFilter.endDate}.xls`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setTimeout(() => URL.revokeObjectURL(url), 1000);
                notify(`Rekap Excel (${dateFilter.startDate} s/d ${dateFilter.endDate}) berhasil diunduh.`, 'success');
            }

            function updateAll() {
                saveState();
                refreshKPIs();
                renderCharts();
                renderApprovals();
                renderDues();
                renderTransactions();
            }

            function exportBackup() {
                const backup = {
                    format: 'team-online-cash-backup',
                    version: 1,
                    exportedAt: new Date().toISOString(),
                    transactions,
                    approvalQueue,
                    members,
                    kasConfig,
                    duesPeriod
                };
                const file = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(file);
                const link = document.createElement('a');
                link.href = url;
                link.download = `Backup_Kas_TEAM_ONLINE_${TODAY_ISO}.json`;
                document.body.appendChild(link);
                link.click();
                link.remove();
                setTimeout(() => URL.revokeObjectURL(url), 1000);
                notify('Backup data kas berhasil diunduh.', 'success');
            }

            function isValidTransaction(item) {
                return item && typeof item.id === 'string' && item.id.trim() &&
                    isValidIsoDate(item.date) &&
                    typeof item.title === 'string' && item.title.trim() &&
                    typeof item.category === 'string' && typeof item.pic === 'string' &&
                    (item.type === 'masuk' || item.type === 'keluar') &&
                    Number.isFinite(Number(item.amount)) && Number(item.amount) > 0;
            }

            function isValidIsoDate(value) {
                if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
                const date = new Date(`${value}T00:00:00`);
                return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
            }

            function hasUniqueIds(records, getId = item => item.id) {
                const ids = records.map(item => String(getId(item)));
                return new Set(ids).size === ids.length;
            }

            function importBackup(event) {
                const input = event.target;
                const file = input.files?.[0];
                if (!file) return;
                if (file.size > 10 * 1024 * 1024) {
                    notify('Ukuran file backup terlalu besar (maksimal 10 MB).', 'warning');
                    input.value = '';
                    return;
                }

                const reader = new FileReader();
                reader.onload = () => {
                    try {
                        const backup = JSON.parse(String(reader.result || ''));
                        const config = backup?.kasConfig;
                        const configIsValid = config && typeof config === 'object' &&
                            Number.isFinite(Number(config.minSaldo)) && Number(config.minSaldo) >= 0 &&
                            Number.isFinite(Number(config.iuranWajib)) && Number(config.iuranWajib) > 0 &&
                            Number.isFinite(Number(config.limitTanpaApproval)) && Number(config.limitTanpaApproval) >= 0 &&
                            (config.openingBalance === undefined ||
                                (Number.isFinite(Number(config.openingBalance)) && Number(config.openingBalance) >= 0));
                        const valid = backup &&
                            (backup.format === undefined || backup.format === 'team-online-cash-backup') &&
                            (backup.version === undefined || backup.version === 1) &&
                            Array.isArray(backup.transactions) &&
                            Array.isArray(backup.approvalQueue) &&
                            Array.isArray(backup.members) &&
                            backup.transactions.every(isValidTransaction) &&
                            hasUniqueIds(backup.transactions) &&
                            backup.approvalQueue.every(item =>
                                item && typeof item.id === 'string' && typeof item.title === 'string' &&
                                typeof item.requester === 'string' && typeof item.role === 'string' &&
                                typeof item.category === 'string' && isValidIsoDate(item.date) &&
                                Number.isFinite(Number(item.amount)) && Number(item.amount) > 0
                            ) &&
                            hasUniqueIds(backup.approvalQueue) &&
                            backup.members.every(item =>
                                item && Number.isFinite(Number(item.id)) &&
                                typeof item.name === 'string' && item.name.trim() &&
                                (item.role === undefined || typeof item.role === 'string') &&
                                (!item.duesByPeriod || (typeof item.duesByPeriod === 'object' && !Array.isArray(item.duesByPeriod)))
                            ) &&
                            hasUniqueIds(backup.members, item => Number(item.id)) &&
                            configIsValid;
                        if (!valid) throw new Error('Struktur data tidak sesuai backup kas.');

                        if (!window.confirm('Pulihkan backup akan mengganti seluruh data kas di browser ini. Lanjutkan?')) return;

                        transactions = backup.transactions;
                        approvalQueue = backup.approvalQueue;
                        members = backup.members;
                        kasConfig = {
                            openingBalance: Number.isFinite(Number(backup.kasConfig.openingBalance))
                                ? Number(backup.kasConfig.openingBalance)
                                : INITIAL_BALANCE,
                            minSaldo: Number.isFinite(Number(backup.kasConfig.minSaldo))
                                ? Number(backup.kasConfig.minSaldo)
                                : 10000000,
                            iuranWajib: Number.isFinite(Number(backup.kasConfig.iuranWajib))
                                ? Number(backup.kasConfig.iuranWajib)
                                : 250000,
                            limitTanpaApproval: Number.isFinite(Number(backup.kasConfig.limitTanpaApproval))
                                ? Number(backup.kasConfig.limitTanpaApproval)
                                : 500000
                        };
                        duesPeriod = /^\d{4}-(0[1-9]|1[0-2])$/.test(backup.duesPeriod)
                            ? backup.duesPeriod
                            : CURRENT_MONTH;
                        normalizeMemberDues();
                        syncSavedSettingsInputs();
                        selectDatePreset('semua');
                        updateAll();
                        notify('Backup berhasil dipulihkan.', 'success');
                    } catch (error) {
                        console.error('Pemulihan backup gagal.', error);
                        notify('File backup tidak valid atau rusak. Data yang ada tidak diubah.', 'warning');
                    } finally {
                        input.value = '';
                    }
                };
                reader.onerror = () => {
                    notify('File backup tidak bisa dibaca.', 'warning');
                    input.value = '';
                };
                reader.readAsText(file);
            }

            function syncSavedSettingsInputs() {
                const openingInput = document.getElementById('input-opening-balance');
                const minInput = document.getElementById('input-min-saldo');
                const duesInput = document.getElementById('input-iuran-wajib');
                const limitInput = document.getElementById('input-limit-auto');
                if (openingInput) openingInput.value = formatThousand(kasConfig.openingBalance) || '0';
                if (minInput) minInput.value = formatThousand(kasConfig.minSaldo);
                if (duesInput) duesInput.value = formatThousand(kasConfig.iuranWajib);
                if (limitInput) limitInput.value = formatThousand(kasConfig.limitTanpaApproval);
            }

            // ==========================================
            // 10. EVENT BINDINGS ON DOMCONTENTLOADED
            // ==========================================
            document.addEventListener('DOMContentLoaded', () => {
                hydrateStaticIcons();
                syncSavedSettingsInputs();
                selectDatePreset('semua');
                const duesPeriodInput = document.getElementById('dues-period');
                if (duesPeriodInput) duesPeriodInput.value = duesPeriod;
                updatePresetButtonsUI();
                updateAll();

                // Sidebar open/close
                document.getElementById('btn-open-sidebar')?.addEventListener('click', () => toggleSidebar());
                document.getElementById('btn-close-sidebar')?.addEventListener('click', () => toggleSidebar(true));
                document.getElementById('sidebar-backdrop')?.addEventListener('click', () => toggleSidebar(true));

                // Sidebar navigation delegation
                document.getElementById('sidebar-nav')?.addEventListener('click', e => {
                    const btn = e.target.closest('[data-action="switch-tab"]');
                    if (btn && btn.dataset.tab) switchTab(btn.dataset.tab);
                });

                // KPI shortcut to settings
                document.getElementById('btn-kpi-goto-settings')?.addEventListener('click', () => switchTab('pengaturan'));

                // Header actions
                document.getElementById('btn-export-excel')?.addEventListener('click', exportExcel);
                document.getElementById('btn-open-tx-modal')?.addEventListener('click', openTxModal);

                // Date preset buttons delegation
                document.getElementById('preset-buttons-container')?.addEventListener('click', e => {
                    const btn = e.target.closest('[data-action="preset-date"]');
                    if (btn && btn.dataset.preset) selectDatePreset(btn.dataset.preset);
                });

                // Custom date inputs & buttons
                const onCustomInputChange = () => {
                    dateFilter.preset = 'custom';
                    updatePresetButtonsUI();
                };
                document.getElementById('filter-start-date')?.addEventListener('change', onCustomInputChange);
                document.getElementById('filter-end-date')?.addEventListener('change', onCustomInputChange);
                document.getElementById('btn-apply-custom-date')?.addEventListener('click', applyCustomDateFilter);
                document.getElementById('btn-reset-custom-date')?.addEventListener('click', () => selectDatePreset('semua'));

                // Live thousand-separator formatting for all currency inputs
                document.addEventListener('input', e => {
                    if (e.target && e.target.classList && e.target.classList.contains('currency-input')) {
                        const formatted = formatThousand(e.target.value);
                        e.target.value = formatted;
                    }
                });

                // Approvals event delegation
                document.getElementById('approval-list')?.addEventListener('click', e => {
                    const approveBtn = e.target.closest('[data-action="approve-approval"]');
                    if (approveBtn && approveBtn.dataset.id) {
                        processApproval(approveBtn.dataset.id, 'approve');
                        return;
                    }
                    const rejectBtn = e.target.closest('[data-action="reject-approval"]');
                    if (rejectBtn && rejectBtn.dataset.id) {
                        processApproval(rejectBtn.dataset.id, 'reject');
                    }
                });

                // Member dues filter & toggle delegation
                document.getElementById('due-filter-group')?.addEventListener('click', e => {
                    const btn = e.target.closest('[data-action="filter-dues"]');
                    if (!btn || !btn.dataset.mode) return;
                    dueStatusFilter = btn.dataset.mode;

                    const btnAll = document.getElementById('btn-due-all');
                    const btnUnpaid = document.getElementById('btn-due-unpaid');
                    if (btnAll) {
                        btnAll.className = dueStatusFilter === 'all'
                            ? 'px-2.5 py-1 rounded-lg font-semibold bg-white text-slate-800 shadow-2xs'
                            : 'px-2.5 py-1 rounded-lg font-medium text-slate-500 hover:text-slate-800';
                    }
                    if (btnUnpaid) {
                        btnUnpaid.className = dueStatusFilter === 'unpaid'
                            ? 'px-2.5 py-1 rounded-lg font-semibold bg-white text-slate-800 shadow-2xs'
                            : 'px-2.5 py-1 rounded-lg font-medium text-slate-500 hover:text-slate-800';
                    }
                    renderDues();
                });

                document.getElementById('dues-period')?.addEventListener('change', e => {
                    if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(e.target.value)) {
                        e.target.value = duesPeriod;
                        notify('Pilih periode iuran yang valid.', 'warning');
                        return;
                    }
                    duesPeriod = e.target.value;
                    updateAll();
                });

                document.getElementById('dues-list')?.addEventListener('click', e => {
                    const btn = e.target.closest('[data-action="toggle-due"]');
                    if (btn && btn.dataset.id) toggleDue(btn.dataset.id);
                });

                document.getElementById('add-member-form')?.addEventListener('submit', handleAddMember);

                // Kas settings form
                document.getElementById('kas-settings-form')?.addEventListener('submit', handleSaveKasSettings);
                document.getElementById('btn-reset-kas-settings')?.addEventListener('click', handleResetKasSettings);
                document.getElementById('btn-export-backup')?.addEventListener('click', exportBackup);
                document.getElementById('btn-import-backup')?.addEventListener('click', () => document.getElementById('backup-file')?.click());
                document.getElementById('backup-file')?.addEventListener('change', importBackup);

                // Transactions search, filter, and delete delegation
                document.getElementById('tx-search')?.addEventListener('input', renderTransactions);
                document.getElementById('tx-type-filter-group')?.addEventListener('click', e => {
                    const btn = e.target.closest('[data-action="filter-tx-type"]');
                    if (!btn || !btn.dataset.type) return;
                    txTypeFilter = btn.dataset.type;

                    document.querySelectorAll('.tx-tab-btn').forEach(tabBtn => {
                        tabBtn.className = tabBtn.dataset.type === txTypeFilter
                            ? 'tx-tab-btn px-3 py-1.5 rounded-lg bg-white text-slate-900 shadow-2xs font-semibold'
                            : 'tx-tab-btn px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-800';
                    });
                    renderTransactions();
                });

                document.getElementById('tx-tbody')?.addEventListener('click', e => {
                    const delBtn = e.target.closest('[data-action="delete-tx"]');
                    if (delBtn && delBtn.dataset.id) deleteTransaction(delBtn.dataset.id);
                });

                // Modal actions
                document.getElementById('btn-close-tx-modal')?.addEventListener('click', closeTxModal);
                document.getElementById('btn-cancel-tx-modal')?.addEventListener('click', closeTxModal);
                document.getElementById('tx-modal')?.addEventListener('click', e => {
                    if (e.target.id === 'tx-modal') closeTxModal();
                });

                document.querySelectorAll('input[name="txType"]').forEach(radio => {
                    radio.addEventListener('change', syncModalCategories);
                });

                document.getElementById('modal-quick-dates')?.addEventListener('click', e => {
                    const chip = e.target.closest('[data-action="modal-quick-date"]');
                    const dateInput = document.getElementById('m-date');
                    if (!chip || !dateInput) return;

                    const when = chip.dataset.when;
                    if (when === 'today') dateInput.value = TODAY_ISO;
                    else if (when === 'last-month') {
                        const previousMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 15);
                        dateInput.value = `${previousMonth.getFullYear()}-${String(previousMonth.getMonth() + 1).padStart(2, '0')}-15`;
                    }                     else if (when === 'current-year') dateInput.value = `${CURRENT_YEAR}-06-15`;
                    else if (when === 'early-current-year') dateInput.value = `${CURRENT_YEAR}-01-10`;
                });

                document.getElementById('tx-form')?.addEventListener('submit', e => {
                    e.preventDefault();
                    handleSaveTransaction(false);
                });

                document.getElementById('btn-save-add-another')?.addEventListener('click', () => {
                    handleSaveTransaction(true);
                });

                window.addEventListener('storage', event => {
                    if (event.key !== STORAGE_KEY || !event.newValue) return;
                    loadSavedState();
                    syncSavedSettingsInputs();
                    const periodInput = document.getElementById('dues-period');
                    if (periodInput) periodInput.value = duesPeriod;
                    selectDatePreset('semua');
                    notify('Data kas diperbarui dari tab browser lain.', 'info');
                });
            });
        })();
