!function (t) {
    
    const app = Vue.createApp({
        data() {
            return {
                dark: 0,        // 0 非夜间， 1 夜间
                nights: [1],    // 默认非夜间
                search: '',
            }
        },
        mounted() {
            this.night()
        },
        methods: {
            setNight(){
                const checked = event.target.checked
                if (checked) inisHelper.set.storage('config',{night:true})
                else inisHelper.set.storage('config',{night:false})
                this.night()
            },
            // 夜间模式
            night(){
                // 获取夜间模式配置
                const night = inisHelper.get.storage('config','night')
                const body  = document.querySelector('body')
                // 设置夜间模式
                if (night) {
                    this.dark = 1
                    body.setAttribute('theme','night')
                    inisHelper.set.css(':root',`--bs-light-primary:#212E48;--bs-active-primary:#008BD9;--bs-light-success:#1C3238;--bs-active-success:#47BE7D;--bs-light-info:#2F264F;--bs-active-info:#5014D0;--bs-light-warning:#392F28;--bs-active-warning:#F1BC00;--bs-light-danger:#3A2434;--bs-active-danger:#D9214E;--bs-light-dark:#2B2B40;--bs-active-dark:#e8e8e8;--bs-gray-100:#1b1b29;--bs-gray-200:#2B2B40;--bs-gray-300:#323248;--bs-gray-400:#474761;--bs-gray-500:#565674;--bs-gray-600:#6D6D80;--bs-gray-700:#92929F;--bs-gray-800:#CDCDDE;
                        --bs-gray-900:#FFFFFF;--bs-xs:0;--bs-sm:576px;--bs-md:768px;--bs-lg:992px;--bs-xl:1200px;--bs-xxl:1400px
                	`)
                } else {
                    this.dark = 0
                    body.setAttribute('theme','')
                    inisHelper.set.css(':root','--bs-light-primary:#F1FAFF;--bs-active-primary:#008BD9;--bs-light-success:#E8FFF3;--bs-active-success:#47BE7D;--bs-light-info:#F8F5FF;--bs-active-info:#5014D0;--bs-light-warning:#FFF8DD;--bs-active-warning:#F1BC00;--bs-light-danger:#FFF5F8;--bs-active-danger:#D9214E;--bs-light-dark:#EFF2F5;--bs-active-dark:#131628;--bs-gray-100:#F5F8FA;--bs-gray-200:#EFF2F5;--bs-gray-300:#E4E6EF;--bs-gray-400:#B5B5C3;--bs-gray-500:#A1A5B7;--bs-gray-600:#7E8299;--bs-gray-700:#5E6278;--bs-gray-800:#3F4254;--bs-gray-900:#181C32;--bs-xs:0;--bs-sm:576px;--bs-md:768px;--bs-lg:992px;--bs-xl:1200px;--bs-xxl:1400px')
                }
            },
            // 退出登录
            signOut(){
                
                axios.post('/admin/comm/signOut')
                
                setTimeout(()=>{
                    window.location.href = '/';
                },300)
            },
        }
    }).mount('#kt_header')
    
}()