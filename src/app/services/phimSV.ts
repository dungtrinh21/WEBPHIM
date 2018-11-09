import * as $ from 'jquery';

export class PhimService{
    layDanhSachPhim(){
       return $.ajax({
            url:'http://sv2.myclass.vn/api/QuanLyPhim/LayDanhSachPhim?MaNhom=GP01',
            type: 'GET',
        })
    }
}