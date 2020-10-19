<template>
  <div class="xiansuotaizhang">
    <!-- 面包屑导航 -->
    <div class="navcrumbed">
      <div class="navcrumbedimg">
        <img @click="goback" style="cursor: pointer;" src="@/assets/navblack.png" alt srcset />
        <!-- <img src="@/assets/navblack.png" alt srcset /> -->
        <span>当前位置：</span>
      </div>
      <div class="navcrumbedlist">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/StandBook' }">线索台账</el-breadcrumb-item>
          <el-breadcrumb-item>线索台账录入</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="content home">
      <div class="StandBookEnter">
        <span class="border row1"></span>
        <span class="border row2"></span>
        <span class="border col1"></span>
        <span class="border col2"></span>
        <div class="StandBookEnterMain">
          <div class="topStep">
            <div class="topStepTitle">线索信息</div>
            <div class="topStepText">
              <p class="titleo">进度:</p>
              <p class="texto steptexto">
                <img src="../../assets/steponesel.png" v-if="step == 0"/>
                <img src="../../assets/stepone.png" v-else/>
                <span :class="step == 0 ? 'stepselspan':''">收件</span>
              </p>
              <p class="texto" :class="step >= 1 ?'steptexto':''">
                <img src="../../assets/steptwosel.png" v-if="step == 1"/>
                <img src="../../assets/steptwo.png" v-else/>
                <span :class="step == 1 ? 'stepselspan':''">每周召开线索研判会</span>
              </p>
              <p class="texto" :class="step >= 2 ?'steptexto':''">
                <img src="../../assets/stepthreesel.png" v-if="step == 2" />
                <img src="../../assets/stepthree.png" v-else />
                <span :class="step == 2 ? 'stepselspan':''">问题线索处置</span>
              </p>
              <p class="texto">
                <img src="../../assets/stepfoursel.png" v-if="step == 3" />
                <img src="../../assets/stepfour.png" v-else />
                <span :class="step == 3 ? 'stepselspan':''">处置结果落实</span>
              </p>
              <p class="texto">
                <img src="../../assets/stepfivesel.png" v-if="step == 4"/>
                <img src="../../assets/stepfive.png" v-else/>
                <span :class="step == 4 ? 'stepselspan':''">归档</span>
              </p>
            </div>
          </div>
          <!-- 线索信息 -->
          <div class="standBookInfo">
            <div class="standBookInfoFormLeft">
              <el-form ref="msgform" :model="msgform" :rules= 'rules' :inline="true" class="demo-form-inline" label-width="110px">
                <el-form-item label="线索来源" prop="clueStoTheSource">
                  <el-select v-model="msgform.clueStoTheSource" placeholder="请选择线索来源">
                    <el-option v-for="item in sourcelist" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="来件编号" prop="letterNumber">
                  <el-input v-model="msgform.letterNumber" placeholder="请填写来件编号"></el-input>
                </el-form-item>
                <el-form-item label="组内线索编号" prop="groupNumber">
                  <el-input v-model="msgform.groupNumber" placeholder="格式：mz+每周+编号"></el-input>
                </el-form-item>
                <el-form-item label="线索件数" prop="clueNumber">
                  <el-input v-model="msgform.clueNumber" onkeyup="this.value=this.value.replace(/\D/g,'')" placeholder="请填写线索件数"></el-input>
                </el-form-item>
                <el-form-item label="是否重复件" prop="isDuplicateOrNot">
                  <el-select v-model="msgform.isDuplicateOrNot" placeholder="请选择是否重复件">
                    <el-option v-for="item in isnoList" :key="item.index" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <div class="standBookInfoFormRight">
              <el-form :model="msgform" label-position="top" class="demo-form-inline" label-width="110px">
                <el-form-item label="反应的主要问题">
                  <el-input type="textarea" style="width:100%;" v-model="msgform.content" :autosize="{ minRows: 5, maxRows: 5}"
                    placeholder="工作中负责各类材料的原始单据的整理、记录、并据以登记物资总账和明细账:往来款项的核算、结算及应收、应付服务:发票的开据。"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
           <!-- 反映人信息 -->
            <div class="plaintiff">
              <div class="fitTitle">反映人信息</div>
              <div class="plaintiff">
                <el-form :inline="true" :model="find" class="demo-form-inline" label-width="108px">
                  <el-form-item label="姓名">
                    <el-input v-model="find.reflectName" placeholder="请填写姓名"></el-input>
                  </el-form-item>
                  <el-form-item label="联系方式">
                    <el-input v-model="find.reflectPhone" placeholder="请填写联系方式" oninput="if(value.length>11)value=value.slice(0,11)" onkeyup="this.value=this.value.replace(/\D/g,'')"></el-input>
                  </el-form-item>
                  <el-form-item label="单位" prop="reflectunitname">
                    <el-input :disabled="disabled" v-model="find.reflectunitname" readonly v-if="showinput"></el-input>
                    <el-cascader v-model="find.reflectunitname" :options="unitslist" @active-item-change="unitChanges" placeholder="请选择单位" :props="{value: 'id',label: 'name',children: 'children'}"></el-cascader>
                  </el-form-item>
                  <el-form-item label="职务">
                    <el-input v-model="find.reflectPresenToCcupation" placeholder="请选择职务" ></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          <div>
            <div class="fitTitle">被反映人信息</div>
            <!-- 系统外部单位 -->
            <div style="width: 98%;" v-show="outOffice">
              <el-form :inline="true" :model="system" class="demo-form-inline" label-width="120px">
                <el-form-item label="单位" prop="outOfficeName">
                  <el-input v-model="system.outOfficeName" placeholder="请填写被反映单位"></el-input>
                </el-form-item>
              </el-form>
              <div style="width: 100%;height: 1px;margin-left: 1%;border-bottom: 1px solid #03d0ff;"></div>
            </div>
            <!-- 系统内部单位 -->
            <div style="width: 98%;" v-show="insideOffice">
              <div class="systemInsideOfficeBox">
                <el-form :inline="true" :model="system" class="demo-form-inline" label-width="120px">
                  <el-form-item label="单位" prop="systemoffice">
                    <el-input :disabled="disabled" v-model="find.reflectunitname" readonly v-if="showinput"></el-input>
                    <el-cascader v-model="find.reflectunitname" :options="unitslist" @active-item-change="unitChanges" placeholder="请选择单位" :props="{value: 'id',label: 'name',children: 'children'}"></el-cascader>
                  </el-form-item>
                </el-form>
                <el-button type="warning" class="addPeopleBtn" @click="addPeopleBtn()">添加人员</el-button>
              </div>
              <div style="width: 100%;height: 1px;margin-left: 1%;border-bottom: 1px solid #03d0ff;"></div>
            </div>
            <!-- 被反映人信息 -->
            <div v-for="(item,index) in arrs" :key="index">
              <div class="respondentInfoForm">
                <!-- 姓名 查找 -->
                <div class="respondentInfoFSarch respondentInfoFSarch1">
                  <el-form :inline="true" :model="item" class="demo-form-inline deleteRadio">
                    <!-- 姓名-单选按钮 -->
                    <div v-show="showRadio" :class="{radiobtn1:!item.radiobtn,radiobtnChecked:item.radiobtn}" @click="checkedRaido(index)"></div>
                    <el-form-item label="姓名" prop="personnelName">
                      <el-input style="width:100%;" v-model="item.personnelName" placeholder="请填写姓名"></el-input>
                    </el-form-item>
                    <span class="delBtn" v-if="index != 0" @click="delBtn(index)"><img src="@/assets/del.png" alt=""></span>
                    <!-- <el-form-item label="身份证号" prop="idCard">
                      <el-input oninput="if(value.length>18)value=value.slice(0,18)" onkeyup="value=value.replace(/[^\d|X]/g,'')" style="width:100%;" v-model="byfind.idCard" placeholder="请填写身份证号"></el-input>
                    </el-form-item> -->
                    <el-form-item label="id" prop="personnelid" v-show="idshow">
                      <el-input style="width:100%;" v-model="item.personnelid" placeholder="请填写被反映人id"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="respondentInfoFSarch respondentInfoFSarch2">
                  <div class="btnGroup" style="overflow:hidden;">
                    <el-button type="primary" class="derive" @click="getPersonnelList(item,index)">查找</el-button>
                    <el-button v-show="isPack" @click="findShowBtn(item,index)" class="save" type="primary" style="background:none;border:none;">{{item.ismore?"收起":"展开"}} 
                      <i class="packUp">
                        <img src="@/assets/sanjiaoUp.png" v-if="item.ismore == true" alt="">
                        <img src="@/assets/sanjiaoDown.png" v-else />
                      </i>
                    </el-button>
                  </div>
                </div>
              </div>
              <div v-show="item.ismore">
                <!-- 性别等信息 -->
                <div class="respondentForm">
                  <div class="respondentFormInp">
                    <el-form :inline="true" :model="item" class="demo-form-inline" label-width="120px">
                      <el-form-item label="性别" class="textRadio">
                      <el-radio disabled v-model="item.sex" :label="item.value" v-for="(item,index) in sexlist" :key="index">{{item.label}}</el-radio>
                      </el-form-item>
                      <el-form-item label="出生年月" prop="birthday">
                        <el-input v-model="item.birthday" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="婚姻状况" prop="maritalStatus">
                        <el-select v-model="item.maritalStatus" placeholder="请选择婚姻状况" disabled>
                          <el-option :label="item.label" :value="item.value" v-for="item in marriagelist" :key="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="籍贯" prop="nativePlace">
                        <el-input v-model="item.nativePlace" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="文化程度" prop="educationBackground">
                        <el-select disabled v-model="item.educationBackground" placeholder="请选择文化程度">
                          <el-option v-for="item in educationBackgroundList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="政治面貌" prop="politicsStatus">
                        <el-select v-model="item.politicsStatus" placeholder="请选择政治面貌" disabled>
                          <el-option :label="item.label" :value="item.value" v-for="(item,index) in politicallist" :key="index"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="工作单位" prop="officeName">
                        <el-input v-model="item.officeName" placeholder="请输入工作单位" disabled></el-input>
                        <!-- <el-cascader  v-model="byfind.officeName" :options="unitslist" @expand-change="unitChanges" placeholder="请选择"></el-cascader> -->
                      </el-form-item>
                      <el-form-item label="联系方式" prop="phone">
                        <el-input v-model="item.phone" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="民族" prop="nation">
                        <el-input v-model="item.nation" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="在职情况" prop="workingState"> 
                        <el-select v-model="item.workingState" placeholder="请选择" disabled>
                          <el-option v-for="item in workingStateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="职务" prop="presentOccupation">
                        <el-input v-model="item.presentOccupation" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="职级" prop="jobLevel">
                        <el-select v-model="item.jobLevel" placeholder="请选择职级" disabled>
                          <el-option :label="item.label" :value="item.value" v-for="(item,index) in dutyRankList" :key="index"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="是否市委委员">
                        <el-select v-model="item.isCommunistPartyMember" placeholder="请选择" disabled>
                          <!-- <el-option v-for="item in isnoList" :key="item.value" :label="item.label" :value="item.value"></el-option> -->
                          <el-option v-for="item in isnoList" :key="item.index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="是否市纪委委员">
                        <el-select v-model="item.isCityCommissionPartyMember" placeholder="请选择" disabled>
                          <el-option v-for="item in isnoList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <!-- ----------------------新增三个是否-------------------- -->
                      <el-form-item label="是否政协委员">
                        <el-select v-model="item.isCPPCCMemberOrNot" placeholder="请选择" disabled>
                          <el-option v-for="item in isnoList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="是否人大代表">
                        <el-select v-model="item.isNPCDEputiesOrNot" placeholder="请选择" disabled>
                          <el-option v-for="item in isnoList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="是否党代表">
                        <el-select v-model="item.isPartyRepresentativeOrNot" placeholder="请选择" disabled>
                          <el-option v-for="item in isnoList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <!-- ------------------------------------------------------ -->
                    </el-form>
                  </div>
                  <div class="respondentFormInpArea standBookInfoFormRight">
                    <el-form :model="item" label-position="top" class="demo-form-inline" label-width="110px">
                      <el-form-item label="工作简历">
                        <el-input type="textarea" style="width:100%;height:15vw" v-model="item.personalResume" disabled
                          placeholder="工作中负责各类材料的原始单据的整理、记录、并据以登记物资总账和明细账:往来款项的核算、结算及应收、应付服务:发票的开据。"
                        ></el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
                <!-- 处置方式 -->
                <div class="handlingWay">
                  <div class="fitTitle">处置方式</div>
                  <div class="handlingWayForm">
                    <div class="handlingWayFormLeft">
                      <el-form :model="item" status-icon class="demo-ruleForm">
                        <el-form-item label="拟处置方式:" prop="proposedDisposition">
                          <el-select v-model="item.proposedDisposition" placeholder="请选择拟处置方式">
                            <el-option v-for="item in proposedDispositionList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="上会时间:" style="padding-left:1vw;">
                          <el-date-picker type="datetime" placeholder="请选择上会时间" v-model="item.thereWillBeTime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                        </el-form-item>
                      </el-form>
                      <div class="handlingWayFormArea standBookInfoFormRight">
                        <el-form :model="item" label-position="top" class="demo-form-inline" label-width="110px">
                          <el-form-item label="处置理由">
                            <el-input type="textarea" style="width:100%;height:12vw;" v-model="item.disposalOfReason"
                              placeholder="工作中负责各类材料的原始单据的整理、记录、并据以登记物资总账和明细账:往来款项的核算、结算及应收、应付服务:发票的开据。"
                            ></el-input>
                          </el-form-item>
                        </el-form>
                      </div>
                    </div>
                    <div class="handlingWayFormRight">
                      <div class="handlingWayFormRight-list" v-for="(items,index) in item.disposition" :key="index">
                        <el-form :model="items" status-icon :inline="true" class="demo-form-inline">
                          <el-form-item :label="'处置方式'+(index+1)" prop="proposedDispositionList">                        
                            <el-select v-model="items.disponsalWay" placeholder="请选择处置方式" style="width: 100%;">
                              <!-- <el-option label="处置方式一"></el-option>
                              <el-option label="处置方式二"></el-option> -->
                              <el-option v-for="pitem in proposedDispositionList" :key="pitem.value" :label="pitem.label" :value="pitem.value"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="批准时间">
                            <el-date-picker type="datetime" placeholder="请选择批准时间" v-model="items.approvalTime" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                          </el-form-item>
                          <el-form-item label="启动时间">
                            <el-date-picker type="datetime" placeholder="请选择启动时间" v-model="items.startingTime" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                          </el-form-item>
                        </el-form>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 违纪违法内容 -->
                <div class="">
                  <div class="fitTitle">违纪违法内容</div>
                  <div class="Disciplinaryandillegalcontent">
                    <el-form :model="item" status-icon :inline="true" class="demo-form-inline">
                      <el-form-item label="违反党六大纪律" prop="violationOfPartyDiscipline">
                        <el-select class="duoxuan" multiple v-model="item.violationOfPartyDiscipline" placeholder="可多选" style="width: 100%;max-height:61px;overflow:hidden;padding-top:2px;">
                          <el-option v-for="item in violationOfPartyDisciplineList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="是否违反中央八项规定精神">
                        <el-select v-model="item.isDeregulation" placeholder="请选择" style="width: 100%;">
                          <el-option v-for="item in isnoList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="是否存在“四风”问题" prop="isFourWindsProblem">
                        <el-select v-model="item.isFourWindsProblem" placeholder="请选择" style="width: 100%;">
                          <el-option v-for="item in isnoList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="是否民生领域腐败" prop="isCorruptionLivelihoodSector">
                        <el-select v-model="item.isCorruptionLivelihoodSector" placeholder="请选择" style="width: 100%;">
                          <el-option v-for="item in isnoList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="是否十八大以后问题" prop="isEighteenthAfter">
                        <el-select v-model="item.isEighteenthAfter" placeholder="请选择" style="width: 100%;">
                          <el-option v-for="item in isnoList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="是否涉及扶贫领域问题" prop="isPovertyAlleviationProblem">
                        <el-select v-model="item.isPovertyAlleviationProblem" placeholder="请选择" style="width: 100%;">
                          <el-option v-for="item in isnoList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="是否涉及扫黑除恶问题" prop="isAntitriadPutting">
                        <el-select v-model="item.isAntitriadPutting" placeholder="请选择" style="width: 100%;">
                          <el-option v-for="item in isnoList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
                <!-- 办理情况 -->
                <div class="respondentInfo">
                  <div class="fitTitle">办理情况</div>
                  <div class="respondentForm">
                    <div class="respondentFormInp Todealwithsituation">
                      <el-form :inline="true" :model="item" class="demo-form-inline" label-width="120px">
                        <el-form-item label="是否办结" prop="istransferred">
                          <el-select v-model="item.istransferred" placeholder="请选择">
                            <el-option v-for="item in isnoList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="办理结果" prop="transferredResult">
                          <!-- <el-select v-model="Todealwithsituation.transferredResult" placeholder="请选择办理结果">
                            <el-option v-for="item in transferredResultList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                          </el-select> -->
                          <el-input :disabled="disabled" v-model="item.transferredResult" readonly v-if="showinput"></el-input>
                          <el-cascader v-model="item.transferredResult" :options="transactionlist" @active-item-change="transactionChanges" placeholder="请选择办理结果" :props="{value: 'id',label: 'name',children: 'children'}"></el-cascader>
                        </el-form-item>
                        <el-form-item label="办结时间">
                          <el-date-picker type="datetime" placeholder="请选择办结时间" v-model="item.transferredTime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="问责方式" prop="accountabilityMeans">
                          <el-select v-model="item.accountabilityMeans" placeholder="请选择问责方式">
                            <el-option v-for="item in accountabilityMeansList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="是否召开民主生活会" prop="isHoldDemocraticMeetings">
                          <el-select v-model="item.isHoldDemocraticMeetings" placeholder="请选择">
                            <el-option v-for="item in isnoList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="民主生活会召开时间">
                          <el-date-picker type="datetime" placeholder="请选择召开时间" v-model="item.holdDemocraticMeetingsTime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="处分是否执行到位" prop="isPunishmentExecution">
                          <el-select v-model="item.isPunishmentExecution" placeholder="请选择">
                            <el-option v-for="item in isnoList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="是否归档" prop="isArchive">
                          <el-select v-model="item.isArchive" placeholder="请选择">
                            <el-option v-for="item in isnoList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-form>
                    </div>
                    <div class="respondentFormInpArea standBookInfoFormRight">
                      <el-form :model="item" label-position="top" class="demo-form-inline" label-width="110px">
                        <el-form-item label="问责事由">
                          <el-input type="textarea" style="width:100%;height:10vw" v-model="item.accountabilityFor" placeholder="请填写问责事由..."></el-input>
                        </el-form-item>
                      </el-form>
                    </div>
                  </div>
                </div>
                <!-- 备注 -->
                <div class="respondentInfo" style="border-bottom: 1px solid #03d0ff;">
                  <div class="fitTitle">备 注 1：</div>
                  <div class="remarkss">
                    <el-form :inline="true" :model="remarksform" class="demo-form-inline" label-width="100%">
                      <el-form-item label="备 注 1：">
                        <el-input type="textarea" v-model="remarksform.remark1" placeholder="请填写备注" style="height:12vw"></el-input>
                      </el-form-item>
                      <el-form-item label="备 注 2：">
                        <el-input type="textarea" v-model="remarksform.remark2" placeholder="请填写备注" style="height:12vw"></el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        <!-- 按钮 -->
        <div class="bottomSub">
          <button class="bottomBtnStyle" @click="savebtns" v-if="!updata" style="background:#e6a23c;">保存</button>
          <button class="bottomBtnStyle" @click="updateProgress('msgform')">更新进度</button>
        </div>
      </div>
    </div>



     <!-- 保存弹框 -->
    <transition name="personnelframe">
      <div class="personnelframe" v-if="personnelpops">
        <div class="personnelframe-close"></div>
        <div class="personnelframe-container">
          <div class="personnelframe-container-box">
            <div class="personnelframe-title">
              <img src="@/assets/courseIcon.png" alt="" srcset="">
              <h3>进程更新</h3>
            </div>
            <div class="spanbox" >请到更新进度页面，查看上传附件</div>
          </div>
          <div class="personnelframe-btns">
            <!-- <el-button type="primary" @click="personnelpops=false">取消</el-button> -->
            <el-button @click="personnelpops=false">取消</el-button>
            <el-button type="primary" @click="submitchangeunit('msgform')">确定</el-button>
            <!-- <el-button type="warning" @click="quxiaobtn" v-show="nextsave">保存</el-button> -->
          </div>
        </div>
      </div>
    </transition>
    
    <!-- 查询弹框 -->
    <transition name="personnelframe">
      <div class="personnelframe" v-if="personnelpops1">
        <div class="personnelframe-close"></div>
        <div class="personnelframe-container" style="width:40%;">
          <div class="personnelframe-container-box">
            <div class="personnelframe-title">
              <img src="@/assets/courseIcon.png" alt="" srcset="">
              <h3>人员信息</h3>
            </div>
            <div class="tablebox">
              <el-table :data="tableData" border :height="tableHeight" stripe style="background-color:transparent;"
                :cell-style="cellStyle" :header-cell-style="headerCellStyle" width="100%" @row-click="singleElection">
                <el-table-column label="" width="65">
                  <template slot-scope="scope">
                    <el-radio class="radio" v-model="templateSelection" :label="scope.$index">&nbsp;&nbsp;</el-radio>
                  </template>
                </el-table-column>
                <el-table-column label="序号"  type="index" :index="indexMethod" width="100"></el-table-column>
                <el-table-column label="姓名" prop="name" width="100"></el-table-column>
                <el-table-column label="单位" prop="officename" width="300"></el-table-column>
                <el-table-column label="现任职务" prop="presentOccupation" width="200"></el-table-column>
              </el-table>
            </div>
            <div style="width:100%;margin-top:10px;overflow:hidden">
              <el-button type="warning" class="addPeopleBtn" style="float:right" @click="goLink('/AddInfo')">新增</el-button>
            </div>
          </div>
          <div class="personnelframe-btns">
            <el-button @click="personnelpops1=false">取消</el-button>
            <el-button type="primary" @click="getPersonnel">确定</el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
