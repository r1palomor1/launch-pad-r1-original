<<<<<<< HEAD
const mainView = document.getElementById('mainView');
const searchInput = document.getElementById('searchInput');
const logo = document.getElementById('logo');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const searchBtn = document.getElementById('searchBtn');
const cardContainer = document.getElementById('cardContainer');
const toggleViewBtn = document.getElementById('toggleViewBtn');
const quickLaunchBtn = document.getElementById('quickLaunchBtn');
const toggleAllLink = document.getElementById('toggleAllLink');
const cancelSearchBtn = document.getElementById('cancelSearchBtn');
const themeBtn = document.getElementById('themeBtn');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const themeDialogOverlay = document.getElementById('themeDialogOverlay');
const themeDialogTitle = document.getElementById('themeDialogTitle');
const themeDialogError = document.getElementById('themeDialogError');
const themeColorList = document.getElementById('themeColorList');
const themeDialogInput = document.getElementById('themeDialogInput');
const clearThemeInputBtn = document.getElementById('clearThemeInputBtn');
const themeDialogOk = document.getElementById('themeDialogOk');
const themeDialogCancel = document.getElementById('themeDialogCancel');
const themeDialogReset = document.getElementById('themeDialogReset');
const themeModeToggleBtn = document.getElementById('themeModeToggleBtn');
const themeLabToggle = document.getElementById('themeLabToggle');
const labCheckbox = document.getElementById('lab-checkbox');
const deletePromptOverlay = document.getElementById('deletePromptOverlay');
const deleteLinksList = document.getElementById('deleteLinksList');
const deletePromptCancel = document.getElementById('deletePromptCancel');
const deletePromptOk = document.getElementById('deletePromptOk');
const favoritesPromptOverlay = document.getElementById('favoritesPromptOverlay');
const favoritesList = document.getElementById('favoritesList');
const favoritesPromptClose = document.getElementById('favoritesPromptClose');
const genericPromptOverlay = document.getElementById('genericPromptOverlay');
const genericPromptMessage = document.getElementById('genericPromptMessage');
const genericPromptActions = document.getElementById('genericPromptActions');
const internalPlayerOverlay = document.getElementById('internalPlayerOverlay');
const playerVideoTitle = document.getElementById('playerVideoTitle');
const youtubePlayerContainer = document.getElementById('youtubePlayer');
const playerBackBtn = document.getElementById('playerBackBtn');
const playerSearchBtn = document.getElementById('playerSearchBtn');
const playerPlayPauseBtn = document.getElementById('playerPlayPauseBtn');
const playerStopBtn = document.getElementById('playerStopBtn');
const playerAudioOnlyBtn = document.getElementById('playerAudioOnlyBtn');
const playerContainer = document.querySelector('.player-container');
const youtubeSearchViewOverlay = document.getElementById('youtubeSearchViewOverlay');
const youtubeSearchInput = document.getElementById('youtubeSearchInput');
const youtubeSearchCancelBtn = document.getElementById('youtubeSearchCancelBtn'); // This will be unused after revert, but harmless
const youtubeSearchResultsContainer = document.getElementById('youtubeSearchResultsContainer');
const SUN_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.55 4.95l1.414-1.414L7.05 5.636 5.636 7.05 3.55 4.95zm12.728 12.728l1.414-1.414L19.778 18.364l-1.414 1.414-2.086-2.086zM1 11h3v2H1v-2zm19 0h3v2h-3v-2zM4.95 20.45l-1.414-1.414L5.636 17l1.414 1.414-2.086 2.036zM18.364 7.05l1.414-1.414L21.864 7.05l-1.414 1.414-2.086-2.086z"/></svg>`;
const MOON_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2h.1A6.979 6.979 0 0 0 10 7zm-6 5a8 8 0 0 0 8 8 .5.5 0 0 1 .5.5v.5a10 10 0 1 1 0-20 .5.5 0 0 1 .5.5V4a8 8 0 0 0-8 8z"/></svg>`;

let player; // Will hold the YouTube player instance
const PLAY_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
const PAUSE_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
const STOP_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z"/></svg>`;
const AUDIO_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1a7 7 0 0 1 14 0v1h-4v8h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z"/></svg>`;
let isAudioOnly = false;
let originalThemeState = { theme: 'rabbit', mode: 'dark' };
let suggestionRequestCount = 0;
const GENERIC_FAVICON_SRC = 'data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23888\'%3e%3cpath d=\'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z\'/%3e%3c/svg%3e';

async function launchUrlOnRabbit(url, name) {
    try {
        // The line below was causing a UI flicker by clearing the screen before launch. It has been removed for a smoother transition.
        if (window.rabbit && window.rabbit.core) {
            await window.rabbit.core.launchUrl({ url: url });
        } else {
            console.log(`[Browser Mode] Launching: ${name} at ${url}`);
            window.location.href = url;
        }
    } catch (error) {
        console.error("Error launching URL on Rabbit:", error);
        await showAlert("Failed to launch URL.");
    }
}

