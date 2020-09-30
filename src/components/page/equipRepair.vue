<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 设备维修记录
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
                <el-select v-model="query.address" placeholder="设备编号" class="handle-select mr10">
                    <el-option key="1" label="设备编号" value="equip_no"></el-option>
                    <el-option key="2" label="设备类型" value="equip_type"></el-option>
                    <el-option key="3" label="上报人姓名" value="report_person"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="请输入相应查询条件" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-zoom-in" @click="handleAdd">添加</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                    <el-table-column prop="id" label="编号"></el-table-column>
                    <el-table-column prop="equipId" label="设备id"></el-table-column>
                    <el-table-column prop="equipNo" label="设备编号"></el-table-column>
                    <el-table-column prop="equipType" label="设备类型"></el-table-column>
                    <el-table-column prop="equipLoc" label="所处产线"></el-table-column>
                    <el-table-column prop="faultDesc" label="故障描述"></el-table-column>
                    <el-table-column prop="status" label="状态"></el-table-column>
                    <el-table-column prop="reportPerson" label="上报人姓名"></el-table-column>
                    <el-table-column prop="assignTime" label="指派时间"></el-table-column>
                    <el-table-column prop="maintenanceWorker" label="维修工人"></el-table-column>
                    <el-table-column prop="delFlag" label="删除标记"></el-table-column>
                    <el-table-column prop="remarks" label="备注"></el-table-column>
                    <el-table-column prop="createBy" label="创建人"></el-table-column>
                    <el-table-column prop="createDate" label="创建时间"></el-table-column>
                    <el-table-column prop="updateBy" label="更新人"></el-table-column>
                    <el-table-column prop="updateDate" label="更新时间"></el-table-column>

<!--                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>-->
<!--                <el-table-column prop="name" label="用户名"></el-table-column>-->
<!--                <el-table-column label="账户余额">-->
<!--                    <template slot-scope="scope">￥{{scope.row.money}}</template>-->
<!--                </el-table-column>-->
<!--                <el-table-column label="头像(查看大图)" align="center">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-image-->
<!--                            class="table-td-thumb"-->
<!--                            :src="scope.row.thumb"-->
<!--                            :preview-src-list="[scope.row.thumb]"-->
<!--                        ></el-image>-->
<!--                    </template>-->
<!--                </el-table-column>-->
<!--                <el-table-column prop="address" label="地址"></el-table-column>-->
<!--                <el-table-column label="状态" align="center">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-tag-->
<!--                            :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"-->
<!--                        >{{scope.row.state}}</el-tag>-->
<!--                    </template>-->
<!--                </el-table-column>-->

<!--                <el-table-column prop="date" label="注册时间"></el-table-column>-->
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="95px">
                    <el-form-item label="id"><el-input v-model="form.id"></el-input></el-form-item>
                    <el-form-item label="设备id"><el-input v-model="form.equipId"></el-input></el-form-item>
                    <el-form-item label="设备编号"><el-input v-model="form.equipNo"></el-input></el-form-item>
                    <el-form-item label="设备类型"><el-input v-model="form.equipType"></el-input></el-form-item>
                    <el-form-item label="所处产线"><el-input v-model="form.equipLoc"></el-input></el-form-item>
                    <el-form-item label="故障描述"><el-input v-model="form.faultDesc"></el-input></el-form-item>
                    <el-form-item label="状态"><el-input v-model="form.status"></el-input></el-form-item>
                    <el-form-item label="上报人姓名"><el-input v-model="form.reportPerson"></el-input></el-form-item>
                    <el-form-item label="维修工人"><el-input v-model="form.maintenanceWorker"></el-input></el-form-item>
                    <el-form-item label="备注"><el-input v-model="form.remarks"></el-input></el-form-item>
                    <el-form-item label="创建人"><el-input v-model="form.createBy"></el-input></el-form-item>
                    <el-form-item label="更新人"><el-input v-model="form.updateBy"></el-input></el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑添加框 -->
        <el-dialog title="添加" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="form" label-width="95px">
                <el-form-item label="设备id"><el-input v-model="form.equipId"></el-input></el-form-item>
                <el-form-item label="设备编号"><el-input v-model="form.equipNo"></el-input></el-form-item>
                <el-form-item label="设备类型"><el-input v-model="form.equipType"></el-input></el-form-item>
                <el-form-item label="所处产线"><el-input v-model="form.equipLoc"></el-input></el-form-item>
                <el-form-item label="故障描述"><el-input v-model="form.faultDesc"></el-input></el-form-item>
                <el-form-item label="状态"><el-input v-model="form.status"></el-input></el-form-item>
                <el-form-item label="上报人姓名"><el-input v-model="form.reportPerson"></el-input></el-form-item>
                <el-form-item label="维修工人"><el-input v-model="form.maintenanceWorker"></el-input></el-form-item>
                <el-form-item label="备注"><el-input v-model="form.remarks"></el-input></el-form-item>
                <el-form-item label="创建人"><el-input v-model="form.createBy"></el-input></el-form-item>
                <el-form-item label="更新人"><el-input v-model="form.updateBy"></el-input></el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
export default {
    name: 'equipRepair',
    data() {
        return {
            query: {
                address: 'equip_no',
                name: '',
                pageIndex: 0,
                pageSize: 50
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then(res => {
                console.log(res);
                this.tableData = res;
                // this.pageTotal = res.pageTotal||50;
                this.pageTotal = 20;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.tableData.splice(index, 1);
                    this.$axios.get('/api/equipFaultReport/deleteById?id='+row.id).then(res=>{
                        this.$message.success("删除成功");
                    })
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].id + ' ';
                this.$axios.get('/api/equipFaultReport/deleteById?id='+this.multipleSelection[i].id).then(res=>{
                })
            }
            this.$message.success(`删除了${str}`);
            this.getData();
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            console.log(this.form)
            this.editVisible = true;
        },
        //添加操作
        handleAdd(index, row) {
            this.addVisible = true;
        },
        // 保存编辑
        saveEdit() {
            console.log(this.form)

            this.editVisible = false;
            this.$axios.post('/api/equipFaultReport/edit',this.form).then(res=>{
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            })
            this.$set(this.tableData, this.idx, this.form);
        },
        // 保存添加
        saveAdd() {
            console.log(this.form)

            this.addVisible = false;
            this.$axios.post('/api/equipFaultReport/add',this.form).then(res=>{
                this.$message.success(`添加成功`);
            })
            this.getData();
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            // this.query.pageIndex = val;
            this.getData();
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
