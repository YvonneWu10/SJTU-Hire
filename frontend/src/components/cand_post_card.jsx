import '../css/global.css'

import {Avatar, Button, Card, Col, message, Row, Steps} from "antd"
import {Link} from "react-router-dom";
import * as antIcons from "@ant-design/icons";
import {forwardSubmissionStageByCandPostId, terminateSubmissionStageByCandPostId} from "../service/candPost";
const { Meta } = Card;

const IconFont = antIcons.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_4523760_9crnc6z2leh.js',
});

// 用于显示已投递某岗位的用户者的状态信息
export default function CandPostCard({ cand, post, candPost }) {
    let icon_type;
    if (cand.candGender === "男") {
        icon_type = String("icon-nantouxiang");
    } else {
        icon_type = String("icon-picture_woman");
    }

    const refreshPage = () => {
        window.location.reload();
    }

    // 用于处理环节推进按钮
    const forwardStage = async() => {
        await forwardSubmissionStageByCandPostId(cand.candId, post.postId);
        refreshPage();
        message.info('已推进流程');
        // getCandPost();
    }

    // 用于处理环节终止按钮
    const terminateStage = async() => {
        await terminateSubmissionStageByCandPostId(cand.candId, post.postId);
        refreshPage();
        message.info('已终止流程');
        // getCandPost();
    }

    const isDisabled = (submissionStage) => {
        if (submissionStage === "录取"){
            return true;
        } else if (submissionStage === "流程终止"){
            return true;
        }
        return false;
    }
    return <div>
        {/*<Link to={`/hr_view/candPostDetail/${cand.candId}/${post.postId}`}>*/}
        <Card style={{"white-space": "pre-wrap"}}>
            <Link to={`/hr_view/candPostDetail/${cand.candId}/${post.postId}`}>
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
            </Link>
            <div style={{display: "flex"}}>
                <Button type="primary" disabled={isDisabled(candPost.submissionStage)} onClick={forwardStage} style={{ right: 0 , marginLeft: 'auto', marginBottom: -10}}>进入下一环节</Button>
                <Button type="primary" disabled={isDisabled(candPost.submissionStage)} onClick={terminateStage} style={{ right: 0,  marginLeft: 10, marginBottom: -10}}>淘汰</Button>
            </div>
        </Card>
        {/*</Link>*/}
    </div>
}
