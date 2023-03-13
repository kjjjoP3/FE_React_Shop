import { Button, Image, Input, Space, Table } from 'antd';
import Column from 'antd/es/table/Column';
import React, { Component } from 'react';
import manufacturerService from '~/services/manufacturerService';
import { MdDeleteOutline, MdModeEditOutline } from 'react-icons/md';

class ManafacturerList extends Component {
    state = {
        searchKeyword: '',
        currentPage: 1,
        pageSize: 5, // thêm state mới để lưu giá trị số lượng bản ghi hiển thị trên một trang
    };

    handleSearch = (value) => {
        this.setState({
            searchKeyword: value,
            currentPage: 1,
        });
    };

    handlePageChange = (page, pageSize) => {
        this.setState({
            currentPage: page,
        });
    };

    handlePageSizeChange = (current, size) => {
        // hàm xử lý sự kiện thay đổi số lượng bản ghi hiển thị trên một trang
        this.setState({
            pageSize: size,
            currentPage: 1,
        });
    };

    onEdit = (record) => {
        const { onEdit } = this.props;
        if (onEdit) {
            onEdit(record);
        }
    };

    handleDeleteConfirm = (record) => {
        const { onDeleteConfirm } = this.props;
        if (onDeleteConfirm) {
            onDeleteConfirm(record);
        }
    };

    render() {
        const { dataSource } = this.props;
        const { searchKeyword, currentPage, pageSize } = this.state;
        const filteredData = dataSource.filter((item) => item.name.toLowerCase().includes(searchKeyword.toLowerCase()));
        const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
        return (
            <div>
                <Input.Search
                    placeholder="Search ManufacturcerList"
                    allowClear
                    enterButton="Search"
                    className="search-input"
                    style={{ width: 230, float: 'right', marginRight: 5, marginBottom: 20 }}
                    onSearch={this.handleSearch}
                />
                <Table
                    dataSource={paginatedData}
                    size="small"
                    rowKey="id"
                    pagination={{
                        total: filteredData.length,
                        pageSize,
                        current: currentPage,
                        onChange: this.handlePageChange,
                        onShowSizeChange: this.handlePageSizeChange, // thêm sự kiện xử lý khi người dùng thay đổi số lượng bản ghi hiển thị trên một trang
                    }}
                >
                    <Column
                        title="Logo"
                        key="logo"
                        dataIndex="logo"
                        width={90}
                        align="center"
                        render={(_, record) => (
                            <Space size="middle">
                                <Image
                                    width="100%"
                                    src={manufacturerService.getManafacturerLogoUrl(record.logo)}
                                ></Image>
                            </Space>
                        )}
                    ></Column>

                    <Column title="ID" key="id" dataIndex="id" width={40}></Column>

                    <Column title="Name" key="name" dataIndex="name"></Column>

                    <Column
                        title="Actions"
                        key="action"
                        width={150}
                        align="center"
                        render={(_, record) => (
                            <Space size="middle">
                                <Button
                                    key={record.key}
                                    type="primary"
                                    size="small"
                                    onClick={() => this.onEdit(record)}
                                >
                                    <MdModeEditOutline style={{ marginRight: 8 }} />
                                    Edit
                                </Button>
                                <Button
                                    key={record.key}
                                    type="primary"
                                    danger
                                    size="small"
                                    onClick={() => this.handleDeleteConfirm(record)}
                                >
                                    <MdDeleteOutline style={{ marginRight: 8 }} />
                                    Delete
                                </Button>
                            </Space>
                        )}
                    ></Column>
                </Table>
            </div>
        );
    }
}

export default ManafacturerList;
