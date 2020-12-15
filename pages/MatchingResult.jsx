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

    const [matchDataFreedomForClipboard, setMatchDataFreedomForClipboard] = useState("")
    const [matchDataQuataForClipboard, setMatchDataQuataForClipboard] = useState("")

    const [unmatchFreedomDataForClipboard, setUnmatchFreedomDataForClipboard] = useState("")
    const [unmatchDataQuataForClipboard, setUnmatchDataQuataForClipboard] = useState("")

    const clipboard = useClipboard();

    useEffect(() => {
        if (localStorage.getItem('currentUser') == null) location.href = '/'

        let currentUser = localStorage.getItem("currentUser")
        message.loading('กำลังดาวโหลดข้อมูล', 0);

        axios.post('/api/getMatchedNums', JSON.stringify({ "username": currentUser }), { headers: HEADERS })
            .then(res => {
                console.log(res.data.results);
                setMatchedData(res.data.results)
                formatDataForClipBoard(res.data.results, "match")

                message.destroy()
            })
            .catch(err => {
                message.warning('รายการที่ชนโหลดไม่สำเร็จ')
            })


        axios.post('/api/getUnMatchedNums', JSON.stringify({ "username": currentUser }), { headers: HEADERS })
            .then(res => {
                console.log(res.data.results);
                setUnMatchedData(res.data.results)
                formatDataForClipBoard(res.data.results, "unmatch")

                message.destroy()
            })
            .catch(err => {
                message.warning('รายการที่ไม่ชนโหลดไม่สำเร็จ')
            })

    }, [])


    // const formatDataForClipBoard = (oldFormat, flag) => {
    //     if (flag == "match") {
    //         let tmpLists = []
    //         oldFormat.map(item => {
    //             let tmp = `${item.num}-${item.per_no}-${item.set_no}\n`

    //             tmpLists.push(tmp)
    //         })
    //         setMatchDataForClipboard(tmpLists.join(''))
    //     }else {
    //         let tmpLists = []
    //         oldFormat.map(item => {
    //             let tmp = `${item.num}-${item.per_no}-${item.set_no}\n`
    //             tmpLists.push(tmp)
    //         })
    //         setUnmatchDataForClipboard(tmpLists.join(''))
    //     }
    // }



    const formatDataForClipBoard = (oldFormat, flag) => {
        if (flag == "match") {
            let tmpListsFreedom = []
            let tmpListsQuota = []
            oldFormat.map(item => {
                let tmp = `${item.num}-${item.per_no}-${item.set_no}\n`
                if ((item.per_no % 2) == 0) tmpListsFreedom.push(tmp)
                else tmpListsQuota.push(tmp)
            })
            setMatchDataFreedomForClipboard(tmpListsFreedom.join(''))
            setMatchDataQuataForClipboard(tmpListsQuota.join(''))

        } else {
            let tmpListsFreedom = []
            let tmpListsQuota = []
            oldFormat.map(item => {
                let tmp = `${item.num}-${item.per_no}-${item.set_no}\n`
                if ((item.per_no % 2) == 0) tmpListsFreedom.push(tmp)
                else tmpListsQuota.push(tmp)
            })
            setUnmatchFreedomDataForClipboard(tmpListsFreedom.join(''))
            setUnmatchDataQuataForClipboard(tmpListsQuota.join(''))
        }
    }


    return (
        <MainLayout>
            <div className={Style.container}>
                <Tabs type="card" centered size="large">
                    <TabPane tab="รายการที่ชนเจอ" key="1">

                        <div className={Style.container2}>
                            <MatchTable
                                data={matchedData.filter(i => (i.per_no) % 2 == 0)}
                                title={{ name: "เล่มเสรีที่ชนเจอ" }}
                                count={matchedData.filter(i => (i.per_no) % 2 == 0).length} />
                        </div>
                        <div className={Style.container}>
                            {
                                (matchedData == []) ?
                                    <button type="button" className={Style.submitBTN} disabled="false">
                                        คัดลอก
                                    </button>
                                    :
                                    <button
                                        type="button"
                                        className={Style.submitBTN}
                                        onClick={() => clipboard.copy(matchDataFreedomForClipboard)}
                                        size="large">
                                        คัดลอก
                                    </button>
                            }
                        </div>

                        <div className={Style.container2}>
                            <MatchTable
                                data={matchedData.filter(i => (i.per_no) % 2 != 0)}
                                title={{ name: "เล่มโควตาที่ชนเจอ" }}
                                count={matchedData.filter(i => (i.per_no) % 2 != 0).length} />
                        </div>
                        <div className={Style.container} style={{paddingBottom: "70px"}}>
                            {
                                (matchedData == []) ?
                                    <button type="button" className={Style.submitBTN} disabled="false">
                                        คัดลอก
                                    </button>
                                    :
                                    <button
                                        type="button"
                                        className={Style.submitBTN}
                                        onClick={() => clipboard.copy(matchDataQuataForClipboard)}
                                        size="large">
                                        คัดลอก
                                    </button>
                            }
                        </div>

                    </TabPane>
                    <TabPane tab="รายการที่ไม่ชนไม่เจอ" key="2">

                        <div className={Style.container2}>
                            <MatchTable 
                                data={unMatchedData.filter(i => (i.per_no) % 2 == 0)} 
                                title={{ name: "เล่มเสรีที่ชนไม่เจอ" }} 
                                count={unMatchedData.filter(i => (i.per_no) % 2 == 0).length} />
                        </div>
                        <div className={Style.container}>
                            {
                                (unMatchedData == []) ?
                                    <button type="button" className={Style.submitBTN} disabled="false">
                                        คัดลอก
                                    </button>
                                    :
                                    <button
                                        type="button"
                                        className={Style.submitBTN}
                                        onClick={() => clipboard.copy(unmatchFreedomDataForClipboard)}
                                        size="large">
                                        คัดลอก
                                    </button>
                            }
                        </div>

                        <div className={Style.container2}>
                            <MatchTable 
                                data={unMatchedData.filter(i => (i.per_no) % 2 != 0)} 
                                title={{ name: "เล่มโควตาที่ชนไม่เจอ" }} 
                                count={unMatchedData.filter(i => (i.per_no) % 2 != 0).length} />
                        </div>
                        <div className={Style.container} style={{paddingBottom: "70px"}}>
                            {
                                (unMatchedData == []) ?
                                    <button type="button" className={Style.submitBTN} disabled="false">
                                        คัดลอก
                                    </button>
                                    :
                                    <button
                                        type="button"
                                        className={Style.submitBTN}
                                        onClick={() => clipboard.copy(unmatchDataQuataForClipboard)}
                                        size="large">
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
