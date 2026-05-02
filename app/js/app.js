/**
 * K4 - Kelola Keuangan Kas Kelas
 * Main Application JavaScript
 * Version: 1.0.0
 */

// ==================== CONSTANTS ====================
const STORAGE_KEYS = {
    USER: 'k4_user',
    TRANSACTIONS: 'k4_transactions',
    MEMBERS: 'k4_members',
    CATEGORIES: 'k4_categories',
    SETTINGS: 'k4_settings',
    KAS_BULANAN: 'k4_kas_bulanan',
    ONBOARDING: 'k4_onboarding_complete',
    BACKUP: 'k4_backup_date'
};

const DEFAULT_CATEGORIES = {
    income: [
        { id: 'kas', name: 'Kas Bulanan', icon: '🎓', color: '#6366F1' },
        { id: 'sumbangan', name: 'Sumbangan', icon: '🎁', color: '#10B981' },
        { id: 'penjualan', name: 'Penjualan', icon: '🛒', color: '#F59E0B' },
        { id: 'lainnya_in', name: 'Lainnya', icon: '📦', color: '#64748B' }
    ],
    expense: [
        { id: 'konsumsi', name: 'Konsumsi', icon: '🍕', color: '#EF4444' },
        { id: 'atk', name: 'ATK', icon: '✏️', color: '#8B5CF6' },
        { id: 'kebersihan', name: 'Kebersihan', icon: '🧹', color: '#06B6D4' },
        { id: 'acara', name: 'Acara', icon: '🎉', color: '#EC4899' },
        { id: 'lainnya_out', name: 'Lainnya', icon: '📦', color: '#64748B' }
    ]
};

// ==================== STATE ====================
let appState = {
    user: null,
    transactions: [],
    members: [],
    categories: DEFAULT_CATEGORIES,
    settings: {
        darkMode: false,
        accentColor: 'indigo',
        pinEnabled: false,
        pin: null,
        currency: 'Rp',
        dateFormat: 'DD/MM/YYYY',
        numberFormat: 'dot'
    },
    kasBulanan: [],
    currentTransaction: null,
    currentMember: null,
    chartInstances: {}
};

// ==================== UTILITY FUNCTIONS ====================
const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return 'Rp 0';
    const num = parseInt(amount);
    if (appState.settings.numberFormat === 'dot') {
        return 'Rp ' + num.toLocaleString('id-ID');
    }
    return 'Rp ' + num.toLocaleString('en-US');
};

const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
};

const formatDateFull = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
};

const parseAmount = (value) => {
    if (!value) return 0;
    return parseInt(value.toString().replace(/[^0-9]/g, '')) || 0;
};

const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

const showToast = (message, type = 'success') => {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show';
    
    if (type === 'error') {
        toast.style.background = '#DC2626';
    } else if (type === 'warning') {
        toast.style.background = '#D97706';
    } else {
        toast.style.background = '#1E293B';
    }
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
};

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// ==================== STORAGE FUNCTIONS ====================
const saveToStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Storage error:', e);
        showToast('Gagal menyimpan data', 'error');
        return false;
    }
};

const loadFromStorage = (key, defaultValue = null) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
        console.error('Storage error:', e);
        return defaultValue;
    }
};

// ==================== APP INITIALIZATION ====================
const initApp = async () => {
    // Load all data
    appState.user = loadFromStorage(STORAGE_KEYS.USER, null);
    appState.transactions = loadFromStorage(STORAGE_KEYS.TRANSACTIONS, []);
    appState.members = loadFromStorage(STORAGE_KEYS.MEMBERS, []);
    appState.settings = { ...appState.settings, ...loadFromStorage(STORAGE_KEYS.SETTINGS, {}) };
    appState.kasBulanan = loadFromStorage(STORAGE_KEYS.KAS_BULANAN, []);
    
    const savedCategories = loadFromStorage(STORAGE_KEYS.CATEGORIES);
    if (savedCategories) {
        appState.categories = savedCategories;
    }
    
    // Apply theme
    applyTheme();
    
    // Check onboarding
    const onboardingComplete = loadFromStorage(STORAGE_KEYS.ONBOARDING, false);
    
    // Hide loading
    setTimeout(() => {
        document.getElementById('loading').classList.add('hide');
        
        if (!onboardingComplete || !appState.user) {
            showOnboarding();
        } else if (appState.settings.pinEnabled && appState.settings.pin) {
            showPinLock();
        } else {
            showApp();
        }
    }, 1500);
};

const applyTheme = () => {
    if (appState.settings.darkMode) {
        document.body.classList.add('dark');
        document.documentElement.style.setProperty('--bg', '#0F172A');
        document.documentElement.style.setProperty('--card', '#1E293B');
        document.documentElement.style.setProperty('--text', '#F1F5F9');
    } else {
        document.body.classList.remove('dark');
        document.documentElement.style.setProperty('--bg', '#F8FAFC');
        document.documentElement.style.setProperty('--card', '#FFFFFF');
        document.documentElement.style.setProperty('--text', '#1E293B');
    }
    
    // Apply accent color
    const colors = {
        indigo: { primary: '#6366F1', dark: '#4F46E5' },
        emerald: { primary: '#10B981', dark: '#059669' },
        rose: { primary: '#F43F5E', dark: '#E11D48' },
        amber: { primary: '#F59E0B', dark: '#D97706' }
    };
    
    const color = colors[appState.settings.accentColor] || colors.indigo;
    document.documentElement.style.setProperty('--primary', color.primary);
    document.documentElement.style.setProperty('--primary-dark', color.dark);
};

// ==================== ONBOARDING ====================
let onboardingStep = 0;

const showOnboarding = () => {
    document.getElementById('onboarding').style.display = 'flex';
    updateOnboardingSlide();
};

