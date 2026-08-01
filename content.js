console.log("RM-AI");

async function getSetting(key) {
    const settings = await chrome.storage.sync.get('settings');
    if (!settings) return this.#settings = default_settings;  
    this.#settings = settings;
}

async function mutation_observer_callback() {
    if (await getSetting('rm-google-overview')) {
        const YzCcne = document.querySelector('.YzCcne');

        if (!YzCcne) return;

        if (await getSetting('google-overview-note')) {
            YzCcne.classList.remove('YzCcne');
            YzCcne.innerHTML = `
                <button style="display: inline-flex; align-items: center; justify-content: center; padding: 10px 20px; font-family: 'Courier New', Courier, monospace; font-size: 14px; font-weight: 600; color: #121212; background-color: #10b981; border: none; border-radius: 6px; cursor: pointer;">
                    Click Me
                </button>
            `;
        } else {
            YzCcne.remove();
        }
    }
    
}

const init_mutation_observer = (() => {
    const mutation_observer = new MutationObserver(mutation_observer_callback);

    const config = { attributes: true, childList: true, subtree: true };
    mutation_observer.observe(document, config);
})();