function triggerHaptic() {
    try {
        if (window.rabbit && window.rabbit.core && window.rabbit.core.vibrate) {
            window.rabbit.core.vibrate({ pattern: [50] });
        }
    } catch (e) { console.error("Haptic feedback failed:", e); }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goHome() {
    themeDialogOverlay.style.display = 'none';
    deletePromptOverlay.style.display = 'none';
    favoritesPromptOverlay.style.display = 'none';
    genericPromptOverlay.style.display = 'none';
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    mainView.classList.remove('input-mode-active');
    renderLinks();
    scrollToTop();
}

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

function showGenericPrompt({ message, buttons }) {
    return new Promise(resolve => {
        genericPromptMessage.textContent = message;
        genericPromptActions.innerHTML = '';
        const sortedButtons = buttons.sort((a, b) => (a.order || 0) - (b.order || 0));
        sortedButtons.forEach(btnConfig => {
            const button = document.createElement('button');
            button.textContent = btnConfig.text;
            if (btnConfig.class) {
                button.className = btnConfig.class;
            }
            button.onclick = () => {
                genericPromptOverlay.style.display = 'none';
                resolve(btnConfig.value);
            };
            genericPromptActions.appendChild(button);
        });
        genericPromptActions.style.justifyContent = buttons.length === 1 ? 'center' : 'space-between';
        genericPromptOverlay.style.display = 'flex';
    });
}

async function showAlert(message) {
    return showGenericPrompt({
        message,
        buttons: [ { text: 'OK', value: true, class: '' } ]
    });
}

async function showConfirm(message) {
    return showGenericPrompt({
        message,
        buttons: [
            { text: 'Cancel', value: false, class: 'secondary', order: 1 },
            { text: 'OK', value: true, class: '', order: 2 }
        ]
    });
}

async function sayOnRabbit(message) {
    try {
        if (window.rabbit && window.rabbit.core) {
            await window.rabbit.core.say({ text: message });
        }
    } catch (e) { console.error("Say feedback failed:", e); }
}

function normalizeUrl(url) {
    if (!url || typeof url !== 'string') return '';
    let trimmedUrl = url.trim();
    if (trimmedUrl === '' || trimmedUrl.toLowerCase().startsWith('javascript:') || trimmedUrl === 'https://') {
        return '';
    }
    if (!/^(https?:\/\/)/i.test(trimmedUrl)) {
        trimmedUrl = `https://${trimmedUrl}`;
    }
    return trimmedUrl;
}

const categories = ['Education', 'Entertainment', 'Finance', 'Gaming', 'Health', 'Music', 'News', 'Personal', 'Reference', 'Shopping', 'Social', 'Sports', 'Tech', 'Tools', 'Travel', 'Work', 'Other'];

let links = JSON.parse(localStorage.getItem('launchPadR1Links')) || [
    { description: 'Youtube', url: 'https://m.youtube.com', category: 'Entertainment' },
    { description: 'Copilot', url: 'https://copilot.microsoft.com/', category: 'Tools' },
    { description: 'Radio.net', url: 'https://www.radio.net/', category: 'Music' }
];

let needsSave = false;
const urlMigrationFlag = 'launchPadR1UrlNormalized_v1';
if (!localStorage.getItem(urlMigrationFlag)) {
    links.forEach(link => {
        const originalUrl = link.url;
        const normalizedUrl = normalizeUrl(originalUrl);
        if (originalUrl !== normalizedUrl && normalizedUrl) {
            link.url = normalizedUrl;
            needsSave = true;
        }
    });
    localStorage.setItem(urlMigrationFlag, 'true');
}
links.forEach((link, index) => {
    if (!link.id) {
        link.id = `link-${Date.now()}-${index}`;
        needsSave = true;
    }
});
const oldFavoriteIndex = parseInt(localStorage.getItem('launchPadR1FavoriteLinkIndex') || '-1', 10);
const oldFavoriteLinkId = localStorage.getItem('launchPadR1FavoriteLinkId');
let favoriteLinkIds = new Set(JSON.parse(localStorage.getItem('launchPadR1FavoriteLinkIds')) || []);
if (oldFavoriteLinkId && favoriteLinkIds.size === 0) {
    favoriteLinkIds.add(oldFavoriteLinkId);
} else if (oldFavoriteIndex !== -1 && links[oldFavoriteIndex] && favoriteLinkIds.size === 0) {
    favoriteLinkIds.add(links[oldFavoriteIndex].id);
}
if (localStorage.getItem('launchPadR1FavoriteLinkIndex') || localStorage.getItem('launchPadR1FavoriteLinkId')) {
    localStorage.removeItem('launchPadR1FavoriteLinkIndex');
    localStorage.removeItem('launchPadR1FavoriteLinkId');
    needsSave = true;
}
if (needsSave) {
    localStorage.setItem('launchPadR1Links', JSON.stringify(links));
}
links.forEach(link => {
    if (!link.category) {
        link.category = 'Other';
    }
});

let currentView = localStorage.getItem('launchPadR1View') || 'list';
let collapsedCategories = JSON.parse(localStorage.getItem('launchPadR1CollapsedCategories')) || [];
let currentThemeName = localStorage.getItem('launchPadR1Theme') || 'rabbit';
let currentLuminanceMode = localStorage.getItem('launchPadR1LuminanceMode') || 'dark';
let customTheme = JSON.parse(localStorage.getItem('launchPadR1CustomTheme')) || null;

function updateToggleAllLinkState() {
    if (currentView !== 'group') {
        toggleAllLink.style.display = 'none';
        return;
    }
    const allCategoriesInApp = [...new Set(links.map(link => link.category || 'Other'))];
    const hasExpandedCategory = allCategoriesInApp.some(cat => !collapsedCategories.includes(cat));
    if (hasExpandedCategory) {
        toggleAllLink.textContent = 'Collapse All';
        toggleAllLink.style.display = 'block';
    } else {
        toggleAllLink.style.display = 'none';
    }
}

function renderLinks(linksToRender = links) {
    if (currentView === 'list') {
        toggleViewBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 3h8v8H3V3zM13 3h8v8h-8V3zM3 13h8v8H3v-8zM13 13h8v8h-8v-8z"/></svg>`;
        toggleViewBtn.title = 'Group View';
    } else {
        toggleViewBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z" /></svg>`;
        toggleViewBtn.title = 'List View';
    }
    quickLaunchBtn.classList.toggle('active', favoriteLinkIds.size > 0);
    cardContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();
    if (linksToRender.length === 0) {
        cardContainer.innerHTML = '<p style="text-align:center; color: #6c757d;">No links saved. Type in the search box to add a new link.</p>';
        return;
    }
    const groupedLinks = linksToRender.reduce((acc, link) => {
        const category = link.category || 'Other';
        if (!acc[category]) acc[category] = [];
        acc[category].push(link);
        return acc;
    }, {});
    for (const category in groupedLinks) {
        groupedLinks[category].sort((a, b) => a.description.localeCompare(b.description));
    }
    const sortedCategories = Object.keys(groupedLinks).sort((a, b) => {
        if (a === 'Other') return 1;
        if (b === 'Other') return -1;
        return a.localeCompare(b);
    });
    const favoriteCategories = new Set(links.filter(l => favoriteLinkIds.has(l.id)).map(l => l.category));
    updateToggleAllLinkState();
    if (currentView === 'list') {
        sortedCategories.forEach(category => {
            const categoryHeader = document.createElement('h3');
            categoryHeader.className = 'category-header';
            categoryHeader.innerHTML = favoriteCategories.has(category) ? `${category} <span class="favorite-indicator">★</span>` : category;
            fragment.appendChild(categoryHeader);
            groupedLinks[category].forEach(link => fragment.appendChild(renderLinkItem(link)));
        });
    } else {
        sortedCategories.forEach(category => {
            const categoryHeader = document.createElement('h3');
            categoryHeader.className = 'category-header collapsible';
            categoryHeader.innerHTML = favoriteCategories.has(category) ? `${category} <span class="favorite-indicator" aria-hidden="true">★</span>` : category;
            fragment.appendChild(categoryHeader);
            const linksContainer = document.createElement('div');
            linksContainer.className = 'links-container';
            groupedLinks[category].forEach(link => linksContainer.appendChild(renderLinkItem(link)));
            fragment.appendChild(linksContainer);
            const isSearching = searchInput.value.trim() !== '';
            const isCollapsed = collapsedCategories.includes(category);
            if (isSearching || !isCollapsed) {
                categoryHeader.classList.add('expanded');
                linksContainer.classList.add('expanded');
            }
        });
    }
    cardContainer.appendChild(fragment);
}

function getHostname(url) {
    try {
        return new URL(url).hostname;
    } catch (e) { return url; }
}

function renderLinkItem(link) {
    const div = document.createElement('div');
    div.className = 'card';
    div.dataset.id = link.id;
    const isFavorite = favoriteLinkIds.has(link.id);
    div.innerHTML = `
        <img src="https://www.google.com/s2/favicons?sz=64&domain_url=${getHostname(link.url)}" class="link-favicon" alt="Favicon" onerror="this.onerror=null; this.src='${GENERIC_FAVICON_SRC}'; this.style.padding='3px';">
        <div class="link-description">${link.description}</div>
        <div class="link-actions">
            <span class="favorite-btn" title="Set as favorite"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 18.26l-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928z"></path></svg></span>
            <span class="edit-btn" title="Edit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.7279 9.57627L14.3137 8.16206L5.82842 16.6473V18H7.18263L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20H3V15.7574L14.435 4.32233C14.8256 3.93181 15.4587 3.93181 15.8492 4.32233L19.6777 8.15076C20.0682 8.54128 20.0682 9.17445 19.6777 9.56497L8.24264 21H7.24264V20Z"></path></svg></span>
            <span class="delete-btn" title="Delete"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path></svg></span>
        </div>`;
    if (isFavorite) {
        div.querySelector('.favorite-btn')?.classList.add('is-favorite');
    }
    return div;
}

function setView(view) {
    currentView = view;
    localStorage.setItem('launchPadR1View', view);
    renderLinks();
}

function saveLinks() {
    localStorage.setItem('launchPadR1Links', JSON.stringify(links));
    localStorage.setItem('launchPadR1FavoriteLinkIds', JSON.stringify(Array.from(favoriteLinkIds)));
}

function handleCategoryToggle(headerElement) {
    const linksContainer = headerElement.nextElementSibling;
    if (!linksContainer || !linksContainer.classList.contains('links-container')) return;
    linksContainer.classList.toggle('expanded');
    headerElement.classList.toggle('expanded');
    const categoryName = headerElement.textContent.replace(' ★', '');
    const isNowExpanded = linksContainer.classList.contains('expanded');
    if (isNowExpanded) {
        collapsedCategories = collapsedCategories.filter(c => c !== categoryName);
    } else {
        if (!collapsedCategories.includes(categoryName)) {
            collapsedCategories.push(categoryName);
        }
    }
    localStorage.setItem('launchPadR1CollapsedCategories', JSON.stringify(collapsedCategories));
    updateToggleAllLinkState();
}

function handleDeleteLink(idToDelete) {
    const index = links.findIndex(l => l.id === idToDelete);
    if (index === -1) return;
    const [deletedLink] = links.splice(index, 1);
    favoriteLinkIds.delete(deletedLink.id);
    saveLinks();
    searchHandler(searchInput.value);
}

cardContainer.addEventListener('click', async (e) => {
    const target = e.target;
    if (target.matches('input.new-description')) {
        if (!target.dataset.hasBeenInteracted) {
            target.dataset.hasBeenInteracted = 'true';
            setTimeout(() => {
                const len = target.value.length;
                target.setSelectionRange(len, len);
            }, 0);
        }
        return;
    }
    const li = target.closest('.card');
    const categoryHeader = target.closest('.category-header.collapsible');
    if (currentView === 'group' && categoryHeader) {
        handleCategoryToggle(categoryHeader);
        return;
    }
    if (!li) return;
    const id = li.dataset.id;
    if (target.closest('.delete-btn')) {
        const link = links.find(l => l.id === id);
        if (link && await showConfirm(`Are you sure you want to delete "${link.description}"?`)) {
            handleDeleteLink(id);
        }
    } else if (target.closest('.edit-btn')) {
        const index = links.findIndex(l => l.id === id);
        if (index !== -1) editLink(li, index);
    } else if (target.closest('.favorite-btn')) {
        if (favoriteLinkIds.has(id)) {
            favoriteLinkIds.delete(id);
        } else {
            favoriteLinkIds.add(id);
        }
        triggerHaptic();
        saveLinks();
        searchHandler(searchInput.value);
    } else if (target.closest('.link-description') || target.closest('.link-favicon')) {
        if (li.querySelector('.edit-description')) return;
        const link = links.find(l => l.id === id);
        if (!link) return;

        const isYouTube = getHostname(link.url).includes('youtube.com') || getHostname(link.url).includes('youtu.be');

        if (isYouTube) {
            const choice = await showGenericPrompt({
                message: `How would you like to launch "${link.description}"?`,
                buttons: [
                    { text: 'Internally', value: 'internal', class: '', order: 2 },
                    { text: 'Externally', value: 'external', class: 'secondary', order: 1 }
                ]
            });
            
            if (choice === 'internal') {
                const videoId = getYoutubeVideoId(link.url);
                if (videoId) {
                    // If it's a link to a specific video, open the player directly.
                    openPlayerView(videoId, link.description);
                } else {
                    // If it's a generic YouTube link, open our new search view.
                    openYouTubeSearchView();
                }
            } else if (choice === 'external') {
                triggerHaptic();
                launchUrlOnRabbit(link.url, link.description);
            }
        } else {
            // Default behavior for all other links (including non-video YouTube links)
            triggerHaptic();
            launchUrlOnRabbit(link.url, link.description);
        }
    }
});

function getYoutubeVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

function openPlayerView(videoId, title) {
    playerVideoTitle.textContent = title;
    internalPlayerOverlay.style.display = 'flex';

    // Force the initial UI state to be visible immediately.
    playerPlayPauseBtn.innerHTML = PLAY_ICON_SVG;
    playerStopBtn.innerHTML = STOP_ICON_SVG;
    playerAudioOnlyBtn.innerHTML = AUDIO_ICON_SVG;

    
    // This function creates the player. It will be called by the YouTube API callback.
    const createPlayer = () => {
        if (player) {
            player.destroy();
        }
        try {
            player = new YT.Player('youtubePlayer', {
                height: '100%',
                width: '100%',
                videoId: videoId,
                playerVars: {
                    'playsinline': 1,
                    'controls': 0, // Disable native YouTube controls
                    'rel': 0,
                    'showinfo': 0,
                    'modestbranding': 1
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        } catch (e) {
            console.error("Error creating YouTube player:", e);
        }
    };

    // The API will call this global function when it's ready.
    window.onYouTubeIframeAPIReady = createPlayer;

    // If the API is already loaded, call the function immediately.
    if (window.YT && window.YT.Player) {
        createPlayer();
    }
}

function closePlayerView() {
    internalPlayerOverlay.style.display = 'none';
    if (player && typeof player.destroy === 'function') {
        player.destroy();
    }
    player = null;
    playerVideoTitle.textContent = '';
    // Reset player UI elements
    playerPlayPauseBtn.innerHTML = '';
    isAudioOnly = false;
    playerContainer.classList.remove('audio-only');
    playerAudioOnlyBtn.classList.remove('active');
    youtubePlayerContainer.innerHTML = '';
}

function openYouTubeSearchView() {
    youtubeSearchViewOverlay.style.display = 'flex';
    youtubeSearchInput.value = '';
    // Clear previous results and don't auto-focus.
    youtubeSearchResultsContainer.innerHTML = '';
}

function closeYouTubeSearchView() {
    youtubeSearchViewOverlay.style.display = 'none';
    youtubeSearchInput.value = '';
    youtubeSearchResultsContainer.innerHTML = '';
}

function createFormHTML(linkData = {}, isForEditing = false) {
    const { description = '', url = 'https://', category = 'Other' } = linkData;
    const categoryOptions = categories.map(cat => `<option value="${cat}" ${category === cat ? 'selected' : ''}>${cat}</option>`).join('');
    const inputClassPrefix = isForEditing ? 'edit' : 'new';
    const saveButtonClass = isForEditing ? 'save-btn' : 'save-new-btn';
    return `
        <div class="link-info">
            <input type="text" class="${inputClassPrefix}-description" value="${description}" placeholder="Description">
            <input type="text" class="${inputClassPrefix}-url" value="${url}" placeholder="URL (e.g., https://...)">
            <select class="${inputClassPrefix}-category">${categoryOptions}</select>
            <div class="form-actions">
                <button class="cancel-btn secondary">Cancel</button>
                <button class="${saveButtonClass}">${isForEditing ? 'Save' : 'Add'}</button>
            </div>
        </div>`;
}

function editLink(li, index) {
    const link = links[index];
    li.innerHTML = createFormHTML(link, true);
    li.querySelector('.save-btn').addEventListener('click', async () => {
        const newDescription = li.querySelector('.edit-description').value.trim();
        const newUrl = normalizeUrl(li.querySelector('.edit-url').value.trim());
        const newCategory = li.querySelector('.edit-category').value;
        if (newDescription && newUrl) {
            links[index] = { ...links[index], description: newDescription, url: newUrl, category: newCategory };
            saveLinks();
            searchHandler(searchInput.value);
        } else {
            await showAlert('Description and URL cannot be empty or invalid.');
        }
    });
    li.querySelector('.cancel-btn').addEventListener('click', () => searchHandler(searchInput.value));
}

async function showAddForm(prefillData = {}) {
    const existingNewInput = document.querySelector('.new-description');
    if (existingNewInput) {
        const existingForm = existingNewInput.closest('.link-item');
        if (prefillData.description) existingForm.querySelector('.new-description').value = prefillData.description;
        if (prefillData.url) existingForm.querySelector('.new-url').value = prefillData.url;
        existingForm.querySelector('.new-description').focus();
        return;
    }
    const li = document.createElement('li');
    li.className = 'card';
    li.innerHTML = createFormHTML(prefillData, false);
    cardContainer.appendChild(li);
    li.scrollIntoView({ behavior: 'smooth' });
    if (prefillData.description) {
        li.querySelector('.new-category').focus();
    } else {
        li.querySelector('.new-description')?.focus();
    }
    const saveHandler = async () => {
        const description = li.querySelector('.new-description').value.trim();
        const url = li.querySelector('.new-url').value.trim();
        const category = li.querySelector('.new-category').value;
        await addNewLink({ description, url, category });
    };
    li.querySelector('.save-new-btn').addEventListener('click', saveHandler);
    li.querySelector('.cancel-btn').addEventListener('click', () => {
        li.remove();
        searchInput.value = ''; // Clear search on cancel
        cardContainer.innerHTML = `<div class="search-prompt">Search your links or add from the web.</div>`;
        clearSearchBtn.style.display = 'none';
        cancelSearchBtn.style.display = 'flex';
        searchInput.focus();
    });
}

async function handleAddFromQuery(description, url) {
    if (!description) return;
    cardContainer.innerHTML = '';
    let prefillData = {};
    if (description.includes(' ')) {
        prefillData = { description: description.replace(/\b\w/g, l => l.toUpperCase()), url: url || 'https://' };
    } else {
        const finalUrl = url || (() => {
            const hasProtocol = description.startsWith('http://') || description.startsWith('https://');
            const looksLikeDomain = description.includes('.');
            return hasProtocol ? description : (looksLikeDomain ? `https://${description}` : `https://www.${description}.com`);
        })();
        const finalDescription = description.split('.')[0].replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\b\w/g, l => l.toUpperCase());
        prefillData = { description: finalDescription, url: finalUrl, category: 'Other' };
    }
    prefillData.url = normalizeUrl(prefillData.url);
    await showAddForm(prefillData);
}

async function addNewLink(linkData) {
    const normalizedUrl = normalizeUrl(linkData.url);
    if (!linkData || !linkData.description || !normalizedUrl) {
        await showAlert('Please provide a description and a full URL.');
        return false;
    }
    links.push({ ...linkData, url: normalizedUrl, id: `link-${Date.now()}` });
    saveLinks();
    const newCategory = linkData.category || 'Other';
    collapsedCategories = collapsedCategories.filter(c => c !== newCategory);
    localStorage.setItem('launchPadR1CollapsedCategories', JSON.stringify(collapsedCategories));
    searchInput.value = '';
    renderLinks();
    await sayOnRabbit(`Added ${linkData.description}`);
    return true;
}

async function performExternalSearch(queryOverride) {
    const query = queryOverride || searchInput.value.trim();
    if (query) {
        cardContainer.innerHTML = `<div class="search-prompt">Launching web search for "${query}"...</div>`;
        const searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
        await launchUrlOnRabbit(searchUrl, `search for ${query}`);
    } else {
        searchHandler('');
    }
}

function renderCombinedResults(query, apiSuggestions, localResults) {
    const fragment = document.createDocumentFragment();
    let hasContent = false;
    if (localResults.length > 0) {
        const header = document.createElement('h3');
        header.className = 'category-header';
        header.textContent = 'In Your Links';
        fragment.appendChild(header);
        hasContent = true;
        localResults.forEach(link => fragment.appendChild(renderLinkItem(link)));
    }
    const existingUrls = new Set(links.map(link => link.url.replace(/\/$/, '')));
    const filteredApiSuggestions = apiSuggestions.filter(sugg => !existingUrls.has(sugg.link.replace(/\/$/, '')));
    if (filteredApiSuggestions.length > 0) {
        const header = document.createElement('h3');
        header.className = 'category-header';
        header.textContent = 'Web Suggestions';
        if (hasContent) header.style.marginTop = '15px';
        fragment.appendChild(header);
        hasContent = true;
        filteredApiSuggestions.slice(0, 4).forEach(sugg => {
            const suggLi = document.createElement('li');
            suggLi.className = 'card add-suggestion-item';
            suggLi.innerHTML = `<img src="https://www.google.com/s2/favicons?sz=64&domain_url=${getHostname(sugg.link)}" class="link-favicon" alt="Favicon" onerror="this.onerror=null; this.src='${GENERIC_FAVICON_SRC}'; this.style.padding='3px';"><div class="link-description">Add: ${sugg.title}</div>`;
            suggLi.addEventListener('click', () => handleAddFromQuery(sugg.title, sugg.link));
            fragment.appendChild(suggLi);
        });
    }
    const webSearchLi = document.createElement('li');
    webSearchLi.className = 'card web-search-item';
    webSearchLi.innerHTML = `<div class="link-favicon" style="display: flex; align-items: center; justify-content: center;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="var(--primary-color)" width="20" height="20"><path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"/></svg></div><div class="link-description">Search for "${query}" on the web</div>`;
    webSearchLi.addEventListener('click', () => performExternalSearch(query));
    fragment.appendChild(webSearchLi);
    cardContainer.innerHTML = '';
    cardContainer.appendChild(fragment);
}

function handleOSMessage(e, requestQuery) {
    const currentQueryInBox = searchInput.value.trim();
    if (requestQuery.toLowerCase() !== currentQueryInBox.toLowerCase()) return; // Ignore stale results

    try {
        const data = e.data ? (typeof e.data == "string" ? JSON.parse(e.data) : e.data) : null; // This line is repeated, but harmless
        if (data && data.organic_results) {
            const localResults = links.filter(link => link.description.toLowerCase().includes(requestQuery.toLowerCase()) || link.url.toLowerCase().includes(requestQuery.toLowerCase()));
            renderCombinedResults(requestQuery, data.organic_results, localResults);
        } else {
            renderCombinedResults(requestQuery, [], localResults);
        }
    } catch (err) { console.error("Error parsing plugin message:", err); }
}

function searchHandler(query) {
    query = query.trim();
    if (!query) {
        renderLinks(links);
        return;
    }
    if (typeof PluginMessageHandler !== "undefined") {
        window.onPluginMessage = (e) => handleOSMessage(e, query);
        PluginMessageHandler.postMessage(JSON.stringify({
            message: JSON.stringify({ query_params: { engine: "google", q: query, hl: "en" }, useLocation: false }),
            useSerpAPI: true
        }));
    } else {
        const mockApiResults = [{ title: `Mock Result for '${query}'`, link: `https://www.example.com/search?q=${query}` }, { title: "The Verge - Tech News", link: "https://www.theverge.com" }, { title: "Hacker News", link: "https://news.ycombinator.com" }];
        const localResults = links.filter(link => link.description.toLowerCase().includes(query.toLowerCase()) || link.url.toLowerCase().includes(query.toLowerCase()));
        setTimeout(() => {
            if (query.toLowerCase() === searchInput.value.trim().toLowerCase()) {
                renderCombinedResults(query, mockApiResults, localResults);
            }
        }, 200);
    }
}

searchBtn.addEventListener('click', () => performExternalSearch());
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performExternalSearch();
});

const debouncedSearch = debounce(searchHandler, 400);
searchInput.addEventListener('input', () => {
    const query = searchInput.value;
    clearSearchBtn.style.display = query.length > 0 ? 'flex' : 'none';
    if (mainView.classList.contains('input-mode-active')) {
        cancelSearchBtn.style.display = query.length > 0 ? 'none' : 'flex';
    }
    debouncedSearch(query);
});

cancelSearchBtn.addEventListener('click', () => {
    if (window.getComputedStyle(cancelSearchBtn).display === 'none') return;
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    cancelSearchBtn.style.display = 'none';
    searchHandler('');
    searchInput.blur();
    scrollToTop();
});

mainView.addEventListener('focusin', (e) => {
    if (e.target.id === 'searchInput') {
        mainView.classList.add('input-mode-active');
        const query = e.target.value.trim();
        cancelSearchBtn.style.display = query.length > 0 ? 'none' : 'flex';
        clearSearchBtn.style.display = query.length > 0 ? 'flex' : 'none';
        if (query === '') {
            cardContainer.innerHTML = `<div class="search-prompt">Search your links or add from the web.</div>`;
        }
        setTimeout(() => {
            document.querySelector('.search-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
});

mainView.addEventListener('focusout', (e) => {
    if (e.target.id === 'searchInput') {
        setTimeout(() => {
            const isADialogOpen = ['flex', 'block'].includes(themeDialogOverlay.style.display) ||
                                  ['flex', 'block'].includes(deletePromptOverlay.style.display) ||
                                  ['flex', 'block'].includes(favoritesPromptOverlay.style.display) ||
                                  ['flex', 'block'].includes(genericPromptOverlay.style.display);
            if (isADialogOpen) return;
            const isSearchInputEmpty = searchInput.value.trim() === '';
            const isEditingOrAdding = !!document.querySelector('.edit-description, .new-description');
            if (!isEditingOrAdding && isSearchInputEmpty) {
                mainView.classList.remove('input-mode-active');
                searchHandler('');
            }
        }, 150);
    }
});

clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    cancelSearchBtn.style.display = 'flex';
    searchHandler('');
    searchInput.focus();
    triggerHaptic();
});

toggleViewBtn.addEventListener('click', () => {
    setView(currentView === 'list' ? 'group' : 'list');
});

toggleAllLink.addEventListener('click', (e) => {
    e.preventDefault();
    collapsedCategories = [...new Set(links.map(link => link.category || 'Other'))];
    localStorage.setItem('launchPadR1CollapsedCategories', JSON.stringify(collapsedCategories));
    searchHandler(searchInput.value);
});

function openFavoritesDialog() {
    function renderFavoritesList() {
        favoritesList.innerHTML = '';
        const favoriteLinks = links.filter(l => favoriteLinkIds.has(l.id)).sort((a, b) => a.description.localeCompare(b.description));
        if (favoriteLinks.length === 0) {
            favoritesList.innerHTML = `<p class="no-favorites-message">No favorites set yet.<br>Click the star on any link to add it here.</p>`;
            quickLaunchBtn.classList.remove('active');
        } else {
            const fragment = document.createDocumentFragment();
            favoriteLinks.forEach(link => {
                const li = document.createElement('li');
                li.className = 'favorite-list-item';
                li.dataset.id = link.id;
                li.dataset.url = link.url;
                li.dataset.name = link.description;
                li.innerHTML = `<img src="https://www.google.com/s2/favicons?sz=64&domain_url=${getHostname(link.url)}" class="link-favicon" alt="Favicon" onerror="this.onerror=null; this.src='${GENERIC_FAVICON_SRC}'; this.style.padding='3px';"><span class="favorite-list-item-description">${link.description}</span><span class="remove-favorite-btn" title="Remove from favorites"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path></svg></span>`;
                fragment.appendChild(li);
            });
            favoritesList.appendChild(fragment);
        }
    }
    renderFavoritesList();
    favoritesPromptOverlay.style.display = 'flex';
    favoritesList.focus();
    const closeDialog = () => {
        favoritesPromptOverlay.style.display = 'none';
        scrollToTop();
    };
    favoritesList.onclick = async (e) => {
        const removeBtn = e.target.closest('.remove-favorite-btn');
        if (removeBtn) {
            const li = removeBtn.closest('.favorite-list-item');
            if (await showConfirm(`Remove "${li.dataset.name}" from favorites?`)) {
                favoriteLinkIds.delete(li.dataset.id);
                saveLinks();
                triggerHaptic();
                renderFavoritesList();
                renderLinks();
            }
        } else {
            const li = e.target.closest('.favorite-list-item');
            if (li) {
                closeDialog();
                launchUrlOnRabbit(li.dataset.url, li.dataset.name);
            }
        }
    };
    favoritesPromptClose.onclick = closeDialog;
}

quickLaunchBtn.addEventListener('click', async () => {
    if (favoriteLinkIds.size === 0) {
        await sayOnRabbit("No favorite link set.");
        await showAlert("No favorite link set. Click the star on any link to set it as a favorite.");
        return;
    }
    triggerHaptic();
    openFavoritesDialog();
});

const CSS_COLOR_NAMES = ['AliceBlue','AntiqueWhite','Aqua','Aquamarine','Azure','Beige','Bisque','Black','BlanchedAlmond','Blue','BlueViolet','Brown','BurlyWood','CadetBlue','Chartreuse','Chocolate','Coral','CornflowerBlue','Cornsilk','Crimson','Cyan','DarkBlue','DarkCyan','DarkGoldenRod','DarkGray','DarkGreen','DarkKhaki','DarkMagenta','DarkOliveGreen','DarkOrange','DarkOrchid','DarkRed','DarkSalmon','DarkSeaGreen','DarkSlateBlue','DarkSlateGray','DarkTurquoise','DarkViolet','DeepPink','DeepSkyBlue','DimGray','DodgerBlue','FireBrick','FloralWhite','ForestGreen','Fuchsia','Gainsboro','GhostWhite','Gold','GoldenRod','Gray','Green','GreenYellow','HoneyDew','HotPink','IndianRed','Indigo','Ivory','Khaki','Lavender','LavenderBlush','LawnGreen','LemonChiffon','LightBlue','LightCoral','LightCyan','LightGoldenRodYellow','LightGray','LightGreen','LightPink','LightSalmon','LightSeaGreen','LightSkyBlue','LightSlateGray','LightSteelBlue','LightYellow','Lime','LimeGreen','Linen','Magenta','Maroon','MediumAquaMarine','MediumBlue','MediumOrchid','MediumPurple','MediumSeaGreen','MediumSlateBlue','MediumSpringGreen','MediumTurquoise','MediumVioletRed','MidnightBlue','MintCream','MistyRose','Moccasin','NavajoWhite','Navy','OldLace','Olive','OliveDrab','Orange','OrangeRed','Orchid','PaleGoldenRod','PaleGreen','PaleTurquoise','PaleVioletRed','PapayaWhip','PeachPuff','Peru','Pink','Plum','PowderBlue','Purple','RebeccaPurple','Red','RosyBrown','RoyalBlue','SaddleBrown','Salmon','SandyBrown','SeaGreen','SeaShell','Sienna','Silver','SkyBlue','SlateBlue','SlateGray','Snow','SpringGreen','SteelBlue','Tan','Teal','Thistle','Tomato','Turquoise','Violet','Wheat','White','WhiteSmoke','Yellow','YellowGreen'].sort();
const STUDIO_BASE_COLORS = ['Beige', 'Blue', 'Brown', 'Coral', 'Crimson', 'Cyan', 'Gold', 'Gray', 'Green', 'Indigo', 'Lavender', 'Lime', 'Magenta', 'Maroon', 'Olive', 'Orange', 'Pink', 'Purple', 'Red', 'SkyBlue', 'Teal', 'Turquoise', 'Violet', 'Yellow'];
const STUDIO_MODIFIERS = ['Bold', 'Cool', 'Darker', 'Glow', 'Invert', 'Lighter', 'Metallic', 'Monochrome', 'Muted', 'Neon', 'Pastel', 'Vibrant', 'Vintage', 'Warm'];

let isStudioMode = false;
let studioStage = 1;
let studioBaseColor = null;
let studioActiveModifier = null;

function updateModifierSelectionUI() {
    const listItems = themeColorList.querySelectorAll('.theme-color-item');
    listItems.forEach(item => {
        item.classList.toggle('selected', item.dataset.modifierName?.toLowerCase() === studioActiveModifier);
    });
}

// *** DEFINITIVE FIX: Central function for all Studio previews ***
async function updateStudioPreview() {
    if (!isStudioMode || !studioBaseColor) return;
    
    // In the new streamlined flow, if we are in studio mode, we always apply the active modifier.
    const themeToApply = { name: `custom:${studioBaseColor}`, modifier: studioActiveModifier || 'bold' };
    
    // Update the master theme name variable every time a preview is generated
    currentThemeName = themeToApply.modifier 
        ? `${themeToApply.name}:${themeToApply.modifier}` 
        : themeToApply.name;

    const applyResult = await applyTheme(themeToApply, false); // false = isConfirmation
    if (applyResult && !applyResult.success) {
        themeDialogError.textContent = applyResult.error;
    }
}

async function applyTheme(themeIdentifier, silent = false, isConfirmation = false) {
    let themeColors;
    let friendlyName;
    let error = null;
    let themeToApply = { ...themeIdentifier }; // Make a mutable copy

    // If applying "My Custom Theme", load its full definition
    if (customTheme && (themeToApply.name === `custom:My Custom Theme` || themeToApply.name === 'My Custom Theme')) {
        // If a mode is saved with the custom theme, apply it first.
        if (customTheme.mode && customTheme.mode !== currentLuminanceMode) {
            await setLuminanceMode(customTheme.mode, true); // Silently set the mode
        }
        themeToApply.name = `custom:${customTheme.baseColor}`; // Use the base color for generation
        themeToApply.modifier = customTheme.modifier; // Use the saved modifier
    }

    if (themeToApply.name.startsWith('custom:')) {
        const themeParts = themeToApply.name.split(':');
        const colorName = themeParts[1];
        const modifierFromName = themeParts.length > 2 ? themeParts[2] : null;
        const primaryRgb = colorNameToRgb(colorName);
        if (!primaryRgb) {
            error = `'${colorName}' is not a valid color.`;
        } else {
            themeColors = generatePaletteFromRgb(primaryRgb, currentLuminanceMode, themeToApply.modifier || modifierFromName);
            if (!themeColors) {
                error = currentLuminanceMode === 'dark' ? "This color is too dark." : "This color is too light.";
            } else {
                friendlyName = colorName;
            }
        }
    } else {
        themeColors = defaultTheme[currentLuminanceMode] || defaultTheme.dark;
        friendlyName = defaultTheme.name || 'Rabbit';
    }
    if (error) return { success: false, error: error };
    if (!themeColors) return { success: true };
    themeDialogTitle.style.color = themeColors['--primary-color'];
    const finalThemeName = themeToApply.modifier ? `${themeToApply.name}:${themeToApply.modifier}` : themeToApply.name;
    if (isConfirmation) {
        Object.entries(themeColors).forEach(([key, value]) => document.documentElement.style.setProperty(key, value));
        currentThemeName = finalThemeName;
        localStorage.setItem('launchPadR1Theme', currentThemeName);
        if (!silent) await sayOnRabbit(`Theme set to ${friendlyName}`);
    } else {
        const dialog = themeDialogOverlay.querySelector('.custom-prompt-dialog');
        dialog.style.cssText = '';
        Object.entries(themeColors).forEach(([key, value]) => dialog.style.setProperty(key, value));
        currentThemeName = finalThemeName;
    }
    return { success: true };
}

function openThemeEditor() {
    isStudioMode = false;
    studioStage = 1;
    studioBaseColor = null;
    studioActiveModifier = null;
    originalThemeState = { theme: currentThemeName, mode: currentLuminanceMode };
    themeLabToggle.style.display = 'none'; // Always hide on open
    labCheckbox.checked = false; // Ensure lab mode is off when opening
    renderThemeDialog();
    themeDialogTitle.style.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    updateModeToggleUI();
    updateThemeListDisabledState();
}

function formatColorNameForDisplay(name) {
    // Add a space before capital letters in a compound word (e.g., "DarkGreen" -> "Dark Green")
    // but not for the first letter.
    return name.replace(/([A-Z])/g, ' $1').trim();
}

function renderThemeDialog() {
    themeDialogOverlay.style.display = 'flex';
    themeDialogInput.value = '';
    themeDialogInput.parentElement.style.display = 'block'; // Ensure it's visible by default
    themeDialogError.textContent = '';
    clearThemeInputBtn.style.display = 'none';
    themeColorList.innerHTML = '';
    themeColorList.scrollTop = 0;
    const fragment = document.createDocumentFragment();

    if (isStudioMode) {
        themeDialogTitle.textContent = 'Apply Modifier';
        themeDialogOk.textContent = 'Save';
        themeDialogCancel.textContent = 'Back';
        themeDialogReset.style.display = 'none'; // Not applicable in lab mode
        themeDialogInput.parentElement.style.display = 'none'; // Hide input in lab mode
        STUDIO_MODIFIERS.forEach(name => {
            const li = document.createElement('li');
            li.className = 'theme-color-item';
            li.textContent = name;
            li.dataset.modifierName = name;
            fragment.appendChild(li);
        });
    } else {
        themeDialogTitle.textContent = 'Change Theme';
        themeDialogOk.textContent = 'OK';
        themeDialogCancel.textContent = 'Cancel';
        themeDialogReset.style.display = 'block';
        if (customTheme) {
            const li = document.createElement('li');
            li.className = 'theme-color-item';
            li.innerHTML = `My Custom Theme <span class="favorite-indicator">★</span>`;
            li.dataset.colorName = customTheme.baseColor;
            li.dataset.isCustom = 'true';
            fragment.appendChild(li);
        }
        CSS_COLOR_NAMES.forEach(name => {
            const li = document.createElement('li');
            li.className = 'theme-color-item';
            li.textContent = formatColorNameForDisplay(name);
            li.dataset.colorName = name;
            fragment.appendChild(li);
        });
    }

    themeColorList.appendChild(fragment);
    themeColorList.focus();
    themeDialogOverlay.classList.remove('input-focused');
}

function updateThemeListDisabledState() {
    const listItems = themeColorList.querySelectorAll('.theme-color-item');
    listItems.forEach(item => {
        const colorName = item.dataset.colorName;
        if (colorName) { // Only check colors, not modifiers
            const rgb = colorNameToRgb(colorName);
            item.classList.toggle('disabled', !rgb || !generatePaletteFromRgb(rgb, currentLuminanceMode));
        }
    });
}

function updateModeToggleUI() {
    themeModeToggleBtn.innerHTML = currentLuminanceMode === 'light' ? MOON_ICON_SVG : SUN_ICON_SVG;
    themeModeToggleBtn.title = `Switch to ${currentLuminanceMode === 'light' ? 'Dark' : 'Light'} Mode`;
}

// *** DEFINITIVE FIX: Re-architected luminance mode function ***
async function setLuminanceMode(mode, silent = false) {
    if (currentLuminanceMode === mode) return;
    currentLuminanceMode = mode;
    localStorage.setItem('launchPadR1LuminanceMode', mode);
    updateModeToggleUI();
    updateThemeListDisabledState();

    if (isStudioMode) {
        // In the studio, all preview updates go through the central function.
        await updateStudioPreview();
    } else {
        // In normal mode, re-apply the last known theme with the new mode.
        const themeToApply = { name: currentThemeName };
        const applyResult = await applyTheme(themeToApply, silent);
        if (applyResult && !applyResult.success) {
            themeDialogError.textContent = applyResult.error;
        }
    }
}

async function toggleLuminanceMode() {
    triggerHaptic();
    const newMode = currentLuminanceMode === 'light' ? 'dark' : 'light';
    await setLuminanceMode(newMode);
}

function filterThemeList(query) {
    const lowerCaseQuery = query.trim().toLowerCase().replace(/\s+/g, '');
    const listItems = themeColorList.querySelectorAll('.theme-color-item');
    const noMatchesEl = themeColorList.querySelector('.no-matches-message');
    if (noMatchesEl) noMatchesEl.remove();

    let visibleCount = 0;

    listItems.forEach(item => {
        const isVisible = !lowerCaseQuery || (item.dataset.colorName || item.dataset.modifierName || '').toLowerCase().includes(lowerCaseQuery);
        item.style.display = isVisible ? 'block' : 'none';
        if (isVisible) visibleCount++;
    });

    if (visibleCount === 0 && listItems.length > 0) {
        const li = document.createElement('li');
        li.className = 'no-matches-message';
        li.textContent = `No matches for "${query}"`;
        themeColorList.appendChild(li);
    }
}

async function closeThemeDialog(shouldRevert = false) {
    if (shouldRevert && (currentLuminanceMode !== originalThemeState.mode || currentThemeName !== originalThemeState.theme)) {
        await setLuminanceMode(originalThemeState.mode, true);
        await applyTheme({ name: originalThemeState.theme }, true, true);
    }
    themeDialogOverlay.style.display = 'none';
    scrollToTop();
}

function setupThemeDialogListeners() {
    themeDialogInput.addEventListener('input', () => {
        const query = themeDialogInput.value;
        clearThemeInputBtn.style.display = query.length > 0 ? 'flex' : 'none';
        if (themeDialogError.textContent) themeDialogError.textContent = '';
        filterThemeList(query);
    });

    themeDialogOverlay.addEventListener('click', (e) => e.stopPropagation());

    themeDialogInput.addEventListener('focus', () => themeDialogOverlay.classList.add('input-focused'));
    themeDialogInput.addEventListener('blur', () => themeDialogOverlay.classList.remove('input-focused'));

    clearThemeInputBtn.addEventListener('mousedown', (e) => {
        // Prevent the mousedown from blurring the input field
        e.preventDefault(); 
        themeDialogInput.value = '';
        clearThemeInputBtn.style.display = 'none';
        filterThemeList('');
        triggerHaptic();
        // Manually re-focus the input, as some interactions might still cause a blur
        themeDialogInput.focus();
    });

    // *** DEFINITIVE FIX: Re-architected theme dialog click handlers ***
    themeColorList.addEventListener('click', async (e) => {
        const li = e.target.closest('.theme-color-item');
        if (!li || li.classList.contains('disabled')) return;
        triggerHaptic();
        themeDialogError.textContent = '';

        if (isStudioMode) { // In Lab/Modifier mode
            studioActiveModifier = li.dataset.modifierName.toLowerCase();
            // Capitalize first letter for display
            const displayModifier = studioActiveModifier.charAt(0).toUpperCase() + studioActiveModifier.slice(1);
            themeDialogInput.value = `${displayModifier} ${studioBaseColor}`;
            updateModifierSelectionUI();
            await updateStudioPreview();
        } else { // In standard color selection mode
            const colorName = li.dataset.colorName;
            if (li.dataset.isCustom && customTheme) {
                const displayModifier = customTheme.modifier.charAt(0).toUpperCase() + customTheme.modifier.slice(1);
                themeDialogInput.value = `${displayModifier} ${customTheme.baseColor}`;
            } else {
                themeDialogInput.value = colorName;
            }
            const themeToPreview = li.dataset.isCustom ? { name: `custom:My Custom Theme` } : { name: `custom:${colorName}` };
            const applyResult = await applyTheme(themeToPreview);
            if (!applyResult.success) themeDialogError.textContent = applyResult.error;
            // Show the Lab toggle only if a standard color is selected, not the custom theme.
            if (li.dataset.isCustom) {
                themeLabToggle.style.display = 'none';
            } else {
                themeLabToggle.style.display = 'flex';
            }
        }
        clearThemeInputBtn.style.display = themeDialogInput.value.length > 0 ? 'flex' : 'none';
    });

    // *** DEFINITIVE FIX: Re-architected OK/Next/Save button handler ***
    themeDialogOk.addEventListener('click', async () => {
        if (isStudioMode) {
            // "Save" button logic
            if (studioBaseColor) {
                const themeToSave = { name: 'My Custom Theme', baseColor: studioBaseColor, modifier: studioActiveModifier || 'bold' };
                // *** FIX: Save the current luminance mode with the custom theme ***
                customTheme = { 
                    ...themeToSave, 
                    mode: currentLuminanceMode 
                };
                localStorage.setItem('launchPadR1CustomTheme', JSON.stringify(customTheme));
                await applyTheme({ name: `custom:${customTheme.baseColor}`, modifier: customTheme.modifier }, true, true);
                await sayOnRabbit("Custom theme saved.");
                isStudioMode = false;
                closeThemeDialog();
            } else {
                themeDialogError.textContent = 'Error: No base color selected.';
            }
        } else { // Default "OK" button
            // *** FIX: Always confirm the theme that is currently being previewed. ***
            // The input box is for display/filtering; currentThemeName holds the true state.
            const themeToConfirm = currentThemeName;
            triggerHaptic();
            const applyResult = await applyTheme({ name: themeToConfirm }, false, true);
            if (applyResult.success) {
                closeThemeDialog();
            } else {
                themeDialogError.textContent = applyResult.error;
            }
        }
    });

    themeDialogInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            themeDialogOk.click();
        }
    });

    themeDialogCancel.addEventListener('click', async () => {
        if (isStudioMode) { // "Back" button
            labCheckbox.checked = false; // This will trigger the change event to exit lab mode
            isStudioMode = false;
            studioActiveModifier = null;
            renderThemeDialog();
            themeLabToggle.style.display = 'none'; // Hide the lab toggle on back
            await applyTheme({ name: `custom:${studioBaseColor}` }); // Revert preview
        } else { // "Cancel" button
            isStudioMode = false;
            closeThemeDialog(true);
        }
    });

    themeDialogReset.addEventListener('click', async () => {
        triggerHaptic();
        await setLuminanceMode('dark', true);
        await applyTheme({ name: 'rabbit' }, false, true);
        closeThemeDialog();
    });

    themeModeToggleBtn.addEventListener('click', toggleLuminanceMode);

    labCheckbox.addEventListener('change', async () => {
        if (labCheckbox.checked) {
            // Entering Lab Mode
            isStudioMode = true;
            studioBaseColor = themeDialogInput.value.trim();
            studioActiveModifier = 'bold'; // Default modifier on enter
            renderThemeDialog();
            themeDialogInput.value = studioBaseColor; // Set input to the base color on entering lab
            updateModifierSelectionUI();
            await updateStudioPreview();
        } else {
            // Exiting Lab Mode (handled by the "Back" button logic in themeDialogCancel)
            themeDialogCancel.click();
        }
    });
}