const updateOnboardingSlide = () => {
    document.querySelectorAll('.onboarding-slide').forEach((slide, index) => {
        slide.classList.toggle('hidden', index !== onboardingStep);
    });
    
    document.querySelectorAll('.onboarding-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === onboardingStep);
    });
    
    const nextBtn = document.getElementById('onboarding-next');
    if (onboardingStep === 3) {
        nextBtn.textContent = 'Mulai Menggunakan';
    } else {
        nextBtn.textContent = 'Lanjut';
    }
};

document.getElementById('onboarding-next')?.addEventListener('click', () => {
    if (onboardingStep === 3) {
        // Save setup data
        const nama = document.getElementById('setup-nama').value;
        const kelas = document.getElementById('setup-kelas').value;
        const sekolah = document.getElementById('setup-sekolah').value;
        const nominal = parseAmount(document.getElementById('setup-nominal').value);
        
        if (!nama || !kelas) {
            showToast('Harap isi nama dan kelas', 'warning');
            return;
        }
        
        appState.user = {
            namaLengkap: nama,
            namaPanggilan: nama.split(' ')[0],
            kelas: kelas,
            sekolah: sekolah || '',
            peran: 'Bendahara',
            nominalKas: nominal || 10000
        };
        
        saveToStorage(STORAGE_KEYS.USER, appState.user);
        saveToStorage(STORAGE_KEYS.ONBOARDING, true);
        
        // Start with empty data - no dummy data
        appState.members = [];
        appState.transactions = [];
        saveToStorage(STORAGE_KEYS.MEMBERS, []);
        saveToStorage(STORAGE_KEYS.TRANSACTIONS, []);
        
        document.getElementById('onboarding').style.display = 'none';
        showApp();
    } else {
        onboardingStep++;
        updateOnboardingSlide();
    }
});

// ==================== PIN LOCK ====================
let pinInput = '';

const showPinLock = () => {
    pinInput = '';
    updatePinDisplay();
    document.getElementById('pin-lock').style.display = 'flex';
};

const updatePinDisplay = () => {
    const dots = document.querySelectorAll('#pin-display .pin-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('filled', index < pinInput.length);
    });
};

const handlePinInput = (num) => {
    if (pinInput.length < 6) {
        pinInput += num;
        updatePinDisplay();
        
        if (pinInput.length >= 4) {
            setTimeout(() => checkPin(), 200);
        }
    }
};

const checkPin = () => {
    if (pinInput === appState.settings.pin) {
        document.getElementById('pin-lock').style.display = 'none';
        showApp();
    } else {
        showToast('PIN salah', 'error');
        pinInput = '';
        updatePinDisplay();
    }
};

document.getElementById('pin-pad')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.pin-btn');
    if (!btn) return;
    
    if (btn.id === 'pin-backspace') {
        pinInput = pinInput.slice(0, -1);
        updatePinDisplay();
    } else if (btn.id === 'pin-cancel') {
        pinInput = '';
        updatePinDisplay();
    } else {
        const num = btn.dataset.num;
        if (num) handlePinInput(num);
    }
});

// ==================== APP DISPLAY ====================
const showApp = () => {
    document.getElementById('app').style.display = 'block';
    updateDashboard();
};

// ==================== NAVIGATION ====================
const showPage = (pageName) => {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    document.getElementById(`page-${pageName}`).classList.add('active');
    
    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === pageName) {
            item.classList.add('active');
        }
    });
    
    // Page specific updates
    if (pageName === 'dashboard') {
        updateDashboard();
    } else if (pageName === 'transactions') {
        updateTransactionsList();
    } else if (pageName === 'members') {
        updateMembersList();
    } else if (pageName === 'reports') {
        updateReports();
    } else if (pageName === 'settings') {
        updateSettings();
    }
    
    // Close FAB menu
    const fabMenu = document.getElementById('fab-menu');
    const fabBtn = document.getElementById('fab-btn');
    fabMenu.classList.remove('show');
    fabBtn.classList.remove('expanded');
};

const toggleFab = () => {
    const fabMenu = document.getElementById('fab-menu');
    const fabBtn = document.getElementById('fab-btn');
    fabMenu.classList.toggle('show');
    fabBtn.classList.toggle('expanded');
};

// ==================== MODAL FUNCTIONS ====================
const showModal = (modalId) => {
    document.getElementById(modalId).classList.add('show');
};

const closeModal = (modalId) => {
    document.getElementById(modalId).classList.remove('show');
};

// ==================== DASHBOARD ====================
const updateDashboard = () => {
    // Update header
    if (appState.user) {
        document.getElementById('header-kelas').textContent = appState.user.kelas || '-';
        document.getElementById('header-initial').textContent = getInitials(appState.user.namaPanggilan || appState.user.namaLengkap);
    }
    
    // Calculate totals
    const income = appState.transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    const expense = appState.transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expense;
    
    // Update summary cards
    document.getElementById('total-balance').textContent = formatCurrency(balance);
    document.getElementById('total-income').textContent = formatCurrency(income);
    document.getElementById('total-expense').textContent = formatCurrency(expense);
    
    const incomeCount = appState.transactions.filter(t => t.type === 'income').length;
    const expenseCount = appState.transactions.filter(t => t.type === 'expense').length;
    document.getElementById('income-count').textContent = `${incomeCount} transaksi`;
    document.getElementById('expense-count').textContent = `${expenseCount} transaksi`;
    
    // Update chart
    updateDashboardChart();
    
    // Update recent transactions
    updateRecentTransactions();
    
    // Update kas bulanan
    updateKasBulanan();
};

