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
                    <el-table-column prop="equip_type" label="设备类型"></el-table-column>
                    <el-table-column prop="maintenance" label="保养内容"></el-table-column>
                    <el-table-column prop="cycle" label="保养周期：周，月，年"></el-table-column>
                    <el-table-column prop="warn_time" label="预警时间"></el-table-column>
                    <el-table-column prop="user_name" label="保养人姓名"></el-table-column>
                    <el-table-column prop="user_id" label="保养人"></el-table-column>
                    <el-table-column prop="del_flag" label="删除标记"></el-table-column>
                    <el-table-column prop="remarks" label="备注"></el-table-column>
                    <el-table-column prop="create_by" label="创建人"></el-table-column>
                    <el-table-column prop="update_by" label="创建时间"></el-table-column>
                    <el-table-column prop="create_date" label="更新人"></el-table-column>
                    <el-table-column prop="update_date" label="更新时间"></el-table-column>

            </el-table>

        </div>
    </div>
</template>

<script>
import { fetchData1 } from '../../api/index';
export default {
    name: 'basetable',
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
        this.getData1();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData1() {
            fetchData1().then(res => {
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
