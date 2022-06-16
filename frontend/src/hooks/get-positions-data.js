// use-fetch-data.js
import { useEffect, useState} from 'react';
import $api from "../http";

const usePositionsData = () => {
    const [positions, setPositions] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await $api.get('/positions');
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
