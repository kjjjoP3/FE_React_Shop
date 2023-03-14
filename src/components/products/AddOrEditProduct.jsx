import { Col, Divider, Row, Steps } from 'antd';
import React, { Component } from 'react';
import withRouter from '~/helpers/withRouter';
import ContentHeader from '../common/ContentHeader';
import ProductForm from './ProductForm';
import UploadImage from './UploadImage';

const { Step } = Steps;

class AddOrEditProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 0,
        };
    }

    goNext = (values) => {
        this.setState({ ...this.state, product: values, step: 1 });
    };
    render() {
        const { navigate } = this.props.router;
        const { step } = this.state;
        let title = 'Add New Products';

        // if (products.id) {
        //     title = 'Update Category';
        // }
        return (
            <div>
                <ContentHeader navigate={navigate} title={title} className="site-page-header"></ContentHeader>
                <Row>
                    <Col md={24}>
                        <Steps current={step}>
                            <Step title="Basic Information" description="Fill Basic Information"></Step>
                            <Step title="Images" description="Choose the list of images"></Step>
                        </Steps>
                    </Col>
                </Row>

                <Row>
                    <Col md={24}>
                        {step === 0 && (
                            <div>
                                <Divider></Divider>
                                <ProductForm product={{}} goNext={this.goNext}></ProductForm>
                            </div>
                        )}
                        {step === 1 && (
                            <div>
                                <Divider></Divider>
                                <UploadImage></UploadImage>
                            </div>
                        )}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withRouter(AddOrEditProduct);