function openDeleteDialog() {
    const deleteModeRadios = document.querySelectorAll('input[name="delete-mode"]');
    const CHECKBOX_UNCHECKED_SVG = `<svg class="icon-checkbox-unchecked" viewBox="0 0 24 24" fill="currentColor"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>`;
    const CHECKBOX_CHECKED_SVG = `<svg class="icon-checkbox-checked" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;
    const FAVORITE_SVG = `<svg class="icon-favorite" viewBox="0 0 24 24" fill="currentColor"><path d="M12 18.26l-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928z"></path></svg>`;
    let selectedIds = new Set();
    function renderDeleteList() {
        deleteLinksList.innerHTML = '';
        const fragment = document.createDocumentFragment();
        [...links].sort((a, b) => a.description.localeCompare(b.description)).forEach(link => {
            const li = document.createElement('li');
            li.className = 'delete-link-item';
            li.dataset.id = link.id;
            const isFav = favoriteLinkIds.has(link.id);
            const isSelected = selectedIds.has(link.id);
            let icon = isSelected ? CHECKBOX_CHECKED_SVG : (isFav ? FAVORITE_SVG : CHECKBOX_UNCHECKED_SVG);
            li.innerHTML = `<span class="delete-checkbox">${icon}</span><span class="delete-link-item-description">${link.description}</span>`;
            fragment.appendChild(li);
        });
        deleteLinksList.appendChild(fragment);
    }
    function updateSelectionFromMode() {
        const mode = document.querySelector('input[name="delete-mode"]:checked').value;
        selectedIds.clear();
        if (mode === 'all') links.forEach(link => selectedIds.add(link.id));
        else if (mode === 'keep-favs') links.forEach(link => !favoriteLinkIds.has(link.id) && selectedIds.add(link.id));
        renderDeleteList();
    }
    function updateButtonState() {
        const mode = document.querySelector('input[name="delete-mode"]:checked').value;
        deletePromptOk.disabled = mode === 'selected' && selectedIds.size === 0;
    }
    return new Promise((resolve) => {
        document.querySelector('input[name="delete-mode"][value="selected"]').checked = true;
        selectedIds.clear();
        renderDeleteList();
        deletePromptOverlay.style.display = 'flex';
        deleteLinksList.scrollTop = 0;
        deleteLinksList.focus();
        updateButtonState();
        const handleItemClick = (e) => {
            const li = e.target.closest('.delete-link-item');
            if (!li) return;
            document.querySelector('input[name="delete-mode"][value="selected"]').checked = true;
            const id = li.dataset.id;
            if (selectedIds.has(id)) selectedIds.delete(id); else selectedIds.add(id);
            renderDeleteList();
            updateButtonState();
        };
        const handleModeChange = () => { updateSelectionFromMode(); updateButtonState(); };
        deleteLinksList.addEventListener('click', handleItemClick);
        deleteModeRadios.forEach(radio => radio.addEventListener('change', handleModeChange));
        const closeDialog = (value) => {
            deleteLinksList.removeEventListener('click', handleItemClick);
            deleteModeRadios.forEach(radio => radio.removeEventListener('change', handleModeChange));
            deletePromptOverlay.style.display = 'none';
            resolve(value);
        };
        deletePromptOk.onclick = () => closeDialog({ mode: document.querySelector('input[name="delete-mode"]:checked').value, ids: Array.from(selectedIds) });
        deletePromptCancel.onclick = () => closeDialog(null);
    });
}

deleteAllBtn.addEventListener('click', async () => {
    let keepLooping = true;
    while (keepLooping) {
        const result = await openDeleteDialog();
        if (!result || (result.mode === 'selected' && result.ids.length === 0)) {
            keepLooping = false;
            continue;
        }
        let confirmMessage = '';
        let linksToDelete = new Set(result.ids);
        if (result.mode === 'all') confirmMessage = `Are you sure you want to delete all ${links.length} link(s)?`;
        else if (result.mode === 'keep-favs') {
            if (linksToDelete.size === 0) {
                await showAlert("No links to delete (all links are favorites).");
                continue;
            }
            confirmMessage = `Are you sure you want to delete ${linksToDelete.size} non-favorite link(s)?`;
        } else if (result.mode === 'selected') confirmMessage = `Are you sure you want to delete ${linksToDelete.size} selected link(s)?`;
        if (await showConfirm(confirmMessage)) {
            links = links.filter(link => !linksToDelete.has(link.id));
            const remainingLinkIds = new Set(links.map(l => l.id));
            favoriteLinkIds = new Set([...favoriteLinkIds].filter(id => remainingLinkIds.has(id)));
            saveLinks();
            renderLinks();
            scrollToTop();
            await sayOnRabbit("Links deleted.");
            keepLooping = false;
        }
    }
});

document.addEventListener('click', (e) => {
    if (themeDialogOverlay.style.display === 'flex' && !e.target.closest('.custom-prompt-dialog') && !themeBtn.contains(e.target)) {
        closeThemeDialog(true);
    }
});
themeBtn.addEventListener('click', openThemeEditor);
logo.addEventListener('click', goHome);

(async function() {
    setupThemeDialogListeners();
    await applyTheme({ name: currentThemeName }, true);
    updateModeToggleUI();
    deletePromptOverlay.addEventListener('click', e => e.stopPropagation());
    favoritesPromptOverlay.addEventListener('click', e => e.stopPropagation());
    genericPromptOverlay.addEventListener('click', e => e.stopPropagation());
    playerBackBtn.addEventListener('click', closePlayerView);

    playerSearchBtn.addEventListener('click', async () => {
        await showAlert('Coming Soon!');
    });

    playerPlayPauseBtn.addEventListener('click', togglePlayback);

    playerStopBtn.addEventListener('click', closePlayerView);

    playerAudioOnlyBtn.addEventListener('click', () => {
        isAudioOnly = !isAudioOnly;
        playerContainer.classList.toggle('audio-only', isAudioOnly);
        playerAudioOnlyBtn.classList.toggle('active', isAudioOnly);
        triggerHaptic();
        sayOnRabbit(isAudioOnly ? "Audio only" : "Video enabled");
    });

    // Use the correct 'sideClick' event based on the SDK demo.
    window.addEventListener('sideClick', (event) => {
        if (internalPlayerOverlay.style.display === 'flex') {
            // Prevent any default OS action for the click.
            event.preventDefault();
            togglePlayback();
        }
    });

    // --- Scroll Wheel Navigation ---
    // Uses the correct event names found in the SDK documentation.
    // This now handles both the main list and lists within dialogs.
    const SCROLL_AMOUNT_MAIN = 120; // Pixels to scroll on the main page.
    const SCROLL_AMOUNT_DIALOG = 80; // A smaller scroll amount for lists in dialogs.

    function getActiveScrollTarget() {
        if (themeDialogOverlay.style.display === 'flex') return themeColorList;
        if (deletePromptOverlay.style.display === 'flex') return deleteLinksList;
        if (favoritesPromptOverlay.style.display === 'flex') return favoritesList;
        if (youtubeSearchViewOverlay.style.display === 'flex') return youtubeSearchResultsContainer;
        
        // Check if we are on the main view and not in input mode or another overlay.
        const onMainView = internalPlayerOverlay.style.display === 'none' &&
                           genericPromptOverlay.style.display === 'none' &&
                           !mainView.classList.contains('input-mode-active');
        
        if (onMainView) return window;

        return null; // No active target to scroll.
    }

    window.addEventListener('scrollUp', () => {
        const target = getActiveScrollTarget();
        if (target) {
            target.scrollBy({ top: -(target === window ? SCROLL_AMOUNT_MAIN : SCROLL_AMOUNT_DIALOG), behavior: 'smooth' });
        }
    });

    window.addEventListener('scrollDown', () => {
        const target = getActiveScrollTarget();
        if (target) {
            target.scrollBy({ top: (target === window ? SCROLL_AMOUNT_MAIN : SCROLL_AMOUNT_DIALOG), behavior: 'smooth' });
        }
    });
    // --- End of Scroll Wheel Navigation ---

    renderLinks();
})();

function togglePlayback() {
    if (!player || typeof player.getPlayerState !== 'function') return;
    triggerHaptic();
    const playerState = player.getPlayerState();
    if (playerState === YT.PlayerState.PLAYING) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
}

function onPlayerReady(event) {
    // Don't autoplay. The player is ready and will wait for user input.
    // The initial state change to UNSTARTED (-1) will set the UI.
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        // Update title with the full title from the API
        const videoData = player.getVideoData();
        playerVideoTitle.textContent = videoData.title;

        playerPlayPauseBtn.innerHTML = PAUSE_ICON_SVG;
    } else if (event.data === YT.PlayerState.PAUSED ) {
        playerPlayPauseBtn.innerHTML = PLAY_ICON_SVG;
    } else if (event.data === YT.PlayerState.ENDED ) {
        playerPlayPauseBtn.innerHTML = PLAY_ICON_SVG; // Show play icon to allow replay
    } else if (event.data === YT.PlayerState.BUFFERING) {
    } else if (event.data === YT.PlayerState.UNSTARTED) {
        playerPlayPauseBtn.innerHTML = PLAY_ICON_SVG;
    }
=======
// Full Stage 7 app script — SDK polish, quick-launch, delete mode, and basic tests.

// ...existing code...
/* Legacy and v2 storage key definitions */
const LEGACY_KEYS = {
  LINKS: 'launchPadR1Links',
  FAVORITES: 'launchPadR1FavoriteLinkIds',
  VIEW: 'launchPadR1View',
  COLLAPSED: 'launchPadR1CollapsedCategories',
  THEME: 'launchPadR1Theme',
  VOLUME: 'launchPadR1Volume',
  CUSTOM_THEME: 'launchPadR1CustomTheme'
};

const STORAGE_KEYS = {
  LINKS: 'launchPadR1Links_v2',
  FAVORITES: 'launchPadR1FavoriteLinkIds_v2',
  VIEW: 'launchPadR1View_v2',
  COLLAPSED: 'launchPadR1Collapsed_v2',
  THEME: 'launchPadR1Theme_v2',
  VOLUME: 'launchPadR1Volume_v2',
  CUSTOM_THEME: 'launchPadR1CustomTheme_v2'
};

/* SDK-aware storage adapter with remove + migration flag */
const storageAdapter = {
  async get(key) {
    try {
      if (window.rabbit && rabbit.storage && typeof rabbit.storage.get === 'function') {
        const v = await rabbit.storage.get(key);
        return v === undefined ? null : v;
      }
    } catch (e) { console.warn('SDK storage.get failed', e); }
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  },
  async set(key, value) {
    try {
      if (window.rabbit && rabbit.storage && typeof rabbit.storage.set === 'function') {
        await rabbit.storage.set(key, value);
        return;
      }
    } catch (e) { console.warn('SDK storage.set failed', e); }
    localStorage.setItem(key, JSON.stringify(value));
  },
  async remove(key) {
    try {
      if (window.rabbit && rabbit.storage && typeof rabbit.storage.remove === 'function') {
        await rabbit.storage.remove(key);
        return;
      }
    } catch (e) { console.warn('SDK storage.remove failed', e); }
    localStorage.removeItem(key);
  }
};

// ...existing code...
/* Improved migration that handles JSON and plain values, converts lp_links, backups leftovers */
async function migrateLegacyStorageOnce() {
  const migratedFlag = await storageAdapter.get('launchPadR1_migrated_v1');
  if (migratedFlag) return;

  const scanKeys = [
    LEGACY_KEYS.LINKS, LEGACY_KEYS.FAVORITES, LEGACY_KEYS.VIEW, LEGACY_KEYS.COLLAPSED,
    LEGACY_KEYS.THEME, LEGACY_KEYS.VOLUME, LEGACY_KEYS.CUSTOM_THEME,
    'launchPadR1LuminanceMode', 'launchPadR1ShakeSetting', 'launchPadR1UrlNormalized_v1',
    'launchPadView', 'launchPadR1Theme',
    'lp_links', 'lp_categories', 'lp_collapsed', 'lp_collapsed_all', 'lp_collapsed_map'
  ];

  const legacyBackup = {};
  const existingLinks = Array.isArray(await storageAdapter.get(STORAGE_KEYS.LINKS)) ? await storageAdapter.get(STORAGE_KEYS.LINKS) : [];
  const existingFavs = Array.isArray(await storageAdapter.get(STORAGE_KEYS.FAVORITES)) ? await storageAdapter.get(STORAGE_KEYS.FAVORITES) : [];
  const mergedFavSet = new Set(existingFavs);

  const safeParse = (raw) => {
    if (raw === null || raw === undefined) return null;
    try { return JSON.parse(raw); } catch { return raw; }
  };

  const normalizeLink = (item, fallbackIndex) => {
    const id = item.id || item.linkId || item._id || `legacy-${fallbackIndex}-${Date.now()}`;
    const description = item.description || item.title || item.name || item.url || '';
    const url = item.url || item.href || '';
    const category = item.category || item.cat || 'Other';
    const launchPref = item.launchPref || (item.launch === 'external' ? 'external' : undefined);
    return { id, description, url, category, ...(launchPref ? { launchPref } : {}) };
  };

  const lpLinksRaw = localStorage.getItem('lp_links');
  if (lpLinksRaw) {
    const parsed = safeParse(lpLinksRaw);
    if (Array.isArray(parsed)) {
      parsed.forEach((it, idx) => {
        const nl = normalizeLink(it, idx);
        if (!existingLinks.some(e => e.url === nl.url)) existingLinks.push(nl);
        if (it.favorite === true || it.favorite === 'true') mergedFavSet.add(nl.id);
      });
    } else {
      legacyBackup['lp_links'] = parsed;
    }
  }

  for (const key of scanKeys) {
    const raw = localStorage.getItem(key);
    if (raw === null || raw === undefined) continue;
    const parsed = safeParse(raw);
    if (key === 'lp_links') continue;
    try {
      if (key === LEGACY_KEYS.LINKS || key === 'launchPadR1Links') {
        if (Array.isArray(parsed)) {
          parsed.forEach((it, idx) => {
            const nl = normalizeLink(it, idx);
            if (!existingLinks.some(e => e.url === nl.url)) existingLinks.push(nl);
            if (it.favorite === true || it.favorite === 'true') mergedFavSet.add(nl.id);
          });
        } else {
          legacyBackup[key] = parsed;
        }
      } else if (key === LEGACY_KEYS.FAVORITES || key === 'launchPadR1FavoriteLinkIds') {
        if (Array.isArray(parsed)) parsed.forEach(id => mergedFavSet.add(id));
        else legacyBackup[key] = parsed;
      } else if (key === LEGACY_KEYS.VIEW || key === 'launchPadR1View' || key === 'launchPadView') {
        const val = (typeof parsed === 'string') ? parsed : String(parsed || 'list');
        await storageAdapter.set(STORAGE_KEYS.VIEW, val);
      } else if (key === LEGACY_KEYS.VOLUME || key === 'launchPadR1Volume') {
        const num = Number(parsed);
        if (!Number.isNaN(num)) await storageAdapter.set(STORAGE_KEYS.VOLUME, Math.max(0, Math.min(100, Math.round(num))));
        else legacyBackup[key] = parsed;
      } else if (key === LEGACY_KEYS.COLLAPSED || key === 'lp_collapsed_map' || key === 'lp_collapsed' || key === 'lp_collapsed_all') {
        if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
          const arr = Object.keys(parsed).filter(k => !!parsed[k]);
          await storageAdapter.set(STORAGE_KEYS.COLLAPSED, arr);
        } else if (Array.isArray(parsed)) {
          await storageAdapter.set(STORAGE_KEYS.COLLAPSED, parsed);
        } else if (parsed === 'true' || parsed === true) {
          const catsRaw = localStorage.getItem('lp_categories');
          const catsParsed = safeParse(catsRaw);
          if (Array.isArray(catsParsed)) await storageAdapter.set(STORAGE_KEYS.COLLAPSED, catsParsed);
        } else {
          legacyBackup[key] = parsed;
        }
      } else if (key === LEGACY_KEYS.THEME || key === 'launchPadR1Theme' || key === LEGACY_KEYS.CUSTOM_THEME) {
        if (parsed && typeof parsed === 'object' && parsed.palette) {
          await storageAdapter.set(STORAGE_KEYS.THEME, parsed);
        } else if (typeof parsed === 'string') {
          await storageAdapter.set(STORAGE_KEYS.THEME, { name: parsed });
        } else {
          legacyBackup[key] = parsed;
        }
      } else {
        legacyBackup[key] = parsed;
      }
    } catch (e) {
      legacyBackup[key] = parsed;
    }
  }

  if (existingLinks.length > 0) {
    await storageAdapter.set(STORAGE_KEYS.LINKS, existingLinks);
  }
  const favArray = Array.from(mergedFavSet);
  await storageAdapter.set(STORAGE_KEYS.FAVORITES, favArray);

  const existingBackup = await storageAdapter.get('launchPadR1_legacy_backup_v1') || {};
  const mergedBackup = { ...existingBackup, ...legacyBackup };
  if (Object.keys(mergedBackup).length > 0) {
    await storageAdapter.set('launchPadR1_legacy_backup_v1', mergedBackup);
  }

  const removeKeys = scanKeys.concat(['launchPadR1FavoriteLinkIds','launchPadView','launchPadR1LuminanceMode','launchPadR1ShakeSetting','launchPadR1UrlNormalized_v1','lp_links','lp_categories','lp_collapsed','lp_collapsed_all','lp_collapsed_map']);
  for (const k of removeKeys) {
    try { await storageAdapter.remove(k); } catch (e) { try { localStorage.removeItem(k); } catch{} }
  }

  await storageAdapter.set('launchPadR1_migrated_v1', true);
}

// ...existing code...
/* DOM refs */
const cardContainer = document.getElementById('card-container');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search');
const viewToggleBtn = document.getElementById('view-toggle');
const collapseAllBtn = document.getElementById('collapse-all');
const quickLaunchBtn = document.getElementById('quick-launch');
const themeOpenBtn = document.getElementById('theme-open');
const deleteModeBtn = document.getElementById('delete-mode');
const addLinkBtn = document.getElementById('add-link');
const overlayRoot = document.getElementById('overlay-root');
const volumeSlider = document.getElementById('volume-slider');

// ...existing code...
/* State */
let links = [];
let favoriteLinkIds = new Set();
let currentView = 'list';
let collapsedCategories = [];
let currentTheme = { name: 'Rabbit', palette: (typeof defaultTheme !== 'undefined' ? defaultTheme.dark : {}), mode: 'dark' };
let deleteMode = false; // NEW: delete mode toggle

// ...existing code...
/* Utilities */
function idFor(link, i) { return link.id || `link-${i}-${Date.now()}`; }
function safeHostname(url) { try { return new URL(url).hostname; } catch { return ''; } }
function faviconFor(url) {
  const host = safeHostname(url);
  return host ? `https://www.google.com/s2/favicons?sz=64&domain=${host}` :
    'data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27%23888%27%3e%3cpath d=%27M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z%27/%3e%3c/svg%3e';
}

