import React, { useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import axios from 'axios';
import { message, Tabs } from 'antd';
import Style from '../styles/ResultPage.module.css'
import MatchTable from '../components/MatchTable'
import { useClipboard } from 'use-clipboard-copy';

const { TabPane } = Tabs;
const HEADERS = { 'Content-Type': 'application/json' }

export default function MatchingResult() {
    const [matchedData, setMatchedData] = useState([])
    const [unMatchedData, setUnMatchedData] = useState([])

    const [countMatchList, setCountMatchList] = useState(0)
    const [countUnMatchList, setCountUnMatchList] = useState(0)

    const [matchDataForClipboard, setMatchDataForClipboard] = useState("")
    const [unmatchDataForClipboard, setUnmatchDataForClipboard] = useState("")

    const clipboard = useClipboard();

    useEffect(() => {
        if(localStorage.getItem('currentUser') == null) location.href = '/'

        let currentUser = localStorage.getItem("currentUser")
        message.loading('กำลังดาวโหลดข้อมูล', 0);

        axios.post('/api/getMatchedNums', JSON.stringify({"username": currentUser }), { headers: HEADERS })
            .then(res => {
                console.log(res.data.results);
                setMatchedData(res.data.results)
                setCountMatchList(res.data.results.length)
                message.destroy()
                formatDataForClipBoard(res.data.results, "match")
            })
            .catch(err => {
                message.warning('รายการที่ชนโหลดไม่สำเร็จ')
            })


        axios.post('/api/getUnMatchedNums', JSON.stringify({"username": currentUser }), { headers: HEADERS } )
            .then(res => {
                console.log(res.data.results);
                setUnMatchedData(res.data.results)
                setCountUnMatchList(res.data.results.length)
                message.destroy()
                formatDataForClipBoard(res.data.results, "unmatch")
            })
            .catch(err => {
                message.warning('รายการที่ไม่ชนโหลดไม่สำเร็จ')
            })

    }, [])


    const formatDataForClipBoard = (oldFormat, flag) => {
        if (flag == "match") {
            let tmpLists = []
            oldFormat.map(item => {
                let tmp = `${item.num}-${item.per_no}-${item.set_no}\n`
                tmpLists.push(tmp)
            })
            setMatchDataForClipboard(tmpLists.join(''))
        }else {
            let tmpLists = []
            oldFormat.map(item => {
                let tmp = `${item.num}-${item.per_no}-${item.set_no}\n`
                tmpLists.push(tmp)
            })
            setUnmatchDataForClipboard(tmpLists.join(''))
        }
    }


    return (
        <MainLayout>
            <div className={Style.container}>
                <Tabs type="card" centered size="large">
                    <TabPane tab="รายการที่ชน" key="1">
                        <div className={Style.container2}>
                            <MatchTable data={matchedData} title={{ name: "รายการที่ชน" }} count={countMatchList}/>
                        </div>
                        <div className={Style.container}>
                            {
                                (matchedData == []) ?
                                    <button type="button" className={Style.submitBTN} disabled="false">
                                        คัดลอก
                                    </button>
                                    :
                                    <button type="button" className={Style.submitBTN} onClick={() => clipboard.copy(matchDataForClipboard)} size="large">
                                        คัดลอก
                                    </button>
                            }
                        </div>
                    </TabPane>
                    <TabPane tab="รายการที่ไม่ชน" key="2">
                        <div className={Style.container2}>
                            <MatchTable data={unMatchedData} title={{ name: "รายการที่ไม่ชน" }} count={countUnMatchList}/>
                        </div>
                        <div className={Style.container}>
                            {
                                (unMatchedData == []) ?
                                    <button type="button" className={Style.submitBTN} disabled="false">
                                        คัดลอก
                                    </button>
                                    :
                                    <button type="button" className={Style.submitBTN} onClick={() => clipboard.copy(unmatchDataForClipboard)} size="large">
                                        คัดลอก
                                    </button>
                            }
                        </div>
                    </TabPane>
                </Tabs>
            </div>

        </MainLayout>
    )
}
