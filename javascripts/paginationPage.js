export default{
    methods:{
        getdata(page){
            this.$emit('updata',page)
        }
    },
    props:['pagination'],
    template:` <div class="container">
    <div class="row">
        <div class="col-6 mx-auto">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{'disabled':pagination.has_next}">
                    <a class="page-link" href="#" aria-label="Previous" @click="getdata(pagination.current_page-1)">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item" v-for="(item,i) in pagination.total_pages" :class="{'active':item===pagination.current_page}" :key="i" >
                    <a class="page-link" @click="getdata(item)" href="#">{{item}}</a></li>
                <li class="page-item" :class="{'disabled':pagination.has_pre}">
                    <a class="page-link" href="#" aria-label="Next" @click="getdata(pagination.current_page+1)">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>`
}