const url = 'https://vue3-course-api.hexschool.io/'; // 請加入站點
const path = 'highdanny11-hexschool';
const productsDom = document.querySelector('.js-products');
const deleteProduct = document.querySelector('#js-delete');
const showImg = document.querySelector('.js-show');
const bulid = document.querySelector('.js-bulid');
const data = {
    products: [],
    token:'',
    init(){
        this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = this.token;
        this.getdata();
        productsDom.addEventListener('click', (e)=>this.show(e))
        deleteProduct.addEventListener('click', (e)=>this.remove(e));
        bulid.addEventListener('click', ()=>this.add());
    },
    getdata() {//抓取後端資料並渲染
        axios.get(`${url}api/${path}/products`)
            .then(res => {
                if (res.data.success){
                    this.products = res.data.products;
                    this.render();
                    console.log(res)
                }else{
                    alert('登入失敗');
                }
            })
    },
    render() {//渲染畫面
        let str = '';
        this.products.forEach(function (item, i) {
            str += `
            <tr>
                <th scope="row">${i + 1}</th>
                <td>${item.title}</td>
                <td>${item.origin_price}</td>
                <td>${item.price}</td>
                <td >
                <input class="form-check-input" type="radio" name="flexRadioDefault" data-radio="${i + 1}" id="flex${i + 1}"
                checked>
            </td>
                <td><button type="button" class="btn btn-outline-danger" data-index="${item.id}">刪除</button></td>
            </tr>`
            productsDom.innerHTML = str;
        })
    },
    remove(e) {//監聽下的函式，刪除
        let index = e.target.dataset.index;
        if (e.target.nodeName !== "BUTTON") { return };
        this.products.forEach((item, i) =>{
            if (index == item.id) {
                axios.delete(`${url}api/${path}/admin/product/${item.id}`)
                .then(res => {
                    if (res.data.success){
                        this.getdata();//上傳後更新
                    }else{
                        alert('刪除失敗');
                    }
                })//刪除後端資料庫
                this.products.splice(i, 1);//刪除產品資料
            }
        })
    },
    show(e) {//監聽下的函式，預覽
        let radio = e.target.dataset.radio;
        if (e.target.nodeName !== "INPUT") { return }
        this.products.forEach( (item, i)=> {
            let str = '';
            if (radio == i + 1) {
                str += `
                    <img src="${item.imageUrl}" class="figure-img img-fluid rounded img-thumbnail" style="width: 536px;height: 356px;" alt="${item.category}">
                    <figcaption class="figure-caption">${item.description}</figcaption>
                `
                showImg.innerHTML = str;
            }
        })
    },
    add() {//監聽下的函式，上傳資料
        let title = document.querySelector('.js-title').value.trim();
        let producstImg = document.querySelector('.js-producstImg').value.trim();
        let category = document.querySelector('.js-category').value.trim();
        let unit = document.querySelector('.js-unit').value.trim();
        let origin_price = document.querySelector('.js-origin_price').value;
        let price = document.querySelector('.js-price').value;
        if (title !== '' && producstImg !== '' && category !== '' && unit !== '' && origin_price !== '' && price !== '') {
            let product = {
                data: {
                    title:title,
                    category: category,
                    origin_price: parseInt(origin_price),
                    price: parseInt(price),
                    unit: unit,
                    description: 'Sit down please 名設計師設計',
                    content: '這是內容',
                    is_enabled: 1,
                    imageUrl: producstImg
                }
            };
            axios.post(`${url}api/${path}/admin/product`, product)
                .then(res => {
                    if (res.data.success){
                        this.init();//上傳後更新
                    }else{
                        alert('上傳失敗');
                    }
                }).catch((error) => { console.log(error) })
        }else{
            alert('有欄位沒填');
        }
        document.querySelector('.js-title').value = "";
        document.querySelector('.js-producstImg').value = "";
        document.querySelector('.js-category').value = "";
        document.querySelector('.js-unit').value = "";
        document.querySelector('.js-origin_price').value = "";
        document.querySelector('.js-price').value = "";
    }
}
data.init();