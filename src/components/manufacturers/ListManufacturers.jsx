import { Button, Col, Modal, Row } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import withRouter from '~/helpers/withRouter';

import ContentHeader from '../common/ContentHeader';
import ManafacturerList from './ManafacturerList';
import ManufacturerForm from './ManufacturerForm';

import {
    insertManufacturer,
    getManufacturers,
    deleteManufacturer,
    updateManufacturer,
} from '~/redux/actions/manufacturerAction';
import { MdCircleNotifications } from 'react-icons/md';

class ListManufacturers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            originalData: [],
            filteredData: [],
            currentPage: 1,
            pageSize: 8,
            searchKeyword: '',
            open: false,
            manufacturer: { id: '', name: '', logo: '' },
        };
    }

    deleteManufacturer = () => {
        this.props.deleteManufacturer(this.state.manufacturer.id);

        // Refresh data
        const { currentPage, pageSize } = this.state;
        this.props.getManufacturers(currentPage, pageSize);

        console.log('delete manufacturer');
    };

    onDeleteConfirm = (value) => {
        this.setState({ ...this.state, manufacturer: value });

        const message = 'Do you want to delete the manufacturer' + value.name;

        Modal.confirm({
            title: 'Confirm',
            icon: <MdCircleNotifications />,
            content: message,
            onOk: () => this.deleteManufacturer(),
            okText: 'Delete',
            cancelText: 'Cancel',
        });
    };

    componentDidMount = () => {
        this.props.getManufacturers(this.state.currentPage, this.state.pageSize);

        console.log('did mount');
    };

    onCreate = (values) => {
        console.log(values);
        if (values.id) {
            this.props.updateManufacturer(values);
        } else {
            this.props.insertManufacturer(values);
        }
        this.setState({ ...this.state, manufacturer: {}, open: false });
        getManufacturers();
    };

    onEdit = (value) => {
        this.setState({ ...this.state, manufacturer: value, open: true });
    };

    // ham phu trach lay du lieu tim kiem

    handleSearch = (value) => {
        const { currentPage, pageSize } = this.state;

        if (value) {
            // Nếu có giá trị tìm kiếm
            const filteredCategories = this.props.manufacturers.filter(
                (manufacturer) =>
                    manufacturer.id.toString().includes(value.toLowerCase()) ||
                    manufacturer.name.toLowerCase().includes(value.toLowerCase()),
            );
            this.setState({
                filteredCategories,
            });
            if (filteredCategories.length === 0) {
                Modal.warning({
                    title: 'No manufacturers found',
                    content: `manufacturers "${value}" not found!`,
                });
            }
        } else {
            // Nếu không có giá trị tìm kiếm
            this.props.getManufacturers(currentPage, pageSize);
            this.setState({
                filteredCategories: null,
            });
        }
    };

    componentDidUpdate(prevProps) {
        if (prevProps.manufacturers !== this.props.manufacturers) {
            this.forceUpdate();
            this.setState({
                originalData: this.props.manufacturers,
                filteredData: this.props.manufacturers,
            });
        }
    }

    handlePageChange = (page, pageSize) => {
        this.setState({
            currentPage: page,
            pageSize: pageSize,
        });

        this.props.getManufacturers(page, pageSize);
    };

    render() {
        const { navigate } = this.props.router;
        const { open } = this.state;
        const { manufacturers } = this.props;
        const { currentPage, pageSize } = this.state;
        const totalRecords = manufacturers.length;
        return (
            <div>
                <ContentHeader
                    navigate={navigate}
                    title="List Manafacturer"
                    className="site-page-header"
                ></ContentHeader>

                <Row>
                    <Col md={24}>
                        <Button
                            type="primary"
                            onClick={() => {
                                this.setState({ ...this.state, open: true });
                            }}
                        >
                            New Manufacturer
                        </Button>
                    </Col>
                </Row>

                <ManafacturerList
                    dataSource={Array.isArray(manufacturers) ? manufacturers : []}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalRecords={totalRecords}
                    handlePageChange={this.handlePageChange}
                    handleSearch={this.handleSearch}
                    onDeleteConfirm={this.onDeleteConfirm}
                    onEdit={this.onEdit}
                />

                <ManufacturerForm
                    manufacturer={this.state.manufacturer}
                    open={open}
                    onCreate={this.onCreate}
                    onCancel={() => {
                        this.setState({ ...this.state, open: false });
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        manufacturers: state.manufactuerReducer.manufacturers,
    };
};

const mapDispatchToProps = {
    insertManufacturer,
    getManufacturers,
    deleteManufacturer,
    updateManufacturer,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListManufacturers));
