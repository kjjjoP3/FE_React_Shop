import { Input, Modal, Form, Upload, Button, Divider, Image } from 'antd';
import React, { createRef } from 'react';
import manufacturerService from '~/services/manufacturerService';

class ManufacturerForm extends React.Component {
    form = createRef();

    constructor(props) {
        super(props);

        this.state = {
            manufacturer: { id: '', name: '', logo: '' },
            previewImage: '',
            previewVisible: false,
        };
    }

    handlePreview = (file) => {
        console.log(file);

        if (file.thumbUrl) {
            this.setState({ ...this.state, previewImage: file.thumbUrl, previewVisible: true });
        }
    };

    handleRemove = (file) => {
        if (this.state.previewImage === file.thumbUrl) {
            this.setState({ previewVisible: false, previewImage: '' });
        }
        console.log(file);
    };

    handleCancel = () => {
        this.setState({ previewVisible: false });
    };

    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        if (e.fileList.length > 1) {
            return [e.fileList[1]];
        }

        return e && e.fileList;
    };

    render() {
        const { open, onCancel, onCreate } = this.props;
        const { manufacturer } = this.props;
        const logoUrl = manufacturerService.getManafacturerLogoUrl(manufacturer.logo);
        const initialLogo = {
            url: logoUrl,
            uid: manufacturer.logo,
        };
        let title = 'Create a new manufacture';
        let okText = 'Create';
        if (manufacturer.id) {
            title = 'Update a new manufacture';
            okText = 'Update';
        }

        return (
            <div>
                <Modal
                    open={open}
                    title={title}
                    okText={okText}
                    cancelText="Cancel"
                    onCancel={onCancel}
                    onOk={() => {
                        this.form.current
                            .validateFields()
                            .then((values) => {
                                this.form.current.resetFields();
                                onCreate(values);
                            })
                            .catch((info) => {
                                console.log('Validate Failed:', info);
                            });
                    }}
                >
                    <Form
                        ref={this.form}
                        layout="vertical"
                        name="form_in_modal"
                        initialValues={{
                            modifier: 'public',
                        }}
                        key={'f' + manufacturer.id}
                    >
                        <Form.Item label="Manufacturer ID" name="id" initialValue={manufacturer.id}>
                            <Input readOnly></Input>
                        </Form.Item>
                        <Form.Item
                            label="Name"
                            name="name"
                            initialValue={manufacturer.name}
                            rules={[{ required: true, min: 2 }]}
                        >
                            <Input></Input>
                        </Form.Item>

                        <Form.Item
                            label="Logo"
                            name="logoFile"
                            initialValue={[initialLogo]}
                            rules={[{ required: true }]}
                            valuePropName="fileList"
                            getValueFromEvent={this.normFile}
                        >
                            <Upload
                                listType="picture"
                                onPreview={this.handlePreview}
                                onRemove={this.handleRemove}
                                accept=".jpg, .png,.gif"
                                maxCount={1}
                                beforeUpload={() => false}
                            >
                                <Button type="primary">Browse</Button>
                            </Upload>
                        </Form.Item>

                        <Divider></Divider>

                        {this.state.previewVisible && (
                            <Image
                                src={this.state.previewImage}
                                style={{ width: 200 }}
                                preview={{ visible: false }}
                                onClick={this.handleCancel}
                            >
                                {' '}
                            </Image>
                        )}
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default ManufacturerForm;
