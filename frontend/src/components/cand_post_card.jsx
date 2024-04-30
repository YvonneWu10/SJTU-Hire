import '../css/global.css'

import {Avatar, Button, Card, Col, Row, Steps} from "antd"
import {Link} from "react-router-dom";
import * as antIcons from "@ant-design/icons";

const { Meta } = Card;

const IconFont = antIcons.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_4523760_9crnc6z2leh.js',
});

export default function CandPostCard({ cand, post, candPost }) {
    let icon_type;
    if (cand.candGender === "男") {
        icon_type = String("icon-nantouxiang");
    } else {
        icon_type = String("icon-picture_woman");
    }
    return <Link to={`/hr_view/candPostDetail/${cand.candId}/${post.postId}`}>
    <Card style={{"white-space": "pre-wrap"}}>

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
        <p style={{color: "#808080", marginBottom: -10}}> 应聘职位  {post.postName} - 应聘于 {candPost.submissionDate}</p>
        <p style={{color: "#808080", marginBottom: -10}}> 目前状态 - {candPost.submissionStage}</p>
        <div style={{display: "flex"}}>
            <Button type="primary" style={{ right: 0 , marginLeft: 'auto', marginBottom: -10}}>进入下一环节</Button>
            <Button type="primary" style={{ right: 0,  marginLeft: 10, marginBottom: -10}}>淘汰</Button>
        </div>
    </Card>
    </Link>
}
