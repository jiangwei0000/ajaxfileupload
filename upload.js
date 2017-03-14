var elemIframe  = 'jupload-iframe';
var fileType = {file: '文件',video: '视频',audio: '音频'};
var Jupload = function(options){
	this.options = options;
	this.init();
};
//初始化渲染
Jupload.prototype.init = function(){
	var that = this, options = that.options;
	var body = $('body'), elem = $(options.elem || '.jupload-file');
	var iframe = $('<iframe id="'+ elemIframe +'" class="'+ elemIframe +'" name="'+ elemIframe +'"></iframe>');

	//插入iframe    
    $('#'+elemIframe)[0] || body.append(iframe);

    for (var i = 0; i < elem.length; i++) {
    	item = $(elem[i]);
    	var form = '<form target="'+ elemIframe +'" method="'+ (options.method||'post') +'" key="set-mine" enctype="multipart/form-data" action="'+ (options.url||'') +'"></form>';

    	var type = item.attr('jupload-type') || options.type; //获取文件类型

    	if(!options.unwrap){
    		form = '<div class="jupload-button">' + form + '<span class="jupload-icon">'+ (
	          item.attr('jupload-title') || options.title|| ('上传'+ (fileType[type]||'图片') )
	        ) +'</span></div>';
    	}

    	form = $(form);

    	//如果已经实例化，则移除包裹元素
    	if(item.parent('form').attr('target') === elemIframe){
    		if(options.unwrap){
    			item.unwrap();
    		}else{
    			item.parent().next().remove();
          		item.unwrap().unwrap();
    		}
    	}

    	//包裹元素
      	item.wrap(form);

      	//触发上传
      	item.off('change').on('change', function(){
        	that.action(this, type);
      	});
    };
    return;
};

Jupload.prototype.action = function(input, type){
	var that = this, options = that.options, val = input.value;
    var item = $(input), ext = item.attr('jupload-ext') || options.ext || ''; //获取支持上传的文件扩展名;
    if(!val){
      return;
    };


    //校验文件
    switch(type){
        case 'file': //一般文件
            if(ext && !RegExp('\\w\\.('+ ext +')$', 'i').test(escape(val))){
              console.log('不支持该文件格式');
              return input.value = '';
            }
        break;
        case 'video': //视频文件
            if(!RegExp('\\w\\.('+ (ext||'avi|mp4|wma|rmvb|rm|flash|3gp|flv') +')$', 'i').test(escape(val))){
                console.log('不支持该视频格式');
                return input.value = '';
            }
        break;
        case 'audio':
            if(!RegExp('\\w\\.('+ (ext||'mp3|wav|mid') +')$', 'i').test(escape(val))){
                console.log('不支持该音频格式');
                return input.value = '';
            }
        break;
        default: //图片文件
            if(!RegExp('\\w\\.('+ (ext||'jpg|png|gif|bmp|jpeg') +')$', 'i').test(escape(val))){
                console.log('不支持该图片格式');
                return input.value = '';
            }
        break;
    }

    options.before && options.before(input);

    item.parent().submit();

    var iframe = $('#'+elemIframe), timer = setInterval(function() {
        var res;
        try {
            res = iframe.contents().find('body').text();
        }catch(e) {
            console.log('上传接口存在跨域');
            clearInterval(timer);
        }
        if(res){
            clearInterval(timer);
            iframe.contents().find('body').html('');
            try {
                res = JSON.parse(res);
            }catch(e){
                res = {};
                console.log('请对上传接口返回JSON字符');
            }
            typeof options.success === 'function' && options.success(res, input);
        }
    },30)
};