const updateDashboardChart = () => {
    const ctx = document.getElementById('dashboard-chart');
    if (!ctx) return;
    
    // Get last 7 days data
    const days = [];
    const incomeData = [];
    const expenseData = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        days.push(date.toLocaleDateString('id-ID', { weekday: 'short' }));
        
        const dayIncome = appState.transactions
            .filter(t => t.type === 'income' && t.date === dateStr)
            .reduce((sum, t) => sum + t.amount, 0);
        const dayExpense = appState.transactions
            .filter(t => t.type === 'expense' && t.date === dateStr)
            .reduce((sum, t) => sum + t.amount, 0);
        
        incomeData.push(dayIncome / 1000); // Convert to thousands
        expenseData.push(dayExpense / 1000);
    }
    
    // Destroy existing chart
    if (appState.chartInstances.dashboard) {
        appState.chartInstances.dashboard.destroy();
    }
    
    appState.chartInstances.dashboard = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: days,
            datasets: [
                {
                    label: 'Pemasukan',
                    data: incomeData,
                    backgroundColor: '#10B981',
                    borderRadius: 4
                },
                {
                    label: 'Pengeluaran',
                    data: expenseData,
                    backgroundColor: '#EF4444',
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { boxWidth: 12, font: { size: 11 } }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + 'K';
                        },
                        font: { size: 10 }
                    }
                },
                x: {
                    ticks: { font: { size: 10 } }
                }
            }
        }
    });
};