// ...existing code...
/* Theme handling */
async function applyPalette(palette) {
  if (!palette) return;
  Object.keys(palette).forEach(k => {
    try { document.documentElement.style.setProperty(k, palette[k]); } catch {}
  });
  try {
    if (window.rabbit && rabbit.hmi && rabbit.hmi.theme && typeof rabbit.hmi.theme.apply === 'function') {
      rabbit.hmi.theme.apply(palette);
    }
  } catch (e) { console.warn('SDK theme.apply failed', e); }
  await storageAdapter.set(STORAGE_KEYS.THEME, { palette, mode: currentTheme.mode, name: currentTheme.name });
}

// ...existing code...
/* Overlay helpers */
function openDialog(html) {
  overlayRoot.innerHTML = '';
  overlayRoot.removeAttribute('aria-hidden');
  const node = document.createElement('div');
  node.className = 'dialog';
  node.innerHTML = html;
  overlayRoot.appendChild(node);
  return node;
}
function closeDialog() {
  overlayRoot.innerHTML = '';
  overlayRoot.setAttribute('aria-hidden', 'true');
}

// ...existing code...
/* CRUD + dialogs (SDK-first) */
async function promptAddLink() {
  if (window.rabbit && rabbit.hmi && rabbit.hmi.dialog && typeof rabbit.hmi.dialog.open === 'function') {
    try {
      const res = await rabbit.hmi.dialog.open({
        title: 'Add Link',
        inputs: [
          { id: 'description', label: 'Description', type: 'text' },
          { id: 'url', label: 'URL', type: 'url' },
          { id: 'category', label: 'Category', type: 'text' }
        ],
        buttons: [{ id: 'save', label: 'Save' }, { id: 'cancel', label: 'Cancel', role: 'cancel' }]
      });
      if (res && res.action === 'save' && res.values) {
        await createLink(res.values.description || res.values.url, res.values.url, res.values.category || 'Other');
      }
      return;
    } catch (e) { console.warn('SDK dialog failed, fallback', e); }
  }

  const html = `
    <h2>Add Link</h2>
    <div class="row"><input id="dlg-desc" type="text" placeholder="Description" /></div>
    <div class="row"><input id="dlg-url" type="url" placeholder="https://example.com" /></div>
    <div class="row"><input id="dlg-cat" type="text" placeholder="Category" /></div>
    <div class="actions">
      <button id="dlg-save">Save</button>
      <button id="dlg-cancel" class="secondary">Cancel</button>
    </div>
  `;
  const d = openDialog(html);
  d.querySelector('#dlg-save').addEventListener('click', async () => {
    const desc = d.querySelector('#dlg-desc').value.trim();
    const url = d.querySelector('#dlg-url').value.trim();
    const cat = d.querySelector('#dlg-cat').value.trim();
    if (!url) { alert('URL required'); return; }
    await createLink(desc || url, url, cat || 'Other');
    closeDialog();
  });
  d.querySelector('#dlg-cancel').addEventListener('click', () => closeDialog());
}

