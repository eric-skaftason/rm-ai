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
        
        const toggle_option = document.createElement('div');
        toggle_option.classList.add('toggle_option');

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


        toggle_option.append(checkbox);
        toggle_option.append(desc);

        options_ele.append(toggle_option);
        
    }
};
load_settings();


function toggle_setting(key) {
    const toggled_setting_value = !settings_manager.getSetting(key);
    settings_manager.set(key, toggled_setting_value);

    console.log(toggled_setting_value)

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