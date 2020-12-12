import React, { useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import axios from 'axios';
import { Tabs } from 'antd';
import Style from '../styles/ResultPage.module.css'
import MatchTable from '../components/MatchTable'

const { TabPane } = Tabs;


export default function MatchingResult() {
    const [matchedData, setMatchedData] = useState([])
    const [unMatchedData, setUnMatchedData] = useState([])

    useEffect(() => {
        axios.get('/api/getMatchedNums')
            .then(res => {
                setMatchedData(res.data.results)
            })


        axios.get('/api/getUnMatchedNums')
            .then(res => {
                setUnMatchedData(res.data.results)
            })

    }, [])

    const callback = (key) => {
        console.log(key);
    }


    return (
        <MainLayout>
            <div className={Style.container}>
                <Tabs onChange={callback} type="card" centered size="large">
                    <TabPane tab="เล่มที่ชน" key="1">
                        <div className={Style.container2}>
                            <MatchTable data={matchedData} title={{name: "เล่มที่ชน"}}/>
                        </div>
                    </TabPane>
                    <TabPane tab="เล่มที่ไม่ชน" key="2">
                        <div className={Style.container2}>
                            <MatchTable data={unMatchedData} title={{name: "เล่มที่ไม่ชน"}}/>
                        </div>
                    </TabPane>
                </Tabs>
            </div>

        </MainLayout>
    )
}
