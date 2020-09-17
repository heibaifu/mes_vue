import request from '../utils/request';

export const fetchData = query => {
    return request({
        // url: './table.json',
        // url: 'http://localhost:8000/equip_fault_report/all',
        // params: query
        url: '/api/equip_fault_report/all',
        method: 'get',
    });
};

export const fetchData1 = query => {
    return request({
        url: '/api/equip_maintenance_plan/all',
        method: 'get',
    });
};


export const fetchData2 = query => {
    return request({
        url: '/api/equip_repair/all',
        method: 'get',
    });
};
export const login_po = query => {
    request({
        url: '/api/sysUser/login',
        params: this.param,
        method: 'post',
    });
};
