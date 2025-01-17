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
          data = { ...data, "distance": distances[data.id] }
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

  const array_move = (arr, old_index, new_index) => {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
  }

  const getArraysExclusion = (a1, a2) => {
    return a1.filter(function (n) { return a2.indexOf(n) === -1; });
  }

  const bubbleSort = (Array) => {
    let len = Array.length;
    for (let i = 0; i < len; i++) { //you can also use "for in", so you don't need the variable "len"
      for (let j = 0; j < len; j++) {
        if (typeof Array[j + 1] !== "undefined") {
          if (Array[j].distance > Array[j + 1].distance) {
            let tmp = Array[j];
            Array[j] = Array[j + 1];
            Array[j + 1] = tmp;
          }
        }
      }
    }

    const temparray = []
    for (var i = 0; i < Array.length; i++) {
      if (Array[i].distance === null) {
        temparray.push(Array[i])
      }
    }
    return getArraysExclusion(Array, temparray).concat(temparray);
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
