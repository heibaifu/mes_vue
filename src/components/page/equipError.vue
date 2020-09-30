<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 设备故障上报
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-form ref="form" :model="form" label-width="95px">
                <el-form-item label="用户名" v-show="false"><el-input :disabled="true" v-model="form.reportPerson"></el-input></el-form-item>
                <el-form-item label="设备编号" prop="equipNo">
                    <el-input v-model="form.equipNo"></el-input>
                </el-form-item>
                <el-form-item label="设备类型" prop="equipType">
                    <el-select v-model="form.equipType" placeholder="请选择设备类型">
                        <el-option key="1" label="电子秤" value="0001"></el-option>
                        <el-option key="2" label="读卡器" value="0002"></el-option>
                        <el-option key="3" label="条码打印机" value="0003"></el-option>
                        <el-option key="4" label="安卓PAD" value="0004"></el-option>
                        <el-option key="5" label="红外对射枪" value="0005"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备位置" prop="equipLoc">
                    <el-select v-model="form.equipLoc" placeholder="请选择设备所处产线">
                        <el-option label="ML0001" value="0001"></el-option>
                        <el-option label="ML0002" value="0002"></el-option>
                        <el-option label="ML0003" value="0003"></el-option>
                        <el-option label="ML0004" value="0004"></el-option>
                        <el-option label="ML0005" value="0005" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="故障描述" prop="faultDesc">
                    <el-input type="textarea" v-model="form.faultDesc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="saveAdd">上报</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'equipError',
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
        getData() {
            // this.form.reportPerson = localStorage.getItem('ms_username');
            this.form.reportPerson = JSON.parse(localStorage.getItem("userInfo")).name;
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 保存添加
        saveAdd() {
            this.$axios.post('/api/equipFaultReport/add',this.form).then(res=>{
                this.$message.success(`添加成功`);
                this.resetForm('form');
            })
        },

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
