<template>
  <div id='app' align='center' style="margin-top: 0px;">
    <section class='flipInX animated'>
      <div class='container' style='border-bottom: 0px;margin-bottom: 0px;'>
        <h1>
          <span>XIGUA-MOCK</span>
        </h1>
      </div>
      <div class='container'
           style='margin-top: 0px;padding-top: 0px;padding-bottom: 0px;margin-bottom: 0px;margin-left: 90px;margin-right: 100px;width: 1453px;'>
        <form class='contact'>
          <div class='row clearfix' align='left'>
            <fieldset style='width: 1450px;'>
              <legend class='optional'><i class='el-icon-edit'></i> 接口列表</legend>
              <div>

                <el-input class="input-with-select" v-model='getAllListInput.title' placeholder='请输入搜索名称'  style="width: 450px" clearable >
                  <el-select v-model='getAllListInput.projectName' slot="prepend"
                           filterable placeholder='请选择项目'
                           :remote-method='getProjectNameList' clearable>
                  <el-option v-for='item in arrayListForPageMock.selectDataOfGetAllProjectName'
                             :key='item'
                             :id='item' :value='item'>
                    <span style='float: left'>{{ item }}</span>
                  </el-option>
                </el-select>
                  <el-button  slot="append" icon='el-icon-search' @click='getAllList' ></el-button>
                </el-input>
                &nbsp;

                <el-button type='primary' size='medium' icon='el-icon-edit'  @click='addScroll'>
                  新增
                </el-button>
                <el-button slot='reference' type='danger' size='medium'  icon='el-icon-delete'
                           @click='open2'>删除
                </el-button>
                &nbsp;
                <el-popover
                  placement='bottom'
                  width='360'
                  trigger='click'>
                  <el-upload
                    class='upload-demo'
                    drag
                    :action='urlOfImport_excel'
                    multiple
                    :on-success='uploadSuccess'>
                    <i class='el-icon-upload'></i>
                    <div class='el-upload__text'>将文件拖到此处，或<em>点击上传</em></div>
                    <div class='el-upload__tip' slot='tip'>上传excel文件，且不超过5M</div>
                  </el-upload>
                  <el-button type='success' size='medium' icon='el-icon-upload'   slot='reference'>导入
                  </el-button>
                </el-popover>
                &nbsp;
                <el-button type="text" icon="el-icon-info" style="color: #cdbd39;"><a href="#/wiki" style="color: #cdbd39;">数据格式定义规范</a></el-button>
              </div>
              <div class='form-row-select'>
                <fieldset style='width: 1398px;'>
                  <legend class='optional'> 连接列表</legend>
                  <el-table ref='multipleTable' :data='arrayListForPageMock.tableDataOfListInfo'
                            style='width:100%;' @selection-change='idSelectionChange'
                            @clear-selection='clearSelection'
                            @row-click='clickTable'>
                    <el-table-column type='selection'></el-table-column>
                    <el-table-column fixed prop='id' label='ID' width='80'
                                     align='center'></el-table-column>
                    <el-table-column prop='title' label='名称' width='120' height='5' align='center'
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop='project_name' label='项目' width='100'
                                     align='center'></el-table-column>
                    <el-table-column prop='methods' label='请求方式' width='100'
                                     align='center'></el-table-column>
                    <el-table-column prop='domain' label='接口URL' width='250'
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop='ischeck' label='入参校验' width='100' align='center'>
                      <template slot-scope='scope'>
                        <el-switch v-model='scope.row.ischeck'
                                   :active-value='1' :inactive-value='0'
                                   @change='checkSwitchMockData(scope.row.id,scope.row.ischeck)'></el-switch>
                      </template>
                    </el-table-column>
                    <el-table-column prop='status' label='激活状态' width='100' align='center'>
                      <template slot-scope='scope'>
                        <el-switch v-model='scope.row.status'
                                   :active-value='0' :inactive-value='1'
                                   @change='manageMockData(scope.row.id,scope.row.status)'></el-switch>
                      </template>
                    </el-table-column>
                    <el-table-column prop='updateTime' label='更新时间' width='190'
                                     align='center'></el-table-column>
                    <el-table-column label='操作' width='250' align='center'>
                      <template slot-scope='scope'>
                        <el-button type='text' size='small' @click='viewMockInfoByRow(scope.row)'><i
                          class='el-icon-view'></i>模拟
                        </el-button>
                        <el-button type='text' size='small' @click='getMockInfoByRow(scope.row)'><i
                          class='el-icon-edit'></i>编辑
                        </el-button>
                        <el-button type='text' size='small' @click='copyMockData(scope.row.id)'><i
                          class='el-icon-document'></i>复制
                        </el-button>
                        <el-button type='text' size='small' style='color: red'
                                   @click='open3(scope.row)' slot='reference'><i
                          class='el-icon-delete' style='color: red'></i>删除
                        </el-button>
                      </template>
                    </el-table-column>
                    <el-table-column type='expand' fixed='right'>
                      <template slot-scope='props'>
                        <el-form label-position='right' class='demo-table-expand'>
                          <el-form-item label='描述：' label-width='100px'>
                            <div style='height: 30px;line-height: 30px;'>{{ props.row.description }}</div>
                          </el-form-item>
                          <el-form-item label='请求参数：' label-width='100px'>
                            <div style='height: 30px;line-height: 30px;'>{{ props.row.reqparams }}</div>
                          </el-form-item>
                          <el-form-item label='预期返回：' label-width='100px'>
                            <div>
                              <pre style='width:90%;margin-top: 5px;  line-height:17px '>{{ props.row.resparams }}</pre>
                            </div>
                          </el-form-item>
                        </el-form>
                      </template>
                    </el-table-column>
                  </el-table>
                  <br/>
                  <el-pagination
                    @current-change='getAllList()'
                    :current-page.sync='getAllListInput.pageNo'
                    :page-size='10'
                    layout='total, prev, pager, next'
                    :total='arrayListForPageMock.count'>
                  </el-pagination>
                  <div class='block' style='float: end'>
                  </div>
                </fieldset>
              </div>
              <fieldset id='add' style='width: 789px;margin-left: 4px;' v-show='flags.addFormVisible'>
                <legend class='optional'><i class='el-icon-edit'></i> 新增</legend>
                <div class='container' style='margin-left: 0px; padding-left: 0px;'>
                  <el-form :model='arrayListForPageMock.addMockDataInput'
                           :rules='arrayListForPageMock.hostInfoAddRules'
                           ref='arrayListForPageMock.addMockDataInput' label-width='100px'
                           class='demo-arrayListForPageMock.addMockDataInput'>
                    <el-form-item label='连接名称' prop='title'>
                      <el-input v-model='arrayListForPageMock.addMockDataInput.title'></el-input>
                    </el-form-item>
                    <el-form-item label='接口URL' prop='domain'>
                      <el-input v-model='arrayListForPageMock.addMockDataInput.domain'></el-input>
                    </el-form-item>
                    <el-form-item label='所属项目' prop='projectName'>
                      <el-input
                        v-model='arrayListForPageMock.addMockDataInput.projectName'></el-input>
                    </el-form-item>
                    <el-form-item label='请求方式' prop='method'>
                      <el-input v-model='arrayListForPageMock.addMockDataInput.method'></el-input>
                    </el-form-item>
                    <el-form-item label='请求参数' prop='reqparams'>
                                    <textarea id='reqparamsAdd' rows='6' cols='10'
                                              v-model='arrayListForPageMock.addMockDataInput.reqparams'
                                              @blur.prevent=''>
                                    </textarea>
                    </el-form-item>
                    <el-form-item label='期待返回' prop='resparams'>
                                    <textarea id='resparamsAdd' rows='6' cols='20'
                                              v-model='arrayListForPageMock.addMockDataInput.resparams'
                                              @blur.prevent=''>
                                    </textarea>
                    </el-form-item>
                    <el-form-item label='描述' prop='des'>
                      <el-input v-model='arrayListForPageMock.addMockDataInput.des'></el-input>
                    </el-form-item>
                    <el-form-item label='校验入参' prop='ischeck'>
                      <el-radio-group v-model='arrayListForPageMock.addMockDataInput.ischeck'
                                      size='small'>
                        <el-radio-button label='1'>是</el-radio-button>
                        <el-radio-button label='0'>否</el-radio-button>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                      <el-button type='primary' class='el-icon-edit-outline'
                                 @click="addMockData('arrayListForPageMock.addMockDataInput')">
                        新增
                      </el-button>
                      <el-button type='reset' class='el-icon-delete'
                                 @click="resetFormOfAddMockInfo('arrayListForPageMock.addMockDataInput')">
                        重置
                      </el-button>
                      <el-button class='el-icon-circle-close-outline' @click='addConcelScroll'> 取消
                      </el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </fieldset>
              <fieldset id='viewMock' style='width: 789px;margin-left: 4px;' v-show='flags.viewMockVisible'>
                <legend class='optional'><i class='el-icon-view'></i> 模拟</legend>
                <div class='container' style='margin-left: 0px; padding-left: 0px;'>
                  <el-form :v-model='arrayListForPageMock.tableDataOfMockInfoForView'
                           label-width='100px'>

                    <el-form-item label='连接名称'>
                      <span>{{ arrayListForPageMock.tableDataOfMockInfoForView.title }}</span>
                    </el-form-item>
                    <el-form-item label='接口URL' prop='domain'>
                      <span>{{ arrayListForPageMock.tableDataOfMockInfoForView.domain }}</span>
                    </el-form-item>
                    <el-form-item label='请求方式' prop='methods'>
                      <span>{{ arrayListForPageMock.tableDataOfMockInfoForView.methods }}</span>
                    </el-form-item>
                    <el-form-item label='请求参数' prop='reqparams'>
                      <span>{{ arrayListForPageMock.tableDataOfMockInfoForView.reqparams }}</span>
                    </el-form-item>
                    <el-form-item label='返回' prop='resparams'>
                      <span>{{ arrayListForPageMock.tableDataOfMockInfoForView.resparams }}</span>
                    </el-form-item>
                    <el-form-item>
                      <el-button type='primary' class='el-icon-edit-outline'>
                        发送
                      </el-button>
                      <el-button type='reset' class='el-icon-delete'>
                        重置
                      </el-button>
                      <el-button class='el-icon-circle-close-outline' @click='viewConcelScroll'> 取消
                      </el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </fieldset>
            </fieldset>
          </div>
        </form>
      </div>
    </section>
    <el-dialog title='修改编辑' :visible.sync='flags.dialogFormVisible'>
      <el-form :v-model='arrayListForPageMock.tableDataOfMockInfoForUpdate'>
        <el-form-item label='连接名称' prop='title' label-width='100px' modal='false'
                      modal-append-to-body='false'>
          <el-input v-model='arrayListForPageMock.tableDataOfMockInfoForUpdate.title'
                    auto-complete='off'></el-input>
        </el-form-item>
        <el-form-item label='接口URL' prop='domain' label-width='100px'>
          <el-input v-model='arrayListForPageMock.tableDataOfMockInfoForUpdate.domain'
                    auto-complete='off'></el-input>
        </el-form-item>
        <el-form-item label='所属项目' prop='project_name' label-width='100px'>
          <el-input
            v-model='arrayListForPageMock.tableDataOfMockInfoForUpdate.project_name'
            auto-complete='off'></el-input>
        </el-form-item>
        <el-form-item label='请求方式' prop='methods' label-width='100px'>
          <el-input v-model='arrayListForPageMock.tableDataOfMockInfoForUpdate.methods'
                    auto-complete='off'></el-input>
        </el-form-item>
        <el-form-item label='请求参数' prop='reqparams' label-width='100px'>
          <el-input id='reqparamsAddForUpdate' style='width: 100%; margin: 0px;'
                    type='textarea'
                    :autosize='{ minRows: 1, maxRows: 10}'
                    placeholder='请输入内容'
                    v-model='arrayListForPageMock.tableDataOfMockInfoForUpdate.reqparams' @blur.prevent=''>
          </el-input>
        </el-form-item>
        <el-form-item label='期待返回' prop='resparams' label-width='100px'>
          <el-input id='resparamsAddForUpdate' style='width: 100%; margin: 0px;'
                    type='textarea'
                    :autosize='{ minRows: 2, maxRows: 20}'
                    placeholder='请输入内容'
                    v-model='arrayListForPageMock.tableDataOfMockInfoForUpdate.resparams' @blur.prevent=''>
          </el-input>
        </el-form-item>
        <el-form-item label='描   述' prop='description' label-width='100px'>
          <el-input
            v-model='arrayListForPageMock.tableDataOfMockInfoForUpdate.description'></el-input>
        </el-form-item>
        <el-form-item label='校验入参' prop='ischeck' label-width='100px' align='left'>
          <el-radio-group
            v-model='arrayListForPageMock.tableDataOfMockInfoForUpdate.ischeck'
            size='small'>
            <el-radio-button label='1'>是</el-radio-button>
            <el-radio-button label='0'>否</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button @click='flags.dialogFormVisible = false'>取 消</el-button>
        <el-button type='primary'
                   @click="editMockData('arrayListForPageMock.tableDataOfMockInfoForUpdate')">
          确 定
        </el-button>
      </div>
    </el-dialog>
    <div class="copyright" align="center" style="color: #99a9bf">Copyright © 西瓜</div>
  </div>

