## BB代码

### 安装

```sh
composer require flarum/bbcode *@dev
```

### 更新

```sh
composer update flarum/bbcode *@dev
```

### 更新

```sh
composer remove flarum/bbcode *@dev
```


## 使用 QueryList 加入采集文字并发布文章

#### 元素操作
-  采集「昵图网」所有图片地址

```php
QueryList::get('http://www.nipic.com')->find('img')->attrs('src');
```
- 采集百度搜索结果

```php
$ql = QueryList::get('http://www.baidu.com/s?wd=QueryList');

$ql->find('title')->text(); // 获取网站标题
$ql->find('meta[name=keywords]')->content; // 获取网站头部关键词

$ql->find('h3>a')->texts(); //获取搜索结果标题列表
$ql->find('h3>a')->attrs('href'); //获取搜索结果链接列表

$ql->find('img')->src; //获取第一张图片的链接地址
$ql->find('img:eq(1)')->src; //获取第二张图片的链接地址
$ql->find('img')->eq(2)->src; //获取第三张图片的链接地址
// 遍历所有图片
$ql->find('img')->map(function($img){
	echo $img->alt;  //打印图片的alt属性
});
```
- 更多用法

```php
$ql->find('#head')->append('<div>追加内容</div>')->find('div')->htmls();
$ql->find('.two')->children('img')->attrs('alt'); //获取class为two元素下的所有img孩子节点
//遍历class为two元素下的所有孩子节点
$data = $ql->find('.two')->children()->map(function ($item){
    //用is判断节点类型
    if($item->is('a')){
        return $item->text();
    }elseif($item->is('img'))
    {
        return $item->alt;
    }
});

$ql->find('a')->attr('href', 'newVal')->removeClass('className')->html('newHtml')->...
$ql->find('div > p')->add('div > ul')->filter(':has(a)')->find('p:first')->nextAll()->andSelf()->...
$ql->find('div.old')->replaceWith( $ql->find('div.new')->clone())->appendTo('.trash')->prepend('Deleted')->...
```
#### 列表采集
采集百度搜索结果列表的标题和链接:
```php
$data = QueryList::get('http://www.baidu.com/s?wd=QueryList')
	// 设置采集规则
    ->rules([ 
	    'title'=>array('h3','text'),
	    'link'=>array('h3>a','href')
	])
	->query()->getData();

print_r($data->all());
```
采集结果:
```
Array
(
    [0] => Array
        (
            [title] => QueryList|基于phpQuery的无比强大的PHP采集工具
            [link] => http://www.baidu.com/link?url=GU_YbDT2IHk4ns1tjG2I8_vjmH0SCJEAPuuZN
        )
    [1] => Array
        (
            [title] => PHP 用QueryList抓取网页内容 - wb145230 - 博客园
            [link] => http://www.baidu.com/link?url=zn0DXBnrvIF2ibRVW34KcRVFG1_bCdZvqvwIhUqiXaS
        )
    [2] => Array
        (
            [title] => 介绍- QueryList指导文档
            [link] => http://www.baidu.com/link?url=pSypvMovqS4v2sWeQo5fDBJ4EoYhXYi0Lxx
        )
        //...
)
```
#### 编码转换
```php
// 输出编码:UTF-8,输入编码:GB2312
QueryList::get('https://top.etao.com')->encoding('UTF-8','GB2312')->find('a')->texts();

// 输出编码:UTF-8,输入编码:自动识别
QueryList::get('https://top.etao.com')->encoding('UTF-8')->find('a')->texts();
```

#### HTTP网络操作（GuzzleHttp）
- 携带cookie登录新浪微博
```php
//采集新浪微博需要登录才能访问的页面
$ql = QueryList::get('http://weibo.com','param1=testvalue & params2=somevalue',[
    'headers' => [
        //填写从浏览器获取到的cookie
        'Cookie' => 'SINAGLOBAL=546064; wb_cmtLike_2112031=1; wvr=6;....'
    ]
]);
//echo $ql->getHtml();
echo $ql->find('title')->text();
//输出: 我的首页 微博-随时随地发现新鲜事
```
- 使用Http代理
```php
$urlParams = ['param1' => 'testvalue','params2' => 'somevalue'];
$opts = [
	// 设置http代理
    'proxy' => 'http://222.141.11.17:8118',
    //设置超时时间，单位：秒
    'timeout' => 30,
     // 伪造http头
    'headers' => [
        'Referer' => 'https://querylist.cc/',
        'User-Agent' => 'testing/1.0',
        'Accept'     => 'application/json',
        'X-Foo'      => ['Bar', 'Baz'],
        'Cookie'    => 'abc=111;xxx=222'
    ]
];
$ql->get('http://httpbin.org/get',$urlParams,$opts);
// echo $ql->getHtml();
```

- 模拟登录
```php
// 用post登录
$ql = QueryList::post('http://xxxx.com/login',[
    'username' => 'admin',
    'password' => '123456'
])->get('http://xxx.com/admin');
//采集需要登录才能访问的页面
$ql->get('http://xxx.com/admin/page');
//echo $ql->getHtml();
```

#### Form表单操作
模拟登陆GitHub
```php
// 获取QueryList实例
$ql = QueryList::getInstance();
//获取到登录表单
$form = $ql->get('https://github.com/login')->find('form');

//填写GitHub用户名和密码
$form->find('input[name=login]')->val('your github username or email');
$form->find('input[name=password]')->val('your github password');

//序列化表单数据
$fromData = $form->serializeArray();
$postData = [];
foreach ($fromData as $item) {
    $postData[$item['name']] = $item['value'];
}

//提交登录表单
$actionUrl = 'https://github.com'.$form->attr('action');
$ql->post($actionUrl,$postData);
//判断登录是否成功
// echo $ql->getHtml();
$userName = $ql->find('.header-nav-current-user>.css-truncate-target')->text();
if($userName)
{
    echo '登录成功!欢迎你:'.$userName;
}else{
    echo '登录失败!';
}
```
#### Bind功能扩展
自定义扩展一个`myHttp`方法:
```php
$ql = QueryList::getInstance();

//绑定一个myHttp方法到QueryList对象
$ql->bind('myHttp',function ($url){
    // $this 为当前的QueryList对象
    $html = file_get_contents($url);
    $this->setHtml($html);
    return $this;
});

//然后就可以通过注册的名字来调用
$data = $ql->myHttp('https://toutiao.io')->find('h3 a')->texts();
print_r($data->all());
```
或者把实现体封装到class，然后这样绑定:
```php
$ql->bind('myHttp',function ($url){
    return new MyHttp($this,$url);
});
```