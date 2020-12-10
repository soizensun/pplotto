import React from 'react'
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DeleteTwoTone } from '@ant-design/icons';
import Style from '../styles/InputTable.module.css'


export default class ShowDeleteNumTable extends React.Component {
    state = {
        searchText: '',
        searchedColumn: '',
        dataTable: []
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({ dataTable: [...this.state.dataTable, nextProps.data[0]] });
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

    onDelete = (key, e) => {
        e.preventDefault();
        const data = this.state.dataTable.filter(item => item.key !== key);
        this.setState({ dataTable: data });
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
                dataIndex: 'bookNumber',
                key: 'bookNumber',
                width: '30%',
                ...this.getColumnSearchProps('bookNumber'),
            },
            {
                title: 'งวดที่',
                dataIndex: 'roundNumber',
                key: 'roundNumber',
                width: '25%',
                ...this.getColumnSearchProps('roundNumber'),
            },
            {
                title: 'ชุดที่',
                dataIndex: 'groupNumber',
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
                        onClick={(e) => { this.onDelete(record.key, e); }}
                    />
                )
            },
        ];

        return (
            <div>
                <Table bordered
                    columns={columns}
                    dataSource={this.state.dataTable}
                    size="small"
                    pagination={false}
                    scroll={{ y: 340 }} />
                <div className={Style.container}>
                    <Button className={Style.cancelBTN} size="large">
                        ยกเลิก
                    </Button>
                    <Button className={Style.deleteBTN} size="large">
                        ลบ
                    </Button>
                </div>
            </div>

        )
    }
}