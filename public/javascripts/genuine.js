/*
 * @作者：AMEN
 * @官网：https://www.ymypay.cn/
 * @博客：https://blog.ymypay.cn/
 * 湮灭网络工作室
 */
!function (t) {

    const app = Vue.createApp({
        data() {
            return {
                search:'',          // 搜索
                notes : {},
                domain: {},
                topDomain: {},
                is_show: false,     // 显示
                is_load: false,     // 加载中
                programList: {},
            }
        },
        mounted() {
            this.program()
        },
        methods: {

            // 提交
            submit(search = this.search){

                if (inisHelper.is.empty(search)) toastr.warning("请提交需要被查询的域名！");
                else if (!inisHelper.is.domain(search)) toastr.warning("请提交一个正确的的域名！");
                else {

                    this.is_load = true

                    const params = inisHelper.stringfy({
                        search
                    })

                    axios.post('/index/genuine', params).then(res=>{

                        if (res.data.code == 200) {

                            const result = res.data.data

                            for (let item in result) this[item] = result[item]

                            this.is_show = true

                            console.log(result)

                        } else toastr.error(res.data.msg);

                        this.is_load = false
                    })
                }
            },
            program(){
                axios.get('/index/genuine').then(res=>{

                    if (res.data.code == 200) {

                        this.programList = res.data.data

                    } else toastr.error(res.data.msg);

                })
            },

            // 时间戳转人性化时间
            natureTime(date, bool = false){
                return (bool) ? inisHelper.time.nature(date) : inisHelper.time.nature(inisHelper.date.to.time(date))
            },
        },
        computed: {

        },
    }).mount('#kt_content')

}()