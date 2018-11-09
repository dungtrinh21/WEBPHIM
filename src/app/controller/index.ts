import '../../assets/css/index.css';
import { PhimService } from '../services/phimSV';
import { Phim } from '../models/phim';
import { NguoiDung } from '../models/nguoidung';
import { NguoiDungService } from '../services/nguoidungSV';
import swal from 'sweetalert2';
import 'bootstrap';
import 'popper.js';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

//Khởi tạo instance(object) từ lớp phim service
const phimSV = new PhimService();
const nguoiDungSV = new NguoiDungService();

let danhsachPhim: Phim[] = [];
let danhSachGioHang: Phim[] = [];

//Khoi toàn bộ code HTML chạy xong thì code ở window này chạy tiếp 
window.onload = function () {
    phimSV.layDanhSachPhim().done(function (res) {
        danhsachPhim = res;
        renderMovieItem();

    }).fail(function (error) {
        console.log(error);
    })
    //hiển thị đăng nhập trong trường hợp load lại trang 
    hienThiDangNhap();
}

// function renderMovieItem(){
// }
//=> cach viet khac cua arrow function là 
let renderMovieItem = () => {
    let content: string = '';
    //vòng for mới gồm for of và for in
    //for in để duyệt qua từng phần tử trong mảng thì nó sẽ trả về index của phần tử. 
    //Ngược lại for of sẽ trả về value của phần tử.
    for (let movie of danhsachPhim) {
        //kỹ thuật destructering: bóc tánh thuộc tính
        let { MaPhim, TenPhim, Trailer, HinhAnh, MoTa, MaNhom, NgayKhoiChieu, DanhGia } = movie;
        content += `
        <div class="col-sm-6 col-md-3 text-center">
                    <div class="movie__item">
                        <img src="${HinhAnh}" onerror="this.onerror === null; this.src='https://developers.google.com/maps/documentation/streetview/images/error-image-generic.png'" style = "height: 350px"class="img-fluid w-100">
                            <div class="movie__overlay"></div>
                                <div class="movie__detail w-100 text-center text-white">
                                    <i class="fa fa-play d-block mx-auto mb-3 video-play venobox " href="https://youtu.be/aOXvyd9v1cg" data-vbtype="video"></i>
                                    <p>
                                        <a href="#" class="movie__icon"><i class="fa fa-file"></i></a>

                                        <a href="#" class="movie__icon btnAddToCard"
                                            data-maphim = ${MaPhim}
                                            data-tenphim = ${TenPhim}
                                            data-trailer = ${Trailer}
                                            data-hinhanh = ${HinhAnh}
                                            data-mota = ${MoTa}
                                            data-manhom = ${MaNhom}
                                            data-ngaykhoichieu = ${NgayKhoiChieu}
                                            data-danhgia = ${DanhGia}
                                        ><i class="fa fa-shopping-cart"></i></a>
                                    </p>
                                    <span>${NgayKhoiChieu ? NgayKhoiChieu.substr(0, 10) : '2018-20-10'}</span>
                                </div>
                    </div>
                    <p class="movie__name text-center my-3">${TenPhim}</p>
                    ${renderStar(parseInt(DanhGia))}
                
        </div>
        
        `;
        (<HTMLDivElement>document.getElementById('movielist')).innerHTML = content;
        themPhimVaoGioHang('btnAddToCard');
    }
}

let renderStar = (num: number) => {
    let stars = '';
    //nếu num tồn tại thì chạy vòng lặp để ra số sao đã đc đánh giá
    if (num) {
        for (let i = 0; i < num; i++) {
            stars += `
            <i class="fa fa-star movie__star"></i>
            `;
        }
        //tạo ra sao rỗng 
        for (let k = 5; k > num; k--) {
            stars += `
            <i class="fa fa-star-o movie__star"></i>
            `;
        }
    } else {
        //nếu num không tồn tại thì chạy vòng lặp 5 lần để ra 5 sao
        for (let i = 0; i < 5; i++) {
            stars += `
            <i class="fa fa-star movie__star"></i>
            `;
        }
    }
    return stars;
}