const updateRecentTransactions = () => {
    const container = document.getElementById('recent-transactions');
    const recent = [...appState.transactions]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
    
    if (recent.length === 0) {
        container.innerHTML = `
            <div class="empty-state py-8">
                <div class="text-6xl mb-4">📭</div>
                <p class="text-slate-500 text-sm">Belum ada transaksi</p>
                <button class="btn-primary px-6 py-2 mt-4 text-sm" onclick="toggleFab(); showTransactionForm('income')">Tambah Transaksi</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = recent.map(t => renderTransactionItem(t)).join('');
};

const renderTransactionItem = (t) => {
    const category = getCategory(t.category, t.type);
    const member = t.relatedMemberId ? appState.members.find(m => m.id === t.relatedMemberId) : null;
    
    return `
        <div class="transaction-item cursor-pointer" onclick="showTransactionDetail('${t.id}')">
            <div class="icon-circle ${t.type}">
                ${category?.icon || '💰'}
            </div>
            <div class="flex-1 min-w-0">
                <div class="font-medium text-slate-800 truncate">${t.description}</div>
                <div class="text-xs text-slate-500">${formatDate(t.date)}${member ? ' • ' + member.panggilan : ''}</div>
            </div>
            <div class="font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}">
                ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount).replace('Rp ', '')}
            </div>
        </div>
    `;
};

const getCategory = (id, type) => {
    const cats = appState.categories[type] || [];
    return cats.find(c => c.id === id);
};

const updateKasBulanan = () => {
    const now = new Date();
    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    document.getElementById('kas-bulan').textContent = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
    
    const nominal = appState.user?.nominalKas || 10000;
    const totalMembers = appState.members.length;
    
    // Count paid members for current month
    const currentMonth = now.toISOString().slice(0, 7); // YYYY-MM
    const paidMembers = appState.transactions.filter(t => 
        t.type === 'income' && 
        t.category === 'kas' &&
        t.date &&
        t.date.startsWith(currentMonth)
    ).length;
    
    const percentage = totalMembers > 0 ? Math.round((paidMembers / totalMembers) * 100) : 0;
    
    document.getElementById('kas-progress-text').textContent = `${paidMembers}/${totalMembers}`;
    document.getElementById('kas-progress-bar').style.width = `${percentage}%`;
    
    // Show unpaid members
    const paidMemberIds = appState.transactions
        .filter(t => t.type === 'income' && t.category === 'kas' && t.date?.startsWith(currentMonth))
        .map(t => t.relatedMemberId);
    
    const unpaidMembers = appState.members.filter(m => !paidMemberIds.includes(m.id));
    
    const unpaidContainer = document.getElementById('kas-unpaid-list');
    if (unpaidMembers.length === 0) {
        unpaidContainer.innerHTML = `<span class="text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">✅ Semua sudah bayar!</span>`;
    } else {
        unpaidContainer.innerHTML = unpaidMembers.map(m => `
            <button class="flex-shrink-0 text-xs text-rose-600 bg-rose-50 px-3 py-1 rounded-full" onclick="quickPayKas('${m.id}')">
                ${m.panggilan}
            </button>
        `).join('');
    }
};

const quickPayKas = (memberId) => {
    const member = appState.members.find(m => m.id === memberId);
    if (!member) return;
    
    const nominal = appState.user?.nominalKas || 10000;
    const today = new Date().toISOString().split('T')[0];
    const time = new Date().toTimeString().slice(0, 5);
    
    const transaction = {
        id: generateId(),
        type: 'income',
        amount: nominal,
        description: `Kas Bulanan - ${member.panggilan || member.nama}`,
        category: 'kas',
        relatedMemberId: memberId,
        date: today,
        time: time,
        notes: '',
        createdAt: new Date().toISOString()
    };
    
    appState.transactions.push(transaction);
    saveToStorage(STORAGE_KEYS.TRANSACTIONS, appState.transactions);
    
    // Update member
    member.totalPaid = (member.totalPaid || 0) + nominal;
    member.lastPaymentDate = new Date().toISOString();
    saveToStorage(STORAGE_KEYS.MEMBERS, appState.members);
    
    showToast(`Kas ${member.panggilan} berhasil dicatat!`);
    updateDashboard();
};

// ==================== TRANSACTIONS ====================
const showTransactionForm = (type = 'income', editId = null) => {
    const isEdit = !!editId;
    const transaction = isEdit ? appState.transactions.find(t => t.id === editId) : null;
    
    document.getElementById('transaction-title').textContent = isEdit ? 'Edit Transaksi' : 'Tambah Transaksi';
    document.getElementById('transaction-id').value = editId || '';
    
    // Set type
    setTransactionType(type || transaction?.type || 'income');
    
    if (transaction) {
        document.getElementById('transaction-amount').value = transaction.amount;
        document.getElementById('transaction-desc').value = transaction.description;
        document.getElementById('transaction-category').value = transaction.category;
        document.getElementById('transaction-member').value = transaction.relatedMemberId || '';
        document.getElementById('transaction-date').value = transaction.date;
        document.getElementById('transaction-time').value = transaction.time;
        document.getElementById('transaction-notes').value = transaction.notes || '';
    } else {
        document.getElementById('transaction-amount').value = '';
        document.getElementById('transaction-desc').value = '';
        document.getElementById('transaction-category').value = '';
        document.getElementById('transaction-member').value = '';
        document.getElementById('transaction-date').value = new Date().toISOString().split('T')[0];
        document.getElementById('transaction-time').value = new Date().toTimeString().slice(0, 5);
        document.getElementById('transaction-notes').value = '';
    }
    
    updateCategoryOptions();
    updateMemberOptions();
    
    showModal('modal-transaction');
};

const setTransactionType = (type) => {
    const btnIncome = document.getElementById('btn-type-income');
    const btnExpense = document.getElementById('btn-type-expense');
    
    if (type === 'income') {
        btnIncome.classList.add('bg-emerald-500', 'text-white');
        btnIncome.classList.remove('text-slate-600');
        btnExpense.classList.remove('bg-rose-500', 'text-white');
        btnExpense.classList.add('text-slate-600');
    } else {
        btnIncome.classList.remove('bg-emerald-500', 'text-white');
        btnIncome.classList.add('text-slate-600');
        btnExpense.classList.add('bg-rose-500', 'text-white');
        btnExpense.classList.remove('text-slate-600');
    }
    
    btnIncome.dataset.type = 'income';
    btnExpense.dataset.type = 'expense';
    
    updateCategoryOptions(type);
};

const updateCategoryOptions = (type) => {
    type = type || document.getElementById('btn-type-income').classList.contains('bg-emerald-500') ? 'income' : 'expense';
    
    const select = document.getElementById('transaction-category');
    const cats = appState.categories[type] || [];
    
    select.innerHTML = '<option value="">Pilih Kategori</option>' +
        cats.map(c => `<option value="${c.id}">${c.icon} ${c.name}</option>`).join('');
};

const updateMemberOptions = () => {
    const select = document.getElementById('transaction-member');
    select.innerHTML = '<option value="">Tidak Ada</option>' +
        appState.members.map(m => `<option value="${m.id}">${m.nama}</option>`).join('');
};

const addQuickAmount = (amount) => {
    const input = document.getElementById('transaction-amount');
    const current = parseAmount(input.value);
    input.value = current + amount;
};

const saveTransaction = () => {
    const id = document.getElementById('transaction-id').value;
    const type = document.getElementById('btn-type-income').classList.contains('bg-emerald-500') ? 'income' : 'expense';
    const amount = parseAmount(document.getElementById('transaction-amount').value);
    const description = document.getElementById('transaction-desc').value.trim();
    const category = document.getElementById('transaction-category').value;
    const memberId = document.getElementById('transaction-member').value || null;
    const date = document.getElementById('transaction-date').value;
    const time = document.getElementById('transaction-time').value;
    const notes = document.getElementById('transaction-notes').value.trim();
    
    // Validation
    if (!amount || amount <= 0) {
        showToast('Masukkan jumlah transaksi', 'warning');
        return;
    }
    if (!description) {
        showToast('Masukkan keterangan transaksi', 'warning');
        return;
    }
    if (!category) {
        showToast('Pilih kategori', 'warning');
        return;
    }
    
    if (id) {
        // Edit existing
        const index = appState.transactions.findIndex(t => t.id === id);
        if (index !== -1) {
            appState.transactions[index] = {
                ...appState.transactions[index],
                type,
                amount,
                description,
                category,
                relatedMemberId: memberId,
                date,
                time,
                notes,
                updatedAt: new Date().toISOString()
            };
        }
    } else {
        // Create new
        const transaction = {
            id: generateId(),
            type,
            amount,
            description,
            category,
            relatedMemberId: memberId,
            date,
            time,
            notes,
            createdAt: new Date().toISOString()
        };
        appState.transactions.push(transaction);
    }
    
    saveToStorage(STORAGE_KEYS.TRANSACTIONS, appState.transactions);
    closeModal('modal-transaction');
    showToast(id ? 'Transaksi diperbarui!' : 'Transaksi berhasil disimpan!');
    
    // Refresh current page
    const activePage = document.querySelector('.page.active');
    if (activePage.id === 'page-dashboard') {
        updateDashboard();
    } else if (activePage.id === 'page-transactions') {
        updateTransactionsList();
    }
};

const showTransactionDetail = (id) => {
    const t = appState.transactions.find(tr => tr.id === id);
    if (!t) return;
    
    appState.currentTransaction = t;
    
    const category = getCategory(t.category, t.type);
    const member = t.relatedMemberId ? appState.members.find(m => m.id === t.relatedMemberId) : null;
    
    document.getElementById('detail-icon').textContent = category?.icon || '💰';
    document.getElementById('detail-icon').className = `w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-3 ${t.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`;
    document.getElementById('detail-amount').textContent = formatCurrency(t.amount);
    document.getElementById('detail-amount').className = `text-2xl font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`;
    document.getElementById('detail-type').textContent = t.type === 'income' ? 'Pemasukan' : 'Pengeluaran';
    document.getElementById('detail-desc').textContent = t.description;
    document.getElementById('detail-category').textContent = `${category?.icon || ''} ${category?.name || t.category}`;
    document.getElementById('detail-date').textContent = formatDateFull(t.date);
    document.getElementById('detail-time').textContent = t.time || '-';
    
    if (member) {
        document.getElementById('detail-member-row').style.display = 'flex';
        document.getElementById('detail-member').textContent = member.nama;
    } else {
        document.getElementById('detail-member-row').style.display = 'none';
    }
    
    if (t.notes) {
        document.getElementById('detail-notes-row').style.display = 'flex';
        document.getElementById('detail-notes').textContent = t.notes;
    } else {
        document.getElementById('detail-notes-row').style.display = 'none';
    }
    
    showModal('modal-transaction-detail');
};

const editCurrentTransaction = () => {
    closeModal('modal-transaction-detail');
    if (appState.currentTransaction) {
        showTransactionForm(appState.currentTransaction.type, appState.currentTransaction.id);
    }
};

const deleteCurrentTransaction = () => {
    closeModal('modal-transaction-detail');
    
    // Show confirmation
    document.getElementById('confirm-title').textContent = 'Hapus Transaksi?';
    document.getElementById('confirm-message').textContent = 'Transaksi akan dihapus permanen.';
    document.getElementById('confirm-btn').onclick = () => {
        if (appState.currentTransaction) {
            appState.transactions = appState.transactions.filter(t => t.id !== appState.currentTransaction.id);
            saveToStorage(STORAGE_KEYS.TRANSACTIONS, appState.transactions);
            showToast('Transaksi dihapus');
            updateDashboard();
            updateTransactionsList();
        }
        closeModal('modal-confirm');
    };
    showModal('modal-confirm');
};

const updateTransactionsList = () => {
    const container = document.getElementById('transaction-list');
    const filter = document.querySelector('[data-filter].active')?.dataset.filter || 'all';
    const search = document.getElementById('transaction-search')?.value?.toLowerCase() || '';
    
    let filtered = [...appState.transactions].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    if (filter !== 'all') {
        filtered = filtered.filter(t => t.type === filter);
    }
    
    if (search) {
        filtered = filtered.filter(t => 
            t.description.toLowerCase().includes(search) ||
            t.category.toLowerCase().includes(search)
        );
    }
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state py-12">
                <div class="empty-state-icon">📭</div>
                <p class="text-slate-500">Belum ada transaksi</p>
                <p class="text-sm text-slate-400 mt-2">Tap tombol + untuk menambah</p>
            </div>
        `;
        return;
    }
    
    // Group by date
    const grouped = filtered.reduce((acc, t) => {
        const date = t.date;
        if (!acc[date]) acc[date] = [];
        acc[date].push(t);
        return acc;
    }, {});
    
    container.innerHTML = Object.entries(grouped).map(([date, transactions]) => `
        <div class="date-group-header">${formatDateFull(date)}</div>
        ${transactions.map(t => renderTransactionItem(t)).join('')}
    `).join('');
};

