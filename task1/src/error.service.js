export const ErrorService = (() => {
    let instance;

    function init() {
        return {
            handleError: (error) => {
                console.log(`Error:`, error);
            }
        }
    }

    return {
        getInstance: () => {
            if (!instance) {
                instance = init();
            }

            return instance;
        }
    }
})();
