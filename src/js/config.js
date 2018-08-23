require.config({

	// 配置短路径（别名）
	paths:{
		'jquery':'../lib/jquery-3.2.1',
        'lxzoom':'../lib/jquery-lxzoom/jquery.lxzoom'
	},

	shim:{
		// 配置模块间依赖关系
		// 讲明：lxzoom依赖jquery（加载过程中自动处理先后顺序）
		'lxzoom':['jquery']
	}
});