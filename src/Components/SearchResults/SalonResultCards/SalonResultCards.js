import React, { useState, useEffect } from 'react'
import Pagination from '../Pagination/Pagination'
import Axios from '../../../Axios';
import SalonCard from '../../BusinessInfo/SalonCard/SalonCard';

const SalonResults = (props) => {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [salonsPerPage] = useState(10);

  useEffect(() => {
    setLoading(true);
    
    

    setSalonData()


  }, [props.business_ids]);

  const setSalonData=()=>{
    const ids = props.business_ids
    console.log(ids)
    const salonsList = []
    const promise = []
    for (var key in ids) {
      promise[key] = Axios.get('api/users/business/' + ids[key] + '/')
        .then(res => {
          salonsList.push(res.data)
        })
        .catch(e => {
          console.log(e.response)
        })

    }

  
    Promise.all(promise)
      .then(res => {
        setSalons(salonsList)
        // console.log(salonsList)
        setLoading(false);
      })
  }

  // Get current posts
  const indexOfLastSalon = currentPage * salonsPerPage;
  const indexOfFirstSalon = indexOfLastSalon - salonsPerPage;
  const currentSalons = salons.slice(indexOfFirstSalon, indexOfLastSalon);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='mt-3'>
      {!loading
        ? <SalonCard salon={salons.sort()} />
        : null}

      {/* {salons.length > salonsPerPage
        ? <Pagination
          salonPerPage={salonsPerPage}
          totalSalons={salons.length}
          paginate={paginate}
        />
        : null} */}

    </div>
  );
};


export default SalonResults
