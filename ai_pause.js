let messages = [
    "Try giving this a quick thought!",
    "Take a minute to think.",
    "Trust your own mind!",
    "~The LLM is always right~",
    "Think.",
    "Any ideas?",
    "Stay a while, and think.",
    "No artificial preservatives!",
    "Pause for a second.",
    "Outsourcing the brain now, are we?",
    "If you must...",
    "Try: human intelligence!",
    "10g of protein",
    "Have you forgotten about google.com?"
];
function randMessage() {
    return messages[Math.floor(Math.random() * messages.length)];
}

async function getSetting(key) {
    const settings = await chrome.storage.sync.get('settings');
    return settings.settings[key].value;
}


const modal = document.createElement('div');
modal.classList.add('modal');

const message = document.createElement('h1');
message.classList.add('message');
message.innerText = randMessage();

// const exit = document.createElement('div');
// exit.classList.add('exit');
// exit.innerText = "Cancel";

const label = document.createElement('p');
label.innerText = "Loading page in..."

const INITIAL_COUNTER = 20;
let counter = INITIAL_COUNTER;
const timer = document.createElement('h1');
timer.classList.add('timer');
timer.innerText = counter;


modal.append(message);
// modal.append(exit);
modal.append(label);
modal.append(timer);

// const init_mutation_observer = (() => {
//     const mutation_observer = new MutationObserver(mutation_observer_callback);

//     const config = { attributes: true, childList: true, subtree: true };
//     mutation_observer.observe(document, config);
// })();

// function mutation_observer_callback() {
//     document.body.append(modal);
// }


document.addEventListener("DOMContentLoaded", async () => {

    if (await getSetting("ai-pause")) {
        document.body.append(modal);

        const css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = chrome.runtime.getURL('ai_pause.css');
        document.head.append(css);

        
        setInterval(() => {
            counter--;
            if (counter === 0) {
                modal.remove();
                return;
            }
            if ((INITIAL_COUNTER - counter) % 10 === 0) message.innerText = randMessage();
            timer.innerText = counter;
        }, 1000);
    }
});