//function thêm phim vào giở hàng
let themPhimVaoGioHang = (btnClass) => {
    //gắn sự kiện cho 1 nút chưa có sẵn trên giao diện
    let btns: any = <HTMLCollection>document.getElementsByClassName(btnClass);
    for (let btn of btns) {
        btn.addEventListener('click', () => {
            let maPhim = btn.getAttribute('data-maphim');
            let tenPhim = btn.getAttribute('data-tenphim');
            let trailer = btn.getAttribute('data-trailer ');
            let hinhAnh = btn.getAttribute('data-hinhanh');
            let moTa = btn.getAttribute('data-mota')
            let maNhom = btn.getAttribute('data-manhom');
            let ngayKhoiChieu = btn.getAttribute('data-ngaykhoichieu');
            let danhGia = btn.getAttribute('data-danhgia');

            let PhimItem = new Phim(maPhim, tenPhim, trailer, hinhAnh, moTa, maNhom, ngayKhoiChieu, danhGia);
            //Kiểm tra sản phẩm đã có trong giở hàng hay chưa
            let index = timPhimTheoMa(PhimItem.MaPhim);
            console.log(index)
            if (index === -1) {
                //thêm object vào mảng danhSachGioHang bằng kỹ thuật spread operator tương tự như push
                danhSachGioHang = [...danhSachGioHang, PhimItem];
            }
            //lưu vào localStorage để qua trang html mới lấy ra xài tiếp
            localStorage.setItem('cartlist', JSON.stringify(danhSachGioHang));
            //toString để chuyển số thành chuỗi
            (<HTMLSpanElement>document.getElementById('totalAmount')).innerHTML = danhSachGioHang.length.toString();


        })
    }
}

//hàm tìm phim theo mã;
let timPhimTheoMa = (maphim: string) => {
    for (let movie of danhSachGioHang) {
        if (movie.MaPhim === maphim) {
            return 1;
        }
    }
    return -1;
}

//Hàm đăng ký
let dangKy = () =>{
    let taiKhoan = (<HTMLInputElement>document.getElementById('TaiKhoan')).value;
    let hoTen = (<HTMLInputElement>document.getElementById('HoTen')).value;
    let matKhau = (<HTMLInputElement>document.getElementById('Matkhau')).value;
    let Email = (<HTMLInputElement>document.getElementById('Email')).value;
    let soDT = (<HTMLInputElement>document.getElementById('SoDT')).value;
    let maNhom = 'GP01';
    let maLoaiNguoiDung = 'KhachHang';

    let NguoiDungMoi = new NguoiDung(taiKhoan, matKhau, Email, soDT, maNhom, maLoaiNguoiDung, hoTen);
    nguoiDungSV.DangKy(NguoiDungMoi).done(function(kq){
        console.log(kq);
        //Kiểm tra kiểu dữ liệu nếu trả về là object là đăng kí thành công, còn trả về là string là fail
        if(typeof(kq) !== 'string'){
            swal({
                position: 'top-end',
                type: 'success',
                title: 'Đăng kí thành công',
                showConfirmButton: false,
                timer: 1500
              });
        }
    }).fail(function(error){
        console.log(error);
    });

    
}

let DangNhap = () => {
    //Lấy thông tin người dùng nhập vào
    let taiKhoan = (<HTMLInputElement>document.getElementById('TaiKhoanDangNhap')).value;
    let matKhau = (<HTMLInputElement>document.getElementById('MatkhauDangNhap')).value;

    nguoiDungSV.DangNhap(taiKhoan, matKhau).done((kq) => {
         //Kiểm tra kiểu dữ liệu nếu trả về là object là đăng nhập thành công, còn trả về là string là fail
       if(typeof(kq) !== 'string'){
           console.log(kq);
        (<HTMLButtonElement>document.getElementById('btnClose')).click();
        localStorage.setItem('UserInfo', JSON.stringify(kq));
        hienThiDangNhap();
       }
    }).fail((err) => {
        console.log(err);
    })
}

//sau khi dang nhap thanh cong, thi hien thi 'xin chao, ten tai khoan'
//sau khi load trang lại account vẫn giữ nguyên nếu chưa đăng thoát, vậy tài khaorn sẽ lưu trong localstroage
let hienThiDangNhap = () =>{
    ////lấy local lên
    let localUser = JSON.parse(localStorage.getItem('UserInfo'));
    if(localUser){
        (<HTMLSpanElement>document.getElementById('hienThiDangNhap')).style.display = "inline";
        (<HTMLSpanElement>document.getElementById('userName')).innerHTML = localUser.TaiKhoan;
    }
}





//button Đăng kí
let btnDangKi = <HTMLButtonElement>document.getElementById('btnDangKi');
btnDangKi.addEventListener('click', dangKy);

//button đăng nhập
let btnDangNhap = <HTMLButtonElement>document.getElementById('btnDangNhap');
btnDangNhap.addEventListener('click',DangNhap);