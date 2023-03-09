import axios from 'axios';
import { useEffect, useState } from 'react';
import {getUsernameFromToken} from '../helper/helper'

// custom hook
export default function useFetch(query) {
   const [getData, setData] = useState({ isLoading: false, apiData: undefined, status: null, serverError: null });

   useEffect(() => {

      const fetchData = async () => {
         try {
            setData((prev) => ({ ...prev, isLoading: true }));
            const{username} = !query ? await getUsernameFromToken() : ''

            const { data, status } = !query ? await axios.get(`http://localhost:8080/api/user/${username}`) : await axios.get(`http://localhost:8080/api/${query}`);

            if (status === 201) {
               setData((prev) => ({ ...prev, isLoading: false }));
               setData((prev) => ({ ...prev, apiData: data, status }));
            }
            setData((prev) => ({ ...prev, isLoading: false }));
         } catch (error) {
            setData((prev) => ({ ...prev, isLoading: false, serverError: error }));
         }
      };
      fetchData();
   }, [query]);
   return [getData, setData];
}
