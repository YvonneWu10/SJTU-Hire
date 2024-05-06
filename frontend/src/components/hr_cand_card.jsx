import '../css/global.css'

import {Avatar, Button, Card, Col, Dropdown, message, Row, Space, Steps} from "antd"
import {Link} from "react-router-dom";
import * as antIcons from "@ant-design/icons";
import {DownOutlined, UserOutlined} from "@ant-design/icons";
import {MenuProps} from "antd";
import type {SelectProps} from "antd";
import {inviteByCandPostId, terminateSubmissionStageByCandPostId} from "../service/candPost";

const { Meta } = Card;

const IconFont = antIcons.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_4523760_9crnc6z2leh.js',
});

const items: MenuProps['items'] = [
    {
        label: '1st menu item',
        key: '1',
        icon: <UserOutlined />,
    },
    {
        label: '2nd menu item',
        key: '2',
        icon: <UserOutlined />,
    },
    {
        label: '3rd menu item',
        key: '3',
        icon: <UserOutlined />,
        danger: true,
    },
    {
        label: '4rd menu item',
        key: '4',
        icon: <UserOutlined />,
        danger: true,
        disabled: true,
    },
];


export default function HRCandCard({ cand, postNames }) {
    let icon_type;
    if (cand.candGender === "男") {
        icon_type = String("icon-nantouxiang");
    } else {
        icon_type = String("icon-picture_woman");
    }

    const postOptions: MenuProps['items'] = postNames.map((postName, index) => ({
        label: postName,
        key: postName,
    }));

    const invite = (postName) => {
        inviteByCandPostId(cand.candId, postName.key.split(" ")[0]);
        message.info('已发送邀请');
        refreshPage();
    }

    const menuProps: MenuProps = {
        items: postOptions,
        onClick: invite,
    };

    const refreshPage = () => {
        window.location.reload();
    }

    return <Card style={{"white-space": "pre-wrap"}}>
            <Meta title={cand.candName}
                  description={
                      <Row style={{marginTop: -15}}>
                          <Col span={12}>
                              <div>
                                  <p>{cand.candAge}岁  工作{cand.candWorkYear}年  {cand.candDegree}</p>
                              </div>
                          </Col>
                          <Col span={12}>
                              <div>
                                  <IconFont type="icon-xuexiao"></IconFont>
                                  <p style={{"display": "inline-block"}}>  {cand.candUniversity} - {cand.candMajor}</p>
                              </div>
                          </Col>
                      </Row>
                  }
                  avatar={<Avatar style={{backgroundColor: 'transparent', margin: -20}} size={100}
                                  icon={<IconFont type={icon_type}/>}>
                  </Avatar>}/>

            <div style={{display: "flex"}}>
                <Dropdown menu={menuProps} >
                    <Button style={{ right: 0 , marginLeft: 'auto', marginBottom: -10}} >
                        <Space>
                            邀请
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            </div>
        </Card>
}
