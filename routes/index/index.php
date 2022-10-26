
<?php
/*
 * @作者：AMEN
 * @官网：https://www.ymypay.cn/
 * @博客：https://blog.ymypay.cn/
 * 湮灭网络工作室
 */
//示例路由，类名必须为Index，文件名无所谓
//第一个方法必须为start，且为public，因为他是入口
//其余最好是private，保护
//此框架可以在任意地方引入类以及函数，但如果是为了全局使用，请在根目录app.php引入
//如果是局部引入，使用前引入即可
class Index{
    public function start(YM_request $request){
        $request_type = $request->requestType();
        switch($request_type){
            case "POST":
                $this->post($request);
                break;
            case "PUT":
                $this->put($request);
                break;
            case "GET":
            default:
                $this->get($request);
        }
        //更多帮助请查看：https://ym-php.rkru.cn
    }
    public function get(YM_request $request){
        $params = $request->params();
        if(count($params)==1){
            $request->render(__views__."/index/index.html");
            return;
        }
        if(count($params)==2 and $params[0]=="index"){
            $request->render(__views__."/index/".$params[1]);
            return;
        }
    }
    public function post(YM_request $request){
        $params = $request->params();
        if(count($params)==1){
            $request->send(json_encode(['code'=>400,"msg"=>"路由不对"]));
            return;
        }
        switch($params[1]){
            case "genuine":
                $request->send('{"code":200,"msg":"ok","data":{"domain":{"value":"qq.com","check":false},"topDomain":{"value":"qq.com","check":false},"notes":{"id":119,"domain":"qq.com","code":403,"count":13,"opt":null,"expand":null,"longtext":null,"create_time":"2022-01-28 15:28:02","update_time":"2022-10-26 16:55:57"}}}');
        }
    }
    public function put(YM_request $request){
        $params = $request->params();
        switch($params[1]){
            case "genuine":
                $request->send(json_encode(['code'=>200,'msg'=>"ok",'data'=>['测试程序'=>1]]));
        }
    }
}