function f(arr, selectedKey) {
  return arr.filter(item => item.value !== selectedKey).map(item => {
    item = Object.assign({}, item)
    if (item.children) {
      item.children = f(item.children, selectedKey)
    }
    return item
  })
}
import Breadcrumb from "../../components/Breadcrumb";
import qs from 'qs'
export default {
  name: "StandBookEnter",
  // props: {},
  data() {
    return {
      getIndex:"",
      arrs: [
        {
          islength: 0,
          ismore: true, //展开-收起
          radiobtn: false, //姓名前面的单选按钮
          id: "",
          disponsalWay: "",//处置方式（为判断走到哪一步，不需要显示）
          //被反应人信息
          personnelid:"",//被反映人id
          personnelName:"",//姓名
          idCard:"",//身份证
          sex: "",//性别
          birthday:"",//出生年月
          maritalStatus:"",//婚姻状况
          nativePlace:"",//籍贯
          educationBackground:"",//文化程度
          politicsStatus:"",//政治面貌
          officeName:"",//工作单位
          phone:"",//联系方式
          nation:"",//民族
          workingState:"",//在职情况
          presentOccupation:"",//职务
          jobLevel:"",//职级
          isCommitteeMember:"",//市委
          // isCommunistPartyMember:"",//市委
          isCityCommissionPartyMembericipal:"",//市纪委
          isCPPCCMemberOrNot:"",//是否政协委员
          isNPCDEputiesOrNot:"",//是否人大代表
          isPartyRepresentativeOrNot:"",//是否党代表
          personalResume:"",//工作简历
          //处置理由
          disposalOfReason: "",//处置理由
          proposedDisposition: "",//拟处置方式
          thereWillBeTime: "",//上会时间
          savedispose:"", //保存时候传的处置方式
          //违纪违法内容
          violationOfPartyDiscipline:"",//六大纪律
          isDeregulation:"",//八项规定
          isFourWindsProblem:"",//四风问题
          // corruption:"",//腐败
          isEighteenthAfter:"",//十八大问题
          isPovertyAlleviationProblem:"",//扶贫
          isAntitriadPutting:"",//涉黑
          isCorruptionLivelihoodSector: "",//是否民生领域腐败
          // 办理情况
          istransferred:"",//是否办结
          // transferredResultname:"",//办理结果
          // transferredResultid:"",//办理结果
          transferredResult:"",
          transferredTime:"",//办结时间
          accountabilityMeans:"",//问责方式
          isHoldDemocraticMeetings:"",//是否召开民主生活会
          holdDemocraticMeetingsTime:"",//召开民主生活会时间
          // execute:"",//处分是否执行到位
          isArchive:"",//是否归档
          isPunishmentExecution:"",
          accountabilityFor: "",//问责事由
          //备注
          // remark1:"",
          // remark2:"",
          
        }
      ],
      ele: 0,
      showRadio: true, //姓名-单选按钮 根据内部人员、单位和外部人员、单位 判断 显示隐藏
      isPack: true,
      delId: "",
      id: "",
      loading:true,
      // itemid: "",
      step:0,//进度步骤
      showinput:false,//工作单位查看时显示
      disabled:false,
      idshow: false,
      show: false,//保存
      updata: false,//更新进度
      nextsave: false,//下一步弹窗里的保存
      personnelpops:false,//保存弹框显示切换
      personnelpops1:false,//查找弹框显示切换
      outOffice:false,//外部单位
      insideOffice:false,//内部单位
      systemtype:"",//保存传的类型 内部：1-人员 2-单位  外部：3-人员 4-单位
      system:{
        systemoffice:"",//系统内部单位
        outOfficeName: "",//系统外部单位
      },
      transactionlist: [],//办理结果 级联选择

      // disponsalWay: "",//处置方式（为判断走到哪一步，不需要显示）
      unitslist: [],//级联选择
      sourcelist: [],//线索来源
      proposedDispositionList: [],//拟处置方式
      violationOfPartyDisciplineList: [],//党六大纪律
      transferredResultList: [],//办理结果
      accountabilityMeansList: [],//问责方式
      sexlist:[],//性别数组
      educationBackgroundList: [],//文化程度数组
      politicallist:[],//政治面貌数组
      marriagelist:[],//婚姻数组
      dutyRankList:[],//职务级别
      workingStateList: [],//在职情况
      isnoList: [],//是否
      tableHeight: "40vh",
      templateSelection: '',
      tableData: [
        // {
          // name:"",//姓名
          // tableoffice:"",//单位
          // tablepost:"",//岗位}
        // {
        //   'id': 1,
        //   'title': '嘿嘿嘿',
        //   'priority': '高',
        //   'state': 1,
        //   'dealingPeople': '小龙女'
        // },
        // {
        //   'id': 2,
        //   'title': 'hengheng',
        //   'priority': '高',
        //   'state': 1,
        //   'dealingPeople': '小龙女'
        // },
        // {
        //     'id': 3,
        //     'title': '嘿嘿嘿',
        //     'priority': '高',
        //     'state': 1,
        //     'dealingPeople': '小龙女'
        // },
        // {
        //   'id': 4,
        //   'title': 'hengheng',
        //   'priority': '高',
        //   'state': 1,
        //   'dealingPeople': '小龙女'
        // },
      ],
      // 处置
      disposition:[],
      //备注
      remarksform:{
        remark1:"",
        remark2:"",
      },
      //办理情况
      // Todealwithsituation:{
      //   istransferred:"",//是否办结
      //   transferredResultname:"",//办理结果
      //   transferredResultid:"",//办理结果
      //   transferredTime:"",//办结时间
      //   accountabilityMeans:"",//问责方式
      //   isHoldDemocraticMeetings:"",//是否召开民主生活会
      //   holdDemocraticMeetingsTime:"",//召开民主生活会时间
      //   execute:"",//处分是否执行到位
      //   isArchive:"",//是否归档
      //   isPunishmentExecution:"",
      //   accountabilityFor: "",//问责事由
      // },
      //违纪违法内容
      // dacform:{
      //   violationOfPartyDiscipline:"",//六大纪律
      //   isDeregulation:"",//八项规定
      //   isFourWindsProblem:"",//四风问题
      //   corruption:"",//腐败
      //   isEighteenthAfter:"",//十八大问题
      //   isPovertyAlleviationProblem:"",//扶贫
      //   isAntitriadPutting:"",//涉黑
      //   isCorruptionLivelihoodSector: "",//是否民生领域腐败
      // },

      // 线索信息表单
      msgform:{
        clueStoTheSource:"",//线索来源
        letterNumber:"",//来件编号
        groupNumber:"",//组内线索编号
        isDuplicateOrNot:"",//是否重复件
        clueNumber:"",//线索件数
        content:"",//反映的主要问题
      },

      // //被反应人信息
      // byfind:{
      //   personnelid:"",//被反映人id
      //   personnelName:"",//姓名
      //   idCard:"",//身份证
      //   sex: "",//性别
      //   birthday:"",//出生年月
      //   maritalStatus:"",//婚姻状况
      //   nativePlace:"",//籍贯
      //   educationBackground:"",//文化程度
      //   politicsStatus:"",//政治面貌
      //   officeName:"",//工作单位
      //   phone:"",//联系方式
      //   nation:"",//民族
      //   workingState:"",//在职情况
      //   presentOccupation:"",//职务
      //   jobLevel:"",//职级
      //   isCommunistPartyMember:"",//市委
      //   isCityCommissionPartyMembericipal:"",//市纪委
      //   isCPPCCMemberOrNot:"",//是否政协委员
      //   isNPCDEputiesOrNot:"",//是否人大代表
      //   isPartyRepresentativeOrNot:"",//是否党代表
      //   personalResume:"",//工作简历
      // },

      //反应人信息
      find:{
        reflectName:"",//姓名
        reflectPhone:"",//联系方式
        reflectunitname:"",//工作单位
        reflectunitid:"",
        reflectPresenToCcupation:"",//职务
      },
      
      //处置理由
      // form: {
      //   disposalOfReason: "",//处置理由
      //   proposedDisposition: "",//拟处置方式
      //   thereWillBeTime: "",//上会时间
      //   savedispose:"", //保存时候传的处置方式
      // },
      rules:{
        clueStoTheSource:[{required: true, message: '请选择线索来源', trigger: 'blur'}],
        groupNumber:[{required: true, message: '请填写组内线索编号', trigger: 'blur'}],
        clueNumber:[{required: true, message: '请填写线索件数', trigger: 'blur'}],
        isDuplicateOrNot:[{required: true, message: '请选择是否重复件', trigger: 'blur'}],
      },
    };
  },
  computed: {},
  created() { 
    document.title = "线索台账录入";
    let that = this
    //线索来源
    this.$ajax({
      method: "POST",
      url: this.globals.requesturl + "web/dict",
      data: { type: "clue_sto_the_source" },
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      transformRequest: [
        function(data) {
          return qs.stringify(data);
        }
      ]
    }).then(res => {
      if (res.data.success && res.data.errorCode == "-1") {
        that.sourcelist = res.data.body.dictValueList;
      } else {
        this.$message.error(res.data.msg);
      }
    });
    //处置方式
    this.$ajax({
      method: "POST",
      url: this.globals.requesturl + "web/dict",
      data: { type: "disponsal_way" },
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      transformRequest: [
        function(data) {
          return qs.stringify(data);
        }
      ]
    }).then(res=>{
      if (res.data.success && res.data.errorCode == "-1") {
        that.proposedDispositionList = res.data.body.dictValueList
      }else{
        this.$message.error(res.data.msg);
      }
    })
    //党六大纪律
    this.$ajax({
      method: "POST",
      url: this.globals.requesturl + "web/dict",
      data: { type: "violation_of_party_discipline" },
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      transformRequest: [
        function(data) {
          return qs.stringify(data);
        }
      ]
    }).then(res=>{
      if (res.data.success && res.data.errorCode == "-1") {
        that.violationOfPartyDisciplineList = res.data.body.dictValueList
        console.log(that.violationOfPartyDisciplineList)
      }else{
        this.$message.error(res.data.msg);
      }
    })
    //办理结果 
    this.$ajax({
      method: "POST",
      url: this.globals.requesturl + "web/dict",
      data: { type: "transferred_result" },
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      transformRequest: [
        function(data) {
          return qs.stringify(data);
        }
      ]
    }).then(res=>{
      if (res.data.success && res.data.errorCode == "-1") {
        that.transferredResultList = res.data.body.dictValueList
      }else{
        this.$message.error(res.data.msg);
      }
    })
    //问责方式
    this.$ajax({
      method: "POST",
      url: this.globals.requesturl + "web/dict",
      data: { type: "accountability_means" },
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      transformRequest: [
        function(data) {
          return qs.stringify(data);
        }
      ]
    }).then(res=>{
      if (res.data.success && res.data.errorCode == "-1") {
        that.accountabilityMeansList = res.data.body.dictValueList
      }else{
        this.$message.error(res.data.msg);
      }
    })
    //性别
    this.$ajax({
      method: "POST",
      url: this.globals.requesturl + 'web/dict',
      data: {type:'sex'},
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: [function (data) { 
        return qs.stringify(data)
      }]
    }).then(res=>{
      if(res.data.success && res.data.errorCode == '-1'){
        that.sexlist = res.data.body.dictValueList
      }else{
        this.$message.error(res.data.msg); 
      }
    })
    //文化程度
    this.$ajax({
      method: "POST",
      url: this.globals.requesturl + 'web/dict',
      data: {type:'education_background'},
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: [function (data) { 
        return qs.stringify(data)
      }]
    }).then(res=>{
      if(res.data.success && res.data.errorCode == '-1'){
        that.educationBackgroundList = res.data.body.dictValueList
      }else{
        this.$message.error(res.data.msg); 
      }
    })
    //政治面貌
    this.$ajax({
      method: "POST",
      url: this.globals.requesturl + 'web/dict',
      data: {type:'politics_status'},
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: [function (data) { 
        return qs.stringify(data)
      }]
    }).then(res=>{
      if(res.data.success && res.data.errorCode == '-1'){
        that.politicallist = res.data.body.dictValueList
      }else{
        this.$message.error(res.data.msg); 
      }
    })
    //婚姻
    this.$ajax({
      method: "POST",
      url: this.globals.requesturl + 'web/dict',
      data: {type:'marital_status'},
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: [function (data) { 
        return qs.stringify(data)
      }]
    }).then(res=>{
      if(res.data.success && res.data.errorCode == '-1'){
        that.marriagelist = res.data.body.dictValueList
      }else{
        this.$message.error(res.data.msg); 
      }
    })
    //职务级别  title_jobs_level
    this.$ajax({
      method: "POST",
      url: this.globals.requesturl + 'web/dict',
      data: {type:'job_level'},
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: [function (data) { 
        return qs.stringify(data)
      }]
    }).then(res=>{
      if(res.data.success && res.data.errorCode == '-1'){
        that.dutyRankList = res.data.body.dictValueList
      }else{
        this.$message.error(res.data.msg); 
      }
    })
    //在职情况
    this.$ajax({
      method: "POST",
      url: this.globals.requesturl + 'web/dict',
      data: {type:'working_state'},
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: [function (data) { 
        return qs.stringify(data)
      }]
    }).then(res=>{
      if(res.data.success && res.data.errorCode == '-1'){
        that.workingStateList = res.data.body.dictValueList
      }else{
        this.$message.error(res.data.msg); 
      }
    })
    //是否
    this.$ajax({
      method: "POST",
      url: this.globals.requesturl + "web/dict",
      data: { type: "yes_no" },
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      transformRequest: [
        function(data) {
          return qs.stringify(data);
        }
      ]
    }).then(res=>{
      if (res.data.success && res.data.errorCode == "-1") {
        that.isnoList = res.data.body.dictValueList
      }else{
        this.$message.error(res.data.msg);
      }
    })
  },
  mounted() {
    if(this.$route.query.isactive == 0 && this.$route.query.radio == 1){ //内部人员
      this.systemtype = 1
      this.insideOffice = false
      this.isPack = false
      this.showRadio = false
    }else if(this.$route.query.isactive == 1 && this.$route.query.radio == 1){ //内部单位
      this.systemtype = 2
      this.insideOffice = true
      this.outOffice = false
    }else if(this.$route.query.isactive == 0 && this.$route.query.radio == 2){ //外部人员
      this.systemtype = 3
      this.isPack = false
    }else if(this.$route.query.isactive == 1 && this.$route.query.radio == 2){ //外部单位
      this.systemtype = 4
      this.outOffice = true
      this.isPack = false
    }

    let id = this.$route.query.id
    // console.log(this.$route.query.ifupdata)
    if(id){
      this.showinput = true
      this.itemid = id
      let objs = {
        userId: JSON.parse(localStorage.getItem('userinfo')).isd,
        id: id
      }
      this.show = this.$route.query.ifupdata == 0 ?true :false
      this.updata = this.$route.query.ifupdata ?true :false
      this.ifupdata = this.$route.query.ifupdata
      this.init(objs)
    }else{
      this.nextsave = true
    }
    this.initunits()
    this.transactionresultList()
  },
  methods: {
    //下标处理
    indexMethod(index){
      return index+1>9?index+1:'0'+(index+1)
    },
    // 表格样式的处理
    cellStyle({ row, column, rowIndex, columnIndex }) {
      //基数偶数延时不同
      if (rowIndex % 2 != 0) {
        return {
          "background-color": "#2162A8",
          "text-align": "center",
          color: "#fff",
          "font-weight": "normal",
          padding: "5px 0",
          height: "60px"
        };
      } else {
        return {
          "background-color": "#02468F",
          "text-align": "center",
          color: "#fff",
          "font-weight": "normal",
          padding: "5px 0",
          height: "60px"
        };
      }
    },
    headerCellStyle({ row, rowIndex }) {
      return {
        "background-color": "#027DBC",
        "text-align": "center",
        color: "#fff",
        "font-weight": "normal",
        "font-size": "16px"
      };
    },
    //初始化
    init(objs){
      let that = this
      this.$ajax({
        method:"POST",
        url: that.globals.requesturl + 'web/cluesparameter/form',
        data: objs,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: [function (data) { 
          return qs.stringify(data)
        }]
      }).then(res=>{
        if(res.data.success && res.data.errorCode == '-1'){
          // console.log(res.data.body.type)
          // console.log(this.arrs)
          //处置方式判断
          if(res.data.body.disponsalWay == 0){
            that.disponsalWay = 0
            that.isShow = false
            that.step = 0
          }else if(res.data.body.disponsalWay == 0){
            that.disponsalWay = 1
            that.step = 1
            // that.isShow = false
          }else if(res.data.body.disponsalWay == 2 || res.data.body.disponsalWay == 3 || res.data.body.disponsalWay == 4 || res.data.body.disponsalWay == 5 || res.data.body.disponsalWay == 6 || res.data.body.disponsalWay == 7 || res.data.body.disponsalWay == 8 || res.data.body.disponsalWay == 9){
            that.disponsalWay = 2
            that.step = 2
          }else if(res.data.body.disponsalWay == 10){
            that.disponsalWay = 3
            that.step = 3
          }else if(res.data.body.disponsalWay == 11){
            that.disponsalWay == 4
            that.step = 4
            that.isShow = false
          }
          // that.step = that.disponsalWay
          // that.step = res.data.body.disponsalWay
          // console.log(that.step)

          //根据type判断显示的内部人员、单位 或 外部人员、单位
          if(res.data.body.type == 1){ //内部人员
            this.isPack = false
          }else if(res.data.body.type == 2){ //内部单位
            this.insideOffice = true
          }else if(res.data.body.type == 3){ //外部人员
            this.isPack = false
          }else if(res.data.body.type == 4){ //外部单位
            this.outOffice = true
            this.isPack = false
          }
          // type如果是1 3 4返回的是对象 如果是2返回的数组
          if(res.data.body.type == 1 || res.data.body.type == 3 || res.data.body.type == 4){
            this.arrs = []
            let obj = {
              islength: 0,
              ismore: true, //展开-收起
              radiobtn: false, //姓名前面的单选按钮
              id: res.data.body.id,
              disponsalWay: "",//处置方式（为判断走到哪一步，不需要显示）
              //被反应人信息
              personnelid: res.data.body.personnel.id,//被反映人id
              personnelName: res.data.body.personnel.name,//姓名
              // idCard:"",//身份证
              sex: res.data.body.personnel.sex,//性别
              birthday: res.data.body.personnel.birthday,//出生年月
              maritalStatus: res.data.body.personnel.maritalStatus,//婚姻状况
              nativePlace: res.data.body.personnel.nativePlace,//籍贯
              educationBackground: res.data.body.personnel.educationBackground,//文化程度
              politicsStatus: res.data.body.personnel.politicsStatus,//政治面貌
              officeName: res.data.body.personnel.office.name,//工作单位
              phone: res.data.body.personnel.phone,//联系方式
              nation: res.data.body.personnel.nation,//民族
              workingState: res.data.body.personnel.workingState,//在职情况
              presentOccupation: res.data.body.personnel.presentOccupation,//职务
              jobLevel: res.data.body.personnel.jobLevel,//职级
              isCommitteeMember: res.data.body.personnel.isCommitteeMember,//市委
              // isCommunistPartyMember:"",//市委
              isCityCommissionPartyMembericipal: res.data.body.personnel.isCityCommissionPartyMembericipal,//市纪委
              isCPPCCMemberOrNot: res.data.body.personnel.isCPPCCMemberOrNot,//是否政协委员
              isNPCDEputiesOrNot: res.data.body.personnel.isNPCDEputiesOrNot,//是否人大代表
              isPartyRepresentativeOrNot: res.data.body.personnel.isPartyRepresentativeOrNot,//是否党代表
              personalResume: res.data.body.personnel.personalResume,//工作简历
              //处置理由
              disposalOfReason: res.data.body.disposalOfReason,//处置理由
              proposedDisposition: res.data.body.proposedDisposition,//拟处置方式
              thereWillBeTime: res.data.body.thereWillBeTime,//上会时间
              savedispose: res.data.body.disponsalWay, //保存时候传的处置方式
              //违纪违法内容
              violationOfPartyDiscipline: list.violationOfPartyDiscipline != "" ? list.violationOfPartyDiscipline.split(","):[],//六大纪律
              isDeregulation: list.isDeregulation,//八项规定
              isFourWindsProblem: list.isFourWindsProblem,//四风问题
              isEighteenthAfter: list.isEighteenthAfter,//十八大问题
              isPovertyAlleviationProblem: list.isPovertyAlleviationProblem,//扶贫
              isAntitriadPutting: list.isAntitriadPutting,//涉黑
              isCorruptionLivelihoodSector: list.isCorruptionLivelihoodSector,//是否民生领域腐败
              // 办理情况
              istransferred: list.istransferred,//是否办结
              // transferredResultname:"",//办理结果
              // transferredResultid:"",//办理结果
              transferredResult: "",
              transferredTime: res.data.body.transferredTime,//办结时间
              accountabilityMeans: res.data.body.accountabilityMeans,//问责方式
              isHoldDemocraticMeetings: res.data.body.isHoldDemocraticMeetings,//是否召开民主生活会
              holdDemocraticMeetingsTime: res.data.body.isHoldDemocraticMeetings,//召开民主生活会时间
              // execute: "",//处分是否执行到位
              isArchive: res.data.body.isArchive,//是否归档
              isPunishmentExecution: res.data.body.isPunishmentExecution,
              accountabilityFor: res.data.body.accountabilityFor,//问责事由
              //备注
              // remark1:"",
              // remark2:"",
            }
            that.arrs.push(obj)
          }
          //页面渲染
          that.system.outOfficeName = res.data.body.outOfficeName,
          // that.form.savedispose = res.data.body.disponsalWay //保存时候传的处置方式
          // console.log(that.form.savedispose)
          that.msgform.letterNumber = res.data.body.letterNumber
          that.msgform.groupNumber = res.data.body.groupNumber 
          that.msgform.clueNumber = res.data.body.clueNumber
          that.msgform.content = res.data.body.content
          that.msgform.clueStoTheSource = res.data.body.clueStoTheSource
          that.msgform.isDuplicateOrNot = res.data.body.isDuplicateOrNot
          that.find.reflectPresenToCcupation = res.data.body.reflectPresenToCcupation
          that.find.reflectName = res.data.body.reflectName
          that.find.reflectPhone = res.data.body.reflectPhone
          that.find.reflectunitname = res.data.body.reflectunit.name//反映人单位
          that.find.reflectunitid = res.data.body.reflectunit.id//反映人单位id
          // type如果是1 3 4返回的是对象 如果是2返回的是数组
          let cluesParameterChildrenList = res.data.body.cluesParameterChildrenList
          let addPersonnelArr = [],typeOtherArr = []; 
          if(cluesParameterChildrenList.length > 0){
            for(let i = 0; i < cluesParameterChildrenList.length; i++){
              let list = cluesParameterChildrenList[i]
              console.log(list)
              let obj = {
                islength: 0,
                ismore: true, //展开-收起
                radiobtn: false, //姓名前面的单选按钮
                id: list.id,
                disponsalWay: "",//处置方式（为判断走到哪一步，不需要显示）
                //被反应人信息
                personnelid: list.personnel.id,//被反映人id
                personnelName: list.personnel.name,//姓名
                // idCard:"",//身份证
                sex: list.personnel.sex,//性别
                birthday: list.personnel.birthday,//出生年月
                maritalStatus: list.personnel.maritalStatus,//婚姻状况
                nativePlace:list.personnel.nativePlace,//籍贯
                educationBackground: list.personnel.educationBackground,//文化程度
                politicsStatus: list.personnel.politicsStatus,//政治面貌
                officeName: list.personnel.office.name,//工作单位
                phone: list.personnel.phone,//联系方式
                nation: list.personnel.nation,//民族
                workingState: list.personnel.workingState,//在职情况
                presentOccupation: list.personnel.presentOccupation,//职务
                jobLevel: list.personnel.jobLevel,//职级
                isCommitteeMember: list.personnel.isCommitteeMember,//市委
                // isCommunistPartyMember:"",//市委
                isCityCommissionPartyMembericipal: list.personnel.isCityCommissionPartyMembericipal,//市纪委
                isCPPCCMemberOrNot: list.personnel.isCPPCCMemberOrNot,//是否政协委员
                isNPCDEputiesOrNot: list.personnel.isNPCDEputiesOrNot,//是否人大代表
                isPartyRepresentativeOrNot: list.personnel.isPartyRepresentativeOrNot,//是否党代表
                personalResume: list.personnel.personalResume,//工作简历
                //处置理由
                disposalOfReason: list.disposalOfReason,//处置理由
                proposedDisposition: list.proposedDisposition,//拟处置方式
                thereWillBeTime: list.thereWillBeTime,//上会时间
                // savedispose:"", //保存时候传的处置方式
                //违纪违法内容
                violationOfPartyDiscipline: list.violationOfPartyDiscipline != "" ? list.violationOfPartyDiscipline.split(","):[],//六大纪律
                isDeregulation: list.isDeregulation,//八项规定
                isFourWindsProblem: list.isFourWindsProblem,//四风问题
                isEighteenthAfter: list.isEighteenthAfter,//十八大问题
                isPovertyAlleviationProblem: list.isPovertyAlleviationProblem,//扶贫
                isAntitriadPutting: list.isAntitriadPutting,//涉黑
                isCorruptionLivelihoodSector: list.isCorruptionLivelihoodSector,//是否民生领域腐败
                // 办理情况
                istransferred: list.istransferred,//是否办结
                // transferredResultname:"",//办理结果
                // transferredResultid:"",//办理结果
                transferredResult: "",
                transferredTime: list.transferredTime,//办结时间
                accountabilityMeans: list.accountabilityMeans,//问责方式
                isHoldDemocraticMeetings: list.isHoldDemocraticMeetings,//是否召开民主生活会
                holdDemocraticMeetingsTime: list.isHoldDemocraticMeetings,//召开民主生活会时间
                // execute: "",//处分是否执行到位
                isArchive: list.isArchive,//是否归档
                isPunishmentExecution: list.isPunishmentExecution,
                accountabilityFor: list.accountabilityFor,//问责事由
                //备注
                // remark1:"",
                // remark2:"",
              }
              if(cluesParameterChildrenList[i].recordList.lenght > 0){
                console.log(222)
                for(let j = 0; j < cluesParameterChildrenList[i].recordList.lenght; j++){
                  let listRecordList = cluesParameterChildrenList[i].recordList[j]
                  console.log(111)
                  console.log(listRecordList)
                }
              }
              addPersonnelArr.push(obj);
            }
            that.arrs = addPersonnelArr;
          }
          // res.data.body.recordList.map(function(list){
          //   that.disposition.push(list)
          // })

          // that.byfind.personnelid = res.data.body.personnel.id
          // that.byfind.personnelName = res.data.body.personnel.name
          // that.byfind.idCard = res.data.body.personnel.idCard
          // that.byfind.sex = res.data.body.personnel.sex
          // that.byfind.birthday = res.data.body.personnel.birthday
          // that.byfind.maritalStatus = res.data.body.personnel.maritalStatus
          // that.byfind.nativePlace = res.data.body.personnel.nativePlace
          // that.byfind.educationBackground = res.data.body.personnel.educationBackground
          // that.byfind.politicsStatus = res.data.body.personnel?res.data.body.personnel.politicsStatus:""
          // that.byfind.officeName = res.data.body.personnel&&res.data.body.personnel.office?res.data.body.personnel.office.name:""
          // that.byfind.phone = res.data.body.personnel.phone
          // that.byfind.nation = res.data.body.personnel.nation
          // that.byfind.presentOccupation = res.data.body.personnel.presentOccupation
          // that.byfind.jobLevel = res.data.body.personnel.jobLevel
          // that.byfind.personalResume = res.data.body.personnel.personalResume
          // that.form.disposalOfReason = res.data.body.disposalOfReason
          // that.form.thereWillBeTime = res.data.body.thereWillBeTime
          // that.Todealwithsituation.transferredTime = res.data.body.transferredTime
          // that.Todealwithsituation.holdDemocraticMeetingsTime = res.data.body.holdDemocraticMeetingsTime 
          // that.Todealwithsituation.accountabilityFor = res.data.body.accountabilityFor
          // that.remarksform.remark1 = res.data.body.remark1
          // that.remarksform.remark2 = res.data.body.remark2
          // that.form.proposedDisposition = res.data.body.proposedDisposition
          // that.dacform.violationOfPartyDiscipline = res.data.body.violationOfPartyDiscipline != "" ? res.data.body.violationOfPartyDiscipline.split(","):[]
          // // that.Todealwithsituation.transferredResultname = res.data.body.transferredResult.name//办理结果
          // // that.Todealwithsituation.transferredResultid = res.data.body.transferredResult.id//办理结果id
          // that.Todealwithsituation.transferredResult = res.data.body.transferredResult//办理结果id
          // that.Todealwithsituation.accountabilityMeans = res.data.body.accountabilityMeans
          // that.byfind.maritalStatus = res.data.body.personnel.maritalStatus
          // that.byfind.workingState = res.data.body.personnel.workingState
          // that.msgform.isDuplicateOrNot = res.data.body.isDuplicateOrNot
          // that.dacform.isDeregulation = res.data.body.isDeregulation
          // that.dacform.isFourWindsProblem = res.data.body.isFourWindsProblem
          // that.dacform.isEighteenthAfter = res.data.body.isEighteenthAfter
          // that.dacform.isPovertyAlleviationProblem = res.data.body.isPovertyAlleviationProblem
          // that.dacform.isAntitriadPutting = res.data.body.isAntitriadPutting
          // that.dacform.isCorruptionLivelihoodSector = res.data.body.isCorruptionLivelihoodSector
          // that.Todealwithsituation.istransferred = res.data.body.istransferred
          // that.Todealwithsituation.isHoldDemocraticMeetings = res.data.body.isHoldDemocraticMeetings
          // that.Todealwithsituation.isPunishmentExecution = res.data.body.isPunishmentExecution
          // that.Todealwithsituation.isArchive = res.data.body.isArchive
          // that.byfind.isCommunistPartyMember = res.data.body.personnel.isCommunistPartyMember
          // that.byfind.isCityCommissionPartyMember = res.data.body.personnel.isCityCommissionPartyMember
          // // ====================== 新增三个是否 ==========================
          // that.byfind.isCPPCCMemberOrNot = res.data.body.personnel.isCPPCCMemberOrNot
          // that.byfind.isNPCDEputiesOrNot = res.data.body.personnel.isNPCDEputiesOrNot
          // that.byfind.isPartyRepresentativeOrNot = res.data.body.personnel.isPartyRepresentativeOrNot
          // // ==============================================================
          // res.data.body.recordList.map(function(list){
          //   that.disposition.push(list)
          // })
        }else{
          this.$message.error(res.data.msg);
        }
      })
    },
    // 查询单位
    initunits(){
      let that = this; 
      let objs = {
        userId: JSON.parse(localStorage.getItem('userinfo')).isd,
      } 
      this.$ajax({
        method: "POST",
        url: that.globals.requesturl + 'web/office/list',
        data: objs,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: [function (data) { 
          return qs.stringify(data)
        }]
      }).then(res=>{
        if(res.data.errorCode == "-1"){
          let lists = [];
          that.unitslist = res.data.body.officeList.map(function(list,index){
            return {
              id: list.id,
              name: list.name,
              children: []
            }
          })
        }else{
          this.$message.error(res.data.msg); 
        }
      })
    },
    //级联事件
    unitChanges(data) {
      console.log(data)
      console.log(data[data.length-1])
      let that = this;
      let objs = {
        userId: JSON.parse(localStorage.getItem('userinfo')).isd,
        parentId:data[data.length-1]
      } 
      this.$ajax({
        method: "POST",
        url: that.globals.requesturl + 'web/office/getChildren',
        data: objs,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: [function (data) { 
          return qs.stringify(data)
        }]
      }).then(res=>{
        if(res.data.errorCode == "-1"){
          if(data.length == 1){
            that.unitslist.map(function(list,index){
              if(list.id == data[0]){
                if(!list.children.length){
                  list.children = res.data.body.officeList.map(function(list,index){
                    return {
                      id: list.id,
                      name: list.name,
                      children: list.hasChildren==false?"":[]
                    }
                  })
                }
              }
            })
          }else if(data.length == 2){
            that.unitslist.map(function(list,index){
              if(list.id == data[0]){
                list.children.map(function(list,index){
                  if(list.id == data[1]){
                    if(!list.children.length){
                      list.children = res.data.body.officeList.map(function(list,index){
                        return {
                          id: list.id,
                          name: list.name,
                          children:list.hasChildren==false?"":[]
                        }
                      })
                    }
                  }
                })
              }
            })
          }
        }else{
          this.$message.error(res.data.msg); 
        }
      })
    },
    // 办理结果
    transactionresultList(){
      let that = this; 
      let objs = {
        userId: JSON.parse(localStorage.getItem('userinfo')).isd,
      } 
      this.$ajax({
        method: "POST",
        url: that.globals.requesturl + 'web/transactionresult/list',
        data: objs,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: [function (data) { 
          return qs.stringify(data)
        }]
      }).then(res=>{
        if(res.data.errorCode == "-1"){
          // console.log(res.data)
          let lists = [];
          that.transactionlist = res.data.body.transactionResultList.map(function(list,index){
            return {
              id: list.id,
              name: list.name,
              children: list.hasChildren==0?"":[]
            }
          })
        }else{
          this.$message.error(res.data.msg); 
        }
      })
    },
    // 办理结果级联事件
    transactionChanges(data) {
      // console.log(data)
      // console.log(data[data.length-1])
      let that = this;
      let objs = {
        userId: JSON.parse(localStorage.getItem('userinfo')).isd,
        parentId:data[data.length-1]
      } 
      this.$ajax({
        method: "POST",
        url: that.globals.requesturl + 'web/transactionresult/getChildren',
        data: objs,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: [function (data) { 
          return qs.stringify(data)
        }]
      }).then(res=>{
        if(res.data.errorCode == "-1"){
          if(data.length == 1){
            that.transactionlist.map(function(list,index){
              if(list.id == data[0]){
                if(!list.children.length){
                  list.children = res.data.body.transactionResultList.map(function(list,index){
                    console.log("hasChildren:"+list.hasChildren)
                    return {
                      id: list.id,
                      name: list.name,
                      children: list.hasChildren==0?"":[]
                    }
                  })
                }
              }
            })
          }
          // else if(data.length == 2){
          //   that.transactionlist.map(function(list,index){
          //     if(list.id == data[0]){
          //       list.children.map(function(list,index){
          //         if(list.id == data[1]){
          //           if(!list.children.length){
          //             list.children = res.data.body.officeList.map(function(list,index){
          //               return {
          //                 id: list.id,
          //                 name: list.name,
          //                 children:list.hasChildren==false?"":[]
          //               }
          //             })
          //           }
          //         }
          //       })
          //     }
          //   })
          // }
        }else{
          this.$message.error(res.data.msg); 
        }
      })
    },
    //保存
    savebtns(){
      this.personnelpops = true
    },
    //保存弹窗确定按钮
    submitchangeunit(formName){
      console.log(this.arrs)
      let that = this
      this.personnelpops = false
      this.$refs[formName].validate((valid) => {
        if(valid){
          let officePersonnel = this.arrs
          // let id = that.itemid
          // that.arrs.push(id)
          let forminfo = {
            type: this.$route.query.type ? this.$route.query.type : this.systemtype,
            outOfficeName: that.system.outOfficeName,
            id: that.itemid, //id
            // "personnel.id": that.byfind.personnelid,//被反应人id
            reflectName: that.find.reflectName,//反映人姓名
            // "reflectunit.id": that.find.reflectunitname?that.find.reflectunitname[that.find.reflectunitname.length-1]:'',//反映人单位id
            "reflectunit.id": typeof(that.find.reflectunitname) == 'string' ? that.find.reflectunitid : that.find.reflectunitname[that.find.reflectunitname.length-1],//反映人单位id
            reflectPresenToCcupation: that.find.reflectPresenToCcupation,//反映人职务
            reflectPhone: that.find.reflectPhone,//反映人联系方式
            clueStoTheSource: that.msgform.clueStoTheSource,//线索来源
            letterNumber: that.msgform.letterNumber,//来件编号
            groupNumber: that.msgform.groupNumber,//组内线索编号
            clueNumber: that.msgform.clueNumber,//线索件数
            content: that.msgform.content,//反映的主要问题
            isDuplicateOrNot: that.msgform.isDuplicateOrNot,//来件编号
            officePersonnelList: JSON.stringify(this.arrs) ? JSON.stringify(this.arrs):[],
            // "officePersonnelList[0].proposedDisposition": "",//拟处置方式
            // // proposedDisposition: that.form.proposedDisposition,//拟处置方式
            // "officePersonnelList[0].thereWillBeTime": "",//上会时间
            // // thereWillBeTime: that.form.thereWillBeTime,//上会时间
            // "officePersonnelList[0].disposalOfReason": "",//处置理由
            // // disposalOfReason: that.form.disposalOfReason,//处置理由
            // "officePersonnelList[0].disponsalWay": "",//处置方式
            // // // disponsalWay: that.disponsalWay,//处置方式
            // // disponsalWay: that.form.savedispose,//处置方式
            // "officePersonnelList[0].violationOfPartyDiscipline": "",//违反党六大纪律
            // // violationOfPartyDiscipline: that.dacform.violationOfPartyDiscipline.length>0?that.dacform.violationOfPartyDiscipline.join(","):"",//违反党六大纪律
            // "officePersonnelList[0].isDeregulation": "",//是否违反中央八项规定
            // // isDeregulation: that.dacform.isDeregulation,//是否违反中央八项规定
            // "officePersonnelList[0].isFourWindsProblem": "",//是否存在“四风”问题
            // // isFourWindsProblem: that.dacform.isFourWindsProblem,//是否存在“四风”问题
            // "officePersonnelList[0].isEighteenthAfter": "",//是否十八大以后问题
            // // isEighteenthAfter: that.dacform.isEighteenthAfter,//是否十八大以后问题
            // "officePersonnelList[0].isPovertyAlleviationProblem": "",//是否涉及扶贫领域问题
            // // isPovertyAlleviationProblem: that.dacform.isPovertyAlleviationProblem,//是否涉及扶贫领域问题
            // "officePersonnelList[0].isAntitriadPutting": "",//是否涉及扫黑除恶
            // // isAntitriadPutting: that.dacform.isAntitriadPutting,//是否涉及扫黑除恶
            // "officePersonnelList[0].istransferred": "",//是否办结
            // // istransferred: that.Todealwithsituation.istransferred,//是否办结
            // "officePersonnelList[0].transferredResult": "",//办理结果
            // // // transferredResult: that.Todealwithsituation.transferredResult,//办理结果
            // // // transferredResult: typeof(that.Todealwithsituation.transferredResult) == 'string' ? that.Todealwithsituation.transferredResultid : that.Todealwithsituation.transferredResult[that.Todealwithsituation.transferredResult.length-1],
            // "officePersonnelList[0].accountabilityMeans": "",//问责方式
            // // accountabilityMeans: that.Todealwithsituation.accountabilityMeans,//问责方式
            // "officePersonnelList[0].isHoldDemocraticMeeti": "",//是否召开民主生活会
            // // isHoldDemocraticMeetings: that.Todealwithsituation.isHoldDemocraticMeetings,//是否召开民主生活会
            // "officePersonnelList[0].holdDemocraticMeetingsTime": "",//民主生活会召开时间
            // // holdDemocraticMeetingsTime: that.Todealwithsituation.holdDemocraticMeetingsTime, //民主生活会召开时间

            // // transferredTime:that.Todealwithsituation.transferredTime, //办结时间
            // // thereWillBeTime:that.form.thereWillBeTime,//上会时间
            // "officePersonnelList[0].isPunishmentExecution": "",//处分是否执行到位
            // // isPunishmentExecution: that.Todealwithsituation.isPunishmentExecution,//处分是否执行到位
            // "officePersonnelList[0].isCommitteeMember": "",//是否市纪委委员
            // // isCommitteeMember:that.byfind.isCommunistPartyMember, //是否市纪委委员
            // // remark1: that.remarksform.remark1,
            // // remark2: that.remarksform.remark2,
            // // isArchive:that.Todealwithsituation.isArchive,
            // "officePersonnelList[0].accountabilityFor": "",//问责事由
            // // accountabilityFor: that.Todealwithsituation.accountabilityFor,//问责事由
            // "officePersonnelList[0].isCorruptionLivelihoodSector": "",//是否民生领域腐败
            // isCorruptionLivelihoodSector: that.dacform.isCorruptionLivelihoodSector,//是否民生领域腐败

            // reflectunitname:that.find.reflectunitname?that.find.reflectunitname:"",
            userId: JSON.parse(localStorage.getItem('userinfo')).isd,
            problemClueDisposalRecords: JSON.stringify(that.disposition)
          }
          this.$ajax({
            method: "POST",
            url: that.globals.requesturl + 'web/cluesparameter/save',
            data: forminfo,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: [function (data) { 
              return qs.stringify(data)
            }]
          }).then(res=>{
            if(res.data.errorCode == "-1"){
              console.log(this.systemtype)
              this.$message.success(res.data.msg); 
              // this.cluesParameter = res.data.body.id
              this.$router.push({path: '/updateprogress',query: {id: res.data.body.id}})
            }else{
              this.$message.error(res.data.msg); 
            }
          })
        }else{
          return false;
        }
      })
    },
    //查找人员列表
    getPersonnelList(item,index){
      this.getIndex = index
      let that = this
      let objs = {
        name: item.personnelName,
        // idCard: that.byfind.idCard
        type: this.systemtype
      }
      this.$ajax({
        method:"POST",
        url: that.globals.requesturl + 'web/cluesparameter/getPersonnelList',
        data: objs,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: [function (data) { 
          return qs.stringify(data)
        }]
      }).then(res=>{
        if(res.data.success && res.data.errorCode == '-1'){
          let that = this
          this.personnelpops1 = true
          // console.log(res.data)
          let personnelList = []
          res.data.body.personnelList.map(function(list){
            personnelList.push({
              id: list.id,
              name: list.name,
              presentOccupation: list.presentOccupation,
              officename: list.office.name
            })
            console.log(personnelList)
            that.tableData = personnelList
          })
        }else{
          this.$message.error(res.data.msg); 
        }
      })
    },
    // 查询里的确定按钮 查找人员详细信息
    getPersonnel(){
      console.log(this.templateRadio)
      let that = this
      let objs = {
        id: this.templateRadio
      }
      this.$ajax({
        method:"POST",
        url: that.globals.requesturl + 'web/cluesparameter/getPersonnel',
        data: objs,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: [function (data) { 
          return qs.stringify(data)
        }]
      }).then(res=>{
        if(res.data.success && res.data.errorCode == '-1'){
          console.log(res.data.body)
          console.log(this.arrs)
          console.log(this.getIndex)
          this.arrs[this.getIndex].personnelid = res.data.body.personnel.id
          this.arrs[this.getIndex].personnelName = res.data.body.personnel.name
          this.arrs[this.getIndex].idCard = res.data.body.personnel.idCard
          this.arrs[this.getIndex].sex = res.data.body.personnel.sex
          this.arrs[this.getIndex].birthday = res.data.body.personnel.birthday
          this.arrs[this.getIndex].maritalStatus = res.data.body.personnel.maritalStatus
          this.arrs[this.getIndex].nativePlace = res.data.body.personnel.nativePlace
          this.arrs[this.getIndex].educationBackground = res.data.body.personnel.educationBackground
          this.arrs[this.getIndex].politicsStatus = res.data.body.personnel.politicsStatus
          // this.arrs[this.getIndex].officeName = res.data.body.officeName // 工作单位
          this.arrs[this.getIndex].officeName = res.data.body.personnel.office.name
          this.arrs[this.getIndex].phone = res.data.body.personnel.phone
          this.arrs[this.getIndex].nation = res.data.body.personnel.nation
          this.arrs[this.getIndex].workingState = res.data.body.personnel.workingState
          this.arrs[this.getIndex].presentOccupation = res.data.body.personnel.presentOccupation
          this.arrs[this.getIndex].jobLevel = res.data.body.personnel.jobLevel
          this.arrs[this.getIndex].personalResume = res.data.body.personnel.personalResume
          this.arrs[this.getIndex].isCityCommissionPartyMember = res.data.body.personnel.isCityCommissionPartyMember
          this.arrs[this.getIndex].isCPPCCMemberOrNot = res.data.body.personnel.isCPPCCMemberOrNot
          this.arrs[this.getIndex].isCommunistPartyMember = res.data.body.personnel.isCommunistPartyMember
          this.arrs[this.getIndex].isNPCDEputiesOrNot = res.data.body.personnel.isNPCDEputiesOrNot
          this.arrs[this.getIndex].isPartyRepresentativeOrNot = res.data.body.personnel.isPartyRepresentativeOrNot

          that.workingStateList.map(function(list){
            console.log(that.arrs)
            if(list.value == res.data.body.personnel.workingState){ 
              that.arrs[that.getIndex].workingState = list.label
            }
          })
          this.personnelpops1 = false
        }else{
          this.$message.error(res.data.msg); 
        }
      })
    },
    // 查询弹窗单选按钮事件
    singleElection (row) {
      this.templateSelection = this.tableData.indexOf(row);
      this.templateRadio = row.id;
      console.log(this.templateSelection)
      console.log(this.templateRadio)
    },
    // 页面跳转 查询弹窗新增
    goLink(e) {
      this.$router.push({path: e,});
    },
    //跳转更新进度页面
    updateProgress(formName){
      if(!this.$route.query.ifupdata){
        let that = this
        this.personnelpops = false
        this.$refs[formName].validate((valid) => {
          if(valid){
            let forminfo = {
              type: this.systemtype,
              outOfficeName: that.system.outOfficeName,
              id: that.itemid,
              reflectName: that.find.reflectName,
              reflectPresenToCcupation: that.find.reflectPresenToCcupation,
              reflectPhone: that.find.reflectPhone,
              clueStoTheSource: that.msgform.clueStoTheSource,
              letterNumber: that.msgform.letterNumber,
              groupNumber: that.msgform.groupNumber,
              clueNumber: that.msgform.clueNumber,
              content: that.msgform.content,
              proposedDisposition: that.form.proposedDisposition,
              thereWillBeTime: that.form.thereWillBeTime,//上会时间
              holdDemocraticMeetingsTime: that.Todealwithsituation.holdDemocraticMeetingsTime, //民主生活会召开时间
              transferredTime:that.Todealwithsituation.transferredTime, //办结时间
              disposalOfReason: that.form.disposalOfReason,
              // disponsalWay: that.disponsalWay,//处置方式
              disponsalWay: that.form.savedispose,//处置方式
              violationOfPartyDiscipline: that.dacform.violationOfPartyDiscipline.length>0?that.dacform.violationOfPartyDiscipline.join(","):"",
              isDeregulation: that.dacform.isDeregulation,
              isFourWindsProblem: that.dacform.isFourWindsProblem,
              isDuplicateOrNot: that.msgform.isDuplicateOrNot,
              isEighteenthAfter: that.dacform.isEighteenthAfter,
              isPovertyAlleviationProblem: that.dacform.isPovertyAlleviationProblem,
              isAntitriadPutting: that.dacform.isAntitriadPutting,
              istransferred: that.Todealwithsituation.istransferred,
              // transferredResult: that.Todealwithsituation.transferredResult,//办理结果
              transferredResult: typeof(that.Todealwithsituation.transferredResult) == 'string' ? that.Todealwithsituation.transferredResult : that.Todealwithsituation.transferredResult[that.Todealwithsituation.transferredResult.length-1],
              accountabilityMeans: that.Todealwithsituation.accountabilityMeans,
              isHoldDemocraticMeetings: that.Todealwithsituation.isHoldDemocraticMeetings,
              holdDemocraticMeetingsTime: that.Todealwithsituation.holdDemocraticMeetingsTime,
              isPunishmentExecution: that.Todealwithsituation.isPunishmentExecution,
              isCommitteeMember:that.byfind.isCommunistPartyMember, //是否市纪委委员
              remark1: that.remarksform.remark1,
              remark2: that.remarksform.remark2,
              isArchive:that.Todealwithsituation.isArchive,
              accountabilityFor: that.Todealwithsituation.accountabilityFor,
              isCorruptionLivelihoodSector: that.dacform.isCorruptionLivelihoodSector,
              // "reflectunit.id": that.find.reflectunitname?that.find.reflectunitname[that.find.reflectunitname.length-1]:'',
              "reflectunit.id": typeof(that.find.reflectunitname) == 'string' ? that.find.reflectunitid : that.find.reflectunitname[that.find.reflectunitname.length - 1],//反映人单位id
              "personnel.id": that.byfind.personnelid,
              userId: JSON.parse(localStorage.getItem('userinfo')).isd,
              problemClueDisposalRecords: JSON.stringify(that.disposition)
            }
            this.$ajax({
              method: "POST",
              url: that.globals.requesturl + 'web/cluesparameter/save',
              data: forminfo,
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              transformRequest: [function (data) { 
                return qs.stringify(data)
              }]
            }).then(res=>{
              if(res.data.errorCode == "-1"){
                this.$message.success(res.data.msg); 
                let ifupdata = this.$route.query.ifupdata
                this.$router.push({path: '/updateprogress',query: {id:this.itemid,ifupdata:ifupdata}})
              }else{
                this.$message.error(res.data.msg); 
              }
            })
          }else{
            return false;
          }
        })
      }else{
        let ifupdata = this.$route.query.ifupdata
        this.$router.push({path: '/updateprogress',query: {id:this.itemid,ifupdata:ifupdata}})
      }
    },
    // 系统内部单位添加人员
    addPeopleBtn(){
      this.ele +=1;
      console.log(this.ele)
      if(this.ele >= 1){
        var isadd = {
          islength: this.ele,
          ismore: false,
          radiobtn:false,
          id: "",
          disponsalWay: "",//处置方式（为判断走到哪一步，不需要显示）
          //被反应人信息
          personnelid:"",//被反映人id
          personnelName:"",//姓名
          idCard:"",//身份证
          sex: "",//性别
          birthday:"",//出生年月
          maritalStatus:"",//婚姻状况
          nativePlace:"",//籍贯
          educationBackground:"",//文化程度
          politicsStatus:"",//政治面貌
          officeName:"",//工作单位
          phone:"",//联系方式
          nation:"",//民族
          workingState:"",//在职情况
          presentOccupation:"",//职务
          jobLevel:"",//职级
          isCommitteeMember:"",
          // isCommunistPartyMember:"",//市委
          isCityCommissionPartyMembericipal:"",//市纪委
          isCPPCCMemberOrNot:"",//是否政协委员
          isNPCDEputiesOrNot:"",//是否人大代表
          isPartyRepresentativeOrNot:"",//是否党代表
          personalResume:"",//工作简历
          //处置理由
          disposalOfReason: "",//处置理由
          proposedDisposition: "",//拟处置方式
          thereWillBeTime: "",//上会时间
          savedispose:"", //保存时候传的处置方式
          //违纪违法内容
          violationOfPartyDiscipline:"",//六大纪律
          isDeregulation:"",//八项规定
          isFourWindsProblem:"",//四风问题
          corruption:"",//腐败
          isEighteenthAfter:"",//十八大问题
          isPovertyAlleviationProblem:"",//扶贫
          isAntitriadPutting:"",//涉黑
          isCorruptionLivelihoodSector: "",//是否民生领域腐败
          // 办理情况
          istransferred:"",//是否办结
          transferredResultname:"",//办理结果
          transferredResult:"",//办理结果
          transferredTime:"",//办结时间
          accountabilityMeans:"",//问责方式
          isHoldDemocraticMeetings:"",//是否召开民主生活会
          holdDemocraticMeetingsTime:"",//召开民主生活会时间
          execute:"",//处分是否执行到位
          isArchive:"",//是否归档
          isPunishmentExecution:"",
          accountabilityFor: "",//问责事由
          //备注
          // remark1:"",
          // remark2:"",
        }
      }
      this.arrs.push(isadd)
    },
    // 点击展开收起
    findShowBtn(item,index){
      // console.log(index)
      // let datarrs = this.arrs
      // let aIsmore = item.ismore == true ? true:false 
      item.ismore = !item.ismore
      // this.arrs = datarrs
      // this.$set(this.arrs, index, {ismore: aIsmore});
    },
    // 点击姓名前面的单选按钮
    checkedRaido(index){
      // console.log(index)
      // console.log(this.arrs)
      // let datarrs = this.arrs
      // console.log(datarrs)
      this.arrs.map(function(list){
        list.radiobtn = false
      })
      this.arrs[index].radiobtn = true
      let personnelid = this.arrs[index].personnelid
      this.delId = this.arrs[index].id
      // console.log(personnelid)
      // console.log(this.delId)
      // this.arrs = datarrs
      // console.log(this.arrs)
      // this.$set(this.arrs, index, {radiobtn: true}); //实时刷新
    },
    // 垃圾桶按钮
    delBtn(index){
      // console.log(index)
      console.log(this.delId)
      let that = this
      let objs = {
        id: that.delId
      }
      this.$ajax({
        method:"POST",
        url: that.globals.requesturl + 'web/cluesparameter/deletePersonnel',
        data: objs,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: [function (data) { 
          return qs.stringify(data)
        }]
      }).then(res=>{
        if(res.data.success && res.data.errorCode == '-1'){
          console.log(res.data)
          this.$message.success(res.data.msg); 
        }else{
          this.$message.error(res.data.msg); 
        }
      })
      // this.arrs.splice(index,1)
    },
    //返回上一页
    goback() {
      this.$router.go(-1);
    },
  },
  watch: {}
};
</script>

