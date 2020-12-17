import React, { useState, useEffect } from 'react'
import MainLayout from '../layouts/MainLayout'
import Style from '../styles/Home.module.css'
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import ShowBarcodeNumTable from "../components/ShowBarcodeNumTable";
import ShowDeleteNumTable from "../components/ShowDeleteNumTable";
import { message } from 'antd';
import axios from 'axios';

export default function Home() {
  const [barcodeNums, setBarcodeNums] = useState([])
  const [tmpListReal, setTmpListReal] = useState([])
  const [tmpListDelete, setTmpListDelete] = useState([])

  const [needToDeleteNums, setNeedToDeleteNums] = useState([])

  const [inputValue, setInputValue] = useState("")

  const [numValue, setNumValue] = useState("")
  const [perValue, setPerValue] = useState("")
  const [setValue, setSetValue] = useState("")

  const [objKey, setObjKey] = useState(1)
  const [showDeleteTable, setShowDeleteTable] = useState(false)

  const [deletedData, setDeletedData] = useState([])
  const [currentData, setCurrentData] = useState("")
  const [InputFieldStatus, setInputFieldStatus] = useState(true)
  const [closeTime, setCloseTime] = useState(" ยังไม่มีกำหนด ")

  useEffect(() => {
    if (localStorage.getItem('currentUser') == null) location.href = '/'

    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = "คุณเข้ามาใช้งานเมื่อ: " + date + '  ' + time;
    setCurrentData(dateTime)

    axios.post('/api/getAdmitStatus')
      .then(res => {
        console.log(res.data);
        setInputFieldStatus(res.data.status)
        // setCloseTime(res.data.)
      })
  }, [])

  const addNum = () => {
    var tmpObj = {
      key: "",
      bookNumber: "",
      roundNumber: "",
      groupNumber: ""
    }

    if (numValue.length != 0 && setValue.length != 0 && perValue.length != 0) {
      if (showDeleteTable == false) {
        setObjKey(objKey + 1)
        tmpObj.key = objKey
        tmpObj.bookNumber = numValue
        tmpObj.groupNumber = setValue
        tmpObj.roundNumber = perValue

        setBarcodeNums([tmpObj])
      }
      else{
        setObjKey(objKey + 1)
        tmpObj.key = objKey
        tmpObj.bookNumber = numValue
        tmpObj.groupNumber = setValue
        tmpObj.roundNumber = perValue

        setNeedToDeleteNums([tmpObj])
      }

      setNumValue("")
      setPerValue("")
      setSetValue("")
    }
  }

  const onInputChange = event => {
    setInputValue(event.target.value)

    var tmpObj = {
      key: "",
      bookNumber: "",
      roundNumber: "",
      groupNumber: ""
    }

    if ((event.target.value).length == 16) {

      let setno = inputValue.slice(4, 6);
      let perno = inputValue.slice(2, 4);
      let lotto1 = inputValue.slice(6, 10);
      let lotto2 = inputValue.slice(10, 14);
      let lotto_set = lotto1 + "-" + perno + "-" + setno;

      if (showDeleteTable == false) {
        if ((lotto1 == lotto2) && (tmpListReal.indexOf(lotto_set) < 0)) {
          setTmpListReal([...tmpListReal, lotto_set])

          setObjKey(objKey + 1)
          tmpObj.key = objKey
          tmpObj.bookNumber = inputValue.slice(6, 10)
          tmpObj.groupNumber = inputValue.slice(4, 6)
          tmpObj.roundNumber = inputValue.slice(2, 4)

          setBarcodeNums([tmpObj])
        }
      }
      else {
        if ((lotto1 == lotto2) && (tmpListDelete.indexOf(lotto_set) < 0)) {
          setTmpListDelete([...tmpListReal, lotto_set])

          setObjKey(objKey + 1)
          tmpObj.key = objKey
          tmpObj.bookNumber = inputValue.slice(6, 10)
          tmpObj.groupNumber = inputValue.slice(4, 6)
          tmpObj.roundNumber = inputValue.slice(2, 4)

          setNeedToDeleteNums([tmpObj])
        }
      }

      setInputValue("")
    }
  }

  const handleKeypress = e => {
    if (e.key === 'Enter') setInputValue("")
  }

  const handleDeletedData = (deletedData) => {
    setDeletedData(deletedData)
    // message condition
    // message.success('ลบสำเร็จ');
  }

  const handleDeleteSwitch = () => {
    setShowDeleteTable(!showDeleteTable)
    setInputValue("")
  }

  return (
    <MainLayout>

      <div>
        <h6 className={Style.container}>
          ระบบจะปิดในเวลา : {closeTime}
        </h6>
        <h6 className={Style.container1}>
          {currentData}
        </h6>


        <div className={Style.container0}>
          {
            InputFieldStatus ?
              <TextField
                color="primary"
                label="ตัวเลขบาร์โค้ด"
                variant="outlined"
                className={Style.textInput}
                value={inputValue}
                onChange={onInputChange}
                onKeyPress={handleKeypress}
                type="number"
              />
              :
              <TextField
                color="primary"
                label="นอกเวลาทำการ"
                variant="outlined"
                className={Style.textInput}
                value={inputValue}
                onChange={onInputChange}
                onKeyPress={handleKeypress}
                type="number"
                disabled
              />
          }



        </div>
         <h6 className={Style.container0}>
          หรือ
        </h6>
        <div className={Style.container0}>
          <form>
            <TextField
              id="numInput"
              color="primary"
              label="เล่มที่"
              variant="outlined"
              className={Style.textInputTiny}
              value={numValue}
              onChange={(e) => {
                if (e.target.value.length <= 4) {
                  setNumValue(e.target.value)
                  if (e.target.value.length == 4) {
                    document.getElementById("perInput").focus()
                  }
                }
              }}
              type="number"
              style={{ margin: "5px" }}
            />
            <TextField
              id="perInput"
              color="primary"
              label="งวดที่"
              variant="outlined"
              className={Style.textInputTiny}
              value={perValue}
              onChange={(e) => {
                if (e.target.value.length <= 2) {
                  setPerValue(e.target.value)
                  if (e.target.value.length == 2) {
                    document.getElementById("setInput").focus()
                  }
                }
              }}
              type="number"
              style={{ margin: "5px" }}
            />
            <TextField
              id="setInput"
              label="ชุดที่"
              variant="outlined"
              className={Style.textInputTiny}
              value={setValue}
              onChange={(e) => {
                if (e.target.value.length <= 2) setSetValue(e.target.value)
              }}
              type="number"
              style={{ margin: "5px" }}
            />
            {
              (numValue.length == 4 && perValue.length == 2 && setValue.length == 2) ?
                <button type="submit" onClick={addNum} className={Style.submitBTN} style={{ margin: "5px" }}>
                  เพิ่มเลข
                </button>
                :
                <button type="button" disabled="true" className={Style.submitBTN} style={{ margin: "5px" }}>
                  เพิ่มเลข
                </button>
            }
          </form>

        </div> 

        { <div className={Style.container1}>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="deleteToggle"
                control={<Switch color="secondary" checked={showDeleteTable} onClick={handleDeleteSwitch} />}
                label="สแกนเพื่อลบ"
                labelPlacement="start"
              />
            </FormGroup>
          </FormControl>
        </div> }
      </div>

      <div className={Style.container2} >
        <div style={{ display: showDeleteTable ? "none " : "block" }}>
          <ShowBarcodeNumTable
            data={barcodeNums}
            deleteToggle={showDeleteTable}
            deletedData={deletedData}
            toggleSwitch={status => setShowDeleteTable(status)} />
        </div>
        <div style={{ display: showDeleteTable ? "block " : "none" }}>
          <ShowDeleteNumTable
            data={needToDeleteNums}
            deletedData={handleDeletedData}
            toggleSwitch={status => setShowDeleteTable(status)}
            clearTextField={() => setInputValue("")} />
        </div>
      </div>

    </MainLayout>
  )
}
