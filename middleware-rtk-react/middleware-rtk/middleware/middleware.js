const middlewareApiRequest = (store) => (next) => async (action) => {
    if (action.type === 'api/apiRequest') {
        store.dispatch({ type: 'api/onApiLoading' });

        try {
            const response = await fetch(`http://localhost:3001/${action.payload?.endPoint}`, {
                method: action.payload?.method || 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(action.payload?.body) || undefined
            });
            const user = await response.json();
            console.log(user);

            store.dispatch({ type: 'api/onApiSuccessResponse', payload: user?.data });
        } catch (error) {
            console.log(error);
            store.dispatch({
                type: 'api/onApiErrorResponse',
                payload:'Something went wrong!'
            });
        }
    } else {
        return next(action)
    }
};

export default middlewareApiRequest;