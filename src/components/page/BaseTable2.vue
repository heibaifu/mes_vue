<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 设备保养计划
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
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
                    <el-table-column prop="mid" label="维修记录Id"></el-table-column>
                    <el-table-column prop="fault_type" label="故障类型"></el-table-column>
                    <el-table-column prop="fault_reason" label="故障原因"></el-table-column>
                    <el-table-column prop="fault_desc" label="故障描述"></el-table-column>
                    <el-table-column prop="fault_imgs" label="故障图片"></el-table-column>
                    <el-table-column prop="del_flag" label="删除标记"></el-table-column>
                    <el-table-column prop="remarks" label="备注"></el-table-column>
                    <el-table-column prop="create_by" label="创建人"></el-table-column>
                    <el-table-column prop="create_date" label="创建时间"></el-table-column>
                    <el-table-column prop="update_by" label="更新人"></el-table-column>
                    <el-table-column prop="update_date" label="更新时间"></el-table-column>

            </el-table>

        </div>
    </div>
</template>

<script>
import { fetchData2 } from '../../api/index';
export default {
    name: 'basetable2',
    data() {
        return {

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
        // 获取 easy-mock 的模拟数据
        getData2() {
            fetchData2().then(res => {
                console.log(res);
                this.tableData = res;
            });
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
