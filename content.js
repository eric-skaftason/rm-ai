console.log("RM-AI");


function mutation_observer_callback() {
    document.querySelector('.YzCcne')?.remove();
}

const init_mutation_observer = (() => {
    const mutation_observer = new MutationObserver(mutation_observer_callback);

    const config = { attributes: true, childList: true, subtree: true };
    mutation_observer.observe(document, config);
})();


