import { useState, useCallback, useEffect } from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);

    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Request failed!');
    }

    return resData;
};
function useHttp(url, config, initialData = null) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(initialData);

    function clearData() {
        setData(initialData);
    }

    const sendRequest = useCallback( async function sendRequest(data) {
        setIsLoading(true);
        setError(null);

        try {
            const resData = await sendHttpRequest(url, {...config, body: data});
            setData(resData);
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        } finally {
            setIsLoading(false);
        }
    }, [url, config]);

    useEffect(() => {
        if (config && (config.method === 'GET' || !config.method)) {
            sendRequest();
        }
    }, [sendRequest, config]);

    return {
        isLoading,
        error,
        data,
        sendRequest,
        clearData 
    };
}
export default useHttp;