// Filter buttons
document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateTransactionsList();
    });
});

// Search
document.getElementById('transaction-search')?.addEventListener('input', debounce(() => {
    updateTransactionsList();
}, 300));

// ==================== MEMBERS ====================
const showMemberForm = (editId = null) => {
    const isEdit = !!editId;
    const member = isEdit ? appState.members.find(m => m.id === editId) : null;
    
    appState.currentMember = member;
    
    document.getElementById('member-title').textContent = isEdit ? 'Edit Anggota' : 'Tambah Anggota';
    document.getElementById('member-id').value = editId || '';
    document.getElementById('member-nama').value = member?.nama || '';
    document.getElementById('member-panggilan').value = member?.panggilan || '';
    document.getElementById('member-hp').value = member?.noHp || '';
    document.getElementById('member-email').value = member?.email || '';
    document.getElementById('member-catatan').value = member?.catatan || '';
    
    const avatar = document.getElementById('member-avatar-preview');
    if (member?.foto) {
        avatar.innerHTML = `<img src="${member.foto}" class="w-full h-full object-cover rounded-full">`;
    } else {
        avatar.textContent = '👤';
    }
    
    showModal('modal-member');
};

const previewMemberPhoto = (input) => {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('member-avatar-preview').innerHTML = 
                `<img src="${e.target.result}" class="w-full h-full object-cover rounded-full">`;
        };
        reader.readAsDataURL(input.files[0]);
    }
};

const saveMember = () => {
    const id = document.getElementById('member-id').value;
    const nama = document.getElementById('member-nama').value.trim();
    const panggilan = document.getElementById('member-panggilan').value.trim();
    const noHp = document.getElementById('member-hp').value.trim();
    const email = document.getElementById('member-email').value.trim();
    const catatan = document.getElementById('member-catatan').value.trim();
    
    const fotoInput = document.getElementById('member-photo');
    let foto = null;
    if (fotoInput.files && fotoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            foto = e.target.result;
            finishSaveMember(id, nama, panggilan, noHp, email, catatan, foto);
        };
        reader.readAsDataURL(fotoInput.files[0]);
        return;
    }
    
    if (id) {
        const existing = appState.members.find(m => m.id === id);
        foto = existing?.foto || null;
    }
    
    finishSaveMember(id, nama, panggilan, noHp, email, catatan, foto);
};

const finishSaveMember = (id, nama, panggilan, noHp, email, catatan, foto) => {
    if (!nama) {
        showToast('Masukkan nama anggota', 'warning');
        return;
    }
    
    const memberData = {
        nama,
        panggilan: panggilan || nama.split(' ')[0],
        noHp,
        email,
        catatan,
        foto,
        totalPaid: 0,
        lastPaymentDate: null
    };
    
    if (id) {
        const index = appState.members.findIndex(m => m.id === id);
        if (index !== -1) {
            appState.members[index] = { ...appState.members[index], ...memberData };
        }
    } else {
        memberData.id = generateId();
        appState.members.push(memberData);
    }
    
    saveToStorage(STORAGE_KEYS.MEMBERS, appState.members);
    closeModal('modal-member');
    showToast(id ? 'Anggota diperbarui!' : 'Anggota berhasil ditambah!');
    updateMembersList();
    updateKasBulanan();
};

