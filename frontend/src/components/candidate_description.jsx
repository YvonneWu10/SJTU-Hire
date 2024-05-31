import '../css/global.css'

import {Col, Descriptions} from "antd"


// 求职者简历展示组件
export default function CandidateDescription({ candidate, projectList }) {
    const basicItems = [
        {
            key: '1',
            label: '姓名',
            children: candidate.candName,
        },
        {
            key: '2',
            label: '身份证号',
            children: candidate.candId,
        },
        {
            key: '3',
            label: '性别',
            children: candidate.candGender,
        },
        {
            key: '4',
            label: '年龄',
            children: candidate.candAge,
        },
        {
            key: '5',
            label: '电话',
            children: candidate.candPhone,
        },
        {
            key: '6',
            label: '邮箱',
            children: candidate.candMail,
        },
        {
            key: '7',
            label: '户籍省份',
            children: candidate.candProvince,
        },
        {
            key: '8',
            label: '学历',
            children: candidate.candDegree,
        },
        {
            key: '9',
            label: '毕业院校',
            children: candidate.candUniversity,
        },
        {
            key: '10',
            label: '专业',
            children: candidate.candMajor,
        },
        {
            key: '11',
            label: 'GPA',
            children: candidate.candGPA,
        },
        {
            key: '12',
            label: '导师',
            children: candidate.candMentor,
        },
        {
            key: '13',
            label: '论文数量',
            children: candidate.candPaperNum == null ? null : `${candidate.candPaperNum}篇`,
        },
        {
            key: '14',
            label: '工作经验',
            children: candidate.candWorkYear == null ? null : `${candidate.candWorkYear}年`,
        },
        {
            key: '15',
            label: '期望工资',
            children: candidate.candExpectedSalary == null ? null : `${candidate.candExpectedSalary}k`,
        },
    ];

    const projectDescriptions = projectList.map((project) => ({
        key: project.projectId,
        label: <span style={{fontSize: '16px'}}>项目 - {project.projectName}</span>,
        span: 3,
        children: (
            <Descriptions layout="vertical" column={4}>
                <Descriptions.Item label="开始时间">{project.startDate}</Descriptions.Item>
                <Descriptions.Item label="结束时间">{project.endDate}</Descriptions.Item>
                <Descriptions.Item label="角色">{project.role}</Descriptions.Item>
                <Descriptions.Item label="项目业绩">{project.projectAchievement == null ? null : `${project.projectAchievement}k`}</Descriptions.Item>
                <Descriptions.Item label="描述" >
                    <span style={{textIndent: '2em', textAlign: 'left'}}>{project.description}</span>
                </Descriptions.Item>
            </Descriptions>
        ),
    }));

    const allItems = [...basicItems, ...projectDescriptions];

    return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop:'50px' }}>
                <Col span={15}>
                    <Descriptions title={<span style={{fontSize: '22px'}}>个人简历</span>} layout="vertical" column={3} items={allItems}/>
                </Col>
            </div>
    );
}