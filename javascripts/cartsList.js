export default{
    props: ['url', 'path'],
    data() {
        return {
            cartsData: {},
            loading: "",
        }
    },
    methods: {
        showCart() {//購物車列表
            axios.get(`${this.url}api/${this.path}/cart`)
                .then(res => {
                    if (res.data.success) {
                        this.cartsData = res.data.data;
                        this.selectSubmit(this.cartsData.total);//傳狀態給送出按鈕做判斷
                    } else {
                        alert('加入失敗')
                    }
                })
        },
        upCart(item) {//更改購物車資訊
            this.loading = item.id;
            let cart = {
                product_id: item.product.id,
                qty: item.qty
            };
            axios.put(`${this.url}api/${this.path}/cart/${item.id}`, { data: cart })
                .then(res => {
                    if (res.data.success) {
                        this.loading = "";
                        this.showCart();
                    } else {
                        alert('加入失敗')
                    }
                })
        },
        allCartsDel() {//全部刪掉
            axios.delete(`${this.url}api/${this.path}/carts`)
                .then(res => {
                    if (res.data.success) {
                        this.showCart();
                    } else {
                        alert('失敗')
                    }
                })
        },
        oneCartDel(id) {//單一刪掉
            axios.delete(`${this.url}api/${this.path}/cart/${id}`)
                .then(res => {
                    if (res.data.success) {
                        this.showCart();
                    } else {
                        alert('失敗')
                    }
                })
        },
        selectSubmit(value){//傳值給送出按鈕做判斷
            this.$emit('submit',value)
        }
    },
    template: `<div class="container mt-3 " >
    <div class="d-flex flex-row-reverse">
        <a href="#" class="btn btn-outline-danger btn-lg mt-3" @click.prevent="allCartsDel()">全部刪除</a>
    </div>
    <table class="table align-middle mb-5">
        <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col">品名</th>
                <th scope="col" style="width: 200px;">數量/單位</th>
                <th scope="col">單價</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,key) in cartsData.carts" :key="key">
                <th scope="row"><button type="button" :disabled="loading===item.id" class="btn btn-outline-danger" @click="oneCartDel(item.id)">
                    <div class="spinner-border spinner-border-sm" v-if="loading===item.id" role="status">
                                    <span class="visually-hidden"></span>
                                </div>
                    <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-x" viewBox="0 0 16 16">
                            <path
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg></button></th>
                <td>{{item.product.title}}</td>
                <td><input type="number" :disabled="loading===item.id" @change="upCart(item)" min="1" style="width: 100px;" v-model.number="item.qty" id="price">{{item.product.unit}}</td>                        
                <td>{{item.product.price}}</td>
            </tr>
            <tr>
                <th></th>
                <td></td>
                <td>總價</td>
                <td>{{cartsData.total}}</td>
            </tr>
        </tbody>
    </table>
</div>`
}