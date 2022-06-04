// get-token-data.js
import axios from 'axios';
import {useEffect, useState} from "react";


function postWorkingData(sendFormData,token) {

    const [loadingPost, setLoadingPost] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios({

                    method: 'post',
                    url: 'https://frontend-test-assignment-api.abz.agency/api/v1/users',
                    data: sendFormData,
                    headers: {
                        'Token': token,
                    },

                });
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



    // POST-запрос

    axios({
        method: 'post',
        url: 'https://frontend-test-assignment-api.abz.agency/api/v1/users',
        data: sendFormData,
        headers: {
            'Token': token,
        },
    })
        .then(response => {
            console.log(response.data);

            alert(JSON.stringify(`${response.data.message}, id item: ${response.data.user_id}`));

            //debugger;
        })
        .catch(function (error) {
            alert(JSON.stringify(`error - ${error.response.data.message}`));
            console.log(error);

            //debugger;
        });




}












export default postWorkingData;