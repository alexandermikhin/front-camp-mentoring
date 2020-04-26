export const ErrorService = (() => {
    let instance;
    const observers = [];

    function notifyObservers(error) {
      for (const hanlder of observers) {
        hanlder(error);
      }
    }

    function init() {
        return {
            handleError: (error) => {
                console.log(`Error:`, error);
                notifyObservers(error);
            },
            subscribe: (hanlder) => {
              observers.push(hanlder);
            },
            unsubscribe: () => {
              observers = [];
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
