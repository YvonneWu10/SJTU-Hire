import {
    Button,
    Cascader,
    Col,
    DatePicker,
    Descriptions,
    Form,
    Input,
    InputNumber,
    message,
    Row,
    Select,
    Space
} from "antd";
import { Divider, Typography } from 'antd';
import React, {useEffect, useState} from "react";
import { EnvironmentOutlined, TagOutlined, BookOutlined, TeamOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import {pcTextArr} from "element-china-area-data";
import {SelectProps} from "antd";
import {retPostCities} from "../service/post";
import {hrEditPost, retHRPostCities} from "../service/hr_post_view";
import {useNavigate} from "react-router-dom";
import {login} from "../service/login";
import {handleBaseApiResponse} from "../utils/message";

const { Title, Text } = Typography;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 9 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};

const { Option } = Select;
const { RangePicker } = DatePicker;

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
export default function HREditPostDetails({ post }) {
    const [cities, setCities] = useState([]);

    const [form] = Form.useForm();

    const navigate = useNavigate();
    const onFinish = async (fieldsValue: any) => {
        const rangeValue = fieldsValue['postDate'];
        const values = {
            ...fieldsValue,
            'openDate': rangeValue[0],
            'endDate': rangeValue[1],
            'postId': post.postId,
        };
        await hrEditPost(values);

        // handleBaseApiResponse(res, messageApi, () => navigate("/hr_view"));
        message.info('修改成功');
        navigate(`/hr_view/managePosts/postDetail/${post.postId}`);
        // console.log('Received values of form: ', values);
    };

    const cityOptions: SelectProps['options'] = cities.map(city => ({
        label: city,
        value: city
    }));

    const getPostCities = async () => {
        let resCities = await retHRPostCities();
        setCities(resCities);
    };

    useEffect(() => {
        getPostCities();
    }, []);



    return <div style={{display: "flex", justifyContent: 'center', alignItems:"center"}}>
        <Form
            {...formItemLayout}
            form={form}
            name="editPost"
            onFinish={onFinish}
            scrollToFirstError
            style={{alignItems:"center", justifyContent:"center"}}>
            <Row>
                <Col span={12}>
                    <Form.Item name="postName" label={'岗位名称'} initialValue={post.postName} rules={[{required: true, message: "请输入岗位名称"}]}>
                        <Input style={{ width: '80%'}}></Input>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="city" label={"所在城市"} initialValue={post.city} rules={[{required: true, message: "请选择所在城市"}]}>
                        {/*<Select style={{ width: '80%'}} options={pcTextArr}></Select>*/}
                        {/*<Cascader options={pcTextArr}></Cascader>*/}
                        <Input style={{ width: '80%'}}></Input>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item name="onSiteDayReq" label={"每周到岗要求"} initialValue={post.onSiteDayReq} rules={[{required: true, message: "请选择每周到港要求"}]}>
                        <InputNumber style={{ width: '80%'}} min={0} precision={0} max={5} suffix={"天/周"}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="degreeReq" label={"学历要求"} initialValue={post.degreeReq} rules={[{required: true, message: "请选择学历要求"}]}>
                        <Select placeholder="请选择学历要求" style={{width: '80%'}}>
                            <Option value="大专">大专</Option>
                            <Option value="本科">本科</Option>
                            <Option value="硕士">硕士</Option>
                            <Option value="博士">博士</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={9}>
                    <Form.Item name="salary" label={"工资"} initialValue={post.salary} rules={[{required: true, message: "请输入工资"}]}>
                        <InputNumber style={{ width: '80%'}} min={0} precision={0} suffix={"k"}/>
                    </Form.Item>
                </Col>
                <Col span={15}>
                    <Form.Item name="postDate" label="投递时间" initialValue={[dayjs(post.openDate), dayjs(post.endDate)]} rules={[{ type: 'array', required: true, message: '请给定具体日期' }]}>
                        <RangePicker />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item name="recruitNum" label="招聘人数" initialValue={post.recruitNum} rules={[{required: true, message: "请输入招聘人数"}]}>
                        <InputNumber style={{ width: '80%'}} min={0} precision={0} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="workType" label='正式/实习' initialValue={post.workType} rules={[{required: true, message: "请选择招聘类型"}]}>
                        <Select placeholder="请选择工作类型" style={{width: '80%'}}>
                            <Option value="正式">正式</Option>
                            <Option value="实习">实习</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item name="workStyle" label='远程/线下' initialValue={post.workStyle} rules={[{required: true, message: "请选择招聘类型"}]}>
                        <Select placeholder="请选择工作方式" style={{width: '80%'}}>
                            <Option value="远程">远程</Option>
                            <Option value="线下">线下</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="workYearReq" label="工作经验要求" initialValue={post.workYearReq} rules={[{required: true, message: "请输入工作经验要求"}]}>
                        <InputNumber style={{ width: '80%' }} min={0} precision={0} suffix={"年"}/>
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={24} >
                    <Form.Item labelCol={8} name="description" label="岗位描述" initialValue={post.description} rules={[{message: "请输入岗位描述"}]}>
                        <Input.TextArea rows={4} style={{width: '100%'}}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24} >
                    <Form.Item labelCol={8} name="responsibility" label="岗位职责" initialValue={post.responsibility} rules={[{message: "请输入岗位职责"}]}>
                        <Input.TextArea rows={4} style={{width: '100%'}}/>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 24, offset: 10 } }}>
                <Button type="primary" htmlType="submit">
                    提交修改
                </Button>
            </Form.Item>
        </Form>
    </div>
}