async function promptEditLink(id) {
  const link = links.find(l => l.id === id);
  if (!link) return;
  if (window.rabbit && rabbit.hmi && rabbit.hmi.dialog && typeof rabbit.hmi.dialog.open === 'function') {
    try {
      const res = await rabbit.hmi.dialog.open({
        title: 'Edit Link',
        inputs: [
          { id: 'description', label: 'Description', type: 'text', value: link.description },
          { id: 'url', label: 'URL', type: 'url', value: link.url },
          { id: 'category', label: 'Category', type: 'text', value: link.category }
        ],
        buttons: [{ id: 'save', label: 'Save' }, { id: 'cancel', label: 'Cancel', role: 'cancel' }]
      });
      if (res && res.action === 'save' && res.values) {
        await updateLink(id, res.values.description || res.values.url, res.values.url, res.values.category || 'Other');
      }
      return;
    } catch (e) { console.warn('SDK dialog failed, fallback', e); }
  }

  const html = `
    <h2>Edit Link</h2>
    <div class="row"><input id="dlg-desc" type="text" value="${(link.description||'').replace(/"/g,'&quot;')}" /></div>
    <div class="row"><input id="dlg-url" type="url" value="${(link.url||'').replace(/"/g,'&quot;')}" /></div>
    <div class="row"><input id="dlg-cat" type="text" value="${(link.category||'').replace(/"/g,'&quot;')}" /></div>
    <div class="actions">
      <button id="dlg-save">Save</button>
      <button id="dlg-cancel" class="secondary">Cancel</button>
    </div>
  `;
  const d = openDialog(html);
  d.querySelector('#dlg-save').addEventListener('click', async () => {
    const desc = d.querySelector('#dlg-desc').value.trim();
    const url = d.querySelector('#dlg-url').value.trim();
    const cat = d.querySelector('#dlg-cat').value.trim();
    if (!url) { alert('URL required'); return; }
    await updateLink(id, desc || url, url, cat || 'Other');
    closeDialog();
  });
  d.querySelector('#dlg-cancel').addEventListener('click', () => closeDialog());
}