<style  lang="scss">
.xiansuotaizhang {
  .el-breadcrumb__inner {
    color: #fff;
  }
  .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: #03d0ff;
  }
  .el-form-item__label {
    color: #fff;
  }
  .el-form--inline .el-form-item__label{
    width: 120px !important;
  }
  .plaintiff .el-form--inline .el-form-item__label{
    width: 80px !important;
  }
  .el-input__inner,
  .el-input__inner:hover {
    background: transparent;
    border: 1px solid #016cae;
  }
  .el-table,
  .el-table__expanded-cell,
  .el-table th,
  .el-table tr,
  .el-table th:hover,
  .el-table tr:hover,
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background: transparent;
  }
  .el-table thead,
  .el-table {
    color: #fff;
  }
  .el-table th {
    text-align: center;
  }
  .el-table .cell {
    text-align: center;
  }
  .el-table--border {
    border: 1px solid #03d0ff;
  }
  .el-table td,
  .el-table th.is-leaf {
    border-bottom: none;
    border-right: 1px solid #03d0ff;
  }
  .el-table th.is-leaf:last-child,
  .el-table--border th:nth-last-child(2) {
    border: none;
  }
  .el-table thead {
    background: #027dbc;
  }
  .el-table thead tr th:last-child {
    border: none;
  }
  .el-table::before,
  .el-table--border::after {
    background-color: transparent;
  }
  td.el-table_1_column_10 {
    border-right: none !important;
  }
  .el-table .el-table__body-wrapper tr:nth-child(even) {
    background: #2162a8;
  }
  .el-table__body-wrapper {
    max-height: 320px;
    overflow-y: scroll;
  }
  .personnelframe-pricker .el-cascader {
    height: 30px;
  }
  .personnelframe-pricker .el-input__inner,
  .personnelframe-pricker .el-input__inner:hover {
    border: 1px solid #bcd9e8 !important;
    font-size: 10px;
    height: 30px;
    line-height: 30px;
  }
  .el-cascader-node:not(.is-disabled):hover {
    background: #91c1e7 !important;
  }
  .el-tree,
  .el-tree-node__content:hover,
  .el-tree-node:focus > .el-tree-node__content {
    background: transparent;
    color: #fff;
  }
  .el-tree-node__expand-icon {
    color: #fff;
  }
  .el-table__body tr.current-row > td {
    background: #025bff;
  }
  .el-breadcrumb__inner a,
  .el-breadcrumb__inner.is-link,
  .el-breadcrumb__inner a:hover,
  .el-breadcrumb__inner.is-link:hover {
    color: #fff;
    font-weight: normal;
  }
  .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
    color: #03d0ff;
    cursor: default;
  }
  .el-select .el-input .el-select__caret{
    color: #fff;
  }
  .respondentInfoFSarch1 .el-form-item{
    margin-right: 0;
  }
  .respondentInfoFSarch1 .el-form-item:nth-child(2){
    position: relative;
    left: -18px;
  }
  .respondentInfoFSarch1 .el-input{
    width: 87% !important;
  }
  .el-input.is-disabled .el-input__inner,.el-textarea.is-disabled .el-textarea__inner,.el-textarea__inner:hover{
    background: transparent;
    border: 1px solid #03D0FF;
  }

  // =========================== 系统内外部 人员 单位 ===============
  .systemInsideOfficeBox{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .addPeopleBtn{
      padding: 10px 10px;
      background: #E67B0A;
      border-radius: 5px;
    }
  }
  // ================================================================
}
.StandBookEnter {
  width: 95%;
  margin: 0 auto;
  box-sizing: border-box;
  border: 1px solid #03D0FF;
  box-shadow: 0 0 5px #03D0FF inset;
  -webkit-box-shadow: 0 0 5px #03D0FF inset;
  -moz-box-shadow: 0 0 5px #03D0FF inset;
  -o-box-shadow: 0 0 0 5px #03D0FF inset;
  position: relative;
  color: #fff;
  padding-bottom: 40px;

  .StandBookEnterMain {
    width: 100%;
    box-sizing: border-box;
    height: 520px;
    overflow-y: auto;
    position: relative;
    .topStep {
      width: 100%;
      height: 50px;
      padding: 12px 10px;
      box-sizing: border-box;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #03D0FF;

      .topStepTitle {
        width: 400px;
        font-size: 16px;
        line-height: 30px;
      }

      .topStepText {
        line-height: 28px;
        font-size: 16px;
        // overflow: hidden;
        .titleo {
          width: 60px;
          font-size: 16px;
          float: left;
        }

        .texto {
          float: left;
          font-size: 16px;
          padding: 0 10px;
          position: relative;
          img {
            float: left;
            display: inline-block;
            width: 20px;
            margin-top: 8px;
          }

          span {
            float: left;
            margin-left: 8px;
          }
          span.stepselspan{
            color: #EDB828;
          }
        }
        .texto:after{
          content: "";
          width: 100%;
          border-bottom: 1px dashed #3C70A9;
          position: absolute;
          bottom: 0;left: 15px;
        }
        .texto:nth-child(6):after{
          width: 80%;
        }
        p.steptexto::after{
          border-bottom: 1px dashed #94703F;
        }
      }
    }
  }
  .standBookInfo {
    display: flex;
    .standBookInfoFormLeft {
      flex: 3;
      padding: 15px;
      box-sizing: border-box;
    }
  }
  .handlingWayForm {
    display: flex;
    justify-content: space-between;
    height: 450px;
    .handlingWayFormLeft {
      width: 26%;
      padding: 0 20px;
      border-right: 1px solid #03D0FF;
    }
    .handlingWayFormRight {
      width: 70%;
      height: 100%;
      overflow-y: auto;
      .el-form--inline .el-form-item{
        width: 33%;
        margin-right: 0
      }
      .el-form-item__content{
        width: 58%;
      }
      .el-input, .el-select {
        width: 100% !important;
      }
      .el-form--inline .el-form-item__label{
        width: 100px !important;
      }
    }
  }
  .fitTitle {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    border-top: 1px dashed #03D0FF;
    border-bottom: 1px solid #03d0ff;
    padding: 0 15px;
    box-sizing: border-box;
  }
  .respondentInfoForm {
    display: flex;
    justify-content: flex-start;
    position: relative;
    &::after{
      content: "";
      width: 98%;
      border-bottom: 1px solid #03d0ff;
      position: absolute;
      bottom: 0;left: 1%;
    }
    .respondentInfoFSarch {
      box-sizing: border-box;
    }
    .respondentInfoFSarch1 {
      flex: 3;
    }
    .deleteRadio{
      // position: relative;
      .el-radio__inner{
        position: absolute;
        top: -10px;
        left: 80px;
      }
      .el-radio__label{
        display: none;
      }
      .radiobtn1{
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 3px solid #fff;
        background: #fff;
        display: inline-block;
        position: absolute;
        left: 37px;
        top: 27px;
        z-index:100;
      }
      .radiobtnChecked{
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 3px solid #fff;
        background: #409EFF;
        display: inline-block;
        position: absolute;
        left: 37px;
        top: 27px;
        z-index:100;
      }
      .delBtn{
        display: inline-block;
        width: 30px;
        height: 30px;
        margin-left: -35px;
        margin-top: 5px;
        // background: red;
      }
      .delBtn img{
        width: 100%;
        height: 100%;
      }
    }
    .respondentInfoFSarch2 {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      padding: 15px;
      .el-button {
        width: 80px;
      }
      .derive {
        background: #029aff;
        border: 1px solid #029aff;
      }
      .save {
        background: #e08801;
        border: 1px solid #e08801;
      }
      .packUp{
        display:inline-block;
        width:15px;
        height:15px;
        // background: red;
      }
      .packUp img{
        width: 100%;
        height: 100%;
      }
      // .packDown{
      //   display:inline-block;
      //   width:0px;
      //   height:0px;
      //   border-top:8px solid #fff;
      //   border-right:8px solid  rgba(0,0,0,0);
      //   border-bottom:8px solid rgba(0,0,0,0);
      //   border-left:8px solid  rgba(0,0,0,0);
      // }
    }
  }
  .respondentForm {
    display: flex;
    .respondentFormInp {
      flex: 4;
    }
    .respondentFormInpArea {
      flex: 1;
    }
  }
  .standBookInfoFormRight {
    flex: 2;
    padding: 15px;
    box-sizing: border-box;
    height: 200px;
    .el-form-item__label {
      width: 100%;
      box-sizing: border-box;
      padding: 0 15px;
      padding-bottom: 0;
      border: 1px solid #03D0FF;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
    }
    .el-textarea__inner {
      border-top: none !important;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      height: 100%;
    }
    
  }
  .respondentFormInpArea {
    padding: 0 15px !important;
  }
  .el-input, .el-select {
    width: 200px;
  }
  .respondentFormInp {
    .el-input, .el-select {
      width: 180px;
    }
  }
  .handlingWayFormLeft {
    .el-input, .el-select {
      width: 220px;
    }
  }
  .el-textarea {
    width: 100% !important;
  }
  .el-input__inner {
    color: #fff;
    background: transparent;
    border: 1px solid rgba(3, 208, 255, 0.7);
  }
  .el-button--primary {
    color: #FFF;
    background-color: #025BFF;
    border-color: #025BFF;
  }
  .el-form {
    margin-top: 15px;
  }
  .el-progress__text {
    color: #fff;
    font-size: 12px !important;
  }
  .el-progress-bar__outer {
    background: #b9b9b9;
  }
  .el-textarea__inner {
    resize: none !important;
    color: #fff;
    background: transparent;
    border: 1px solid rgba(3, 208, 255, 0.7);
  }
  .el-radio {
    color: #fff;
  }
  .textRadio {
    .el-form-item__content {
      width: 14vw;
    }
  }
  .Disciplinaryandillegalcontent{
    padding: 0 20px;
    .el-form--inline .el-form-item{
      width: 24%;
    }
    .el-form-item__content{
      width: 50%;
    }
    .el-input{
      width: 100%;
    }
    .el-form--inline .el-form-item__label{
      width: 90px !important;
    }
    .el-form--inline .el-form-item__label{
      text-align: left;
      line-height: 1;
      padding: 5px 0;
    }
  }
  .Todealwithsituation{
    .el-form--inline .el-form-item__label{
      text-align: left;
      line-height: 1;
      padding: 5px 10px;
    }
    .el-form--inline .el-form-item{
      line-height: 40px;
    }
  }
  .remarkss{
    .el-form--inline .el-form-item{
      width: 48%;
    }
    .el-form--inline .el-form-item__content{
      width: 78%;
    }
    .el-textarea__inner{
      height: 8vw;
    }
  }
  .bottomSub {
    width: 100%;
    overflow: hidden;
    padding: 10px 50px;
    border-top: 1px solid #03D0FF;
    position: absolute;
    bottom: 0;
    background: #02468F;
    box-sizing: border-box;
    z-index: 100;
    .bottomBtnStyle {
      width: 100px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      background: #e08801;
      border: none;
      border-radius: 3px;
      float: right;
      cursor: pointer;
      margin-left: 70px;
    }
  }
  .bottomSub button:last-child{
    background: #00E19A;
  }
}

