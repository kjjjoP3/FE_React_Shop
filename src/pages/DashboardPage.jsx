import './DashboardPage.css';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Layout, Menu, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    MdAddCircleOutline,
    MdCategory,
    MdFormatListBulleted,
    MdInsertChartOutlined,
    MdLogout,
    MdManageAccounts,
    MdOutlineHome,
    MdOutlineInventory2,
    MdOutlineShoppingBag,
    MdRequestPage,
    MdSupervisorAccount,
} from 'react-icons/md';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Home from '~/components/home/Home';
import AddOrEditCategory from '~/components/categories/AddOrEditCategory';
import ListCategory from '~/components/categories/ListCategory';
import { setError, setMessage } from '~/redux/actions/commonAction';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import ListManufacturers from '~/components/manufacturers/ListManufacturers';
import UploadImage from '~/components/products/UploadImage';
import AddOrEditProduct from '~/components/products/AddOrEditProduct';

const { Header, Sider, Content } = Layout;

function DashboardPage() {
    const [marginLeft, setMarginLeft] = useState(200);
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const msg = useSelector((state) => state.commonReducer.message);
    console.log('Message is: ', msg);
    const err = useSelector((state) => state.commonReducer.error);
    const dispatch = useDispatch();

    useEffect(() => {
        if (msg) {
            dispatch(setMessage(''));
            message.success(msg);
        }
        if (err) {
            dispatch(setError(''));
            message.error(err);
        }
    }, [msg, err, dispatch]);

    const siteLayoutStyle = { marginLeft: marginLeft };
    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
            >
                <div className="logo">
                    <h2>{collapsed ? 'SS' : 'SpringShop'}</h2>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <MdOutlineHome />,
                            label: 'Home',
                            onClick: () => navigate('/'),
                        },
                        {
                            key: '2',
                            icon: <MdCategory />,
                            label: 'Categories',
                            children: [
                                {
                                    key: '21',
                                    icon: <MdAddCircleOutline />,
                                    label: 'Add Category',
                                    onClick: () => navigate('/categories/add'),
                                },
                                {
                                    key: '22',
                                    icon: <MdFormatListBulleted />,
                                    label: 'List Categories',
                                    onClick: () => navigate('/categories/list'),
                                },
                            ],
                        },
                        {
                            key: 'O21',
                            icon: <MdCategory />,
                            label: 'Others',
                            children: [
                                {
                                    key: '211',
                                    icon: <MdAddCircleOutline />,
                                    label: 'List Manafacturers',
                                    onClick: () => navigate('/manufacturers/list'),
                                },
                                {
                                    key: '221',
                                    icon: <MdFormatListBulleted />,
                                    label: 'List Coutries',
                                    onClick: () => navigate('/coutries/list'),
                                },
                                {
                                    key: '223',
                                    icon: <MdFormatListBulleted />,
                                    label: 'List Provinces',
                                    onClick: () => navigate('/provinces/list'),
                                },
                            ],
                        },
                        {
                            key: '3',
                            icon: <MdOutlineInventory2 />,
                            label: 'Products',
                            children: [
                                {
                                    key: '31',
                                    icon: <MdAddCircleOutline />,
                                    label: 'Add Product',
                                    onClick: () => navigate('/products/add'),
                                },
                                {
                                    key: '32',
                                    icon: <MdFormatListBulleted />,
                                    label: 'List Products',
                                    onClick: () => navigate('/products/list'),
                                },
                                {
                                    key: '33',
                                    icon: <MdFormatListBulleted />,
                                    label: 'UpLoad Images',
                                    onClick: () => navigate('/products/upload'),
                                },
                            ],
                        },
                        {
                            key: '4',
                            icon: <MdOutlineShoppingBag />,
                            label: 'Orders',
                        },
                        {
                            key: '5',
                            icon: <MdRequestPage />,
                            label: 'Invoices',
                        },
                        {
                            key: '6',
                            icon: <MdInsertChartOutlined />,
                            label: 'Statistics',
                        },
                        {
                            key: '7',
                            icon: <MdManageAccounts />,
                            label: 'Profiles',
                        },
                        {
                            key: '8',
                            icon: <MdSupervisorAccount />,
                            label: 'Accounts',
                        },
                        {
                            key: '9',
                            icon: <MdLogout />,
                            label: 'Logout',
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout" style={siteLayoutStyle}>
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                        right: 16,
                        left: marginLeft + 16,
                        top: 0,
                        position: 'fixed',
                        height: 70,
                    }}
                >
                    <Row>
                        <Col md={18}>
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: () => {
                                    const sts = !collapsed;
                                    setCollapsed(sts);
                                    setMarginLeft(sts ? 80 : 200);
                                },
                            })}
                        </Col>
                        <Col md={6}>
                            <div>
                                <Avatar size="default" icon={<UserOutlined />}></Avatar>Bui Tien Thanh
                            </div>
                        </Col>
                    </Row>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '80px 24px 16px 24px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <div className="content-panel">
                        <Routes>
                            <Route path="/" element={<Home />}></Route>
                            <Route path="/categories/add" element={<AddOrEditCategory key="a" />}></Route>
                            <Route path="/categories/update/:id" element={<AddOrEditCategory key="u" />}></Route>
                            <Route path="/categories/list" element={<ListCategory />}></Route>
                            <Route path="/manufacturers/list" element={<ListManufacturers />}></Route>
                            <Route path="/products/upload" element={<UploadImage />}></Route>
                            <Route path="/products/add" element={<AddOrEditProduct />}></Route>
                        </Routes>

                        <Outlet></Outlet>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default DashboardPage;