</template>

<script>
import urlsOfWeb from '@/assets/js/requestUrls'
export default {
  name: 'document',
  data () {
    return {
      flags: {
        showFlag: 0,
        resultShowFlag: 0,
        checkAll: false,
        isIndeterminate: true,
        loading: false,
        checkAll1: false,
        isIndeterminate1: true,
        dialogFormVisible: false,
        addFormVisible: false,
        uploadShowFlag: false,
        viewMockVisible: false,
        visible2: false,
        visible2OfRow: false
      },
      urlOfGetAllList: urlsOfWeb.search,
      urlOfProjectNameAllList: urlsOfWeb.searchproject,
      urlOfaddMockData: urlsOfWeb.addinfo,
      urlOfEditMockData: urlsOfWeb.editinfo,
      urlOfDelMockData: urlsOfWeb.delinfo1,
      urlOfCopyMockData: urlsOfWeb.copy,
      urlOfManageMockData: urlsOfWeb.manage,
      urlOfIscheckManageMockData: urlsOfWeb.ischeckManage,
      urlOfImport_excel: urlsOfWeb.import_excel,
      hostInfoAddRules: {
        name: [
          {required: true, message: '请输入连接名称', trigger: 'blur'}
          // {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        host: [
          {required: true, message: '请输入HOST IP', trigger: 'blur'}
          // {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        database: [
          {required: true, message: '请输入DATABASE', trigger: 'blur'}
          // {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
          // {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
          // {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        port: [
          {required: true, message: '请输入port', trigger: 'blur'}
          // {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        type: [
          {required: false, message: '请选择服务器类型', trigger: 'change'}
        ]
      },
      getAllListInput: {
        title: '',
        projectName: '',
        pageNo: 1
      },
      arrayListForPageMock: {
        count: 0,
        delId: [],
        delIds: [],
        delIdsInput: [],
        delObj: [],
        tableDataOfListInfo: [],
        selectDataOfGetAllProjectName: [],
        tableDataOfMockInfoForUpdate: {
          id: '',
          title: '',
          methods: '',
          project_name: '',
          reqparams: '',
          resparams: '',
          description: '',
          domain: '',
          ischeck: ''
        },
        tableDataOfMockInfoForView: {
          id: '',
          title: '',
          methods: '',
          project_name: '',
          reqparams: '',
          resparams: '',
          description: '',
          domain: '',
          ischeck: ''
        },
        addMockDataInput: {
          id: '',
          title: '',
          method: '',
          projectName: '',
          reqparams: '',
          resparams: '',
          des: '',
          domain: '',
          ischeck: 0
        }
      },
      resultInfo: {
        resultMsg: '',
        resultError: ''
      }
    }
  },
  methods: {
    open2 () {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteMockData(null, 0)
      }, () => {
      })
    },
    open3 (row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteMockData(row.id, 1)
      }).catch(() => {
      })
    },
    clickTable (row, index, e) {
      this.$refs.multipleTable.toggleRowExpansion(row)
    },
    clearSelection () {
      this.$refs.multipleTable.clearSelection(this.multipleSelection)
    },
    idSelectionChange (val) {
      this.arrayListForPageMock.delObj = val
    },
    resetFormOfAddMockInfo (formName) {
      this.$refs[formName].resetFields()
      this.arrayListForPageMock.addMockDataInput.id = ''
      this.arrayListForPageMock.addMockDataInput.title = ''
      this.arrayListForPageMock.addMockDataInput.method = ''
      this.arrayListForPageMock.addMockDataInput.projectName = ''
      this.arrayListForPageMock.addMockDataInput.reqparams = ''
      this.arrayListForPageMock.addMockDataInput.resparams = ''
      this.arrayListForPageMock.addMockDataInput.des = ''
      this.arrayListForPageMock.addMockDataInput.domain = ''
      this.arrayListForPageMock.addMockDataInput.ischeck = ''
    },
    addScroll () {
      this.flags.addFormVisible = true
      // setTimeout(function () {
      //    document.getElementById('add').scrollIntoView()
      // },10)
      this.$nextTick(function () {
        document.getElementById('add').scrollIntoView()
      })
    },
    viewMockScroll () {
      this.flags.viewMockVisible = false
      // setTimeout(function () {
      //    document.getElementById('add').scrollIntoView()
      // },10)
      this.$nextTick(function () {
        document.getElementById('viewMock').scrollIntoView()
      })
    },
    addConcelScroll () {
      this.flags.addFormVisible = false
      this.$nextTick(function () {
        document.getElementById('app').scrollIntoView()
      })
    },
    viewConcelScroll () {
      this.flags.viewMockVisible = false
      this.$nextTick(function () {
        document.getElementById('app').scrollIntoView()
      })
    },
    listTopScroll () {
      document.getElementById('app').scrollIntoView()
    },
    getAllList () {
      this.listTopScroll()
      var vm = this
      this.$axios.get('/apis' + this.urlOfGetAllList, {
        params: {
          title: this.getAllListInput.title,
          project_name: this.getAllListInput.projectName,
          pageNo: this.getAllListInput.pageNo
        }
      }).then(function (response) {
        if (response.data.code === 0) {
          vm.resultInfo.resultMsg = response.data.msg
          vm.arrayListForPageMock.tableDataOfListInfo = response.data.data
          vm.arrayListForPageMock.count = response.data.count
        }
      }, () => {
        vm.flags.loading = false
        vm.$message({
          showClose: true,
          message: '获取列表失败',
          type: 'error'
        })
      })
    },
    getMockInfoByRow (row) {
      this.arrayListForPageMock.tableDataOfMockInfoForUpdate = row
      this.flags.dialogFormVisible = true
    },
    viewMockInfoByRow (row) {
      var vm = this
      this.arrayListForPageMock.tableDataOfMockInfoForView = row
      vm.$notify({
        title: vm.resultInfo.resultMsg,
        message: '暂不支持发送功能，测试调用地址：http://172.16.156.67:5203+URL',
        type: 'success',
        position: 'top-right',
        offset: 100,
        duration: 10000
      })
      this.viewMockScroll()
    },
    getProjectNameList () {
      var vm = this
      this.$axios.get('/apis' + this.urlOfProjectNameAllList, {}).then(function (response) {
        if (response.data.code === 0) {
          vm.resultInfo.resultMsg = response.data.msg
          vm.arrayListForPageMock.selectDataOfGetAllProjectName = response.data.data
        }
      }, () => {
        vm.flags.loading = false
        vm.$message({
          showClose: true,
          message: '获取项目失败',
          type: 'error'
        })
      })
    },
    addMockData (formName) {
      var vm = this
      var fd = new FormData()
      fd.append('id', this.arrayListForPageMock.addMockDataInput.id)
      fd.append('title', this.arrayListForPageMock.addMockDataInput.title)
      fd.append('method', this.arrayListForPageMock.addMockDataInput.method)
      fd.append('projectName', this.arrayListForPageMock.addMockDataInput.projectName)
      fd.append('reqparams', this.arrayListForPageMock.addMockDataInput.reqparams)
      fd.append('resparams', this.arrayListForPageMock.addMockDataInput.resparams)
      fd.append('des', this.arrayListForPageMock.addMockDataInput.des)
      fd.append('domain', this.arrayListForPageMock.addMockDataInput.domain)
      fd.append('ischeck', this.arrayListForPageMock.addMockDataInput.ischeck)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // debugger
          this.$axios.post('/apis' + this.urlOfaddMockData, fd).then(function (response) {
            if (response.data.code === 0) {
              vm.resultInfo.resultMsg = response.data.msg
              vm.$notify({
                title: vm.resultInfo.resultMsg,
                message: vm.resultInfo.resultMsg,
                type: 'success',
                position: 'top-right',
                offset: 100,
                duration: 1000
              })
              vm.getAllList()
              vm.getProjectNameList()
            }
          }, () => {
            vm.flags.loading = false
            vm.$notify.error({
              title: '执行失败！',
              message: 'copyMockData出现异常咯！',
              position: 'top-right',
              offset: 100
            })
          })
        } else {
          return false
        }
      })
    },
    copyMockData (id) {
      var vm = this
      var fd = new FormData()
      fd.append('id', id)
      this.$axios.post('/apis' + this.urlOfCopyMockData, fd).then(function (response) {
        if (response.data.code === 0) {
          vm.resultInfo.resultMsg = response.data.msg
          vm.$notify({
            title: vm.resultInfo.resultMsg,
            message: '复制成功',
            type: 'success',
            position: 'top-right',
            offset: 100,
            duration: 1000
          })
          vm.getAllList()
          vm.getProjectNameList()
        }
      }, () => {
        vm.flags.loading = false
        vm.$notify.error({
          title: '执行失败！',
          message: 'copyMockData出现异常咯！',
          position: 'top-right',
          offset: 100
        })
      })
    },
    manageMockData (id, status) {
      var vm = this
      var fd = new FormData()
      fd.append('id', id)
      fd.append('status', status)
      this.$axios.post('/apis' + this.urlOfManageMockData, fd).then(function (response) {
        if (response.data.code === 0) {
          vm.resultInfo.resultMsg = response.data.msg
          vm.$notify({
            title: vm.resultInfo.resultMsg,
            message: '修改激活状态成功',
            type: 'success',
            position: 'top-right',
            offset: 100,
            duration: 1000
          })
          vm.getAllList()
          vm.getProjectNameList()
        }
      }, () => {
        vm.flags.loading = false
        vm.$notify.error({
          title: '执行失败！',
          message: 'copyMockData出现异常咯！',
          position: 'top-right',
          offset: 100
        })
      })
    },
    checkSwitchMockData (id, ischeck) {
      var vm = this
      var fd = new FormData()
      fd.append('id', id)
      fd.append('ischeck', ischeck)
      this.$axios.post('/apis' + this.urlOfIscheckManageMockData, fd).then(function (response) {
        if (response.data.code === 0) {
          vm.resultInfo.resultMsg = response.data.msg
          vm.$notify({
            title: vm.resultInfo.resultMsg,
            message: '修改入参校验成功',
            type: 'success',
            position: 'top-right',
            offset: 100,
            duration: 1000
          })
          vm.getAllList()
          vm.getProjectNameList()
        }
      }, () => {
        vm.flags.loading = false
        vm.$notify.error({
          title: '执行失败！',
          message: 'copyMockData出现异常咯！',
          position: 'top-right',
          offset: 100
        })
      })
    },
    deleteMockData (formName, type) {
      var vm = this
      if (type === 1) {
        this.arrayListForPageMock.delId.push(formName)
        this.arrayListForPageMock.delIdsInput = this.arrayListForPageMock.delId
      } else {
        this.arrayListForPageMock.delObj.forEach(item => {
          this.arrayListForPageMock.delIds.push(item.id)
        })
        this.arrayListForPageMock.delIdsInput = this.arrayListForPageMock.delIds
      }
      this.$axios.post('/apis' + this.urlOfDelMockData, {
        ids: this.arrayListForPageMock.delIdsInput
      }).then(function (response) {
        if (response.data.code === 0) {
          vm.resultInfo.resultMsg = response.data.msg
          vm.$notify({
            title: vm.resultInfo.resultMsg,
            message: '删除成功',
            type: 'success',
            position: 'top-right',
            offset: 100,
            duration: 1000
          })
          vm.getAllList()
          vm.getProjectNameList()
          vm.flags.visible2 = false
          vm.flags.visible2OfRow = false
        }
      }, () => {
        vm.flags.loading = false
        vm.$notify.error({
          title: '执行失败！',
          message: 'addMockData出现异常咯！',
          position: 'top-right',
          offset: 100
        })
      })
      this.arrayListForPageMock.delId = []
      this.arrayListForPageMock.delIdsInput = []
      this.arrayListForPageMock.delIds = []
      this.flags.visible2 = false
      this.flags.visible2OfRow = false
    },
    editMockData () {
      var vm = this
      var fd = new FormData()
      fd.append('id', this.arrayListForPageMock.tableDataOfMockInfoForUpdate.id)
      fd.append('title', this.arrayListForPageMock.tableDataOfMockInfoForUpdate.title)
      fd.append('method', this.arrayListForPageMock.tableDataOfMockInfoForUpdate.methods)
      fd.append('projectName', this.arrayListForPageMock.tableDataOfMockInfoForUpdate.project_name)
      fd.append('reqparams', this.arrayListForPageMock.tableDataOfMockInfoForUpdate.reqparams)
      fd.append('resparams', this.arrayListForPageMock.tableDataOfMockInfoForUpdate.resparams)
      fd.append('des', this.arrayListForPageMock.tableDataOfMockInfoForUpdate.description)
      fd.append('domain', this.arrayListForPageMock.tableDataOfMockInfoForUpdate.domain)
      fd.append('ischeck', this.arrayListForPageMock.tableDataOfMockInfoForUpdate.ischeck)
      this.$axios.post('/apis' + this.urlOfEditMockData, fd).then(function (response) {
        if (response.data.code === 0) {
          vm.resultInfo.resultMsg = response.data.msg
          vm.$notify({
            title: vm.resultInfo.resultMsg,
            message: vm.resultInfo.resultMsg,
            type: 'success',
            position: 'top-right',
            offset: 100,
            duration: 1000
          })
          vm.flags.dialogFormVisible = false
          vm.getAllList()
          vm.getProjectNameList()
        }
      }, () => {
        vm.$notify.error({
          title: '执行失败！',
          message: 'editMockData出现异常咯！',
          position: 'top-right',
          offset: 100
        })
      })
    },
    uploadSuccess (response, file, fileList) {
      var vm = this
      if (response.code === 0) {
        vm.$notify({
          title: vm.resultInfo.resultMsg,
          message: '上传成功！',
          type: 'success',
          position: 'top-right',
          offset: 100,
          duration: 1000
        })
        vm.getAllList()
        vm.getProjectNameList()
      }
    }
  },
  created () {
    this.getAllList()
    this.getProjectNameList()
  }
}
</script>

<style>
  @import '../assets/css/demo';

  .el-select .el-input {
    width: 200px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  pre {
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
  }
</style>
