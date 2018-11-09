import '../../assets/css/cart.css';
import {Phim} from '../models/phim';
import * as Highcharts from 'highcharts';
import * as Exporting from 'highcharts/modules/exporting';

Exporting(Highcharts);
 
// Generate the chart
Highcharts.chart('container', {

    title: {
      text: 'Solar Employment Growth by Sector, 2010-2016'
    },
  
    subtitle: {
      text: 'Source: thesolarfoundation.com'
    },
  
    yAxis: {
      title: {
        text: 'Number of Employees'
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
  
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },
  
    series: [{
      name: 'Installation',
      data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }, {
      name: 'Manufacturing',
      data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
      name: 'Sales & Distribution',
      data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    }, {
      name: 'Project Development',
      data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    }, {
      name: 'Other',
      data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    }],
  
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  
  });



var danhSachGioHang:Phim[] = [];
//ban đầu vào là chạy code lun thì xài window.onload
window.onload = () =>{
    if(localStorage.getItem('cartlist')){
        danhSachGioHang = JSON.parse(localStorage.getItem('cartlist'));
    };
    taoBang();
}

let taoBang = () => {
    var content = '';
    for (let i in danhSachGioHang){
        let {MaPhim, TenPhim, HinhAnh, MoTa, NgayKhoiChieu, DanhGia} = danhSachGioHang[i];
        content +=`
        <tr>
            <td>${parseInt(i) + 1}</td>
            <td>${MaPhim}</td>
            <td>${TenPhim}</td>
            <td><img src="${HinhAnh}" style="width:100px"></td>
            <td>${MoTa}</td>
            <td>${NgayKhoiChieu}</td>
            <td>${DanhGia}</td>
            <td>
                <button class="btn btn-dark btn-Xoa" data-maphim = '${MaPhim}'>Xóa</button>
            </td>

        </tr>
        `;
    }
    (<HTMLTableElement>document.getElementById('tblbody')).innerHTML = content;
    xoaPhim('btn-Xoa');
}

//xóa phim
let xoaPhim = (btnClass:string) =>{
    let btns:any = <HTMLCollection>document.getElementsByClassName(btnClass);
    for(let btn of btns){
        btn.addEventListener('click', function(){
            let maPhim = btn.getAttribute('data-maphim');
            let index = timPhimTheoMa(danhSachGioHang, maPhim);
            console.log(index);
            if(index !== -1){
                danhSachGioHang.splice(index,1);
            }
            localStorage.setItem('cardlist', JSON.stringify(danhSachGioHang));
            taoBang();
        })
    }

}

let timPhimTheoMa = (movieArray: Phim[], maphim: string) => {
    for (let i in danhSachGioHang) {
        if (movieArray[i].MaPhim === maphim) {
            return parseInt(i); 
        }
    }
    return -1;
}
