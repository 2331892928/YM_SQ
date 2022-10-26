
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
        $request->render(__views__."/index/index.html");
        //更多帮助请查看：https://ym-php.rkru.cn
    }
}