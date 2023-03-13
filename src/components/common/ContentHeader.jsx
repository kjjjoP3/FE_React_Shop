import React, { Component } from 'react';
import { Divider, Layout, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;
export default class ContentHeader extends Component {
    render() {
        const { navigate, title, className } = this.props;
        return (
            <div>
                <Header className={className} style={{ padding: 0 }}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: '#fff',
                        }}
                    >
                        <LeftOutlined
                            style={{ fontSize: 20, marginRight: 16, cursor: 'pointer', marginTop: 20 }}
                            onClick={() => navigate(-1)}
                        />
                        <Title level={5}>{title}</Title>
                    </div>
                </Header>
                <Divider></Divider>
            </div>
        );
    }
}
