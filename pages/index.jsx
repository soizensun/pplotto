import React, { useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import Style from '../styles/Home.module.css'
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import ShowBarcodeNumTable from "../components/ShowBarcodeNumTable";
import ShowDeleteNumTable from "../components/ShowDeleteNumTable";
import { Modal, Button } from 'antd';


export default function Home() {
  const [barcodeNums, setBarcodeNums] = useState([])
  const [needToDeleteNums, setNeedToDeleteNums] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [objKey, setObjKey] = useState(1)
  const [showDeleteTable, setShowDeleteTable] = useState(false)

  const onInputChange = event => {
    setInputValue(event.target.value)

    var tmpObj = {
      key: "",
      bookNumber: "",
      roundNumber: "",
      groupNumber: ""
    }

    if ((event.target.value).length == 16) {
      setObjKey(objKey + 1)

      tmpObj.key = objKey
      tmpObj.bookNumber = inputValue.slice(6, 10)
      tmpObj.groupNumber = inputValue.slice(4, 6)
      tmpObj.roundNumber = inputValue.slice(2, 4)

      if (showDeleteTable == false) {
        setBarcodeNums([tmpObj])
      }
      else {
        setNeedToDeleteNums([tmpObj])
      }

      setInputValue("")
    }
  }

  return (
    <MainLayout>

      <div>
        <div className={Style.container}>
          <TextField
            color="red"
            label="ตัวเลขบาร์โค้ด"
            variant="outlined"
            className={Style.textInput}
            value={inputValue}
            onChange={onInputChange}
          />
        </div>

        <div className={Style.container1}>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="deleteToggle"
                control={<Switch color="primary" onClick={() => setShowDeleteTable(!showDeleteTable)} />}
                label="สแกนเพื่อลบ"
                labelPlacement="deleteToggle"
              />
            </FormGroup>
          </FormControl>
        </div>
      </div>

      <div className={Style.container2} >
        <div style={{ display: showDeleteTable ? "none " : "block" }}>
          <ShowBarcodeNumTable data={barcodeNums} deleteToggle={showDeleteTable} />
        </div>
        <div style={{ display: showDeleteTable ? "block " : "none" }}>
          <ShowDeleteNumTable data={needToDeleteNums} />
        </div>
      </div>

    </MainLayout>
  )
}
