import { UploadOutlined } from '@ant-design/icons';
import { Col, Divider, Input, Row, Form, Select, DatePicker, Upload, Button } from 'antd';
import React, { Component } from 'react';

class ProductForm extends Component {
    form = React.createRef();
    goNext = () => {
        this.props.goNext({});
    };
    render() {
        const { product } = this.props;
        return (
            <>
                <Form layout="vertical" className="form" size="middle" ref={this.form}>
                    <Row>
                        <Col md={12}>
                            <Form.Item label="Product Id" name="id" initialValue={product.id}>
                                <Input readOnly></Input>
                            </Form.Item>
                            <Form.Item label="Name" name="name" initialValue={product.name}>
                                <Input></Input>
                            </Form.Item>
                            <Form.Item label="Quantity" name="quantity" initialValue={product.quantity}>
                                <Input></Input>
                            </Form.Item>
                            <Form.Item label="Price" name="price" initialValue={product.price}>
                                <Input></Input>
                            </Form.Item>
                            <Form.Item label="Discount" name="discount" initialValue={product.discount}>
                                <Input></Input>
                            </Form.Item>
                        </Col>
                        <Col md={1}>
                            <Divider type="vertical" style={{ height: '100%' }}></Divider>
                        </Col>
                        <Col md={11}>
                            <Form.Item label="Status" name="status" initialValue={product.status}>
                                <Select placeholder="Select Product Status">
                                    <Select.Option value="InStock">InStock</Select.Option>
                                    <Select.Option value="OutOfStock">OutOfStock</Select.Option>
                                    <Select.Option value="Discontinued">Discontinued</Select.Option>
                                    <Select.Option value="OnBackOrder">OnBackOrder</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item label="Category" name="categoryId" initialValue={product.categoryId}>
                                <Select placeholder="Select Category">
                                    <Select.Option value="InStock">Computer</Select.Option>
                                    <Select.Option value="OutOfStock">LapTop</Select.Option>
                                    <Select.Option value="Discontinued">SmartPhone</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item label="Manufacturer" name="manufacturerId" initialValue={product.manufacturerId}>
                                <Select placeholder="Select Manufacturer">
                                    <Select.Option value="InStock">FPT</Select.Option>
                                    <Select.Option value="OutOfStock">Dell</Select.Option>
                                    <Select.Option value="Discontinued">OMG</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Manufacture Date"
                                name="manufactureDate"
                                initialValue={product.manufactureDate}
                            >
                                <DatePicker></DatePicker>
                            </Form.Item>

                            <Form.Item
                                label="Main Image"
                                name="image"
                                initialValue={product.imgae ? [{ ...product.imgae }] : []}
                            >
                                <Upload listType="picture" accept=".jpg,.png,.gif" maxCount={1}>
                                    <Button icon={<UploadOutlined />}></Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={24}>
                            <Form.Item label="Brief" name="brief" initialValue={product.brief}>
                                <Input></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={24}>
                            <Form.Item label="Description" name="description" initialValue={product.description}>
                                <Input></Input>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={24}>
                            <Divider></Divider>
                            <Button type="primary" onClick={this.goNext} style={{ float: 'right' }}>
                                Next
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </>
        );
    }
}

export default ProductForm;
