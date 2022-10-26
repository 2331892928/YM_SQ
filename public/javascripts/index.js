!function (t) {
    
    const app = Vue.createApp({
        data() {
            return {
                visit: {            // 登录记录
                    expand: {
                        total: {}
                    }
                },
                color: {
                    hex:['#00a3ff','#50cd89','#e4e6ef','#ffc700','#7239ea','#f1416c','#181c32'],
                    class:['primary','success','secondary','warning','info','danger','dark']
                },
                chart: {
                    count: []
                },
                // 一言
                oneWord: '',
                likes:[],           // 已喜欢的数组
            }
        },
        mounted() {
            this.oneWords()
            this.initData()
            this.active()
        },
        methods: {
            
            // 初始化数据
            initData(){
                
                axios.post('/index').then(res=>{
                    if (res.data.code == 200) {
                        const result = res.data.data
                        this.visit   = result.visit.data[0]
                    }
                })
            },
            
            // 一言
            oneWords(){
                axios.get('//v1.hitokoto.cn?encode=text').then(res=>{
                    this.oneWord = res.data
                })
            },
            
            // 喜欢
            like(id = null){
                
                if (inisHelper.is.empty(id)) toastr.warning("主题ID不得为空！")
                else {
                    
                    const params = inisHelper.stringfy({
                        id
                    })
                    
                    // 登录 且 未喜欢
                    if (!this.isLogin()) toastr.warning("请先登录！")
                    else if (!this.likes.includes(id)) {
                        
                        axios.post('/index/handle/addLikeTheme', params)
                        
                        let count = parseInt(event.target.text) + 1
                        
                        count = (inisHelper.is.empty(count)) ? 1 : count
                        
                        event.target.innerHTML = `<span class="svg-icon svg-icon-2 svg-icon-danger">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path d="M18.3721 4.65439C17.6415 4.23815 16.8052 4 15.9142 4C14.3444 4 12.9339 4.73924 12.003 5.89633C11.0657 4.73913 9.66 4 8.08626 4C7.19611 4 6.35789 4.23746 5.62804 4.65439C4.06148 5.54462 3 7.26056 3 9.24232C3 9.81001 3.08941 10.3491 3.25153 10.8593C4.12155 14.9013 9.69287 20 12.0034 20C14.2502 20 19.875 14.9013 20.7488 10.8593C20.9109 10.3491 21 9.81001 21 9.24232C21.0007 7.26056 19.9383 5.54462 18.3721 4.65439Z" fill="black"></path>
							</svg>
							${count}
						</span>`
                        
                        this.likes.push(id)
                    }
                }
            },
            
            // 评论
            comments(tid = null){
                
                if (!this.isLogin()) toastr.warning("请先登录！")
                else if (inisHelper.is.empty(tid)) toastr.warning("主题ID不得为空！")
                else {
                    
                    let textarea = document.querySelector('#theme-textarea-' + tid)
                    
                    if (inisHelper.is.empty(textarea.value)) toastr.warning("请说点什么吧！")
                    else {
                        
                        const params = inisHelper.stringfy({
                            tid, content:textarea.value
                        })
                        
                        axios.post('/index/method/addComment', params).then(res=>{
                            
                            if (res.data.code == 200) {
                                
                                toastr.info('评论成功！')
                                textarea.value = ''
                                
                                // 跳转到评论
                                setTimeout(()=>{
                                    window.location.href = '/index/theme/id/' + tid + '.html#kt_comments'
                                }, 300)
                                
                            } else if (res.data.code == 403) {
                                
                                const result = res.data.data
                                toastr.error(`原因：${result.remark}<br>解禁时间：${inisHelper.time.to.date(result.time)}`, res.data.msg)
                                
                            } else toastr.error(res.data.msg)
                        })
                    }
                    
                }
            },
            
            // 是否已登录
            isLogin(){
                const login_account = inisHelper.get.cookie('login_account')
                return (!inisHelper.is.empty(login_account)) ? true : false
            },
            
            // 时间戳转人性化时间
            natureTime(date, bool = false){
                return (bool) ? inisHelper.time.nature(date) : inisHelper.time.nature(inisHelper.date.to.time(date))
            },
            
            // 初始化图表
            initChart(config = this.chart.count){
                const t = document.getElementById("count_chart");
                let [data, labels] = [[],[]]
                
                config.forEach(item=>{
                    data.push(item.count)
                    labels.push(item.name)
                })
                
                if (t) {
                    const e = t.getContext("2d");
                    new Chart(e, {
                        type: "doughnut",
                        data: {
                            datasets: [{
                                data,
                                backgroundColor: this.color.hex
                            }],
                            labels,
                        },
                        options: {
                            chart: {
                                fontFamily: "inherit"
                            },
                            cutout: "75%",
                            cutoutPercentage: 75,
                            responsive: !0,
                            maintainAspectRatio: !1,
                            title: {
                                display: !1
                            },
                            animation: {
                                animateScale: !0,
                                animateRotate: !0
                            },
                            tooltips: {
                                enabled: !0,
                                intersect: !1,
                                mode: "nearest",
                                bodySpacing: 5,
                                yPadding: 10,
                                xPadding: 10,
                                caretPadding: 0,
                                displayColors: !1,
                                backgroundColor: "#20D489",
                                titleFontColor: "#ffffff",
                                cornerRadius: 4,
                                footerSpacing: 0,
                                titleSpacing: 0
                            },
                            plugins: {
                                legend: {
                                    display: !1
                                }
                            }
                        }
                    })
                }
            },
            
            // 活跃
            active(){
                const t = KTUtil.getCssVariableValue("--bs-primary"),
                      e = KTUtil.getCssVariableValue("--bs-light-primary"),
                      a = KTUtil.getCssVariableValue("--bs-success"),
                      r = KTUtil.getCssVariableValue("--bs-light-success"),
                      o = KTUtil.getCssVariableValue("--bs-gray-200"),
                      n = KTUtil.getCssVariableValue("--bs-gray-500");
                      s = document.getElementById("kt_project_overview_graph"),
                      i = parseInt(KTUtil.css(s, "height")),
                      s && new ApexCharts(s, {
                        series: [{
                            name: "留言",
                            data: [70, 70, 80, 80, 75, 75, 75]
                        },
                        {
                            name: "登录",
                            data: [55, 55, 60, 60, 55, 55, 60]
                        }],
                        chart: {
                            type: "area",
                            height: i,
                            toolbar: {
                                show: !1
                            }
                        },
                        plotOptions: {},
                        legend: {
                            show: !1
                        },
                        dataLabels: {
                            enabled: !1
                        },
                        fill: {
                            type: "solid",
                            opacity: 1
                        },
                        stroke: {
                            curve: "smooth",
                            show: !0,
                            width: 3,
                            colors: [t, a]
                        },
                        xaxis: {
                            categories: ["周日", "周一", "周二", "周三", "周四", "昨天", "今天"],
                            axisBorder: {
                                show: !1
                            },
                            axisTicks: {
                                show: !1
                            },
                            labels: {
                                style: {
                                    colors: n,
                                    fontSize: "12px"
                                }
                            },
                            crosshairs: {
                                position: "front",
                                stroke: {
                                    color: t,
                                    width: 1,
                                    dashArray: 3
                                }
                            },
                            tooltip: {
                                enabled: !0,
                                formatter: void 0,
                                offsetY: 0,
                                style: {
                                    fontSize: "12px"
                                }
                            }
                        },
                        yaxis: {
                            labels: {
                                style: {
                                    colors: n,
                                    fontSize: "12px"
                                }
                            }
                        },
                        states: {
                            normal: {
                                filter: {
                                    type: "none",
                                    value: 0
                                }
                            },
                            hover: {
                                filter: {
                                    type: "none",
                                    value: 0
                                }
                            },
                            active: {
                                allowMultipleDataPointsSelection: !1,
                                filter: {
                                    type: "none",
                                    value: 0
                                }
                            }
                        },
                        tooltip: {
                            style: {
                                fontSize: "12px"
                            },
                            y: {
                                formatter: function(t) {
                                    return t
                                }
                            }
                        },
                        colors: [e, r],
                        grid: {
                            borderColor: o,
                            strokeDashArray: 4,
                            yaxis: {
                                lines: {
                                    show: !0
                                }
                            }
                        },
                        markers: {
                            colors: [e, r],
                            strokeColor: [t, a],
                            strokeWidth: 3
                        }
                    }).render()
            },
        },
        watch: {
            visit: {
                handler(newValue,oldValue){
                    
                    const self   = this
                    const visit  = self.visit.expand.total
                    
                    let name     = '其他'
                    
                    const allow  = ['page','theme','tutorials','api','comments']
                    
                    for (let item in visit) {
                        if (item != 'all') {
                            if (inisHelper.in.array(item, allow)) {
                                if (item == 'page')           name = '其他'
                                else if (item == 'api')       name = '调用API'
                                else if (item == 'login')     name = '登录次数'
                                else if (item == 'theme')     name = '浏览主题'
                                else if (item == 'register')  name = '注册人数'
                                else if (item == 'comments')  name = '评论'
                                else if (item == 'tutorials') name = '浏览教程'
                                else name = item
                                self.chart.count.push({count:visit[item],name})
                            }
                        }
                    }
                    
                    // 初始化图表
                    self.initChart(self.chart.count)
                },
                deep: true,
            },
        }
    }).mount('#kt_content')
    
}()