const updateMembersList = () => {
    const container = document.getElementById('member-list');
    const search = document.getElementById('member-search')?.value?.toLowerCase() || '';
    
    let filtered = [...appState.members].sort((a, b) => a.nama.localeCompare(b.nama));
    
    if (search) {
        filtered = filtered.filter(m => 
            m.nama.toLowerCase().includes(search) ||
            m.panggilan.toLowerCase().includes(search)
        );
    }
    
    // Update stats
    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7);
    const paidMemberIds = appState.transactions
        .filter(t => t.type === 'income' && t.category === 'kas' && t.date?.startsWith(currentMonth))
        .map(t => t.relatedMemberId);
    
    document.getElementById('member-total').textContent = appState.members.length;
    document.getElementById('member-paid').textContent = paidMemberIds.length;
    document.getElementById('member-unpaid').textContent = appState.members.length - paidMemberIds.length;
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state py-12">
                <div class="empty-state-icon">👥</div>
                <p class="text-slate-500">Belum ada anggota</p>
                <button class="btn-primary px-6 py-2 mt-4 text-sm" onclick="showMemberForm()">Tambah Anggota</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filtered.map(m => {
        const isPaid = paidMemberIds.includes(m.id);
        const initials = getInitials(m.nama);
        
        return `
            <div class="card p-4">
                <div class="flex items-center gap-4">
                    ${m.foto ? 
                        `<div class="avatar"><img src="${m.foto}" class="w-full h-full object-cover rounded-full"></div>` : 
                        `<div class="avatar">${initials}</div>`
                    }
                    <div class="flex-1 min-w-0">
                        <div class="font-bold text-slate-800">${m.nama}</div>
                        <div class="text-sm text-slate-500">${m.panggilan}</div>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="member-status ${isPaid ? 'paid' : 'unpaid'}">
                                ${isPaid ? '✅ Lunas' : '⚠️ Belum Bayar'}
                            </span>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        ${!isPaid ? `<button class="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600" onclick="quickPayKas('${m.id}')">
                            <i class="fas fa-check text-xs"></i>
                        </button>` : ''}
                        <button class="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600" onclick="showMemberForm('${m.id}')">
                            <i class="fas fa-edit text-xs"></i>
                        </button>
                        <button class="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-rose-600" onclick="deleteMember('${m.id}')">
                            <i class="fas fa-trash text-xs"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
};

const deleteMember = (id) => {
    document.getElementById('confirm-title').textContent = 'Hapus Anggota?';
    document.getElementById('confirm-message').textContent = `${appState.members.find(m => m.id === id)?.nama} akan dihapus dari daftar.`;
    document.getElementById('confirm-btn').onclick = () => {
        appState.members = appState.members.filter(m => m.id !== id);
        saveToStorage(STORAGE_KEYS.MEMBERS, appState.members);
        showToast('Anggota dihapus');
        updateMembersList();
        closeModal('modal-confirm');
    };
    showModal('modal-confirm');
};

// Search
document.getElementById('member-search')?.addEventListener('input', debounce(() => {
    updateMembersList();
}, 300));

// ==================== REPORTS ====================
const updateReports = () => {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    document.getElementById('report-start').value = firstDayOfMonth.toISOString().split('T')[0];
    document.getElementById('report-end').value = lastDayOfMonth.toISOString().split('T')[0];
    
    updateReportData();
};

const updateReportData = () => {
    const startDate = document.getElementById('report-start').value;
    const endDate = document.getElementById('report-end').value;
    
    if (!startDate || !endDate) return;
    
    const filtered = appState.transactions.filter(t => 
        t.date >= startDate && t.date <= endDate
    );
    
    const income = filtered
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    const expense = filtered
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expense;
    
    document.getElementById('report-income').textContent = formatCurrency(income);
    document.getElementById('report-expense').textContent = formatCurrency(expense);
    document.getElementById('report-balance').textContent = formatCurrency(balance);
    
    // Update chart
    updateReportChart(filtered);
};

const updateReportChart = (transactions) => {
    const ctx = document.getElementById('report-chart');
    if (!ctx) return;
    
    // Group by category
    const incomeCats = {};
    const expenseCats = {};
    
    transactions.forEach(t => {
        const cats = t.type === 'income' ? incomeCats : expenseCats;
        cats[t.category] = (cats[t.category] || 0) + t.amount;
    });
    
    const incomeLabels = Object.keys(incomeCats).map(id => {
        const cat = getCategory(id, 'income');
        return cat?.name || id;
    });
    const incomeData = Object.values(incomeCats);
    
    const expenseLabels = Object.keys(expenseCats).map(id => {
        const cat = getCategory(id, 'expense');
        return cat?.name || id;
    });
    const expenseData = Object.values(expenseCats);
    
    if (appState.chartInstances.report) {
        appState.chartInstances.report.destroy();
    }
    
    // Use expense data primarily, or income if no expense
    const labels = expenseLabels.length > 0 ? expenseLabels : incomeLabels;
    const data = expenseLabels.length > 0 ? expenseData : incomeData;
    const colors = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
    
    appState.chartInstances.report = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels,
            datasets: [{
                data,
                backgroundColor: colors,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { boxWidth: 12, font: { size: 10 } }
                }
            }
        }
    });
};

// Period buttons
document.querySelectorAll('[data-period]').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('[data-period]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const now = new Date();
        let start, end;
        
        if (btn.dataset.period === 'month') {
            start = new Date(now.getFullYear(), now.getMonth(), 1);
            end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        } else {
            start = new Date(now.getFullYear(), 0, 1);
            end = new Date(now.getFullYear(), 11, 31);
        }
        
        document.getElementById('report-start').value = start.toISOString().split('T')[0];
        document.getElementById('report-end').value = end.toISOString().split('T')[0];
        updateReportData();
    });
});

document.getElementById('report-start')?.addEventListener('change', updateReportData);
document.getElementById('report-end')?.addEventListener('change', updateReportData);

// ==================== EXPORT FUNCTIONS ====================
const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    wb.Props = {
        Title: "Laporan K4 - Kas Kelas",
        Subject: "Laporan Keuangan",
        Author: appState.user?.namaLengkap || "K4",
        CreatedDate: new Date()
    };
    
    // Sheet 1: Ringkasan
    const summaryData = [
        ['LAPORAN KEUANGAN KAS KELAS'],
        [''],
        ['Kelas:', appState.user?.kelas || '-'],
        ['Sekolah:', appState.user?.sekolah || '-'],
        ['Periode:', `${document.getElementById('report-start').value} s/d ${document.getElementById('report-end').value}`],
        ['Dicetak:', new Date().toLocaleString('id-ID')],
        [''],
        ['RINGKASAN'],
        ['Total Pemasukan:', document.getElementById('report-income').textContent],
        ['Total Pengeluaran:', document.getElementById('report-expense').textContent],
        ['Saldo:', document.getElementById('report-balance').textContent]
    ];
    const ws1 = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, ws1, 'Ringkasan');
    
    // Sheet 2: Transaksi
    const transactionData = [
        ['No', 'Tanggal', 'Waktu', 'Tipe', 'Kategori', 'Keterangan', 'Jumlah', 'Anggota']
    ];
    const startDate = document.getElementById('report-start').value;
    const endDate = document.getElementById('report-end').value;
    
    appState.transactions
        .filter(t => t.date >= startDate && t.date <= endDate)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .forEach((t, index) => {
            const cat = getCategory(t.category, t.type);
            const member = t.relatedMemberId ? appState.members.find(m => m.id === t.relatedMemberId) : null;
            transactionData.push([
                index + 1,
                t.date,
                t.time,
                t.type === 'income' ? 'Pemasukan' : 'Pengeluaran',
                cat?.name || t.category,
                t.description,
                t.amount,
                member?.nama || '-'
            ]);
        });
    
    const ws2 = XLSX.utils.aoa_to_sheet(transactionData);
    XLSX.utils.book_append_sheet(wb, ws2, 'Transaksi');
    
    // Sheet 3: Anggota
    const memberData = [
        ['No', 'Nama', 'Panggilan', 'No HP', 'Total Bayar', 'Status']
    ];
    
    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7);
    const paidMemberIds = appState.transactions
        .filter(t => t.type === 'income' && t.category === 'kas' && t.date?.startsWith(currentMonth))
        .map(t => t.relatedMemberId);
    
    appState.members.forEach((m, index) => {
        const isPaid = paidMemberIds.includes(m.id);
        memberData.push([
            index + 1,
            m.nama,
            m.panggilan,
            m.noHp || '-',
            m.totalPaid || 0,
            isPaid ? 'Lunas' : 'Belum Bayar'
        ]);
    });
    
    const ws3 = XLSX.utils.aoa_to_sheet(memberData);
    XLSX.utils.book_append_sheet(wb, ws3, 'Anggota');
    
    // Download
    XLSX.writeFile(wb, `Laporan_K4_${appState.user?.kelas || 'Kas_Kelas'}_${new Date().toISOString().split('T')[0]}.xlsx`);
    showToast('File Excel berhasil diunduh!');
};

const exportToPDF = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('Laporan Keuangan Kas Kelas', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Kelas: ${appState.user?.kelas || '-'}`, 20, 35);
    doc.text(`Sekolah: ${appState.user?.sekolah || '-'}`, 20, 42);
    doc.text(`Periode: ${document.getElementById('report-start').value} s/d ${document.getElementById('report-end').value}`, 20, 49);
    
    // Summary
    doc.setFontSize(14);
    doc.text('Ringkasan', 20, 65);
    
    doc.setFontSize(11);
    doc.text(`Total Pemasukan: ${document.getElementById('report-income').textContent}`, 20, 75);
    doc.text(`Total Pengeluaran: ${document.getElementById('report-expense').textContent}`, 20, 82);
    doc.text(`Saldo: ${document.getElementById('report-balance').textContent}`, 20, 89);
    
    // Transactions table
    doc.setFontSize(14);
    doc.text('Daftar Transaksi', 20, 105);
    
    const startDate = document.getElementById('report-start').value;
    const endDate = document.getElementById('report-end').value;
    const filtered = appState.transactions
        .filter(t => t.date >= startDate && t.date <= endDate)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    let y = 115;
    doc.setFontSize(9);
    doc.text('Tanggal', 20, y);
    doc.text('Keterangan', 60, y);
    doc.text('Jumlah', 160, y);
    
    y += 7;
    filtered.slice(0, 20).forEach(t => { // Limit to 20 rows for PDF
        if (y > 270) {
            doc.addPage();
            y = 20;
        }
        doc.text(t.date, 20, y);
        doc.text(t.description.substring(0, 35), 60, y);
        doc.text(formatCurrency(t.amount), 160, y);
        y += 7;
    });
    
    doc.save(`Laporan_K4_${new Date().toISOString().split('T')[0]}.pdf`);
    showToast('File PDF berhasil diunduh!');
};

