<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 设备报修派工记录
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">

                <el-select v-model="query.address1" placeholder="设备类型" class="handle-select mr10">
                    <el-option key="1" label="" value=""></el-option>
                    <el-option key="2" label="电子秤" value="0001"></el-option>
                    <el-option key="3" label="读卡器" value="0002"></el-option>
                    <el-option key="4" label="条码打印机" value="0003"></el-option>
                    <el-option key="5" label="安卓PAD" value="0004"></el-option>
                    <el-option key="6" label="红外对射枪" value="0005"></el-option>
                </el-select>
                <el-select v-model="query.address2" placeholder="设备位置" class="handle-select mr10">
                    <el-option key="1" label="" value=""></el-option>
                    <el-option key="2" label="ML001" value="0001"></el-option>
                    <el-option key="3" label="ML002" value="0002"></el-option>
                    <el-option key="4" label="ML003" value="0003"></el-option>
                </el-select>
                <el-select v-model="query.address3" placeholder="维修状态" class="handle-select mr10">
                    <el-option key="1" label="" value=""></el-option>
                    <el-option key="2" label="未派工" value="0001"></el-option>
                    <el-option key="3" label="维修" value="0002"></el-option>
                    <el-option key="4" label="完工" value="0003"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column width="55" align="center"></el-table-column>
                    <el-table-column prop="equipNo" label="设备编号"></el-table-column>
                    <el-table-column prop="equipType" label="设备类型"></el-table-column>
                    <el-table-column prop="equipLoc" label="所处产线"></el-table-column>
                    <el-table-column prop="faultDesc" label="故障描述"></el-table-column>
                    <el-table-column prop="reportPerson" label="上报人姓名"></el-table-column>
                    <el-table-column prop="createDate" label="创建时间"></el-table-column>
                    <el-table-column prop="status" label="状态"></el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <el-button
                                    type="text"
                                    icon="el-icon-edit"
                                    @click="handleEdit(scope.$index, scope.row)"
                            >派工</el-button>
                        </template>
                    </el-table-column>
            </el-table>

        </div>
        <!-- 编辑弹出框 -->
        <el-dialog title="派工" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="95px">
                <el-form-item label="编号" v-show="false"><el-input :disabled="true" v-model="form.id"></el-input></el-form-item>
                <el-form-item label="用户名" v-show="false"><el-input :disabled="true" v-model="form.reportPerson"></el-input></el-form-item>
                <el-form-item label="设备编号"><el-input :disabled="true" v-model="form.equipNo"></el-input></el-form-item>
                <el-form-item label="设备类型" prop="equipType">
                    <el-select v-model="form.equipType" placeholder="请选择设备类型" :disabled="true">
                        <el-option key="1" label="电子秤" value="0001"></el-option>
                        <el-option key="2" label="读卡器" value="0002"></el-option>
                        <el-option key="3" label="条码打印机" value="0003"></el-option>
                        <el-option key="4" label="安卓PAD" value="0004"></el-option>
                        <el-option key="5" label="红外对射枪" value="0005"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备位置" prop="equipLoc">
                    <el-select v-model="form.equipType" placeholder="请选择设备类型" :disabled="true">
                        <el-option key="1" label="电子秤" value="0001"></el-option>
                        <el-option key="2" label="读卡器" value="0002"></el-option>
                        <el-option key="3" label="条码打印机" value="0003"></el-option>
                        <el-option key="4" label="安卓PAD" value="0004"></el-option>
                        <el-option key="5" label="红外对射枪" value="0005"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="故障描述"><el-input :disabled="true" type="textarea"  v-model="form.faultDesc"></el-input></el-form-item>
                <el-form-item label="保养人"><el-input v-model="form.maintenanceWorker"></el-input></el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'equipRepairPerson',
    data() {
        return {
            query: {
                address1: '',
                address2: '',
                address3: '',
                pageIndex: 0,
                pageSize: 50
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData2();
    },
    methods: {
        getData2() {
            this.$axios.get('/api/equipFaultReport/selectAll').then(res =>{
                this.tableData = res.data;
            })
            this.form.reportPerson = JSON.parse(localStorage.getItem("userInfo")).name;
        },
        handleSearch() {
            console.log('/api/equipFaultReport/select?equip_type='+this.query.address1+'&equip_loc='+this.query.address2+'&status='+this.query.address3);
            this.$axios.get('/api/equipFaultReport/select?equip_type='+this.query.address1+'&equip_loc='+this.query.address2+'&status='+this.query.address3).then(res =>{

                this.tableData = res.data;
                this.toString();
            })

        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            console.log(this.form)
            if(row.status=='0003')
            {
                this.$message.error(`维修报告已提交，不能派工`);
            }
            else {
                this.editVisible = true;
            }
        },
        // 保存编辑
        saveEdit() {
            console.log(this.form)
            this.editVisible = false;
            this.form.status='0002';
            this.$axios.post('/api/equipFaultReport/edit',this.form).then(res=>{
                this.$message.success(`派工第 ${this.idx + 1} 行成功`);
            })
            this.$set(this.tableData, this.idx, this.form);
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