async function confirmDelete(id) {
  if (window.rabbit && rabbit.hmi && typeof rabbit.hmi.dialog === 'object' && typeof rabbit.hmi.dialog.confirm === 'function') {
    try {
      const ok = await rabbit.hmi.dialog.confirm({ title: 'Delete link?', message: 'This will remove the link.' });
      return !!ok;
    } catch (e) { console.warn('SDK confirm failed', e); }
  }
  return confirm('Delete this link?');
}

async function createLink(description, url, category) {
  const entry = { id: idFor({ description, url }, links.length), description, url, category };
  links.unshift(entry);
  await saveState();
  renderLinks(searchInput.value);
}

async function updateLink(id, description, url, category) {
  const idx = links.findIndex(l => l.id === id);
  if (idx === -1) return;
  links[idx] = { ...links[idx], description, url, category };
  await saveState();
  renderLinks(searchInput.value);
}

async function deleteLink(id) {
  const ok = await confirmDelete(id);
  if (!ok) return;
  links = links.filter(l => l.id !== id);
  favoriteLinkIds.delete(id);
  await saveState();
  renderLinks(searchInput.value);
}

// ...existing code...
/* Rendering */
function renderCardItem(link) {
  if (window.rabbit && rabbit.hmi && typeof rabbit.hmi.card === 'function') {
    try {
      const card = rabbit.hmi.card({
        role: 'listitem',
        title: link.description,
        subtitle: link.url,
        accessory: { icon: faviconFor(link.url) },
        actions: [
          { id: 'fav', label: favoriteLinkIds.has(link.id) ? 'Unfavorite' : 'Favorite' },
          { id: 'edit', label: 'Edit' },
          { id: 'delete', label: 'Delete' }
        ]
      });
      card.dataset = card.dataset || {};
      card.dataset.id = link.id;
      return card;
    } catch (e) { console.warn('SDK card failed', e); }
  }
  const el = document.createElement('article');
  el.className = 'sdk-card';
  el.setAttribute('role','listitem');
  el.dataset.id = link.id;
  el.innerHTML = `
    <div class="card-left">
      <img class="link-favicon" src="${faviconFor(link.url)}" alt="">
      <div class="link-description" title="${(link.description||'').replace(/"/g,'&quot;')}">${link.description}</div>
    </div>
    <div class="card-actions" aria-hidden="true">
      <button class="favorite-btn" title="Favorite">☆</button>
      <button class="edit-btn" title="Edit">✎</button>
      <button class="delete-btn" title="Delete">🗑️</button>
    </div>
  `;
  if (favoriteLinkIds.has(link.id)) el.querySelector('.favorite-btn').classList.add('is-favorite');
  if (deleteMode) el.classList.add('delete-mode'); else el.classList.remove('delete-mode');
  return el;
}