const exportToCSV = () => {
    const startDate = document.getElementById('report-start').value;
    const endDate = document.getElementById('report-end').value;
    
    let csv = 'Tanggal,Waktu,Tipe,Kategori,Keterangan,Jumlah\n';
    
    appState.transactions
        .filter(t => t.date >= startDate && t.date <= endDate)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .forEach(t => {
            const cat = getCategory(t.category, t.type);
            csv += `"${t.date}","${t.time}","${t.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}","${cat?.name || t.category}","${t.description}",${t.amount}\n`;
        });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Laporan_K4_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    showToast('File CSV berhasil diunduh!');
};

// ==================== SETTINGS ====================
const updateSettings = () => {
    if (appState.user) {
        document.getElementById('settings-nama').textContent = appState.user.namaPanggilan || appState.user.namaLengkap;
        document.getElementById('settings-kelas').textContent = appState.user.kelas;
        document.getElementById('settings-role').textContent = appState.user.peran;
        document.getElementById('settings-avatar').textContent = getInitials(appState.user.namaPanggilan || appState.user.namaLengkap);
    }
    
    // Update toggles
    document.getElementById('toggle-dark').classList.toggle('active', appState.settings.darkMode);
    document.getElementById('toggle-pin').classList.toggle('active', appState.settings.pinEnabled);
    
    // Calculate data size
    let totalSize = 0;
    Object.values(STORAGE_KEYS).forEach(key => {
        const item = localStorage.getItem(key);
        if (item) totalSize += item.length * 2; // UTF-16 = 2 bytes per char
    });
    document.getElementById('data-size').textContent = (totalSize / 1024).toFixed(1) + ' KB';
    
    const lastBackup = loadFromStorage(STORAGE_KEYS.BACKUP);
    document.getElementById('last-backup').textContent = lastBackup ? formatDate(lastBackup) : 'Belum pernah';
};

