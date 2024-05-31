import '../css/global.css'

import { Button, Col, Form, Input, InputNumber, message, Row, Select } from "antd"
import { useState } from "react";
import ProjectForm from "./project_form";
import { useNavigate } from "react-router-dom";
import {candidateEdit} from "../service/candidate";

const { Option } = Select;

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

function transformData(data) {
    const transformedData = {};

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const parts = key.split('_');
            if (parts.length === 1) {
                transformedData[key] = data[key];
            }
            else if (parts.length === 2) {
                const [fieldPrefix, id] = parts;
                // const fieldId = parseInt(id);

                if (!transformedData[id]) {
                    transformedData[id] = {};
                }

                transformedData[id][fieldPrefix] = data[key];
            }
        }
    }

    return transformedData;
}

// 求职者修改基本信息表单
export default function CandidateBasicInfoForm({candidate, projectList}) {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const [projects, setProjects] = useState(projectList);
    const [nextId, setNextId] = useState(5001);
    const [deletedProjects, setDeletedProjects] = useState([]);

    const handleAddProject = () => {
        const newProjectId = nextId;
        setNextId(nextId + 1);
        const newProject = {
            projectId: newProjectId,
            projectName: ``,
        };
        setProjects([...projects, newProject]);
    };

    const handleDeleteProject = (projectId) => {
        setDeletedProjects([...deletedProjects, projectId]);
        const newProjects = projects.filter(project => project.projectId !== projectId);
        setProjects(newProjects);
    };

    const candidateOnFinish = async (values) => {
        // console.log(JSON.stringify(transformData(values), null, 2));
        values = transformData(values);
        const data = {
            values: values,
            deletedProjects: deletedProjects,
        };
        // console.log(JSON.stringify(data, null, 2));
        let res = await candidateEdit(data);
        // console.log(JSON.stringify(res, null, 2));

        if (res.ok) {
            message.info(res.message);
            navigate(`/candidate_view/PersonalCenter`);
        } else {
            message.error(res.message);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
    <div style={{display: "flex", justifyContent: 'center', alignItems: "center"}}>
        <Form
            {...formItemLayout}
            form={form}
            name="editCandidate"
            onFinish={candidateOnFinish}
            onFinishFailed={onFinishFailed}
            scrollToFirstError
            style={{width: '80%', alignItems: "center", justifyContent: "center"}}>
            <Row>
                <Col span={8}>
                    <Form.Item name="candidateName" label={'姓名'} initialValue={candidate.candName}
                               rules={[{required: true, message: "请输入姓名"}]}>
                        <Input allowClear style={{width: '80%'}}></Input>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item name="candidateId" label={"身份证号"} initialValue={candidate.candId}>
                        <Input disabled style={{width: '80%'}}></Input>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item name="candidateGender" label={"性别"} initialValue={candidate.candGender}>
                        <Select allowClear placeholder="请选择性别" style={{width: '80%'}}>
                            <Option value="男">男</Option>
                            <Option value="女">女</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={8}>
                    <Form.Item name="candidateAge" label={"年龄"} initialValue={candidate.candAge}>
                        <InputNumber style={{width: '80%'}} min={0} precision={0}/>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item name="candidatePhone" label={"电话"} initialValue={candidate.candPhone}
                               rules={[{pattern: /^\d{11}$/, message: '请输入11位数字电话号码'}]}>
                        <Input allowClear style={{width: '80%'}}></Input>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item name="candidateMail" label={"邮箱"} initialValue={candidate.candMail}
                               rules={[{type: "email", message: '请输入正确的邮箱地址'}]}>
                        <Input allowClear style={{width: '80%'}}></Input>
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={8}>
                    <Form.Item name="candidateProvince" label={"户籍省份"}
                               initialValue={candidate.candProvince}>
                        <Input allowClear style={{width: '80%'}}></Input>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item name="candidateDegree" label={"学历"} initialValue={candidate.candDegree}>
                        <Select allowClear placeholder="请选择学历" style={{width: '80%'}}>
                            <Option value="大专">大专</Option>
                            <Option value="本科">本科</Option>
                            <Option value="硕士">硕士</Option>
                            <Option value="博士">博士</Option>
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item name="candidateUniversity" label={"毕业院校"}
                               initialValue={candidate.candUniversity}>
                        <Input allowClear style={{width: '80%'}}></Input>
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={8}>
                    <Form.Item name="candidateMajor" label={"专业"} initialValue={candidate.candMajor}>
                        <Input allowClear style={{width: '80%'}}></Input>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item name="candidateGPA" label={"GPA"} initialValue={candidate.candGPA}
                               rules={[{type: "float", message: "请输入正确的GPA"}]}>
                        <InputNumber style={{width: '80%'}} min={0} precision={2} step={0.01}/>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item name="candidateMentor" label={"导师"} initialValue={candidate.candMentor}>
                        <Input allowClear style={{width: '80%'}}></Input>
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={8}>
                    <Form.Item name="candidatePaperNum" label={"论文数量"} initialValue={candidate.candPaperNum}
                               rules={[{type: "integer", message: "请输入正确的论文数量"}]}>
                        <InputNumber style={{width: '80%'}} min={0} precision={0} suffix={'篇'}/>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item name="candidateWorkYear" label={"工作经验"} initialValue={candidate.candWorkYear}
                               rules={[{type: "integer", message: "请输入正确的工作经验"}]}>
                        <InputNumber style={{width: '80%'}} min={0} precision={0} suffix={'年'}/>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item name="candidateExpectedSalary" label={"期望工资"}
                               initialValue={candidate.candExpectedSalary}
                               rules={[{type: "integer", message: "请输入正确的工作经验"}]}>
                        <InputNumber style={{width: '80%'}} min={0} precision={0} suffix={'k'}/>
                    </Form.Item>
                </Col>
            </Row>

            <ProjectForm projectList={projects} handleDeleteProject={handleDeleteProject} />

            <Form.Item wrapperCol={{xs: {span: 24, offset: 21}, sm: {span: 24, offset: 21}}}>
                <Button onClick={handleAddProject}
                        className="ant-button-primary"
                        style={{marginTop: 20, marginLeft: 18}}>添加项目</Button>
            </Form.Item>

            <Form.Item wrapperCol={{xs: {span: 24, offset: 0}, sm: {span: 24, offset: 10}}}>
                <Button className="ant-button-primary" type="primary" htmlType="submit">保存</Button>
            </Form.Item>
        </Form>
    </div>
    );
}