// ========================================================
  .personnelframe {
  .el-breadcrumb__inner {
    color: #fff;
  }
  .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: #03d0ff;
  }
  .el-form--inline .el-form-item{
    margin-bottom: 0;
  }
  .el-form-item__label{
    color: #fff;
  }
  .el-input__inner,.el-input__inner:hover{
    background: transparent;
    border: 1px solid #016CAE;
  }
  .el-table,.el-table__expanded-cell,.el-table th, .el-table tr,.el-table th:hover, .el-table tr:hover,.el-table--enable-row-hover .el-table__body tr:hover>td{
    background: transparent;
  }
  .el-table thead,.el-table{
    color: #fff;
  }
  .el-table th{
    text-align: center;
  }
  .el-table .cell{
    text-align: center;
  }
  .el-table--border{
    border: 1px solid #03d0ff; 
  }
  .el-table td, .el-table th.is-leaf{
    border-bottom: none;
    border-right: 1px solid #03d0ff;
  }
  .el-table th.is-leaf:last-child,.el-table--border th:nth-last-child(2){
    border: none;
  }
  .el-table thead{
    background: #027DBC;
  }
  .el-table thead tr th:last-child{
    border: none
  }
  .el-table::before,.el-table--border::after{
    background-color: transparent;
  }
  td.el-table_1_column_10{
    border-right: none !important;
  }
  .el-table .el-table__body-wrapper tr:nth-child(even){
    background: #2162A8;
  }
  .el-table__body-wrapper{
    max-height: 320px;
    overflow-y: scroll
  }
  .personnelframe-pricker .el-cascader{
    height: 30px;
  }
  .personnelframe-pricker .el-input__inner,.personnelframe-pricker .el-input__inner:hover{
    border: 1px solid #BCD9E8 !important;
    font-size: 10px;
    height: 30px;
    line-height: 30px;
  }
  .el-cascader-node:not(.is-disabled):hover{
    background: #91C1E7 !important;
  }
  .el-tree,.el-tree-node__content:hover,.el-tree-node:focus>.el-tree-node__content{
    background: transparent;
    color: #fff;
  }
  .el-tree-node__expand-icon{
    color: #fff;
  }
  .el-table__body tr.current-row>td{
    background: #025BFF;
  }
  .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link,.el-breadcrumb__inner a:hover, .el-breadcrumb__inner.is-link:hover{
    color: #fff;
    font-weight: normal;
  }
  .personnelframe-pricker>.el-input{
    width: 50%;
  }
}
.el-cascader-panel{
  font-size: 10px !important;
}
.el-cascader-menu__wrap::-webkit-scrollbar{
  background: #fff !important;
  height: 8px;
}

