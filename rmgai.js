console.log("RM-AI");

async function getSetting(key) {
    const settings = await chrome.storage.sync.get('settings');
    return settings.settings[key].value;
}

async function onPageLoad() {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = chrome.runtime.getURL('rmgai.css');
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
    
    if (await getSetting('rm-google-overview') && YzCcne_elements.length > 0) {
        for (const YzCcne of YzCcne_elements) {

            if (YzCcne.getAttribute('data-rm-processed') === "true") continue;

            if (YzCcne.textContent.length === 0) continue;

            YzCcne.setAttribute('hidden', true);
            YzCcne.setAttribute('data-rm-processed', true);

            if (await getSetting('google-overview-note')) {

                if (document.querySelectorAll('.show_overview_btn').length > 0) continue;

                const note_btn = document.createElement('div');
                note_btn.classList.add('show_overview_btn');
                note_btn.innerText = 'Click to enable A.I. overview.';

                note_btn.addEventListener('click', () => {
                    note_btn.remove();
                    YzCcne.removeAttribute('hidden');
                });

                document.querySelector(".eqAnXb").prepend(note_btn);

            }
        }
    }

    if (await getSetting('google-ai-mode-buttons')) {
        // Remove AI mode at top menu
        const firstMode = document.querySelector(".XVMlrc");
        if (firstMode?.textContent === "AI Mode") firstMode.remove();

        // Remove AI mode button on google.com
        const aiBtn = document.querySelector(".plR5qb");
        if (aiBtn) aiBtn.remove();
    }

    
    
}

const init_mutation_observer = (() => {
    const mutation_observer = new MutationObserver(mutation_observer_callback);

    const config = { attributes: true, childList: true, subtree: true };
    mutation_observer.observe(document, config);
})();