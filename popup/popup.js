import { Settings } from "./Settings.js";


const settings_manager = new Settings();
await settings_manager.init();

const settings_order_obj = await chrome.storage.sync.get("settings_order");
const settings_order = settings_order_obj.settings_order;


async function load_settings() {
    const settings = await settings_manager.getAllSettings();
    const options_ele = document.querySelector('.options');
    options_ele.innerHTML = '';
    for (const key of settings_order) {
        const setting = settings[key];

        let setting_ele = document.createElement('div');
        setting_ele.classList.add("option");
        
        if (setting.type === "toggle") {
            setting_ele.classList.add('toggle_option');

            const checkbox = document.createElement('div');
            checkbox.classList.add('checkbox');
            checkbox.id = key;
            if (setting.value === true) checkbox.classList.add('filled');
            checkbox.addEventListener('click', () => {
                toggle_setting(key);
            });

            const desc = document.createElement('div');
            desc.classList.add('desc');

            desc.innerText = setting.display_text;


            setting_ele.append(checkbox);
            setting_ele.append(desc);
        } else if (setting.type === "list") {
            setting_ele.classList.add('list_option');

            const label = document.createElement('div');
            label.classList.add('label');
            label.innerText = setting.display_text;

            const input = document.createElement('textarea');
            input.classList.add('input');

            input.innerText = setting.value.join(',');


            setting_ele.append(label);
            setting_ele.append(input);

        } else if (setting.type === "heading") {
            setting_ele.classList.add("heading");
            setting_ele.innerText = setting.display_text;
        }
        

        options_ele.append(setting_ele);
        
    }
};
load_settings();


function toggle_setting(key) {
    const toggled_setting_value = !settings_manager.getSetting(key);
    settings_manager.set(key, toggled_setting_value);

    if (toggled_setting_value) {
        document.querySelector(`#${key}`).classList.add('filled');
    } else {
        document.querySelector(`#${key}`).classList.remove('filled');
    }
    
}

document.querySelector('#reset').addEventListener('click', async () => {
    await settings_manager.reset();
    await load_settings();
});