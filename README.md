# SJTU直聘
小组成员：黄伊新，吴雨菲，杨凯
源代码：https://github.com/YvonneWu10/SJTU-Hire/

[toc]

## 概念设计（E-R图）
SJTU直聘是我们所设计的招聘网站，拥有应聘者、招聘者和网页管理者三个视图。应聘者可以在网页上浏览所有的岗位和公司信息，并选择喜欢的岗位进行投递，招聘者可以在网页上浏览应聘者的投递信息，邀请应聘者进行投递并管理岗位信息，管理者则监控整个网页的运行情况，并可以对人员和岗位信息等进行管理。以上需求可以被建模为以下E-R图。

![](https://notes.sjtu.edu.cn/uploads/upload_35cae087e41e1c039c47a02a9e51f884.png)

## 逻辑设计
将E-R图转化为关系模式如下：
> 本处用斜体代替表示外码的下划波浪线


岗位（$\underline{\text{编号}}$，岗位名称，学历要求，工作经验要求，一周到岗天数，城市，开放时间，投递截止日期，招聘人数，工资，*部门编号*，*公司编号*，远程/线下，实习/正式，*HR编号*，岗位描述，岗位要求）
应聘者（$\underline{\text{身份证号}}$，姓名，年龄，性别，手机号，邮箱，籍贯，成绩，导师，论文篇数，学历，学校，专业，工作经验，期望薪资，密码，token）
公司（$\underline{\text{公司编号}}$，公司名，公司规模，融资阶段，企业类型，公司行业，token，公司描述）
项目（$\underline{\text{项目编号}}$，项目名称，开始时间，结束时间，项目业绩，*应聘者身份证号*，角色，项目描述）
部门（$\underline{\textit{公司编号}}$，$\underline{\text{部门编号}}$，部门名称）
HR（$\underline{\text{员工编号}}$，姓名，*公司编号*，*部门编号*，密码，token）
投递（$\underline{\textit{应聘者身份证号}}$，$\underline{\textit{岗位编号}}$，投递时间，投递阶段）
管理员（$\underline{\text{用户名}}$，姓名，密码，token）

为了加速查找，保留了HR-公司和岗位-公司的冗余关系

## 数据生成
本项目所有数据全部通过代码随机进行生成，以避免产生隐私侵犯问题。下面简单描述数据生成方式以及数据格式，我们选择MySQL数据库对数据进行存储。

### 应聘者信息表格
* `candId`: 应聘者身份证号，通过python的`faker`库的`fake.ssn`函数直接生成；数据类型为可变长字符串，作为表格的主码存在
* `candName`：应聘者姓名，根据身份证号得到的性别分别调用`fake.name_female`或者`fake.name_male`生成；数据类型为可变长字符串，要求非空
* `candAge`:应聘者年龄，直接从身份证号中获得；数据类型为无符号整数，为了合理起见，在生成身份证号是会对年龄进行筛选
* `candGender`: 应聘者性别，直接从身份证号中获得；数据类型为可变长字符串
* `candPhone`: 应聘者手机号，通过`fake.phone_number`函数直接生成；数据类型为可变长字符串
* `candMail`: 应聘者邮箱，将姓名转变为拼音并后接gmail生成；数据类型为可变长字符串
* `candProvince`: 应聘者籍贯，通过`fake.province`函数生成；数据类型为可变长字符串
* `candGPA`: 应聘者GPA，通过python random库的uniform函数生成，保留两位小数；数据类型为保留两位小数的double
* `candMentor`: 应聘者导师，通过`fake.name`函数生成；数据类型为可变长字符串
* `candDegree`: 应聘者学历，在本硕博中随机采样获得；数据类型为可变长字符串
* `candPaperNum`: 应聘者论文数量，根据学历依据不同的分段函数进行生成；数据类型为无符号整数
* `candUniversity`: 应聘者毕业院校，简单起见，从中国的部分985，211院校中进行采样获得；数据类型为可变长字符串
* `candMajor`: 应聘者就读专业，从部分专业中采样获得；数据类型为可变长字符串
* `candWorkYear`: 应聘者工作经验，根据年龄采样获得；数据类型为无符号整数
* `candExpectedSalary`: 应聘者期望薪资，根据学历依据不同分布采样获得；数据类型为无符号整数
* `password`: 应聘者密码，使用大小写字母和数字随机生成；数据类型为可变长字符串，要求非空
* `token`: 用户对应的验证token信息，使用大小写字母和数字随机生成的12位字符串；数据类型为可变长字符串，要求非空且两两不同

### 投递信息表格
* `candId`: 应聘者身份证号，由应聘者`candId`中随机选取；数据类型为可变长字符串，要求非空，与`postId`共同形成该表格的主码，为关于应聘者信息表格的`candId`的外码
* `postId`: 岗位编号，由岗位`postId`中随机选取；数据类型为无符号整数，要求非空，与`candId`共同形成该表格的主码，为关于岗位信息表格的`postId`的外码
* `submissionDate`: 投递时间，在岗位的开放时间-投递截止时间的区间中随机选取；数据类型为日期类型，要求非空
* `submissionStage`: 投递阶段，通过在给定的“邀请”、“简历”、“笔试”、“一面”、“二面”、“hr面”、“offer评估”、“录取”、“流程终止”中随机采样生成；数据类型为可变长字符串，要求非空

### 公司信息表格
* `companyId`: 公司编号，由数据库维护并直接按顺序从1开始生成，数据类型为无符号整数，为该表格主码
* `companyName`: 公司名称，通过`fake.name`函数生成，数据类型为可变长字符串，要求非空
* `companyScale`: 公司规模，通过在给定规模段随机枚举生成，数据类型为可变长字符串
* `financingStage`: 融资阶段，通过在给定阶段随机枚举生成，数据类型为可变长字符串
* `companyType`: 公司类型，通过在给定的“民营”、“国企”、“外企”中随机枚举生成，数据类型为可变长字符串
* `companyField`: 公司领域，通过chatGPT API 根据公司名称生成，数据类型为可变长字符串
* `companyToken`: 公司对应的验证token信息，使用大小写字母和数字随机生成的10位字符串；数据类型为可变长字符串，要求非空且两两不同
* `description`: 公司描述，通过chatGPT API 根据公司名称生成，数据类型为可变长字符串

### 部门信息表格
* `companyId`: 公司编号，由公司`companyId`中随机选取；数据类型为无符号整数，要求非空，与`deparmentId`共同形成该表格的主码，为关于公司信息表格的`companyId`的外码
* `departmentId`: 部门编号，由数据库维护并每个公司直接按顺序从1开始生成；数据类型为无符号整数，与`companyId`共同形成该表格的主码
* `departmentName`: 部门名称，通过在给定部门名称中随机采样生成；数据类型为可变长字符串

### 招聘者信息表格
* `HRId`: 数据库维护的招聘者编号，同时也是登录的用户名，直接按顺序从1开始生成；数据类型为无符号整数，为该表格主码
* `HRName`: 招聘者姓名，由`fake.name()`生成；数据类型为可变长字符串
* `companyId`: 以岗位信息表格中的公司编号为外码生成；数据类型为无符号整数，要求非空
* `departmentId`: 以岗位信息表格中的部门编号为外码生成；数据类型为无符号整数，要求非空
* `password`: 招聘者密码，使用大小写字母和数字随机生成；数据类型为可变长字符串，要求非空
* `token`: 用户对应的验证token信息，使用大小写字母和数字随机生成的12位字符串；数据类型为可变长字符串，要求非空且两两不同

### 岗位信息表格
* `postId`: 岗位编号，由数据库维护并直接按顺序从1开始生成；数据类型为无符号整数，要求非空，为该表格主码
* `postName`: 岗位名称，根据部门名称随机生成；数据类型为可变长字符串，要求非空
* `degreeReq`: 学历要求，在本硕博中随机采样获得；数据类型为可变长字符串
* `workYearReq`: 工作经验要求，在整数中随机采样获得；数据类型为无符号整数，要求非空
* `onSiteDayReq`: 一周到岗天数，在1-7的整数中随机采样获得；数据类型为无符号整数，要求非空
* `city`: 城市，通过`fake.city`函数生成；数据类型为可变长字符串，要求非空
* `openDate`: 开放时间，由`faker.date_time_between`函数随机生成；数据类型为日期类型
* `endDate`: 投递截止时间，由`faker.date_time_between_dates`函数随机生成；数据类型为日期类型
* `recruitNum`: 招聘人数，在整数中随机采样获得；数据类型为无符号整数，要求非空
* `salary`: 工资，在整数中随机采样获得；数据类型为无符号整数，要求非空
* `companyId`: 公司编号，在招聘者`HRId`、`companyId`和`departmentId`的组合中随机采样；数据类型为无符号整数，要求非空，和`HRId`、`departmentId`组成关于招聘者信息表格的外码
* `departmentId`: 部门编号，在招聘者`HRId`、`companyId`和`departmentId`的组合中随机采样；数据类型为无符号整数，要求非空，和`HRId`、`companyId`组成关于招聘者信息表格的外码
* `workStyle`: 办公风格，在线下和远程中随机采样获得；数据类型为可变长字符串，要求非空
* `workType`: 工作类型，在实习和正式中随机采样获得；数据类型为可变长字符串，要求非空
* `HRId`: 招聘者编号，在招聘者`HRId`、`companyId`和`departmentId`的组合中随机采样；数据类型为无符号整数，要求非空，和`companyId`、`departmentId`组成关于招聘者信息表格的外码
* `description`: 岗位描述，由chatGPT API随机生成相关文本；数据类型为可变长字符串 
* `responsibility`: 岗位要求，由chatGPT API随机生成相关文本；数据类型为可变长字符串

### 项目信息表格
* `projectId`: 项目编号，由数据库维护并直接按顺序从1开始生成，数据类型为无符号整数，为该表格主码
* `projectName`: 项目名称，由后台代码词汇库随机组合生成，数据类型为可变长字符串，要求非空
* `startDate`: 项目开始日期，由`faker.date_time_between`函数随机生成，数据类型为日期类型
* `endDate`: 项目结束日期，由`faker.date_time_between_dates`函数随机生成，数据类型为日期类型
* `projectAchievement`: 项目业绩，由`random`随机数生成0-100，数据类型为无符号整数
* `participant`: 项目参与人，由应聘者`candId`中随机选取，数据类型为可变长字符串，要求非空，为关于应聘者表格的`candId`的外码
* `role`: 项目参与角色，由“负责人”、“参与人”随机枚举选取，数据类型为可变长字符串，要求非空
* `description`: 项目描述，由chatGPT API随机生成相关文本，数据类型为可变长字符串 

### 管理员信息表格
* `adminID`: 管理员账号，由管理员自行设定，简单起见虚拟设定为admin1，数据类型为可变长字符串，为当前表主码
* `adminPw`: 管理员密码，简单起见虚拟设定为三位整数123，数据类型为可变长字符串，要求非空
* `adminName`: 管理员姓名，由管理员自行设定，要求非空
* `adminToken`:  管理员对应的验证token信息，使用大小写字母和数字随机生成的6位字符串；数据类型为可变长字符串，要求非空且两两不同

## 系统实现

### 登录
![](https://notes.sjtu.edu.cn/uploads/upload_3277801aa87aa6a52443c8bc4b0be95f.png)

* `page/login.jsx`通过Ant Design的`Form`组件支持登录的表单提交，要求输入用户名和密码；通过`Radio`组件选择以应聘者、招聘者或管理员身份登录，或以应聘者或招聘者的身份注册（注册的实现请见后文）

（1）应聘者
* `page/login.jsx`中选择“应聘者”并点击登录按钮，则调用`service/login.js`中的`login`函数将参数发给后端，如果登录成功，则保存`token`，并跳转到应聘者的“岗位查找”页面
* `service/login.js`中的`login`将参数发给后端，并接收后端返回的修改成功与否的信息
* `controller/AuthController.java`中的`login`函数接收前端的参数，根据应聘者身份调用`service/AuthService.java`中的`getCandidateToken`函数来获取应聘者对应的`token`
* `service/AuthService.java`中的`getCandidateToken`调用`dao/CandidateDao.java`，检查是否有对应的用户名（身份证号）、密码组合，如果有，则返回`token`和登录成功的信息

（2）招聘者
* `page/login.jsx`中选择“招聘者”并点击登录按钮，则调用`service/login.js`中的`login`函数将参数发给后端，如果登录成功，则保存`token`，并跳转到招聘者的“投递审核”页面
* `service/login.js`中的`login`将参数发给后端，并接收后端返回的修改成功与否的信息
* `controller/AuthController.java`中的`login`函数接收前端的参数，根据招聘者身份调用`service/AuthService.java`中的`getHRToken`函数来获取招聘者对应的`token`
* `service/AuthService.java`中的`getHRToken`调用`dao/HRDao.java`，检查是否有对应的用户名（HR编号）、密码组合，如果有，则返回`token`和登录成功的信息

（3）管理员
* `page/login.jsx`中选择“管理员”并点击登录按钮，则调用`service/login.js`中的`login`函数将参数发给后端，如果登录成功，则保存`token`，并跳转到“管理员主页面”
* `service/login.js`中的`login`将参数发给后端，并接收后端返回的修改成功与否的信息
* `controller/AuthController.java`中的`login`函数接收前端的参数，根据管理员身份调用`service/AuthService.java`中的`getAdminToken`函数来获取管理员对应的`token`
* `service/AuthService.java`中的`getAdminToken`调用`dao/AdminDao.java`，检查是否有对应的用户名（管理员编号）、密码组合，如果有，则返回`token`和登录成功的信息


### 页面鉴权

在登录后，每个页面渲染时都需要通过`token`检查是否拥有权限

* `components/layout.jsx`中的`PrivateLayout`接收应聘者、招聘者或管理员作为鉴权类型的参数，在初始渲染时调用`service/user.js`中的`getMe`函数，若鉴权成功，则可以正常渲染页面，否则跳转回登录页面，需要重新登录
* `service/user.js`中的`getMe`调用`service/common.js`中的`post`
* `service/common.js`中的`post`将对应身份的`token`存入请求的`header`，将参数发给后端，并接收后端返回的鉴权成功与否的信息

（1）应聘者
* `controller/AuthController.java`中的`auth`函数接收前端的参数，根据应聘者身份调用`service/AuthService.java`中的`getCandIdByHeader`函数来获取应聘者对应的身份证号
* `service/AuthService.java`中的`getCandIdByHeader`调用`dao/CandidateDao.java`，检查是否有对应的`token`，如果有，则返回对应应聘者的身份证号

（2）招聘者
* `controller/AuthController.java`中的`auth`函数接收前端的参数，根据招聘者身份调用`service/AuthService.java`中的`getHRIdByHeader`函数来获取招聘者对应的编号
* `service/AuthService.java`中的`getHRIdByHeader`调用`dao/HRDao.java`，检查是否有对应的`token`，如果有，则返回对应招聘者的编号

（3）管理员
* `controller/AuthController.java`中的`auth`函数接收前端的参数，根据管理员身份调用`service/AuthService.java`中的`getAdminIdByHeader`函数来获取管理员对应的编号
* `service/AuthService.java`中的`getAdminIdByHeader`调用`dao/AdminDao.java`，检查是否有对应的`token`，如果有，则返回对应管理员的编号



### 应聘者视角
1. 注册
![](https://notes.sjtu.edu.cn/uploads/upload_cc983ed2464860932cb9d047ec99100a.png)

（1）填写账号信息
* `components/candidateRegister_form.jsx`通过Ant Design的`Form`组件支持表单提交，要求输入姓名、身份证号、两遍相同的密码
* `page/candidate_register.jsx`渲染`components/candidateRegister_form.jsx`

（2）注册按钮
* `components/candidateDeleteAccount_form.jsx`中点击注册按钮，则调用`service/candidate.js`中的`candidateRegister`函数将参数发给后端，如果注册成功，则跳转到“登录”页面
* `service/candidate.js`中的`candidateRegister`将参数发给后端，并接收后端返回的注册成功与否的信息
* `controller/CandidateController.java`中的`candidateRegister`函数接收前端的参数，调用`service/CandidateService.java`中的`register`函数来注册新的应聘者账号
* `service/CandidateService.java`中的`register`调用`dao/CandidateDao.java`，先检查是否该用户已存在，如果不存在，则为该用户生成一个`token`，然后保存账号信息


2. 顶部布局
![](https://notes.sjtu.edu.cn/uploads/upload_9b81f393b391310e502dc8b65eeba3ce.png)

![](https://notes.sjtu.edu.cn/uploads/upload_feeb5ddd51739085845a123338a3bde7.png)

* 展示网站的logo
* 通过Ant Design的`Menu`组件支持页面间的跳转，点击“岗位查找”，则跳转到“岗位查找”页面；点击“公司查找”，则跳转到“公司查找”页面；点击“投递列表-邀请”，则跳转到“邀请列表”页面；点击“投递列表-流程中”，则跳转到“已投递列表”页面；点击“投递列表-流程终止”，则跳转到“流程已终止列表”页面
* `components/candidate_header.jsx`在初始渲染时调用`service/candidate.js`中的`searchCandidateUsername`；`service/candidate.js`中的`searchCandidateUsername`函数将请求发给后端，并接收后端返回的用户姓名；`controller/CandidateController.java`中的`getCandNameByCandToken`函数接收前端的参数，调用`service/CandidateService.java`中的`getCandNameByCandId`函数来获取当前应聘者的姓名
* 通过Ant Design的`Dropdown`和`Button`组件支持和用户相关的页面间的跳转，点击“个人中心”，则跳转到“个人简历展示”页面；点击“个人中心-退出”，则删除保存到本地的`token`，跳转到“登录”页面；点击“个人中心-修改密码”，则跳转到“修改密码”页面；点击“个人中心-注销”，则跳转到“注销”页面


3. 岗位查找
![](https://notes.sjtu.edu.cn/uploads/upload_795e87638ae608cb711dae5afe88dc26.png)

（1）获取所有岗位的城市
* 页面初始渲染时调用`service/post.js`中的`retPostCities`，获取所有岗位涉及的城市，作为城市`Select`组件的选项
* `service/post.js`中的`retPostCities`函数将请求发给后端，并接收后端返回的城市
* `controller/PostController.java`中的`getPostCities`接收前端的请求，调用`service/PostService.java`中的`getDistinctPostCities`函数，其中再调用`dao/PostDao.java`中的`getDistinctPostCities`函数，最后调用`repository`层
* 在`repository/PostRepository.java`中，用SQL语句`SELECT DISTINCT p.city FROM Post p`实现`findDistinctCity`来找到符合要求的城市列表

（2）岗位搜索
* `components/post_list.jsx`和`components/post_card.jsx`通过Ant Design的`List`和`Card`组件展示岗位，并通过`Pagination`支持分页，点击卡片会跳转到对应岗位的“岗位详情”页面
* `page/search_post.jsx`中监听页号、岗位名搜索、城市选择、实习/正式选择、线下/远程选择的变化，调用`service/post.js`中的`searchPosts`
* `service/post.js`中的`searchPosts`函数将参数发给后端，并接收后端返回的岗位信息
* `controller/PostController.java`中的`searchPosts`函数接收前端的参数，调用`service/PostService.java`中的对应函数来筛选岗位，并做交集处理
* `service/PostService.java`调用`dao/PostDao.java`，其中再调用`repository/PostRepository.java`，实现了返回所有岗位、根据岗位名筛选、根据城市筛选、根据实习/正式筛选、根据线下/远程筛选


4. 公司查找
![](https://notes.sjtu.edu.cn/uploads/upload_e0af4d739a47a57852720765c88b2d68.png)

* `components/company_list.jsx`和`components/company_card.jsx`通过Ant Design的`List`和`Card`组件展示公司，并通过`Pagination`支持分页，点击卡片会跳转到对应公司的“公司详情”页面
* `page/search_company.jsx`中监听页号、公司名搜索、企业类型选择、融资阶段选择、公司规模选择的变化，调用`service/company.js`中的`searchCompany`
* `service/company.js`中的`searchCompany`函数将参数发给后端，并接收后端返回的公司信息
* `controller/CompanyController.java`中的`searchCompany`函数接收前端的参数，调用`service/CompanyService.java`中的对应函数来筛选岗位，并做交集处理
* `service/CompanyService.java`调用`dao/CompanyDao.java`，其中再调用`repository/CompanyRepository.java`，实现了返回所有公司、根据公司名筛选、根据企业类型筛选、根据融资阶段筛选、根据公司规模筛选


5. 岗位详情
![](https://notes.sjtu.edu.cn/uploads/upload_0302318c3fabc9ac607cfaeed5c7e657.png)

![](https://notes.sjtu.edu.cn/uploads/upload_04d2530eead60def83e6b79d223b6d36.png)

![](https://notes.sjtu.edu.cn/uploads/upload_30b8755adf1a57ee233fe70711cf2568.png)

![](https://notes.sjtu.edu.cn/uploads/upload_1fab8b33551b5ad01853d99828173474.png)

![](https://notes.sjtu.edu.cn/uploads/upload_75f410d89fba351ab89f2dab008bf73a.png)

![](https://notes.sjtu.edu.cn/uploads/upload_f5469eca1426adca8b496fc12073ecac.png)


（1）岗位信息
* `components/post_details.jsx`展示岗位的详细信息，根据不同的投递记录和岗位信息显示不同的按钮，并通过Ant Design的`Card`组件展示所属的公司，点击卡片会跳转到对应公司的“公司详情”页面
* `page/post.jsx`在初始渲染时调用`service/post.js`中的`getPostById`
* `service/post.js`中的`getPostById`函数将岗位编号作为参数发给后端，并接收后端返回的岗位信息
* `controller/PostController.java`中的`getPostDetailById`函数接收前端的参数，调用`service/PostService.java`中的`getPostDetailById`函数来获取对应岗位的详细信息
* `service/PostService.java`中的`getPostDetailById`调用`dao/PostDao.java`、`dao/CompanyDao.java`、`dao/DepartmentDao.java`和`dao/CandPostDao.java`，分别得到岗位信息、岗位所在的公司信息、岗位所在的部门、当前应聘者在该岗位的投递记录，并处理得到该岗位是否在投递时间内、是否已投递、流程是否终止、是否由招聘者发起邀请的信息、是否已录取

（2）投递按钮（未受招聘者邀请、未投递且在投递时间内）
* `components/post_details.jsx`中点击投递按钮，则调用`service/candPost.js`中的`deliverByPostId`函数将岗位编号作为参数发给后端，并且刷新网页，此时“投递按钮”应变为“结束流程按钮”
* `controller/CandPostController.java`中的`CandidateDeliverPost`函数接收前端的参数，调用`service/CandPostService.java`中的`insertCandPostByDelivery`函数来添加新的投递记录
* `service/CandPostService.java`中的`insertCandPostByDelivery`调用`dao/CandPostDao.java`来保存新的投递记录，将投递阶段`submissionStage`初始化为“简历”

（3）结束流程按钮（已投递且流程未终止）
* `components/post_details.jsx`中点击结束流程按钮，则调用`service/candPost.js`中的`endProcessByPostId`函数将岗位编号作为参数发给后端，并且刷新网页，此时“结束流程按钮”应变为“已结束流程”
* `controller/CandPostController.java`中的`CandidateEndProcess`函数接收前端的参数，调用`service/CandPostService.java`中的`terminateSubmissionStageByCandIdAndPostId`函数来更新投递记录
* `service/CandPostService.java`中的`terminateSubmissionStageByCandIdAndPostId`调用`dao/CandPostDao.java`来将对应投递记录的投递阶段`submissionStage`修改为“流程终止”

（4）接受邀请按钮（受招聘者邀请、未投递且在投递时间内）
* `components/post_details.jsx`中点击接受邀请按钮，则调用`service/candPost.js`中的`acceptInvitationByPostId`函数将岗位编号作为参数发给后端，并且刷新网页，此时“接受邀请按钮”应变为“结束流程按钮”
* `controller/CandPostController.java`中的`CandidateAcceptInvitation`函数接收前端的参数，调用`service/CandPostService.java`中的`acceptInvitationByCandIdAndPostId`函数来更新投递记录
* `service/CandPostService.java`中的`acceptInvitationByCandIdAndPostId`调用`dao/CandPostDao.java`来将对应投递记录的投递阶段`submissionStage`修改为“简历”，投递时间`submissionDate`修改为当前时间

（5）拒绝邀请按钮（受招聘者邀请、未投递且在投递时间内）
* `components/post_details.jsx`中点击拒绝邀请按钮，则调用`service/candPost.js`中的`refuseInvitationByPostId`函数将岗位编号作为参数发给后端，并且刷新网页，此时“拒绝邀请按钮”应变为“投递按钮”
* `controller/CandPostController.java`中的`CandidateRefuseInvitation`函数接收前端的参数，调用`service/CandPostService.java`中的`refuseInvitationByCandIdAndPostId`函数来删除对应投递记录

（6）已结束流程（流程已终止）

（7）岗位未开放（不在投递时间内且未投递）

（8）已录取（已投递且已录取）


6. 公司详情
![](https://notes.sjtu.edu.cn/uploads/upload_7e9bbf1dc4c08c16129d0bb271924f5d.png)

* `components/company_details.jsx`展示公司的详细信息
* `components/post_list.jsx`通过Ant Design的`List`和`Card`组件展示当前选择的部门的岗位
* `page/company.jsx`在初始渲染时调用`service/company.js`中的`getCompanyById`，并监听用户在`Menu`组件中选择的部门的变化，渲染对应部门的岗位列表
* `service/company.js`中的`getCompanyById`函数将公司编号作为参数发给后端，并接收后端返回的公司信息
* `controller/CompanyController.java`中的`getCompanyDetailById`函数接收前端的参数，调用`service/CostService.java`中的`getCompanyDetailById`函数来获取对应公司的详细信息
* `service/CostService.java`中的`getCompanyDetailById`先调用`dao/CompanyDao.java`获取公司信息；再调用`dao/DepartmentDao.java`，通过公司编号获得该公司的所有部门；然后调用`dao/PostDao.java`，为该公司的每个部门分别找到对应的岗位列表


7. 邀请列表
![](https://notes.sjtu.edu.cn/uploads/upload_236923816981d4eb9c8df386c393eb7e.png)

（1）受邀岗位
* `components/invitedPost_list.jsx`和`components/invitedPost_card.jsx`通过Ant Design的`List`和`Card`组件展示受邀岗位，根据不同的岗位信息显示不同的按钮，并通过`Pagination`支持分页，点击卡片的标题部分会跳转到对应岗位的“岗位详情”页面
* `page/candidate_invited.jsx`中监听页号的变化，调用`service/candPost.js`中的`searchInvitedPosts`
* `service/candPost.js`中的`searchInvitedPosts`函数将请求发给后端，并接收后端返回的岗位信息
* `controller/CandPostController.java`中的`getInvitedCandPostForCandidate`函数接收前端的请求，调用`service/CandPostService.java`中的`getCandPostByCandIdAndSubmissionStage`函数获取该应聘者处在“邀请”阶段的岗位及相关信息
* `service/CandPostService.java`中的`getCandPostByCandIdAndSubmissionStage`函数调用`dao/CandPostDao.java`、`dao/CompanyDao.java`和`dao/PostDao.java`，分别得到在“邀请”阶段的岗位投递信息、岗位所在的公司信息、岗位信息，并处理得到该岗位是否在投递时间内

（2）岗位未开放（受邀请但不在投递时间内）

（3）接受邀请按钮（受邀请且在投递时间内）
* `components/invitedPost_card.jsx`中点击接受邀请按钮，则调用`service/candPost.js`中的`acceptInvitationByPostId`函数将岗位编号作为参数发给后端，并且刷新网页，此时该岗位的投递阶段应变为“简历”，出现在“已投递列表”页面，不出现在“邀请列表”页面
* 后续过程与“岗位详情”页面的“接受邀请按钮”相同

（4）拒绝邀请按钮（受邀请且在投递时间内）
* `components/invitedPost_card.jsx`中点击拒绝邀请按钮，则调用`service/candPost.js`中的`refuseInvitationByPostId`函数将岗位编号作为参数发给后端，并且刷新网页，此时对应投递记录被删除，岗位不出现在“邀请列表”页面
* 后续过程与“岗位详情”页面的“拒绝邀请按钮”相同


8. 已投递列表
![](https://notes.sjtu.edu.cn/uploads/upload_e152ad0100e6946f31273f5bdc1f1820.png)

（1）已投递岗位
* `components/deliveredEndedAdmittedPost_list.jsx`和`components/deliveredPost_card.jsx`通过Ant Design的`List`和`Card`组件展示已投递岗位，显示“结束流程按钮”，并通过`Pagination`支持分页，点击卡片的标题部分会跳转到对应岗位的“岗位详情”页面
* `page/candidate_delivered.jsx`中监听页号的变化，调用`service/candPost.js`中的`searchDeliveredEndedAdmittedPosts`，通过`status`表明要查找的是已投递的岗位
* `service/candPost.js`中的`searchDeliveredEndedAdmittedPosts`函数将参数发给后端，并接收后端返回的岗位信息
* `controller/CandPostController.java`中的`getDeliveredCandPostForCandidate`函数接收前端的参数，调用`service/CandPostService.java`中的`getDeliveredCandPostDetailByCandId`函数获取该应聘者已投递的岗位及相关信息
* `service/CandPostService.java`中的`getDeliveredCandPostDetailByCandId`函数调用`dao/CandPostDao.java`、`dao/CompanyDao.java`和`dao/PostDao.java`，分别得到岗位投递信息、岗位所在的公司信息和岗位信息

（2）结束流程按钮
* `components/deliveredPost_card.jsx`中点击结束流程按钮，则调用`service/candPost.js`中的`endProcessByPostId`函数将岗位编号作为参数发给后端，并且刷新网页，此时该岗位的投递阶段应变为“流程终止”，出现在“流程已终止列表”页面，不出现在“已投递列表”页面
* 后续过程与“岗位详情”页面的“结束流程按钮”相同


9. 流程已终止列表
![](https://notes.sjtu.edu.cn/uploads/upload_6d6f4e660cd336f628fca01bed582a63.png)

* `components/deliveredEndedAdmittedPost_list.jsx`和`components/endedPost_card.jsx`通过Ant Design的`List`和`Card`组件展示流程已终止的岗位，并通过`Pagination`支持分页，点击卡片的标题部分会跳转到对应岗位的“岗位详情”页面
* `page/candidate_ended.jsx`中监听页号的变化，调用`service/candPost.js`中的`searchDeliveredEndedAdmittedPosts`，通过`status`表明要查找的是流程已终止的岗位
* `service/candPost.js`中的`searchDeliveredEndedAdmittedPosts`函数将参数发给后端，并接收后端返回的岗位信息
* `controller/CandPostController.java`中的`getEndedCandPostForCandidate`函数接收前端的参数，调用`service/CandPostService.java`中的`getCandPostByCandIdAndSubmissionStage`函数获取该应聘者处在“流程终止”阶段的岗位及相关信息
* `service/CandPostService.java`中的`getCandPostByCandIdAndSubmissionStage`函数调用`dao/CandPostDao.java`、`dao/CompanyDao.java`和`dao/PostDao.java`，分别得到在“流程终止”阶段的岗位投递信息、岗位所在的公司信息、岗位信息


10. 已录取列表
![](https://notes.sjtu.edu.cn/uploads/upload_ba73c875513964fd02c9b16a1c2bcaa6.png)

* `components/deliveredEndedAdmittedPost_list.jsx`和`components/admittedPost_card.jsx`通过Ant Design的`List`和`Card`组件展示已录取的岗位，并通过`Pagination`支持分页，点击卡片的标题部分会跳转到对应岗位的“岗位详情”页面
* `page/candidate_admitted.jsx`中监听页号的变化，调用`service/candPost.js`中的`searchDeliveredEndedAdmittedPosts`，通过`status`表明要查找的是已录取的岗位
* `service/candPost.js`中的`searchDeliveredEndedAdmittedPosts`函数将参数发给后端，并接收后端返回的岗位信息
* `controller/CandPostController.java`中的`getAdmittedCandPostForCandidate`函数接收前端的参数，调用`service/CandPostService.java`中的`getCandPostByCandIdAndSubmissionStage`函数获取该应聘者处在“录取”阶段的岗位及相关信息
* `service/CandPostService.java`中的`getCandPostByCandIdAndSubmissionStage`函数调用`dao/CandPostDao.java`、`dao/CompanyDao.java`和`dao/PostDao.java`，分别得到在“录取”阶段的岗位投递信息、岗位所在的公司信息、岗位信息

11. 个人简历展示
![](https://notes.sjtu.edu.cn/uploads/upload_c1530818d0928efd7b84dc04f7739b02.png)

（1）个人简历
* `components/candidate_description.jsx`通过Ant Design的`Descriptions`组件展示应聘者的基础信息和其所有的项目信息
* `page/candPersonalCenter.jsx`在初始渲染时调用`service/candidate.js`中的`searchCandidateInfo`，并显示“编辑”按钮
* `service/candidate.js`中的`searchCandidateInfo`函数将请求发给后端，并接收后端返回的应聘者基础信息和项目信息
* `controller/CandidateController.java`中的`getCandInfoByCandToken`函数接收前端的参数，调用`service/CandidateService.java`中的`getCandInfoByCandId`函数来获取对应应聘者的简历
* `service/CandidateService.java`中的`getCandInfoByCandId`调用`dao/CandidateDao.java`和`dao/ProjectDao.java`，分别得到应聘者的基础信息和应聘者的所有项目

（2）编辑按钮
* 跳转到“个人简历修改”页面


12. 个人简历修改
![](https://notes.sjtu.edu.cn/uploads/upload_94647b14acc155a01ea39212dbaba827.png)

（1）简历显示
* `components/candidateBasicInfo_form.jsx`和`components/project_form.jsx`通过Ant Design的`Form`组件分别显示应聘者的基本信息和项目信息，并支持在一定限制条件下的修改
* `page/candEditPersonalCenter.jsx`在初始渲染时调用`service/candidate.js`中的`searchCandidateInfo`，并显示“编辑”按钮
* `service/candidate.js`中的`searchCandidateInfo`函数将请求发给后端，并接收后端返回的应聘者基础信息和项目信息
* 后续过程与“个人简历展示”页面的“个人简历”相同

（2）删除按钮（每个项目都支持单独删除）
* 将删除的项目编号添加到维护的列表中，并将对应项目从渲染的项目中去除，但是不从数据库中删除

（3）添加项目按钮
* 初始化一个项目，并将其添加到需要渲染的项目中，但是不添加到数据库中

（4）保存按钮
* `components/candidateBasicInfo_form.jsx`中点击保存按钮，则将基础信息和项目格式化，并将删除的项目编号列表添加到要传递的参数中，调用`service/candidate.js`中的`candidateEdit`函数将参数发给后端，如果保存成功，则跳转到“个人简历展示”页面，可以发现修改已经生效
* `service/candidate.js`中的`candidateEdit`将参数发给后端，并接收后端返回的修改成功与否的信息
* `controller/CandidateController.java`中的`editCandidateInfo`函数接收前端的参数，调用`service/CandidateService.java`中的`editCandidateInfo`函数来修改对应应聘者的简历
* `service/CandidateService.java`中的`editCandidateInfo`调用`dao/CandidateDao.java`保存修改后的应聘者基础信息，调用`dao/ProjectDao.java`保存修改后的或新添加的项目信息，并删除对应的项目


13. 修改密码
![](https://notes.sjtu.edu.cn/uploads/upload_4445e17dd940e0d6b4df2d5761185601.png)

（1）填写修改密码
* `components/candidateChangePassword_form.jsx`通过Ant Design的`Form`组件支持修改密码的表单提交，要求输入原密码，再输入两遍相同的新密码
* `page/candidate_changePassword.jsx`渲染`components/candidateChangePassword_form.jsx`

（2）确认按钮
* `components/candidateChangePassword_form.jsx`中点击确认按钮，则调用`service/candidate.js`中的`candidateChangePassword`函数将参数发给后端，如果修改成功，则跳转到“登录”页面，需要用修改后的新密码重新登录
* `service/candidate.js`中的`candidateChangePassword`将参数发给后端，并接收后端返回的修改成功与否的信息
* `controller/CandidateController.java`中的`changeCandidatePassword`函数接收前端的参数，调用`service/CandidateService.java`中的`changePassword`函数来修改对应应聘者的登录密码
* `service/CandidateService.java`中的`changePassword`调用`dao/CandidateDao.java`，先检查原密码是否正确，如果正确，则将密码修改为新密码，并返回修改成功的信息


14. 注销
![](https://notes.sjtu.edu.cn/uploads/upload_a41c4df4a7bb1be00f0c89fe516672a3.png)

为防止不慎删除账号，要求注销前输入身份证号和密码

（1）填写身份证号和密码
* `components/candidateDeleteAccount_form.jsx`通过Ant Design的`Form`组件支持表单提交，要求输入身份证号和密码
* `page/candidate_deleteAccount.jsx`渲染`components/candidateDeleteAccount_form.jsx`

（2）确认按钮
* `components/candidateDeleteAccount_form.jsx`中点击确认按钮，则调用`service/candidate.js`中的`candidateDeleteAccount`函数将参数发给后端，如果注销成功，则跳转到“登录”页面，该账号不存在
* `service/candidate.js`中的`candidateChangePassword`将参数发给后端，并接收后端返回的注销成功与否的信息
* `controller/CandidateController.java`中的`deleteCandidateAccount`函数接收前端的参数，调用`service/CandidateService.java`中的`deleteAccount`函数来修改对应应聘者的登录密码
* `service/CandidateService.java`中的`deleteAccount`调用`dao/CandidateDao.java`，先检查身份证号和密码是否正确，如果正确，则删除该应聘者的账号、项目信息、投递信息，并返回注销成功的信息


### 招聘者视角
1. 注册

* 页面组织架构位于`page/hr_register.jsx`中，具体表格实现在`components/hr_register_form.jsx`中
* 第一个界面用于录入个人信息，对应表格文件中的`InitialForm`
![](https://notes.sjtu.edu.cn/uploads/upload_bba2aad904621b9d5e4cae57729fcc00.png)
* 若根据第一个初始表格得到的公司名不在数据库中已注册的公司名中，则跳转该页面进行公司的注册，对应`CompanyRegisterForm`
![](https://notes.sjtu.edu.cn/uploads/upload_f17734f388a242b898f6bbe1a182b837.png)
* 若公司已经注册或者是完成了公司注册表格的填写后，则跳转该页面进行所属部门的填写，同时需要填写公司的Token，用于核实身份，对应`DepartmentForm`
![](https://notes.sjtu.edu.cn/uploads/upload_fb19fcedc8a0a34cb817331c96bf1981.png)
* 最后一个界面用于录入用户密码，对应`PasswordForm`表格
![](https://notes.sjtu.edu.cn/uploads/upload_2ddbb30fdbae5cfcfe6b1ccd742c86af.png)
* 在所有都填写完毕后则调用`service/hr_user.jsx`中的`HRRegister`函数，将注册数据传入后端
* 后端调用`controller/HRController.java`中的`HRregister`函数
* 若填写了公司注册表格，则调用`service/CompanyService.java`中的 `HRRegisterCompany`注册公司；若否则直接通过公司名获得对应的公司信息
* 接着，验证部门表格中传入的公司Token，若验证失败则直接返回错误，若正确则通过`service/DepartmentSertice.java`中的`HRRegisterDepartment`注册或直接返回对应的部门编号
* 最后通过`service/HRService.java`中的`HRRegister`函数注册HR信息，注册同时返回对应的HRId，即HR的用户名信息
* 前端接受到HR信息后弹出如下弹窗，并转入初始登录界面
![](https://notes.sjtu.edu.cn/uploads/upload_831fc024282d27d666c36654f5b06155.png)

2. 投递审核
![](https://notes.sjtu.edu.cn/uploads/upload_c95b748ad8e2a97a980826595f77f2dd.png)

(1) 信息展示部分
* `page/hrHomepage.jsx`进行页面组织，通过`components/cand_post_list.jsx`和`components/cand_post_card.jsx`进行展示，使用`Pagination`进行分页
* `page/hrHomepage.jsx`中监听页号、岗位名搜索、投递者姓名的变化，调用`searchCandPost`
* `service/candPost.js`中的`searchCandPost`函数将参数发给后端，并接收后端返回的投递信息
* `controller/HRController.java`中的`getCandPostforHR`函数接收前端的参数，调用对应函数来筛选符合要求的投递信息
* `service/PostService.java`和`service/CandPostService.java`分别调用dao层得到，返回的信息是投递信息、投递者信息和岗位信息的一个字典

（2） 环节推进按钮
* 按钮在`components/cand_post_card.jsx`中实现，使用函数`forwardStage`进行监听，并调用`forwardSubmissionStageByCandPostId`函数进行处理，该函数在`service/candPost.js`中实现
* 按钮点击后，后端的`contoller/CandPostController.java`中的`forwardSubmissionStage`函数被调用
* `service/CandPostService.java`中的`forwardSubmissionStageByCandIdAndPostId`函数根据id信息将所处状态进行推进
* 若已经推进到了录取阶段/环节被终止，则该按钮会被disabled

（3） 环节终止按钮
* 按钮在`components/cand_post_card.jsx`中实现，使用函数`terminateStage`进行监听，并调用`terminateSubmissionStageByCandPostId`函数进行处理，该函数在`service/candPost.js`中实现
* 按钮点击后，后端的`contoller/CandPostController.java`中的`terminateSubmissionStage`函数被调用
* `service/CandPostService.java`中的`terminateSubmissionStageByCandIdAndPostId`函数根据id信息将所处状态进行推进
* 若已经环节终止/已被录取，则该按钮会被disabled

（4）岗位详情跳转
* 若点击非按钮部分，即可跳转到界面4简历详情去进行查看

3. 投递者简历详情
![](https://notes.sjtu.edu.cn/uploads/upload_f7377511df08712b692b457e68edbfb3.png)

* `page/candPostDetail.jsx`进行页面组织，通过`components/candPost_detail.jsx`进行展示，使用`Steps`组件来展示所处的应聘阶段
* `service/candPost.js`中的`getCandPostById`函数用于获取所需要的所有展示信息
* `controller/HRController.java`中的`getCandPostDetail`函数来组织返回信息，返回的信息是投递信息、投递者信息和岗位信息的一个字典
* 本处按钮同投递审核界面上的按钮用同样的方法进行的实现

4. 岗位管理
![](https://notes.sjtu.edu.cn/uploads/upload_b541a36afdba7625cc1aa98a335349eb.png)

(1) 岗位展示
* `page/hr_manage_post.jsx`进行页面组织，通过`components/hr_post_list.jsx`和`components/hr_post_card.jsx`进行展示，使用`Pagination`进行分页
* `page/hrHomepage.jsx`中监听页号和岗位名搜索的变化，调用`getHRPosts`
* `service/hr_post_view.js`中的`getHRPosts`函数将参数发给后端，并接收后端返回的投递信息
* `controller/PostController.java`中的`HRsearchPosts`函数接收前端的参数，调用对应函数来筛选符合要求的投递信息
* `service/PostService.java`调用dao层得到符合搜索要求的岗位信息，对不同搜索标准做交集处理

(2) 增加岗位按钮
* 点击增加岗位按钮跳转至页面11去进行岗位信息的录入，由`create`函数监听

(3) 岗位详情跳转
* 点击岗位对应的卡片跳转至页面8，可查看和修改岗位信息


5. 岗位信息详情

![](https://notes.sjtu.edu.cn/uploads/upload_53afb6c7caa4ad3c62384d9a271a8611.png)

（1）岗位详情查看
* `page/hr_post_detail.jsx`进行页面组织，通过`components/hr_post_detail.jsx`进行展示
* `service/hr_post_view.js`中的`getHRPostById`函数用于获取所需要的所有展示信息
* `controller/PostController.java`中的`HRgetPostDetailById`函数来根据post ID获取对应的post的全部信息

（2）岗位编辑
* 点击编辑按钮即可跳转页面6进行岗位编辑，由`edit`函数监听

（3）岗位删除
* 由`deletePost`函数监听，点击后即调用`HRdeletePost`函数进入后端删除该岗位，删除后跳转到页面4，该函数的实现位于`service/hr_post_view.js`中
* 后端`controller/PostController.java`中的`deletePostById`函数被调用，通过`postService`中的函数进行岗位的删除

6. 岗位信息修改
![](https://notes.sjtu.edu.cn/uploads/upload_17f55b64f91eb00531bd765612ad0212.png)

* `page/hr_edit_post_detail_page.jsx`用于组织整个页面，具体接受信息的表格在`components/hr_edit_post_detail.jsx`中进行实现，使用的是Ant Design的`Form`组件
* 表格中的每一条信息都默认填写为数据库中存储的岗位信息，通过`getHRPostById`获得
* `onFinish`进行表格提交的监听，并通过`hrEditPost`提交到后端，该函数位于`service/hr_post_view.jsx`
* 后端`controller/PostController.java`中的`editPostDetail`函数被调用用于修改信息，通过`service/PostService`中的`editPost`提交到数据库
* 提交修改后跳转至页面5

7. 增加岗位

![](https://notes.sjtu.edu.cn/uploads/upload_56f24a7f60aa225f52b84809e0b27635.png)
* `page/hr_create_post.jsx`用于组织整个页面，具体接受信息的表格在`components/hr_create_post.jsx`中进行实现，使用的是Ant Design的`Form`组件
* 使用`onFinish`进行监听，并通过`hrCreatePost`提交到后端，该函数位于`service/hr_post_view.jsx`
* 后端`controller/PostController.java`中的`HRcreatePost`函数被调用用于修改信息，通过`service/PostService`中的`createPost`提交到数据库，提交的同时会被自动赋予一个岗位编号
* 提交后跳转至页面5

8. 应聘者邀请页面
![](https://notes.sjtu.edu.cn/uploads/upload_f762f0b9eb4db47721ad74fdfa781382.png)

（1）应聘者粗略信息展示
* `page/hr_find_candidate.jsx`进行页面组织，通过`components/hr_cand_list.jsx`和`components/hr_cand_card.jsx`进行展示
* `page/hr_find_candidate.jsx`中监听页号、学历要求、工作经验要求的变化，调用`getAllCandidatesAvailable`
* `service/hr_post_view.js`中的`getHRPostById`函数用于获取所需要的所有展示信息
* `service/hr_candidate_view.js`中的`getAllCandidatesAvailable`函数将参数发给后端，并接收后端返回的投递信息
* 该界面用于邀请没有应聘该HR负责岗位的用户，后端通过`controller/CandidateController.java`中的`getAllAvailableCandidates`函数用于获得这部分的招聘者
* `service/CandidateService.java`中的`getAllCandidatesAvailable`用于获得能够被邀请的用户，`getCandidatesByCandDegree`和`getCandidatesByCandWorkYearAfter`则分别调用dao层得到符合搜索要求的应聘者信息

（2） 邀请按钮
* 按钮在`components/hr_cand_card.jsx`中实现，使用函数`invite`进行监听，并调用`inviteByCandPostId`函数进行处理，该函数在`service/candPost.js`中实现
* 到按钮上悬浮会显示所有的可以拿来邀请的岗位信息，这些信息由`service/candPost.js`中的`retOpenPosts`获得
* `retOpenPosts`会调用后端`controller/PostController.java`中的`retOpenPosts`函数，该函数根据日期从数据库中获得岗位名称
* 按钮点击后，后端的`contoller/CandPostController.java`中的`HRInvite`函数被调用，调用`service/CandPostService.java`中的`insertCandPostByInvitation`函数根据id信息插入一条邀请信息
* 插入后页面会进行重新渲染

9. 个人信息查看
![](https://notes.sjtu.edu.cn/uploads/upload_fe85ac683a6c2df049b116061863ae51.png)

（1）个人信息展示
* 点击header的个人信息即跳转至该界面，主要用于显示该HR的姓名，所在公司和岗位
* 页面由`page/hr_user.jsx`进行展示，具体的内容在`components/hr_user_info.jsx`进行实现
* 页面内容的获取由`page/hr_user.jsx`中的`getHRUser`函数，通过调用`service/hr_user.js`函数中的`getHRInfo`来实现
* 前端的`getHRInfo`函数调用了`controller/HRController`中的`getHRInfo`函数获取HR的个人信息
* 由于数据库仅存取了对应的编号信息，在后端的`getHRInfo`中通过departmentService和companyService获取到了对应的公司名和部门名，并传递给前端

（2）个人信息修改
* 通过`components/hr_user_info.jsx`中的`handleEdit`函数监听按钮的点击，若点击则跳转至页面10

（3）登出按钮
* 通过`components/hr_user_info.jsx`中的`handleLogout`函数监听按钮的点击，若点击则跳转至登录界面

（4）账户注销按钮
* 通过`components/hr_user_info.jsx`中的`showModal`函数监听按钮的点击，若点击，则显示如下弹窗
* 若点击ok则通过`handleOk`函数调用`service/hr_user.js`中的`HRDeleteAccount`函数，从而调用`controller/HRController`中的`deleteHRAccount`函数，通过hrserivce删除该账户记录。数据库被设置为级联删除
* 完成后跳转到登录界面
![](https://notes.sjtu.edu.cn/uploads/upload_5c6180e902be7a29f87a7d2518e14ce6.png)

10. 个人信息修改
![](https://notes.sjtu.edu.cn/uploads/upload_b8bcda1501d40992246460afdb8d248e.png)

* 页面由`page/hr_edit_personal_info.jsx`进行展示，具体的内容在`components/hr_edit_personal_info.jsx`进行实现，使用的是Form来收集信息
* 页面的内容同样由`service/hr_user.js`函数中的`getHRInfo`来获得，作为默认值填充在表格中
* 使用`onFinish`进行监听，并通过`HR_EditPersonalInfo`传递到后端
* 后端调用`controller/HRController.java`中的`editPersonalInfo`函数，分别通过`hrService`修改hr姓名和`departmentService`中进行部门名称的修改
* 修改完毕后跳转回页面9

11. 公司信息修改

![](https://notes.sjtu.edu.cn/uploads/upload_e2e5d5a43565a72b6acd6a5f485a68ff.png)

* 点击个人中心侧边栏的公司信息维护即可跳转至该界面
* `page/HR_edit_company_page.jsx`用于组织整体页面架构，表格的实现位于`components/hr_edit_company.jsx`
* 表格中填充的默认值由`service/hr_user.js`的`getHRInfo`函数获得
* 本处需要额外的填入公司的修改token，该token由首位注册公司的HR给定，若验证错误则无法提交对于公司信息的修改
* 使用`onFinish`进行监听，并通过`HR_EditCompany`传递到后端
* 后端调用`controller/CompanyController.java`中的`editCompanyDetail`函数，调用`service/CompanyService.java`中的`editCompany`进行信息录入


12. 密码修改

![](https://notes.sjtu.edu.cn/uploads/upload_5adef7747fb66fae1a5099241b45c1f9.png)

* 点击个人中心侧边栏中的修改密码即可跳转该界面
* 由`page/HR_change_password_page.jsx`组织具体页面布局，表格的实现位于`components/hr_change_password.jsx`
* 表格的提交由`changePasswordOnFinish`函数进行监听，并调用`service/hr_user.jsx`中的`HRChangePassword`提交到后端
* 后端调用`controller/HRController.java`中的`changeHRPassword`函数进行密码的验证和修改
* 若原密码验证正确则进行密码的覆盖并正常返回；若原密码验证错误则返回密码错误信息，阻止覆盖


### 管理员视角
1. 侧边栏布局
![](https://notes.sjtu.edu.cn/uploads/upload_29937195774d9edb5c35ae138788ea7c.png)

（1）顶部Logo
* 代码包含在`page/admin_SidebarLayout.jsx`内，采用 `SidebarLayout`封装。包含侧边栏、Header中Logo图像和主体内容


（2）管理员头像及名称
* 代码包含在`page/admin_Sidebar.jsx`内，采用`Sidebar`封装
* 根据登录得到的token，通过`getAdminnameByToken()`得到管理员用户名，否则设定为默认值“未知管理员”
* 根据用户名，通过`md5`库生成hash值，并采用`Identicon`获取动态随机头像图


（3）索引跳转项
* 通过`getKeyFromPath`设定各链接页面对应索引值，并高亮当前页面所在选项，用`Menu`和`Item`渲染


（4）收展侧边栏
* 部分场景下希望全屏展示页面主内容而收起侧边栏，故需实现侧边栏的动态收起和展开
* 通过 `collapse` 记录收展情况，并在点击收展按钮时反转其值以实现收展侧边栏

2. 管理员主页面
![](https://notes.sjtu.edu.cn/uploads/upload_2da54987fdf13e124fa16207d2896099.png)

（1）核心指标监控
* 通过`pages/admin_Admin`中的Card封装展示总岗位数、总招聘者数、总HR数、进程中岗位数及数据获取日期
* 总岗位数、总招聘者数、总HR数、进程中岗位数均通过`fetchData`函数实时获得，其中包含`getPostNum`、`getCandidateNum`、`getHRNum`、`getpostInProgress`四个函数向后端通过对应的url发送请求获取数据
* 后端中`AdminController`用于响应前端请求、验证token权限、返回对应数据。其中总岗位数、总招聘者数、总HR数通过`count`指令实现、进程中岗位比例通过 进程中岗位数/总岗位数 得到，进程中岗位数的查询指令为：`SELECT COUNT(DISTINCT postId) FROM cand_post`
* 获取数据时间通过`date`库的`toLocaleDateString`函数得到

（2）岗位搜索与展示
* 岗位通过`getPosts`函数获得，传入搜索信息并以url形式向后端索取数据，并以`Card`组件封装展示响应数据
* 后端通过`PostController`中的`searchPosts`函数进行鉴权和筛选数据返回，采用在所有数据中`result.retainAll`的筛选方式获取对应数据


3. 岗位管理
![](https://notes.sjtu.edu.cn/uploads/upload_f8c9a38605448b20fbba1b9c6a8bf5f9.png)

（1）岗位搜索
* 岗位通过`admin_JobManagement.jsx`内的`getPosts`函数获得，传入搜索信息并以url形式向后端索取数据，并以`Table`组件封装展示部分主要响应数据，其中传入搜索条件包括城市、工作类型、工作方式、岗位名
* 城市通过`getPostCities`函数获得，传入后端得到所有岗位的城市
* 注意，由于岗位对应的公司设定为公司id的外码，故此处需要通过`getAllCompany`函数获取所有公司与外码对应关系并映射
* 后端通过`PostController`中的`searchPosts`函数进行鉴权和筛选数据返回，采用在所有数据中`result.retainAll`的筛选方式获取对应数据；同时通过`getPostCities`进行查询以返回所有城市：`SELECT DISTINCT p.city FROM Post p`

（2）岗位详细信息
* 岗位详细信息通过`expandedRowRender`函数进行定义，并实现缩略按钮以开合`getPosts`函数获得的详细信息

（3）岗位删除
* 岗位删除调用`handleDelete`函数跳出弹窗提示是否确认删除，确认后调用`AdmindeletePost`向后端以岗位主码发送删除请求，并更新前端岗位列表
* 后端以`deletePostById`接收请求，确认管理员权限并检查传入id是否有效且存在对应岗位后，调用服务层进行删除

4. 公司管理
![](https://notes.sjtu.edu.cn/uploads/upload_fd839c6aa5b20547a14f2e3b0f5d2a83.png)

（1）公司搜索
* 岗位通过`admin_CompanyManagement.jsx`内的`getCompanies`函数获得，传入搜索信息并以url形式向后端索取数据，并以`Table`组件封装展示部分主要响应数据，其中传入搜索条件包括公司名称、类型
* 其中筛选条件“类型”和“规模”为枚举类，由前端静态设定
* 后端通过`CompanyController`中的`searchCompanies`函数进行鉴权和筛选数据返回，采用在所有数据中`result.retainAll`的筛选方式获取对应数据

（2）公司详细信息
* 公司详细信息通过`expandedRowRender`函数进行定义，并实现缩略按钮以开合`getCompanies`函数获得的详细信息

（3）公司删除
* 公司删除调用`handleDelete`函数跳出弹窗提示是否确认删除，确认后调用`adminDeleteCompany`向后端以公司主码发送删除请求，并更新前端公司列表
* 后端以`deleteCompanyById`接收请求，确认管理员权限并检查传入id是否有效且存在对应公司后，调用服务层进行删除

5. 投递管理
![](https://notes.sjtu.edu.cn/uploads/upload_b3496a07a1d7316523913620b940969f.png)

（1）投递信息搜索
* 投递信息通过`admin_ResumeManagement.jsx`内的`getCompanies`函数获得，传入搜索信息并以url形式向后端索取数据，并以`Table`组件封装展示部分主要响应数据，其中传入搜索条件包括姓名、投递岗位
* 后端通过`HRController`中的`AdminsearchCandPost`函数进行鉴权和筛选数据返回。其中存在筛选条件时采用在所有数据中`result.retainAll`的筛选方式获取对应数据；同时，由于候选人和岗位在表格里以id形式存在，后端也需要将表格链接以返回详细信息

（2）投递信息分页载入
* 需要注意的是，当不存在筛选条件时，由于投递信息总数量太大，在每次页面刷新时重新全部载入无疑会大幅度影响相应性能，故此处与分页按钮一同采用分页载入的策略
* 前端需要传入`pageIndex`和`pageSize`后，由后端通过`getPagedCandPosts`进行分页查询以缩小一次返回数据数，提高响应速度。其中采用了一下搜索条件：`SELECT * FROM cand_post p LIMIT :startIndex, :pageSize`

（3）投递信息删除
* 投递信息删除需要调用`handleDelete`函数跳出弹窗提示是否确认删除，确认后调用`adminDeleteResume`向后端以公司主码发送删除请求，并更新前端公司列表
* 后端以`deleteCandPostById`接收请求，确认管理员权限并检查传入的投递者id和岗位id是否有效且存在对应投递信息后，调用服务层进行删除

6. 应聘者管理
![](https://notes.sjtu.edu.cn/uploads/upload_9b1166056e1c5733a37b9c44655006d7.png)

（1）应聘者搜索
* 应聘者信息通过`admin_CandidateManagement.jsx`内的`getCandidates`函数获得，传入搜索信息并以url形式向后端索取数据，并以`Table`组件封装展示部分主要响应数据，其中传入搜索条件包括性别、学校、专业、姓名
* 其中，应聘者学校和专业在前端通过`getMajors`和`getUniversities`函数确定并作为选项
* 后端通过`CandidateController`中的`searchCandidates`函数进行鉴权和筛选数据返回。其中存在筛选条件时采用在所有数据中`result.retainAll`的筛选方式获取对应数据
* 后端通过`getCandMajors`和`getCandUniversities`得到应聘者的所有专业与大学返回前端，其SQL代码为：`SELECT DISTINCT p.candMajor FROM Candidate p`和`SELECT DISTINCT p.candUniversity FROM Candidate p`

（2）应聘者详细信息
* 应聘者详细信息通过`expandedRowRender`函数进行定义，并实现缩略按钮以开合展示`getCandidates`函数获得的详细信息

（3）应聘者密码隐藏显示
* 为保证屏幕保密性，应聘者密码通过Tooltip封装，只有眼睛符号时才转化为显示

（4）应聘者删除
* 应聘者删除需要调用`handleDelete`函数跳出弹窗提示是否确认删除，确认后调用`adminDeleteCandidate`向后端以应聘者主码发送删除请求，并更新前端应聘者列表
* 后端以`deleteCandidateById`接收请求，确认管理员权限并检查传入的应聘者id是否有效且存在对应应聘者信息后，调用服务层进行删除

7. HR管理
![](https://notes.sjtu.edu.cn/uploads/upload_bdcb6d20ac38664531db6561bd6d1dca.png)

（1）HR搜索
* HR信息通过`admin_HRManagement.jsx`内的`getHRs`函数获得，传入搜索信息并以url形式向后端索取数据，并以`Table`组件封装展示部分主要响应数据，其中传入搜索条件包括姓名
* 后端通过`HRController`中的`searchHRs`函数进行鉴权和筛选数据返回。其中存在筛选条件时采用在所有数据中`result.retainAll`的筛选方式获取对应数据

（2）HR详细信息
* HR详细信息通过`expandedRowRender`函数进行定义，并实现缩略按钮以开合展示`getHRs`函数获得的详细信息

（3）HR密码隐藏显示
* 为保证屏幕保密性，HR密码通过Tooltip封装，只有眼睛符号时才转化为显示

（4）HR删除
* HR删除需要调用`handleDelete`函数跳出弹窗提示是否确认删除，确认后调用`adminDeleteHR`向后端以HR主码发送删除请求，并更新前端HR列表
* 后端以`deleteHRById`接收请求，确认管理员权限并检查传入的HRid是否有效且存在对应HR信息后，调用服务层进行删除


8. 统计分析
![](https://notes.sjtu.edu.cn/uploads/upload_71795f9e4a8815d7772f5c08a179055f.png)

（1）核心指标面板
* 核心指标包含总岗位数、总应聘数、总HR数、总公司数，分别通过前端的`post/admin_Statistics.jsx`中的`getPostNum()`、`getCandidateNum()`、`getHRNum()`、`getCompanyNum()`函数传递url获得，并通过`renderChange`函数计算同比昨日上升或下降
* 对应数据封装在Card内并通过`css/Statistics.css`调整其格式
* 后端分别通过`AdminController`中的`getPostNum`、`getCandidateNum`、`getHRNum`、`getCompanyNum`计数返回

（2）省市岗位供应热力图
* 省市岗位供应热力图通过`PostMap`函数封装，通过给定的各个城市的岗位招聘数，将其映射到省份并作出热力图，其中前端通过`getCityDistribution`函数向后端发送数据请求
* 后端通过`AdminController`中的`getCityDistribution`函数返回各个城市招聘岗位数，其SQL语言指令如下：`SELECT p.city, SUM(p.recruitNum) as value FROM Post p GROUP BY p.city`


（3）岗位投递热度排行榜
* 岗位热度排行榜通过`JobRankingList`函数封装，通过给定的最火的对应个数的岗位展示其进度条及详细信息，其中前端通过`getHotJob`函数向后端发送数据请求
* 后端通过`AdminController`中的`getHotJob`函数返回投递人数最多的指定个数岗位并返回详细信息，其SQL语言指令如下：
```
@Query(value = "SELECT p.postId, COUNT(p.postId) FROM cand_post p GROUP BY p.postId 
        ORDER BY COUNT(p.postId) DESC LIMIT :rank ", nativeQuery = true)
```

（4）岗位工资供需分布图
* 岗位工资供需分布图通过`SalaryGraph`函数封装，包含两类条形图和折线图，通过应聘者薪资需求数和岗位提供薪资岗位数得到，其中前端通过`getHotJob`函数向后端发送数据请求`getSalaryAndDegreeNum`、`getSalaryDistribution`发送请求获取数据
* 后端通过`AdminController`中的`getSalaryAndDegreeNum`函数返回岗位数关于学历和薪资的聚类，其SQL语言指令如下：
```
@Query(value = "SELECT " +
            "CASE " +
            "WHEN salary < 10 THEN '<10' " +
            "WHEN salary BETWEEN 11 AND 20 THEN '11-20' " +
            "WHEN salary BETWEEN 21 AND 30 THEN '21-30' " +
            "WHEN salary BETWEEN 31 AND 40 THEN '31-40' " +
            "WHEN salary BETWEEN 41 AND 50 THEN '41-50' " +
            "WHEN salary BETWEEN 51 AND 60 THEN '51-60' " +
            "ELSE '>61' END AS name, " +
            "SUM(recruitNum) AS value, " +
            "degreeReq AS type " +
            "FROM post " +
            "GROUP BY name, type", nativeQuery = true)
    List<Object[]> countPostsBySalaryAndDegree();
```

* 后端通过`getSalaryDistribution`返回供需岗位数关于薪资的聚类，其SQL语言指令如下：
```
@Query("SELECT CASE " +
            "WHEN c.candExpectedSalary < 10 THEN '<10' " +
            "WHEN c.candExpectedSalary BETWEEN 11 AND 20 THEN '11-20' " +
            "WHEN c.candExpectedSalary BETWEEN 21 AND 30 THEN '21-30' " +
            "WHEN c.candExpectedSalary BETWEEN 31 AND 40 THEN '31-40' " +
            "WHEN c.candExpectedSalary BETWEEN 41 AND 50 THEN '41-50' " +
            "WHEN c.candExpectedSalary BETWEEN 51 AND 60 THEN '51-60' " +
            "ELSE '>61' END AS name, COUNT(c) AS value, 'required' AS type " +
            "FROM Candidate c " +
            "GROUP BY name")
List<Object[]> findSalaryExpectationsByCandidate();

@Query("SELECT CASE " +
            "WHEN p.salary < 10 THEN '<10' " +
            "WHEN p.salary BETWEEN 11 AND 20 THEN '11-20' " +
            "WHEN p.salary BETWEEN 21 AND 30 THEN '21-30' " +
            "WHEN p.salary BETWEEN 31 AND 40 THEN '31-40' " +
            "WHEN p.salary BETWEEN 41 AND 50 THEN '41-50' " +
            "WHEN p.salary BETWEEN 51 AND 60 THEN '51-60' " +
            "ELSE '>61' END AS name, SUM(p.recruitNum) AS value, 'given' AS type " +
            "FROM Post p " +
            "GROUP BY name")
    List<Object[]> findSalaryDistributionByPost();
```

（5）应聘者年龄段扇形图
* 应聘者年龄段扇形图通过`AgeGraph`函数封装，通过给定的应聘者对应年龄段数量展示其进度条及详细信息，其中前端通过`getCandidateAgeDistribution`向后端发送数据请求
* 后端通过`AdminController`中的`getCandidateAgeDistribution`函数返回各个年龄段的应聘者人数，其SQL语言指令如下：
```
@Query("SELECT " +
            "CASE " +
            "WHEN c.candAge < 20 THEN '<20岁' " +
            "WHEN c.candAge BETWEEN 21 AND 30 THEN '21-30岁' " +
            "WHEN c.candAge BETWEEN 31 AND 40 THEN '31-40岁' " +
            "WHEN c.candAge BETWEEN 41 AND 50 THEN '41-50岁' " +
            "ELSE '>51岁' END AS ageRange, " +
            "COUNT(c) AS count " +
            "FROM Candidate c " +
            "GROUP BY ageRange")
```

（6）应聘者学历分布扇形图
* 应聘者学历分布扇形图通过`DegreeGraph`函数封装，通过给定的应聘者对应学历数量展示其进度条及详细信息，其中前端通过`getCandidateDegreeDistribution`向后端发送数据请求
* 后端通过`AdminController`中的`getCandidateDegreeDistribution`函数返回各个学历段的应聘者人数，其SQL语言指令如下：`SELECT candDegree as name, COUNT(*) as value FROM candidate c GROUP BY candDegree`


## 小组分工
* 吴雨菲：应聘者视角
* 黄伊新：招聘者视角
* 杨凯：管理员视角