// use-fetch-data.js
import { useEffect, useState} from 'react';
import axios from 'axios';

const usePositionsData = () => {
    const [positions, setPositions] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/positions');
                if((response.success === true)) {
                    setPositions(response.positions);
                }

            } catch (error) {
                console.error(error)
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    return {
        positions,
        loading,
    };
};

export default usePositionsData;
