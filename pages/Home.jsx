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

export default function Home() {
  const [barcodeNums, setBarcodeNums] = useState([])
  const [tmpListReal, setTmpListReal] = useState([])
  const [tmpListDelete, setTmpListDelete] = useState([])

  const [needToDeleteNums, setNeedToDeleteNums] = useState([])

  const [inputValue, setInputValue] = useState("")
  const [objKey, setObjKey] = useState(1)
  const [showDeleteTable, setShowDeleteTable] = useState(false)

  const [deletedData, setDeletedData] = useState([])
  const [currentData, setCurrentData] = useState("")

  useEffect(() => {
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + '  ' + time;
    setCurrentData(dateTime)
  }, [])

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

    message.success(
      {
        content: `ลบสำเร็จ`,
        className: 'custom-class',
        style: {
          marginTop: '45px',
        },
      }
    );
  }

  const handleDeleteSwitch = () => {
    setShowDeleteTable(!showDeleteTable)
    setInputValue("")
  }

  return (
    <MainLayout>

      <div>
        <h6 className={Style.container}>
          {currentData}
        </h6>
        
        <div className={Style.container0}>
          <TextField
            color="red"
            label="ตัวเลขบาร์โค้ด"
            variant="outlined"
            className={Style.textInput}
            value={inputValue}
            onChange={onInputChange}
            onKeyPress={handleKeypress}
            type="number"
          />
        </div>

        <div className={Style.container1}>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="deleteToggle"
                control={<Switch color="secondary" checked={showDeleteTable} onClick={handleDeleteSwitch} />}
                label="สแกนเพื่อลบ"
                labelPlacement="deleteToggle"
              />
            </FormGroup>
          </FormControl>
        </div>
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
