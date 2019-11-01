export default getServiceInstance;

let instance = null;

function getServiceInstance() {
    if (!instance) {
        instance = new ErrorService();
    }

    return instance;
}

class ErrorService {
    handleError(error) {
        console.log(`Error:`, error);
    }
}