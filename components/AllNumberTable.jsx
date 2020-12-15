import React from 'react'
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DeleteTwoTone } from '@ant-design/icons';
import Style from '../styles/InputTable.module.css'
import axios from 'axios';
import { message } from 'antd';
export default class MatchTable extends React.Component {

    // HEADERS = { 'Content-Type': 'application/json' }

    state = {
        searchText: '',
        searchedColumn: '',
        dataTable: [],
        wantToDeleteList: []
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({ dataTable: nextProps.data });
        }
    }

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    onDelete = (num, set, e) => {
        let tmpDataTable = []
        e.preventDefault();
        this.state.dataTable.map(item => {
            if (item.num == num && item.set_no == set) {
                this.setState({ wantToDeleteList: [...this.state.wantToDeleteList, item] })
            }
            else tmpDataTable.push(item)
        })

        this.setState({ dataTable: tmpDataTable });
    }

    onSubmitDelete = () => {
        message.loading('กำลังบันทึกข้อมูล', 0);

        let currentUser = localStorage.getItem("currentUser")

        axios.post('/api/deleteUser', JSON.stringify({ "numbers": this.state.wantToDeleteList, "username": currentUser }), { headers: { 'Content-Type': 'application/json' } })
            .then(res => {
                console.log(res.date);

                this.setState({ wantToDeleteList: [] })

                message.destroy()
                message.success('บันทึกสำเร็จ');
            })
            .catch(err => {
                message.destroy()
                message.error('บันทึกไม่สำเร็จ');
            })

    }

    onCancelDelete = () => {
        let tmp = this.state.dataTable.concat(this.state.wantToDeleteList)
        this.setState({ dataTable: tmp })
        this.setState({ wantToDeleteList: [] })
        message.destroy()
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`ค้นหา`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        ค้นหา
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        ล้างการค้นหา
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 5 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                    text
                ),
    });


    render() {
        const columns = [
            {
                title: 'เล่มที่',
                dataIndex: 'num',
                key: 'num',
                width: '30%',
                ...this.getColumnSearchProps('num'),
            },
            // {
            //     title: 'งวดที่',
            //     dataIndex: 'per_no',
            //     key: 'per_no',
            //     width: '25%',
            //     ...this.getColumnSearchProps('per_no'),
            // },
            {
                title: 'ชุดที่',
                dataIndex: 'set_no',
                key: 'set_no',
                width: '25%',
                ...this.getColumnSearchProps('set_no'),
            },
            {
                title: '',
                key: 'delete',
                width: '10%',
                align: "center",
                render: (text, record) => (
                    <DeleteTwoTone
                        style={{ fontSize: "18px" }}
                        twoToneColor="red"
                        onClick={(e) => { this.onDelete(record.num, record.set_no, e); }}
                    />
                )
            },

        ];

        return (
            <div>
                <h4 style={{ marginBottom: '20px' }}>
                    {this.props.title.name} {this.state.dataTable.length} รายการ
                </h4>
                <Table
                    bordered
                    columns={columns}
                    dataSource={this.state.dataTable}
                    size="small"
                    pagination={false}
                    scroll={{ y: 340 }}
                />
                <div className={Style.container4}>
                    {
                        (this.state.wantToDeleteList.length == 0) ?
                            <div style={{ display: "none"}}>
                            </div>
                            :
                            <div style={{ fontSize: "18px", color: "red"}}>
                                รายการที่ลบ {this.state.wantToDeleteList.length} รายการ
                            </div>
                    }
                </div>
                <div className={Style.container0}>
                    {
                        (this.state.wantToDeleteList.length == 0) ?
                            <button className={Style.cancelBTN} style={{ display: "none" }}>
                                ยกเลิก
                            </button>
                            :
                            <button className={Style.cancelBTN} onClick={this.onCancelDelete}>
                                ยกเลิก
                            </button>
                    }
                    {
                        (this.state.wantToDeleteList.length == 0) ?
                            <button className={Style.saveBTN} style={{ display: "none" }}>
                                บันทึก
                            </button>
                            :
                            <button className={Style.saveBTN} onClick={this.onSubmitDelete} >
                                บันทึก
                            </button>
                    }

                </div>
            </div>
        );
    }
}