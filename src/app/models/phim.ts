export class Phim{
            public MaPhim: string;
            public TenPhim: string;
            public Trailer: string;
            public HinhAnh: string;
            public MoTa: string;
            public MaNhom: string;
            public NgayKhoiChieu: string;
            public DanhGia: string;

    //Khoi tao class nhan vao nhung tham so
    //hàm khởi tạo constructor
    constructor(maphim:string, tenphim:string, trailer:string, 
        hinhanh:string, mota:string, manhom:string, ngaykhoichieu:string, danhgia:string){
        this.MaPhim = maphim;
        this.TenPhim = tenphim;
        this.Trailer = trailer;
        this.HinhAnh = hinhanh;
        this.MoTa = mota;
        this.MaNhom = manhom;
        this.NgayKhoiChieu = ngaykhoichieu;
        this.DanhGia = danhgia;
    };
}

