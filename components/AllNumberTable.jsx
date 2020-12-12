import React from 'react'
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DeleteTwoTone } from '@ant-design/icons';
import Style from '../styles/InputTable.module.css'

export default class MatchTable extends React.Component {

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
        console.log(this.state.wantToDeleteList)
        

        this.setState({wantToDeleteList : []})
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
                key: 'bookNumber',
                width: '30%',
                ...this.getColumnSearchProps('bookNumber'),
            },
            {
                title: 'งวดที่',
                dataIndex: 'per_no',
                key: 'roundNumber',
                width: '25%',
                ...this.getColumnSearchProps('roundNumber'),
            },
            {
                title: 'ชุดที่',
                dataIndex: 'set_no',
                key: 'groupNumber',
                width: '25%',
                ...this.getColumnSearchProps('groupNumber'),
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
                    {this.props.title.name} {this.state.dataTable.length} เล่ม
                </h4>
                <Table
                    bordered
                    columns={columns}
                    dataSource={this.state.dataTable}
                    size="small"
                    pagination={false}
                    scroll={{ y: 340 }}
                />
                <div className={Style.container}>

                    <button className={Style.cancelBTN} onClick={() => this.setState({wantToDeleteList : []})}>
                        ยกเลิก
                    </button>
                    {
                        (this.state.wantToDeleteList.length == 0) ?
                            <button className={Style.deleteBTN} disabled="false">
                                ลบ
                            </button>
                            :
                            <button className={Style.deleteBTN} onClick={this.onSubmitDelete} >
                                ลบ {this.state.wantToDeleteList.length}
                            </button>
                    }

                </div>
            </div>
        );
    }
}