// 调动弹框
  .personnelframe {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2000;
  }

  .personnelframe-close {
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.5);
  }

  .personnelframe-container {
    width: 30%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .personnelframe-container-box {
    background: #C7ECFF;
    border-radius: 5px;
    padding: 10px;
    width: 100%;
    padding-bottom: 20px;
  }

  .personnelframe-title {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 10px;
    color: #333;
    font-weight: 600;
    margin-bottom: 15px;

    img {
      width: 18px;
      height: 18px;
      margin-right: 5px;
    }

    h3 {
      position: relative;
      top: -1px;
    }
  }
  .spanbox{
    width: 100%;
    color: #333;
    font-size: 14px;
    padding: 15px 10px;
    // display: flex;
    // align-items: center;
    // justify-content: space-between;
    
  }

  .personnelframe-table {
    width: 100%;
    border: 1px solid #BCD9E8;
    margin: 8px 0;

    .personnelframe-table-tr {
      border-bottom: 1px solid #BCD9E8;
      width: 100%;
      display: flex;
      align-self: center;
    }

    .personnelframe-table-tr span {
      flex: 1;
      display: block;
      padding: 6px 15px;
      border-right: 1px solid #BCD9E8;
      font-size: 10px;
      color: #777E82;

      &:last-child {
        border-right: 0;
      }
    }

    .personnelframe-table-tr:last-child {
      border-bottom: none;
    }
  }

  .personnelframe-pricker {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 8px;
    justify-content: space-between;
  }

  .personnelframe-btns {
    width: 100%;
    text-align: right;
    margin-top: 10px;
  }

  .personnelframe-btns button {
    font-size: 10px;
  }

  .treelist-box {
    width: 100%;
    height: 390px;
    border: 1px solid #03D0FF;
    overflow-y: auto;
  }

  //淡入淡出动画
  .personnelframe-enter,
  .personnelframe-leave-to {
    opacity: 0;
  }

  .personnelframe-enter-to,
  .personnelframe-leave {
    opacity: 1;
  }

  .personnelframe-enter-active,
  .personnelframe-leave-active {
    transition: all 1s;
  }

.duoxuan .el-input--suffix .el-input__inner{
  max-height: 38px;
}
</style>
