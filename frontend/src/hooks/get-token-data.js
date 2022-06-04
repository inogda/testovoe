// get-token-data.js
import { useEffect, useState} from 'react';
import axios from 'axios';

const useTokenData = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/token');
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
