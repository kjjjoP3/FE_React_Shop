import { Button, Input, Modal, Skeleton, Space, Table, Tag } from 'antd';
import Column from 'antd/es/table/Column';
import React, { Component } from 'react';
import withRouter from '~/helpers/withRouter';
import ContentHeader from '../common/ContentHeader';
import { MdCircleNotifications, MdDeleteOutline, MdModeEditOutline } from 'react-icons/md';
import { connect } from 'react-redux';
import { getCategories, clearCategoryState, deleteCategory } from '../../redux/actions/categoryAction';

class ListCategory extends Component {
    constructor() {
        super();

        this.state = {
            originalData: [],
            filteredData: [],
            currentPage: 1,
            pageSize: 8,
            searchKeyword: '',
        };
    }

    componentDidMount = () => {
        this.props.getCategories(this.state.currentPage, this.state.pageSize);

        console.log('did mount');
    };

    componentDidUpdate(prevProps) {
        if (prevProps.categories !== this.props.categories) {
            this.forceUpdate();
            this.setState({
                originalData: this.props.categories,
                filteredData: this.props.categories,
            });
        }
    }

    // ham phu trach lay du lieu tim kiem

    handleSearch = (value) => {
        const { currentPage, pageSize } = this.state;

        if (value) {
            // Nếu có giá trị tìm kiếm
            const filteredCategories = this.props.categories.filter(
                (category) =>
                    category.id.toString().includes(value.toLowerCase()) ||
                    category.name.toLowerCase().includes(value.toLowerCase()),
            );
            this.setState({
                filteredCategories,
            });
            if (filteredCategories.length === 0) {
                Modal.warning({
                    title: 'No categories found',
                    content: `Category "${value}" not found!`,
                });
            }
        } else {
            // Nếu không có giá trị tìm kiếm
            this.props.getCategories(currentPage, pageSize);
            this.setState({
                filteredCategories: null,
            });
        }
    };

    componentWillUnmount = () => {
        this.props.clearCategoryState();
        console.log('will unmount');
    };

    editCategory = (category) => {
        console.log(category);
        const { navigate } = this.props.router;

        navigate('/categories/update/' + category.id);
    };

    deleteCategory = async (category) => {
        const { deleteCategory } = this.props;
        await deleteCategory(category.id);

        // Refresh data
        const { currentPage, pageSize } = this.state;
        this.props.getCategories(currentPage, pageSize);
        getCategories();
    };

    handlePageChange = (page, pageSize) => {
        this.setState({
            currentPage: page,
            pageSize: pageSize,
        });

        this.props.getCategories(page, pageSize);
    };

    openDeleteConfirmModal = (category) => {
        this.setState({ ...this.state, category: category });
        console.log(category);

        const message = 'Do you want to delete the category' + category.name;

        Modal.confirm({
            title: 'Confirm',
            icon: <MdCircleNotifications />,
            content: message,
            onOk: () => this.deleteCategory(category),
            okText: 'Delete',
            cancelText: 'Cancel',
        });
    };

    render() {
        const { navigate } = this.props.router;
        const { categories, isLoading } = this.props;
        const { currentPage, pageSize } = this.state;
        const totalRecords = categories.length;

        if (isLoading) {
            return (
                <div>
                    <ContentHeader
                        navigate={navigate}
                        title="List Categories"
                        className="site-page-header"
                    ></ContentHeader>
                    <Skeleton active />
                </div>
            );
        }
        console.log('non' + categories);
        return (
            <div>
                <ContentHeader navigate={navigate} title="List Categories" className="site-page-header"></ContentHeader>

                <Input.Search
                    placeholder="Search categories"
                    allowClear
                    enterButton="Search"
                    className="search-input"
                    style={{ width: 230, float: 'left', marginRight: 5, marginBottom: 20 }}
                    onSearch={this.handleSearch}
                />

                <Table
                    dataSource={
                        Array.isArray(this.state.filteredCategories)
                            ? this.state.filteredCategories
                            : Array.isArray(categories)
                            ? categories
                            : []
                    }
                    size="small"
                    rowKey="id"
                    pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        total: totalRecords,
                        onChange: this.handlePageChange,
                        style: {
                            float: 'right',
                        },
                    }}
                >
                    <Column title="Category ID" key="id" dataIndex="id" width={40}></Column>

                    <Column title="Name" key="name" dataIndex="name"></Column>

                    <Column
                        title="Status"
                        key="status"
                        dataIndex="status"
                        width={80}
                        align="center"
                        render={(_, { status }) => {
                            let color = 'volcano';
                            let name = 'In-visible';
                            if (status === 'Visible') {
                                color = 'green';
                                name = 'Visible';
                            }

                            return <Tag color={color}>{name}</Tag>;
                        }}
                    ></Column>

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
                                    onClick={() => this.editCategory(record)}
                                >
                                    <MdModeEditOutline style={{ marginRight: 8 }} />
                                    Edit
                                </Button>
                                <Button
                                    key={record.key}
                                    type="primary"
                                    danger
                                    size="small"
                                    onClick={() => this.openDeleteConfirmModal(record)}
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

const mapStateToProps = (state) => ({
    categories: state.categoryReducer.categories,
    isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
    getCategories,
    clearCategoryState,
    deleteCategory,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListCategory));