// ...existing code...
function groupByCategory(list) {
  return list.reduce((acc, l) => {
    const c = l.category || 'Other';
    (acc[c] = acc[c] || []).push(l);
    return acc;
  }, {});
}

function renderPlaceholder(text) { cardContainer.innerHTML = `<div class="placeholder">${text}</div>`; }

async function renderLinks(filter = '') {
  const q = (filter||'').trim().toLowerCase();
  if (!links || links.length === 0) { renderPlaceholder('No links yet.'); return; }
  const filtered = q ? links.filter(l => (l.description||'').toLowerCase().includes(q) || (l.url||'').toLowerCase().includes(q)) : links;
  if (filtered.length === 0) { renderPlaceholder('No matches.'); return; }
  cardContainer.innerHTML = '';
  if (currentView === 'list') {
    const frag = document.createDocumentFragment();
    filtered.forEach(link => frag.appendChild(renderCardItem(link)));
    cardContainer.appendChild(frag);
  } else {
    const grouped = groupByCategory(filtered);
    const cats = Object.keys(grouped).sort((a,b) => a === 'Other' ? 1 : a.localeCompare(b));
    const frag = document.createDocumentFragment();
    cats.forEach(cat => {
      const header = document.createElement('h3');
      header.className = 'category-header';
      header.textContent = cat;
      frag.appendChild(header);
      const container = document.createElement('div');
      container.className = 'links-container';
      container.dataset.category = cat;
      if (collapsedCategories.includes(cat)) container.classList.add('hidden');
      grouped[cat].forEach(link => container.appendChild(renderCardItem(link)));
      frag.appendChild(container);
    });
    cardContainer.appendChild(frag);
  }
}

// ...existing code...
/* Initial data + persistence using storageAdapter */
const SAMPLE_LINKS = [
  { id: 'yt1', description: 'YouTube', url: 'https://youtube.com', category: 'Media' },
  { id: 'gh1', description: 'GitHub', url: 'https://github.com', category: 'Dev' },
  { id: 'news1', description: 'Hacker News', url: 'https://news.ycombinator.com', category: 'News' }
];

async function ensureInitialData() {
  await migrateLegacyStorageOnce();

  const storedLinks = await storageAdapter.get(STORAGE_KEYS.LINKS);
  if (!storedLinks || !Array.isArray(storedLinks) || storedLinks.length === 0) {
    links = SAMPLE_LINKS.map((l,i) => ({ ...l, id: idFor(l,i) }));
    await storageAdapter.set(STORAGE_KEYS.LINKS, links);
  } else {
    links = storedLinks.map((l,i) => ({ ...l, id: l.id || idFor(l,i) }));
  }

  const favs = await storageAdapter.get(STORAGE_KEYS.FAVORITES);
  favoriteLinkIds = new Set(Array.isArray(favs) ? favs : []);

  const view = await storageAdapter.get(STORAGE_KEYS.VIEW);
  currentView = view || 'list';

  const collapsed = await storageAdapter.get(STORAGE_KEYS.COLLAPSED);
  collapsedCategories = Array.isArray(collapsed) ? collapsed : [];

  const vol = await storageAdapter.get(STORAGE_KEYS.VOLUME);
  setVolume(typeof vol === 'number' ? vol : 80, false);

  const theme = await storageAdapter.get(STORAGE_KEYS.THEME);
  if (theme && theme.palette) {
    currentTheme = { name: theme.name || 'Custom', palette: theme.palette, mode: theme.mode || 'dark' };
    applyPalette(currentTheme.palette);
  } else if (theme && theme.name && !theme.palette) {
    currentTheme = { name: theme.name, palette: (defaultTheme && defaultTheme.dark), mode: 'dark' };
    applyPalette(currentTheme.palette);
  } else {
    await loadTheme();
  }
}

