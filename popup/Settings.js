const settings_order = [
    "rm-google-overview", "google-overview-note", "google-ai-mode-buttons"
];
chrome.storage.sync.set({ settings_order: settings_order });


const default_settings = {
    "rm-google-overview": {
        value: true,
        type: "toggle",
        display_text: "Remove Google AI Overview"
    },
    "google-overview-note": {
        value: true,
        type: "toggle",
        restrictions: {
            requires: ["rm-google-overview"]
        },
        display_text: "Add Button to Show AI Overview Once"
    },
    "google-ai-mode-buttons": {
        value: true,
        type: "toggle",
        display_text: "Remove AI mode buttons"
    }


};


class Settings {

    #settings = {};

    async init() {
        await this.loadSettings();
    }

    async loadSettings() {
        const result = await chrome.storage.sync.get('settings'); 
        
        if (!result || !result.settings) {
            // deep clone
            this.#settings = JSON.parse(JSON.stringify(default_settings));
            await this.save();
            return;
        }

        this.#settings = result.settings;
    }
    
    set(setting_key, setting_value) {
        this.#settings[setting_key].value = setting_value;

        this.save();
    }

    getAllSettings() {
        return this.#settings;
    }

    getSetting(setting_key) {
        return this.#settings[setting_key].value;
    }

    async save() {
        chrome.storage.sync.set({ settings: this.#settings });
    }

    async reset() {
        await chrome.storage.sync.remove("settings");
        this.#settings = JSON.parse(JSON.stringify(default_settings));
        await this.save();
    }
}

export { Settings };