import '../css/global.css'

import {Button, Col, Form, Input, InputNumber, Row} from "antd"
import {DatePicker} from "antd/lib";
import dayjs from "dayjs";

// 求职者修改项目经历表单
export default function ProjectForm({projectList, handleDeleteProject}) {
    return (projectList.map((project) => (
        <div key={project.projectId}>
            <Row>
                <Col span={8}>
                    <Form.Item name={`projectName_${project.projectId}`} label={"项目名称"}
                               initialValue={project.projectName}
                               rules={[{required: true, message: "请输入项目名称"}]}>
                        <Input allowClear style={{width: '80%'}}></Input>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name={`projectRole_${project.projectId}`} label={"角色"}
                               initialValue={project.role}>
                        <Input allowClear style={{width: '80%'}}></Input>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item>
                        <Button onClick={() => handleDeleteProject(project.projectId)}
                                className="ant-button-primary"
                                style={{marginLeft: 85}}>删除</Button>
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={8}>
                    <Form.Item name={`projectStartDate_${project.projectId}`} label={"开始时间"}
                               initialValue={dayjs(project.startDate)}>
                        <DatePicker/>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item name={`projectEndDate_${project.projectId}`} label={"结束时间"}
                               initialValue={dayjs(project.endDate)}>
                        <DatePicker/>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item name={`projectAchievement_${project.projectId}`} label={"项目业绩"}
                               initialValue={project.projectAchievement}>
                        <InputNumber style={{width: '80%'}} min={0} precision={0} suffix={'k'}/>
                    </Form.Item>
                </Col>
            </Row>
            <div style={{marginLeft: -505}}>
                <Form.Item name={`projectDescription_${project.projectId}`} label={"描述"}
                           initialValue={project.description}>
                    <Input.TextArea showCount maxLength={120} rows={3} style={{width: '95.2%'}}/>
                </Form.Item>
            </div>
        </div>
    )));
}