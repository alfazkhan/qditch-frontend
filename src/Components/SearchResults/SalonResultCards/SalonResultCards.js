import React, { useState, useEffect } from 'react'
import Pagination from '../Pagination/Pagination'
import Axios from '../../../Axios';
import SalonCard from '../../BusinessInfo/SalonCard/SalonCard';
import { CircularProgress } from '@material-ui/core';

const SalonResults = (props) => {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [salonsPerPage] = useState(10);

  useEffect(() => {
    setLoading(true);



    setSalonData()


  }, [props.business_ids]);

  const setSalonData = () => {
    const ids = props.business_ids
    const distances = props.coordinatedData
    // console.log(ids)
    const salonsList = []
    const promise = []
    for (var key in ids) {
      promise[key] = Axios.get('api/users/business/' + ids[key] + '/')
        .then(res => {
          let data = res.data
          data = {...data, "distance":distances[data.id]}
          // console.log(data)
          salonsList.push(data)
        })
        .catch(e => {
          console.log(e.response)
        })

    }


    Promise.all(promise)
      .then(res => {
        setSalons(bubbleSort(salonsList))
        // console.log(salonsList)
        // console.log(bubbleSort(salonsList))
        setLoading(false);
      })
  }

  const bubbleSort = (Array) => {
    let len = Array.length;
    for (let i = 0; i < len; i++) { //you can also use "for in", so you don't need the variable "len"
      for (let j = 0; j < len; j++) {
        if (typeof Array[j + 1] !== "undefined") {
          if (Array[j].id > Array[j + 1].id) {
            let tmp = Array[j];
            Array[j] = Array[j + 1];
            Array[j + 1] = tmp;
          }
        }
      }
    }
    return Array;
  };



  return (
    <div>
      {!loading
        ? <SalonCard salon={salons.sort()} />
        :
          <div className="col-12 mx-auto mt-5">
            <CircularProgress className="text-center" />
          </div>
      }

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
