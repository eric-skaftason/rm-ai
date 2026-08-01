console.log("RM-AI");

async function getSetting(key) {
    const settings = await chrome.storage.sync.get('settings');
    return settings.settings[key].value;
}

async function onPageLoad() {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = chrome.runtime.getURL('content.css');
    document.head.append(css);
}

// Check if DOM is already parsed; if not, add an event listener
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onPageLoad);
} else {
    onPageLoad();
}


async function mutation_observer_callback() {
    const YzCcne_elements = document.querySelectorAll('.YzCcne');
    if (YzCcne_elements.length === 0) return;

    if (await getSetting('rm-google-overview')) {
        for (const YzCcne of YzCcne_elements) {

            if (YzCcne.getAttribute('data-rm-processed') === "true") continue;

            YzCcne.setAttribute('hidden', true);
            YzCcne.setAttribute('data-rm-processed', true);

            if (await getSetting('google-overview-note')) {

                const note_btn = document.createElement('div');
                note_btn.classList.add('show_overview_btn');
                note_btn.innerText = 'Show AI overview.';

                note_btn.addEventListener('click', () => {
                    note_btn.remove();
                    YzCcne.removeAttribute('hidden');
                });

                YzCcne.before(note_btn);

            }
        }
    }
    
}

const init_mutation_observer = (() => {
    const mutation_observer = new MutationObserver(mutation_observer_callback);

    const config = { attributes: true, childList: true, subtree: true };
    mutation_observer.observe(document, config);
})();