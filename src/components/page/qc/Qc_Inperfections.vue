<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 残次品上报管理
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
                <el-input v-model="query.pname" placeholder="请输入产品名称查询" class="handle-input mr10"></el-input>
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
                <el-table-column prop="pname" label="产品名称"></el-table-column>
                <el-table-column prop="bn" label="产品批次"></el-table-column>
                <el-table-column prop="woCode" label="工单编号"></el-table-column>
                <el-table-column prop="desc" label="详情"></el-table-column>

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
                <el-form-item label="工单">
                    <el-select v-model="form.ordercode" placeholder="请选择工单编号">
                        <el-option
                                v-for="workOrder in WorkOrder"
                                :key="workOrder.ordercode"
                                :label="workOrder.ordercode"
                                :value="workOrder.ordercode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="残次品详情"><el-input v-model="form.desc"></el-input></el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 弹出添加框 -->
        <el-dialog title="添加" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="form" label-width="95px">
                <el-form-item label="工单">
                    <el-select v-model="form.ordercode" placeholder="请选择工单编号">
                        <el-option
                                v-for="workOrder in WorkOrder"
                                :key="workOrder.ordercode"
                                :label="workOrder.ordercode"
                                :value="workOrder.ordercode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="残次品详情"><el-input v-model="form.desc"></el-input></el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'Qc_Inperfections',
        data() {
            return {
                query: {
                    procode: '',
                    pageIndex: 0,
                    pageSize: 50
                },
                tableData: [],
                WorkOrder: [],
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
                this.$axios.get('/api/qcInperfections/selectAll').then(res =>{
                    this.tableData = res.data;
                })

            },
            // 触发搜索按钮
            handleSearch() {
                this.$axios.get('/api/qcInperfections/selectByName?pname='+this.query.pname).then(res =>{
                    this.tableData = res.data;
                })
            },
            //工单信息
            getWorkorderData(){
                this.$axios.get('/api/basWorkorder/selectAll').then(res =>{
                    this.WorkOrder = res.data;
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();

            },
            // 删除操作
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        console.log(index);
                        console.log(row.id);
                        this.tableData.splice(index, 1);
                        this.$axios.get('/api/qcInperfections/deleteById?id='+row.id).then(res=>{
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
                    str += this.multipleSelection[i].pname + ' ';
                    this.$axios.get('/api/qcInperfections/deleteById?id='+this.multipleSelection[i].id).then(res=>{
                    })
                }
                this.$message.success(`删除了${str}`);
                this.getData();
            },
            // 编辑操作
            handleEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.getWorkorderData();
                this.editVisible = true;
            },
            //添加操作
            handleAdd(index, row) {
                this.getWorkorderData();
                this.addVisible = true;

            },
            // 保存编辑
            saveEdit() {
                console.log(this.form)

                this.editVisible = false;
                this.form.updatePerson = JSON.parse(localStorage.getItem("userInfo")).name;
                this.$axios.post('/api/qcInperfections/edit',this.form).then(res=>{
                    this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                })
                this.$set(this.tableData, this.idx, this.form);
            },
            // 保存添加
            saveAdd() {
                this.addVisible = false;
                this.form.addPerson = JSON.parse(localStorage.getItem("userInfo")).name;
                this.$axios.post('/api/qcInperfections/add',this.form).then(res=>{
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
