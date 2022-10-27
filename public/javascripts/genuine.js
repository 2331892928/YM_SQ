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
                programId:0,          // id
                notes : {},
                domain: {},
                topDomain: {},
                is_show: false,     // 显示
                is_load: false,     // 加载中
                programList: {"a":0},
            }
        },
        mounted() {
            this.program()
        },
        methods: {

            // 提交
            submit(search = this.search,programId = this.programId){
                if(programId===0) {toastr.warning("请选择需要查询的程序");return;}
                if (inisHelper.is.empty(search)) toastr.warning("请提交需要被查询的域名！");
                else if (!inisHelper.is.domain(search)) toastr.warning("请提交一个正确的的域名！");
                else {

                    this.is_load = true

                    const params = inisHelper.stringfy({
                        search,
                        programId
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
                axios.put('/index/genuine').then(res=>{

                    if (res.data.code === 200) {

                        this.programList = Object.assign(this.programList,res.data.data)
                        console.log(this.programList)
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