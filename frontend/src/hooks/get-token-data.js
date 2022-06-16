// get-token-data.js
import { useEffect, useState} from 'react';
import $api from "../http";

const useTokenData = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await $api.get('/token');

                if((response.success === true)) {
                    setToken(response.token);
                }
            } catch (error) {
                console.error(error)
            }
        };

        fetchData();
    }, []);

    return {
        token,
    };
};

export default useTokenData;
