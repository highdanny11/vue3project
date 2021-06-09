export default{
    props: ['id'],
    data() {
        return {
            modal: {},
            product: {}
        }
    },
    methods: {
        oneProduct(api) {//取得單一產品資訊
            axios.get(`${api}`)
                .then(res => {
                    if (res.data.success) {
                        this.product = res.data.product;
                        this.product['qty'] = 1;
                    } else {
                        alert('失敗')
                    }
                })
        },
        addcart() {
            this.$emit('cart', this.product.qty)
        },
        openModal() {
            this.modal.show()
        },
        closeModal() {
            this.modal.hide()
        },
    },
    mounted() {
        this.modal = new bootstrap.Modal(this.$refs.products)
    },
    template: `<div class="modal fade" ref="products" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-5">
                            <img :src="product.imageUrl" style="height: 300px;" class="img-thumbnail "
                                alt="product">
                        </div>
                        <div class="col-7">
                            <div class="h2 text-center">{{product.title}}</div>
                            <p class="fs-4 ">介紹:{{product.description}}</p>
                            <p class="fs-4">成分:{{product.content}}</p>
                            <label for="Quantity">數量:</label>
                            <input type="number" min="0" id="Quantity" v-model.number="product.qty">
                            <div class="d-flex flex-row-reverse">
                                <button type="button" class="btn btn-outline-danger ms-3"
                                    @click="addcart">加入購物車</button>
                                <button type="button" class="btn btn-outline-secondary"
                                    data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`,
}