// Toggle handlers
document.getElementById('toggle-dark')?.addEventListener('click', function() {
    appState.settings.darkMode = !appState.settings.darkMode;
    this.classList.toggle('active');
    saveToStorage(STORAGE_KEYS.SETTINGS, appState.settings);
    applyTheme();
    showToast(appState.settings.darkMode ? 'Mode gelap aktif' : 'Mode terang aktif');
});

document.getElementById('toggle-pin')?.addEventListener('click', function() {
    if (!appState.settings.pinEnabled) {
        // Enable PIN - ask for new PIN
        const pin = prompt('Masukkan PIN baru (4-6 digit):');
        if (pin && pin.length >= 4 && pin.length <= 6 && /^\d+$/.test(pin)) {
            appState.settings.pin = pin;
            appState.settings.pinEnabled = true;
            this.classList.add('active');
            saveToStorage(STORAGE_KEYS.SETTINGS, appState.settings);
            showToast('PIN berhasil diatur');
        } else {
            showToast('PIN harus 4-6 digit angka', 'warning');
        }
    } else {
        // Disable PIN
        appState.settings.pinEnabled = false;
        appState.settings.pin = null;
        this.classList.remove('active');
        saveToStorage(STORAGE_KEYS.SETTINGS, appState.settings);
        showToast('PIN dinonaktifkan');
    }
});

const setAccentColor = (color) => {
    appState.settings.accentColor = color;
    saveToStorage(STORAGE_KEYS.SETTINGS, appState.settings);
    applyTheme();
    showToast(`Warna tema diubah ke ${color}`);
};

const backupData = () => {
    const backup = {
        user: appState.user,
        transactions: appState.transactions,
        members: appState.members,
        categories: appState.categories,
        settings: appState.settings,
        kasBulanan: appState.kasBulanan,
        exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `K4_Backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    saveToStorage(STORAGE_KEYS.BACKUP, new Date().toISOString());
    updateSettings();
    showToast('Backup berhasil diunduh!');
};

const confirmDeleteAll = () => {
    document.getElementById('confirm-title').textContent = 'Hapus Semua Data?';
    document.getElementById('confirm-message').textContent = 'Semua data transaksi, anggota, dan pengaturan akan dihapus permanen. Pastikan sudah backup!';
    document.getElementById('confirm-btn').onclick = () => {
        Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
        location.reload();
    };
    showModal('modal-confirm');
};

// Profile edit
const previewProfilePhoto = (input) => {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('profile-avatar-preview').innerHTML = 
                `<img src="${e.target.result}" class="w-full h-full object-cover rounded-full">`;
        };
        reader.readAsDataURL(input.files[0]);
    }
};

const showModalProfile = () => {
    if (appState.user) {
        document.getElementById('profile-nama').value = appState.user.namaLengkap;
        document.getElementById('profile-panggilan').value = appState.user.namaPanggilan;
        document.getElementById('profile-kelas').value = appState.user.kelas;
        document.getElementById('profile-sekolah').value = appState.user.sekolah;
        document.getElementById('profile-nominal').value = appState.user.nominalKas;
    }
    showModal('modal-profile');
};

const saveProfile = () => {
    appState.user.namaLengkap = document.getElementById('profile-nama').value.trim();
    appState.user.namaPanggilan = document.getElementById('profile-panggilan').value.trim();
    appState.user.kelas = document.getElementById('profile-kelas').value.trim();
    appState.user.sekolah = document.getElementById('profile-sekolah').value.trim();
    appState.user.nominalKas = parseAmount(document.getElementById('profile-nominal').value);
    
    const fotoInput = document.getElementById('profile-photo');
    if (fotoInput.files && fotoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            appState.user.foto = e.target.result;
            saveToStorage(STORAGE_KEYS.USER, appState.user);
            closeModal('modal-profile');
            updateSettings();
            showToast('Profil diperbarui!');
        };
        reader.readAsDataURL(fotoInput.files[0]);
    } else {
        saveToStorage(STORAGE_KEYS.USER, appState.user);
        closeModal('modal-profile');
        updateSettings();
        showToast('Profil diperbarui!');
    }
};

// Profile button
document.getElementById('btn-profile')?.addEventListener('click', () => {
    showPage('settings');
});

// ==================== SERVICE WORKER ====================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('SW registered:', registration);
            })
            .catch(error => {
                console.log('SW registration failed:', error);
            });
    });
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', initApp);
