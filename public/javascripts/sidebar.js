!function (t) {
    
    const app = Vue.createApp({
        data() {
            return {
                
            }
        },
        mounted() {
            this.setActive()
        },
        methods: {
            // 设置侧边栏选中
            setActive(){
                // 页面名称
                const pageName = (inisHelper.get.page.name()).toLowerCase()
                // 获取侧边栏的全部A标签
                const items    = document.querySelector("#kt_account_settings").querySelectorAll('a')
                for (let item of items) {
                    let array  = ((item.getAttribute('href')).split("/")).filter((s)=>{
                       return s && s.trim();
                    })
                    let name = array.pop()
                    if (!inisHelper.is.empty(name)) if (pageName == name.toLowerCase()) item.classList.add('active');
                }
            }
        }
    }).mount('#kt_sidebar_left')
    
}()