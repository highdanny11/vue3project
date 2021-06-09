const emailPut = document.querySelector('#email');
const passwPut = document.querySelector('#password');
const form = document.querySelector('#form');
const url = 'https://vue3-course-api.hexschool.io/'; // 請加入站點



function login(e) {
    e.preventDefault();
    const username = emailPut.value;
    const password = passwPut.value;
    const user = {
        username,
        password
    }
    axios.post(`${url}admin/signin`, user)
        .then(res => {
            if (res.data.success) {
                const{token,expired} = res.data
                document.cookie = `hexToken=${token};expires=${new Date(expired)}`;
                window.location = 'vueProduct.html';
            } else {
                alert('登入失敗')
                
            }
        }).catch((error) => { console.log(error) })

    // #2 發送 API 至遠端並登入（並儲存 Token）
}
form.addEventListener('submit', login)

//vueProduct
//productListVue3






