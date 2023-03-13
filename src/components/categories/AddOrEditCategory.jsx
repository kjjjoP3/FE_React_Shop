import React, { Component } from 'react';
import { Col, Divider, Row, Form, Input, Select, Button, Popconfirm } from 'antd';
import withRouter from '~/helpers/withRouter';
import ContentHeader from '../common/ContentHeader';
import { inserCategory, getCategory, clearCategory, updateCategory } from '~/redux/actions/categoryAction';
import { connect } from 'react-redux';

class AddOrEditCategory extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            category: { id: '', name: '', status: 'Visible' },
        };
    }

    componentDidMount = () => {
        const id = this.props.router.params.id;
        if (id) {
            this.props.getCategory(id);
        } else {
            this.props.clearCategory();
        }
    };

    static getDerivedStateFromProps(nextProps, preState) {
        if (nextProps.category && preState.category.id !== nextProps.category.id) {
            return {
                ...preState,
                category: nextProps.category,
            };
        } else if (!nextProps.category) {
            return {
                ...preState,
                category: {
                    id: '',
                    name: '',
                    status: 'Visible',
                },
            };
        }
        return null;
    }
    comfirmUpdate = () => {
        console.log('Update Category');
        this.formRef.current.submit();
    };

    onSubmitForm = (values) => {
        console.log(values);

        const { navigate } = this.props.router;
        const { id } = this.state.category;

        if (!id) {
            this.props.inserCategory(values, navigate);
        } else {
            this.props.updateCategory(id, values, navigate);
        }
    };

    render() {
        const { navigate } = this.props.router;
        const { isLoading } = this.props;
        const { category } = this.state;
        let title = 'Add New Category';

        if (category.id) {
            title = 'Update Category';
        }
        return (
            <div>
                <ContentHeader navigate={navigate} title={title} className="site-page-header"></ContentHeader>

                <Form
                    layout="vertical"
                    className="form"
                    onFinish={this.onSubmitForm}
                    ref={this.formRef}
                    disabled={isLoading}
                    key={category.id}
                >
                    <Row>
                        <Col md={12}>
                            <Form.Item
                                label="Category ID"
                                name="CategoryId"
                                initialValue={category.id}
                                hidden={category.id ? false : true}
                            >
                                <Input readOnly></Input>
                            </Form.Item>
                            <Form.Item
                                label="Name"
                                name="name"
                                initialValue={category.name}
                                rules={[{ required: true, min: 2 }]}
                            >
                                <Input></Input>
                            </Form.Item>
                            <Form.Item
                                label="Status"
                                name="status"
                                initialValue={category.status === 'Visible' ? '0' : '1'}
                            >
                                <Select>
                                    <Select.Option value="0">Visble</Select.Option>
                                    <Select.Option value="1">Invisble</Select.Option>
                                </Select>
                            </Form.Item>
                            <Divider></Divider>
                            {!category.id && (
                                <Button htmlType="submit" type="primary" style={{ float: 'right' }} loading={isLoading}>
                                    Save
                                </Button>
                            )}
                            {category.id && (
                                <Popconfirm
                                    title="Are you sure update this category?"
                                    onConfirm={this.comfirmUpdate}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button
                                        htmlType="submit"
                                        type="primary"
                                        style={{ float: 'right' }}
                                        loading={isLoading}
                                    >
                                        Update
                                    </Button>
                                </Popconfirm>
                            )}
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state.categoryReducer.category);
    return {
        category: state.categoryReducer.category,
        isLoading: state.commonReducer.isLoading,
    };
};

const mapDispatchToProps = {
    inserCategory,
    getCategory,
    clearCategory,
    updateCategory,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddOrEditCategory));