async function saveState() {
  await storageAdapter.set(STORAGE_KEYS.LINKS, links);
  await storageAdapter.set(STORAGE_KEYS.FAVORITES, Array.from(favoriteLinkIds));
  await storageAdapter.set(STORAGE_KEYS.VIEW, currentView);
  await storageAdapter.set(STORAGE_KEYS.COLLAPSED, collapsedCategories);
}

// ...existing code...
/* Event handling */
function attachListHandlers() {
  cardContainer.addEventListener('click', async (e) => {
    const card = e.target.closest('.sdk-card');
    const sdkCard = e.target.closest('[data-rabbit-card]');
    const node = card || sdkCard;
    if (!node) return;
    const id = node.dataset.id;
    if (!id) return;

    // If delete-mode is active, any tap deletes the link (with confirm)
    if (deleteMode && !e.target.closest('.favorite-btn') && !e.target.closest('.edit-btn')) {
      await deleteLink(id);
      return;
    }

    if (e.target.closest('.favorite-btn')) {
      if (favoriteLinkIds.has(id)) favoriteLinkIds.delete(id); else favoriteLinkIds.add(id);
      await saveState();
      await renderLinks(searchInput.value);
      return;
    }
    if (e.target.closest('.delete-btn')) {
      await deleteLink(id);
      return;
    }
    if (e.target.closest('.edit-btn')) {
      await promptEditLink(id);
      return;
    }
    const link = links.find(l => l.id === id);
    if (!link) return;
    if (window.rabbit && rabbit.core && typeof rabbit.core.launchUrl === 'function') {
      try { await rabbit.core.launchUrl({ url: link.url }); return; } catch (err) { console.warn(err); }
    }
    window.open(link.url, '_blank');
  });

  cardContainer.addEventListener('click', (e) => {
    const header = e.target.closest('.category-header');
    if (!header) return;
    const next = header.nextElementSibling;
    if (!next) return;
    const cat = next.dataset.category || header.textContent;
    const isHidden = next.classList.toggle('hidden');
    if (isHidden) { if (!collapsedCategories.includes(cat)) collapsedCategories.push(cat); }
    else { collapsedCategories = collapsedCategories.filter(c => c !== cat); }
    saveState();
  });
}

// ...existing code...
/* Controls wiring */
function wireControls() {
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value;
    clearSearchBtn.hidden = !q;
    renderLinks(q);
  });
  clearSearchBtn.addEventListener('click', () => { searchInput.value=''; clearSearchBtn.hidden=true; renderLinks(''); });

  viewToggleBtn.addEventListener('click', async () => {
    currentView = currentView === 'list' ? 'group' : 'list';
    viewToggleBtn.setAttribute('aria-pressed', currentView === 'group');
    await saveState();
    renderLinks(searchInput.value);
  });

  collapseAllBtn.addEventListener('click', async () => {
    if (currentView === 'group') {
      collapsedCategories = Array.from(new Set(links.map(l => l.category || 'Other')));
      await saveState();
      renderLinks(searchInput.value);
    }
  });

  addLinkBtn.addEventListener('click', promptAddLink);

  // Quick launch: show favorites in SDK dialog or our dialog
  quickLaunchBtn.addEventListener('click', async () => {
    const favs = links.filter(l => favoriteLinkIds.has(l.id));
    if (favs.length === 0) { alert('No favorites set.'); return; }
    if (window.rabbit && rabbit.hmi && rabbit.hmi.dialog && typeof rabbit.hmi.dialog.open === 'function') {
      try {
        const items = favs.map(f => ({ id: f.id, label: f.description || f.url, subtitle: f.url }));
        const res = await rabbit.hmi.dialog.open({ title: 'Quick Launch', items, buttons: [{ id: 'open', label: 'Open' }, { id: 'cancel', label: 'Cancel', role: 'cancel' }], selectable: true });
        if (res && res.action === 'open' && res.selected) {
          const sel = favs.find(ff => ff.id === res.selected);
          if (sel) {
            if (window.rabbit && rabbit.core && typeof rabbit.core.launchUrl === 'function') { try { await rabbit.core.launchUrl({ url: sel.url }); } catch{} }
            else window.open(sel.url, '_blank');
          }
        }
        return;
      } catch (e) { console.warn('SDK quickLaunch dialog failed', e); }
    }
    // fallback dialog
    const html = `<h2>Quick Launch</h2><div id="ql-list"></div><div class="actions"><button id="ql-close" class="secondary">Close</button></div>`;
    const d = openDialog(html);
    const list = d.querySelector('#ql-list');
    favs.forEach(f => {
      const btn = document.createElement('button');
      btn.textContent = f.description || f.url;
      btn.style.display = 'block';
      btn.style.width = '100%';
      btn.style.margin = '6px 0';
      btn.addEventListener('click', () => {
        if (window.rabbit && rabbit.core && typeof rabbit.core.launchUrl === 'function') { rabbit.core.launchUrl({ url: f.url }).catch(() => window.open(f.url,'_blank')); }
        else window.open(f.url, '_blank');
        closeDialog();
      });
      list.appendChild(btn);
    });
    d.querySelector('#ql-close').addEventListener('click', () => closeDialog());
  });

  // Toggle delete mode
  deleteModeBtn.addEventListener('click', async () => {
    deleteMode = !deleteMode;
    deleteModeBtn.setAttribute('aria-pressed', deleteMode);
    document.body.classList.toggle('delete-mode', deleteMode);
    // re-render so cards reflect delete-mode
    renderLinks(searchInput.value);
  });

  themeOpenBtn.addEventListener('click', openThemeEditor);
  deleteModeBtn.addEventListener('dblclick', async () => {
    // dblclick clears favorites as a quick diagnostic (protected)
    if (!confirm('Clear all favorites?')) return;
    favoriteLinkIds.clear();
    await saveState();
    renderLinks(searchInput.value);
  });
  if (volumeSlider) volumeSlider.addEventListener('input', (e) => setVolume(e.target.value, true));
}

// ...existing code...
/* Volume */
async function setVolume(v, persist = true) {
  const vol = Math.max(0, Math.min(100, Math.round(Number(v) || 0)));
  if (volumeSlider) volumeSlider.value = vol;
  try {
    if (window.rabbit && rabbit.core && typeof rabbit.core.setVolume === 'function') {
      await rabbit.core.setVolume(vol);
    }
  } catch (e) { console.warn('SDK setVolume failed', e); }
  if (persist) await storageAdapter.set(STORAGE_KEYS.VOLUME, vol);
}

// ...existing code...
/* Theme editor UI */
function openThemeEditor() {
  try {
    if (window.rabbit && rabbit.hmi && rabbit.hmi.theme && typeof rabbit.hmi.theme.open === 'function') {
      rabbit.hmi.theme.open();
      return;
    }
  } catch (e) { console.warn('SDK theme open failed', e); }

  const html = `
    <h2>Theme</h2>
    <div class="row">
      <input id="theme-color" type="text" placeholder="#ff7043" value="${currentTheme.palette && currentTheme.palette['--primary-color'] ? currentTheme.palette['--primary-color'] : '#ff7043'}" />
      <div class="theme-preview"><div id="theme-swatch" class="theme-swatch" style="background:${currentTheme.palette && currentTheme.palette['--primary-color'] ? currentTheme.palette['--primary-color'] : '#ff7043'}"></div></div>
    </div>
    <div class="row">
      <select id="theme-mod">
        <option value="">(none)</option>
        <option value="vibrant">vibrant</option>
        <option value="pastel">pastel</option>
        <option value="neon">neon</option>
        <option value="bold">bold</option>
      </select>
      <select id="theme-mode"><option value="dark" ${currentTheme.mode==='dark'?'selected':''}>dark</option><option value="light" ${currentTheme.mode==='light'?'selected':''}>light</option></select>
    </div>
    <div id="theme-feedback" class="row" style="font-size:0.85rem;color:var(--icon-color)"></div>
    <div class="actions">
      <button id="theme-apply">Apply</button>
      <button id="theme-cancel" class="secondary">Cancel</button>
    </div>
  `;
  const d = openDialog(html);
  const colorInput = d.querySelector('#theme-color');
  const modSelect = d.querySelector('#theme-mod');
  const modeSelect = d.querySelector('#theme-mode');
  const swatch = d.querySelector('#theme-swatch');
  const feedback = d.querySelector('#theme-feedback');

  colorInput.addEventListener('input', () => { swatch.style.background = colorInput.value || '#ff7043'; feedback.textContent = ''; });
  d.querySelector('#theme-apply').addEventListener('click', async () => {
    const col = colorInput.value.trim() || '#ff7043';
    const mod = modSelect.value || null;
    const mode = modeSelect.value || 'dark';
    const res = await setThemeFromColor(col, mod, mode);
    if (!res) { feedback.textContent = 'Unable to parse color.'; return; }
    if (res.contrast && res.contrast < 3) {
      feedback.textContent = `Applied but low contrast (${res.contrast.toFixed(2)}). Consider different color/modifier.`;
    } else {
      feedback.textContent = 'Theme applied.';
    }
    closeDialog();
  });
  d.querySelector('#theme-cancel').addEventListener('click', () => closeDialog());
}

// ...existing code...
/* Boot */
function attachListHandlersOnce() {
  if (cardContainer && cardContainer._handlersAttached) return;
  if (cardContainer) attachListHandlers();
  if (cardContainer) cardContainer._handlersAttached = true;
}

async function init() {
  await ensureInitialData();
  attachListHandlersOnce();
  wireControls();
  renderLinks();
  try {
    if (window.rabbit && rabbit.hmi && typeof rabbit.hmi.on === 'function') {
      rabbit.hmi.on('volumeChanged', (val) => setVolume(val, false));
    }
  } catch (e) {}
}

init();

// NEW: Basic Stage 7 tests you can run from DevTools console with runStage7Tests()
async function runStage7Tests() {
  const results = [];
  try {
    // storage keys present?
    const keys = ['launchPadR1Links_v2','launchPadR1FavoriteLinkIds_v2','launchPadR1Theme_v2','launchPadR1Volume_v2'];
    for (const k of keys) {
      const v = await storageAdapter.get(k);
      results.push({ test: `key:${k}`, ok: v !== null, value: v });
    }
    // CRUD test: add link, update, delete
    const before = (await storageAdapter.get(STORAGE_KEYS.LINKS)) || [];
    const testLink = { id: `test-${Date.now()}`, description: 'Stage7 Test', url: 'https://example.com/stage7', category: 'Test' };
    links = Array.isArray(links) ? links : [];
    links.unshift(testLink);
    await saveState();
    const saved = await storageAdapter.get(STORAGE_KEYS.LINKS);
    results.push({ test: 'createLink', ok: Array.isArray(saved) && saved.some(l => l.url === testLink.url) });
    // update
    testLink.description = 'Stage7 Test Updated';
    const idx = links.findIndex(l => l.id === testLink.id);
    if (idx !== -1) { links[idx] = testLink; await saveState(); }
    const updated = await storageAdapter.get(STORAGE_KEYS.LINKS);
    results.push({ test: 'updateLink', ok: updated.some(l => l.description === 'Stage7 Test Updated') });
    // delete
    links = links.filter(l => l.id !== testLink.id);
    await saveState();
    const afterDel = await storageAdapter.get(STORAGE_KEYS.LINKS);
    results.push({ test: 'deleteLink', ok: !afterDel.some(l => l.id === testLink.id) });
    // restore previous (merge any missing from before)
    await storageAdapter.set(STORAGE_KEYS.LINKS, before);

  } catch (e) {
    results.push({ test: 'exception', ok: false, error: String(e) });
  }
  console.table(results);
  return results;
>>>>>>> 7b9a7b61d4dd3b20ed083ee58dfa68598c88de29
}