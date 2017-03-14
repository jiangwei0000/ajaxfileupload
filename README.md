# ajaxfileupload

## 通用异步上传组件 基于Jquery
此插件是闲心大神layui中上传插件 单独版本 由于经常需要使用异步上传组件  在小项目中 又感觉没有必要引入整个框架
稍加修改做了此单独上传组件的版本

原版出处 http://www.layui.com/doc/modules/upload.html

### 使用方法:

```
var upload = new Jupload(options);
```


参数名 | 说明
---|---
elem | 指定元素的选择器，默认直接查找class为jupload-file的元素
url | 上传文件的接口
method | 设置http类型，如：post、get。默认post。也可以直接在input设置jupload-method="get"来取代。
before | 执行上传前的回调
success | 上传成功后的回调
type | 	设定上传的文件类型，也可以直接在input设置jupload-type=""来取代
ext | 	自定义可支持的文件扩展名，也可以直接在input设置jupload-ext=""来取代
unwrap | 	是否不改变input的样式风格。默认false

### 例子:

```
var upload = new Jupload({
		url:'http://www.ebh.net/forum/upload.html',
		success:function(res){
			console.log(res);
		}
	});
```