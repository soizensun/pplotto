import React, { useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import AllNumberTable from '../components/AllNumberTable'
import Style from '../styles/ResultPage.module.css'
import { message, Button } from 'antd';
import axios from 'axios'

const HEADERS = { 'Content-Type': 'application/json' }

export default function MyNums() {
  const [allNums, setAllNums] = useState([])

  useEffect(() => {
    if(localStorage.getItem('currentUser') == null) location.href = '/'

    message.loading('กำลังดาวโหลดข้อมูล', 0);
    let currentUser = localStorage.getItem("currentUser")
    let tmpList = []

    axios.post('/api/getAllNums', JSON.stringify({"username": currentUser }), { headers: HEADERS } )
        .then(res => {
            setAllNums(res.data.results)
            message.destroy()
        })
        .catch(err => {
          console.log(err);
        })

  }, [])

  return (
    <MainLayout>

      <div className={Style.container} style={{paddingBottom: "70px"}}>
        <div className={Style.container2}>
          <AllNumberTable data={allNums.filter(i => (i.per_no)%2 == 0)} title={{ name: "รายการเสรีทั้งหมด" }} />
          <br/>
          <hr/>
          <br/>
          <AllNumberTable data={allNums.filter(i => (i.per_no)%2 != 0)} title={{ name: "รายการโควต้าทั้งหมด" }} />
        </div>
      </div>

    </MainLayout>
  )
}
