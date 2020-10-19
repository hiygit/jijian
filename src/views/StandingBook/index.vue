<template>
  <div class="content home StandingBook" style="margin-top: -2.10938vw;">
    <Navbar :navtabActive="2" style="padding: 0.9375vw 6.5625vw 0.625vw;overflow:hidden"/>
    <div class="home_main">
      <!-- 左侧单位列表 -->
      <div class="homenav">
        <span class="border row1"></span>
        <span class="border row2"></span>
        <span class="border col1"></span>
        <span class="border col2"></span>
        <!-- 单位数 -->
        <img class="homenav_img_stayneed homenav_img_unitnum" src="@/assets/home/unitnum.png" alt />
        <div class="homenav_stayneed homenav_unitnum">
          <div style="width:100%;display:flex;justify-content: center;">
            <div style="margin-right:25px">
              <h2>{{officeCount}}</h2>
              <p class>直属事业单位</p>
            </div>
            <div>
              <h2>{{orgCount}}</h2>
              <p class>内设机构</p>
            </div>
          </div>
          <!-- 选择哪家单位 -->
          <div class="homenav_unitum_main">
            <el-scrollbar class="homenav_unitum_main_company">
              <div class="homenav_unitum_main_item" v-for="(item,index) in companydata" :key="index"> 
                <div class="homenav_unitum_main_item_empty" :class="item.checkedstate  ? 'homenav_unitum_main_item_empty_selectempty' : ''" @click="selectitem(index)">
                  <span class="homenav_unitum_main_item_empty_selectempty_inside" v-show="item.checkedstate"></span>
                </div>
                <div>{{item.name}}</div>
                <div class="overmouseover" @click="showDeleteButton(item.id)"><img src="@/assets/details.png" alt="" srcset=""></div>
              </div>
            </el-scrollbar>
          </div>
        </div>
        <div class="homenav_unitum_main_item homenav_unitum_main_item_all">
          <img src="@/assets/mobilize.png" alt />
          <div><router-link to="/personnel" class="links">人员调动</router-link></div>
        </div>
      </div>
      <!-- 右边查询数据 -->
      <div class="homemains">
        <span class="border row1"></span>
        <span class="border row2" ></span>
        <span class="border col1" ></span>
        <span class="border col2"></span>
        <!-- 搜索表单 -->
        <div class="search">
          <div class="searchbox">
            <div class="searchinput">
              <div class="searchinputgroup">
                <span>查找：</span>
                <input type="text" placeholder="关键字查找" v-model="formInline.keywords">
              </div>
              <div class="searchinputgroup">
                <span>姓名：</span>
                <input type="text" placeholder="姓名查找" v-model="formInline.user">
              </div>
              <button class="searchbtn" @click="searchbtn"><span class="el-icon-search" style="margin-right:5px"></span>查询</button>
            </div>
          </div>
          <div class="exportbtn" @click="exportbtns">导出</div>
        </div>
        <!-- 查询结果 -->
        <div class="standingbooklist">
          <!-- 单位 -->
          <div class="standingbooklist-units" v-if="ifnounits && issearch==false">
            <div class="standingbooklist-units-list" style="padding-left:0;" v-show="iscol1">
              <div class="unitsitem flexcenter" :class="items.checkedstate?'unitsactive':''" v-for="(items,index) in units" :key="index" @click="selunits(index)">
                {{items.name}}
                <div class="overmouseover" @click.stop="showDeleteButton(items.id)"><img src="@/assets/details.png" alt="" srcset=""></div>
              </div>
            </div>
            <div class="standingbooklist-units-list" v-show="iscol2">
              <div class="unitsitem flexleft sectionitem" :class="items.checkedstate?'unitsactive':''" v-for="(items,index) in section" :key="index" @click="selsection(index)">
                <img class="lefttrigon" src="@/assets/lefttrigon.png" alt="" srcset="" v-show="items.checkedstate">
                <span>{{items.name}}</span>
                <div class="overmouseover" @click.stop="showDeleteButton(items.id)"><img src="@/assets/details.png" alt="" srcset=""></div>
              </div>
            </div>
            <!-- --------------岗位---------------------- -->
            <div class="standingbooklist-units-list" v-show="iscol3">
              <div class="unitsitem flexleft sectionitem" :class="items.checkedstate?'unitsactive':''" v-for="(items,index) in workpost" :key="index" @click="working(index)">
                <img class="lefttrigon" src="@/assets/lefttrigon.png" alt="" srcset="" v-show="items.checkedstate">
                <span>{{items.name}}</span>
                <div class="overmouseover" @click.stop="showDeleteButton(items.id)"><img src="@/assets/details.png" alt="" srcset=""></div>
              </div>
            </div>
            <!-- ------------------------------------ -->
            <div class="standingbooklist-units-list" v-show="iscol4">
              <div class="unitsitem flexcenter sectionitem" style="justify-content: center;">
                <span>共{{staff.length}}人</span>
              </div>
              <div class="unitsitem flexcenter sectionitem" :class="items.checkedstate?'unitsactive':''" v-for="(items,index) in staff" :key="index" @click="selstaff(index,items)">
                <img class="headimg" :src="globals.requesturl+items.redBottomPhoto" alt="" srcset="">
                <img class="lefttrigon" src="@/assets/lefttrigon.png" alt="" srcset="" v-show="items.checkedstate">
                <span>{{items.name}}</span>
              </div>
            </div>
            <div class="humanitem" @click="goLink('/addInfo')" v-show="iscol5" style="width:1100px">
              <div class="humanitemimg" @click="detailspeople"><img :src="headpic" alt="" srcset=""></div>
              <div class="rotatelistleft">
                <div class="rotatelistname flexcenter" v-for="(item,index) in humanitem" :key="'r'+index" v-show="index<5">
                  <div class="rotatelistline" :class="item.num > 0?'selrotatelistline':''"></div>
                  <span>{{item.title}}（{{item.num}}）</span>
                  <img :src="item.selimg" alt="" srcset="" v-if="item.num > 0">
                  <img :src="item.imgs" alt="" srcset="" v-else>
                </div>
              </div>
              <div class="rotatelistright">
                <div class="rotatelistname flexcenter" v-for="(item,index) in humanitem" :key="'r'+index" v-show="index>=5 && index<10">
                  <div class="rotatelistline" :class="item.num > 0?'selrotatelistline':''"></div>
                  <img :src="item.selimg" alt="" srcset="" v-if="item.num > 0">
                  <img :src="item.imgs" alt="" srcset="" v-else>
                  <span>{{item.title}}（{{item.num}}）</span>
                </div>
              </div>
              <div class="rotatelisttop">
                <div class="rotatelistname" v-for="(item,index) in humanitem" :key="'r'+index" v-show="index>=10 && index<14">
                  <div class="rotatelistline" :class="item.num > 0?'selrotatelistline':''"></div>
                  <span>{{item.title}}（{{item.num}}）</span>
                  <img :src="item.selimg" alt="" srcset="" v-if="item.num > 0">
                  <img :src="item.imgs" alt="" srcset="" v-else>
                </div>
              </div>
              <div class="rotatelistbot">
                <div class="rotatelistname" v-for="(item,index) in humanitem" :key="'r'+index" v-show="index>=14 && index<humanitem.length">
                  <div class="rotatelistline" :class="item.num > 0?'selrotatelistline':''"></div>
                  <img :src="item.selimg" alt="" srcset="" v-if="item.num > 0">
                  <img :src="item.imgs" alt="" srcset="" v-else>
                  <span>{{item.title}}（{{item.num}}）</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 空状态 -->
          <div class="nounits" v-if="info">
            <img src="@/assets/nounits.png" alt="" srcset="">
            <div>{{messages}}</div>
          </div>
          <!-- 是否显示根据关键字和名字查询人员信息 -->
          <div class="searchresultsbox" v-if="issearch">
            <div class="searchresults" v-show="issearchlist1" style="width:580px;">
              <div class="searchresultsitem" :class="item.checkedstate?'activesearchresults':''" v-for="(item,index) in staff" :key="index" @click="searchresultsitem(index,item)">
                <img :src="item.headimg" alt="" srcset="">
                <div>
                  <span>{{item.names}}</span>
                  <span>{{item.offics}}</span>
                </div>
              </div>
            </div>
            <div class="humanitem" v-show="issearchlist2" style="width:1100px">
              <div class="humanitemimg" @click="detailspeople"><img :src="headpic" alt="" srcset=""></div>
              <div class="rotatelistleft">
                <div class="rotatelistname flexcenter" v-for="(item,index) in humanitem" :key="'r'+index" v-show="index<5">
                  <div class="rotatelistline" :class="item.num > 0?'selrotatelistline':''"></div>
                  <span>{{item.title}}（{{item.num}}）</span>
                  <img :src="item.selimg" alt="" srcset="" v-if="item.num > 0">
                  <img :src="item.imgs" alt="" srcset="" v-else>
                </div>
              </div>
              <div class="rotatelistright">
                <div class="rotatelistname flexcenter" v-for="(item,index) in humanitem" :key="'r'+index" v-show="index>=5 && index<10">
                  <div class="rotatelistline" :class="item.num > 0?'selrotatelistline':''"></div>
                  <img :src="item.selimg" alt="" srcset="" v-if="item.num > 0">
                  <img :src="item.imgs" alt="" srcset="" v-else>
                  <span>{{item.title}}（{{item.num}}）</span>
                </div>
              </div>
              <div class="rotatelisttop">
                <div class="rotatelistname" v-for="(item,index) in humanitem" :key="'r'+index" v-show="index>=10 && index<14">
                  <div class="rotatelistline" :class="item.num > 0?'selrotatelistline':''"></div>
                  <span>{{item.title}}（{{item.num}}）</span>
                  <img :src="item.selimg" alt="" srcset="" v-if="item.num > 0">
                  <img :src="item.imgs" alt="" srcset="" v-else>
                </div>
              </div>
              <div class="rotatelistbot">
                <div class="rotatelistname" v-for="(item,index) in humanitem" :key="'r'+index" v-show="index>=14 && index<humanitem.length">
                  <div class="rotatelistline" :class="item.num > 0?'selrotatelistline':''"></div>
                  <img :src="item.selimg" alt="" srcset="" v-if="item.num > 0">
                  <img :src="item.imgs" alt="" srcset="" v-else>
                  <span>{{item.title}}（{{item.num}}）</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹框 -->
    <div class="popups" :class="[isfullscreen?'fullscreen':'smallscreen']" v-if="ifshowpop">
      <div class="popupsbtns">
        <img src="@/assets/fullscreen.png" alt="" srcset="" class="fullscreen" @click="isfullscreen=!isfullscreen">
        <img src="@/assets/closepop.png" alt="" srcset="" class="closepop" @click="closepop">
      </div>
      <div class="poptext">
        <h3>{{unittitles}}</h3>
        <div v-html="remarks"></div>
      </div>
    </div>
    <!-- --------------------------- 点击头像显示的个人信息 ------------------------------- -->
    <div class="headinfo">
      <el-dialog title="" :visible.sync="centerDialogVisible" width="100%" :before-close="handleClose" fullscreen>
        <div class="content home" style="margin-top:15px">
          <div class="AddInfo">
            <span class="border row1"></span>
            <span class="border row2"></span>
            <span class="border col1"></span>
            <span class="border col2"></span>
            <div class="AddInfoMain">
              <div class="addInfoMainTop">
                <div class="AddInfoMainLeft">
                  <el-form :model="form" :label-width="labelWidth" :rules="rules" ref="form">
                    <el-form-item label="上传一寸红底照片" prop="redBottomPhoto">
                      <div class="avatar-uploader">
                        <img v-if="form.redBottomPhoto" :src="form.redBottomPhoto" />
                        <img v-else src="../../assets/addpic.png" alt srcset />
                        <input type="file" accept=".jpg, .jpeg, .png, .gif, .JPG, .JPEG" @change="handleAvatarSuccess($event)"/>
                      </div>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                      <el-input :disabled="disabled" v-model="form.name" placeholder="请填写姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                      <el-radio :disabled="disabled" v-model="form.sex" :label="item.value" v-for="(item,index) in sexlist" :key="index">{{item.label}}</el-radio>
                    </el-form-item>
                    <el-form-item label="籍贯" prop="nativePlace">
                      <el-input :disabled="disabled" v-model="form.nativePlace" placeholder="请填写籍贯"></el-input>
                    </el-form-item>
                    <el-form-item label="学历" prop="educationBackground">
                      <el-select v-model="form.educationBackground" placeholder="请选择学历" :disabled="disabled">
                        <el-option :label="item.label" :value="item.value" v-for="(item,index) in degreelist" :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="民族" prop="nation">
                      <el-select v-model="form.nation" placeholder="请选择名族" :disabled="disabled">
                        <el-option :label="item" :value="item" v-for="(item,index) in nationalities" :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="婚姻状况" prop="maritalStatus">
                      <el-select v-model="form.maritalStatus" placeholder="请选择婚姻状况" :disabled="disabled">
                        <el-option :label="item.label" :value="item.value" v-for="item in marriagelist" :key="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="出生日期" prop="birthday">
                      <el-date-picker :disabled="disabled" v-model="form.birthday" type="date" placeholder="请选择出生日期" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="身份证号" prop="idCard">
                      <el-input :disabled="disabled" v-model="form.idCard" oninput="if(value.length>18)value=value.slice(0,18)" onkeyup="value=value.replace(/[^\d|X]/g,'')" placeholder="请填写身份证号"></el-input>
                    </el-form-item>
                    <el-form-item label="政治面貌" prop="politicsStatus">
                      <el-select v-model="form.politicsStatus" placeholder="请选择政治面貌" :disabled="disabled">
                        <el-option :label="item.label" :value="item.value" v-for="(item,index) in politicallist" :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="入党时间" prop="partyTime">
                      <el-date-picker :disabled="disabled" v-model="form.partyTime" type="date" placeholder="请选择入党时间" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="参加工作时间" prop="workTime">
                      <el-date-picker :disabled="disabled" v-model="form.workTime" type="date"  placeholder="请选择参加工作时间" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="工作单位" prop="companyName">
                      <el-input :disabled="disabled" v-model="form.companyName" onmouseover="this.title=this.value" readonly v-if="showinputcompanyName" ></el-input>
                        <el-cascader v-model="form.companyName" :options="unitslist" @active-item-change="unitChanges" placeholder="请选择单位名称" :props="{value: 'id',label: 'name',children: 'children'}">
                      </el-cascader>
                    </el-form-item>
                    <!------------------------------------ 新增在职情况 ------------------------------------>
                    <el-form-item label="在职情况" prop="workingState"> 
                      <el-select v-model="form.workingState" placeholder="请选择" :disabled="disabled">
                        <el-option v-for="item in workingStateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                    <!-- -------------------------------------------------------------------------------- -->
                    <el-form-item label="现任职务" prop="presentOccupation">
                      <el-input :disabled="disabled" v-model="form.presentOccupation" placeholder="请填写现任职务"></el-input>
                    </el-form-item>
                    <el-form-item label="职务级别" prop="jobLevel">
                      <el-select v-model="form.jobLevel" placeholder="请选择职务级别" :disabled="disabled">
                        <el-option :label="item.label" :value="item.value" v-for="(item,index) in dutyRankList" :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="现任职务时间" prop="incumbentTime">
                      <el-date-picker :disabled="disabled" v-model="form.incumbentTime" type="date" placeholder="请选择现任职务时间" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="人员类型" prop="personnelcategory">
                      <el-select v-model="form.personnelcategory" placeholder="请选择人员类型" :disabled="disabled">
                        <el-option :label="item.label" :value="item.value" v-for="(item,index) in Personneltype" :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="职称" prop="titleJobs">
                      <el-input :disabled="disabled" v-model="form.titleJobs" placeholder="请填写职称"></el-input>
                    </el-form-item>
                    <el-form-item label="职称级别" prop="titleJobsLevel">
                      <el-select v-model="form.titleJobsLevel" placeholder="请选择职称级别" :disabled="disabled">
                        <el-option :label="item.label" :value="item.value" v-for="(item,index) in zhichengjibie" :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="是否政协委员" prop="isCPPCCMemberOrNot">
                      <el-radio :disabled="disabled" v-model="form.isCPPCCMemberOrNot" :label="item.value" v-for="(item,index) in isif" :key="index">{{item.label}}</el-radio>
                    </el-form-item>
                    <el-form-item label="是否人大代表" prop="isNPCDEputiesOrNot">
                      <el-radio :disabled="disabled" v-model="form.isNPCDEputiesOrNot" :label="item.value" v-for="(item,index) in isif" :key="index">{{item.label}}</el-radio>
                    </el-form-item>
                    <el-form-item label="是否党代表" prop="isPartyRepresentativeOrNot">
                      <el-radio :disabled="disabled" v-model="form.isPartyRepresentativeOrNot" :label="item.value" v-for="(item,index) in isif" :key="index">{{item.label}}</el-radio>
                    </el-form-item>
                    <!-- --------新增两个是否------- -->
                    <el-form-item label="是否市委委员" prop="isCommunistPartyMember">
                      <el-radio :disabled="disabled" v-model="form.isCommunistPartyMember" :label="item.value" v-for="(item,index) in isif" :key="index">{{item.label}}</el-radio>
                    </el-form-item>
                    <el-form-item label="是否市纪委委员" prop="isCityCommissionPartyMember">
                      <el-radio :disabled="disabled" v-model="form.isCityCommissionPartyMember" :label="item.value" v-for="(item,index) in isif" :key="index">{{item.label}}</el-radio>
                    </el-form-item>
                    <!-- ------------------ ------- -->
                    <el-form-item label="现住址" prop="presentAddress">
                      <el-input :disabled="disabled" v-model="form.presentAddress" placeholder="请填写详细地址"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="phone">
                      <el-input :disabled="disabled" v-model="form.phone" oninput="if(value.length>11)value=value.slice(0,11)" onkeyup="this.value=this.value.replace(/\D/g,'')" placeholder="请输入联系电话"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="AddInfoMainRight">
                  <div class="rightBlock">
                    <div class="rightTableFlex">
                      <div class="rightTableTitle">
                        <p class="rightTableMainTitle">家庭主要成员及主要社会关系</p>
                        <p class="rightTableSubTitle">需填写（配偶、子女、双方父母、本人兄弟姐妹）若无该身份人员。则无需填写。注:已故上述人员，也需填写。</p>
                      </div>
                      <!-- <div class="rightTableBtn" v-if="!showinput"> -->
                      <div class="rightTableBtn">
                        <button class="addTableRow" @click="addfamily">添加</button>
                      </div>
                    </div>
                    <div>
                      <el-table :data="familyMembers" border :height="tableHeight" stripe highlight-current-row style="background-color:transparent;width:100%;box-sizing:border-box;" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
                        <el-table-column label="称谓" prop="appellation" width="160">
                          <template scope="scope">
                            <el-input :disabled="disabled" style="display:inline-block;width:90%;margin:0 auto;" size="small" v-model="scope.row.appellation" placeholder="请输入内容"/>
                          </template>
                        </el-table-column>
                        <el-table-column label="姓名" prop="name" width="160">
                          <template scope="scope">
                            <el-input :disabled="disabled" style="display:inline-block;width:90%;margin:0 auto;" size="small" v-model="scope.row.name" placeholder="请输入内容"/>
                          </template>
                        </el-table-column>
                        <el-table-column label="政治面貌" prop="politicsStatus" width="350">
                          <template scope="scope">
                            <el-select v-model="scope.row.politicsStatus" placeholder="请选择政治面貌" :disabled="disabled">
                              <el-option :label="item.label" :value="item.value" v-for="(item,index) in politicallist" :key="index"></el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column label="年龄" prop="age" width="160">
                          <template scope="scope">
                            <el-input :disabled="disabled" style="display:inline-block;width:90%;margin:0 auto;" size="small" v-model="scope.row.age" maxlength="2" onkeyup="this.value=this.value.replace(/\D/g,'')" placeholder="请输入内容"/>
                          </template>
                        </el-table-column>
                        <el-table-column label="职务(级别)" prop="presentOccupation" width="300">
                          <template scope="scope">
                            <el-select v-model="scope.row.presentOccupation" placeholder="请选择职务级别" :disabled="disabled">
                              <el-option :label="item.label" :value="item.value" v-for="(item,index) in dutyRankList" :key="index"></el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column label="工作单位" prop="companyName" width="350">
                          <template scope="scope">
                            <el-input :disabled="disabled" style="display:inline-block;width:90%;margin:0 auto;" size="small" v-model="scope.row.companyName" placeholder="请输入单位名称"/>
                          </template>
                        </el-table-column>
                        <el-table-column :resizable="false" label="操作" width="200px">
                          <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="deletebtn(scope.$index, scope.row)">删除</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                  <div class="rightBlock">
                    <div class="rightTableFlex">
                      <div class="rightTableTitle">
                        <p class="rightTableMainTitle" style="margin-top:10px;">个人及配偶、共同生活的子女拥有的房产情况</p>
                      </div>
                      <!-- <div class="rightTableBtn" v-if="!showinput"> -->
                      <div class="rightTableBtn">
                        <button class="addTableRow" @click="housingbtn">添加</button>
                      </div>
                    </div>
                    <div>
                      <el-table :data="housingSituations" border :height="tableHeight" stripe :disabled="disabled" style="background-color:transparent;width:100%;box-sizing:border-box;" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
                        <el-table-column label="序号" type="index" :index="indexinfo" width="100" prop="serialNumber">
                          <!-- <template scope="scope">
                            <el-input :disabled="disabled" style="display:inline-block;width:90%;margin:0 auto;" size="small" v-model="scope.row.serialNumber" placeholder="请输入内容"/>
                          </template>-->
                        </el-table-column>
                        <el-table-column label="房号" prop="roomNumber" width="250">
                          <template scope="scope">
                            <el-input style="display:inline-block;width:90%;margin:0 auto;" size="small" v-model="scope.row.roomNumber" :disabled="disabled" placeholder="请输入内容"/>
                          </template>
                        </el-table-column>
                        <el-table-column label="建筑面积(m²)" prop="coveredArea" width="160">
                          <template scope="scope">
                            <el-input style="display:inline-block;width:90%;margin:0 auto;" size="small" v-model="scope.row.coveredArea" :disabled="disabled" placeholder="请输入内容"
                              @keyup.native="scope.row.coveredArea =scope.row.coveredArea = scope.row.coveredArea.replace(/[^\d.]/g,'');
                                             scope.row.coveredArea = scope.row.coveredArea.replace(/\.{2,}/g,'.');
                                             scope.row.coveredArea = scope.row.coveredArea.replace(/^\./g,'');
                                             scope.row.coveredArea = scope.row.coveredArea.replace('.','$#$').replace(/\./g,'').replace('$#$','.');
                                             scope.row.coveredArea = scope.row.coveredArea.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');"/>
                          </template>
                        </el-table-column>
                        <el-table-column label="购买时间" prop="purchasingDate" width="230">
                          <template scope="scope">
                            <el-date-picker :disabled="disabled" v-model="scope.row.purchasingDate" type="date" placeholder="请选择购买时间" value-format="yyyy-MM-dd"></el-date-picker>
                          </template>
                        </el-table-column>
                        <el-table-column label="购入价(万元)" prop="purchasePrice" width="160">
                          <template scope="scope">
                            <el-input :disabled="disabled" style="display:inline-block;width:90%;margin:0 auto;" size="small" v-model="scope.row.purchasePrice" placeholder="请输入内容"
                              @keyup.native="scope.row.purchasePrice=scope.row.purchasePrice= scope.row.purchasePrice.replace(/[^\d.]/g,'');
                                             scope.row.purchasePrice= scope.row.purchasePrice.replace(/\.{2,}/g,'.');
                                             scope.row.purchasePrice= scope.row.purchasePrice.replace(/^\./g,'');
                                             scope.row.purchasePrice= scope.row.purchasePrice.replace('.','$#$').replace(/\./g,'').replace('$#$','.');
                                             scope.row.purchasePrice= scope.row.purchasePrice.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');"/>
                          </template>
                        </el-table-column>
                        <el-table-column label="产权人" prop="propertyOwner" width="160">
                          <template scope="scope">
                            <el-input :disabled="disabled" style="display:inline-block;width:90%;margin:0 auto;" size="small" v-model="scope.row.propertyOwner" placeholder="请输入内容"/>
                          </template>
                        </el-table-column>
                        <el-table-column label="所在位置" prop="location" width="350">
                          <template scope="scope">
                            <el-input :disabled="disabled" style="display:inline-block;width:90%;margin:0 auto;" size="small" v-model="scope.row.location" placeholder="请输入内容"/>
                          </template>
                        </el-table-column>
                        <el-table-column :resizable="false" label="操作" width="200px">
                          <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="personageDeletebtn(scope.$index, scope.row)">删除</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                  <!-- textarea -->
                  <div class="rightTextareaBlock">
                    <p class="rightTextareaTitle">个人工作简历</p>
                    <el-input
                      :disabled="disabled"
                      v-model="form.personalResume"
                      :autosize="{ minRows: 5, maxRows: 5}"
                      type="textarea"
                      placeholder="请填写工作经历"
                    />
                  </div>
                  <div class="rightTextareaBlock">
                    <p class="rightTextareaTitle">奖惩情况</p>
                    <el-input
                      :disabled="disabled"
                      v-model="form.rewardsAndPunishment"
                      :autosize="{ minRows: 5, maxRows: 5}"
                      type="textarea"
                      placeholder="请填写奖惩情况"
                    />
                  </div>
                  <div class="rightTextareaBlock" style="border-bottom:none;">
                    <p class="rightTextareaTitle">其他相关情况</p>
                    <el-input
                      :disabled="disabled"
                      v-model="form.otherrelevantinformation"
                      :autosize="{ minRows: 5, maxRows: 5}"
                      type="textarea"
                      placeholder="需向组织说明的其他相关情况"
                    />
                  </div>
                </div>
              </div>
              <div class="addInfoMainBot">
                <!-- <div class="exportbtn" @click="exportbtns" v-show="exportbtn">导出</div> 新增导出按钮 -->
                <button style="margin-left:15px;" :disabled="disabled" class="bottomSaveBtn" v-if="!disabled" @click="savebtns('form')">保存</button>
                <div style="margin-left:15px;" class="exportbtn" @click="personlExportbtns">导出</div>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script src="./script.js"></script>
<style lang="scss" scoped src="./style.scss"></style>

<style scoped>
/* *{
  margin: 0;
  padding: 0;
} */
.StandingBook /deep/ .el-dialog__headerbtn{
  position: absolute;
  top:10px;
}
.StandingBook /deep/ .el-dialog__header{
  padding: 0
}
.StandingBook /deep/ .el-dialog{
  background: rgba(0,0,0,.3);
}
</style>